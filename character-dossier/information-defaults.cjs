'use strict';

const assert = require('node:assert/strict');
const Dossier = require('./dossier-model.js');
const source = require('./sources/information-defaults.json');

// Conventional Western sun-sign dates used in the character profiles.
const months = [
  ['January', 31, 20, 'Aquarius'], ['February', 29, 19, 'Pisces'],
  ['March', 31, 21, 'Aries'], ['April', 30, 20, 'Taurus'],
  ['May', 31, 21, 'Gemini'], ['June', 30, 21, 'Cancer'],
  ['July', 31, 23, 'Leo'], ['August', 31, 23, 'Virgo'],
  ['September', 30, 23, 'Libra'], ['October', 31, 23, 'Scorpio'],
  ['November', 30, 22, 'Sagittarius'], ['December', 31, 22, 'Capricorn']
];

function signFromBirthday(birthday) {
  const parts = String(birthday).trim().toLowerCase()
    .replace(/(\d)(st|nd|rd|th)\b/g, '$1').split(/\s+/);
  if (parts.length !== 2) return '';
  if (/^\d+$/.test(parts[0])) parts.reverse();
  const index = months.findIndex(([name]) => name.toLowerCase() === parts[0]);
  const day = Number(parts[1]);
  if (index < 0 || !/^\d{1,2}$/.test(parts[1]) || day < 1 || day > months[index][1]) return '';
  return months[day >= months[index][2] ? index : (index + 11) % 12][3];
}

function prepare(characters) {
  const byId = new Map(characters.map(c => [c.id, c]));
  const fields = new Set(Dossier.standardInformationFields.map(f => f.key));
  const records = new Map();
  for (const row of source.records) {
    assert(byId.has(row.id) && fields.has(row.field) && row.value?.trim() && row.source?.trim(), 'Invalid Information source: ' + JSON.stringify(row));
    if (!records.has(row.id)) records.set(row.id, new Map());
    const rows = records.get(row.id);
    assert(!rows.has(row.field), 'Duplicate Information source: ' + row.id + '/' + row.field);
    rows.set(row.field, row);
  }
  for (const id of Object.keys(source.unconfirmedBirthdays)) assert(byId.has(id), 'Unknown birthday exception: ' + id);

  return function apply(character) {
    const changed = new Set(), references = new Map();
    function fill(field, value, reference, replaces) {
      const current = Dossier.getInformationValue(character, field);
      if (!value || value === current) return;
      if (current && replaces === undefined) return;
      if (replaces !== undefined) assert.equal(current, replaces, 'Recheck corrected source for ' + character.id + '/' + field);
      Dossier.setInformationValue(character, field, value);
      changed.add(field === 'gender' ? 'gender' : 'facts');
      if (!references.has(reference)) references.set(reference, []);
      references.get(reference).push(field);
    }
    for (const row of records.get(character.id)?.values() || []) {
      fill(row.field, row.value, row.source, row.replaces);
    }
    fill('preferredName', character.nickname, 'PI directory display name');
    const birthdayConflict = source.unconfirmedBirthdays[character.id];
    if (!birthdayConflict) {
      const birthday = Dossier.getInformationValue(character, 'birthday');
      fill('westernZodiac', signFromBirthday(birthday), 'Confirmed birthday');
    }
    return {
      fields: [...changed],
      conflicts: birthdayConflict ? [birthdayConflict] : [],
      sources: [...references].map(([reference, fields]) => {
        if (reference.startsWith('https://bluehour.jcink.net/')) return {kind:'information-post', url:reference, fields};
        if (reference.startsWith('https://leafentertainment.fandom.com/')) return {kind:'biography', url:reference, fields};
        return {kind:'information', reference, fields};
      })
    };
  };
}

module.exports = {prepare, signFromBirthday, checkedAt: source.checkedAt};
