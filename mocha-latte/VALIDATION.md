# Validation · Mocha & Latte

Validated on 9 September 2026.

## Passed

- Fifteen distinct names and files: five threads, five comms and five buds.
- All fifteen exported defaults match their preview editor output exactly.
- Complete `[dohtml]` wrappers, editable placeholders first and one shared stylesheet link per snippet.
- No comments, hidden instructions, scripts or iframes in posting snippets; no comments in template CSS.
- 167 parsed CSS rules, all scoped to `.bh-mocha-latte`; explicit forum light/dark selectors and a system fallback.
- Member-colour styling and forward/reverse emphasis declarations; sample `<b>`, `<i>` and `<u>` present in every design.
- Default, zero-image and three-image markup states across every design; all supplied URLs retained.
- Every comms template uses ordinary paragraphs. Successive opening `<p>` tags parse as separate messages.
- Bud defaults contain 36 words each.
- Editor BBCode conversion, escaped names and URLs, HTML filtering, edit persistence, reset, gallery navigation and copy/download handlers.
- Preview mode, palette and width controls update the appropriate state without changing exported member colours.
- The immutable jsDelivr stylesheet URL returns HTTP 200 with `text/css` and exactly matches the local stylesheet bytes.
- All three supplied Tumblr URLs return HTTP 200 with `image/gif`.

## Scope

CSS syntax and DOM/editor checks ran locally with `css-tree` and `jsdom`. Network checks verified the real pinned stylesheet and GIF endpoints. Copy/download handlers were exercised using simulated browser APIs.

The preview browser blocked local HTML navigation. No rendered screenshot, measured browser layout, animated playback or live forum posting check is claimed. The standalone preview provides the complete collection for visual inspection. Grid, container units, `:has()`, `color-mix()` and CSS masks require a modern browser. A forum must allow `[dohtml]` and external stylesheets for direct posting.
