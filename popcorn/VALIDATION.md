# Popcorn verification

## Passed locally

- Exactly 15 unique names and filenames: 5 threads, 5 comms, 5 buds.
- Every snippet has one complete `[dohtml]` block and one stylesheet link.
- `[url]`, `[name]` and `[text]` occupy the first two content elements; editable GIFs, comms time and writing precede decorative markup and the stylesheet.
- No HTML comments, scripts, CSS comments or hidden editing instructions in posting snippets or template CSS.
- Each snippet has the expected default GIF count and HTML bold, italic and underline samples. Each bud sample is at most 100 words.
- Standard and successive unclosed `<p>` message markup parse into separate paragraphs.
- CSS parses without syntax errors. Member variables, forward/reverse gradient definitions and explicit forum modes are present; template rules are scoped.
- The preview editor exports exactly the same default snippets as the named `.txt` files for all fifteen designs.
- GIF addition/removal, name/title escaping, supported BBCode conversion, message direction, reset, per-design draft retention, palette isolation, mode selection and gallery navigation pass.
- Clipboard success and manual-selection fallback pass in the DOM test harness.

- Both placeholder assets returned HTTP 200 and animated GIF data (70 and 53 frames).

## Limits

These automated checks use a DOM harness, not a browser layout engine. The cloud browser blocked both the local HTTP preview URL and the shared-file URL; no alternate browser route was used. Consequently rendered layouts, pixel-level light/dark appearance and real-browser clipboard/download behaviour have not been visually verified in this session. CSS layout rules were reviewed for narrow widths, neutral reading surfaces and media-column collapse, but that review does not replace a browser render.

No live JCink post was made. The forum must permit the supplied stylesheet link within `[dohtml]`. Runtime asset loading also depends on access to jsDelivr and the placeholder GIF host.
