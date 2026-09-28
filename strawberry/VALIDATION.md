# Strawberry validation

28 September 2026

- Fifteen distinct names, with five thread, five comms and five bud designs. The complete catalogue build reports 920 designs across 64 entries without duplicate names.
- All snippets have one balanced `[dohtml]` block, top `[url]` / `[name]` / `[text]` fields, lorem ipsum, and one stylesheet link. No template comments, scripts, hidden tips or CSS imports.
- Editor checks cover all fifteen default exports and named exports, escaped field values, BBCode-to-HTML conversion, successive opening `<p>` tags, GIF removal/addition, resets, format filters and explicit appearance selection.
- All comms support received, sent and alternating messages. All bud sample replies remain below 100 words.
- Clipboard success and manual-selection fallback checked. Forum copy blocks match the canonical snippets exactly. Both numbered forum parts remain below 45,000 characters.
- Template CSS parses successfully and every selector is scoped to the Strawberry wrapper. Posted templates require no JavaScript.

Run `node strawberry/verify.cjs` with `jsdom` and `css-tree` available to Node.

Local-file browser navigation was blocked by the browser URL policy. No live JCink post has been submitted.
