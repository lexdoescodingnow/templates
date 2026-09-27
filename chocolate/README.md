# Chocolate collection

Five threads, five comms and five buds for Jake & River. Member colours now lead the headings, frames, foil, ribbons, melted edges and message bubbles, with neutral light/dark surfaces and small cacao and chocolate-square accents. GIFs follow the composition: portrait pairs for paired frames, single portraits for contacts and narrow photo spaces, and image-free options for letters and tiny replies.

[Preview and code](chocolate-collection-preview.html) · [Download collection](chocolate-collection.zip)

## Threads

| Design | GIFs | Layout |
| --- | ---: | --- |
| [Ganache](chocolate-ganache-thread-01.txt) | 2 | Melted edges · member-colour filigree · portrait arches |
| [Praliné](chocolate-praline-thread-02.txt) | 1 | Folded foil · chocolate squares · crisp frame |
| [Truffle](chocolate-truffle-thread-03.txt) | 1 | Rounded silhouettes · piped borders · circular portrait |
| [Gianduja](chocolate-gianduja-thread-04.txt) | 2 | Slim member-colour edge · aligned portrait pair |
| [Noir](chocolate-noir-thread-05.txt) | 0 | An image-free literary page with fine themed details. |

## Comms

| Design | GIFs | Layout |
| --- | ---: | --- |
| [Fondant Line](chocolate-ganache-comms-01.txt) | 1 | One character contact portrait, with the original device frame and message bubbles. |
| [Rocher Relay](chocolate-praline-comms-02.txt) | 0 | A text contact header and clean message bubbles. |
| [Cocoa Call](chocolate-truffle-comms-03.txt) | 1 | One character contact portrait, with the original device frame and message bubbles. |
| [Nocciola](chocolate-gianduja-comms-04.txt) | 1 | One character contact portrait, with the original device frame and message bubbles. |
| [Midnight Dispatch](chocolate-noir-comms-05.txt) | 1 | One character contact portrait, with the original device frame and message bubbles. |

## Buds

| Design | GIFs | Layout |
| --- | ---: | --- |
| [Velvet Drop](chocolate-ganache-buds-01.txt) | 1 | One small character portrait beside a compact reply and the original themed details. |
| [Feuilletine](chocolate-praline-buds-02.txt) | 0 | A compact image-free note for a quick reply. |
| [Cocoa Dust](chocolate-truffle-buds-03.txt) | 1 | One small character portrait beside a compact reply and the original themed details. |
| [Cremino](chocolate-gianduja-buds-04.txt) | 2 | Slim member-colour edge · compact portrait strip |
| [Darkling](chocolate-noir-buds-05.txt) | 0 | A compact image-free note for a quick reply. |

## Editing and integration

Copy a complete `[dohtml]` block from the forum masterpost for short writing placeholders, or from a named `.txt` file for sample writing. Editable links, names, titles, image URLs, writing and comms time remain above the decoration and the stylesheet link. The supplied GIF URLs are examples, not a required pair.

Use the default layout in the table, or remove an image tag. If removing the final image, remove its empty portrait container too. Image-free layouts reclaim the space automatically. In previews with an editor, clearing a GIF URL omits that image from the preview and copied code; clearing both produces an image-free post. Custom edits are kept when switching designs.

Comms messages use ordinary `<p>` paragraphs; successive opening `<p>` tags work without closing tags or repeated classes. Device decoration is static. Buds encourage 100 words or fewer and never clip longer replies.

Use `<b>`, `<i>` and `<u>` inside `[dohtml]`; `<strong>` and `<em>` work too. Editors that accept `[b]`, `[i]` and `[u]` convert them to HTML. The inherited `--mgrgb1`, `--mgrgb2` and `--mgrgb3` colour the design and emphasis. Bold and underline use colours 1 → 2 → 3; italics use 3 → 2 → 1.

Explicit Blue Hour `html[color-mode="light"]` and `html[color-mode="dark"]` modes override the system fallback. Writing stays on neutral surfaces. Preview palette controls are samples; posts inherit the forum palette.

All current snippets use the fresh standalone `chocolate-layout-v4.css` stylesheet. The `chocolate-members-v3` class applies member colours; `chocolate-layout-v4` applies the revised graphics and footer. Paste the revised snippet to adopt the update. Existing posts retain their previous appearance until updated. Image-free reflow uses modern CSS `:has()` selectors. Hosted CSS and GIFs require internet access.

The member icon now occupies the central footer emblem, clear of portraits and writing. If no member icon is supplied, a small cacao motif fills the slot. Gianduja, Nocciola and Cremino use a slim colour ribbon and explicit portrait grids, with no overlapping leaf graphic or offset photos.

The three inherited member colours drive the design; no member variables are set on the template itself. Headings mix the group hues with neutral ink for legibility. Soft washes use those same hues at lower opacity. A neutral fallback applies only when the forum provides no member colours.

To rebuild, edit `chocolate-member-theme-v3.css` for colours or `chocolate-layout-fixes-v4.css` for layout, then run `python tools/build_chocolate_members.py` and `python tools/build_forum_posts.py`. The first command combines the existing layout stylesheet with the scoped colour and layout rules and refreshes the snippets and editor. The second refreshes the forum masterpost and preview.

## Revision checks

The collection retains five threads, five comms and five buds, with fifteen unique names. The graphics revision retains the supplied images, writing and editable fields. Checks cover narrow and wide layouts, removed images, explicit and system light/dark modes, and coexistence with older Chocolate stylesheets in either load order. Live JCink rendering remains unverified.

## Design names

Each design has a unique catalogue name. Existing filenames remain stable for saved links.

| Current name | Previous label | Format | Source |
| --- | --- | --- | --- |
| Fondant Line | Ganache | comms | [chocolate-ganache-comms-01.txt](chocolate-ganache-comms-01.txt) · block 1 |
| Nocciola | Gianduja | comms | [chocolate-gianduja-comms-04.txt](chocolate-gianduja-comms-04.txt) · block 1 |
| Midnight Dispatch | Noir | comms | [chocolate-noir-comms-05.txt](chocolate-noir-comms-05.txt) · block 1 |
| Rocher Relay | Praliné | comms | [chocolate-praline-comms-02.txt](chocolate-praline-comms-02.txt) · block 1 |
| Cocoa Call | Truffle | comms | [chocolate-truffle-comms-03.txt](chocolate-truffle-comms-03.txt) · block 1 |
| Velvet Drop | Ganache | bud | [chocolate-ganache-buds-01.txt](chocolate-ganache-buds-01.txt) · block 1 |
| Cremino | Gianduja | bud | [chocolate-gianduja-buds-04.txt](chocolate-gianduja-buds-04.txt) · block 1 |
| Darkling | Noir | bud | [chocolate-noir-buds-05.txt](chocolate-noir-buds-05.txt) · block 1 |
| Feuilletine | Praliné | bud | [chocolate-praline-buds-02.txt](chocolate-praline-buds-02.txt) · block 1 |
| Cocoa Dust | Truffle | bud | [chocolate-truffle-buds-03.txt](chocolate-truffle-buds-03.txt) · block 1 |

## Forum-ready collection

[Preview-above-code forum masterpost](../forum-posts/chocolate-forum-masterpost.txt) · [Downloadable browser preview with Copy buttons](../forum-posts/chocolate-preview.html) · [All collections and numbered post parts](../forum-posts/README.md).
