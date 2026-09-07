# Marmalade collection

Five threads, five comms and five buds. GIFs follow the composition: portrait pairs for paired frames, single portraits for contacts and narrow photo spaces, and image-free options for letters and tiny replies.

[Preview and code](marmalade-collection-preview.html) · [Download collection](marmalade-collection.zip)

## Threads

| Design | GIFs | Layout |
| --- | ---: | --- |
| [Stillgold](marmalade-stillgold-thread-01.txt) | 2 | Fine window frames, paired portraits, and a botanical finish. |
| [Seville Ledger](marmalade-seville-ledger-thread-02.txt) | 1 | A stitched preserve label with one keepsake photo stamp. |
| [Sunday Preserve](marmalade-sunday-preserve-thread-03.txt) | 1 | A gingham jar collar, soft shoulders, and handwritten lettering. |
| [Amberlight](marmalade-amberlight-thread-04.txt) | 1 | A narrow portrait rail beside an intimate column of writing. |
| [Dear Clement](marmalade-dear-clement-thread-05.txt) | 0 | A small image-free correspondence card with botanical details. |

## Comms

| Design | GIFs | Layout |
| --- | ---: | --- |
| [Rindline](marmalade-rindline-comms-01.txt) | 1 | One character contact portrait, with the original device frame and message bubbles. |
| [Citrus Dial](marmalade-citrus-dial-comms-02.txt) | 1 | One character contact portrait, with the original device frame and message bubbles. |
| [Jar Notes](marmalade-jar-notes-comms-03.txt) | 0 | A desktop messenger with a text contact header and tinted note-like bubbles. |
| [Pectin Ping](marmalade-pectin-ping-comms-04.txt) | 1 | One character contact portrait, with the original device frame and message bubbles. |
| [Sweet Reception](marmalade-sweet-reception-comms-05.txt) | 1 | One character contact portrait, with the original device frame and message bubbles. |

## Buds

| Design | GIFs | Layout |
| --- | ---: | --- |
| [Little Preserve](marmalade-little-preserve-bud-01.txt) | 1 | One small character portrait beside a compact reply and the original themed details. |
| [Peel Kiss](marmalade-peel-kiss-bud-02.txt) | 2 | Two overlapping portrait coins and a delicate citrus-peel flourish. |
| [Sugar Pip](marmalade-sugar-pip-bud-03.txt) | 0 | A small stitched note with a compact image-free reply. |
| [Morning Spoon](marmalade-morning-spoon-bud-04.txt) | 0 | A fine-lined miniature letter with room for a quick reply. |
| [Last Zest](marmalade-last-zest-bud-05.txt) | 1 | One small character portrait beside a compact reply and the original themed details. |

## Editing and integration

Copy a complete `[dohtml]` block from a named `.txt` file. The editable `[url]`, `[name]`, `[text]`, image URLs, writing and comms time remain above the decoration and the stylesheet link. The supplied GIF URLs are examples, not a required pair.

Use the default layout in the table, or remove an image tag. If removing the final image, remove its empty portrait container too. Image-free layouts reclaim the space automatically. In previews with an editor, clearing a GIF URL omits that image from the preview and copied code; clearing both produces an image-free post. Custom edits are kept when switching designs.

Comms messages use ordinary `<p>` paragraphs; successive opening `<p>` tags work without closing tags or repeated classes. Device decoration is static. Buds encourage 100 words or fewer and never clip longer replies.

Use `<b>`, `<i>` and `<u>` inside `[dohtml]`; `<strong>` and `<em>` work too. Editors that accept `[b]`, `[i]` and `[u]` convert them to HTML. The inherited `--mgrgb1`, `--mgrgb2` and `--mgrgb3` colour the design and emphasis. Bold and underline use colours 1 → 2 → 3; italics use 3 → 2 → 1.

Explicit Blue Hour `html[color-mode="light"]` and `html[color-mode="dark"]` modes override the system fallback. Writing stays on neutral surfaces. Preview palette controls are samples; posts inherit the forum palette.

All current snippets use the fresh `marmalade-media-v2.css` stylesheet. Older CSS files remain available for existing posts. Image-free reflow uses modern CSS `:has()` selectors. Hosted CSS, fonts and GIFs require internet access; font fallbacks remain available. Existing forum posts retain their original markup: paste the revised snippet to adopt its new GIF layout.

## Revision checks

The September 2026 GIF revision passed checks for all 180 posting snippets, 135 editor design selections, 540 zero/one/two-image editing states, 45 static copy panels and the twelve stylesheets. Writing and placeholders were preserved. The browser could not open local previews, so visual rendering and live JCink posting remain unverified.
