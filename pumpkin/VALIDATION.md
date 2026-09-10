# Pumpkin validation

## Passed

- Exactly fifteen distinct designs: five threads, five comms and five buds. Names follow `pumpkin-{design}-{thread|comms|bud}-{01–05}.txt`.
- All default preview exports match their individual posting files exactly.
- Every posting file has one complete `[dohtml]` block, one hosted stylesheet link, and the editable `[url]`, `[name]` and `[text]` fields before writing and decoration.
- Posting HTML and CSS have no comments, hidden editing tips, instructional separators or JavaScript.
- CSS parses successfully. All 221 style rules are scoped to `.bh-pumpkin`; all 33 explicit grid-area maps are rectangular and valid.
- GIF counts match the design manifest: five image-free, seven single-image and three paired-image defaults. Supplied Tumblr addresses are unchanged.
- Add, remove and reset GIF operations pass for every design. Removing all GIFs removes the media element from exported code. CSS contains corresponding image-free grid arrangements.
- Every design includes bold, italic and underline formatting samples. CSS defines forward member gradients for bold/underline and reversed member gradients for italics.
- The editor converts `[b]`, `[i]` and `[u]` to HTML. Successive unclosed `<p>` message tags produce separate message bubbles.
- Name, URL, title, time, message direction and writing edits are retained when switching designs.
- Clipboard output matches the edited snippet. Download handling receives the edited text blob and the correct individual filename.
- Changing preview colours does not introduce hardcoded member variables into posting snippets. Light/dark controls update the document's explicit mode.
- The writing editor removes executable markup and comments from user-entered content.
- All default buds contain 36 words. A 105-word integration check triggers the counter and keeps all text.
- Editor integration completed with no JavaScript or CSS parsing errors in JSDOM. Node syntax checks passed for the model, editor and build script.

## Verification limits

These are source and DOM integration checks, using PostCSS and JSDOM. They do not provide browser layout, image-load or screenshot verification. The available cloud browser blocked the local preview with `ERR_BLOCKED_BY_CLIENT`. A live JCink forum post has not been tested. Device controls are decorative; copy/edit controls belong to the standalone preview.

CSS declares support for Blue Hour's explicit `html[color-mode]` settings and an operating-system preference fallback. The explicit forum choice is excluded from the fallback selector. Modern grid, `:has()`, `color-mix()` and container queries are used.
