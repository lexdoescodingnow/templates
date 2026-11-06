'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const source = fs.readFileSync(path.join(__dirname, 'topic-dates.js'), 'utf8');
const runtimeSource = fs.readFileSync(path.join(__dirname, 'runtime.js'), 'utf8');
const Dates = require('./topic-dates.js');
const origin = 'https://bluehour.jcink.net';
const topic = id => origin + '/index.php?showtopic=' + id + '&st=0';
const stamp = (text, id = 1910600) => '<a href="#" onclick="link_to_post(' + id + '); return false;" class="sort"><span class="bi bi-broadcast"></span> ' + text + '</a>';
const settle = () => new Promise(resolve => setImmediate(resolve));

function deferred() {
  let resolve, reject;
  const promise = new Promise((yes, no) => { resolve = yes; reject = no; });
  return { promise, resolve, reject };
}

function dom() {
  let document;
  class Element {
    constructor(tag, fragment = false) { this.tagName = tag.toUpperCase(); this.nodeType = fragment ? 11 : 1; this.attributes = {}; this.children = []; this.parentNode = null; this.fragment = fragment; this.value = ''; const styles = {}; this.style = { getPropertyValue: name => styles[name] || '', setProperty: (name, value) => { styles[name] = value; } }; }
    get className() { return this.attributes.class || ''; }
    set className(value) { this.attributes.class = value; }
    get classList() { return { contains: name => this.className.split(/\s+/).includes(name) }; }
    get firstChild() { return this.children[0] || null; }
    get nextSibling() { return this.parentNode ? this.parentNode.children[this.parentNode.children.indexOf(this) + 1] || null : null; }
    get isConnected() { return document.documentElement.contains(this); }
    get textContent() { return this.value + this.children.map(child => child.textContent).join(''); }
    set textContent(value) { this.children.slice().forEach(child => this.removeChild(child)); this.value = String(value); }
    setAttribute(name, value) { this.attributes[name] = String(value); }
    getAttribute(name) { return Object.hasOwn(this.attributes, name) ? this.attributes[name] : null; }
    contains(target) { return target === this || this.children.some(child => child.contains(target)); }
    matches(selector) {
      const match = selector.match(/^\.([\w-]+)(?:\[([\w-]+)\])?$/);
      return !!match && this.classList.contains(match[1]) && (!match[2] || this.getAttribute(match[2]) !== null);
    }
    querySelectorAll(selector) {
      const found = [];
      this.children.forEach(child => { if (child.matches(selector)) found.push(child); found.push(...child.querySelectorAll(selector)); });
      return found;
    }
    querySelector(selector) { return this.querySelectorAll(selector)[0] || null; }
    closest(selector) { return this.matches(selector) ? this : this.parentNode ? this.parentNode.closest(selector) : null; }
    appendChild(child) { return this.insertBefore(child, null); }
    insertBefore(child, before) {
      if (child.fragment) { child.children.slice().forEach(item => this.insertBefore(item, before)); return child; }
      if (child.parentNode) child.parentNode.removeChild(child);
      const index = before ? this.children.indexOf(before) : this.children.length;
      assert(index >= 0, 'The insertion anchor must belong to its parent');
      this.children.splice(index, 0, child); child.parentNode = this; return child;
    }
    removeChild(child) { const index = this.children.indexOf(child); assert(index >= 0); this.children.splice(index, 1); child.parentNode = null; return child; }
  }
  const events = new Map();
  document = { createElement: tag => new Element(tag), createDocumentFragment: () => new Element('fragment', true),
    querySelectorAll: selector => document.documentElement.querySelectorAll(selector),
    addEventListener: (name, callback) => { if (!events.has(name)) events.set(name, []); events.get(name).push(callback); }, events };
  document.documentElement = new Element('html');
  function article() {
    const root = new Element('article'), panel = new Element('section'), header = new Element('header');
    root.className = 'bh-dossier-v5'; panel.className = 'bd1-story-panel'; header.textContent = 'The story so far';
    document.documentElement.appendChild(root); root.appendChild(panel); panel.appendChild(header);
    function entry(id, values = {}) {
      let group = panel.children.find(child => child.className === 'bd1-year-group');
      if (!group) { group = new Element('div'); group.className = 'bd1-year-group'; const heading = new Element('h3'); heading.className = 'bd1-year'; heading.textContent = 'Date Unavailable'; group.appendChild(heading); const list = new Element('ol'); list.className = 'bd1-timeline'; group.appendChild(list); panel.appendChild(group); }
      const item = new Element('li'), meta = new Element('div'), type = new Element('span'), heading = new Element('h4'), link = new Element('a');
      item.className = 'bd1-entry'; item.setAttribute('id', id); meta.className = 'bd1-entry-meta'; type.className = 'bd1-type'; type.textContent = 'Thread';
      if (!values.legacy) {
        item.setAttribute('data-topic-url', values.url || topic(id));
        item.setAttribute('data-story-date', values.date || '');
        item.setAttribute('data-posted-date', values.postedDate || '');
        item.setAttribute('data-date-label', values.dateLabel || '');
      }
      meta.appendChild(type);
      if (values.dateLabel) { const label = new Element('span'); label.className = 'bd1-entry-date'; label.textContent = values.dateLabel; meta.appendChild(label); }
      link.setAttribute('href', values.url || topic(id)); link.textContent = 'Entry ' + id; link.click = () => id; heading.appendChild(link);
      item.appendChild(meta); item.appendChild(heading); group.querySelector('.bd1-timeline').appendChild(item);
      return item;
    }
    return { root, panel, entry, header };
  }
  return { document, article };
}

