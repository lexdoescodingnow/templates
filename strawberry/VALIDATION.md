# Strawberry validation

28 September 2026

- Fifteen distinct names, with five thread, five comms and five bud designs. The complete catalogue build reports 920 designs across 64 entries without duplicate names.
- All snippets have one balanced `[dohtml]` block, top `[url]` / `[name]` / `[text]` fields, lorem ipsum, and one stylesheet link. No template comments, scripts, hidden tips or CSS imports.
- Editor checks cover all fifteen default exports and named exports, escaped field values, BBCode-to-HTML conversion, successive opening `<p>` tags, GIF removal/addition, resets, format filters and explicit appearance selection.
- All comms support received, sent and alternating messages. All bud sample replies remain below 100 words.
- Clipboard success and manual-selection fallback checked. Forum copy blocks match the canonical snippets exactly. Both numbered forum parts remain below 45,000 characters.
- Template CSS parses successfully and every selector is scoped to the Strawberry wrapper. Posted templates require no JavaScript.

Run `node strawberry/verify.cjs` with `jsdom` and `css-tree` available to Node.

The published revision was inspected in Chrome in light and dark modes. All fifteen layouts passed overflow and GIF-frame checks at their full width and at 390px, 320px and 260px. Both supplied Tumblr GIFs loaded. Browser copy was checked by pasting its result into an editor field and resetting the sample. Computed bold and italic gradients run in opposite member-colour orders.

The visual pass caught flex-compressed portrait frames; version 2 preserves their minimum content height and adjusts the first placeholder GIF crop. The live jsDelivr v2 stylesheet returned HTTP 200 with CSS content identical to the checked source.

No live JCink post has been submitted.
