# Clementine collection

Five threads, five comms and five buds. GIFs follow the composition: portrait pairs for paired frames, single portraits for contacts and narrow photo spaces, and image-free options for letters and tiny replies.

[Preview and code](clementine-collection-preview.html)

## Threads

| Design | GIFs | Layout |
| --- | ---: | --- |
| [Zest](clementine-zest.txt) | 2 | Staggered portraits and engraved citrus details. |
| [Satsuma](clementine-thread-satsuma.txt) | 1 | One citrus-shaped portrait beneath a centred masthead. |
| [Orangerie](clementine-thread-orangerie.txt) | 2 | Tall conservatory windows and a botanical finish. |
| [Marmalade](clementine-thread-marmalade.txt) | 0 | An image-free correspondence page with a coloured spine. |
| [Sunroom](clementine-thread-sunroom.txt) | 2 | A wide photograph with a small circular portrait inset. |

## Comms

| Design | GIFs | Layout |
| --- | ---: | --- |
| [Pulp](clementine-comms-pulp.txt) | 1 | A rounded phone with a centred portrait and soft message bubbles. |
| [Nectar](clementine-comms-nectar.txt) | 1 | A compact chat screen with a tinted contact bar. |
| [Peel](clementine-comms-peel.txt) | 1 | A slim handset with a vertical portrait and folded message corners. |
| [Fleur](clementine-comms-fleur.txt) | 1 | A portrait-led messenger with a wide photographic header. |
| [Pressé](clementine-comms-presse.txt) | 1 | A square messenger with crisp message panels and a citrus seal. |

## Buds

| Design | GIFs | Layout |
| --- | ---: | --- |
| [Pip](clementine-bud-pip.txt) | 1 | A tiny portrait beside a quick reply. |
| [Pith](clementine-bud-pith.txt) | 0 | A small centred note, carried by its typography and citrus motif. |
| [Dew](clementine-bud-dew.txt) | 2 | Twin miniature portraits along the top edge. |
| [Segment](clementine-bud-segment.txt) | 0 | A compact, image-free reply with a clean botanical finish. |
| [Blossom](clementine-bud-blossom.txt) | 1 | A leaf-shaped portrait and an asymmetric frame. |

## Editing and integration

Copy a complete `[dohtml]` block from a named `.txt` file. The editable `[url]`, `[name]`, `[text]`, image URLs, writing and comms time remain above the decoration and the stylesheet link. The supplied GIF URLs are examples, not a required pair.

Use the default layout in the table, or remove an image tag. If removing the final image, remove its empty portrait container too. Image-free layouts reclaim the space automatically. In previews with an editor, clearing a GIF URL omits that image from the preview and copied code; clearing both produces an image-free post. Custom edits are kept when switching designs.

Comms messages use ordinary `<p>` paragraphs; successive opening `<p>` tags work without closing tags or repeated classes. Device decoration is static. Buds encourage 100 words or fewer and never clip longer replies.

Use `<b>`, `<i>` and `<u>` inside `[dohtml]`; `<strong>` and `<em>` work too. Editors that accept `[b]`, `[i]` and `[u]` convert them to HTML. The inherited `--mgrgb1`, `--mgrgb2` and `--mgrgb3` colour the design and emphasis. Bold and underline use colours 1 → 2 → 3; italics use 3 → 2 → 1.

Explicit Blue Hour `html[color-mode="light"]` and `html[color-mode="dark"]` modes override the system fallback. Writing stays on neutral surfaces. Preview palette controls are samples; posts inherit the forum palette.

All current snippets use the fresh `clementine-media-v2.css` stylesheet. Older CSS files remain available for existing posts. Image-free reflow uses modern CSS `:has()` selectors. Hosted CSS, fonts and GIFs require internet access; font fallbacks remain available. Existing forum posts retain their original markup: paste the revised snippet to adopt its new GIF layout.

## Revision checks

The September 2026 GIF revision passed checks for all 180 posting snippets, 135 editor design selections, 540 zero/one/two-image editing states, 45 static copy panels and the twelve stylesheets. Writing and placeholders were preserved. The browser could not open local previews, so visual rendering and live JCink posting remain unverified.
