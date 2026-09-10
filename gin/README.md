# Gin · August & Linyu

Fifteen coordinated JCink designs: five threads, five electronic comms and five miniature buds. Juniper linework, condenser coils, botanical specimens and cut-glass details tie the set together. Member colours run through headers, frames, titles and message accents, with neutral reading surfaces.

[Download the preview and editor](https://github.com/lexdoescodingnow/templates/raw/refs/heads/main/gin/gin-collection-preview.html)

Open a named `.txt` file below and choose **Copy raw file** on GitHub. Paste the complete block into your JCink post. The `[dohtml]` tags and hosted stylesheet link are already included.

Download the HTML preview and open it in your browser to select, edit, preview and copy all fifteen designs. The preview embeds its CSS and editor; character GIFs load from Tumblr. GitHub's file viewer displays the HTML source.

## Threads

| Design | Starting GIFs | Layout |
| --- | ---: | --- |
| [Juniper Aperture](gin-juniper-aperture-thread-01.txt) | 1 | A single offset portrait, an open elliptical aperture and a juniper branch trailing into generous prose. |
| [Vapour Column](gin-vapour-column-thread-02.txt) | 0 | A tall condenser coil runs beside a writing-led page with a large italic heading and a fine measuring scale. |
| [London Cut](gin-london-cut-thread-03.txt) | 2 | A sharp typographic cover with two adjoining cinematic GIF panels, bevelled corners and a stepped member-colour frame. |
| [Orris Folio](gin-orris-folio-thread-04.txt) | 0 | A narrow title column accompanies the writing, with a delicate botanical specimen and a three-colour colophon. |
| [Tonic Refraction](gin-tonic-refraction-thread-05.txt) | 2 | An airy fluted-glass frame with a wide heading, uninterrupted prose and two faceted portraits at the foot. |

## Comms

| Design | Starting GIFs | Layout |
| --- | ---: | --- |
| [Juniper Signal](gin-juniper-signal-comms-01.txt) | 1 | A softly squared smartphone with an oblong contact portrait, three status lights and a curved message dock. |
| [Stillwave](gin-stillwave-comms-02.txt) | 0 | A music-player-inspired message phone with a large time display, a waveform dock and a circular hardware dial. |
| [Dryline Mini](gin-dryline-mini-comms-03.txt) | 1 | A compact e-ink messenger with a tiny square portrait, an outlined screen and perforated speaker grille. |
| [Botanica Relay](gin-botanica-relay-comms-04.txt) | 2 | A landscape communicator with a side control rail, paired contact tiles and a wide conversation screen. |
| [Gimlet Glass](gin-gimlet-glass-comms-05.txt) | 1 | A wrist communicator with a ribbed strap, a small contact tile and rounded message cards inside a soft glass bezel. |

## Buds

| Design | Starting GIFs | Layout |
| --- | ---: | --- |
| [Berrylet](gin-berrylet-bud-01.txt) | 0 | An open miniature note held between staggered corner brackets, finished with three tiny juniper berries. |
| [Zest Curl](gin-zest-curl-bud-02.txt) | 1 | A square portrait hangs beside a compact reply, with an airy spiral and a fine coloured baseline. |
| [Angelica Knot](gin-angelica-knot-bud-03.txt) | 0 | A narrow note with a fine crossing ribbon, an inset title tab and a short writing panel. |
| [Two Measures](gin-two-measures-bud-04.txt) | 2 | A tiny tasting card places its reply above two glass-bottom portrait tiles and a centred name label. |
| [Frostlet](gin-frostlet-bud-05.txt) | 1 | A low, wide reply with a small square portrait, offset grid marks and a translucent angular corner. |

## Editing

The `[url]` and `[name]` link, followed by the `[text]` title or contact status, sit at the top of each snippet. Time and GIF URLs follow when used. Lorem ipsum lives in `gn-copy`, before decorations and the stylesheet link. Posting HTML and CSS contain no comments, hidden tips or editing instructions.

The preview shows **August & Linyu** and each design's sample title while the fields contain placeholders. Copied code preserves the actual field values. Designs keep their edits while the page remains open. **Copy code** and **Download .txt** export current edits; **Reset design** restores that design's defaults.

Use ordinary `<p>` paragraphs for writing and separate comms messages. Successive opening `<p>` tags work without closing every paragraph or adding classes. Comms support `data-flow="received"`, `"sent"` and `"alternate"`. Device controls are decorative. Buds start with 36 words and are intended for replies of 100 words or fewer; longer replies are not clipped.

The editor converts `[b]`, `[i]` and `[u]` into HTML. In a raw `[dohtml]` snippet, use `<b>`, `<i>` and `<u>`; `<strong>` and `<em>` also work. Bold and underline follow member colours **1 → 2 → 3**; italics reverse to **3 → 2 → 1**. Underlines keep their visible rule. Emphasis colours mix toward the neutral text colour for readability.

## GIFs, member colours and themes

GIF counts vary by design. **Add GIF**, **Remove**, blank image URLs and crop sliders update both the preview and copied code. In a raw snippet, remove unwanted `<img>` elements. Empty image containers are hidden and portrait-dependent header columns expand when the images are removed. Both supplied Tumblr GIF URLs remain unchanged, including `.gifv`.

Inherited `--mgrgb1`, `--mgrgb2` and `--mgrgb3` RGB variables provide member colours. Keep the snippets inside your forum's member-colour scope. Preview palette controls affect only the sample and are not written into posting code.

Blue Hour's `html[color-mode="light"]` and `html[color-mode="dark"]` control neutral surfaces. Explicit forum mode takes precedence over the system dark preference. The editor offers Fit, 320 px and 550 px widths. Posting CSS is scoped to `.bh-gin`; posts need no JavaScript, downloaded fonts or icon libraries. Botanical line drawings are embedded in the CSS. Modern CSS including `:has()`, `color-mix()`, grid and container queries is used.

## Repository integration

All fifteen posting snippets and the standalone editor use `designs.json` and `gin-model.js`. Run `node gin/build.cjs` from the repository root to regenerate them. The editor and template stylesheet are embedded in `gin-collection-preview.html`, keeping the download self-contained apart from GIFs.

Every posting snippet links to `gin-distillery-v1.css` at the immutable revision in `stylesheet-revision.txt`.

[Validation details](VALIDATION.md). Structural, CSS and editor checks passed. Browser access to the local preview was blocked; visual rendering and posting on the live forum are unverified.
