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
    var selected = [], minimumCount = Math.max(3, Math.floor(usable.length * 0.008));
    if (colourful > usable.length * 0.025) {
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
    if (!selected.length) selected = usable.map(function (item) { return Object.assign({}, item, { weight: 1 }); });
    var red = 0, green = 0, blue = 0, total = 0;
    selected.forEach(function (item) { var weight = item.weight || 1; red += item.r * weight; green += item.g * weight; blue += item.b * weight; total += weight; });
    var colour = rgbToHsl(red / total, green / total, blue / total);
    colour.l = clamp(colour.l, 0.30, 0.55);
    if (colour.s >= 0.15) colour.s = clamp(colour.s, 0.28, 0.78);
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
  return { get: get, fromPixels: fromPixels, proxyUrl: proxyUrl, clear: clear };
}));

(function (root, factory) {
  'use strict';
  var existing = root.BlueHourDossierRuntime;
  if (existing && existing.version === 5) {
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
  var started = false;
  var scheduled = false;
  var observer;
  var paletteRetry;
  var paletteAttempts = 0;
  var channel = 'blue-hour-dossier-map-v5';

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

  function applyTheme(article, state) {
    var input = themeInput(article);
    var mode = input.mode, url = input.url, crop = input.crop, key = input.key;
    if (mode === 'manual' || !url) {
      if (state.themeKey !== key) state.token += 1;
      state.themeKey = key;
      article.setAttribute('data-theme-state', mode === 'manual' ? 'manual' : 'empty');
      return;
    }
    var palette = paletteApi();
    if (!palette || typeof palette.get !== 'function') {
      if (state.themeKey !== key) state.token += 1;
      state.themeKey = '';
      article.setAttribute('data-theme-state', paletteAttempts >= 20 ? 'error' : 'waiting');
      schedulePaletteRetry();
      return;
    }
    if (state.themeKey === key) return;
    state.themeKey = key;
    var token = ++state.token;
    article.setAttribute('data-theme-state', 'loading');
    Promise.resolve().then(function () { return palette.get(url, { crop: crop, aspectRatio: 1.25 }); }).then(function (colour) {
      if (!connected(article) || state.token !== token || state.themeKey !== key || themeInput(article).key !== key) return;
      if (typeof colour !== 'string' || !/^#(?:[0-9a-f]{3}|[0-9a-f]{6})$/i.test(colour)) throw new Error('The photo did not return a valid colour.');
      var normalized = normalizeColour(colour);
      article.style.setProperty('--bd1-accent', normalized);
      article.setAttribute('data-theme-state', 'ready');
      article.querySelectorAll('.bd3-map[data-lat][data-lon]').forEach(function (element) {
        var mapState = mapStates.get(element);
        if (mapState) sendColour(mapState, normalized);
      });
    }).catch(function () {
      if (connected(article) && state.token === token && state.themeKey === key && themeInput(article).key === key) article.setAttribute('data-theme-state', 'error');
    });
  }

  function initializeArticle(article) {
    if (!connected(article)) return;
    var state = articleStates.get(article);
    if (!state) { state = { themeKey: '', token: 0 }; articleStates.set(article, state); }
    article.querySelectorAll('.bd3-map[data-lat][data-lon]').forEach(function (element) { initializeMap(element, article); });
    applyTheme(article, state);
  }

  function scan(scope) {
    if (!document) return;
    activeMaps.forEach(function (state) { if (!connected(state.element) || !connected(state.article)) disposeMap(state); });
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
      if (state) { state.themeKey = ''; state.token += 1; }
      scan(article);
    } else {
      if (document) document.querySelectorAll(selector).forEach(function (element) {
        var state = articleStates.get(element);
        if (state) { state.themeKey = ''; state.token += 1; }
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

  return { version: 5, start: start, scan: scan, refresh: refresh, normalizeLocation: normalizeLocation, normalizeColour: normalizeColour, buildMapDocument: buildMapDocument };
}));
