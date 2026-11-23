const escapeHtml = value => String(value).replace(/[&<>"']/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
})[character]);

const playerStyles = `
:root {
  color-scheme: light;
  --canvas: #f3eee9;
  --panel: #fffdf9;
  --stage: #eee9e3;
  --ink: #2c2529;
  --dim: #6e6267;
  --border: #d6cbc8;
  --accent: #77384f;
  --button: #ffffff;
}
html[color-mode="dark"] {
  color-scheme: dark;
  --canvas: #211f23;
  --panel: #2b272c;
  --stage: #1b191d;
  --ink: #f4eae7;
  --dim: #c8b7ba;
  --border: #51454d;
  --accent: #e9adc0;
  --button: #33232d;
}
body { margin: 0; background: var(--canvas); color: var(--ink); font: 15px/1.5 system-ui, sans-serif; }
.page-shell, .page-shell * { box-sizing: border-box; }
.mast { border-bottom: 1px solid var(--border); }
.mast-inner, .page-shell { max-width: 1180px; margin: auto; padding-inline: clamp(15px,4vw,52px); }
.mast-inner { display: flex; align-items: center; justify-content: space-between; gap: 12px; padding-block: 14px; font-size: 13px; }
.mast-inner strong { font-family: Georgia,serif; font-size: 17px; font-weight: normal; }
.page-shell { padding-bottom: 4rem; }
.intro { padding-block: clamp(20px,4vw,42px) 21px; }
.intro h1 { margin: 0; font: normal clamp(34px,5vw,62px)/1.05 Georgia,serif; letter-spacing: -.055em; color: var(--ink); }
.intro h1 em { font-weight: normal; color: var(--accent); }
.type-list { display: flex; gap: 8px; margin: 0 0 20px; flex-wrap: wrap; }
.page-shell :is(button, select, input, textarea) { font: inherit; }
.type-list button, .design-pick, .swatch-controls select, .action, .edit-form input, .edit-form select, .edit-form textarea, .source-code { border: 1px solid var(--border); background: var(--panel); color: var(--ink); }
.type-list button, .action { padding: 8px 15px; border-radius: 6px; cursor: pointer; }
.type-list button[aria-pressed="true"], .action.primary { background: var(--accent); color: var(--button); border-color: var(--accent); }
.page-shell :focus-visible { outline: 3px solid var(--accent); outline-offset: 3px; }
.workspace { display: grid; grid-template-columns: minmax(165px,200px) minmax(0,1fr); gap: clamp(12px,2.5vw,32px); align-items: start; }
.design-list { display: grid; gap: 4px; }
.design-pick { border-color: transparent; background: transparent; text-align: left; font-weight: 500; border-radius: 6px; padding: 11px 13px; cursor: pointer; overflow-wrap: anywhere; }
.design-pick:hover, .action:not(.primary):hover, .type-list button:not([aria-pressed="true"]):hover { border-color: var(--accent); }
.design-pick[aria-current="true"] { border-color: var(--border); background: var(--panel); color: var(--accent); box-shadow: inset 3px 0 var(--accent); }
.workpane { min-width: 0; background: var(--panel); border: 1px solid var(--border); border-radius: 11px; overflow: hidden; }
.work-head, .swatch-controls, .actions, .edit-area, .code-area { padding-inline: clamp(13px,2.5vw,26px); }
.work-head { padding-block: 18px 8px; }
.work-head h2 { margin: 0; font: normal clamp(24px,4vw,32px)/1.1 Georgia,serif; }
.swatch-controls { display: flex; flex-wrap: wrap; align-items: baseline; gap: 7px 13px; padding-block: 5px 14px; }
.swatch-controls label { color: var(--dim); font-size: 12px; }
.swatch-controls select { padding: 3px 5px; border-radius: 4px; font-size: 12px; }
.preview-bed { border-block: 1px solid var(--border); padding: clamp(10px, 2vw, 22px); background: var(--stage); }
#stage { margin-inline: auto; max-width: 100%; display: flow-root; }
.actions { display: flex; gap: 8px; flex-wrap: wrap; align-items: center; padding-block: 16px; }
.action { font-size: 13px; }
#answer { color: var(--dim); font-size: 13px; }
.edit-area, .code-area { border-top: 1px solid var(--border); }
.edit-area summary, .code-area summary { padding-block: 14px; font-weight: 600; cursor: pointer; }
.edit-form { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 12px; margin-bottom: 18px; }
.edit-form label { display: grid; gap: 5px; color: var(--dim); font-size: 13px; }
.edit-form input, .edit-form select, .edit-form textarea, .source-code { display: block; width: 100%; border-radius: 5px; padding: 8px; }
.edit-form .wide { grid-column: 1/-1; }
.edit-form .action { justify-self: start; }
.edit-form textarea, .source-code { resize: vertical; font: 13px/1.5 ui-monospace,monospace; }
.source-code { margin: 0 0 18px; white-space: pre; overflow: auto; }
.mast-inner a { color: var(--accent); }
.swatch-controls select, .action, .edit-form input, .edit-form textarea { max-width: 100%; }
@media(max-width:720px) {
  .workspace { grid-template-columns: minmax(0,1fr); }
  .design-list { display: flex; overflow-x: auto; gap: 5px; padding: 3px 3px 6px; }
  .design-pick { white-space: nowrap; padding: 7px 10px; font-size: 13px; }
  .design-pick[aria-current="true"] { box-shadow: inset 0 -2px var(--accent); }
}
@media(max-width:440px) {
  .mast-inner { font-size: 11px; }
  .type-list { margin-bottom: 10px; }
  .edit-form { grid-template-columns: minmax(0,1fr); }
  .preview-bed { padding: 5px; }
  .swatch-controls label { display: grid; }
  .actions .action { flex-grow: 1; }
}
`;

