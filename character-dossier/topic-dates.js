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
