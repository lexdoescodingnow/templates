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
