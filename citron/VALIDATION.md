# Citron validation

## Border and motif revision · 27 September 2026

- Confirmed 223 scoped CSS rules and all fifteen editor default exports.
- Moved the four citron drawings into bounded footer cells, separated from the border rules and writing. Decorative marks use versioned classes.
- Replaced inset outlines with explicit inner borders in Pith & Parfum and Oilspot. Pith & Parfum's title uses rounded corners that accommodate multiline text.
- Checked 540 combinations of design, image count, viewport/card width and theme against three stylesheet load orders. The legacy stylesheet cannot restore the overlapping doodles or old frame rules on revised markup.
- Checked Zeste Manifesto's narrow-card title, media and copy row placements, including a narrow card within a wide viewport.
- Preserved the fifteen names, member-colour variables, supplied GIFs, editable fields and sample writing. The other 845 templates' copyable code is unchanged.
- Existing editor checks passed for all selections, zero/three/default GIF states, paragraph handling, edit persistence, copy/download and mode/palette/width controls.

These are DOM, CSS parsing and cascade checks. They do not establish rendered appearance or live JCink behaviour; browser rendering remains unverified.

## Original collection checks · 9 September 2026

- Confirmed five threads, five comms and five buds with 15 unique names.
- Parsed 187 template CSS rules with css-tree; all selectors are scoped to the Citron wrapper.
- Confirmed all snippets have exactly one complete dohtml wrapper, one stylesheet link, editable placeholders at the top, HTML emphasis and no scripts or editing comments.
- Matched all 15 editor default exports to their posting files.
- Exercised all 15 designs with no images, three images and restored defaults; empty image markup is omitted.
- Checked BBCode-to-HTML conversion, successive opening paragraph tags, name/URL escaping, edit persistence, message direction, palette and mode controls, gallery navigation, clipboard output and download filenames.
- Confirmed bud samples remain below 100 words and writing has no fixed-height scroll box.
- Retrieved both supplied Tumblr URLs directly and decoded them as animated GIFs: 400 × 333 with 75 frames, and 400 × 296 with 70 frames.

Run with Node.js, jsdom and css-tree available:

```sh
node citron/build.cjs
node citron/validate.cjs
```

Browser access to the local server and shared HTML preview was blocked by the environment's browser URL policy. Rendered appearance, responsive layout, GIF display within the designs and live JCink integration have therefore not been visually verified. DOM checks and CSS parsing do not establish those results. The source includes explicit light/dark modes, system fallback and responsive rules.

The forum snippets are script-free and now link directly to `@main/citron/citron-atelier-standalone-v2.css`. The standalone editor contains its own stylesheet and code, so it can be opened locally for visual review.
