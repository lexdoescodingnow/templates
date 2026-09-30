# Cucumber validation

Checked 30 September 2026.

- Fifteen uniquely named designs: five threads, five comms and five buds. The complete forum inventory contains 935 designs across 65 collection entries, with no duplicate public names.
- Every canonical snippet and forum copy box has the same complete `[dohtml]` block, literal `[url]`, `[name]` and `[text]` fields, supplied GIF URLs and lorem ipsum. Each snippet has one direct, import-free stylesheet link. No comments, scripts, hidden instructions or editing tips occur in the template HTML or CSS.
- All 279 stylesheet rules are scoped to `.cu1`. Member colours are inherited through `--mgrgb1`, `--mgrgb2` and `--mgrgb3`. Bold and underline run forwards; italics run backwards.
- Chromium rendering inspected for all fifteen designs in light and dark modes. All GIFs rendered using the supplied image bytes. Main layout bounds checked at full width and 390, 320 and 260 pixels.
- Corrected stretched vertical portrait frames, narrow-width overflow from rotated portraits and the wide bud portrait crop during visual review.
- The editor check covers exact default and named copying, text escaping, BBCode conversion, consecutive unclosed paragraphs, all three message directions, image removal and addition, resets, filters, explicit themes and the clipboard-selection fallback.
- The fifteen forum copy blocks match the canonical snippets exactly. The complete masterpost is split into two numbered parts, each below 45,000 characters.
- Bud samples remain below 100 words. Writing and messages expand naturally; none use a fixed-height writing viewport.

The local editor and snippets were checked in Chromium. An authenticated live JCink forum post was not made. Posted snippets require their hosted stylesheet and remote GIFs; the downloadable editor embeds its styling and script.