function harness(options = {}) {
  const browser = dom(), calls = [], timers = new Map(), observers = []; let sequence = 0;
  const fixture = options.beforeLoad ? options.beforeLoad(browser) : null;
  const context = vm.createContext({
    document: browser.document, URL, AbortController,
    addEventListener: () => {},
    location: { origin: options.origin === undefined ? origin : options.origin },
    fetch: (url, configuration) => { const pending = deferred(); calls.push({ url, configuration, ...pending }); return pending.promise; },
    MutationObserver: class { constructor(callback) { this.callback = callback; observers.push(this); } observe(target, configuration) { this.target = target; this.configuration = configuration; } },
    setTimeout: (callback, delay) => { const id = ++sequence; timers.set(id, { callback, delay }); return id; },
    clearTimeout: id => timers.delete(id)
  });
  new vm.Script(source, { filename: 'topic-dates.js' }).runInContext(context);
  const api = context.BlueHourTopicDates;
  async function respond(index, html, extras = {}) { const call = calls[index]; call.resolve({ ok: true, redirected: false, url: call.url, text: () => Promise.resolve(html), ...extras }); await settle(); }
  async function flushScans() { for (const [id, timer] of Array.from(timers)) if (timer.delay === 0) { timers.delete(id); timer.callback(); } await settle(); }
  return { ...browser, api, context, calls, timers, respond, observers, fixture, flushScans };
}

