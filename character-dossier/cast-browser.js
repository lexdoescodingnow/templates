(function () {
  'use strict';
  var Dossier = window.Dossier;
  var library = Dossier.normalizeDataset(window.DOSSIER_CAST_DATA);
  var config = window.DOSSIER_CAST_CONFIG;
  var characters = library.characters.slice().sort(function (a,b) { return a.name.localeCompare(b.name); });
  var list = document.getElementById('cast-list');
  var search = document.getElementById('cast-search');
  var preview = document.getElementById('cast-preview');
  var code = document.getElementById('cast-code-text');
  var details = document.getElementById('cast-code');
  var status = document.getElementById('cast-status');
  var selected;
  var buttons = [];

  function requestedId() {
    var fragment = new URLSearchParams(location.hash.slice(1));
    return fragment.get('character') || new URLSearchParams(location.search).get('character');
  }

  function choose(id, updateAddress) {
    var character = characters.find(function (item) { return item.id === id; });
    if (!character) return;
    selected = character;
    document.getElementById('cast-selected-name').textContent = character.name || character.nickname;
    document.getElementById('cast-edit').href = 'atelier.html?character=' + encodeURIComponent(character.id);
    code.value = Dossier.forum(character, config.stylesheetUrl);
    preview.innerHTML = Dossier.render(character);
    buttons.forEach(function (entry) { entry.button.setAttribute('aria-current', entry.character.id === id ? 'true' : 'false'); });
    status.textContent = '';
    details.open = false;
    if (window.BlueHourDossierRuntime) window.BlueHourDossierRuntime.scan(preview);
    if (updateAddress && window.history && history.replaceState) {
      try { history.replaceState(null, '', '#character=' + encodeURIComponent(id)); } catch (_) {}
    }
  }

  characters.forEach(function (character) {
    var button = document.createElement('button');
    button.type = 'button';
    var label = document.createElement('span');
    label.textContent = character.name || character.nickname;
    if (character.nickname && character.nickname.toLowerCase() !== character.name.toLowerCase()) {
      var nickname = document.createElement('small');
      nickname.textContent = character.nickname;
      label.appendChild(nickname);
    }
    button.appendChild(label);
    button.addEventListener('click', function () { choose(character.id, true); });
    list.appendChild(button);
    buttons.push({ button: button, character: character, terms: [character.name,character.nickname,character.writer].join(' ').toLocaleLowerCase() });
  });

  function filter() {
    var query = search.value.trim().toLocaleLowerCase();
    var count = 0;
    buttons.forEach(function (entry) { var match = entry.terms.indexOf(query) !== -1; entry.button.hidden = !match; if (match) count += 1; });
    document.getElementById('cast-result-count').textContent = count + (count === 1 ? ' character' : ' characters');
    document.getElementById('cast-empty').hidden = count > 0;
  }
  search.addEventListener('input', filter);
  filter();

  document.getElementById('cast-copy').addEventListener('click', function () {
    if (!selected) return;
    function manualCopy() {
      details.open = true;
      code.focus();
      code.select();
      var copied = false;
      try { copied = document.execCommand('copy'); } catch (_) {}
      status.textContent = copied ? 'Forum post copied.' : 'The forum code is selected below. Copy it with your usual keyboard shortcut.';
    }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(code.value).then(function () { status.textContent = 'Forum post copied.'; }, manualCopy);
    else manualCopy();
  });

  document.getElementById('cast-download').addEventListener('click', function () {
    if (!selected) return;
    var url = URL.createObjectURL(new Blob([code.value], {type:'text/plain;charset=utf-8'}));
    var link = document.createElement('a');
    link.href = url;
    link.download = selected.id + '.txt';
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
    status.textContent = 'Downloaded ' + (selected.name || selected.nickname) + '\u2019s forum post.';
  });

  document.getElementById('cast-theme').addEventListener('click', function (event) {
    var light = document.documentElement.getAttribute('color-mode') !== 'light';
    document.documentElement.setAttribute('color-mode', light ? 'light' : 'dark');
    event.currentTarget.textContent = light ? 'Dark view' : 'Light view';
  });
  window.addEventListener('hashchange', function () { choose(requestedId(), false); });
  choose(characters.some(function (character) { return character.id === requestedId(); }) ? requestedId() : characters[0].id, false);
}());
