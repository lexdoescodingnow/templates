# Tropical validation

Checked 9 September 2026.

## Passed

- Fifteen uniquely named snippets: five threads, five comms and five buds.
- Complete `[dohtml]` wrappers and one shared stylesheet link per snippet.
- `[url]`, `[name]` and `[text]` appear first; all editable content precedes decoration and styling.
- No comments, scripts, hidden tips or instruction blocks in posting snippets; no CSS comments.
- Both supplied GIF URLs return HTTP 200 and animated GIF data, with 32 and 42 frames respectively.
- Five image-free defaults, five single-image defaults and five paired-image defaults; supplied URLs retained exactly.
- Each bud’s default writing is 36 words.
- Collection CSS parses without syntax errors using `css-tree`.
- All fifteen initial editor exports match their individual `.txt` files exactly.
- Adding and removing GIFs updates both preview markup and exported code; removal omits the empty media block.
- `<p>` message separation, including successive opening paragraphs without closing tags.
- Editing names, links, titles and writing; HTML escaping; `[b]`, `[i]` and `[u]` conversion; writing sanitisation.
- Message direction, reset, per-design draft retention, gallery selection and previous/next navigation.
- Preview palette and mode controls stay out of exported posting code.
- Clipboard success and manual-copy fallback paths.
- Source inspection confirms forward bold/underline gradients, reverse italic gradients, member-coloured frames, scoped rules and explicit Blue Hour modes overriding the system fallback.
- Every posting snippet pins the shared stylesheet to the commit recorded in `stylesheet-revision.txt`.

## Limits

The cloud browser blocked local HTTP and file previews. No visual browser rendering, narrow-width screenshot assessment or live JCink post was completed. DOM/editor tests do not establish visual layout correctness. Responsive grid rules, image-removal selectors and mode precedence were checked in source; the standalone preview is included for visual review on the user’s browser.

Forum use requires modern CSS support and permission to include an external stylesheet inside `[dohtml]`. Raw posting snippets use HTML emphasis tags; the preview editor converts the requested BBCode tags before export.