(async () => {
  let passed = 0;
  async function test(name, run) { await run(); passed += 1; console.log('PASS: ' + name); }

  await test('Only exact Blue Hour topic URLs become first-page requests', () => {
    assert.equal(Dates.canonicalTopicUrl(origin + '/index.php?showtopic=00123&st=40&view=getlastpost#entry9'), topic(123));
    for (const url of [
      'http://bluehour.jcink.net/index.php?showtopic=123',
      'https://bluehour.jcink.net:443/index.php?showtopic=123',
      'https://user@bluehour.jcink.net/index.php?showtopic=123',
      'https://bluehour.jcink.net.evil.test/index.php?showtopic=123',
      'https://bluehour.jcink.net/other.php?showtopic=123',
      'https://bluehour.jcink.net/index.php/extra?showtopic=123',
      '/index.php?showtopic=123', 'javascript:alert(1)',
      origin + '/index.php?showtopic=1&showtopic=2', origin + '/index.php?showtopic=0',
      origin + '/index.php?showtopic=-1', origin + '/index.php?showtopic=1.5',
      origin + '/index.php?showtopic=1e3', origin + '/index.php?showtopic=%0A123',
      origin + '/index.php?showforum=123', origin + '/index.php?showtopic=12\n3'
    ]) assert.equal(Dates.canonicalTopicUrl(url), '', url);
  });

  await test('The first real post timestamp supplies the date, never a later reply or unrelated date', () => {
    assert.equal(Dates.parseTopicDate('<h1>Nov 6 2026</h1>' + stamp('Jul 16 2024, 02:52 PM') + stamp('Nov 6 2026, 04:12 PM', 2)), '2024-07-16');
    assert.equal(Dates.parseTopicDate(stamp('Feb 29 2024, 12:00 AM')), '2024-02-29');
    assert.equal(Dates.parseTopicDate('<!--' + stamp('Jan 1 1999, 01:00 AM') + '--><script>' + JSON.stringify(stamp('Jan 1 1998, 01:00 AM')) + '</script>' + stamp('Jul 16 2024, 02:52 PM')), '2024-07-16');
    for (const first of ['Feb 29 2025, 01:00 PM', 'Apr 31 2024, 01:00 PM', 'Jul 16 2024, 00:52 PM', 'Jul 16 2024, 02:60 PM', 'Jul 16 2024, 14:52 PM', 'last week', '2024-07-16', 'Jul 16 2024']) {
      assert.equal(Dates.parseTopicDate(stamp(first) + stamp('Nov 6 2026, 04:12 PM', 2)), '', first);
    }
    assert.equal(Dates.parseTopicDate('<a class="sort" href="?view=getlastpost">Jul 16 2024, 02:52 PM</a>'), '');
    assert.equal(Dates.parseTopicDate('<a onclick="evil(); link_to_post(1); return false;" class="sort">Jul 16 2024, 02:52 PM</a>'), '');
    assert.equal(Dates.parseTopicDate(stamp('Jul 16 2024, 02:52 PM').replace('class="sort"', 'class="changed"') + stamp('Nov 6 2026, 04:12 PM', 2)), '');
    assert.equal(Dates.parseTopicDate('<title>Jul 16 2024, 02:52 PM</title><h1>Please log in</h1>'), '');
  });

  await test('Today and Yesterday use the supplied local calendar day across year and leap boundaries', () => {
    const january = new Date(2026, 0, 1, 0, 15);
    assert.equal(Dates.parseTopicDate(stamp('Today, 12:05 AM'), january), '2026-01-01');
    assert.equal(Dates.parseTopicDate(stamp('Yesterday, 11:52 PM'), january), '2025-12-31');
    assert.equal(Dates.parseTopicDate(stamp('Today at 12:05 AM'), january), '2026-01-01');
    assert.equal(Dates.parseTopicDate(stamp('Yesterday at 11:52 PM'), january), '2025-12-31');
    assert.equal(Dates.parseTopicDate(stamp('Yesterday, 11:52 PM'), new Date(2024, 2, 1, 12)), '2024-02-29');
    assert.equal(Dates.parseTopicDate(stamp('Today, 12:05 AM'), 'invalid'), '');
    assert.equal(Dates.parseTopicDate(stamp('Today on 12:05 AM') + stamp('Jul 16 2024, 02:52 PM', 2), january), '');
  });

  await test('Other origins and legacy posts make no request and expose no forum data', async () => {
    for (const currentOrigin of ['https://lexdoescodingnow.github.io', 'null', 'http://bluehour.jcink.net', 'https://bluehour.jcink.net.evil.test']) {
      const h = harness({ origin: currentOrigin }), a = h.article(); a.entry(1); h.api.initialize(a.root); await settle(); assert.equal(h.calls.length, 0);
      assert.equal(h.observers.length, 0); assert.equal(h.document.events.size, 0);
    }
    const h = harness(), a = h.article(); a.entry(1, { legacy: true }); h.api.initialize(a.root); await settle(); assert.equal(h.calls.length, 0);
  });

  await test('Requests deduplicate across dossiers, stay at concurrency two and use authenticated same-origin fetch', async () => {
    const h = harness(), a = h.article(), b = h.article();
    const first = a.entry(1), second = a.entry(2), third = a.entry(3), duplicate = b.entry(1, { url: origin + '/index.php?showtopic=1&st=80' });
    h.api.initialize(a.root); h.api.initialize(b.root); h.api.initialize(a.root); await settle();
    assert.deepEqual(h.calls.map(call => call.url), [topic(1), topic(2)]);
    for (const call of h.calls) { assert.equal(call.configuration.credentials, 'same-origin'); assert.equal(call.configuration.redirect, 'error'); assert(call.configuration.signal instanceof AbortSignal); }
    await h.respond(0, stamp('Jul 16 2024, 02:52 PM'));
    assert.deepEqual(h.calls.map(call => call.url), [topic(1), topic(2), topic(3)]);
    assert.equal(first.getAttribute('data-posted-date'), '2024-07-16'); assert.equal(duplicate.getAttribute('data-posted-date'), '2024-07-16');
    await h.respond(1, stamp('Oct 2 2026, 01:00 PM')); await h.respond(2, stamp('Sep 1 2025, 01:00 PM'));
    assert.equal(second.getAttribute('data-posted-date'), '2026-10-02'); assert.equal(third.getAttribute('data-posted-date'), '2025-09-01');
    h.api.initialize(a.root); h.api.initialize(b.root); await settle(); assert.equal(h.calls.length, 3); assert.equal(h.timers.size, 0);
  });

  await test('Failures and timeout retain Date Unavailable without retries or parsing a later post', async () => {
    const h = harness(), a = h.article(); const first = a.entry(1), second = a.entry(2), third = a.entry(3), fourth = a.entry(4);
    h.api.initialize(a.root); await settle(); await h.respond(0, stamp('not a timestamp') + stamp('Nov 6 2026, 01:00 PM'));
    await h.respond(1, stamp('Oct 2 2026, 01:00 PM'), { redirected: true });
    h.calls[2].reject(new Error('offline')); await settle();
    assert.equal(h.calls.length, 4);
    const timeout = Array.from(h.timers.values())[0]; assert.equal(timeout.delay, 10000); timeout.callback(); await settle();
    assert.equal(h.calls[3].configuration.signal.aborted, true);
    await h.respond(3, stamp('Oct 2 2026, 01:00 PM'));
    for (const entry of [first, second, third, fourth]) { assert.equal(entry.getAttribute('data-posted-date'), ''); assert.equal(entry.querySelector('.bd1-entry-date'), null); }
    for (let count = 0; count < 5; count++) h.api.initialize(a.root);
    await settle(); assert.equal(h.calls.length, 4); assert.equal(h.timers.size, 0); assert.equal(a.root.querySelector('.bd1-year').textContent, 'Date Unavailable');
  });

  await test('Late results cannot overwrite an explicit date, changed URL or disconnected entry', async () => {
    const h = harness(), a = h.article(); const manualStory = a.entry(1), manualPosted = a.entry(2), changed = a.entry(3), removed = a.entry(4);
    h.api.initialize(a.root); await settle(); manualStory.setAttribute('data-story-date', '2020-01'); manualPosted.setAttribute('data-posted-date', '2021-02-03');
    await h.respond(0, stamp('Oct 2 2026, 01:00 PM')); await h.respond(1, stamp('Oct 2 2026, 01:00 PM'));
    changed.setAttribute('data-topic-url', topic(5)); const list = removed.parentNode; list.removeChild(removed);
    await h.respond(2, stamp('Oct 2 2026, 01:00 PM')); await h.respond(3, stamp('Oct 2 2026, 01:00 PM'));
    assert.equal(manualStory.getAttribute('data-posted-date'), ''); assert.equal(manualPosted.getAttribute('data-posted-date'), '2021-02-03');
    assert.equal(changed.getAttribute('data-posted-date'), ''); assert.equal(removed.getAttribute('data-posted-date'), '');
    list.appendChild(removed); h.api.initialize(a.root); await settle();
    assert.equal(removed.getAttribute('data-posted-date'), '2026-10-02'); assert.equal(h.calls[4].url, topic(5));
    await h.respond(4, stamp('Feb 3 2023, 01:00 PM')); assert.equal(changed.getAttribute('data-posted-date'), '2023-02-03');
  });

  await test('Successful fills retain nodes, links, custom labels and stable order while regrouping by effective partial dates', async () => {
    const h = harness(), a = h.article();
    const first = a.entry(1), second = a.entry(2, { dateLabel: 'Before the debut' }), story = a.entry(3, { date: '2020', postedDate: '2026-11' }), month = a.entry(4, { postedDate: '2024-07' }), unknown = a.entry(5, { url: 'https://example.com/story' });
    const firstLink = first.children[1].children[0];
    h.api.initialize(a.root); await settle();
    await h.respond(1, stamp('Jul 16 2024, 02:52 PM'));
    await h.respond(0, stamp('Jul 16 2024, 02:52 PM'));
    assert.deepEqual(a.root.querySelectorAll('.bd1-entry'), [story, month, first, second, unknown]);
    assert.deepEqual(a.root.querySelectorAll('.bd1-year').map(node => node.textContent), ['2020', '2024', 'Date Unavailable']);
    assert.equal(first.children[1].children[0], firstLink); assert.equal(firstLink.click(), 1); assert.equal(first.getAttribute('id'), '1');
    assert.equal(first.querySelector('.bd1-entry-date').textContent, 'Jul ’24');
    assert.equal(first.querySelector('.bd1-entry-date').getAttribute('title'), 'Topic started 16 July 2024');
    assert.equal(first.getAttribute('data-posted-date-source'), topic(1));
    assert.equal(second.querySelector('.bd1-entry-date').textContent, 'Before the debut');
    assert.equal(second.querySelectorAll('.bd1-entry-date').length, 1); assert.equal(a.panel.children[0], a.header);
    assert.equal(h.calls.length, 2);
    new vm.Script(source).runInContext(h.context); assert.equal(h.context.BlueHourTopicDates, h.api);
  });

  await test('The helper starts alone, scans existing and added dossiers, and observes changed links only once', async () => {
    const h = harness({ beforeLoad: browser => { const a = browser.article(); return { ...a, first: a.entry(1) }; } });
    await settle(); assert.equal(h.calls.length, 1); assert.equal(h.observers.length, 1);
    assert.equal(h.document.events.get('DOMContentLoaded').length, 1);
    h.api.start(); new vm.Script(source).runInContext(h.context); await settle();
    assert.equal(h.context.BlueHourTopicDates, h.api); assert.equal(h.observers.length, 1); assert.equal(h.calls.length, 1);
    await h.respond(0, stamp('Jul 16 2024, 02:52 PM'));
    const later = h.article(), second = later.entry(2);
    h.observers[0].callback([{ type: 'childList', target: h.document.documentElement, addedNodes: [later.root] }]);
    await h.flushScans(); assert.equal(h.calls[1].url, topic(2));
    second.setAttribute('data-topic-url', topic(3));
    h.observers[0].callback([{ type: 'attributes', target: second, attributeName: 'data-topic-url' }]);
    await h.flushScans(); assert.equal(h.calls[2].url, topic(3));
    await h.respond(1, stamp('Oct 2 2026, 01:00 PM')); assert.equal(second.getAttribute('data-posted-date'), '');
    await h.respond(2, stamp('Sep 1 2025, 01:00 PM')); assert.equal(second.getAttribute('data-posted-date'), '2025-09-01');
    const third = later.entry(4);
    h.document.events.get('DOMContentLoaded')[0](); await h.flushScans(); assert.equal(h.calls[3].url, topic(4));
    await h.respond(3, stamp('May 1 2022, 01:00 PM')); assert.equal(third.getAttribute('data-posted-date'), '2022-05-01');
    const irrelevant = h.document.createElement('div'); h.document.documentElement.appendChild(irrelevant);
    h.observers[0].callback([{ type: 'childList', target: h.document.documentElement, addedNodes: [irrelevant] }]);
    assert.equal(h.timers.size, 0);
  });

  await test('An existing revision2 map runtime is reused while the independent helper fills dates', async () => {
    const h = harness({ beforeLoad: browser => {
      const a = browser.article(), first = a.entry(1), map = browser.document.createElement('div'), frame = browser.document.createElement('iframe');
      map.className = 'bd3-map'; map.appendChild(frame); a.root.appendChild(map); return { ...a, first, map, frame };
    } });
    let starts = 0;
    const oldRuntime = { version: 5, revision: 2, start() { starts += 1; } };
    h.context.BlueHourDossierRuntime = oldRuntime;
    new vm.Script(runtimeSource, { filename: 'runtime.js' }).runInContext(h.context);
    await settle();
    assert.equal(h.context.BlueHourDossierRuntime, oldRuntime); assert.equal(starts, 1); assert.equal(h.observers.length, 1, 'Only the independent date observer should be added');
    assert.equal(h.fixture.map.children.length, 1); assert.equal(h.fixture.map.children[0], h.fixture.frame);
    assert.equal(h.calls.length, 1); await h.respond(0, stamp('Jul 16 2024, 02:52 PM'));
    assert.equal(h.fixture.first.getAttribute('data-posted-date'), '2024-07-16');
    assert.equal(h.fixture.first.querySelector('.bd1-entry-date').textContent, 'Jul ’24');
    assert.equal(h.fixture.map.children.length, 1); assert.equal(h.fixture.map.children[0], h.fixture.frame);
  });

  await test('Loading the new runtime before the legacy equality2 guard also retains one runtime and map', async () => {
    const h = harness({ beforeLoad: browser => {
      const a = browser.article(), first = a.entry(1), map = browser.document.createElement('div'), frame = browser.document.createElement('iframe');
      map.className = 'bd3-map'; map.appendChild(frame); a.root.appendChild(map); return { ...a, first, map, frame };
    } });
    new vm.Script(runtimeSource, { filename: 'runtime.js' }).runInContext(h.context);
    const current = h.context.BlueHourDossierRuntime;
    assert.equal(current.version, 5); assert.equal(current.revision, 2);
    assert.equal(h.observers.length, 2, 'There should be one date observer and one map/colour observer');
    h.context.legacyReplacements = 0;
    const legacyBootstrap = '(function(root) { var existing = root.BlueHourDossierRuntime; if (existing && existing.version === 5 && existing.revision === 2) { existing.start(); return; } root.legacyReplacements += 1; root.BlueHourDossierRuntime = { version: 5, revision: 2 }; }(globalThis));';
    new vm.Script(legacyBootstrap, { filename: 'legacy-runtime-singleton-guard.js' }).runInContext(h.context);
    assert.equal(h.context.BlueHourDossierRuntime, current); assert.equal(h.context.legacyReplacements, 0);
    assert.equal(h.observers.length, 2); assert.equal(h.fixture.map.children.length, 1); assert.equal(h.fixture.map.children[0], h.fixture.frame);
    await settle(); assert.equal(h.calls.length, 1); await h.respond(0, stamp('Jul 16 2024, 02:52 PM'));
    assert.equal(h.fixture.first.getAttribute('data-posted-date'), '2024-07-16');
    assert.equal(h.context.BlueHourDossierRuntime, current); assert.equal(h.observers.length, 2); assert.equal(h.fixture.map.children.length, 1);
  });

  console.log('\n' + passed + ' topic-date checks passed. Live forum fetch and layout remain a browser check.');
})().catch(error => { console.error(error); process.exitCode = 1; });
