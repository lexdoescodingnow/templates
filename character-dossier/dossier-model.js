(function (root, factory) {
  'use strict';
  var api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.Dossier = api;
}(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';

  var TYPES = ['Thread', 'Comms', 'Bud', 'Milestone'];
  var KINDS = ['Partner', 'Friend', 'Family', 'Group', 'Other'];
  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  function object(value) { return value !== null && typeof value === 'object' && !Array.isArray(value); }
  function text(value, limit) {
    if (typeof value !== 'string' && typeof value !== 'number') return '';
    var source = String(value).trim(), maximum = limit || 2000;
    if (source.length > maximum) throw new Error('A text field exceeds its ' + maximum + '-character limit. Shorten it before importing or saving.');
    return source;
  }
  function list(value, limit) {
    if (value == null) return [];
    if (!Array.isArray(value)) throw new Error('List fields must contain a list of items.');
    var maximum = limit || 100;
    if (value.length > maximum) throw new Error('A list exceeds its limit of ' + maximum + ' items. Split it before importing or saving.');
    return value;
  }
  function records(value, limit) {
    var items = list(value, limit);
    if (items.some(function (item) { return !object(item); })) throw new Error('Every item in this list must be a record.');
    return items;
  }
  function escapeHtml(value) {
    return String(value == null ? '' : value).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; });
  }
  function safeUrl(value) {
    var source = text(value, 4000);
    if (!source || /[\u0000-\u0020\u007f]/.test(source)) return '';
    try {
      var url = new URL(source);
      return (url.protocol === 'https:' || url.protocol === 'http:') && !url.username && !url.password ? url.href : '';
    } catch (_) { return ''; }
  }
  function stylesheetUrl(value) {
    var absolute = safeUrl(value);
    if (absolute) return absolute;
    var source = text(value, 4000);
    return /^(?:\.\/|\.\.\/|\/(?!\/))[A-Za-z0-9_./%?=&-]+\.css(?:[?#][A-Za-z0-9_.%?=&-]*)?$/.test(source) && source.indexOf('\\') < 0 ? source : '';
  }
  function slug(value, fallback) {
    return text(value, 1000).normalize('NFKD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9_-]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 100) || fallback;
  }
  function uniqueId(value, fallback, used) {
    var base = slug(value, fallback), id = base, count = 2;
    while (used.has(id)) { id = base + '-' + count; count += 1; }
    used.add(id);
    return id;
  }
  function date(value, label) {
    var source = text(value, 40);
    if (!source) return '';
    if (!/^\d{4}(?:-\d{2}(?:-\d{2})?)?$/.test(source)) throw new Error((label || 'Date') + ' must use YYYY, YYYY-MM, or YYYY-MM-DD.');
    var parts = source.split('-').map(Number), year = parts[0], month = parts[1], day = parts[2];
    if (year < 1 || (month !== undefined && (month < 1 || month > 12))) throw new Error((label || 'Date') + ' is not a valid calendar date.');
    if (day !== undefined) {
      var leap = year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
      var days = [31, leap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      if (day < 1 || day > days[month - 1]) throw new Error((label || 'Date') + ' is not a valid calendar date.');
    }
    return source;
  }
  function choice(value, allowed, fallback) {
    var source = text(value, 80).toLowerCase();
    return allowed.find(function (item) { return item.toLowerCase() === source; }) || fallback;
  }
  function coordinate(value, limit, label) {
    var source = text(value, 40);
    if (!source) return '';
    if (!/^-?(?:\d+\.?\d*|\.\d+)$/.test(source) || !Number.isFinite(Number(source)) || Math.abs(Number(source)) > limit) throw new Error(label + ' must be a number between -' + limit + ' and ' + limit + '.');
    return String(Number(source));
  }
  function mapZoom(value) {
    if (value === undefined || value === null || value === '') return 11;
    var zoom = Number(value);
    if (!Number.isInteger(zoom) || zoom < 2 || zoom > 18) throw new Error('Map zoom must be a whole number from 2 to 18.');
    return zoom;
  }
  function normalizeCharacter(raw) {
    if (!object(raw)) throw new Error('Each character must be a character record.');
    var relationshipIds = new Set(), timelineIds = new Set(), relationshipMap = new Map();
    var relationships = records(raw.relationships, 200).map(function (item, index) {
      var id = uniqueId(item.id || item.name, 'connection-' + (index + 1), relationshipIds);
      var originalId = text(item.id, 100);
      if (originalId && !relationshipMap.has(originalId)) relationshipMap.set(originalId, id);
      if (!relationshipMap.has(id)) relationshipMap.set(id, id);
      return {
        id: id, name: text(item.name, 160), kind: choice(item.kind, KINDS, 'Other'),
        flavour: text(item.flavour, 160), brand: text(item.brand, 160), status: text(item.status, 120), portrait: safeUrl(item.portrait),
        url: safeUrl(item.url), summary: text(item.summary, 5000), pinned: item.pinned === true,
        featured: item.featured === true, quote: text(item.quote, 3000), playlistUrl: safeUrl(item.playlistUrl)
      };
    });
    var timeline = records(raw.timeline, 1500).map(function (item, index) {
      return {
        id: uniqueId(item.id || item.title, 'entry-' + (index + 1), timelineIds),
        title: text(item.title, 300), url: safeUrl(item.url), date: date(item.date, 'Story date'),
        dateLabel: text(item.dateLabel, 160), postedDate: date(item.postedDate, 'Posting date'), postedDateSource: safeUrl(item.postedDateSource),
        type: choice(item.type, TYPES, 'Thread'), status: text(item.status, 120),
        participants: text(item.participants, 400),
        connectionIds: Array.from(new Set(list(item.connectionIds, 200).map(function (id) { return relationshipMap.get(text(id, 100)); }).filter(Boolean))),
        summary: text(item.summary, 5000), milestone: item.milestone === true
      };
    });
    return {
      id: slug(raw.id || raw.name || raw.nickname, 'character'), name: text(raw.name, 160), nickname: text(raw.nickname, 160),
      age: text(raw.age, 40), pronouns: text(raw.pronouns, 80), gender: text(raw.gender, 120),
      occupation: text(raw.occupation, 250), location: text(raw.location, 250), writer: text(raw.writer, 120),
      portrait: safeUrl(raw.portrait), avatar: safeUrl(raw.avatar),
      polaroids: records(raw.polaroids, 3).map(function (photo) { return { name: text(photo.name, 160), image: safeUrl(photo.image), url: safeUrl(photo.url) }; }),
      mapLocation: text(raw.mapLocation, 250), mapLatitude: coordinate(raw.mapLatitude, 85, 'Map latitude'), mapLongitude: coordinate(raw.mapLongitude, 180, 'Map longitude'), mapZoom: mapZoom(raw.mapZoom),
      imagePosition: /^(?:100|[0-9]{1,2})% (?:100|[0-9]{1,2})%$/.test(text(raw.imagePosition, 20)) ? text(raw.imagePosition, 20) : '50% 35%',
      accent: /^#(?:[\da-f]{3}|[\da-f]{6})$/i.test(text(raw.accent, 20)) ? text(raw.accent, 20) : '#b7a58b',
      themeMode: raw.themeMode === 'manual' ? 'manual' : 'auto', paletteSource: safeUrl(raw.paletteSource),
      paletteVersion: Number.isSafeInteger(raw.paletteVersion) && raw.paletteVersion > 0 ? raw.paletteVersion : 0,
      paletteCrop: /^(?:100|[0-9]{1,2})% (?:100|[0-9]{1,2})%$/.test(text(raw.paletteCrop, 20)) ? text(raw.paletteCrop, 20) : '',
      tags: Array.from(new Set(list(raw.tags, 50).map(function (tag) { return text(tag, 120).replace(/^#+/, '').trim(); }).filter(Boolean))),
      facts: records(raw.facts, 150).map(function (fact) { return { label: text(fact.label, 160), value: text(fact.value, 2000) }; }),
      currentChapter: text(raw.currentChapter, 5000), asOf: text(raw.asOf, 120), notes: text(raw.notes, 15000),
      relationshipStatus: text(raw.relationshipStatus, 160), relationships: relationships, timeline: timeline,
      songs: records(raw.songs, 200).map(function (song) { return { title: text(song.title, 250), artist: text(song.artist, 250), url: safeUrl(song.url), note: text(song.note, 1500) }; }),
      playlistUrl: safeUrl(raw.playlistUrl)
    };
  }
  function normalizeDataset(raw) {
    var characters;
    if (object(raw) && Object.prototype.hasOwnProperty.call(raw, 'characters')) {
      if (raw.version !== undefined && raw.version !== 1) throw new Error('This file uses an unsupported character library version.');
      if (!Array.isArray(raw.characters) || !raw.characters.length) throw new Error('The character library must contain at least one character.');
      if (raw.characters.length > 500) throw new Error('A character library can contain up to 500 characters.');
      characters = raw.characters;
    } else if (object(raw) && ('name' in raw || 'id' in raw)) characters = [raw];
    else throw new Error('Choose a character library file, or a single character record.');
    var used = new Set();
    return { version: 1, characters: characters.map(function (rawCharacter, index) {
      var character = normalizeCharacter(rawCharacter);
      character.id = uniqueId(character.id, 'character-' + (index + 1), used);
      return character;
    }) };
  }
  function effectiveDate(entry) { return text(entry.date, 40) || text(entry.postedDate, 40); }
  function sortTimeline(entries) {
    return list(entries, 1500).map(function (entry, index) { return { entry: entry, index: index }; }).sort(function (a, b) {
      var ad = effectiveDate(a.entry), bd = effectiveDate(b.entry);
      if (!ad && !bd) return a.index - b.index;
      if (!ad) return 1;
      if (!bd) return -1;
      var ap = ad.split('-').map(Number), bp = bd.split('-').map(Number);
      var av = ap[0] * 10000 + (ap[1] || 0) * 100 + (ap[2] || 0);
      var bv = bp[0] * 10000 + (bp[1] || 0) * 100 + (bp[2] || 0);
      return av - bv || a.index - b.index;
    }).map(function (item) { return item.entry; });
  }
  function displayDate(value) {
    if (!value) return '';
    var parts = value.split('-');
    if (parts.length === 1) return parts[0];
    var month = MONTHS[Number(parts[1]) - 1];
    return (parts.length === 3 ? Number(parts[2]) + ' ' : '') + month + ' ' + parts[0];
  }
  function compactDate(value) {
    if (!value) return '';
    var parts = value.split('-');
    return parts.length === 1 ? parts[0] : MONTHS[Number(parts[1]) - 1].slice(0, 3) + ' \u2019' + parts[0].slice(-2);
  }
  function paragraphs(value, className) {
    if (!value) return '';
    return value.split(/\n\s*\n/).filter(function (part) { return part.trim(); }).map(function (part) {
      return '<p' + (className ? ' class="' + className + '"' : '') + '>' + escapeHtml(part.trim()).replace(/\n/g, '<br>') + '</p>';
    }).join('');
  }
  function external(url, label, className) {
    var safe = safeUrl(url);
    return safe ? '<a href="' + escapeHtml(safe) + '" target="_blank" rel="noopener noreferrer"' + (className ? ' class="' + className + '"' : '') + '>' + escapeHtml(label) + '</a>' : escapeHtml(label);
  }
  function spotify(url) {
    var safe = safeUrl(url);
    if (!safe) return null;
    var parsed = new URL(safe);
    if (parsed.hostname !== 'open.spotify.com' || parsed.port || parsed.protocol !== 'https:') return null;
    var match = parsed.pathname.match(/^\/(?:intl-[a-z]{2}\/)?(?:embed\/)?(track|playlist|album)\/([A-Za-z0-9]{22})\/?$/);
    return match ? { type: match[1], id: match[2], url: 'https://open.spotify.com/' + match[1] + '/' + match[2] } : null;
  }
  function player(url, title) {
    var data = spotify(url);
    if (!data) return url ? '<div class="bd1-listen">' + external(url, 'Listen ↗') + '</div>' : '';
    return '<iframe class="bd1-player" src="https://open.spotify.com/embed/' + data.type + '/' + data.id + '?utm_source=generator&amp;theme=0" width="100%" height="152" title="' + escapeHtml(title || 'Spotify player') + '" loading="lazy" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" allowfullscreen></iframe><div class="bd1-listen">' + external(data.url, 'Open in Spotify ↗') + '</div>';
  }
  function sectionHeading(number, title, extra) {
    return '<div class="bd1-section-heading"><span class="bd1-number">' + number + '</span><h2>' + escapeHtml(titleCase(title)) + '</h2>' + (extra ? '<span class="bd1-heading-note">' + escapeHtml(extra) + '</span>' : '') + '</div>';
  }
  function titleCase(value) {
    return String(value || '').replace(/(^|[\s,/&()\u2013\u2014-])(\p{L}[\p{L}\p{M}'\u2019]*)/gu, function (_, boundary, word, offset) {
      if (offset > 0 && /^(?:a|an|and|or|the|of|to|in|for|with|on)$/.test(word)) return boundary + word;
      return boundary + word.charAt(0).toLocaleUpperCase('en') + word.slice(1);
    });
  }
  function locationCase(value) { return titleCase(value).replace(/,\s*ca(?=\s*(?:$|[,;]))/gi, ', CA'); }
  function displayCharacter(c) {
    ['name', 'nickname', 'gender', 'occupation', 'relationshipStatus', 'writer', 'pronouns'].forEach(function (field) { c[field] = titleCase(c[field]); });
    c.location = locationCase(c.location); c.mapLocation = locationCase(c.mapLocation);
    c.facts.forEach(function (fact) {
      fact.label = titleCase(fact.label);
      if (/https?:\/\//i.test(fact.value) || fact.value.length > 250 || /\n/.test(fact.value)) return;
      fact.value = /residen|location|based in/i.test(fact.label) ? locationCase(fact.value) : titleCase(fact.value);
    });
    c.polaroids.forEach(function (photo) { photo.name = titleCase(photo.name); });
    c.relationships.forEach(function (r) { ['name', 'flavour', 'brand', 'status'].forEach(function (field) { r[field] = titleCase(r[field]); }); });
    c.timeline.forEach(function (entry) { ['title', 'participants', 'status'].forEach(function (field) { entry[field] = titleCase(entry[field]); }); });
    return c;
  }
  function pairedFacts(facts) {
    var remaining = facts.slice(), rows = [];
    function take(labels) {
      var index = remaining.findIndex(function (fact) { return labels.indexOf(fact.label.toLowerCase().replace(/[^a-z]/g, '')) !== -1; });
      return index < 0 ? null : remaining.splice(index, 1)[0];
    }
    [
      [['gender'], ['preferredname']],
      [['nationality'], ['ethnicity']],
      [['romanticality', 'romanticorientation'], ['sexuality', 'sexualorientation']],
      [['residency', 'residence'], ['birthday', 'dateofbirth']],
      [['languages', 'language'], ['bloodtype']],
      [['mbti'], ['westernzodiac', 'zodiac']],
      [['chinesezodiac'], ['faceclaim']],
      [['favoritecolor', 'favouritecolour', 'favouritecolor', 'favoritecolour'], ['favoritefood', 'favouritefood']]
    ].forEach(function (pair) {
      var row = pair.map(take).filter(Boolean);
      if (row.length) rows.push(row);
    });
    while (remaining.length) rows.push(remaining.splice(0, 2));
    return rows.map(function (row) { return '<div class="bd3-fact-row">' + row.map(function (fact) { return '<div><dt>' + escapeHtml(fact.label) + '</dt><dd>' + escapeHtml(fact.value) + '</dd></div>'; }).join('') + '</div>'; }).join('');
  }
  function locationMap(c) {
    if (c.mapLatitude === '' || c.mapLongitude === '') return '';
    var lat = Number(c.mapLatitude), lon = Number(c.mapLongitude);
    var full = 'https://www.openstreetmap.org/?mlat=' + lat + '&mlon=' + lon + '#map=' + c.mapZoom + '/' + lat + '/' + lon;
    var label = c.mapLocation || c.location || 'Current Location';
    return '<div class="bd3-map" data-lat="' + lat + '" data-lon="' + lon + '" data-zoom="' + c.mapZoom + '" data-label="' + escapeHtml(label) + '"><p class="bd5-map-status" role="status">Open the Location Below</p></div>' + external(full, label + ' ↗', 'bd3-map-label') + '<div class="bd4-map-credit">© ' + external('https://www.openstreetmap.org/copyright', 'OpenStreetMap') + ' · © ' + external('https://www.openmaptiles.org/', 'OpenMapTiles') + '</div>';
  }
  function render(raw, options) {
    options = options || {};
    var c = displayCharacter(normalizeCharacter(raw)), prefix = 'bd3-' + slug(options.instanceId || c.id, 'character');
    var sectionCounter = 0;
    function heading(title, extra) {
      sectionCounter += 1;
      return sectionHeading(String(sectionCounter).padStart(2, '0'), title, extra);
    }
    var relationships = c.relationships.filter(function (r) { return r.name; }).sort(function (a, b) { return Number(b.kind === 'Partner') - Number(a.kind === 'Partner'); });
    var photos = c.polaroids.filter(function (photo) { return photo.name || photo.image; });
    var map = locationMap(c);
    var entries = sortTimeline(c.timeline.filter(function (entry) { return entry.title; }));
    var songs = c.songs.filter(function (song) { return song.title || song.artist || song.url; });
    var byId = new Map(relationships.map(function (r) { return [r.id, r]; }));
    var hasPartners = relationships.some(function (r) { return r.kind === 'Partner'; });
    var facts = c.facts.filter(function (fact) {
      var label = fact.label.toLowerCase().replace(/[^a-z]/g, '');
      return fact.label && fact.value && !(hasPartners && /^(?:partner|partners|currentpartner|currentpartners)$/.test(label)) && !(c.relationshipStatus && /^(?:relationshipstatus|status)$/.test(label));
    });
    var basics = c.gender && !facts.some(function (fact) { return fact.label.toLowerCase() === 'gender'; }) ? [{ label: 'Gender', value: c.gender }] : [];
    var name = c.nickname || c.name;
    var meta = [c.age ? c.age + ' Years Old' : '', c.pronouns].filter(Boolean);
    var html = '<article class="bh-dossier-v5" data-theme-mode="' + c.themeMode + '" style="--bd1-accent:' + c.accent + ';--bd2-image-position:' + c.imagePosition + '">';
    html += '<header class="bd1-cover" id="' + prefix + '-overview">';
    html += '<div class="bd1-masthead"><span>Character Dossier</span>' + (c.writer ? '<span>Written by ' + escapeHtml(c.writer) + '</span>' : '') + '</div>';
    if (c.portrait) html += '<figure class="bd1-hero"><img src="' + escapeHtml(c.portrait) + '" alt="' + escapeHtml(name ? name + ' — character portrait' : 'Character portrait') + '" loading="lazy" referrerpolicy="no-referrer"><span class="bd1-photo-mark" aria-hidden="true">✦</span></figure>';
    html += '<div class="bd1-identity"><div class="bd1-identity-main">';
    if (c.avatar) html += '<img class="bd1-profile-image" src="' + escapeHtml(c.avatar) + '" alt="' + escapeHtml(name ? name + ' — portrait' : 'Character portrait') + '" loading="lazy" referrerpolicy="no-referrer">';
    html += '<span class="bd1-eyebrow">Character Profile</span>';
    if (name) html += '<h1>' + escapeHtml(name) + '</h1>';
    if (c.nickname && c.name && c.nickname.toLowerCase() !== c.name.toLowerCase()) html += '<div class="bd1-fullname">' + escapeHtml(c.name) + '</div>';
    if (meta.length) html += '<p class="bd1-identity-meta">' + meta.map(escapeHtml).join('<span aria-hidden="true"> / </span>') + '</p>';
    html += '</div>';
    if (c.relationshipStatus || c.occupation || c.location) html += '<div class="bd1-summary">' + (c.relationshipStatus ? '<span class="bd1-status">' + escapeHtml(c.relationshipStatus) + '</span>' : '') + (c.occupation ? '<span>' + escapeHtml(c.occupation) + '</span>' : '') + (c.location ? '<span>' + escapeHtml(c.location) + '</span>' : '') + '</div>';
    var stats = [[relationships.length, 'Connections', 'connections'], [entries.length, 'Stories', 'story'], [songs.length, 'Songs', 'soundtrack']].filter(function (item) { return item[0]; });
    if (stats.length) html += '<div class="bd1-stats">' + stats.map(function (item) { return '<a href="#' + prefix + '-' + item[2] + '"><span>' + item[0] + '</span><small>' + item[1] + '</small></a>'; }).join('') + '</div>';
    html += '</div></header>';
    var nav = [['overview', 'Overview']];
    if (photos.length) nav.push(['people', 'Inner circle']);
    if (relationships.length) nav.push(['connections', 'Flavours & Brands']);
    if (entries.length) nav.push(['story', 'Timeline']);
    if (songs.length || c.playlistUrl) nav.push(['soundtrack', 'Soundtrack']);
    if (c.notes) nav.push(['notes', 'Notes']);
    if (nav.length > 1) html += '<nav class="bd1-nav" aria-label="Character sections">' + nav.map(function (item) { return '<a href="#' + prefix + '-' + item[0] + '">' + titleCase(item[1]) + '</a>'; }).join('') + '</nav>';
    if (photos.length || map) {
      html += '<div class="bd3-memory-row">';
      if (photos.length) {
        html += '<section class="bd3-polaroid-panel" id="' + prefix + '-people">' + heading('Close to heart') + '<div class="bd3-polaroids">';
        photos.forEach(function (photo) {
          var image = photo.image ? '<img src="' + escapeHtml(photo.image) + '" alt="' + escapeHtml(photo.name || 'A favourite person') + '" loading="lazy" referrerpolicy="no-referrer">' : '<span class="bd3-photo-placeholder" aria-hidden="true">' + escapeHtml(photo.name.slice(0, 1) || '♡') + '</span>';
          html += '<figure class="bd3-polaroid">' + (photo.url ? '<a href="' + escapeHtml(photo.url) + '" target="_blank" rel="noopener noreferrer">' + image + '</a>' : image) + '<figcaption>' + escapeHtml(photo.name) + '</figcaption></figure>';
        });
        html += '</div></section>';
      }
      if (map) html += '<section class="bd3-map-panel">' + heading('Current location') + map + '</section>';
      html += '</div>';
    }
    html += '<div class="bd1-content">';
    if (facts.length || basics.length || c.currentChapter) {
      html += '<section class="bd1-section bd1-overview">' + heading('At a glance', c.asOf ? 'As of ' + c.asOf : '');
      if (c.currentChapter) html += '<div class="bd1-chapter"><span class="bd1-eyebrow">Current Chapter</span>' + paragraphs(c.currentChapter) + '</div>';
      if (facts.length || basics.length) html += '<dl class="bd1-facts">' + pairedFacts(basics.concat(facts)) + '</dl>';
      html += '</section>';
    }
    if (relationships.length) {
      html += '<section class="bd1-section bd1-connections-panel" id="' + prefix + '-connections">' + heading('Flavours & Brands') + '<div class="bd1-connections">';
      relationships.forEach(function (r) {
        var linked = entries.filter(function (entry) { return entry.connectionIds.indexOf(r.id) !== -1; });
        html += '<article class="bd1-connection" id="' + prefix + '-connection-' + r.id + '"><div class="bd1-connection-head">';
        if (r.portrait) html += '<img class="bd1-avatar" src="' + escapeHtml(r.portrait) + '" alt="" loading="lazy" referrerpolicy="no-referrer">';
        html += '<div><span class="bd1-eyebrow">' + escapeHtml(r.kind) + (r.featured ? ' · In Focus' : '') + '</span><h3>' + external(r.url, r.name) + '</h3></div>';
        if (r.status) html += '<span class="bd1-small-status">' + escapeHtml(r.status) + '</span>';
        html += '</div>';
        if (r.flavour) html += '<div class="bd1-flavour"><span>Flavour</span><span>' + escapeHtml(r.flavour) + '</span></div>';
        if (r.brand) html += '<div class="bd1-flavour"><span>Brand</span><span>' + escapeHtml(r.brand) + '</span></div>';
        if (linked.length || r.summary || r.quote || r.playlistUrl) {
          html += '<details class="bd1-linked-story"><summary>' + (linked.length ? linked.length + (linked.length === 1 ? ' shared story' : ' shared stories') : 'About this connection') + '</summary>' + paragraphs(r.summary, 'bd1-connection-copy');
          if (r.quote) html += '<blockquote>' + paragraphs(r.quote) + '</blockquote>';
          if (r.playlistUrl) html += '<div class="bd1-relationship-playlist">' + external(r.playlistUrl, 'Their soundtrack ↗') + '</div>';
          if (linked.length) html += '<ul>' + linked.map(function (entry) { return '<li><a href="#' + prefix + '-entry-' + entry.id + '"><span>' + escapeHtml(entry.title) + '</span><small>' + escapeHtml(entry.type) + '</small></a></li>'; }).join('') + '</ul>';
          html += '</details>';
        }
        html += '</article>';
      });
      html += '</div></section>';
    }
    if (entries.length) {
      html += '<section class="bd1-section bd1-story-panel" id="' + prefix + '-story">' + heading('The story so far', entries.length + (entries.length === 1 ? ' entry' : ' entries'));
      var currentYear = null;
      entries.forEach(function (entry) {
        var dateValue = effectiveDate(entry);
        var postedFallback = !entry.date && !!entry.postedDate;
        var year = dateValue ? dateValue.slice(0, 4) : 'Date Unavailable';
        if (year !== currentYear) {
          if (currentYear !== null) html += '</ol></div>';
          currentYear = year;
          html += '<div class="bd1-year-group"><h3 class="bd1-year">' + escapeHtml(year) + '</h3><ol class="bd1-timeline">';
        }
        html += '<li class="bd1-entry' + (entry.milestone || entry.type === 'Milestone' ? ' bd1-milestone' : '') + '" id="' + prefix + '-entry-' + entry.id + '" data-story-date="' + escapeHtml(entry.date) + '" data-posted-date="' + escapeHtml(entry.postedDate) + '" data-date-label="' + escapeHtml(entry.dateLabel) + '" data-topic-url="' + escapeHtml(entry.url) + '"><div class="bd1-entry-meta"><span class="bd1-type">' + escapeHtml(entry.type) + '</span>';
        if (dateValue || entry.dateLabel) {
          var dateTitle = dateValue ? (postedFallback ? 'Topic started ' : 'Story date ') + displayDate(dateValue) : '';
          html += '<span class="bd1-entry-date"' + (dateTitle ? ' title="' + escapeHtml(dateTitle) + '"' : '') + '>' + escapeHtml(entry.dateLabel || compactDate(dateValue)) + '</span>';
        }
        if (entry.status) html += '<span class="bd1-entry-status">' + escapeHtml(entry.status) + '</span>';
        html += '</div><h4>' + external(entry.url, entry.title) + '</h4>';
        if (entry.participants) html += '<div class="bd1-participants">' + escapeHtml(entry.participants) + '</div>';
        var connected = entry.connectionIds.map(function (id) { return byId.get(id); }).filter(Boolean);
        if (!entry.participants && connected.length) html += '<div class="bd1-entry-people">' + connected.map(function (r) { return '<a href="#' + prefix + '-connection-' + r.id + '">' + escapeHtml(r.name) + '</a>'; }).join('') + '</div>';
        html += paragraphs(entry.summary, 'bd1-entry-copy');
        if (entry.date && entry.postedDate) html += '<div class="bd1-posted-date">Posted ' + escapeHtml(displayDate(entry.postedDate)) + '</div>';
        html += '</li>';
      });
      html += '</ol></div></section>';
    }
    if (songs.length || c.playlistUrl) {
      html += '<section class="bd1-section bd1-soundtrack-panel" id="' + prefix + '-soundtrack">' + heading('On repeat', songs.length ? songs.length + (songs.length === 1 ? ' song' : ' songs') : '');
      var slides = songs.slice();
      if (c.playlistUrl) slides.push({ title: 'The full playlist', artist: '', url: c.playlistUrl, note: '' });
      if (slides.length) html += '<div class="bd3-player-carousel" tabindex="0" role="region" aria-label="Character soundtrack — scroll to browse songs">' + slides.map(function (song, index) {
        var label = song.title || song.artist || 'Listen';
        var previous = (index - 1 + slides.length) % slides.length, next = (index + 1) % slides.length;
        return '<article class="bd3-song-slide" id="' + prefix + '-song-' + index + '" aria-label="' + (index + 1) + ' of ' + slides.length + ': ' + escapeHtml(label) + '"><div class="bd3-song-title"><span class="bd1-song-number">' + String(index + 1).padStart(2, '0') + '</span><div><h3 class="bd1-song-title">' + escapeHtml(label) + '</h3>' + (song.artist && song.artist !== label ? '<span class="bd1-song-artist">' + escapeHtml(song.artist) + '</span>' : '') + '</div></div>' + player(song.url, label) + paragraphs(song.note, 'bd1-song-note') + '<div class="bd3-song-controls">' + (slides.length > 1 ? '<a href="#' + prefix + '-song-' + previous + '" aria-label="Previous song">←</a>' : '') + '<span>' + (index + 1) + ' / ' + slides.length + '</span>' + (slides.length > 1 ? '<a href="#' + prefix + '-song-' + next + '" aria-label="Next song">→</a>' : '') + '</div></article>';
      }).join('') + '</div>';
      html += '</section>';
    }
    if (c.notes) html += '<section class="bd1-section bd1-notes" id="' + prefix + '-notes">' + heading('Worth remembering') + paragraphs(c.notes) + '</section>';
    html += '</div><footer class="bd1-footer"><span>' + escapeHtml(c.name || c.nickname || 'Character dossier') + '</span><a href="#' + prefix + '-overview">Back to the beginning ↑</a></footer></article>';
    if (options.includeStylesheet) {
      var style = stylesheetUrl(options.stylesheetUrl);
      if (!style) throw new Error('Choose a valid stylesheet address.');
      html += '<link rel="stylesheet" href="' + escapeHtml(style) + '">';
    }
    return html;
  }
  function forum(character, cssUrl) {
    var url = safeUrl(cssUrl);
    if (!url) throw new Error('Forum code needs the public stylesheet address.');
    return '[dohtml]' + render(character, { stylesheetUrl: url, includeStylesheet: true }) + '<script src="https://cdn.jsdelivr.net/gh/lexdoescodingnow/templates@character-dossier-v1/character-dossier/dossier-runtime-v5.2.js" defer></script>[/dohtml]';
  }
  return { normalizeCharacter: normalizeCharacter, normalizeDataset: normalizeDataset, render: render, forum: forum, sortTimeline: sortTimeline, escapeHtml: escapeHtml, safeUrl: safeUrl };
}));
