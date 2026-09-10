# Macadamia · Journey & Kai

Fifteen new JCink designs: five threads, five device comms and five miniature buds. Macadamia blossom tassels, seed-eye impressions, terrazzo fragments and woven orchard details sit alongside inherited member colours and neutral reading surfaces.

[Download the preview and editor](https://github.com/lexdoescodingnow/templates/raw/refs/heads/main/macadamia/macadamia-collection-preview.html)

Download the HTML preview and open it in your browser to select, edit, preview and copy the designs. It includes its stylesheet and editor; the character GIFs load from Tumblr. GitHub displays the HTML source in its file viewer.

For direct posting, open a named `.txt` file below, choose **Copy raw file**, and paste the complete block into JCink. Each snippet includes its `[dohtml]` tags and hosted stylesheet link.

## Threads

| Design | Starting GIFs | Layout |
| --- | ---: | --- |
| [Raceme Letters](macadamia-raceme-letters-thread-01.txt) | 1 | A cascade of tiny macadamia blossoms runs beside a panoramic portrait and a broad, softly set reading page. |
| [Terrazzo Milk](macadamia-terrazzo-milk-thread-02.txt) | 2 | A fragmented mosaic frame holds two offset landscape portraits, a bold slanting title and a clean central writing surface. |
| [Hilum Press](macadamia-hilum-press-thread-03.txt) | 0 | A writing-led letterpress page with a large seed-eye impression, compressed type, a split colour baseline and generous prose. |
| [Whorl House](macadamia-whorl-house-thread-04.txt) | 1 | A rounded triangular portrait sits among three radiating leaves above a centred title and a spare, open reading panel. |
| [Orchard Weave](macadamia-orchard-weave-thread-05.txt) | 0 | An image-free page with an interlaced member-colour edge, a small sideways signature and a broad bookish title. |

## Comms

| Design | Starting GIFs | Layout |
| --- | ---: | --- |
| [Raceme Mobile](macadamia-raceme-mobile-comms-01.txt) | 1 | A slim blossom-detailed phone with a square contact portrait, offset speaker slots and a rounded conversation screen. |
| [Milkglass Duo](macadamia-milkglass-duo-comms-02.txt) | 2 | A two-panel glass phone with its conversation above a paired contact dock and a slim illuminated hinge. |
| [Roast Terminal](macadamia-roast-terminal-comms-03.txt) | 1 | A miniature desktop terminal with a thick inset bezel, compact contact tile, square message cards and a pedestal base. |
| [Orchard Pocket](macadamia-orchard-pocket-comms-04.txt) | 1 | A compact keyboard phone with a short landscape display, a small contact tile and four rows of miniature keys. |
| [Whisper Kernel](macadamia-whisper-kernel-comms-05.txt) | 0 | A smooth pebble-shaped messenger with a wide earpiece, centred contact text and soft stacked conversation bubbles. |

## Buds

| Design | Starting GIFs | Layout |
| --- | ---: | --- |
| [Hilum](macadamia-hilum-bud-01.txt) | 0 | A tiny round seed-eye imprint anchors a short open reply between offset coloured rules. |
| [Butterfleck](macadamia-butterfleck-bud-02.txt) | 1 | An asymmetric miniature with a portrait corner, a short reply and a scattering of terrazzo pieces. |
| [Blossom Pair](macadamia-blossom-pair-bud-03.txt) | 2 | Two small portrait medallions hang from a fine flowering stem above a compact reply. |
| [Crumbprint](macadamia-crumbprint-bud-04.txt) | 0 | A tiny upright note with a bold sans heading, a scattered imprint and a wide coloured lower lip. |
| [Whorllet](macadamia-whorllet-bud-05.txt) | 1 | A low, slanted leaf-shaped portrait sits below a short reply and a small member-colour leaf impression. |

## Editing

The `[url]` and `[name]` link, followed by the `[text]` title or contact status, appear at the top of every snippet. Editable timestamps, GIF URLs and writing follow before decorative elements and the stylesheet link. Template HTML and CSS contain no comments, hidden instructions or editing tips.

The preview displays **Journey & Kai** and each design's sample title when the fields contain placeholders. Copied code preserves the field values, so replace `[name]`, `[url]` and `[text]` before posting. Use **Copy code** or **Download .txt** to export your current edits. Each design retains its edits while the editor is open; **Reset design** restores its defaults.

Use ordinary `<p>` elements for paragraphs and individual comms messages. Successive opening `<p>` tags work without closing each paragraph. Comms offer received, sent and alternating message layouts. The illustrated hardware controls are decorative. Buds begin with 36 words and are intended for replies of 100 words or fewer; longer replies are not clipped.

The editor converts `[b]`, `[i]` and `[u]` into HTML. Inside a raw `[dohtml]` snippet use `<b>`, `<i>` and `<u>`; `<strong>` and `<em>` also work. Bold and underline use member colours 1 → 2 → 3; italics use 3 → 2 → 1. Underlining remains visible. Text accents blend member colours with the neutral text colour for legibility.

## GIFs and themes

Use **Add GIF**, **Remove**, blank image URLs and the crop sliders to adjust portraits. In raw snippets, remove the corresponding `<img>` element. Empty image containers are hidden, and portrait-dependent columns expand when the images are removed. Both supplied Tumblr URLs are included unchanged, with `.gifv` endings. Starting counts are design choices, not fixed limits.

The forum supplies `--mgrgb1`, `--mgrgb2` and `--mgrgb3` as comma-separated RGB values. Preview colour controls affect only the sample; they are not written into your posting snippet. Keep snippets inside the member's colour scope on the forum.

Blue Hour's `html[color-mode="light"]` and `html[color-mode="dark"]` control the neutral surfaces. An explicit forum theme overrides the system preference. The preview offers Fit, 320 px and 550 px widths. Styles use modern CSS including grid, container queries, `:has()` and `color-mix()`; no JavaScript, web fonts or icon libraries are required in forum posts.

## Source and compatibility

Run `node macadamia/build.cjs` from the repository root to generate the fifteen snippets and standalone editor from `designs.json` and `macadamia-model.js`. New snippets pin `macadamia-orchard-v1.css` to the immutable commit recorded in `stylesheet-revision.txt` and the `.bh-maca` wrapper. Earlier Macadamia CSS and posting files remain available; see the [previous thread index](LEGACY.md).

[Validation details](VALIDATION.md). Source checks are recorded separately from visual verification. The local preview could not be opened by the available browser because its security policy blocked local URLs; rendered layouts and live forum posting remain unverified.
