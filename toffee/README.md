# Toffee collection

Five threads, five comms and five buds. GIFs follow the composition: portrait pairs for paired frames, single portraits for contacts and narrow photo spaces, and image-free options for letters and tiny replies.

[Preview and code](toffee-collection-preview.html) · [Download collection](toffee-collection.zip)

## Threads

| Design | GIFs | Layout |
| --- | ---: | --- |
| [Butterglass](toffee-butterglass-thread-01.txt) | 2 | Paired arched portraits, a fine double frame, and a handwritten title. |
| [Slowmelt](toffee-slowmelt-thread-02.txt) | 2 | A panoramic portrait and overlapping circular keepsake. |
| [Velvet Pull](toffee-velvet-pull-thread-03.txt) | 1 | A single keepsake portrait with a delicate pulled-caramel line. |
| [Amberfold](toffee-amberfold-thread-04.txt) | 0 | A folded correspondence page with compact editorial lettering and no photographs. |
| [Hearthglow](toffee-hearthglow-thread-05.txt) | 1 | One oval portrait and soft arches in an intimate frame. |

## Comms

| Design | GIFs | Layout |
| --- | ---: | --- |
| [Sugarline](toffee-sugarline-comms-01.txt) | 1 | One character contact portrait, with the original device frame and message bubbles. |
| [Meltmail](toffee-meltmail-comms-02.txt) | 1 | One character contact portrait, with the original device frame and message bubbles. |
| [Caramel Call](toffee-caramel-call-comms-03.txt) | 1 | One character contact portrait, with the original device frame and message bubbles. |
| [Wrapper Chat](toffee-wrapper-chat-comms-04.txt) | 0 | A compact desktop chat window with a text contact header and incoming bubbles. |
| [Warm Signal](toffee-warm-signal-comms-05.txt) | 1 | One character contact portrait, with the original device frame and message bubbles. |

## Buds

| Design | GIFs | Layout |
| --- | ---: | --- |
| [Goldleaf](toffee-goldleaf-bud-01.txt) | 1 | One small character portrait beside a compact reply and the original themed details. |
| [Soft Bite](toffee-soft-bite-bud-02.txt) | 2 | A miniature arched diptych above a compact reply. |
| [Sugar Fleck](toffee-sugar-fleck-bud-03.txt) | 0 | A little reply with a fine member-colour rule and no image. |
| [Tiny Twist](toffee-tiny-twist-bud-04.txt) | 1 | One small character portrait beside a compact reply and the original themed details. |
| [Last Crumb](toffee-last-crumb-bud-05.txt) | 0 | An image-free miniature with a handwritten heading. |

## Editing and integration

Copy a complete `[dohtml]` block from a named `.txt` file. The editable `[url]`, `[name]`, `[text]`, image URLs, writing and comms time remain above the decoration and the stylesheet link. The supplied GIF URLs are examples, not a required pair.

Use the default layout in the table, or remove an image tag. If removing the final image, remove its empty portrait container too. Image-free layouts reclaim the space automatically. In previews with an editor, clearing a GIF URL omits that image from the preview and copied code; clearing both produces an image-free post. Custom edits are kept when switching designs.

Comms messages use ordinary `<p>` paragraphs; successive opening `<p>` tags work without closing tags or repeated classes. Device decoration is static. Buds encourage 100 words or fewer and never clip longer replies.

Use `<b>`, `<i>` and `<u>` inside `[dohtml]`; `<strong>` and `<em>` work too. Editors that accept `[b]`, `[i]` and `[u]` convert them to HTML. The inherited `--mgrgb1`, `--mgrgb2` and `--mgrgb3` colour the design and emphasis. Bold and underline use colours 1 → 2 → 3; italics use 3 → 2 → 1.

Explicit Blue Hour `html[color-mode="light"]` and `html[color-mode="dark"]` modes override the system fallback. Writing stays on neutral surfaces. Preview palette controls are samples; posts inherit the forum palette.

All current snippets use the fresh `toffee-media-v2.css` stylesheet. Older CSS files remain available for existing posts. Image-free reflow uses modern CSS `:has()` selectors. Hosted CSS, fonts and GIFs require internet access; font fallbacks remain available. Existing forum posts retain their original markup: paste the revised snippet to adopt its new GIF layout.

## Revision checks

The September 2026 GIF revision passed checks for all 180 posting snippets, 135 editor design selections, 540 zero/one/two-image editing states, 45 static copy panels and the twelve stylesheets. Writing and placeholders were preserved. The browser could not open local previews, so visual rendering and live JCink posting remain unverified.
