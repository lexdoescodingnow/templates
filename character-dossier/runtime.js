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
