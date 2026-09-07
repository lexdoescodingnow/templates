# Gâteau validation

Validated on 7 September 2026.

## Posting files

- Fifteen independently copyable `[dohtml]` snippets: five threads, five comms and five buds.
- Unique names and filenames; `[url]`, `[name]`, `[text]`, optional GIFs and writing precede ornament markup and the shared stylesheet link.
- One external stylesheet per snippet; no scripts, HTML comments, CSS comments or embedded editing instructions.
- All five bud defaults contain fewer than 100 words.
- All fifteen editor defaults match their individual posting files exactly.

## Browser checks

- Chromium rendered all fifteen designs in light and dark modes at forum and narrow widths: 60 default layout combinations without horizontal content overflow.
- Zero, one, two and three GIFs were checked for each design: 60 media combinations. Removing all images leaves no media row, and portrait columns reflow where appropriate.
- Explicit light and dark forum modes override the opposite system setting. System mode follows the browser preference when no forum mode is set.
- Inherited member colours affect the frame and text. Bold and underline use the same forward gradient; italic reverses it. Dark mode lightens the member hues for contrast.
- The editor preserves per-design changes while switching; converts `[b]`, `[i]`, `[u]`; accepts plain paragraphs and successive opening `<p>` tags; and supports received, sent and mixed message alignment.
- Downloaded code matches the edited code. Copy succeeds or exposes selected code for the browser's manual-copy fallback. The clipboard request has a timeout so restricted local-file contexts cannot leave the button waiting indefinitely.
- Unsupported executable markup and unsafe links are excluded from editor output.
- All fifteen gallery entries select their corresponding editor. The full page fits a 375px viewport.
- Light/dark screenshots of the thread, comms and bud collections were visually reviewed with Cormorant Garamond and DM Sans loaded.

## Assets and limits

Both supplied Tumblr URLs returned HTTP 200 with `image/gif` content and decoded in the browser. The font stylesheet and its font files were retrieved successfully. Browser visual checks used local copies of these exact remote assets because the test browser's direct network path was unavailable; the delivered templates retain the original online URLs.

The ornaments are inline vector drawings. The standalone preview embeds its template CSS, design data and editor. GIFs and optional web fonts still load online.

These checks cover the generated HTML/CSS and browser editor. A post was not submitted to the live JCink forum, so the forum's HTML filtering and surrounding skin styles remain outside the validation scope. Hosted CSS requires an external stylesheet link to be permitted inside `[dohtml]`.
