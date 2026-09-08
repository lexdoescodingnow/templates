# Jelly validation

## Completed

- Fifteen uniquely named posting files: five threads, five comms and five buds.
- Exact agreement between all posting files and the editor's shared model.
- Complete `[dohtml]` wrappers, one shared stylesheet link per snippet, balanced default HTML wrappers and paragraphs.
- `[url]`, `[name]`, `[text]`, times, GIFs and writing appear before decorative markup and the stylesheet link.
- No HTML comments, CSS comments, inline scripts, inline stylesheet blocks, hidden editing notes, or CSS imports in posting templates.
- All variant classes have matching stylesheet rules; CSS delimiters are balanced.
- Inherited member variables, forward bold/underline gradients, reverse italic gradients and explicit Blue Hour mode selectors are present.
- Normal paragraph selectors provide message bubbles; no per-message class is required.
- The generator handles zero, one, two and three images for every design. Removing all images omits the media container; narrow portrait-column layouts have corresponding reflow selectors.
- Bud defaults are under 100 words; plain-text names and titles are escaped.
- Editor JavaScript parses, referenced controls exist, and the standalone HTML includes the current styles and editor sources.
- Both exact supplied Tumblr GIF URLs returned HTTP 200 with the `image/gif` content type and valid `GIF89a` headers.

## Limits

The cloud browser blocked the local HTTP preview and its synchronized local file URL. No alternate browser or policy workaround was used. Visual rendering, responsive layouts, computed colours, runtime editor interactions, clipboard/download behaviour and live JCink posting remain unverified. Structural source checks are not a substitute for those checks.

The collection has no forum JavaScript dependency. GIF and stylesheet availability still depends on their external hosts and the forum's allowed HTML settings.
