# Chocolate collection

Five threads, five comms and five buds. GIFs follow the composition: portrait pairs for paired frames, single portraits for contacts and narrow photo spaces, and image-free options for letters and tiny replies.

[Preview and code](chocolate-collection-preview.html) · [Download collection](chocolate-collection.zip)

## Threads

| Design | GIFs | Layout |
| --- | ---: | --- |
| [Ganache](chocolate-ganache-thread-01.txt) | 2 | Melted edges · gold filigree · portrait arches |
| [Praliné](chocolate-praline-thread-02.txt) | 1 | Folded foil · chocolate squares · crisp frame |
| [Truffle](chocolate-truffle-thread-03.txt) | 1 | Rounded silhouettes · piped borders · circular portrait |
| [Gianduja](chocolate-gianduja-thread-04.txt) | 2 | Cocoa ribbon · engraved leaves · offset portraits |
| [Noir](chocolate-noir-thread-05.txt) | 0 | An image-free literary page with fine themed details. |

## Comms

| Design | GIFs | Layout |
| --- | ---: | --- |
| [Ganache](chocolate-ganache-comms-01.txt) | 1 | One character contact portrait, with the original device frame and message bubbles. |
| [Praliné](chocolate-praline-comms-02.txt) | 0 | A text contact header and clean message bubbles. |
| [Truffle](chocolate-truffle-comms-03.txt) | 1 | One character contact portrait, with the original device frame and message bubbles. |
| [Gianduja](chocolate-gianduja-comms-04.txt) | 1 | One character contact portrait, with the original device frame and message bubbles. |
| [Noir](chocolate-noir-comms-05.txt) | 1 | One character contact portrait, with the original device frame and message bubbles. |

## Buds

| Design | GIFs | Layout |
| --- | ---: | --- |
| [Ganache](chocolate-ganache-buds-01.txt) | 1 | One small character portrait beside a compact reply and the original themed details. |
| [Praliné](chocolate-praline-buds-02.txt) | 0 | A compact image-free note for a quick reply. |
| [Truffle](chocolate-truffle-buds-03.txt) | 1 | One small character portrait beside a compact reply and the original themed details. |
| [Gianduja](chocolate-gianduja-buds-04.txt) | 2 | Cocoa ribbon · engraved leaves · offset portraits |
| [Noir](chocolate-noir-buds-05.txt) | 0 | A compact image-free note for a quick reply. |

## Editing and integration

Copy a complete `[dohtml]` block from a named `.txt` file. The editable `[url]`, `[name]`, `[text]`, image URLs, writing and comms time remain above the decoration and the stylesheet link. The supplied GIF URLs are examples, not a required pair.

Use the default layout in the table, or remove an image tag. If removing the final image, remove its empty portrait container too. Image-free layouts reclaim the space automatically. In previews with an editor, clearing a GIF URL omits that image from the preview and copied code; clearing both produces an image-free post. Custom edits are kept when switching designs.

Comms messages use ordinary `<p>` paragraphs; successive opening `<p>` tags work without closing tags or repeated classes. Device decoration is static. Buds encourage 100 words or fewer and never clip longer replies.

Use `<b>`, `<i>` and `<u>` inside `[dohtml]`; `<strong>` and `<em>` work too. Editors that accept `[b]`, `[i]` and `[u]` convert them to HTML. The inherited `--mgrgb1`, `--mgrgb2` and `--mgrgb3` colour the design and emphasis. Bold and underline use colours 1 → 2 → 3; italics use 3 → 2 → 1.

Explicit Blue Hour `html[color-mode="light"]` and `html[color-mode="dark"]` modes override the system fallback. Writing stays on neutral surfaces. Preview palette controls are samples; posts inherit the forum palette.

All current snippets use the fresh `chocolate-media-v2.css` stylesheet. Older CSS files remain available for existing posts. Image-free reflow uses modern CSS `:has()` selectors. Hosted CSS, fonts and GIFs require internet access; font fallbacks remain available. Existing forum posts retain their original markup: paste the revised snippet to adopt its new GIF layout.

## Revision checks

The September 2026 GIF revision passed checks for all 180 posting snippets, 135 editor design selections, 540 zero/one/two-image editing states, 45 static copy panels and the twelve stylesheets. Writing and placeholders were preserved. The browser could not open local previews, so visual rendering and live JCink posting remain unverified.
