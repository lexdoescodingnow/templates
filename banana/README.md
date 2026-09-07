# Banana collection

Five threads, five comms and five buds. GIFs follow the composition: portrait pairs for paired frames, single portraits for contacts and narrow photo spaces, and image-free options for letters and tiny replies.

[Preview and code](banana-collection-preview.html)

## Threads

| Design | GIFs | Layout |
| --- | ---: | --- |
| [Keepsake](banana-keepsake-snippet.txt) | 2 | The original staggered GIF portraits and botanical frame. |
| [Cameo](banana-thread-cameo.txt) | 1 | A single oval portrait and a softer, rounded frame. |
| [Ribbon](banana-thread-ribbon.txt) | 2 | Two aligned square GIFs crossed by a band of member colours. |
| [Canopy](banana-thread-canopy.txt) | 1 | One wide, arched GIF with leaves framing the heading. |
| [Postcard](banana-thread-postcard.txt) | 0 | A writing-led postcard with a postmark motif, botanical finish and fine double border. |

## Comms

| Design | GIFs | Layout |
| --- | ---: | --- |
| [Keepsake](banana-comms-snippet.txt) | 1 | The original Banana phone with its contact header and incoming bubbles. |
| [Cameo](banana-comms-cameo.txt) | 1 | A centred circular contact GIF and rounded message bubbles. |
| [Ribbon](banana-comms-ribbon.txt) | 1 | A coloured header rule, round avatar and edged message bubbles. |
| [Canopy](banana-comms-canopy.txt) | 1 | An arched contact banner inside a curved phone frame. |
| [Postcard](banana-comms-postcard.txt) | 1 | A compact phone with a portrait on the right and a round home button. |

## Buds

| Design | GIFs | Layout |
| --- | ---: | --- |
| [Sprout](banana-bud-sprout.txt) | 1 | A rounded card with a leaf-shaped portrait. |
| [Leaflet](banana-bud-leaflet.txt) | 0 | An image-free folded notecard for a quick reply. |
| [Tendril](banana-bud-tendril.txt) | 1 | An arched side portrait beside a short passage. |
| [Twinleaf](banana-bud-twinleaf.txt) | 2 | Two overlapping character GIFs. |
| [Pressing](banana-bud-pressing.txt) | 0 | A slim botanical note with the writing at its centre. |

## Editing and integration

Copy a complete `[dohtml]` block from a named `.txt` file. The editable `[url]`, `[name]`, `[text]`, image URLs, writing and comms time remain above the decoration and the stylesheet link. The supplied GIF URLs are examples, not a required pair.

Use the default layout in the table, or remove an image tag. If removing the final image, remove its empty portrait container too. Image-free layouts reclaim the space automatically. In previews with an editor, clearing a GIF URL omits that image from the preview and copied code; clearing both produces an image-free post. Custom edits are kept when switching designs.

Comms messages use ordinary `<p>` paragraphs; successive opening `<p>` tags work without closing tags or repeated classes. Device decoration is static. Buds encourage 100 words or fewer and never clip longer replies.

Use `<b>`, `<i>` and `<u>` inside `[dohtml]`; `<strong>` and `<em>` work too. Editors that accept `[b]`, `[i]` and `[u]` convert them to HTML. The inherited `--mgrgb1`, `--mgrgb2` and `--mgrgb3` colour the design and emphasis. Bold and underline use colours 1 → 2 → 3; italics use 3 → 2 → 1.

Explicit Blue Hour `html[color-mode="light"]` and `html[color-mode="dark"]` modes override the system fallback. Writing stays on neutral surfaces. Preview palette controls are samples; posts inherit the forum palette.

All current snippets use the fresh `banana-media-v2.css` stylesheet. Older CSS files remain available for existing posts. Image-free reflow uses modern CSS `:has()` selectors. Hosted CSS, fonts and GIFs require internet access; font fallbacks remain available. Existing forum posts retain their original markup: paste the revised snippet to adopt its new GIF layout.

## Revision checks

The September 2026 GIF revision passed checks for all 180 posting snippets, 135 editor design selections, 540 zero/one/two-image editing states, 45 static copy panels and the twelve stylesheets. Writing and placeholders were preserved. The browser could not open local previews, so visual rendering and live JCink posting remain unverified.
