(function () {
  'use strict';
  const STORAGE_KEY = 'bluehour.character-atelier.library.v1';
  const SETTINGS_KEY = 'bluehour.character-atelier.settings.v1';
  const PREVIOUS_STYLESHEETS = ['https://cdn.jsdelivr.net/gh/lexdoescodingnow/templates@character-dossier-v1/character-dossier/dossier-v1.css', 'https://cdn.jsdelivr.net/gh/lexdoescodingnow/templates@character-dossier-v1/character-dossier/dossier-v2.css'];
  const DEFAULT_STYLESHEET = 'https://cdn.jsdelivr.net/gh/lexdoescodingnow/templates@character-dossier-v1/character-dossier/dossier-v3.css';
  const $ = id => document.getElementById(id);
  const clone = value => JSON.parse(JSON.stringify(value));
  let fieldCounter = 0;
  let saveTimer;
  let previewTimer;
  let library;
  let settings = { selectedId: '', theme: 'dark', narrow: false, stylesheetUrl: DEFAULT_STYLESHEET };
  let storageAvailable = true;
  let generatedCode = '';
  let openSections = new Set(['identity']);
  let recoveryDownload = null;
  let dirty = false;
  let lastStoredLibrary = null;
  let externalChange = false;
  const LIST_LIMITS = { facts: 150, relationships: 200, timeline: 1500, songs: 200, polaroids: 3 };
  const TEXT_LIMITS = { name: 160, nickname: 160, age: 40, pronouns: 80, gender: 120, occupation: 250, location: 250, writer: 120, portrait: 4000, avatar: 4000, image: 4000, imagePosition: 30, mapLocation: 250, mapLatitude: 40, mapLongitude: 40, mapZoom: 2, accent: 7, label: 160, value: 2000, currentChapter: 5000, asOf: 120, notes: 15000, relationshipStatus: 160, kind: 80, flavour: 160, status: 120, url: 4000, summary: 5000, quote: 3000, playlistUrl: 4000, title: 250, artist: 250, note: 1500, date: 40, dateLabel: 160, postedDate: 40, participants: 400, type: 80 };
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
  function normalizeDraftDataset(raw) {
    const prepared = clone(raw);
    const characters = prepared && Array.isArray(prepared.characters) ? prepared.characters : prepared && (Object.hasOwn(prepared, 'name') || Object.hasOwn(prepared, 'id')) ? [prepared] : [];
    const starters = new Map((Array.isArray(globalThis.DOSSIER_SEED?.characters) ? globalThis.DOSSIER_SEED.characters : []).map(character => [character.id, character]));
    characters.forEach(character => {
      if (!character || typeof character !== 'object' || Array.isArray(character)) return;
      const starter = starters.get(character.id);
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
    $('save-status').textContent = storageAvailable ? 'Ready · changes save in this browser' : 'Download a backup to save your changes';
    if (recoveryDownload) {
      const button = node('button', { type: 'button', text: 'Download the unopened draft', onclick: () => download(recoveryDownload, 'character-atelier-recovery.json') });
      $('feedback').after(button);
    }
  }
  function updatePicker() {
    const query = $('character-search').value.trim().toLocaleLowerCase();
    const matches = [...library.characters].sort((a, b) => labelFor(a).localeCompare(labelFor(b))).filter(character => !query || [character.name, character.nickname, character.writer].join(' ').toLocaleLowerCase().includes(query));
    $('character-picker').replaceChildren();
    if (!matches.some(character => character.id === settings.selectedId)) matches.unshift(current());
    matches.forEach(character => {
      const option = node('option', { value: character.id, text: labelFor(character) });
      option.selected = character.id === settings.selectedId;
      $('character-picker').append(option);
    });
    $('character-count').textContent = library.characters.length + ' in your cast';
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
  function colourFields(character) {
    const wrapper = node('fieldset', { className: 'colour-fieldset' }, node('legend', { text: 'Character colour' }));
    const picker = node('input', { type: 'color', 'aria-label': 'Choose character colour', 'data-field': 'accent-picker' });
    const swatches = node('div', { className: 'colour-swatches', role: 'group', 'aria-label': 'Character colour palette' });
    let hexInput;
    function syncColour() {
      const hex = fullHex(character.accent);
      if (hex) picker.value = hex;
      swatches.querySelectorAll('button').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.colour === hex)));
      updateChromeColour();
    }
    function chooseColour(value) {
      character.accent = value; hexInput.value = value; syncColour(); changed();
    }
    const hex = field('Hex colour', character, 'accent', { placeholder: '#5b8612', maxLength: 7, onChange: syncColour });
    hexInput = hex.querySelector('input');
    picker.value = fullHex(character.accent) || '#5b8612';
    picker.addEventListener('input', () => chooseColour(picker.value));
    wrapper.append(node('div', { className: 'colour-controls' }, [picker, hex]), help('Sets the colour of this character’s panels, borders and highlights. Match it to their photos.'));
    COLOUR_PALETTE.forEach(([name, value]) => {
      const button = node('button', { type: 'button', className: 'colour-swatch', 'data-colour': value, 'aria-label': name + ' ' + value, 'aria-pressed': 'false', onclick: () => chooseColour(value) }, [node('span', { className: 'colour-swatch-dot', 'aria-hidden': 'true' }), node('span', { text: name })]);
      button.style.setProperty('--swatch', value); swatches.append(button);
    });
    wrapper.append(swatches); syncColour();
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
      character.accent = starter.accent || '#a99b8e';
      changed(); renderForm(); updatePreview();
      message('Starter photos and colour restored for ' + labelFor(character) + '.');
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
  function renderForm() {
    const character = current();
    $('character-form').replaceChildren(); renderNotices();
    let body = section('identity', '01', 'Identity');
    body.append(field('Full name', character, 'name', { picker: true }), grid(field('Preferred name', character, 'nickname', { picker: true }), field('Writer', character, 'writer', { placeholder: 'Lex / Sara', picker: true })), grid(field('Age', character, 'age', { inputMode: 'numeric' }), field('Pronouns', character, 'pronouns')), field('Gender', character, 'gender'), field('Occupation', character, 'occupation'), field('Location', character, 'location'), field('Relationship status', character, 'relationshipStatus', { help: 'This is the one status shown in the header. Use the People section for partners and connections.' }));
    body = section('appearance', '02', 'Photos, colour & place');
    body.append(field('Header photograph', character, 'portrait', { type: 'url', placeholder: 'https://…' }), cropField(character), field('Portrait / PI image', character, 'avatar', { type: 'url', placeholder: 'https://…', help: 'An optional separate portrait for the identity panel.' }), colourFields(character), starterAppearance(character), node('h3', { className: 'appearance-subheading', text: 'The hanging polaroids' }), help('Choose up to three photos and give each a caption. Add a link if you want the photo to open a profile or thread.'));
    repeater(body, 'polaroids', 'Polaroid', item => item.name, () => ({ name: '', image: '', url: '' }), (row, item, title) => row.append(field('Caption / name', item, 'name', { onChange: title }), field('Photo', item, 'image', { type: 'url', placeholder: 'https://…' }), field('Link (optional)', item, 'url', { type: 'url', placeholder: 'https://…' })));
    body.append(node('h3', { className: 'appearance-subheading', text: 'A place on the map' }), field('City or place label', character, 'mapLocation', { placeholder: 'San Bernardino, California', onChange: () => { const link = $('character-form').querySelector('[data-map-search]'); if (link) link.href = mapSearchUrl(character.mapLocation); } }), mapLinkControls(character), grid(field('Latitude', character, 'mapLatitude', { inputMode: 'decimal', placeholder: '34.1083' }), field('Longitude', character, 'mapLongitude', { inputMode: 'decimal', placeholder: '-117.2898' })), help('Use the map link above, or enter coordinates directly. Leave both coordinates blank to hide the map.'), field('Map zoom', character, 'mapZoom', { type: 'number', min: 2, max: 18, step: 1, help: '2 shows a wider region; 18 shows the closest street detail.' }));
    body = section('facts', '03', 'The encyclopaedia');
    body.append(help('Keep the established facts here: birthday, languages, favourites, and all their small details.'));
    repeater(body, 'facts', 'Fact', item => item.label, () => ({ label: '', value: '' }), (row, item, title) => row.append(field('Fact label', item, 'label', { onChange: title }), field('Value', item, 'value', { multiline: true, rows: 2 })));
    body = section('people', '04', 'People, ships & flavours');
    body.append(help('Each connection lives here once. Add their flavour, shared details and links, then choose these same connections when adding a story entry.'));
    repeater(body, 'relationships', 'Connection', item => item.name, () => ({ id: uid('connection'), name: '', kind: '', flavour: '', status: '', portrait: '', url: '', summary: '', pinned: false, featured: false, quote: '', playlistUrl: '' }), (row, item, title) => {
      row.append(field('Connection name', item, 'name', { onChange: title }), grid(field('Connection type', item, 'kind', { choices: ['', 'Partner', 'Friend', 'Family', 'Group', 'Other'] }), field('Flavour', item, 'flavour')), field('Connection status', item, 'status', { placeholder: 'Active / past / developing' }), check('Feature this ship or relationship', item, 'featured'), field('What they mean to each other', item, 'summary', { multiline: true }), field('Portrait', item, 'portrait', { type: 'url', placeholder: 'https://…' }), field('Profile or development post', item, 'url', { type: 'url', placeholder: 'https://…' }), field('A shared quote', item, 'quote', { multiline: true, rows: 2 }), field('Shared playlist', item, 'playlistUrl', { type: 'url', placeholder: 'https://open.spotify.com/playlist/…' }));
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
      const localCss = new URL('dossier-v3.css', document.baseURI).href;
      const css = typeof globalThis.DOSSIER_PREVIEW_CSS === 'string' ? '<style>' + globalThis.DOSSIER_PREVIEW_CSS.replace(/<\/style/gi, '<\\/style') + '</style>' : '<link rel="stylesheet" href="' + Dossier.escapeHtml(localCss) + '">';
      const doc = '<!doctype html><html lang="en" color-mode="' + settings.theme + '"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' + css + '<style>html{background:transparent;color-scheme:' + settings.theme + '}body{margin:0;padding:0;min-width:0}html,body{overflow-x:hidden}.bh-dossier-v3{margin-top:0!important;margin-bottom:0!important}</style></head><body>' + rendered + '</body></html>';
      $('dossier-preview').srcdoc = doc;
      $('preview-error').hidden = true;
      $('forum-code').value = generatedCode;
      $('copy-post').disabled = false; $('download-post').disabled = false;
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
  }
  function switchCharacter(id) {
    saveDraft(); settings.selectedId = id; saveSettings();
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
    dirty = true;
    $('character-search').value = ''; openSections.add('identity');
    updatePicker(); renderForm(); updatePreview(); saveDraft();
    $('character-form').querySelector('[data-field="name"]').focus();
    message(duplicate ? 'A separate copy is ready to edit.' : 'A blank character is ready to make your own.');
  }
  async function copyPost() {
    updatePreview(); if (!generatedCode) return;
    try {
      if (!navigator.clipboard || !navigator.clipboard.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(generatedCode);
      message('Forum post copied. Paste it into the development thread.');
    } catch (_) {
      $('manual-copy').value = generatedCode;
      $('copy-fallback').showModal(); $('manual-copy').focus(); $('manual-copy').select();
      message('Your post is ready in the copy window.');
    }
  }
  function exportBackup(single) {
    saveDraft();
    const data = { version: 1, characters: clone(single ? [current()] : library.characters) };
    download(JSON.stringify(data, null, 2), single ? fileName(current()) + '-editable.json' : 'blue-hour-character-library.json');
    $('backup-status').textContent = 'Backup downloaded. It includes ' + data.characters.length + ' character' + (data.characters.length === 1 ? '' : 's') + '.';
    message(single ? 'Editable character backup downloaded.' : 'Editable library backup downloaded.');
  }
  async function importBackup(event) {
    const input = event.target; const file = input.files && input.files[0]; if (!file) return;
    try {
      if (file.size > 4 * 1024 * 1024) throw new Error('This backup is larger than 4 MB. Import a smaller character or library backup.');
      const imported = normalizeDraftDataset(JSON.parse(await file.text()));
      if (!imported.characters.length) throw new Error('The backup does not contain any characters.');
      const byId = new Map(library.characters.map(character => [character.id, character]));
      const conflicts = imported.characters.filter(character => byId.has(character.id));
      if (conflicts.length && !confirm('This backup contains ' + conflicts.length + ' character' + (conflicts.length === 1 ? '' : 's') + ' already in your library. Replace their current drafts with the imported versions? Other characters will stay unchanged. Save a backup first if you want to keep both versions.')) { message('Import cancelled. Your library is unchanged.'); return; }
      imported.characters.forEach(character => byId.set(character.id, character));
      if (byId.size > 500) throw new Error('The combined library would contain more than 500 characters. Import a smaller backup.');
      library = { version: 1, characters: [...byId.values()] };
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
    $('character-picker').addEventListener('change', event => switchCharacter(event.target.value));
    $('new-character').addEventListener('click', () => createCharacter(false));
    $('duplicate-character').addEventListener('click', () => createCharacter(true));
    $('copy-post').addEventListener('click', copyPost);
    $('download-post').addEventListener('click', () => { updatePreview(); if (!generatedCode) return; download(generatedCode, fileName(current()) + '-forum-post.txt', 'text/plain;charset=utf-8'); message('Forum post downloaded. Paste its contents into your development thread.'); });
    $('save-character').addEventListener('click', () => exportBackup(true));
    $('save-library').addEventListener('click', () => exportBackup(false));
    $('import-backup').addEventListener('change', importBackup);
    $('stylesheet-url').value = settings.stylesheetUrl;
    $('stylesheet-url').addEventListener('input', event => { settings.stylesheetUrl = event.target.value; saveSettings(); clearTimeout(previewTimer); previewTimer = setTimeout(updatePreview, 350); });
    $('restore-stylesheet').addEventListener('click', () => { settings.stylesheetUrl = DEFAULT_STYLESHEET; $('stylesheet-url').value = DEFAULT_STYLESHEET; saveSettings(); updatePreview(); message('Original shared stylesheet address restored.'); });
    $('preview-theme').addEventListener('click', () => { settings.theme = settings.theme === 'dark' ? 'light' : 'dark'; saveSettings(); updatePreview(); });
    $('preview-width').addEventListener('click', () => { settings.narrow = !settings.narrow; saveSettings(); updatePreview(); });
    $('dossier-preview').addEventListener('load', () => { resizePreview(); setTimeout(resizePreview, 300); setTimeout(resizePreview, 1200); try { const doc = $('dossier-preview').contentDocument; doc.querySelectorAll('a[href]').forEach(link => { if (/^https?:/i.test(link.getAttribute('href'))) { link.target = '_blank'; link.rel = 'noopener noreferrer'; } }); doc.addEventListener('toggle', () => setTimeout(resizePreview, 0), true); doc.addEventListener('click', () => setTimeout(resizePreview, 0)); } catch (_) {} });
    window.addEventListener('resize', resizePreview);
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
    initData(); bindControls(); updatePicker(); renderForm(); updatePreview();
  } catch (error) {
    message('The atelier could not open. ' + error.message, true);
    $('save-status').textContent = 'Could not open the library';
  }
})();
