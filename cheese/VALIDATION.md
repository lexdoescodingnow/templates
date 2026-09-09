# Cheese validation

Validated on 9 September 2026.

## Passed

- Fifteen distinct names and snippets: five threads, five comms and five buds.
- All 176 template CSS rules parse and remain scoped to `.bh-cheese`.
- Every snippet has its `[dohtml]` wrapper and exactly one hosted stylesheet link. `[url]`, `[name]` and `[text]` appear at the top. No scripts, comments, hidden tips or editing instructions occur inside posting code or template CSS.
- All fifteen preview selections export exactly the corresponding default `.txt` file.
- All designs support removing every default image, adding three images, and restoring defaults; empty media markup is omitted from the exported code.
- The editor converts `[b]`, `[i]` and `[u]` to HTML. Successive opening `<p>` tags produce separate paragraphs. Comms defaults have three separate message paragraphs.
- Names and URL attributes are escaped; the editor strips executable markup and unsafe URL schemes from writing. Edited state survives changing designs while the preview is open.
- Copy and download handlers return the current complete snippet in a simulated DOM; gallery navigation and light/dark/system, palette and width controls behave as expected.
- Exported snippets remain unchanged by preview-only palette and mode controls. CSS gives explicit Blue Hour modes priority over the system fallback.
- Bud samples contain 36 words. Writing containers have no fixed maximum height or scroll-box restriction.
- Both exact supplied Tumblr URLs returned HTTP 200 and decoded as animated GIFs: 540 × 304 / 60 frames, and 540 × 400 / 66 frames.
- README links resolve to actual collection files, and generated output is deterministic.

## Limits

The managed browser blocked the local HTTP preview and then rejected the shared-file URL under its URL policy. No alternative browser surface was used. Pixel-level visual review, browser layout measurements, clipboard permissions in a real browser, and posting to the live forum were not verified. GIF checks used HTTP retrieval and image decoding; they do not certify loading in the user's forum.

The CSS targets modern browsers with grid, `:has()`, `color-mix()`, masks and container queries. The complete preview includes its CSS locally. Forum snippets depend on their pinned jsDelivr stylesheet and the supplied remote GIF hosts.

## Repeatable check

```sh
node cheese/build.cjs
NODE_PATH=/path/to/node_modules node cheese/validate.cjs
```

Dependencies: Node.js, `jsdom` and `css-tree`.
