# Lemon collection

Five threads, five comms and five buds. GIFs follow the composition: portrait pairs for paired frames, single portraits for contacts and narrow photo spaces, and image-free options for letters and tiny replies.

[Preview and code](lemon-collection-preview.html) · [Download collection](lemon-collection.zip)

## Threads

| Design | GIFs | Layout |
| --- | ---: | --- |
| [Limoneto](lemon-limoneto-thread-01.txt) | 2 | Paired lemon-shaped portraits, a climbing branch, and a sweeping handwritten title. |
| [Sorrento Vow](lemon-sorrento-vow-thread-02.txt) | 2 | A formal portrait diptych above a centred invitation-style title and thorn-rule finish. |
| [Verna Reverie](lemon-verna-reverie-thread-03.txt) | 0 | An image-free romantic page with a right-aligned script title and botanical finish. |
| [Lunario](lemon-lunario-thread-04.txt) | 1 | One leaf-lens portrait, curved orbit lines and a tiny blossom garland. |
| [Primofiore](lemon-primofiore-thread-05.txt) | 1 | A clean blossom masthead, colour-banded portrait, and a fine writing rule. |

## Comms

| Design | GIFs | Layout |
| --- | ---: | --- |
| [Limone Line](lemon-limone-line-comms-01.txt) | 1 | One character contact portrait, with the original device frame and message bubbles. |
| [Amalfi Air](lemon-amalfi-air-comms-02.txt) | 1 | One character contact portrait, with the original device frame and message bubbles. |
| [Citron Relay](lemon-citron-relay-comms-03.txt) | 1 | One character contact portrait, with the original device frame and message bubbles. |
| [Verdello Voice](lemon-verdello-voice-comms-04.txt) | 1 | One character contact portrait, with the original device frame and message bubbles. |
| [Sfusato Signal](lemon-sfusato-signal-comms-05.txt) | 1 | One character contact portrait, with the original device frame and message bubbles. |

## Buds

| Design | GIFs | Layout |
| --- | ---: | --- |
| [Petalprick](lemon-petalprick-bud-01.txt) | 1 | One small character portrait beside a compact reply and the original themed details. |
| [Lemonlet](lemon-lemonlet-bud-02.txt) | 1 | One small character portrait beside a compact reply and the original themed details. |
| [Pollen Promise](lemon-pollen-promise-bud-03.txt) | 0 | A little centred promise with a blossom signature below the reply. |
| [Dewdrop Pact](lemon-dewdrop-pact-bud-04.txt) | 2 | Two miniature leaf lenses above a short reply and a delicate garland. |
| [Tenderthorn](lemon-tenderthorn-bud-05.txt) | 0 | A slender botanical note with a script title and no photographs. |

## Editing and integration

Copy a complete `[dohtml]` block from a named `.txt` file. The editable `[url]`, `[name]`, `[text]`, image URLs, writing and comms time remain above the decoration and the stylesheet link. The supplied GIF URLs are examples, not a required pair.

Use the default layout in the table, or remove an image tag. If removing the final image, remove its empty portrait container too. Image-free layouts reclaim the space automatically. In previews with an editor, clearing a GIF URL omits that image from the preview and copied code; clearing both produces an image-free post. Custom edits are kept when switching designs.

Comms messages use ordinary `<p>` paragraphs; successive opening `<p>` tags work without closing tags or repeated classes. Device decoration is static. Buds encourage 100 words or fewer and never clip longer replies.

Use `<b>`, `<i>` and `<u>` inside `[dohtml]`; `<strong>` and `<em>` work too. Editors that accept `[b]`, `[i]` and `[u]` convert them to HTML. The inherited `--mgrgb1`, `--mgrgb2` and `--mgrgb3` colour the design and emphasis. Bold and underline use colours 1 → 2 → 3; italics use 3 → 2 → 1.

Explicit Blue Hour `html[color-mode="light"]` and `html[color-mode="dark"]` modes override the system fallback. Writing stays on neutral surfaces. Preview palette controls are samples; posts inherit the forum palette.

All current snippets use the fresh `lemon-media-v2.css` stylesheet. Older CSS files remain available for existing posts. Image-free reflow uses modern CSS `:has()` selectors. Hosted CSS, fonts and GIFs require internet access; font fallbacks remain available. Existing forum posts retain their original markup: paste the revised snippet to adopt its new GIF layout.

## Revision checks

The September 2026 GIF revision passed checks for all 180 posting snippets, 135 editor design selections, 540 zero/one/two-image editing states, 45 static copy panels and the twelve stylesheets. Writing and placeholders were preserved. The browser could not open local previews, so visual rendering and live JCink posting remain unverified.
