const fs=require('fs');
const path=require('path');
const {COCONUT_DESIGNS,ccnDefault,ccnSnippet,ccnFilename}=require('./coconut-editor.js');
const root=__dirname;
for(const d of COCONUT_DESIGNS)fs.writeFileSync(path.join(root,ccnFilename(d)),ccnSnippet(d,ccnDefault(d)));
const css=fs.readFileSync(path.join(root,'coconut-collection-v1.css'),'utf8');
const ui=fs.readFileSync(path.join(root,'coconut-preview.css'),'utf8');
const script=fs.readFileSync(path.join(root,'coconut-editor.js'),'utf8');
const html=`<!doctype html>
<html lang="en" color-mode="light">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Coconut · Fifteen JCink Templates</title>
<style id="collection-css">${css}</style>
<style>${ui}</style>
</head>
<body>
<header class="cover">
<div class="cover-line"><a href="https://github.com/lexdoescodingnow/templates/tree/main/coconut">Lex's template collection / Coconut</a><span>Threads · Comms · Buds</span></div>
<div class="cover-title"><h1>Coconut</h1><svg viewBox="0 0 100 75" aria-hidden="true"><path d="M8 65Q36 21 90 8M20 49Q6 35 19 19M30 36Q20 14 40 8M42 25Q42 7 61 4M57 18Q69 4 85 7M23 46Q43 52 53 39M35 33Q55 42 66 28M47 24Q69 31 79 18M64 16Q82 21 91 10"/></svg><p>Soft interiors. Protective shells.<br>Fifteen small places for your stories, shaped by coconut and coloured by you.</p></div>
<div class="cover-bottom"><span>05 threads · 05 electronic comms · 05 miniature buds</span><button type="button" id="overview-button" aria-expanded="false" aria-controls="overview">View all 15 designs</button></div>
</header>
<section class="overview" id="overview" hidden>
<div class="overview-heading"><h2>The whole collection</h2><label>Show<select id="gallery-filter"><option value="all">All 15 designs</option><option value="thread">Five threads</option><option value="comms">Five comms</option><option value="bud">Five buds</option></select></label></div><div class="gallery-grid" id="gallery-grid"></div>
</section>
<main class="workspace" id="editor-anchor">
<nav class="design-menu" aria-label="Coconut designs">
<p class="menu-title">Choose your design</p>
<section class="menu-group"><h2>Threads <small>01–05</small></h2><div id="menu-thread"></div></section>
<section class="menu-group"><h2>Comms <small>01–05</small></h2><div id="menu-comms"></div></section>
<section class="menu-group"><h2>Buds <small>01–05</small></h2><div id="menu-bud"></div></section>
<div class="menu-footer"><a href="https://github.com/lexdoescodingnow/templates/blob/main/coconut/README.md">Collection &amp; posting guide ↗</a></div>
</nav>
<section class="workbench">
<div class="controls">
<label>Design<select id="design-select"></select></label>
<label>Colour sample<select id="palette-select"><option value="tidal">Tidal</option><option value="orchid">Orchid</option><option value="grove">Grove</option></select></label>
<label>Mode<select id="mode-select"><option value="light">Light</option><option value="dark">Dark</option><option value="system">System</option></select></label>
<label>Preview width<select id="width-select"><option value="604px">Forum</option><option value="375px">375 px</option><option value="320px">320 px</option></select></label>
</div>
<div class="palette-controls"><label>1 <input id="colour-1" aria-label="Member colour 1" type="color" value="#47797c"></label><label>2 <input id="colour-2" aria-label="Member colour 2" type="color" value="#6f769b"></label><label>3 <input id="colour-3" aria-label="Member colour 3" type="color" value="#97677d"></label><span>Preview colours only. Posts inherit member colours.</span></div>
<div class="design-intro"><div><h2 id="selected-name"></h2><p id="design-description"></p></div><div class="pager"><button id="previous" type="button" aria-label="Previous design">←</button><button id="next" type="button" aria-label="Next design">→</button></div></div>
<div class="editor-grid">
<div class="preview-column"><div class="preview-heading"><span>Live forum preview</span><span id="media-note"></span></div><div class="forum-surface"><iframe id="preview-frame" title="Selected coconut template" sandbox="allow-same-origin" scrolling="no"></iframe></div><p class="preview-caption">Sample names and titles stand in for untouched placeholders here. Your copyable code retains [url], [name] and [text].</p></div>
<section class="fields-column" aria-label="Editable content"><h3>Make it yours</h3>
<label>Character / partner name<input id="edit-name" type="text"></label>
<label>Character / thread URL<input id="edit-url" type="text" inputmode="url"></label>
<label>Title / status text<input id="edit-text" type="text"></label>
<div id="comms-fields" hidden><label>Time<input id="edit-time" type="text"></label><label>Message direction<select id="edit-direction"><option value="received">Received</option><option value="sent">Sent</option><option value="mixed">Mixed</option></select></label></div>
<div class="image-heading"><h4>Character GIFs</h4><button id="add-image" type="button">+ Add GIF</button></div><div id="image-fields"></div><p class="field-note">Add or remove GIFs to suit the reply. Edits stay with each design while this page is open.</p>
<label>Writing / messages<textarea id="edit-body" rows="10" spellcheck="false"></textarea></label><p id="word-count"></p><p id="url-status" role="status"></p>
</section>
</div>
<section class="code-panel"><div class="code-heading"><div><h3>Ready for your post</h3><p>Copy the complete block, or download your edited snippet.</p></div><div class="code-actions"><button id="copy-button" class="primary" type="button">Copy code</button><button id="download-button" type="button">Download .txt</button></div></div><label class="code-label" for="copy-code">Complete JCink code</label><textarea id="copy-code" rows="13" readonly spellcheck="false"></textarea><p id="copy-status" role="status" aria-live="polite"></p><a id="original-snippet" href="https://github.com/lexdoescodingnow/templates/tree/main/coconut">Open original snippet on GitHub ↗</a></section>
</section>
</main>
<footer class="collection-footer"><span>Coconut / a collective of fifteen</span><span>Member colours throughout · Light &amp; dark · [dohtml] ready</span></footer>
<script>${script.replace(/<\/script/gi,'<\\/script')}</script>
</body>
</html>
`;
fs.writeFileSync(path.join(root,'coconut-collection-preview.html'),html);
console.log('Built 15 posting snippets and the standalone Coconut preview.');