function startStudio() {
  const records = JSON.parse(document.getElementById('studio-data').textContent);
  const stage = document.getElementById('stage');
  const form = document.querySelector('.edit-form');
  const source = document.getElementById('source');
  const reply = document.getElementById('answer');
  const options = document.getElementById('design-list');
  const sourcePanel = document.querySelector('.code-area');
  const appearance = document.getElementById('appearance');
  const width = document.getElementById('preview-width');
  const palette = document.getElementById('palette');
  const mediaPreference = window.matchMedia('(prefers-color-scheme: dark)');
  const drafts = new Map();
  const initialValues = new Map();
  const selectedByType = new Map();
  let active;
  const htmlEscape = value => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const kindNames = {thread:'Threads',comms:'Comms',bud:'Buds'};
  const paletteValues = {
    shell: [['139,65,88', '102,93,119', '60,114,103'], ['230,153,173', '193,173,212', '148,205,185']],
    coast: [['46,97,134','91,91,146','42,116,123'], ['138,198,230','188,173,224','137,208,211']],
    fig: [['110,73,137','157,88,78','95,108,65'], ['199,164,228','227,168,150','176,198,150']]
  };

  function parts(record) {
    const template = document.createElement('template');
    template.innerHTML = record.code.replace(/^\s*\[dohtml\]\s*|\s*\[\/dohtml\]\s*$/gi, '');
    return {card: template.content.querySelector('.ly2'), link: template.content.querySelector('link[rel="stylesheet"]')};
  }
  function sampleName(record) {
    return record.sampleName || 'Jinho & Suho';
  }
  function writingField(copy) {
    return copy.innerHTML.trim();
  }
  function writeBody(value) {
    let formatted = value.trim();
    if (!/<p(?:\s|>)/i.test(formatted)) {
      const hasInlineHtml = /<(?:b|i|u|strong|em|a|br|span)(?:\s|\/?>)/i.test(formatted);
      if (!hasInlineHtml) formatted = htmlEscape(formatted);
      formatted = formatted.split(/\r?\n+/).filter(Boolean).map(line => '<p>' + line + '</p>').join('\n');
    }
    return formatted.replace(/\[(\/?)([biu])\]/gi, (_, slash, tag) => '<' + slash + tag.toLowerCase() + '>');
  }
  function harmlessPreview(root) {
    root.querySelectorAll('script,iframe,object,embed,style,link,form,base,meta').forEach(node => node.remove());
    for (const el of [root, ...root.querySelectorAll('*')]) {
      for (const attr of [...el.attributes]) {
        if (/^on/i.test(attr.name) || /^(href|src|xlink:href|formaction|srcdoc)$/i.test(attr.name) && /^\s*(?:javascript|vbscript):/i.test(attr.value)) el.removeAttribute(attr.name);
      }
    }
    root.querySelectorAll('a').forEach(anchor => anchor.removeAttribute('href'));
  }
  function defaults(record) {
    const {card} = parts(record);
    const images = [...card.querySelectorAll('.ly-media img')];
    const get = selector => card.querySelector(selector)?.textContent.trim() || '';
    return {
      name: get('.ly-name'), url: card.querySelector('.ly-name')?.getAttribute('href') || '[url]',
      title: get('.ly-title'), gif1: images[0]?.getAttribute('src') || '', gif2: images[1]?.getAttribute('src') || '',
      time: get('.ly-time'), receipt: get('.ly-receipt'), direction: card.dataset.direction || 'alternating',
      body: writingField(card.querySelector('.ly-copy'))
    };
  }
  function render(named) {
    const draft = drafts.get(active.slug);
    const {card, link} = parts(active);
    const name = card.querySelector('.ly-name');
    name.textContent = named && draft.name === '[name]' ? sampleName(active) : draft.name;
    name.setAttribute('href', draft.url || '[url]');
    const title = card.querySelector('.ly-title');
    title.textContent = named && draft.title === '[text]' ? active.title : draft.title;
    card.querySelector('.ly-copy').innerHTML = writeBody(draft.body);
    if (active.type === 'comms') {
      card.dataset.direction = draft.direction;
      if (card.querySelector('.ly-time')) card.querySelector('.ly-time').textContent = draft.time;
      if (card.querySelector('.ly-receipt')) card.querySelector('.ly-receipt').textContent = draft.receipt;
    }
    let media = card.querySelector('.ly-media');
    if (!media && (draft.gif1.trim() || draft.gif2.trim())) {
      media = document.createElement('div');
      media.className = 'ly-media';
      const writing = card.querySelector('.ly-copy');
      writing.before(media);
    }
    if (media) {
      const originals = [...media.querySelectorAll('.ly-shot')];
      const shots = [];
      [draft.gif1, draft.gif2].forEach((url,i) => {
        if (!url.trim()) return;
        const shot = originals[i] || originals[0]?.cloneNode(true) || document.createElement('figure');
        shot.classList.add('ly-shot');
        const image = shot.querySelector('img') || shot.appendChild(document.createElement('img'));
        image.setAttribute('src', url.trim());
        image.alt = 'Character portrait';
        shots.push(shot);
      });
      if (shots.length) media.replaceChildren(...shots);
      else media.remove();
    }
    return {card, link};
  }
  function posted(named) {
    const original = initialValues.get(active.slug);
    const draft = drafts.get(active.slug);
    if (!named && Object.keys(original).every(key => original[key] === draft[key])) return active.code.trim();
    const {card, link} = render(named);
    return '[dohtml]\n' + card.outerHTML + '\n' + link.outerHTML + '\n[/dohtml]';
  }
  function update() {
    const {card} = render(true);
    harmlessPreview(card);
    stage.replaceChildren(card);
    source.value = posted(false);
  }
  function colours() {
    const dark = appearance.value === 'system' ? mediaPreference.matches : appearance.value === 'dark';
    document.documentElement.setAttribute('color-mode', dark ? 'dark' : 'light');
    paletteValues[palette.value][Number(dark)].forEach((rgb, i) => stage.style.setProperty('--mgrgb'+(i+1), rgb));
    stage.style.width = width.value === 'auto' ? '100%' : width.value + 'px';
  }
  function makeField(key,label,value,choices) {
    const wrap = document.createElement('label');
    wrap.append(document.createTextNode(label));
    const input = document.createElement(key === 'body' ? 'textarea' : choices ? 'select' : 'input');
    input.name = key;
    if (choices) for (const [value,caption] of choices) input.add(new Option(caption,value));
    if (key === 'body') {
      input.rows = 6;
      wrap.className = 'wide';
    }
    input.value = value;
    wrap.append(input);
    form.append(wrap);
  }
  function selectDesign(record) {
    active = record;
    selectedByType.set(record.type,record);
    if (!initialValues.has(record.slug)) initialValues.set(record.slug,defaults(record));
    if (!drafts.has(record.slug)) drafts.set(record.slug,{ ...initialValues.get(record.slug) });
    const draft = drafts.get(record.slug);
    options.replaceChildren();
    records.filter(other => other.type === record.type).forEach(other => {
      const pick = document.createElement('button');
      pick.type = 'button';
      pick.className = 'design-pick';
      pick.textContent = other.name;
      pick.setAttribute('aria-current',String(other.slug === record.slug));
      pick.addEventListener('click', () => switchTo(other));
      options.append(pick);
    });
    document.querySelectorAll('[data-filter]').forEach(button => button.setAttribute('aria-pressed',String(button.dataset.filter === record.type)));
    document.getElementById('current-title').textContent = record.name;
    options.setAttribute('aria-label',kindNames[record.type]);
    form.replaceChildren();
    makeField('name','Character name',draft.name);
    makeField('url','Profile link',draft.url);
    makeField('title',record.type === 'comms' ? 'Conversation title' : 'Title',draft.title);
    const {card} = parts(record);
    makeField('gif1','First GIF URL',draft.gif1);
    makeField('gif2','Second GIF URL',draft.gif2);
    if (record.type === 'comms') {
      if (card.querySelector('.ly-time')) makeField('time','Time',draft.time);
      if (card.querySelector('.ly-receipt')) makeField('receipt','Receipt',draft.receipt);
      makeField('direction','Messages',draft.direction,[['alternating','Alternating'],['received','Received'],['sent','Sent']]);
    }
    makeField('body',record.type === 'comms' ? 'Message bubbles' : 'Writing',draft.body);
    const reset = document.createElement('button');
    reset.className = 'action'; reset.type = 'button'; reset.textContent = 'Reset this design';
    reset.addEventListener('click', () => { drafts.delete(active.slug); selectDesign(active); });
    form.append(reset);
    reply.textContent = '';
    update();
  }
  function switchTo(record) {
    selectDesign(record);
    try { history.replaceState(null,'','#'+record.slug); } catch { location.hash = record.slug; }
  }
  async function copy(named) {
    const value = posted(named);
    let copied = false;
    try {
      if (navigator.clipboard) { await navigator.clipboard.writeText(value); copied = true; }
    } catch {}
    if (!copied) {
      source.value = value; sourcePanel.open = true;
      source.focus(); source.select();
      try { copied = document.execCommand('copy'); } catch {}
    }
    reply.textContent = copied ? 'Copied.' : 'Code selected. Use Ctrl+C or Cmd+C.';
  }
  form.addEventListener('input', event => {
    if (!event.target.name) return;
    drafts.get(active.slug)[event.target.name] = event.target.value;
    reply.textContent = ''; update();
  });
  document.getElementById('copy-template').addEventListener('click', () => copy(false));
  document.getElementById('copy-named').addEventListener('click', () => copy(true));
  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
    const kind = button.dataset.filter;
    switchTo(selectedByType.get(kind) || records.find(record => record.type === kind));
  }));
  [appearance,width,palette].forEach(control => control.addEventListener('change',colours));
  mediaPreference.addEventListener('change',colours);
  function fromHash() { return records.find(record => '#'+record.slug === location.hash) || records[0]; }
  window.addEventListener('hashchange',() => selectDesign(fromHash()));
  colours(); selectDesign(fromHash());
}
function buildEditor({ designs, css, codes }) {
  const records = designs.map((design,index) => ({
    type: design.type,
    slug: design.slug,
    name: design.name,
    sampleName: design.sampleName || 'Jinho & Suho',
    title: design.title || design.sampleTitle || design.name,
    file: design.file,
    code: codes[index]
  }));
  const json = JSON.stringify(records).replace(/</g,'\\u003c');
  const fileBase = 'https://github.com/lexdoescodingnow/templates/blob/main/lychee/';
  const fallbackLinks = records.map(record => '<li><a href="'+fileBase+encodeURIComponent(record.file)+'">'+escapeHtml(record.name)+'</a></li>').join('');
  return `<!doctype html>
<html lang="en" color-mode="light">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Orchard Glass · Lychee templates for Jinho &amp; Suho</title>
<style>${playerStyles}\n${css}</style>
</head>
<body>
<header class="mast"><div class="mast-inner"><strong>Lychee / Jinho &amp; Suho</strong><a href="https://github.com/lexdoescodingnow/templates/blob/main/forum-posts/lychee-forum-masterpost.txt">Forum masterpost</a></div></header>
<main class="page-shell">
<div class="intro"><h1>Orchard <em>Glass</em></h1></div>
<noscript><p>Enable JavaScript to use the editor, or open a posting template on GitHub.</p><ul>${fallbackLinks}</ul></noscript>
<nav class="type-list" aria-label="Template types"><button type="button" data-filter="thread">Threads</button><button type="button" data-filter="comms">Comms</button><button type="button" data-filter="bud">Buds</button></nav>
<div class="workspace">
<nav class="design-list" id="design-list" aria-label="Designs"></nav>
<section class="workpane" aria-labelledby="current-title">
<header class="work-head"><h2 id="current-title"></h2></header>
<div class="swatch-controls">
<label>Mode <select id="appearance"><option value="system">System</option><option value="light">Light</option><option value="dark">Dark</option></select></label>
<label>Width <select id="preview-width"><option value="auto">Forum</option><option value="390">390 px</option><option value="320">320 px</option><option value="260">260 px</option></select></label>
<label>Member colours <select id="palette"><option value="shell">Rose &amp; jade</option><option value="coast">Blue &amp; lilac</option><option value="fig">Fig &amp; olive</option></select></label>
</div>
<div class="preview-bed"><div id="stage"></div></div>
<div class="actions"><button class="action primary" type="button" id="copy-template">Copy template</button><button class="action" type="button" id="copy-named">Copy with sample names</button><span id="answer" role="status"></span></div>
<details class="edit-area"><summary>Edit this design</summary><form class="edit-form" onsubmit="return false"></form></details>
<details class="code-area"><summary>Posting code</summary><textarea class="source-code" id="source" aria-label="JCink posting code" rows="9" readonly spellcheck="false"></textarea></details>
</section>
</div>
</main>
<script type="application/json" id="studio-data">${json}</script>
<script>(${startStudio.toString()})();</script>
</body>
</html>`;
}
module.exports = { buildEditor };
