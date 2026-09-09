# Portuguese cuisine validation

Completed on 9 September 2026.

- 15 snippets: exactly five threads, five comms and five buds, with fifteen distinct names and filenames.
- 438 structural and editor assertions passed using jsdom and css-tree.
- CSS parsed without syntax errors; all template selectors are scoped to `.bh-portuguese`.
- Every `.txt` matches its content model and the default editor export, contains one stylesheet link, and places editable fields before decoration and styles.
- No scripts, HTML comments or CSS comments in posting snippets or the shared stylesheet.
- Both exact supplied GIF URLs returned HTTP 200 with `image/gif` content.
- Bud samples remain below 100 words. Comms accept successive opening `<p>` tags as separate bubbles.
- All designs support zero and four images in the content model. Removing every image removes its container from editor output.
- Editor selection, field escaping, BBCode emphasis conversion, executable-input removal, long writing, per-design state, GIF add/remove, reset, gallery selection, palette changes, mode and width controls passed.
- Clipboard output matches the current snippet; denied clipboard access opens and selects the complete code.
- Explicit forum modes override the system fallback in the stylesheet; bold/underline and italic gradient orders were checked.

These are parser, DOM and editor checks. jsdom does not render page layout. The cloud browser blocked local HTTP and file preview URLs, and the repository's existing preview was not available through GitHub Pages. No screenshot, measured responsive layout, visual contrast test or live JCink check is claimed.
