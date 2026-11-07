(function (root, factory) {
  'use strict';
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.PhotoPalette = api;
}(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  var cache = new Map();

  function clamp(value, low, high) { return Math.max(low, Math.min(high, value)); }
  function safeUrl(value) {
    try {
      var parsed = new URL(String(value || '').trim());
      if (!['https:', 'http:'].includes(parsed.protocol) || parsed.username || parsed.password) throw new Error();
      return parsed.href;
    } catch (_) { throw new Error('Use a complete image address beginning with https://.'); }
  }
  function rgbToHsl(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    var maximum = Math.max(r, g, b), minimum = Math.min(r, g, b), delta = maximum - minimum;
    var lightness = (maximum + minimum) / 2, saturation = delta ? delta / (1 - Math.abs(2 * lightness - 1)) : 0;
    var hue = 0;
    if (delta) {
      if (maximum === r) hue = ((g - b) / delta) % 6;
      else if (maximum === g) hue = (b - r) / delta + 2;
      else hue = (r - g) / delta + 4;
      hue = (hue * 60 + 360) % 360;
    }
    return { h: hue, s: saturation, l: lightness };
  }
  function hslToRgb(h, s, l) {
    var chroma = (1 - Math.abs(2 * l - 1)) * s, part = h / 60, x = chroma * (1 - Math.abs(part % 2 - 1));
    var pieces = part < 1 ? [chroma, x, 0] : part < 2 ? [x, chroma, 0] : part < 3 ? [0, chroma, x] : part < 4 ? [0, x, chroma] : part < 5 ? [x, 0, chroma] : [chroma, 0, x];
    var base = l - chroma / 2;
    return pieces.map(function (value) { return Math.round(clamp(value + base, 0, 1) * 255); });
  }
  function hex(rgb) { return '#' + rgb.map(function (value) { return Math.round(clamp(value, 0, 255)).toString(16).padStart(2, '0'); }).join(''); }
  function hueDistance(a, b) { return Math.min(Math.abs(a - b), 360 - Math.abs(a - b)); }

  function fromPixels(input) {
    var pixels = input && input.data ? input.data : input;
    if (!pixels || typeof pixels.length !== 'number' || pixels.length < 4 || pixels.length % 4 !== 0) throw new Error('The photo could not be read as image pixels.');
    var groups = Array.from({ length: 24 }, function () { return { score: 0, count: 0 }; });
    var candidates = [], opaque = [], colourful = 0;
    for (var index = 0; index < pixels.length; index += 4) {
      var alpha = Number(pixels[index + 3]);
      if (alpha < 128) continue;
      var r = Number(pixels[index]), g = Number(pixels[index + 1]), b = Number(pixels[index + 2]);
      if (![r, g, b, alpha].every(Number.isFinite)) continue;
      var hsl = rgbToHsl(r, g, b);
      opaque.push({ r: r, g: g, b: b, h: hsl.h, s: hsl.s, l: hsl.l });
      if (hsl.l < 0.09 || hsl.l > 0.91) continue;
      var weight = (0.06 + Math.pow(hsl.s, 1.7) * 2.2) * (1 - Math.abs(hsl.l - 0.48) * 1.2);
      var skinLike = hsl.h >= 5 && hsl.h <= 48 && hsl.s > 0.18 && hsl.s < 0.68 && hsl.l > 0.28 && hsl.l < 0.84 && r > g && g > b;
      if (skinLike) weight *= 0.24;
      if (hsl.s < 0.15) weight *= 0.14;
      var item = { r: r, g: g, b: b, h: hsl.h, s: hsl.s, l: hsl.l, weight: weight };
      candidates.push(item);
      if (hsl.s >= 0.18) {
        colourful += 1;
        var bucket = Math.floor(hsl.h / 15) % 24;
        groups[bucket].score += weight;
        groups[bucket].count += 1;
      }
    }
    if (!opaque.length) throw new Error('The photo has no visible pixels to sample.');
    var usable = candidates.length ? candidates : opaque;
    var neutralDominant = colourful < usable.length * 0.15;
    var selected = [], minimumCount = Math.max(3, Math.floor(usable.length * 0.03));
    if (!neutralDominant) {
      var winner = -1, highest = -1;
      groups.forEach(function (group, bucket) {
        var before = groups[(bucket + 23) % 24], after = groups[(bucket + 1) % 24];
        var count = group.count + before.count + after.count;
        var score = group.score + (before.score + after.score) * 0.42;
        if (count >= minimumCount && score > highest) { winner = bucket; highest = score; }
      });
      if (winner >= 0) {
        var centre = winner * 15 + 7.5;
        selected = candidates.filter(function (item) { return item.s >= 0.18 && hueDistance(item.h, centre) <= 27; });
      }
    }
    if (!selected.length) {
      var background = neutralDominant ? usable.filter(function (item) { return item.s < 0.18; }) : usable;
      selected = (background.length ? background : usable).map(function (item) { return Object.assign({}, item, { weight: 1 }); });
    }
    var red = 0, green = 0, blue = 0, total = 0;
    selected.forEach(function (item) { var weight = item.weight || 1; red += item.r * weight; green += item.g * weight; blue += item.b * weight; total += weight; });
    var colour = rgbToHsl(red / total, green / total, blue / total);
    colour.l = clamp(colour.l, 0.30, 0.55);
    if (!neutralDominant && colour.s >= 0.15) colour.s = clamp(colour.s, 0.28, 0.78);
    return hex(hslToRgb(colour.h, colour.s, colour.l));
  }

  function cropValues(value) {
    var match = String(value || '').match(/^(\d+(?:\.\d+)?)%\s+(\d+(?:\.\d+)?)%$/);
    return match ? [clamp(Number(match[1]), 0, 100) / 100, clamp(Number(match[2]), 0, 100) / 100] : [0.5, 0.35];
  }
  function proxyUrl(value) {
    var source;
    try { source = new URL(safeUrl(value)); } catch (_) { return ''; }
    var host = source.hostname.toLowerCase();
    if (source.protocol !== 'https:' || source.port || source.username || source.password) return '';
    if (!/^(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z]{2,63}$/.test(host)) return '';
    if (/(^|\.)(?:localhost|local|internal|intranet|corp|home|lan|test|invalid|example)(?:\.|$)/.test(host)) return '';
    if (/(?:^|\.)(?:localtest\.me|lvh\.me|nip\.io|sslip\.io)$/.test(host)) return '';
    var forbidden = false;
    source.searchParams.forEach(function (_, key) { if (/(?:token|auth|key|signature|credential|password|policy)/i.test(key)) forbidden = true; });
    if (forbidden) return '';
    source.hash = '';
    return 'https://images.weserv.nl/?url=' + encodeURIComponent(source.href) + '&w=128&h=128&fit=inside&output=png';
  }
  function loadColour(url, options) {
    return new Promise(function (resolve, reject) {
      if (typeof Image === 'undefined' || typeof document === 'undefined') { reject(new Error('Photo colours need a browser with image and canvas support.')); return; }
      var image = new Image(), settled = false;
      var timeout = setTimeout(function () { finish(new Error('The photo took too long to load. The previous colour is kept.')); }, options.timeout || 15000);
      function finish(error, result) {
        if (settled) return;
        settled = true; clearTimeout(timeout); image.onload = null; image.onerror = null;
        if (error) reject(error); else resolve(result);
      }
      image.crossOrigin = 'anonymous';
      image.referrerPolicy = 'no-referrer';
      image.decoding = 'async';
      image.onload = function () {
        try {
          var width = image.naturalWidth, height = image.naturalHeight;
          if (!width || !height) throw new Error('The photo has no readable dimensions.');
          var aspect = Number(options.aspectRatio) || 1.25;
          aspect = clamp(aspect, 0.4, 3);
          var crop = cropValues(options.crop), sourceWidth = width, sourceHeight = height;
          if (width / height > aspect) sourceWidth = height * aspect;
          else sourceHeight = width / aspect;
          var sourceX = (width - sourceWidth) * crop[0], sourceY = (height - sourceHeight) * crop[1];
          var canvas = document.createElement('canvas'); canvas.width = 64; canvas.height = 64;
          var context = canvas.getContext('2d', { willReadFrequently: true });
          if (!context) throw new Error('This browser could not open an image canvas.');
          context.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, 64, 64);
          finish(null, fromPixels(context.getImageData(0, 0, 64, 64).data));
        } catch (error) {
          finish(new Error(error && error.name === 'SecurityError' ? 'This image host blocks colour sampling. The previous colour is kept.' : error.message));
        }
      };
      image.onerror = function () { finish(new Error('The photo could not be sampled. Its host may block colour access; the previous colour is kept.')); };
      image.src = url;
    });
  }
  function abortable(promise, signal) {
    if (!signal) return promise;
    return new Promise(function (resolve, reject) {
      function abort() { var error = new Error('Photo colour sampling was cancelled.'); error.name = 'AbortError'; reject(error); }
      if (signal.aborted) { abort(); return; }
      signal.addEventListener('abort', abort, { once: true });
      promise.then(function (value) { signal.removeEventListener('abort', abort); if (!signal.aborted) resolve(value); }, function (error) { signal.removeEventListener('abort', abort); if (!signal.aborted) reject(error); });
    });
  }
  function get(value, options) {
    options = options || {};
    var original, source;
    try { original = safeUrl(value); source = options.sourceUrl ? safeUrl(options.sourceUrl) : original; }
    catch (error) { return Promise.reject(error); }
    var crop = cropValues(options.crop), aspect = clamp(Number(options.aspectRatio) || 1.25, 0.4, 3);
    var key = [original, source, crop.join(','), aspect].join('|');
    if (options.refresh) cache.delete(key);
    if (!cache.has(key)) {
      var loadOptions = Object.assign({}, options, { aspectRatio: aspect });
      var proxy = options.allowProxy === false ? '' : proxyUrl(source);
      var host = new URL(source).hostname.toLowerCase();
      var knownNoCors = host === 'i.pinimg.com' || host === 'l3n.co' || host.endsWith('.l3n.co');
      var promise = knownNoCors && proxy ? loadColour(proxy, loadOptions) : loadColour(source, loadOptions).catch(function (error) {
        if (!proxy) throw error;
        return loadColour(proxy, loadOptions);
      });
      cache.set(key, promise);
      promise.catch(function () { if (cache.get(key) === promise) cache.delete(key); });
      if (cache.size > 128) cache.delete(cache.keys().next().value);
    }
    return abortable(cache.get(key), options.signal);
  }
  function clear() { cache.clear(); }
  return { version: 2, get: get, fromPixels: fromPixels, proxyUrl: proxyUrl, clear: clear };
}));

