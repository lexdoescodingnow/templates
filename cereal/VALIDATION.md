# Cereal · First Pour validation

Published on 27 September 2026 for Hoseong & Sam.

- Fifteen distinct names verified against the full 875-design catalogue: five threads, five comms and five buds.
- Every posting snippet has one complete `[dohtml]` wrapper and one direct, import-free stylesheet link. Editable content precedes decoration and the loader. No HTML/CSS comments, scripts, hidden tips or member-colour overrides occur in the snippets.
- The forum masterpost has fifteen rendered examples, each immediately followed by its complete copyable code. User-requested lorem ipsum and GIF placeholders are retained in both. It fits in a single numbered post part below the repository's 45,000-character limit.
- All fifteen supplied-placeholder image instances loaded successfully in the public browser preview.
- All fifteen template frames passed horizontal-boundary checks at full, 390px, 320px and 260px widths in light and dark modes. These checks vary template width, not the browser's viewport.
- Visual review covered the five threads, five device comms and five compact buds. Breakfast Club's heading was reduced and its narrow portrait layout stacked after review, then the exact published version was checked.
- The editor exported working full `[dohtml]` code and optional `[url]`, `[name]`, `[text]` fields. Copying was verified through the browser clipboard. Preview palette values were absent from exports.
- A three-message test using successive opening `<p>` tags and `[b]`, `[i]`, `[u]` rendered three separate bubbles and exported HTML emphasis. Alternating message direction, GIF removal with layout collapse, and reset were verified.
- The live jsDelivr CSS endpoint returned HTTP 200, `text/css`, and byte-for-byte final stylesheet content. Published GitHub CSS and forum masterpost blob IDs match the uploaded versions.

The templates were checked in Chrome, not posted into an authenticated live JCink board. They use modern CSS container queries, `:has()` and `color-mix()`. Literal BBCode inside `[dohtml]` is handled by the preview editor's conversion; direct forum snippets use HTML emphasis.
