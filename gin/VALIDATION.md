# Gin validation

## Completed checks

- Fifteen unique design names and filenames: five threads, five comms and five buds.
- All fifteen checked-in posting snippets match the editor's shared generator, including the pinned stylesheet URL.
- Each snippet has complete `[dohtml]` tags, editable `[url]`, `[name]` and `[text]` at the top, one stylesheet link at the end, and no comments, hidden tips or editing instructions.
- Default image counts match the catalogue and preview. Sixty generated states cover zero, one, two and three GIFs for all fifteen designs; zero-image output omits the image container.
- Both supplied Tumblr URLs responded HTTP 200 with `image/gif`. Original URLs and `.gifv` extensions are preserved.
- All fifteen designs were exercised in JSDOM: selection, default output equality, edited names and titles, escaped field values, per-design state, GIF addition and removal, empty GIF URLs, vertical crop, BBCode conversion, successive opening paragraphs, message directions, time, reset and markup sanitization.
- Fifteen copy actions matched generated code through a clipboard test adapter. Fifteen download actions used the correct filenames through a download test adapter. Operating-system clipboard and downloads were not exercised.
- Theme, preview width and member-colour controls passed. Sample colours are not embedded in posting snippets. Bud defaults contain 36 words each.
- CSS parsing accepted 198 rules and 884 declarations; non-variable declaration grammar passed. All selectors are scoped to the collection. Forward and reversed emphasis gradients, explicit Blue Hour themes, system fallback, container queries and empty-image rules were checked in source.
- JavaScript syntax and Git whitespace checks passed.

- The immutable jsDelivr stylesheet returned HTTP 200 with `text/css`; all 29,814 bytes match the published local CSS.

## Limits

The cloud browser blocked the local preview URL with `ERR_BLOCKED_BY_CLIENT`. No bypass was attempted. Visual layout, actual GIF playback, narrow-width rendering and integration on the live JCink forum remain unverified. DOM and CSS checks do not replace these visual checks.