(function (root, factory) {
  'use strict';
  var existing = root.BlueHourTopicDates;
  if (existing && existing.version === 1) {
    if (typeof module === 'object' && module.exports) module.exports = existing;
    else if (typeof existing.start === 'function') existing.start();
    return;
  }
  var api = factory(root);
  if (typeof module === 'object' && module.exports) module.exports = api;
  else {
    root.BlueHourTopicDates = api;
    api.start();
  }
}(typeof globalThis !== 'undefined' ? globalThis : this, function (root) {
  'use strict';
  var origin = 'https://bluehour.jcink.net';
  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var document = root.document;
  var requests = new Map();
  var queue = [];
  var active = 0;
  var entryStates = new WeakMap();
  var entryOrder = new WeakMap();
  var sequence = 0;
  var started = false;
  var scheduled = false;
  var observer;
  var selector = '.bh-dossier-v5';

  function canonicalTopicUrl(value) {
    if (typeof value !== 'string' || value.length > 4000 || /[\u0000-\u0020\u007f]/.test(value)) return '';
    if (!/^https:\/\/bluehour\.jcink\.net\/index\.php(?:\?|$)/i.test(value)) return '';
    try {
      var url = new URL(value);
      var ids = url.searchParams.getAll('showtopic');
      if (url.origin !== origin || url.hostname !== 'bluehour.jcink.net' || url.port || url.username || url.password || url.pathname !== '/index.php' || ids.length !== 1 || !/^\d+$/.test(ids[0])) return '';
      var id = ids[0].replace(/^0+/, '');
      return id ? origin + '/index.php?showtopic=' + id + '&st=0' : '';
    } catch (_) { return ''; }
  }

  function validDate(value) {
    if (typeof value !== 'string' || !/^\d{4}(?:-\d{2}(?:-\d{2})?)?$/.test(value)) return '';
    var parts = value.split('-').map(Number), year = parts[0], month = parts[1], day = parts[2];
    if (year < 1 || (month !== undefined && (month < 1 || month > 12))) return '';
    if (day !== undefined) {
      var leap = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
      var days = [31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      if (day < 1 || day > days[month - 1]) return '';
    }
    return value;
  }

  function isoDate(year, month, day) {
    return validDate(String(year).padStart(4, '0') + '-' + String(month).padStart(2, '0') + '-' + String(day).padStart(2, '0'));
  }

  function parseTopicDate(html, now) {
    if (typeof html !== 'string' || html.length > 5000000) return '';
    var clean = html.replace(/<!--[\s\S]*?-->/g, '').replace(/<(script|style|template)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, '');
    var anchors = /<a\b([^>]*)>([\s\S]*?)<\/a\s*>/gi, match;
    while ((match = anchors.exec(clean))) {
      var onclick = match[1].match(/(?:^|\s)onclick\s*=\s*(["'])([\s\S]*?)\1/i);
      var classes = match[1].match(/(?:^|\s)class\s*=\s*(["'])([\s\S]*?)\1/i);
      if (!onclick || !/^\s*link_to_post\(\s*\d+\s*\);\s*return\s+false;\s*$/.test(onclick[2])) continue;
      if (!classes || !/(?:^|\s)sort(?:\s|$)/.test(classes[2])) return '';
      var stamp = match[2].replace(/<[^>]*>/g, '').replace(/&nbsp;|&#160;|&#x0*a0;/gi, ' ').replace(/\s+/g, ' ').trim();
      var absolute = stamp.match(/^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{1,2}) (\d{4}), (\d{1,2}):(\d{2}) (AM|PM)$/i);
      var relative = stamp.match(/^(Today|Yesterday)(?:, | at )(\d{1,2}):(\d{2}) (AM|PM)$/i);
      var hour = absolute ? Number(absolute[4]) : relative ? Number(relative[2]) : 0;
      var minute = absolute ? Number(absolute[5]) : relative ? Number(relative[3]) : 60;
      if (hour < 1 || hour > 12 || minute > 59) return '';
      if (absolute) {
        var month = months.findIndex(function (name) { return name.slice(0, 3).toLowerCase() === absolute[1].toLowerCase(); }) + 1;
        return isoDate(Number(absolute[3]), month, Number(absolute[2]));
      }
      if (relative) {
        var current = now === undefined ? new Date() : new Date(now);
        if (!Number.isFinite(current.getTime())) return '';
        current.setDate(current.getDate() - (relative[1].toLowerCase() === 'yesterday' ? 1 : 0));
        return isoDate(current.getFullYear(), current.getMonth() + 1, current.getDate());
      }
      return '';
    }
    return '';
  }

  function connected(element) {
    return !!element && element.isConnected !== false && !!document && !!document.documentElement && document.documentElement.contains(element);
  }

  function rememberOrder(entry) {
    if (!entryOrder.has(entry)) entryOrder.set(entry, sequence++);
  }

  function effectiveDate(entry) {
    return validDate(entry.getAttribute('data-story-date') || entry.getAttribute('data-posted-date') || '');
  }

  function sortEntries(entries) {
    return Array.from(entries).map(function (entry) { rememberOrder(entry); return entry; }).sort(function (a, b) {
      var ad = effectiveDate(a), bd = effectiveDate(b);
      if (!ad && !bd) return entryOrder.get(a) - entryOrder.get(b);
      if (!ad) return 1;
      if (!bd) return -1;
      function key(value) { var parts = value.split('-').map(Number); return parts[0] * 10000 + (parts[1] || 0) * 100 + (parts[2] || 0); }
      return key(ad) - key(bd) || entryOrder.get(a) - entryOrder.get(b);
    });
  }

  function reorder(article) {
    article.querySelectorAll('.bd1-story-panel').forEach(function (panel) {
      var entries = sortEntries(panel.querySelectorAll('.bd1-entry'));
      if (!entries.length) return;
      var oldGroups = Array.from(panel.children).filter(function (child) { return child.classList.contains('bd1-year-group'); });
      var fragment = document.createDocumentFragment(), currentYear = null, timeline;
      entries.forEach(function (entry) {
        var value = effectiveDate(entry), year = value ? value.slice(0, 4) : 'Date Unavailable';
        if (year !== currentYear) {
          currentYear = year;
          var group = document.createElement('div'), heading = document.createElement('h3');
          group.className = 'bd1-year-group';
          heading.className = 'bd1-year';
          heading.textContent = year;
          timeline = document.createElement('ol');
          timeline.className = 'bd1-timeline';
          group.appendChild(heading);
          group.appendChild(timeline);
          fragment.appendChild(group);
        }
        timeline.appendChild(entry);
      });
      panel.insertBefore(fragment, oldGroups[0] || null);
      oldGroups.forEach(function (group) { group.parentNode.removeChild(group); });
    });
  }

  function fetchDate(url) {
    return new Promise(function (resolve) {
      var controller = typeof root.AbortController === 'function' ? new root.AbortController() : null;
      var finished = false;
      var timer = root.setTimeout(function () {
        finish('');
        if (controller) controller.abort();
      }, 10000);
      function finish(value) {
        if (finished) return;
        finished = true;
        root.clearTimeout(timer);
        resolve(value);
      }
      Promise.resolve().then(function () {
        var options = { credentials: 'same-origin', redirect: 'error' };
        if (controller) options.signal = controller.signal;
        return root.fetch(url, options);
      }).then(function (response) {
        if (!response || !response.ok || response.redirected || (response.url && canonicalTopicUrl(response.url) !== url)) return '';
        return response.text();
      }).then(function (html) { finish(parseTopicDate(html)); }, function () { finish(''); });
    });
  }

  function drain() {
    while (active < 2 && queue.length) {
      var job = queue.shift();
      active += 1;
      (function (current) {
        fetchDate(current.url).then(function (date) {
          active -= 1;
          current.resolve(date);
          drain();
        });
      }(job));
    }
  }

  function requestDate(url) {
    if (!requests.has(url)) {
      var promise = new Promise(function (resolve) { queue.push({ url: url, resolve: resolve }); });
      requests.set(url, promise);
      drain();
    }
    return requests.get(url);
  }

  function stillEligible(entry, article, state) {
    return entryStates.get(entry) === state && connected(article) && connected(entry) && article.contains(entry) && entry.getAttribute('data-topic-url') === state.source && !entry.getAttribute('data-story-date') && !entry.getAttribute('data-posted-date');
  }

  function applyDate(entry, article, date, url) {
    entry.setAttribute('data-posted-date', date);
    entry.setAttribute('data-posted-date-source', url);
    var parts = date.split('-'), label = entry.getAttribute('data-date-label');
    var span = entry.querySelector('.bd1-entry-date');
    var meta = entry.querySelector('.bd1-entry-meta');
    if (!span && meta) {
      span = document.createElement('span');
      span.className = 'bd1-entry-date';
      var type = meta.querySelector('.bd1-type');
      meta.insertBefore(span, type ? type.nextSibling : meta.firstChild);
    }
    if (span) {
      span.textContent = label || months[Number(parts[1]) - 1].slice(0, 3) + ' \u2019' + parts[0].slice(-2);
      span.setAttribute('title', 'Topic started ' + Number(parts[2]) + ' ' + months[Number(parts[1]) - 1] + ' ' + parts[0]);
    }
    reorder(article);
  }

  function initialize(article) {
    if (!root.location || root.location.origin !== origin || typeof root.fetch !== 'function' || !connected(article)) return;
    article.querySelectorAll('.bd1-entry').forEach(rememberOrder);
    article.querySelectorAll('.bd1-entry[data-topic-url]').forEach(function (entry) {
      if (entry.getAttribute('data-story-date') || entry.getAttribute('data-posted-date')) return;
      var source = entry.getAttribute('data-topic-url'), url = canonicalTopicUrl(source);
      if (!url) return;
      var prior = entryStates.get(entry);
      if (prior && prior.source === source) return;
      var state = { source: source };
      entryStates.set(entry, state);
      requestDate(url).then(function (date) {
        if (!date) return;
        if (!stillEligible(entry, article, state)) {
          if (entryStates.get(entry) === state) entryStates.delete(entry);
          return;
        }
        applyDate(entry, article, date, url);
      });
    });
  }

  function allowed() {
    return !!document && !!root.location && root.location.origin === origin && typeof root.fetch === 'function';
  }

  function scan() {
    if (!allowed()) return;
    document.querySelectorAll(selector).forEach(initialize);
  }

  function scheduleScan() {
    if (scheduled) return;
    scheduled = true;
    root.setTimeout(function () { scheduled = false; scan(); }, 0);
  }

  function start() {
    if (!allowed()) return;
    if (started) { scan(); return; }
    started = true;
    document.addEventListener('DOMContentLoaded', scheduleScan);
    if (typeof root.MutationObserver === 'function' && document.documentElement) {
      observer = new root.MutationObserver(function (mutations) {
        if (mutations.some(function (mutation) {
          var target = mutation.target;
          if (mutation.type === 'attributes') return !!target && target.matches && target.matches('.bd1-entry[data-topic-url]') && !!target.closest(selector);
          if (mutation.type !== 'childList') return false;
          return Array.from(mutation.addedNodes).some(function (node) {
            if (node.nodeType !== 1) return false;
            if ((node.matches && node.matches(selector)) || (node.querySelector && node.querySelector(selector))) return true;
            var hasEntry = (node.matches && node.matches('.bd1-entry[data-topic-url]')) || (node.querySelector && node.querySelector('.bd1-entry[data-topic-url]'));
            return !!hasEntry && ((node.closest && node.closest(selector)) || (target && target.closest && target.closest(selector)));
          });
        })) scheduleScan();
      });
      observer.observe(document.documentElement, { subtree: true, childList: true, attributes: true, attributeFilter: ['data-topic-url', 'data-story-date', 'data-posted-date', 'data-date-label'] });
    }
    scan();
  }

  return { version: 1, start: start, initialize: initialize, canonicalTopicUrl: canonicalTopicUrl, parseTopicDate: parseTopicDate, sortEntries: sortEntries };
}));

(function (root, factory) {
  'use strict';
  var existing = root.BlueHourDossierRuntime;
  if (existing && existing.version === 5 && existing.revision >= 2) {
    if (typeof module === 'object' && module.exports) module.exports = existing;
    else existing.start();
    return;
  }
  var api = factory(root);
  if (typeof module === 'object' && module.exports) module.exports = api;
  else {
    root.BlueHourDossierRuntime = api;
    api.start();
  }
}(typeof globalThis !== 'undefined' ? globalThis : this, function (root) {
  'use strict';
  var document = root.document;
  var selector = '.bh-dossier-v5';
  var articleStates = new WeakMap();
  var mapStates = new WeakMap();
  var activeMaps = new Set();
  var activeThemes = new Set();
  var started = false;
  var scheduled = false;
  var observer;
  var paletteRetry;
  var paletteAttempts = 0;
  var channel = 'blue-hour-dossier-map-v5';
  var themeRetryDelays = [1000, 4000];

  function normalizeColour(value) {
    var colour = String(value || '').trim();
    if (/^#[0-9a-f]{3}$/i.test(colour)) {
      colour = '#' + colour.slice(1).split('').map(function (letter) { return letter + letter; }).join('');
    }
    return /^#[0-9a-f]{6}$/i.test(colour) ? colour.toLowerCase() : '#5b8612';
  }

  function normalizeLocation(value) {
    if (!value || typeof value !== 'object') return null;
    function number(input) {
      if (typeof input !== 'string' && typeof input !== 'number') return NaN;
      if (typeof input === 'string' && !input.trim()) return NaN;
      return Number(input);
    }
    var lat = number(value.lat), lon = number(value.lon);
    var zoom = value.zoom === undefined || value.zoom === null ? 11 : number(value.zoom);
    if (!Number.isFinite(lat) || lat < -85 || lat > 85 || !Number.isFinite(lon) || lon < -180 || lon > 180 || !Number.isInteger(zoom) || zoom < 2 || zoom > 18) return null;
    return { lat: lat, lon: lon, zoom: zoom };
  }

  function mapBoot(configuration) {
    var mapStatus = document.getElementById('status');
    var loaded = false, marker, map, api;
    function report(state) {
      if (state === 'ready') {
        loaded = true;
        mapStatus.hidden = true;
      } else if (!loaded) {
        mapStatus.textContent = 'Map Unavailable';
      } else return;
      parent.postMessage({ channel: 'blue-hour-dossier-map-v5', state: state }, '*');
    }
    function setMarker(colour) {
      if (marker) marker.remove();
      marker = new api.Marker({ color: colour, scale: 0.65 }).setLngLat({ lng: configuration.lon, lat: configuration.lat }).addTo(map);
    }
    try {
      api = window.maplibregl;
      if (!api) throw new Error('Map Unavailable');
      map = new api.Map({
        container: 'map',
        style: 'https://tiles.openfreemap.org/styles/positron',
        center: { lng: configuration.lon, lat: configuration.lat },
        zoom: configuration.zoom,
        minZoom: 2,
        maxZoom: 18,
        attributionControl: false,
        dragRotate: false,
        pitchWithRotate: false,
        scrollZoom: false,
        renderWorldCopies: false
      });
      map.addControl(new api.NavigationControl({ showCompass: false }), 'top-right');
      setMarker(configuration.colour);
      map.on('load', function () { report('ready'); });
      map.on('error', function () { report('error'); });
      window.addEventListener('message', function (event) {
        if (event.source !== parent || !event.data || event.data.channel !== 'blue-hour-dossier-map-v5' || event.data.action !== 'colour') return;
        if (typeof event.data.colour !== 'string' || !/^#[0-9a-f]{6}$/i.test(event.data.colour)) return;
        setMarker(event.data.colour);
      });
    } catch (_) {
      report('error');
    }
  }

  function buildMapDocument(value, accent) {
    var location = normalizeLocation(value);
    if (!location) throw new Error('The map needs valid latitude, longitude and zoom values.');
    var configuration = { lat: location.lat, lon: location.lon, zoom: location.zoom, colour: normalizeColour(accent) };
    return '<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' +
      '<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/maplibre-gl@5.6.2/dist/maplibre-gl.css">' +
      '<style>html,body,#map{margin:0;width:100%;height:100%;background:#e8e9e4}#map{position:absolute;inset:0}#status{position:absolute;inset:0;display:grid;place-items:center;margin:0;padding:16px;font:12px/1.4 sans-serif;color:#465247;text-align:center;pointer-events:none}#status[hidden]{display:none}.maplibregl-ctrl-top-right{top:0;right:0}.maplibregl-ctrl-group{box-shadow:0 1px 4px #0002}.maplibregl-ctrl-group button{width:27px;height:27px}</style>' +
      '</head><body><div id="map" aria-label="Interactive Location Map"></div><p id="status" role="status">Loading Map</p>' +
      '<script src="https://cdn.jsdelivr.net/npm/maplibre-gl@5.6.2/dist/maplibre-gl.js"></scr' + 'ipt>' +
      '<script>(' + mapBoot.toString() + ')(' + JSON.stringify(configuration) + ');</scr' + 'ipt></body></html>';
  }

  function connected(element) {
    return !!element && element.isConnected !== false && !!document && !!document.documentElement && document.documentElement.contains(element);
  }

  function articleColour(article) {
    var colour = article.style.getPropertyValue('--bd1-accent');
    if (!colour && root.getComputedStyle) colour = root.getComputedStyle(article).getPropertyValue('--bd1-accent');
    return normalizeColour(colour);
  }

  function setMapStatus(state, text) {
    if (!state.status) return;
    state.status.textContent = text;
    state.status.hidden = false;
  }

  function disposeMap(state) {
    if (state.timer) root.clearTimeout(state.timer);
    state.timer = null;
    activeMaps.delete(state);
    if (state.frame && state.frame.parentNode) state.frame.parentNode.removeChild(state.frame);
    if (mapStates.get(state.element) === state) mapStates.delete(state.element);
  }

  function sendColour(state, colour) {
    if (state.colour === colour) return;
    state.colour = colour;
    if (state.ready && state.frame.contentWindow) state.frame.contentWindow.postMessage({ channel: channel, action: 'colour', colour: colour }, '*');
  }

  function initializeMap(element, article) {
    var location = normalizeLocation({ lat: element.getAttribute('data-lat'), lon: element.getAttribute('data-lon'), zoom: element.getAttribute('data-zoom') });
    var key = location ? [location.lat, location.lon, location.zoom].join('|') : '';
    var previous = mapStates.get(element);
    var colour = articleColour(article);
    if (previous && previous.key === key) {
      sendColour(previous, colour);
      return;
    }
    if (previous) disposeMap(previous);
    var status = element.querySelector('.bd5-map-status');
    if (!status) {
      status = document.createElement('p');
      status.className = 'bd5-map-status';
      status.setAttribute('role', 'status');
      element.appendChild(status);
    }
    if (!location) {
      status.hidden = false;
      if (status.textContent !== 'Open the Location Below') status.textContent = 'Open the Location Below';
      element.setAttribute('data-map-state', 'error');
      return;
    }
    var frame = document.createElement('iframe');
    frame.setAttribute('sandbox', 'allow-scripts');
    frame.setAttribute('title', 'Map of ' + (element.getAttribute('data-label') || 'Current Location'));
    frame.setAttribute('width', '185');
    frame.setAttribute('height', '185');
    frame.setAttribute('loading', 'eager');
    frame.srcdoc = buildMapDocument(location, colour);
    var state = { element: element, article: article, frame: frame, status: status, key: key, colour: colour, ready: false, timer: null };
    mapStates.set(element, state);
    activeMaps.add(state);
    setMapStatus(state, 'Loading Map');
    element.setAttribute('data-map-state', 'loading');
    element.appendChild(frame);
    state.timer = root.setTimeout(function () {
      state.timer = null;
      if (!connected(element) || mapStates.get(element) !== state || state.ready) return;
      setMapStatus(state, 'Map Unavailable - Open the Location Below');
      element.setAttribute('data-map-state', 'error');
    }, 30000);
  }

  function receiveMapMessage(event) {
    if (!event.data || event.data.channel !== channel || (event.data.state !== 'ready' && event.data.state !== 'error')) return;
    activeMaps.forEach(function (state) {
      if (!connected(state.element) || event.source !== state.frame.contentWindow) return;
      if (event.data.state === 'ready') {
        state.ready = true;
        if (state.timer) root.clearTimeout(state.timer);
        state.timer = null;
        state.status.hidden = true;
        state.element.setAttribute('data-map-state', 'ready');
        state.frame.contentWindow.postMessage({ channel: channel, action: 'colour', colour: state.colour }, '*');
      } else if (!state.ready) {
        setMapStatus(state, 'Map Unavailable - Open the Location Below');
        state.element.setAttribute('data-map-state', 'error');
      }
    });
  }

  function paletteApi() { return root.PhotoPalette || root.globalPhotoPalette; }

  function schedulePaletteRetry() {
    if (paletteRetry || paletteAttempts >= 20) return;
    paletteAttempts += 1;
    paletteRetry = root.setTimeout(function () { paletteRetry = null; scan(); }, 500);
  }

  function themeInput(article) {
    var mode = article.getAttribute('data-theme-mode') === 'manual' ? 'manual' : 'auto';
    var image = article.querySelector('.bd1-hero img');
    var url = image ? (image.getAttribute('srcset') ? image.currentSrc || image.src : image.src) : '';
    var crop = article.style.getPropertyValue('--bd2-image-position').trim() || '50% 35%';
    return { mode: mode, url: url, crop: crop, key: [mode, url, crop].join('|') };
  }

  function cancelTheme(state) {
    state.token += 1;
    if (state.retryTimer !== null) root.clearTimeout(state.retryTimer);
    state.retryTimer = null;
    if (state.controller) state.controller.abort();
    state.controller = null;
    activeThemes.delete(state);
  }

  function resetTheme(state, key) {
    cancelTheme(state);
    state.themeKey = key;
    state.phase = '';
    state.attempts = 0;
  }

  function sampleTheme(article, state, input, palette) {
    var key = input.key;
    var token = ++state.token;
    state.attempts += 1;
    state.phase = 'loading';
    state.controller = root.AbortController ? new root.AbortController() : null;
    var controller = state.controller;
    activeThemes.add(state);
    article.setAttribute('data-theme-state', 'loading');
    function current() {
      return connected(article) && state.token === token && state.themeKey === key && themeInput(article).key === key;
    }
    Promise.resolve().then(function () {
      if (!current()) return null;
      return palette.get(input.url, { crop: input.crop, aspectRatio: 1.25, signal: controller ? controller.signal : undefined, refresh: state.attempts > 1 });
    }).then(function (colour) {
      if (!current()) return;
      if (typeof colour !== 'string' || !/^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i.test(colour)) throw new Error('The photo did not return a valid colour.');
      var normalized = normalizeColour(colour);
      state.phase = 'ready';
      state.controller = null;
      activeThemes.delete(state);
      article.style.setProperty('--bd1-accent', normalized);
      article.setAttribute('data-theme-state', 'ready');
      article.querySelectorAll('.bd3-map[data-lat][data-lon]').forEach(function (element) {
        var mapState = mapStates.get(element);
        if (mapState) sendColour(mapState, normalized);
      });
    }).catch(function () {
      if (!current()) return;
      state.controller = null;
      if (state.attempts <= themeRetryDelays.length) {
        state.phase = 'retrying';
        article.setAttribute('data-theme-state', 'retrying');
        state.retryTimer = root.setTimeout(function () {
          state.retryTimer = null;
          if (!current()) {
            if (state.token === token) resetTheme(state, '');
            return;
          }
          var nextPalette = paletteApi();
          if (!nextPalette || typeof nextPalette.get !== 'function') {
            state.phase = 'error';
            activeThemes.delete(state);
            article.setAttribute('data-theme-state', 'error');
            return;
          }
          sampleTheme(article, state, input, nextPalette);
        }, themeRetryDelays[state.attempts - 1]);
      } else {
        state.phase = 'error';
        activeThemes.delete(state);
        article.setAttribute('data-theme-state', 'error');
      }
    });
  }

  function applyTheme(article, state) {
    var input = themeInput(article);
    var mode = input.mode, url = input.url, crop = input.crop, key = input.key;
    if (mode === 'manual' || !url) {
      if (state.themeKey !== key) resetTheme(state, key);
      state.phase = mode === 'manual' ? 'manual' : 'empty';
      article.setAttribute('data-theme-state', mode === 'manual' ? 'manual' : 'empty');
      return;
    }
    var palette = paletteApi();
    if (!palette || typeof palette.get !== 'function') {
      if (state.themeKey !== key) resetTheme(state, key);
      state.phase = 'waiting';
      article.setAttribute('data-theme-state', paletteAttempts >= 20 ? 'error' : 'waiting');
      schedulePaletteRetry();
      return;
    }
    if (state.themeKey !== key) resetTheme(state, key);
    else if (state.phase && state.phase !== 'waiting') return;
    sampleTheme(article, state, input, palette);
  }

  function initializeArticle(article) {
    if (!connected(article)) return;
    var state = articleStates.get(article);
    if (!state) { state = { article: article, themeKey: '', token: 0, phase: '', attempts: 0, retryTimer: null, controller: null }; articleStates.set(article, state); }
    article.querySelectorAll('.bd3-map[data-lat][data-lon]').forEach(function (element) { initializeMap(element, article); });
    applyTheme(article, state);
  }

  function scan(scope) {
    if (!document) return;
    activeMaps.forEach(function (state) { if (!connected(state.element) || !connected(state.article)) disposeMap(state); });
    activeThemes.forEach(function (state) { if (!connected(state.article)) resetTheme(state, ''); });
    var target = scope && typeof scope.querySelectorAll === 'function' ? scope : document;
    if (target.matches && target.matches(selector)) initializeArticle(target);
    target.querySelectorAll(selector).forEach(initializeArticle);
  }

  function scheduleScan() {
    if (scheduled) return;
    scheduled = true;
    root.setTimeout(function () { scheduled = false; scan(); }, 0);
  }

  function refresh(article) {
    if (article) {
      var state = articleStates.get(article);
      if (state) resetTheme(state, '');
      scan(article);
    } else {
      if (document) document.querySelectorAll(selector).forEach(function (element) {
        var state = articleStates.get(element);
        if (state) resetTheme(state, '');
      });
      scan();
    }
  }

  function start() {
    if (!document) return;
    if (started) { scan(); return; }
    started = true;
    root.addEventListener('message', receiveMapMessage);
    document.addEventListener('DOMContentLoaded', scheduleScan);
    document.addEventListener('load', function (event) {
      var target = event.target;
      if (target && (target.tagName === 'SCRIPT' || (target.matches && target.matches('.bd1-hero img')))) scheduleScan();
    }, true);
    if (root.MutationObserver && document.documentElement) {
      observer = new root.MutationObserver(function (mutations) {
        if (mutations.some(function (mutation) {
          var target = mutation.target;
          if (target && target.closest && target.closest(selector)) return true;
          if (mutation.type !== 'childList') return false;
          return Array.from(mutation.addedNodes).concat(Array.from(mutation.removedNodes)).some(function (node) {
            return node.nodeType === 1 && ((node.matches && node.matches(selector)) || (node.querySelector && node.querySelector(selector)));
          });
        })) scheduleScan();
      });
      observer.observe(document.documentElement, { subtree: true, childList: true, attributes: true, attributeFilter: ['src', 'srcset', 'style', 'data-theme-mode', 'data-lat', 'data-lon', 'data-zoom'] });
    }
    scan();
  }

  return { version: 5, revision: 2, start: start, scan: scan, refresh: refresh, normalizeLocation: normalizeLocation, normalizeColour: normalizeColour, buildMapDocument: buildMapDocument };
}));
