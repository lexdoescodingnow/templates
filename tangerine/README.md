# Tangerine collection

Five threads, five comms and five buds for **Arthur & Nate**. These are the original fifteen designs, now collected as Tangerine. GIFs follow the composition: portrait pairs for paired frames, single portraits for contacts and narrow photo spaces, and image-free options for letters and tiny replies.

[Preview and code](tangerine-collection-preview.html) · [Download collection](tangerine-collection.zip) · [Clementine / Siwoo & Yuseop](../clementine/README.md)

## Threads

| Design | GIFs | Layout |
| --- | ---: | --- |
| [Zest](tangerine-zest.txt) | 2 | Staggered portraits and engraved citrus details. |
| [Satsuma](tangerine-thread-satsuma.txt) | 1 | One citrus-shaped portrait beneath a centred masthead. |
| [Orangerie](tangerine-thread-orangerie.txt) | 2 | Tall conservatory windows and a botanical finish. |
| [Marmalade](tangerine-thread-marmalade.txt) | 0 | An image-free correspondence page with a coloured spine. |
| [Sunroom](tangerine-thread-sunroom.txt) | 2 | A wide photograph with a small circular portrait inset. |

## Comms

| Design | GIFs | Layout |
| --- | ---: | --- |
| [Pulp](tangerine-comms-pulp.txt) | 1 | A rounded phone with a centred portrait and soft message bubbles. |
| [Nectar](tangerine-comms-nectar.txt) | 1 | A compact chat screen with a tinted contact bar. |
| [Peel](tangerine-comms-peel.txt) | 1 | A slim handset with a vertical portrait and folded message corners. |
| [Fleur](tangerine-comms-fleur.txt) | 1 | A portrait-led messenger with a wide photographic header. |
| [Pressé](tangerine-comms-presse.txt) | 1 | A square messenger with crisp message panels and a citrus seal. |

## Buds

| Design | GIFs | Layout |
| --- | ---: | --- |
| [Pip](tangerine-bud-pip.txt) | 1 | A tiny portrait beside a quick reply. |
| [Pith](tangerine-bud-pith.txt) | 0 | A small centred note, carried by its typography and citrus motif. |
| [Dew](tangerine-bud-dew.txt) | 2 | Twin miniature portraits along the top edge. |
| [Segment](tangerine-bud-segment.txt) | 0 | A compact, image-free reply with a clean botanical finish. |
| [Blossom](tangerine-bud-blossom.txt) | 1 | A leaf-shaped portrait and an asymmetric frame. |

## Editing and integration

Copy a complete `[dohtml]` block from a named `.txt` file. The editable links, Arthur & Nate, title, image URLs, writing and comms time remain above the decoration and the stylesheet link. The supplied GIF URLs are examples, not a required pair.

Use the default layout in the table, or remove an image tag. If removing the final image, remove its empty portrait container too. Image-free layouts reclaim the space automatically. In previews with an editor, clearing a GIF URL omits that image from the preview and copied code; clearing both produces an image-free post. Custom edits are kept when switching designs.

Comms messages use ordinary `<p>` paragraphs; successive opening `<p>` tags work without closing tags or repeated classes. Device decoration is static. Buds encourage 100 words or fewer and never clip longer replies.

Use `<b>`, `<i>` and `<u>` inside `[dohtml]`; `<strong>` and `<em>` work too. Editors that accept `[b]`, `[i]` and `[u]` convert them to HTML. The inherited `--mgrgb1`, `--mgrgb2` and `--mgrgb3` colour the design and emphasis. Bold and underline use colours 1 → 2 → 3; italics use 3 → 2 → 1.

Explicit Blue Hour `html[color-mode="light"]` and `html[color-mode="dark"]` modes override the system fallback. Writing stays on neutral surfaces. Preview palette controls are samples; posts inherit the forum palette.

All current snippets use the fresh `tangerine-media-standalone-v1.css` stylesheet. Older CSS files remain available for existing posts. Image-free reflow uses modern CSS `:has()` selectors. Hosted CSS, fonts and GIFs require internet access; font fallbacks remain available. Copy the current Tangerine snippet to adopt its branding and Arthur & Nate. Older stylesheet URLs remain available for already posted templates. Internal CSS class names are retained to preserve the layouts.

## Revision checks

The collection split was checked for fifteen designs, five of each type, Arthur & Nate in every snippet, matching preview copy panels and a separate preview-above-code forum masterpost. Layout CSS, GIF URLs and writing were preserved during the move. Live forum rendering has not been retested for this rename.

After rebuilding forum posts, run `python tools/build_citrus_packages.py` to refresh both collection downloads and the Tangerine preview’s embedded stylesheet.

## Forum-ready collection

[Preview-above-code forum masterpost](../forum-posts/tangerine-forum-masterpost.txt) · [Downloadable browser preview with Copy buttons](../forum-posts/tangerine-preview.html) · [All collections and numbered post parts](../forum-posts/README.md).
