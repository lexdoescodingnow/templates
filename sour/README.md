# Sour collection

## Current stylesheet delivery

This collection now follows the working Banana/Bingsu setup: direct stylesheet links on `@main`, with all layout and font-face rules included directly and no CSS imports. Current snippets, editor exports and forum masterposts use the new files. Earlier stylesheets remain available for existing posts.

- [sour-member-standalone-v3.css](sour-member-standalone-v3.css)

Run `python sour/build-sour.py`, then `python tools/build_forum_posts.py` and `python tools/build_sour_package.py` to refresh Sour’s editor, posting files and download. Refresh the split collection packages after a full forum rebuild as described in `AGENTS.md`.


Five threads, five comms and five buds. GIFs follow the composition: portrait pairs for paired frames, single portraits for contacts and narrow photo spaces, and image-free options for letters and tiny replies.

[Preview and code](sour-collection-preview.html) · [Download collection](sour-collection.zip)

## Threads

| Design | GIFs | Layout |
| --- | ---: | --- |
| [Sherbet](sour-sherbet-thread-01.txt) | 2 | Crimped sachet seams, sugar-speckled windows and illustrated dipping sticks. |
| [Fizz](sour-fizz-thread-02.txt) | 1 | One circular portrait, sugar-coated gummy rings and fizzy bubbles. |
| [Ribbons](sour-ribbons-thread-03.txt) | 2 | Looped sour belts, sugar crystals and softly tilted picture frames. |
| [Bonbon](sour-bonbon-thread-04.txt) | 1 | One oval candy window, twisted wrapper ends and scattered sugar grains. |
| [Afterglow](sour-afterglow-thread-05.txt) | 0 | Crystalline edges and a candy-shard motif frame an image-free page. |

## Comms

| Design | GIFs | Layout |
| --- | ---: | --- |
| [Zingline](sour-sherbet-comms-01.txt) | 1 | One character contact portrait, with the original device frame and message bubbles. |
| [Fizzwire](sour-fizz-comms-02.txt) | 1 | One character contact portrait, with the original device frame and message bubbles. |
| [Ribbon Relay](sour-ribbons-comms-03.txt) | 1 | One character contact portrait, with the original device frame and message bubbles. |
| [Bonbon Buzz](sour-bonbon-comms-04.txt) | 1 | One character contact portrait, with the original device frame and message bubbles. |
| [Afterhours Lime](sour-afterglow-comms-05.txt) | 1 | One character contact portrait, with the original device frame and message bubbles. |

## Buds

| Design | GIFs | Layout |
| --- | ---: | --- |
| [Sherbet Speck](sour-sherbet-bud-01.txt) | 0 | A tiny crimped sachet note, with room for the words alone. |
| [Fizzy Drop](sour-fizz-bud-02.txt) | 1 | One small character portrait beside a compact reply and the original themed details. |
| [Sour Twist](sour-ribbons-bud-03.txt) | 1 | One small character portrait beside a compact reply and the original themed details. |
| [Sugar Pucker](sour-bonbon-bud-04.txt) | 2 | Twisted wrapper ends, oval candy windows and scattered sugar grains. |
| [Sugar Twilight](sour-afterglow-bud-05.txt) | 0 | A miniature crystalline note with no portrait rail. |

## Editing and integration

Copy a complete `[dohtml]` block from a named `.txt` file. Lyle & Will, the editable `[url]`, title, image URLs, writing and comms time remain above the decoration and the stylesheet link. Forum code boxes use concise writing markers; their examples retain sample paragraphs. The supplied GIF URLs are examples, not a required pair.

Use the default layout in the table, or remove an image tag. If removing the final image, remove its empty portrait container too. Image-free layouts reclaim the space automatically. In previews with an editor, clearing a GIF URL omits that image from the preview and copied code; clearing both produces an image-free post. Custom edits are kept when switching designs.

Comms messages use ordinary `<p>` paragraphs; successive opening `<p>` tags work without closing tags or repeated classes. Device decoration is static. Buds encourage 100 words or fewer and never clip longer replies.

Use `<b>`, `<i>` and `<u>` inside `[dohtml]`; `<strong>` and `<em>` work too. Editors that accept `[b]`, `[i]` and `[u]` convert them to HTML. The inherited `--mgrgb1`, `--mgrgb2` and `--mgrgb3` colour the design and emphasis. Bold and underline use colours 1 → 2 → 3; italics use 3 → 2 → 1.

Explicit Blue Hour `html[color-mode="light"]` and `html[color-mode="dark"]` modes override the system fallback. Writing stays on neutral surfaces. Preview palette controls are samples; posts inherit the forum palette.

All current snippets use the fresh `sour-member-standalone-v3.css` stylesheet and `sour-members-v3` wrapper. Headers, names, frames, borders, message tints and emphasis inherit the member group palette. Writing surfaces and the small candy illustrations are neutral; the former fixed olive and plum colours are removed. The original illustration geometry, typography, GIF slots and layouts remain intact. Older CSS files remain available for existing posts. Image-free reflow uses modern CSS `:has()` selectors. Hosted CSS, fonts and GIFs require internet access; font fallbacks remain available. Existing forum posts retain their original markup: paste the revised snippet to adopt its new GIF layout.

## Revision checks

The member-colour revision was checked across all 15 designs, explicit light/dark modes and system fallbacks, two width conditions and three stylesheet load orders. All editor selections, GIF counts, ship names, preview/code pairs and packaged files passed. The other 845 catalogue snippets are unchanged. Live forum rendering has not been verified.

The September 2026 GIF revision passed checks for all 180 posting snippets, 135 editor design selections, 540 zero/one/two-image editing states, 45 static copy panels and the twelve stylesheets. Writing and placeholders were preserved. The browser could not open local previews, so visual rendering and live JCink posting remain unverified.

## Design names

Each design has a unique catalogue name. Existing filenames remain stable for saved links.

| Current name | Previous label | Format | Source |
| --- | --- | --- | --- |
| Afterhours Lime | Afterglow | comms | [sour-afterglow-comms-05.txt](sour-afterglow-comms-05.txt) · block 1 |
| Bonbon Buzz | Bonbon | comms | [sour-bonbon-comms-04.txt](sour-bonbon-comms-04.txt) · block 1 |
| Fizzwire | Fizz | comms | [sour-fizz-comms-02.txt](sour-fizz-comms-02.txt) · block 1 |
| Ribbon Relay | Ribbons | comms | [sour-ribbons-comms-03.txt](sour-ribbons-comms-03.txt) · block 1 |
| Zingline | Sherbet | comms | [sour-sherbet-comms-01.txt](sour-sherbet-comms-01.txt) · block 1 |
| Sugar Twilight | Afterglow | bud | [sour-afterglow-bud-05.txt](sour-afterglow-bud-05.txt) · block 1 |
| Sugar Pucker | Bonbon | bud | [sour-bonbon-bud-04.txt](sour-bonbon-bud-04.txt) · block 1 |
| Fizzy Drop | Fizz | bud | [sour-fizz-bud-02.txt](sour-fizz-bud-02.txt) · block 1 |
| Sour Twist | Ribbons | bud | [sour-ribbons-bud-03.txt](sour-ribbons-bud-03.txt) · block 1 |
| Sherbet Speck | Sherbet | bud | [sour-sherbet-bud-01.txt](sour-sherbet-bud-01.txt) · block 1 |

## Forum-ready collection

[Preview-above-code forum masterpost](../forum-posts/sour-forum-masterpost.txt) · [Downloadable browser preview with Copy buttons](../forum-posts/sour-preview.html) · [All collections and numbered post parts](../forum-posts/README.md).
