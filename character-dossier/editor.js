(function () {
  'use strict';
  const STORAGE_KEY = 'bluehour.character-atelier.library.v1';
  const SETTINGS_KEY = 'bluehour.character-atelier.settings.v1';
  const PREVIOUS_STYLESHEETS = ['https://cdn.jsdelivr.net/gh/lexdoescodingnow/templates@character-dossier-v1/character-dossier/dossier-v1.css', 'https://cdn.jsdelivr.net/gh/lexdoescodingnow/templates@character-dossier-v1/character-dossier/dossier-v2.css', 'https://cdn.jsdelivr.net/gh/lexdoescodingnow/templates@character-dossier-v1/character-dossier/dossier-v3.css', 'https://cdn.jsdelivr.net/gh/lexdoescodingnow/templates@character-dossier-v1/character-dossier/dossier-v4.css'];
  const DEFAULT_STYLESHEET = 'https://cdn.jsdelivr.net/gh/lexdoescodingnow/templates@character-dossier-v1/character-dossier/dossier-v5.css';
  const $ = id => document.getElementById(id);
  const clone = value => JSON.parse(JSON.stringify(value));
  let fieldCounter = 0;
  let saveTimer;
  let previewTimer;
  let library;
  let settings = { selectedId: '', theme: 'dark', narrow: false, stylesheetUrl: DEFAULT_STYLESHEET };
  let storageAvailable = true;
  let generatedCode = '';
  let exportBusy = false;
  let openSections = new Set(['identity']);
  let recoveryDownload = null;
  let dirty = false;
  let lastStoredLibrary = null;
  let externalChange = false;
  const photoThemeStates = new Map();
  const photoThemeJobs = new Map();
  let photoThemeSequence = 0;
  const sourceUpdates = new Map();
  let sourceReviewCharacterId = '';
  const SOURCE_FIELDS = ['name', 'nickname', 'age', 'pronouns', 'gender', 'occupation', 'location', 'writer', 'portrait', 'avatar', 'imagePosition', 'facts', 'currentChapter', 'asOf', 'notes', 'relationshipStatus', 'relationships', 'timeline', 'songs', 'playlistUrl', 'polaroids', 'mapLocation', 'mapLatitude', 'mapLongitude', 'mapZoom'];
  const SOURCE_LABELS = { name: 'Full name', nickname: 'Preferred name', age: 'Age', pronouns: 'Pronouns', gender: 'Gender', occupation: 'Occupation', location: 'Location', writer: 'Writer', portrait: 'Header photo', avatar: 'PI portrait', imagePosition: 'Photo crop', facts: 'Encyclopaedia facts', currentChapter: 'Current chapter', asOf: 'Story date', notes: 'Continuity notes', relationshipStatus: 'Relationship status', relationships: 'Connections', timeline: 'Story archive', songs: 'Soundtrack', playlistUrl: 'Playlist', polaroids: 'Polaroids', mapLocation: 'Map place', mapLatitude: 'Map latitude', mapLongitude: 'Map longitude', mapZoom: 'Map zoom', title: 'Title', date: 'In-world date', postedDate: 'Posting date', dateLabel: 'Date label', participants: 'Participants', type: 'Type', status: 'Status', connectionIds: 'Linked connections', summary: 'Summary', milestone: 'Pivotal moment', kind: 'Connection type', flavour: 'Flavour', brand: 'Brand', url: 'Link', image: 'Photo', pinned: 'Pinned connection', featured: 'Featured relationship', quote: 'Shared quote', artist: 'Artist', note: 'Song note', label: 'Fact label', value: 'Fact' };
  const COVERAGE_LABELS = { development: 'Development post', encyclopaedia: 'Encyclopaedia details', directory: 'Directory details', custom: 'Your own character' };
  const LIST_LIMITS = { facts: 150, relationships: 200, timeline: 1500, songs: 200, polaroids: 3 };
  const TEXT_LIMITS = { name: 160, nickname: 160, age: 40, pronouns: 80, gender: 120, occupation: 250, location: 250, writer: 120, portrait: 4000, avatar: 4000, image: 4000, imagePosition: 30, mapLocation: 250, mapLatitude: 40, mapLongitude: 40, mapZoom: 2, accent: 7, label: 160, value: 2000, currentChapter: 5000, asOf: 120, notes: 15000, relationshipStatus: 160, kind: 80, flavour: 160, brand: 160, status: 120, url: 4000, summary: 5000, quote: 3000, playlistUrl: 4000, title: 250, artist: 250, note: 1500, date: 40, dateLabel: 160, postedDate: 40, participants: 400, type: 80 };
  const COLOUR_PALETTE = [['Fern', '#5b8612'], ['Sand', '#a99b8e'], ['Apricot', '#d9804d'], ['Blue', '#5187b5'], ['Rose', '#b9768c']];

  function uid(prefix) {
    return prefix + '-' + (globalThis.crypto && crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36) + '-' + Math.random().toString(36).slice(2, 9));
  }
  function node(tag, attributes, children) {
    const element = document.createElement(tag);
    Object.entries(attributes || {}).forEach(([key, value]) => {
      if (key === 'className') element.className = value;
      else if (key === 'text') element.textContent = value;
      else if (key === 'hidden') element.hidden = value;
      else if (key.startsWith('on') && typeof value === 'function') element.addEventListener(key.slice(2).toLowerCase(), value);
      else element.setAttribute(key, value);
    });
    (Array.isArray(children) ? children : children == null ? [] : [children]).forEach(child => element.append(typeof child === 'string' ? document.createTextNode(child) : child));
    return element;
  }
  function message(text, error) {
    $('feedback').textContent = text;
    $('feedback').dataset.error = String(Boolean(error));
  }
  function current() { return library.characters.find(character => character.id === settings.selectedId) || library.characters[0]; }
  function labelFor(character) { return character.name || character.nickname || 'Untitled character'; }
  function fileName(character) {
    return (character.id || character.name || 'character').replace(/[^a-z0-9_-]+/gi, '-').slice(0, 90) || 'character';
  }
  function download(content, filename, type) {
    const objectUrl = URL.createObjectURL(new Blob([content], { type: type || 'application/json;charset=utf-8' }));
    const link = node('a', { href: objectUrl, download: filename });
    document.body.append(link); link.click(); link.remove();
    setTimeout(() => URL.revokeObjectURL(objectUrl), 2000);
  }
  function saveSettings() {
    try { localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings)); } catch (_) { storageAvailable = false; }
  }
  function saveDraft() {
    clearTimeout(saveTimer);
    if (!dirty) { saveSettings(); return; }
    try {
      if (externalChange || localStorage.getItem(STORAGE_KEY) !== lastStoredLibrary) {
        externalChange = true;
        $('save-status').textContent = 'Another tab has a newer saved library';
        message('Another atelier tab saved a newer library. Your edits are still here. Download a backup before reloading so both versions are kept.', true);
        return;
      }
      if (recoveryDownload) localStorage.setItem(STORAGE_KEY + '.recovery', recoveryDownload);
      const serialized = JSON.stringify(library);
      localStorage.setItem(STORAGE_KEY, serialized);
      lastStoredLibrary = serialized;
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
      dirty = false;
      storageAvailable = true;
      $('save-status').textContent = 'Saved in this browser';
    } catch (_) {
      storageAvailable = false;
      $('save-status').textContent = 'Download a backup to save your changes';
    }
  }
  function changed(options) {
    dirty = true;
    $('save-status').textContent = 'Saving your draft…';
    clearTimeout(saveTimer); saveTimer = setTimeout(saveDraft, 300);
    clearTimeout(previewTimer); previewTimer = setTimeout(updatePreview, 350);
    if (options && options.picker) updatePicker();
  }
  function seedLibrary() {
    return Dossier.normalizeDataset(clone(globalThis.DOSSIER_SEED || { version: 1, characters: [{ id: uid('character'), name: '' }] }));
  }
  function sourceMetadata(id) {
    const all = globalThis.DOSSIER_SOURCE_METADATA || {};
    const raw = Object.hasOwn(all, id) && all[id] && typeof all[id] === 'object' ? all[id] : {};
    const inSeed = globalThis.DOSSIER_SEED?.characters?.some(character => character.id === id);
    const coverage = ['development', 'encyclopaedia', 'directory'].includes(raw.coverage) ? raw.coverage : inSeed ? 'directory' : 'custom';
    return { ...raw, coverage, label: typeof raw.label === 'string' && raw.label.trim() ? raw.label : COVERAGE_LABELS[coverage] };
  }
  function normalizeSourceTracking(raw, ids) {
    const result = Object.create(null);
    if (!raw || typeof raw !== 'object' || Array.isArray(raw)) return result;
    ids.forEach(id => {
      if (!Object.hasOwn(raw, id)) return;
      const record = raw[id];
      if (!record || typeof record !== 'object' || !record.baseline || typeof record.revision !== 'string') return;
      try { result[id] = { revision: record.revision.slice(0, 200), baseline: Dossier.normalizeCharacter(record.baseline) }; } catch (_) {}
    });
    return result;
  }
  function equalSource(a, b) { return JSON.stringify(a) === JSON.stringify(b); }
  function sourceCopy(value) { return value === undefined ? undefined : clone(value); }
  function sourceBlank(value) { return value === undefined || value === null || value === '' || Array.isArray(value) && value.length === 0; }
  function sourceRevision(metadata, incoming) {
    if (typeof metadata.revision === 'string' && metadata.revision) return metadata.revision;
    const text = JSON.stringify(incoming); let hash = 2166136261;
    for (let index = 0; index < text.length; index += 1) hash = Math.imul(hash ^ text.charCodeAt(index), 16777619);
    return 'source-' + (hash >>> 0).toString(16);
  }
  function sourceListKey(field, item) {
    if (!item || typeof item !== 'object' || Array.isArray(item)) return '';
    if (field === 'relationships' || field === 'timeline') return typeof item.id === 'string' ? item.id : '';
    if (field === 'facts') return typeof item.label === 'string' ? item.label.trim().toLocaleLowerCase() : '';
    if (field === 'songs') return item.url || [item.artist || '', item.title || ''].join('|').toLocaleLowerCase();
    return '';
  }
  function mergeSourceValue(currentValue, baseline, incoming, context) {
    if (equalSource(currentValue, incoming)) return sourceCopy(currentValue);
    const allArrays = Array.isArray(currentValue) && Array.isArray(incoming) && (!context.known || Array.isArray(baseline));
    const keyed = allArrays && ['relationships', 'timeline', 'facts', 'songs'].includes(context.field) && context.path.length === 1;
    if (keyed) {
      const arrays = [currentValue, incoming, context.known ? baseline : []];
      const valid = arrays.every(items => { const keys = items.map(item => sourceListKey(context.field, item)); return keys.every(Boolean) && new Set(keys).size === keys.length; });
      if (valid) {
        const oldMap = new Map((context.known ? baseline : []).map(item => [sourceListKey(context.field, item), item]));
        const newMap = new Map(incoming.map(item => [sourceListKey(context.field, item), item]));
        const currentKeys = new Set(currentValue.map(item => sourceListKey(context.field, item)));
        const merged = currentValue.map(item => {
          const key = sourceListKey(context.field, item), previous = oldMap.get(key), next = newMap.get(key);
          const path = [...context.path, { list: context.field, key }];
          const label = context.label + ' · ' + (item.title || item.name || item.label || 'Entry');
          if (!next) {
            if (oldMap.has(key)) context.conflicts.push({ path, label, current: sourceCopy(item), incoming: null, remove: true });
            return sourceCopy(item);
          }
          const result = sourceCopy(item);
          Object.keys(next).filter(field => field !== 'id').forEach(field => {
            result[field] = mergeSourceValue(item[field], previous?.[field], next[field], { ...context, known: oldMap.has(key) && Object.hasOwn(previous, field), path: [...path, field], label: label + ' · ' + (SOURCE_LABELS[field] || field) });
          });
          return result;
        });
        incoming.forEach(item => { const key = sourceListKey(context.field, item); if (!currentKeys.has(key) && !oldMap.has(key)) merged.push(sourceCopy(item)); });
        return merged;
      }
    }
    if (context.known && equalSource(currentValue, baseline)) return sourceCopy(incoming);
    if (context.known && equalSource(incoming, baseline)) return sourceCopy(currentValue);
    if (!context.known && sourceBlank(currentValue)) return sourceCopy(incoming);
    context.conflicts.push({ path: context.path, label: context.label, current: sourceCopy(currentValue), incoming: sourceCopy(incoming), remove: false });
    return sourceCopy(currentValue);
  }
  function applySourceUpdates() {
    const latest = seedLibrary().characters;
    let previous = [];
    try { if (globalThis.DOSSIER_PREVIOUS_SEED) previous = Dossier.normalizeDataset(globalThis.DOSSIER_PREVIOUS_SEED).characters; } catch (_) {}
    const oldSeeds = new Map(previous.map(character => [character.id, character]));
    const currentById = new Map(library.characters.map(character => [character.id, character]));
    library.sourceTracking = library.sourceTracking || Object.create(null);
    sourceUpdates.clear();
    let changedCharacters = 0, added = 0;
    latest.forEach(incoming => {
      const metadata = sourceMetadata(incoming.id);
      const revision = sourceRevision(metadata, incoming);
      let character = currentById.get(incoming.id);
      if (!character) { if (library.characters.length >= 500) return; character = sourceCopy(incoming); library.characters.push(character); currentById.set(character.id, character); added += 1; dirty = true; }
      const tracked = library.sourceTracking[character.id];
      if (tracked?.revision === revision) return;
      const baseline = tracked?.baseline || oldSeeds.get(character.id);
      const fields = Array.isArray(metadata.knownFields) ? metadata.knownFields.filter(field => SOURCE_FIELDS.includes(field)) : SOURCE_FIELDS;
      const conflicts = [];
      const before = JSON.stringify(character);
      fields.forEach(field => {
        character[field] = mergeSourceValue(character[field], baseline?.[field], incoming[field], { known: Boolean(baseline && Object.hasOwn(baseline, field)), field, path: [field], label: SOURCE_LABELS[field] || field, conflicts });
      });
      if (before !== JSON.stringify(character)) { changedCharacters += 1; dirty = true; }
      if (conflicts.length) {
        sourceUpdates.set(character.id, { revision, incoming, conflicts });
        if (!tracked && baseline) { library.sourceTracking[character.id] = { revision: '', baseline: sourceCopy(baseline) }; dirty = true; }
      }
      else { library.sourceTracking[character.id] = { revision, baseline: sourceCopy(incoming) }; dirty = true; }
    });
    return { changedCharacters, added, reviews: sourceUpdates.size };
  }
  function selectFromAddress() {
    let requested = '';
    try { const url = new URL(location.href); requested = url.searchParams.get('character') || new URLSearchParams(url.hash.replace(/^#/, '')).get('character') || ''; } catch (_) {}
    if (requested && library.characters.some(character => character.id === requested)) settings.selectedId = requested;
  }
  function normalizeDraftDataset(raw) {
    const prepared = clone(raw);
    const characters = prepared && Array.isArray(prepared.characters) ? prepared.characters : prepared && (Object.hasOwn(prepared, 'name') || Object.hasOwn(prepared, 'id')) ? [prepared] : [];
    const starters = new Map((Array.isArray(globalThis.DOSSIER_SEED?.characters) ? globalThis.DOSSIER_SEED.characters : []).map(character => [character.id, Dossier.normalizeCharacter(character)]));
    characters.forEach(character => {
      if (!character || typeof character !== 'object' || Array.isArray(character)) return;
      if (character.id === 'baek-samuel' && Array.isArray(character.relationships)) {
        const knownBrands = { dom: ['almond', 'Lindor'], crazhes: ['marshmallow', 'Mochidoki'], jiae: ['treacle', 'Pringles'] };
        character.relationships.forEach(connection => {
          if (!connection || typeof connection !== 'object' || Object.hasOwn(connection, 'brand')) return;
          const previous = knownBrands[connection.id];
          if (previous && String(connection.flavour || '').trim().toLowerCase() === previous[0]) { connection.brand = previous[1]; connection.flavour = ''; }
        });
      }
      const starter = starters.get(character.id);
      if (character.id === 'baek-samuel' && Array.isArray(character.timeline)) {
        const legacy = [
          { id: 'almond-croissant', title: 'almond croissant', currentTitle: 'Lindor Pistachio', topic: '62747', participants: 'sam & dom', type: 'Comms', connectionIds: ['dom'] },
          { id: 'treacle-tart', title: 'treacle tart', currentTitle: 'Pringles Texas BBQ', topic: '64015', participants: 'sam & jiae', type: 'Comms', connectionIds: ['jiae'] },
          { id: 'marshmallow-spread', title: 'marshmallow spread', currentTitle: 'Mochidoki Cake Batter', topic: '83999', participants: 'CRAZHES', type: 'Comms', connectionIds: ['crazhes'] },
          { id: 'pumpkin-pie', title: 'pumpkin pie', topic: '98948', participants: 'group thread', type: 'Thread', connectionIds: [] },
          { id: 'cereal-milk', title: 'cereal milk', topic: '104200', participants: 'sam & hoseong', type: 'Thread', connectionIds: ['hoseong'] }
        ];
        const topicOf = entry => { try { const url = new URL(entry.url); return url.origin === 'https://bluehour.jcink.net' && url.pathname === '/index.php' ? url.searchParams.get('showtopic') : ''; } catch (_) { return ''; } };
        const blank = value => value === undefined || value === '';
        const untouchedLegacy = character.timeline.length === 5 && legacy.every(previous => {
          const entry = character.timeline.find(item => item && item.id === previous.id);
          return entry && String(entry.title || '').trim().toLowerCase() === previous.title && entry.url === 'https://bluehour.jcink.net/index.php?showtopic=' + previous.topic && entry.participants === previous.participants && entry.type === previous.type && JSON.stringify(entry.connectionIds) === JSON.stringify(previous.connectionIds) && ['date', 'dateLabel', 'postedDate', 'status', 'summary'].every(key => blank(entry[key])) && (entry.milestone === undefined || entry.milestone === false);
        });
        character.timeline.forEach(entry => {
          if (!entry || typeof entry !== 'object') return;
          const previous = legacy.find(item => item.id === entry.id && item.currentTitle);
          if (previous && topicOf(entry) === previous.topic && String(entry.title || '').trim().toLowerCase() === previous.title) entry.title = previous.currentTitle;
        });
        const cerealBar = starter?.timeline?.find(entry => entry.id === 'cereal-bar' && topicOf(entry) === '112783');
        if (untouchedLegacy && cerealBar && !character.timeline.some(entry => topicOf(entry) === '112783')) character.timeline.push(clone(cerealBar));
      }
      if (!starter) return;
      ['avatar', 'polaroids', 'mapLocation', 'mapLatitude', 'mapLongitude', 'mapZoom'].forEach(key => {
        if (!Object.hasOwn(character, key) && Object.hasOwn(starter, key)) character[key] = clone(starter[key]);
      });
    });
    const dates = characters.map(character => {
      if (character && typeof character === 'object') Object.entries(LIST_LIMITS).forEach(([key, limit]) => {
        if (Array.isArray(character[key]) && character[key].length > limit) throw new Error('A character can contain up to ' + limit + ' ' + key + ' records.');
      });
      if (!character || !Array.isArray(character.timeline)) return [];
      return character.timeline.filter(entry => entry && typeof entry === 'object' && !Array.isArray(entry)).map(entry => {
        const original = { date: typeof entry.date === 'string' ? entry.date.slice(0, 40) : '', postedDate: typeof entry.postedDate === 'string' ? entry.postedDate.slice(0, 40) : '' };
        entry.date = ''; entry.postedDate = '';
        return original;
      });
    });
    const mapDrafts = characters.map(character => {
      if (!character || typeof character !== 'object' || Array.isArray(character)) return {};
      const values = {};
      ['mapLatitude', 'mapLongitude', 'mapZoom'].forEach(key => {
        if (Object.hasOwn(character, key) && ['string', 'number'].includes(typeof character[key])) values[key] = character[key];
      });
      character.mapLatitude = ''; character.mapLongitude = ''; character.mapZoom = 11;
      return values;
    });
    const normalized = Dossier.normalizeDataset(prepared);
    normalized.characters.forEach((character, index) => {
      character.timeline.forEach((entry, itemIndex) => Object.assign(entry, dates[index]?.[itemIndex] || {}));
      Object.assign(character, mapDrafts[index]);
      if (Array.isArray(characters[index]?.tags)) character.tags = characters[index].tags.filter(tag => typeof tag === 'string');
    });
    normalized.sourceTracking = normalizeSourceTracking(raw?.sourceTracking, normalized.characters.map(character => character.id));
    return normalized;
  }
  function initData() {
    library = seedLibrary();
    try {
      const savedSettings = JSON.parse(localStorage.getItem(SETTINGS_KEY) || 'null');
      if (savedSettings && typeof savedSettings === 'object') {
        settings.selectedId = String(savedSettings.selectedId || '');
        settings.theme = savedSettings.theme === 'light' ? 'light' : 'dark';
        settings.narrow = savedSettings.narrow === true;
        settings.stylesheetUrl = typeof savedSettings.stylesheetUrl === 'string' ? savedSettings.stylesheetUrl : DEFAULT_STYLESHEET;
        if (PREVIOUS_STYLESHEETS.includes(settings.stylesheetUrl)) settings.stylesheetUrl = DEFAULT_STYLESHEET;
      }
      const saved = localStorage.getItem(STORAGE_KEY);
      lastStoredLibrary = saved;
      if (saved) {
        try { library = normalizeDraftDataset(JSON.parse(saved)); }
        catch (error) {
          recoveryDownload = saved;
          message('A saved draft could not be opened. The original is still in this browser; download it before making changes. ' + error.message, true);
        }
      }
      if (!recoveryDownload) recoveryDownload = localStorage.getItem(STORAGE_KEY + '.recovery');
    } catch (_) { storageAvailable = false; }
    if (!library.characters.length) library.characters.push(Dossier.normalizeCharacter({ id: uid('character'), name: '' }));
    if (!library.characters.some(character => character.id === settings.selectedId)) {
      const sam = library.characters.find(character => /baek samuel/i.test(character.name));
      settings.selectedId = (sam || library.characters[0]).id;
    }
    const updates = applySourceUpdates();
    selectFromAddress();
    if (updates.changedCharacters || updates.added) message('Source details refreshed for ' + updates.changedCharacters + ' character' + (updates.changedCharacters === 1 ? '' : 's') + (updates.added ? '; ' + updates.added + ' added to your cast' : '') + '. Edited details are kept for review.');
    $('save-status').textContent = storageAvailable ? 'Ready · changes save in this browser' : 'Download a backup to save your changes';
    if (recoveryDownload) {
      const button = node('button', { type: 'button', text: 'Download the unopened draft', onclick: () => download(recoveryDownload, 'character-atelier-recovery.json') });
      $('feedback').after(button);
    }
  }
  function updatePicker() {
    const query = $('character-search').value.trim().toLocaleLowerCase();
    const coverage = $('source-filter')?.value || 'all';
    const matches = [...library.characters].sort((a, b) => labelFor(a).localeCompare(labelFor(b))).filter(character => (!query || [character.name, character.nickname, character.writer].join(' ').toLocaleLowerCase().includes(query)) && (coverage === 'all' || coverage === 'review' ? coverage !== 'review' || sourceUpdates.has(character.id) : sourceMetadata(character.id).coverage === coverage));
    $('character-picker').replaceChildren();
    const shownCount = matches.length;
    const outsideFilter = !matches.some(character => character.id === settings.selectedId);
    if (outsideFilter) matches.unshift(current());
    matches.forEach(character => {
      const option = node('option', { value: character.id, text: labelFor(character) + (outsideFilter && character.id === settings.selectedId ? ' (currently open)' : '') });
      option.selected = character.id === settings.selectedId;
      $('character-picker').append(option);
    });
    $('character-count').textContent = (query || coverage !== 'all' ? shownCount + ' shown · ' : '') + library.characters.length + ' in your cast';
    $('character-picker').setAttribute('aria-label', 'Choose character. ' + matches.length + ' options');
  }
  function field(label, target, key, options) {
    options = options || {};
    const id = 'edit-field-' + (++fieldCounter);
    const wrapper = node('label', { className: 'form-field', for: id }, label);
    let input;
    if (options.choices) {
      input = node('select', { id });
      const choices = [...options.choices];
      if (target[key] && !choices.includes(target[key])) choices.push(target[key]);
      choices.forEach(value => input.append(node('option', { value, text: value || 'Not specified' })));
    } else input = node(options.multiline ? 'textarea' : 'input', { id, ...(options.multiline ? { rows: options.rows || 3 } : { type: options.type || 'text' }) });
    input.value = options.array ? (target[key] || []).join('\n') : target[key] == null ? '' : target[key];
    input.dataset.field = key;
    if (options.placeholder) input.placeholder = options.placeholder;
    if (options.inputMode) input.inputMode = options.inputMode;
    ['min', 'max', 'step'].forEach(attribute => { if (options[attribute] !== undefined) input.setAttribute(attribute, options[attribute]); });
    if (options.maxLength || TEXT_LIMITS[key]) input.maxLength = options.maxLength || TEXT_LIMITS[key];
    if (options.type === 'url') input.spellcheck = false;
    input.addEventListener(options.choices ? 'change' : 'input', () => {
      target[key] = options.array ? input.value.split('\n').map(value => value.trim().replace(/^#/, '')).filter(Boolean) : input.value;
      if (options.onChange) options.onChange(input);
      changed({ picker: options.picker });
    });
    wrapper.append(input);
    if (options.help) wrapper.append(node('span', { className: 'field-help', text: options.help }));
    return wrapper;
  }
  function check(label, target, key, onChange) {
    const input = node('input', { type: 'checkbox' }); input.checked = Boolean(target[key]); input.dataset.field = key;
    const wrapper = node('label', { className: 'checkbox-field' }, [input, node('span', { text: label })]);
    input.addEventListener('change', () => {
      if (onChange && onChange(input) === false) { input.checked = Boolean(target[key]); return; }
      target[key] = input.checked; changed();
    });
    return wrapper;
  }
  function help(text) { return node('p', { className: 'field-help', text }); }
  function grid() { return node('div', { className: 'form-grid' }, [...arguments]); }
  function fullHex(value) {
    if (/^#[0-9a-f]{6}$/i.test(value || '')) return value.toLowerCase();
    if (/^#[0-9a-f]{3}$/i.test(value || '')) return '#' + value.slice(1).split('').map(letter => letter + letter).join('').toLowerCase();
    return '';
  }
  function updateChromeColour() {
    const colour = fullHex(current().accent);
    if (colour) document.documentElement.style.setProperty('--character-colour', colour);
  }
  function cancelPhotoTheme(id) {
    const job = photoThemeJobs.get(id);
    if (job) { clearTimeout(job.timer); job.controller.abort(); job.resolve?.({ status: 'cancelled' }); photoThemeJobs.delete(id); }
  }
  function cancelOtherPhotoThemes(keepId) {
    photoThemeJobs.forEach((job, id) => { if (id !== keepId) { cancelPhotoTheme(id); photoThemeStates.delete(id); } });
  }
  function showPhotoThemeStatus(character) {
    if (character !== current()) return;
    const status = document.querySelector('[data-photo-theme-status]');
    if (!status) return;
    const state = photoThemeStates.get(character.id);
    status.dataset.state = character.themeMode === 'manual' ? 'manual' : state?.status || 'idle';
    status.textContent = character.themeMode === 'manual' ? 'Your chosen colour is applied to this character.' : state?.message || 'The header photo sets the colour of the whole page automatically.';
    const retry = document.querySelector('[data-photo-theme-retry]');
    if (retry) retry.hidden = character.themeMode === 'manual' || !character.portrait;
    const hex = fullHex(character.accent);
    const manual = document.querySelector('[data-field="accent"]');
    const picker = document.querySelector('[data-field="accent-picker"]');
    if (manual && document.activeElement !== manual) manual.value = character.accent || '';
    if (picker && hex) picker.value = hex;
    document.querySelectorAll('[data-colour]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.colour === hex)));
  }
  function requestPhotoTheme(character, force) {
    const crop = character.imagePosition || '50% 35%';
    const url = Dossier.safeUrl(character.portrait);
    const key = url + '|' + crop;
    if (character.themeMode === 'manual') { cancelPhotoTheme(character.id); showPhotoThemeStatus(character); return Promise.resolve({ status: 'manual' }); }
    if (!url) {
      cancelPhotoTheme(character.id);
      photoThemeStates.set(character.id, { key, status: 'idle', message: character.portrait ? 'Use a complete header image address to create its colour theme.' : 'Add a header photo to create its colour theme.' });
      showPhotoThemeStatus(character); return Promise.resolve(photoThemeStates.get(character.id));
    }
    const activeJob = photoThemeJobs.get(character.id);
    if (!force && activeJob && photoThemeStates.get(character.id)?.key === key) { showPhotoThemeStatus(character); return activeJob.promise; }
    if (!force && character.paletteSource === url && (character.paletteCrop || '50% 35%') === crop && fullHex(character.accent)) {
      cancelPhotoTheme(character.id);
      photoThemeStates.set(character.id, { key, status: 'ready', message: 'Colour matched automatically to the header photo.' });
      showPhotoThemeStatus(character); return Promise.resolve(photoThemeStates.get(character.id));
    }
    const previous = photoThemeStates.get(character.id);
    if (!force && previous?.key === key && ['loading', 'error'].includes(previous.status)) { showPhotoThemeStatus(character); return photoThemeJobs.get(character.id)?.promise || Promise.resolve(previous); }
    cancelPhotoTheme(character.id);
    if (!globalThis.PhotoPalette) {
      photoThemeStates.set(character.id, { key, status: 'error', message: 'Automatic colour sampling is unavailable because palette.js did not load. The previous colour is kept.' });
      showPhotoThemeStatus(character); return Promise.resolve(photoThemeStates.get(character.id));
    }
    const controller = new AbortController();
    const token = ++photoThemeSequence;
    const job = { token, controller, timer: null, resolve: null, promise: null };
    job.promise = new Promise(resolve => { job.resolve = resolve; });
    photoThemeJobs.set(character.id, job);
    photoThemeStates.set(character.id, { key, status: 'loading', message: 'Finding the colours in the header photo…' });
    showPhotoThemeStatus(character);
    const stillCurrent = () => photoThemeJobs.get(character.id)?.token === token && !controller.signal.aborted && character.themeMode !== 'manual' && Dossier.safeUrl(character.portrait) === url && (character.imagePosition || '50% 35%') === crop && library.characters.includes(character);
    job.timer = setTimeout(async () => {
      try {
        const sources = globalThis.PHOTO_PALETTE_SOURCES || {};
        const sourceUrl = typeof sources[url] === 'string' ? sources[url] : undefined;
        const colour = await PhotoPalette.get(url, { crop, sourceUrl, signal: controller.signal, refresh: Boolean(force) });
        if (!stillCurrent()) { job.resolve({ status: 'cancelled' }); return; }
        character.accent = colour; character.themeMode = 'auto'; character.paletteSource = url; character.paletteCrop = crop;
        photoThemeJobs.delete(character.id);
        photoThemeStates.set(character.id, { key, status: 'ready', message: 'Colour matched automatically to the header photo.' });
        if (character === current()) { updateChromeColour(); showPhotoThemeStatus(character); }
        changed();
        job.resolve({ status: 'ready' });
      } catch (error) {
        if (error.name === 'AbortError' || !stillCurrent()) { job.resolve({ status: 'cancelled' }); return; }
        photoThemeJobs.delete(character.id);
        photoThemeStates.set(character.id, { key, status: 'error', message: error.message || 'The photo could not be sampled. The previous colour is kept.' });
        showPhotoThemeStatus(character);
        job.resolve({ status: 'error', message: error.message });
      }
    }, force ? 0 : 350);
    return job.promise;
  }
  function colourFields(character) {
    const wrapper = node('fieldset', { className: 'colour-fieldset' }, node('legend', { text: 'Character colour' }));
    const automatic = character.themeMode !== 'manual';
    const modeControls = node('div', { className: 'colour-mode-controls', role: 'group', 'aria-label': 'Character colour source' });
    modeControls.append(node('button', { type: 'button', 'aria-pressed': String(automatic), text: 'From header photo', onclick: () => {
      character.themeMode = 'auto'; changed(); renderForm(); requestPhotoTheme(character, true);
    } }), node('button', { type: 'button', 'aria-pressed': String(!automatic), text: 'Choose my own', onclick: () => {
      character.themeMode = 'manual'; cancelPhotoTheme(character.id); changed(); renderForm(); showPhotoThemeStatus(character);
    } }));
    const themeStatus = node('p', { className: 'photo-theme-status', 'data-photo-theme-status': '', role: 'status', 'aria-live': 'polite', text: automatic ? 'The header photo sets the colour of the whole page automatically.' : 'Your chosen colour is applied to this character.' });
    const retry = node('button', { type: 'button', className: 'photo-theme-retry', 'data-photo-theme-retry': '', text: 'Sample photo again', onclick: () => requestPhotoTheme(character, true) });
    retry.hidden = !automatic || !character.portrait;
    wrapper.append(modeControls, themeStatus, retry);
    const manualControls = node('div', { className: 'colour-manual-controls', hidden: automatic });
    const picker = node('input', { type: 'color', 'aria-label': 'Choose character colour', 'data-field': 'accent-picker' });
    const swatches = node('div', { className: 'colour-swatches', role: 'group', 'aria-label': 'Character colour palette' });
    let hexInput;
    function syncColour() {
      const hex = fullHex(character.accent);
      if (hex) picker.value = hex;
      swatches.querySelectorAll('button').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.colour === hex)));
      updateChromeColour();
    }
    function markManual() { character.themeMode = 'manual'; character.paletteSource = ''; character.paletteCrop = ''; cancelPhotoTheme(character.id); syncColour(); }
    function chooseColour(value) {
      character.accent = value; hexInput.value = value; markManual(); changed();
    }
    const hex = field('Hex colour', character, 'accent', { placeholder: '#5b8612', maxLength: 7, onChange: markManual });
    hexInput = hex.querySelector('input');
    picker.value = fullHex(character.accent) || '#5b8612';
    picker.addEventListener('input', () => chooseColour(picker.value));
    manualControls.append(node('div', { className: 'colour-controls' }, [picker, hex]), help('A manual override for this character’s panels, borders and highlights.'));
    COLOUR_PALETTE.forEach(([name, value]) => {
      const button = node('button', { type: 'button', className: 'colour-swatch', 'data-colour': value, 'aria-label': name + ' ' + value, 'aria-pressed': 'false', onclick: () => chooseColour(value) }, [node('span', { className: 'colour-swatch-dot', 'aria-hidden': 'true' }), node('span', { text: name })]);
      button.style.setProperty('--swatch', value); swatches.append(button);
    });
    manualControls.append(swatches); wrapper.append(manualControls); syncColour();
    return wrapper;
  }
  function cropField(character) {
    const wrapper = node('label', { className: 'form-field' }, 'Header crop');
    const select = node('select', { 'data-field': 'imagePosition' });
    const crops = [['50% 20%', 'Higher'], ['50% 35%', 'Portrait focus'], ['50% 50%', 'Centre'], ['50% 80%', 'Lower']];
    const currentValue = character.imagePosition || '50% 35%';
    if (!crops.some(([value]) => value === currentValue)) crops.push([currentValue, 'Custom position']);
    crops.forEach(([value, text]) => select.append(node('option', { value, text })));
    select.value = currentValue;
    select.addEventListener('change', () => { character.imagePosition = select.value; changed(); });
    wrapper.append(select); return wrapper;
  }
  function starterAppearance(character) {
    const starter = globalThis.DOSSIER_SEED && globalThis.DOSSIER_SEED.characters.find(item => item.id === character.id);
    if (!starter) return node('span');
    return node('div', { className: 'starter-appearance' }, [node('button', { type: 'button', className: 'button-quiet', text: 'Use starter appearance', onclick: () => {
      character.portrait = starter.portrait || '';
      character.avatar = starter.avatar || '';
      character.accent = starter.accent || '#a99b8e'; character.themeMode = 'auto'; character.paletteSource = ''; character.paletteCrop = '';
      cancelPhotoTheme(character.id); photoThemeStates.delete(character.id);
      changed(); renderForm(); updatePreview();
      message('Starter photos restored for ' + labelFor(character) + '. The colour will follow the header.');
    } }), help('Restore this character’s starter photos and colour.')]);
  }
  function mapSearchUrl(place) {
    return 'https://www.openstreetmap.org/search?query=' + encodeURIComponent(String(place || '').trim());
  }
  function mapViewFromUrl(value, currentZoom) {
    let url;
    try { url = new URL(String(value || '').trim()); }
    catch (_) { throw new Error('Paste the full OpenStreetMap link, beginning with https://www.openstreetmap.org/.'); }
    if (url.protocol !== 'https:' || !['openstreetmap.org', 'www.openstreetmap.org'].includes(url.hostname) || url.port || url.username || url.password) throw new Error('Use a link from https://www.openstreetmap.org/. Other websites and embed code are not supported.');
    const view = url.hash.match(/^#map=([^/]+)\/([^/]+)\/([^/&]+)(?:&.*)?$/);
    const latitude = url.searchParams.get('mlat');
    const longitude = url.searchParams.get('mlon');
    const hasMarker = latitude !== null && longitude !== null;
    if (!hasMarker && !view) throw new Error('Open the place in OpenStreetMap and copy its map-view link. It should include #map= or both mlat and mlon.');
    const coordinate = (raw, maximum, label) => {
      if (!/^-?(?:\d+(?:\.\d+)?|\.\d+)$/.test(String(raw || '').trim())) throw new Error('The link has an invalid ' + label + '. Copy the map-view link again.');
      const number = Number(raw);
      if (!Number.isFinite(number) || Math.abs(number) > maximum) throw new Error('The link’s ' + label + ' must be between ' + (-maximum) + ' and ' + maximum + '.');
      return String(number);
    };
    const mapLatitude = coordinate(hasMarker ? latitude : view[2], 85, 'latitude');
    const mapLongitude = coordinate(hasMarker ? longitude : view[3], 180, 'longitude');
    const sourceZoom = view ? Number(view[1]) : Number(currentZoom || 11);
    if (!Number.isInteger(sourceZoom) || sourceZoom < 0 || sourceZoom > 22) throw new Error('The link has an invalid map zoom. Copy the map-view link again.');
    const mapZoom = Math.max(2, Math.min(18, sourceZoom));
    return { mapLatitude, mapLongitude, mapZoom, zoomAdjusted: sourceZoom !== mapZoom };
  }
  function mapLinkControls(character) {
    const wrapper = node('div', { className: 'map-link-tools' });
    const search = node('a', { className: 'map-search-link', href: mapSearchUrl(character.mapLocation), target: '_blank', rel: 'noopener noreferrer', 'data-map-search': '', text: 'Find a place on OpenStreetMap ↗' });
    const inputId = 'edit-field-' + (++fieldCounter);
    const input = node('input', { id: inputId, type: 'url', placeholder: 'https://www.openstreetmap.org/#map=…', spellcheck: 'false' });
    const label = node('label', { className: 'form-field', for: inputId }, ['OpenStreetMap link', input]);
    const button = node('button', { type: 'button', className: 'button-secondary', text: 'Use this map view', onclick: () => {
      try {
        const view = mapViewFromUrl(input.value, character.mapZoom);
        character.mapLatitude = view.mapLatitude; character.mapLongitude = view.mapLongitude; character.mapZoom = view.mapZoom;
        changed(); renderForm(); updatePreview();
        message(view.zoomAdjusted ? 'Map view added. Zoom was adjusted to the supported range.' : 'Map view added. Your place label was kept.');
      } catch (error) { message(error.message, true); input.focus(); }
    } });
    wrapper.append(search, help('Choose a place, then paste its map link here.'), label, button);
    return wrapper;
  }
  function section(id, number, title) {
    const element = node('details', { className: 'editor-section', 'data-section': id }); element.open = openSections.has(id);
    element.append(node('summary', {}, [node('span', { className: 'section-number', text: number }), node('span', { text: title }), node('span', { className: 'section-chevron', 'aria-hidden': 'true', text: '＋' })]));
    const body = node('div', { className: 'section-body' }); element.append(body);
    element.addEventListener('toggle', () => { if (element.open) openSections.add(id); else openSections.delete(id); });
    $('character-form').append(element);
    return body;
  }
  function repeater(body, key, singular, title, defaults, buildFields, beforeRemove) {
    const character = current();
    if (!Array.isArray(character[key])) character[key] = [];
    const list = character[key];
    const rows = node('div', { className: 'repeat-list' });
    if (!list.length) rows.append(node('p', { className: 'empty-list', text: 'No ' + singular.toLowerCase() + ' added yet. This area stays hidden in the finished post.' }));
    list.forEach((item, index) => {
      const row = node('details', { className: 'repeat-item' });
      if (item.__new) { row.open = true; delete item.__new; }
      const rowTitle = node('span', { className: 'repeat-title', text: title(item) || singular + ' ' + (index + 1) });
      row.append(node('summary', {}, [node('span', { className: 'repeat-number', text: String(index + 1).padStart(2, '0') }), rowTitle]));
      const rowBody = node('div', { className: 'repeat-body' });
      buildFields(rowBody, item, () => { rowTitle.textContent = title(item) || singular + ' ' + (index + 1); });
      rowBody.append(node('button', { type: 'button', className: 'remove-row', text: 'Remove ' + singular.toLowerCase(), onclick: () => {
        if (beforeRemove && beforeRemove(item) === false) return;
        list.splice(index, 1); changed(); renderForm();
      } }));
      row.append(rowBody); rows.append(row);
    });
    body.append(rows, node('button', { type: 'button', className: 'add-row', text: '＋ Add ' + singular.toLowerCase(), onclick: () => {
      if (list.length >= LIST_LIMITS[key]) { message('This character already has the maximum of ' + LIST_LIMITS[key] + ' ' + singular.toLowerCase() + ' records. Save an archive character if you need more room.', true); return; }
      list.push({ ...defaults(), __new: true }); changed(); renderForm();
      const opened = $('character-form').querySelector('[data-section="' + body.parentElement.dataset.section + '"] .repeat-item[open]');
      if (opened) opened.querySelector('input,textarea,select')?.focus({ preventScroll: true });
    } }));
  }
  function renderNotices() {
    const notices = globalThis.DOSSIER_NOTICES || {};
    let entries = notices[current().id] || [];
    if (!Array.isArray(entries)) entries = [entries];
    $('source-notices').replaceChildren();
    entries.forEach(entry => {
      const text = typeof entry === 'string' ? entry : entry && (entry.message || entry.text);
      if (text) $('source-notices').append(node('p', { text }));
    });
    $('source-notices').hidden = !$('source-notices').childElementCount;
  }
  function renderSourceSummary() {
    const panel = $('source-summary'); if (!panel) return;
    const character = current(), metadata = sourceMetadata(character.id), pending = sourceUpdates.get(character.id);
    panel.replaceChildren(); panel.hidden = false;
    const heading = node('div', { className: 'source-summary-heading' }, [node('span', { className: 'source-badge', 'data-coverage': metadata.coverage, text: metadata.label }), node('span', { className: 'source-summary-state', text: pending ? 'Your edits are kept' : metadata.coverage === 'custom' ? 'Personal draft' : 'No pending updates' })]);
    panel.append(heading);
    if (metadata.coverage === 'directory') panel.append(help('Identity details are ready. Further development material has not been added for this character.'));
    if (metadata.coverage === 'encyclopaedia') panel.append(help('Includes the available encyclopaedia details for this character.'));
    if (metadata.coverage === 'development') panel.append(help('Includes details gathered from the character’s development post.'));
    if (typeof metadata.updatedAt === 'string') {
      const date = new Date(metadata.updatedAt);
      if (Number.isFinite(date.getTime())) panel.append(node('small', { className: 'source-checked', text: 'Checked ' + date.toLocaleDateString('en-GB', { timeZone: 'Europe/London', day: 'numeric', month: 'long', year: 'numeric' }) }));
    }
    const sources = Array.isArray(metadata.sourceUrls) ? metadata.sourceUrls : [];
    const links = node('div', { className: 'source-links' });
    sources.slice(0, 8).forEach((source, index) => {
      const url = Dossier.safeUrl(typeof source === 'string' ? source : source?.url);
      if (url) links.append(node('a', { href: url, target: '_blank', rel: 'noopener noreferrer', text: typeof source?.label === 'string' ? source.label + ' ↗' : 'Source ' + (index + 1) + ' ↗' }));
    });
    if (links.childElementCount) panel.append(links);
    if (pending) panel.append(node('button', { type: 'button', className: 'source-review-button', text: 'Review ' + pending.conflicts.length + ' source update' + (pending.conflicts.length === 1 ? '' : 's'), onclick: () => openSourceReview(character.id) }));
  }
  function sourceValuePreview(value, missing) {
    if (missing) return 'Not listed in the latest source';
    if (value === undefined || value === null || value === '' || Array.isArray(value) && value.length === 0) return 'Empty';
    if (typeof value === 'boolean') return value ? 'Yes' : 'No';
    if (Array.isArray(value)) return value.map(item => typeof item === 'object' ? item.label ? item.label + ': ' + (item.value || '') : item.title || item.name || item.url || 'Entry' : String(item)).join('\n');
    if (typeof value === 'object') return [value.title || value.name || value.label, value.summary || value.value, value.url].filter(Boolean).join('\n');
    return String(value);
  }
  function openSourceReview(id) {
    const update = sourceUpdates.get(id), character = library.characters.find(item => item.id === id);
    if (!update || !character) return;
    sourceReviewCharacterId = id;
    $('source-review-intro').textContent = 'The latest source differs from your version of ' + labelFor(character) + '. Choose the details you want to update. Unselected details will stay as you have them.';
    $('source-review-items').replaceChildren();
    update.conflicts.forEach((conflict, index) => {
      const checkbox = node('input', { type: 'checkbox', value: String(index), 'data-source-choice': '' });
      const heading = node('label', { className: 'source-change-choice' }, [checkbox, node('span', { text: conflict.label })]);
      const sides = node('div', { className: 'source-change-sides' }, [node('div', {}, [node('h3', { text: 'Your version' }), node('p', { text: sourceValuePreview(conflict.current, false) })]), node('div', {}, [node('h3', { text: 'Latest source' }), node('p', { text: sourceValuePreview(conflict.incoming, conflict.remove) })])]);
      $('source-review-items').append(node('section', { className: 'source-change' }, [heading, sides]));
    });
    $('source-review').showModal();
  }
  function applySourceConflict(character, conflict) {
    let target = character;
    for (let index = 0; index < conflict.path.length; index += 1) {
      const segment = conflict.path[index], last = index === conflict.path.length - 1;
      if (typeof segment === 'object') {
        if (!Array.isArray(target)) return;
        const position = target.findIndex(item => sourceListKey(segment.list, item) === segment.key);
        if (position < 0) return;
        if (last) { if (conflict.remove) target.splice(position, 1); else target[position] = sourceCopy(conflict.incoming); return; }
        target = target[position];
      } else {
        if (!target || typeof target !== 'object') return;
        if (last) { target[segment] = sourceCopy(conflict.incoming); return; }
        target = target[segment];
      }
    }
  }
  function finishSourceReview(useSelected) {
    const update = sourceUpdates.get(sourceReviewCharacterId), character = library.characters.find(item => item.id === sourceReviewCharacterId);
    if (!update || !character) { $('source-review').close(); return; }
    let applied = 0;
    if (useSelected) document.querySelectorAll('[data-source-choice]:checked').forEach(input => { const conflict = update.conflicts[Number(input.value)]; if (conflict) { applySourceConflict(character, conflict); applied += 1; } });
    library.sourceTracking[character.id] = { revision: update.revision, baseline: sourceCopy(update.incoming) };
    sourceUpdates.delete(character.id);
    cancelPhotoTheme(character.id); photoThemeStates.delete(character.id);
    $('source-review').close(); changed(); updatePicker(); renderForm(); updatePreview(); saveDraft();
    message(applied ? 'Applied ' + applied + ' selected update' + (applied === 1 ? '' : 's') + '. Your other edits were kept.' : 'Your edits were kept. This source update is marked as reviewed.');
  }
  function renderForm() {
    const character = current();
    $('character-form').replaceChildren(); renderSourceSummary(); renderNotices();
    let body = section('identity', '01', 'Identity');
    body.append(field('Full name', character, 'name', { picker: true }), grid(field('Preferred name', character, 'nickname', { picker: true }), field('Writer', character, 'writer', { placeholder: 'Lex / Sara', picker: true })), grid(field('Age', character, 'age', { inputMode: 'numeric' }), field('Pronouns', character, 'pronouns')), field('Gender', character, 'gender'), field('Occupation', character, 'occupation'), field('Location', character, 'location'), field('Relationship status', character, 'relationshipStatus', { help: 'This is the one status shown in the header. Use the People section for partners and connections.' }));
    body = section('appearance', '02', 'Photos, colour & place');
    body.append(field('Header photograph', character, 'portrait', { type: 'url', placeholder: 'https://…' }), cropField(character), field('Portrait / PI image', character, 'avatar', { type: 'url', placeholder: 'https://…', help: 'An optional separate portrait for the identity panel.' }), colourFields(character), starterAppearance(character), node('h3', { className: 'appearance-subheading', text: 'The hanging polaroids' }), help('Choose up to three photos and give each a caption. Add a link if you want the photo to open a profile or thread.'));
    repeater(body, 'polaroids', 'Polaroid', item => item.name, () => ({ name: '', image: '', url: '' }), (row, item, title) => row.append(field('Caption / name', item, 'name', { onChange: title }), field('Photo', item, 'image', { type: 'url', placeholder: 'https://…' }), field('Link (optional)', item, 'url', { type: 'url', placeholder: 'https://…' })));
    body.append(node('h3', { className: 'appearance-subheading', text: 'A place on the map' }), field('City or place label', character, 'mapLocation', { placeholder: 'San Bernardino, California', onChange: () => { const link = $('character-form').querySelector('[data-map-search]'); if (link) link.href = mapSearchUrl(character.mapLocation); } }), mapLinkControls(character), grid(field('Latitude', character, 'mapLatitude', { inputMode: 'decimal', placeholder: '34.1083' }), field('Longitude', character, 'mapLongitude', { inputMode: 'decimal', placeholder: '-117.2898' })), help('Use the map link above, or enter coordinates directly. Leave both coordinates blank to hide the map.'), field('Map zoom', character, 'mapZoom', { type: 'number', min: 2, max: 18, step: 1, help: '2 shows a wider region; 18 shows the closest street detail.' }));
    body = section('facts', '03', 'The encyclopaedia');
    body.append(help('Keep the established facts here: birthday, languages, favourites, and all their small details.'));
    repeater(body, 'facts', 'Fact', item => item.label, () => ({ label: '', value: '' }), (row, item, title) => row.append(field('Fact label', item, 'label', { onChange: title }), field('Value', item, 'value', { multiline: true, rows: 2 })));
    body = section('people', '04', 'Flavours & brands');
    body.append(help('Each connection lives here once. Keep a flavour, a brand, or both, then choose these same connections when adding a story entry.'));
    repeater(body, 'relationships', 'Connection', item => item.name, () => ({ id: uid('connection'), name: '', kind: '', flavour: '', brand: '', status: '', portrait: '', url: '', summary: '', pinned: false, featured: false, quote: '', playlistUrl: '' }), (row, item, title) => {
      row.append(field('Connection name', item, 'name', { onChange: title }), field('Connection type', item, 'kind', { choices: ['', 'Partner', 'Friend', 'Family', 'Group', 'Other'] }), grid(field('Flavour', item, 'flavour'), field('Brand', item, 'brand')), field('Connection status', item, 'status', { placeholder: 'Active / past / developing' }), check('Feature this ship or relationship', item, 'featured'), field('What they mean to each other', item, 'summary', { multiline: true }), field('Portrait', item, 'portrait', { type: 'url', placeholder: 'https://…' }), field('Profile or development post', item, 'url', { type: 'url', placeholder: 'https://…' }), field('A shared quote', item, 'quote', { multiline: true, rows: 2 }), field('Shared playlist', item, 'playlistUrl', { type: 'url', placeholder: 'https://open.spotify.com/playlist/…' }));
    }, item => {
      const linked = character.timeline.filter(entry => entry.connectionIds.includes(item.id));
      if (linked.length && !confirm('Remove ' + (item.name || 'this connection') + '? Its link will also be removed from ' + linked.length + ' story entries. The stories themselves will stay.')) return false;
      linked.forEach(entry => { entry.connectionIds = entry.connectionIds.filter(id => id !== item.id); });
      return true;
    });
    body = section('story', '05', 'The story archive');
    body.append(help('Add a thread, comms conversation, bud, or milestone once. The archive sorts by the in-world date. Use a year, a month, a full date, or leave it undated.'));
    repeater(body, 'timeline', 'Story entry', item => item.title, () => ({ id: uid('story'), title: '', url: '', date: '', dateLabel: '', postedDate: '', participants: '', type: 'Thread', status: '', connectionIds: [], summary: '', milestone: false }), (row, item, title) => {
      row.append(field('Title', item, 'title', { onChange: title }), field('Forum link', item, 'url', { type: 'url', placeholder: 'https://…' }), grid(field('Type', item, 'type', { choices: ['Thread', 'Comms', 'Bud', 'Milestone'] }), field('Status', item, 'status', { placeholder: 'Active / complete / archived' })), field('In-world date', item, 'date', { placeholder: '2026, 2026-11, or 2026-11-06', help: 'Leave empty when the story date has not been established.' }), field('Date label (optional)', item, 'dateLabel', { placeholder: 'Late autumn, before the debut…' }), field('Actual posting date (optional)', item, 'postedDate', { placeholder: '2026-11-06', help: 'Kept separately from the date the story takes place.' }), field('Other participants / group', item, 'participants'));
      if (character.relationships.length) {
        const choices = node('fieldset', { className: 'connection-choices' }, node('legend', { text: 'Linked connections' }));
        character.relationships.forEach(connection => {
          const input = node('input', { type: 'checkbox', value: connection.id }); input.checked = item.connectionIds.includes(connection.id);
          input.addEventListener('change', () => { item.connectionIds = input.checked ? [...new Set([...item.connectionIds, connection.id])] : item.connectionIds.filter(id => id !== connection.id); changed(); });
          choices.append(node('label', { className: 'checkbox-field' }, [input, node('span', { text: connection.name || 'Unnamed connection' })]));
        }); row.append(choices);
      }
      row.append(field('A short summary', item, 'summary', { multiline: true }), check('Highlight as a pivotal moment', item, 'milestone'));
    });
    body = section('soundtrack', '06', 'The soundtrack');
    body.append(field('Full playlist (optional)', character, 'playlistUrl', { type: 'url', placeholder: 'https://open.spotify.com/playlist/…' }), help('Keep individual songs, a full playlist, or both. Spotify links become playable embeds; other music links remain clickable.'));
    repeater(body, 'songs', 'Song', item => item.title, () => ({ title: '', artist: '', url: '', note: '' }), (row, item, title) => row.append(field('Song title', item, 'title', { onChange: title }), field('Artist', item, 'artist'), field('Song link', item, 'url', { type: 'url', placeholder: 'https://open.spotify.com/track/…' }), field('Why this song belongs', item, 'note', { multiline: true, rows: 2 })));
    body = section('chapter', '07', 'Current chapter & continuity');
    body.append(field('Current chapter', character, 'currentChapter', { multiline: true, help: 'A short snapshot of where they are in their story.' }), field('As of (in-world)', character, 'asOf', { placeholder: 'November 2026' }), field('Continuity notes', character, 'notes', { multiline: true, rows: 5, help: 'Established details you want to remember. These appear in the finished post; keep private planning notes elsewhere.' }));
  }
  function stylesheetUrl() {
    const value = settings.stylesheetUrl.trim();
    try { const parsed = new URL(value); if (!['http:', 'https:'].includes(parsed.protocol)) throw new Error(); return parsed.href; }
    catch (_) { throw new Error('The shared stylesheet needs a complete http or https address. Restore the original address in Forum delivery if you are unsure.'); }
  }
  function resizePreview() {
    const frame = $('dossier-preview');
    try { const doc = frame.contentDocument; if (doc && doc.body) frame.style.height = Math.max(400, doc.body.scrollHeight, doc.body.offsetHeight) + 'px'; } catch (_) { /* The preview remains scrollable if a browser restricts local sizing. */ }
  }
  function updatePreview() {
    const character = current();
    try {
      const rendered = Dossier.render(character, { includeStylesheet: false });
      generatedCode = Dossier.forum(character, stylesheetUrl());
      const localCss = new URL('dossier-v5.css', document.baseURI).href;
      const css = typeof globalThis.DOSSIER_PREVIEW_CSS === 'string' ? '<style>' + globalThis.DOSSIER_PREVIEW_CSS.replace(/<\/style/gi, '<\\/style') + '</style>' : '<link rel="stylesheet" href="' + Dossier.escapeHtml(localCss) + '">';
      const runtime = typeof globalThis.DOSSIER_PREVIEW_RUNTIME === 'string' ? '<script>' + globalThis.DOSSIER_PREVIEW_RUNTIME.replace(/<\/script/gi, '<\\/script') + '</script>' : '<script src="' + Dossier.escapeHtml(new URL('dossier-runtime-v5.js', document.baseURI).href) + '"></script>';
      const doc = '<!doctype html><html lang="en" color-mode="' + settings.theme + '"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' + css + '<style>html{background:transparent;color-scheme:' + settings.theme + '}body{margin:0;padding:0;min-width:0}html,body{overflow-x:hidden}.bh-dossier-v5{margin-top:0!important;margin-bottom:0!important}</style></head><body>' + rendered + runtime + '</body></html>';
      $('dossier-preview').srcdoc = doc;
      $('preview-error').hidden = true;
      $('forum-code').value = generatedCode;
      $('copy-post').disabled = exportBusy; $('download-post').disabled = exportBusy;
    } catch (error) {
      generatedCode = '';
      $('preview-error').textContent = 'Finish this detail to update the preview: ' + error.message;
      $('preview-error').hidden = false;
      $('forum-code').value = '';
      $('copy-post').disabled = true; $('download-post').disabled = true;
    }
    $('preview-theme').textContent = settings.theme === 'dark' ? 'Light mode' : 'Dark mode';
    $('preview-theme').setAttribute('aria-pressed', String(settings.theme === 'light'));
    $('preview-width').setAttribute('aria-pressed', String(settings.narrow));
    document.querySelector('.preview-canvas').dataset.narrow = String(settings.narrow);
    requestPhotoTheme(character, false);
  }
  function switchCharacter(id) {
    saveDraft(); cancelOtherPhotoThemes(id); settings.selectedId = id; saveSettings();
    updatePicker(); renderForm(); updatePreview();
    message('Editing ' + labelFor(current()) + '.');
  }
  function createCharacter(duplicate) {
    if (library.characters.length >= 500) { message('This library already contains 500 characters. Save a backup and use a separate library for more characters.', true); return; }
    saveDraft();
    const character = duplicate ? clone(current()) : Dossier.normalizeCharacter({ id: uid('character'), name: '' });
    character.id = uid('character');
    if (duplicate) character.name = labelFor(current()) + ' — copy';
    library.characters.push(character); settings.selectedId = character.id;
    cancelOtherPhotoThemes(character.id);
    dirty = true;
    $('character-search').value = ''; openSections.add('identity');
    updatePicker(); renderForm(); updatePreview(); saveDraft();
    $('character-form').querySelector('[data-field="name"]').focus();
    message(duplicate ? 'A separate copy is ready to edit.' : 'A blank character is ready to make your own.');
  }
  async function preparePost() {
    if (exportBusy) return null;
    updatePreview(); if (!generatedCode) return null;
    const character = current();
    const originalUrl = Dossier.safeUrl(character.portrait);
    const originalCrop = character.imagePosition || '50% 35%';
    exportBusy = true;
    $('copy-post').disabled = true; $('download-post').disabled = true;
    if (character.themeMode !== 'manual' && originalUrl && (character.paletteSource !== originalUrl || (character.paletteCrop || '50% 35%') !== originalCrop)) message('Matching the page colour to the header photo before preparing the post…');
    try {
      const result = await requestPhotoTheme(character, false);
      if (current() !== character || Dossier.safeUrl(character.portrait) !== originalUrl || (character.imagePosition || '50% 35%') !== originalCrop || result?.status === 'cancelled') {
        message('The character or photo changed while the post was being prepared. Copy or download again to use the current version.', true); return null;
      }
      updatePreview();
      return generatedCode ? { code: generatedCode, character, fallback: result?.status === 'error' } : null;
    } finally {
      exportBusy = false;
      $('copy-post').disabled = !generatedCode; $('download-post').disabled = !generatedCode;
    }
  }
  async function copyPost() {
    const post = await preparePost(); if (!post) return;
    try {
      if (!navigator.clipboard || !navigator.clipboard.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(post.code);
      message(post.fallback ? 'Forum post copied with the previous colour because the photo could not be sampled.' : 'Forum post copied. Paste it into the development thread.');
    } catch (_) {
      $('manual-copy').value = post.code;
      $('copy-fallback').showModal(); $('manual-copy').focus(); $('manual-copy').select();
      message(post.fallback ? 'Your post is ready in the copy window, using the previous colour because the photo could not be sampled.' : 'Your post is ready in the copy window.');
    }
  }
  function exportBackup(single) {
    saveDraft();
    const characters = clone(single ? [current()] : library.characters);
    const sourceTracking = Object.create(null);
    characters.forEach(character => { if (library.sourceTracking?.[character.id]) sourceTracking[character.id] = clone(library.sourceTracking[character.id]); });
    const data = { version: 1, characters, sourceTracking };
    download(JSON.stringify(data, null, 2), single ? fileName(current()) + '-editable.json' : 'blue-hour-character-library.json');
    $('backup-status').textContent = 'Backup downloaded. It includes ' + data.characters.length + ' character' + (data.characters.length === 1 ? '' : 's') + '.';
    message(single ? 'Editable character backup downloaded.' : 'Editable library backup downloaded.');
  }
  async function importBackup(event) {
    const input = event.target; const file = input.files && input.files[0]; if (!file) return;
    try {
      if (file.size > 20 * 1024 * 1024) throw new Error('This backup is larger than 20 MB. Import a smaller character or library backup.');
      const imported = normalizeDraftDataset(JSON.parse(await file.text()));
      if (!imported.characters.length) throw new Error('The backup does not contain any characters.');
      const byId = new Map(library.characters.map(character => [character.id, character]));
      const conflicts = imported.characters.filter(character => byId.has(character.id));
      if (conflicts.length && !confirm('This backup contains ' + conflicts.length + ' character' + (conflicts.length === 1 ? '' : 's') + ' already in your library. Replace their current drafts with the imported versions? Other characters will stay unchanged. Save a backup first if you want to keep both versions.')) { message('Import cancelled. Your library is unchanged.'); return; }
      imported.characters.forEach(character => byId.set(character.id, character));
      if (byId.size > 500) throw new Error('The combined library would contain more than 500 characters. Import a smaller backup.');
      imported.characters.forEach(character => { cancelPhotoTheme(character.id); photoThemeStates.delete(character.id); });
      const sourceTracking = Object.assign(Object.create(null), library.sourceTracking || {});
      imported.characters.forEach(character => { if (imported.sourceTracking?.[character.id]) sourceTracking[character.id] = imported.sourceTracking[character.id]; else delete sourceTracking[character.id]; });
      library = { version: 1, characters: [...byId.values()], sourceTracking };
      applySourceUpdates();
      dirty = true;
      settings.selectedId = imported.characters[0].id;
      $('character-search').value = ''; updatePicker(); renderForm(); updatePreview(); saveDraft();
      message('Imported ' + imported.characters.length + ' character' + (imported.characters.length === 1 ? '' : 's') + '. Other characters were kept.');
    } catch (error) { message('Could not import this backup. ' + error.message, true); }
    finally { input.value = ''; }
  }
  function bindControls() {
    document.querySelector('.backup-section .section-number').textContent = '08';
    document.querySelector('.delivery-section .section-number').textContent = '09';
    $('character-form').addEventListener('submit', event => event.preventDefault());
    $('character-search').addEventListener('input', updatePicker);
    $('source-filter')?.addEventListener('change', updatePicker);
    $('character-picker').addEventListener('change', event => switchCharacter(event.target.value));
    $('new-character').addEventListener('click', () => createCharacter(false));
    $('duplicate-character').addEventListener('click', () => createCharacter(true));
    $('copy-post').addEventListener('click', copyPost);
    $('download-post').addEventListener('click', async () => { const post = await preparePost(); if (!post) return; download(post.code, fileName(post.character) + '-forum-post.txt', 'text/plain;charset=utf-8'); message(post.fallback ? 'Forum post downloaded with the previous colour because the photo could not be sampled.' : 'Forum post downloaded. Paste its contents into your development thread.'); });
    $('save-character').addEventListener('click', () => exportBackup(true));
    $('save-library').addEventListener('click', () => exportBackup(false));
    $('import-backup').addEventListener('change', importBackup);
    $('close-source-review')?.addEventListener('click', () => $('source-review').close());
    $('keep-source-edits')?.addEventListener('click', () => finishSourceReview(false));
    $('apply-source-updates')?.addEventListener('click', () => finishSourceReview(true));
    $('stylesheet-url').value = settings.stylesheetUrl;
    $('stylesheet-url').addEventListener('input', event => { settings.stylesheetUrl = event.target.value; saveSettings(); clearTimeout(previewTimer); previewTimer = setTimeout(updatePreview, 350); });
    $('restore-stylesheet').addEventListener('click', () => { settings.stylesheetUrl = DEFAULT_STYLESHEET; $('stylesheet-url').value = DEFAULT_STYLESHEET; saveSettings(); updatePreview(); message('Original shared stylesheet address restored.'); });
    $('preview-theme').addEventListener('click', () => { settings.theme = settings.theme === 'dark' ? 'light' : 'dark'; saveSettings(); updatePreview(); });
    $('preview-width').addEventListener('click', () => { settings.narrow = !settings.narrow; saveSettings(); updatePreview(); });
    $('dossier-preview').addEventListener('load', () => { resizePreview(); setTimeout(resizePreview, 300); setTimeout(resizePreview, 1200); try { const doc = $('dossier-preview').contentDocument; doc.querySelectorAll('a[href]').forEach(link => { if (/^https?:/i.test(link.getAttribute('href'))) { link.target = '_blank'; link.rel = 'noopener noreferrer'; } }); doc.addEventListener('toggle', () => setTimeout(resizePreview, 0), true); doc.addEventListener('click', () => setTimeout(resizePreview, 0)); } catch (_) {} });
    window.addEventListener('resize', resizePreview);
    window.addEventListener('hashchange', () => { const before = settings.selectedId; selectFromAddress(); if (settings.selectedId !== before) switchCharacter(settings.selectedId); });
    window.addEventListener('storage', event => {
      if (event.key === STORAGE_KEY && event.newValue !== lastStoredLibrary) {
        externalChange = true;
        $('save-status').textContent = 'Another tab has a newer saved library';
        message('Another atelier tab saved a newer library. Download a backup of any edits here before reloading. This tab will not overwrite the other copy.', true);
      }
    });
    window.addEventListener('beforeunload', saveDraft);
    document.addEventListener('visibilitychange', () => { if (document.hidden) saveDraft(); });
  }
  try {
    if (!globalThis.Dossier) throw new Error('The editor files are incomplete. Keep index.html, editor.js, dossier-model.js, seed-data.js, and both stylesheets together.');
    initData(); bindControls(); updatePicker(); renderForm(); updatePreview(); saveDraft();
  } catch (error) {
    message('The atelier could not open. ' + error.message, true);
    $('save-status').textContent = 'Could not open the library';
  }
})();
