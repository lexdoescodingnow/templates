# Wine validation

## Completed checks

- Catalogue contains fifteen unique names and filenames: five threads, five comms and five buds.
- All fifteen checked-in snippets match the shared generator. Each contains a complete `[dohtml]` block, editable `[url]`, `[name]` and `[text]` fields at the top, one stylesheet link at the end, and no embedded comments or instructions.
- Default GIF counts match the catalogue and editor. Both supplied GIF URLs are preserved exactly. Sixty generated states cover zero, one, two and three GIFs across every design; zero-image output omits the media container.
- All fifteen editor designs were exercised in JSDOM: selection, names and titles, escaped field values, GIF addition/removal, blank URLs, vertical crop, BBCode conversion, consecutive opening `<p>` tags, per-design state, reset and copying.
- Fifteen clipboard actions matched the generated code using a test clipboard adapter. Fifteen download actions selected the correct filenames using a test download adapter. These are editor logic checks, not operating-system clipboard or download checks.
- Theme controls, preview-width controls, member colour controls and body-markup sanitization passed. Sample colours are not embedded in posting snippets.
- All comms use ordinary paragraph messages. Bud defaults contain 36 words each. Writing containers have no fixed height or clipping.
- The CSS parser accepted 214 rules and 972 declarations. Non-variable declarations passed grammar validation. Selectors are scoped to the collection; explicit Blue Hour light/dark rules and a system fallback are included. Bold/underline and reverse italic gradients were inspected in source.
- JavaScript syntax checks and Git whitespace checks passed.

- The pinned jsDelivr stylesheet returned HTTP 200 with `text/css; charset=utf-8`; its 30,395 bytes matched the local stylesheet exactly.

## Limits

The cloud browser's URL security policy rejected the local preview. No workaround was attempted. Browser visual rendering, 320 px visual layout, actual GIF playback and posting on the live JCink forum remain unverified. The test suite validates structure and editor behaviour, and does not substitute for these visual checks.
