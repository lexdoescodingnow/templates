# Champagne collection

Three coordinated templates with fine gold lines, champagne-bubble motifs, neutral writing surfaces, member-group accents, and light/dark support.

| Type | Design | Copyable JCink code |
| --- | --- | --- |
| Thread | Cuvée — paired arched portraits and an engraved heading | [champagne-cuvee.txt](champagne-cuvee.txt) |
| Comms | Perlage — a champagne-trimmed phone with individual message bubbles | [champagne-comms-perlage.txt](champagne-comms-perlage.txt) |
| Bud | Mignon — a compact card with paired miniature portraits | [champagne-bud-mignon.txt](champagne-bud-mignon.txt) |

Download and open [champagne-preview.html](champagne-preview.html) to switch between the three designs, compare light and dark modes, try sample group palettes and narrow widths, and copy or download the selected snippet. It opens on the new comms design. Sample names are confined to the preview; the snippets retain `[name]`.

## Editing

Copy one entire `[dohtml]` block, including its final stylesheet link. Editable URLs, names, subtitles, GIFs, time and writing come before decorative markup. Replace the `[url]`, `[name]`, `[text]` and, for comms, `[time]` fields. Replace the lorem ipsum with your writing and change each image's `src` to use a different portrait. Its `object-position` controls the crop.

Each comms message is one ordinary `<p>` element. Add a new `<p>` for each new message; no repeated classes or message wrappers are needed. The comms snippet includes a single sender's avatar and message bubbles, a time field and an editable receipt. Its phone controls are decorative. The Mignon bud is designed for replies of 100 words or fewer, with a short placeholder reply. This is a writing convention; text is never silently cut off or restricted by a script. The thread and bud both support removing either portrait to keep one GIF.

All three use plain paragraph markup. Closing `</p>` tags work, and successive opening `<p>` tags also work. Native `<b>`, `<i>` and `<u>` tags are supplied inside `[dohtml]`. The CSS also covers `strong`, `em`, and the HTML output of `[b]`, `[i]` and `[u]` when those are parsed by the forum. The forum handles BBCode parsing.

## Colour and mode behaviour

Inherited `--mgrgb1`, `--mgrgb2` and `--mgrgb3` RGB triplets drive headings, portrait frames, dividers, appropriate surfaces and message edges. Bold and underline use group 1 → group 2 → group 3. Italics reverse that gradient. Content stays on neutral surfaces. Without inherited group variables, each design uses its champagne fallback palette.

Blue Hour's explicit `html[color-mode="light"]` or `html[color-mode="dark"]` takes precedence over the device preference fallback.

## Files and assets

The thread uses [champagne-cuvee-v1.css](champagne-cuvee-v1.css). Comms and buds share [champagne-companions-v1.css](champagne-companions-v1.css), which imports the existing thread stylesheet for the common font dependency. Each forum snippet only needs its one included stylesheet link. The preview embeds all styling while retaining the external Google Fonts and GIF dependencies. No scripts run inside the forum snippets.

The previous Tenor placeholders have been replaced throughout the current snippets and preview with the two supplied Tumblr assets: [portrait one](https://64.media.tumblr.com/cbcc309cd601f309dd8fd3dfd13b6bf8/996ba8d81fe808ab-3f/s540x810/d716b6373ccd5520d0ee95ad468c3aa7b272e7d3.gifv) and [portrait two](https://64.media.tumblr.com/5171fa96d9b8536ee1c661571af91b19/e4d3e377f6ce0b88-55/s540x810/992ab5016a2dc63e0f5b00ccee85c0ceee182158.gifv). Both respond as animated GIF images. Comms uses the first as its contact portrait; threads and buds use both.

Typography: Cormorant Garamond and Manrope, with system fallbacks. Motifs are embedded vector line work. Source and asset checks are included in validation; live JCink rendering and browser visual verification were not performed in this session.
