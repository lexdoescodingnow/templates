# Delight collection

Five threads, five comms and five buds. GIFs follow the composition: portrait pairs for paired frames, single portraits for contacts and narrow photo spaces, and image-free options for letters and tiny replies.

[Preview and code](delight-collection-preview.html) · [Download collection](delight-collection.zip)

## Threads

| Design | GIFs | Layout |
| --- | ---: | --- |
| [Cloudspun](delight-cloudspun-thread-01.txt) | 1 | A softly rounded dessert-coupe frame with a sweeping script title and heart-shaped spoon. |
| [Mousse Amour](delight-mousse-amour-thread-02.txt) | 2 | A full-width portrait pair, fluted glass rim, and centred romantic serif title. |
| [Chantilly Vow](delight-chantilly-vow-thread-03.txt) | 0 | An open-sided, image-free vow card with a fine sugar-loop flourish. |
| [Parfait Reverie](delight-parfait-reverie-thread-04.txt) | 2 | Uneven portrait layers, crisp coloured rules, and generous literary typography. |
| [Velvet Spoon](delight-velvet-spoon-thread-05.txt) | 1 | A fluted side edge, text-first composition, and a little portrait signature below. |

## Comms

| Design | GIFs | Layout |
| --- | ---: | --- |
| [Pillowtalk](delight-pillowtalk-comms-01.txt) | 1 | One character contact portrait, with the original device frame and message bubbles. |
| [Sugar Dial](delight-sugar-dial-comms-02.txt) | 1 | One character contact portrait, with the original device frame and message bubbles. |
| [Rosewire](delight-rosewire-comms-03.txt) | 1 | One character contact portrait, with the original device frame and message bubbles. |
| [Whip Whisper](delight-whip-whisper-comms-04.txt) | 1 | One character contact portrait, with the original device frame and message bubbles. |
| [Sweet Frequency](delight-sweet-frequency-comms-05.txt) | 0 | A colour-rimmed phone with a text contact panel and fluid message bubbles. |

## Buds

| Design | GIFs | Layout |
| --- | ---: | --- |
| [Softpeak](delight-softpeak-bud-01.txt) | 1 | One small character portrait beside a compact reply and the original themed details. |
| [Blushdrop](delight-blushdrop-bud-02.txt) | 1 | One small character portrait beside a compact reply and the original themed details. |
| [Cherubkiss](delight-cherubkiss-bud-03.txt) | 0 | An open miniature vow with a delicate flourish after the reply. |
| [Rosette](delight-rosette-bud-04.txt) | 2 | A turned-corner note with a whipped rosette and a small image pair. |
| [Last Spoonful](delight-last-spoonful-bud-05.txt) | 0 | A slim image-free card with a spoon flourish to finish. |

## Editing and integration

Copy a complete `[dohtml]` block from a named `.txt` file. The editable `[url]`, `[name]`, `[text]`, image URLs, writing and comms time remain above the decoration and the stylesheet link. The supplied GIF URLs are examples, not a required pair.

Use the default layout in the table, or remove an image tag. If removing the final image, remove its empty portrait container too. Image-free layouts reclaim the space automatically. In previews with an editor, clearing a GIF URL omits that image from the preview and copied code; clearing both produces an image-free post. Custom edits are kept when switching designs.

Comms messages use ordinary `<p>` paragraphs; successive opening `<p>` tags work without closing tags or repeated classes. Device decoration is static. Buds encourage 100 words or fewer and never clip longer replies.

Use `<b>`, `<i>` and `<u>` inside `[dohtml]`; `<strong>` and `<em>` work too. Editors that accept `[b]`, `[i]` and `[u]` convert them to HTML. The inherited `--mgrgb1`, `--mgrgb2` and `--mgrgb3` colour the design and emphasis. Bold and underline use colours 1 → 2 → 3; italics use 3 → 2 → 1.

Explicit Blue Hour `html[color-mode="light"]` and `html[color-mode="dark"]` modes override the system fallback. Writing stays on neutral surfaces. Preview palette controls are samples; posts inherit the forum palette.

All current snippets use the fresh `delight-media-v2.css` stylesheet. Older CSS files remain available for existing posts. Image-free reflow uses modern CSS `:has()` selectors. Hosted CSS, fonts and GIFs require internet access; font fallbacks remain available. Existing forum posts retain their original markup: paste the revised snippet to adopt its new GIF layout.

## Revision checks

The September 2026 GIF revision passed checks for all 180 posting snippets, 135 editor design selections, 540 zero/one/two-image editing states, 45 static copy panels and the twelve stylesheets. Writing and placeholders were preserved. The browser could not open local previews, so visual rendering and live JCink posting remain unverified.
