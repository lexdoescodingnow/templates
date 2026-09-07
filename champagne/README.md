# Champagne collection

Five threads, five comms and five buds. GIFs follow the composition: portrait pairs for paired frames, single portraits for contacts and narrow photo spaces, and image-free options for letters and tiny replies.

[Preview and code](champagne-collection-preview.html)

## Threads

| Design | GIFs | Layout |
| --- | ---: | --- |
| [Cuvée](champagne-cuvee.txt) | 2 |  |
| [Millésime](champagne-thread-millesime.txt) | 1 | A vintage bottle label with one landscape keepsake and ruled borders. |
| [Rosée](champagne-thread-rosee.txt) | 1 | A single oval portrait, softly curved borders and an italic heading. |
| [Éclat](champagne-thread-eclat.txt) | 2 |  |
| [Réserve](champagne-thread-reserve.txt) | 0 | A quiet, image-free letter with fine rules and a footer signature. |

## Comms

| Design | GIFs | Layout |
| --- | ---: | --- |
| [Perlage](champagne-comms-perlage.txt) | 1 |  |
| [Flûte](champagne-comms-flute.txt) | 1 |  |
| [Tchin](champagne-comms-tchin.txt) | 1 |  |
| [Capsule](champagne-comms-capsule.txt) | 1 |  |
| [Veillée](champagne-comms-veillee.txt) | 1 |  |

## Buds

| Design | GIFs | Layout |
| --- | ---: | --- |
| [Mignon](champagne-bud-mignon.txt) | 1 | A compact double-framed card with one miniature portrait medallion. |
| [Perle](champagne-bud-perle.txt) | 1 |  |
| [Pétale](champagne-bud-petale.txt) | 1 |  |
| [Étincelle](champagne-bud-etincelle.txt) | 0 | A crisp image-free note with a diamond accent and footer signature. |
| [Goutte](champagne-bud-goutte.txt) | 0 | A slim colour ribbon and an uncluttered short reply. |

## Editing and integration

Copy a complete `[dohtml]` block from a named `.txt` file. The editable `[url]`, `[name]`, `[text]`, image URLs, writing and comms time remain above the decoration and the stylesheet link. The supplied GIF URLs are examples, not a required pair.

Use the default layout in the table, or remove an image tag. If removing the final image, remove its empty portrait container too. Image-free layouts reclaim the space automatically. In previews with an editor, clearing a GIF URL omits that image from the preview and copied code; clearing both produces an image-free post. Custom edits are kept when switching designs.

Comms messages use ordinary `<p>` paragraphs; successive opening `<p>` tags work without closing tags or repeated classes. Device decoration is static. Buds encourage 100 words or fewer and never clip longer replies.

Use `<b>`, `<i>` and `<u>` inside `[dohtml]`; `<strong>` and `<em>` work too. Editors that accept `[b]`, `[i]` and `[u]` convert them to HTML. The inherited `--mgrgb1`, `--mgrgb2` and `--mgrgb3` colour the design and emphasis. Bold and underline use colours 1 → 2 → 3; italics use 3 → 2 → 1.

Explicit Blue Hour `html[color-mode="light"]` and `html[color-mode="dark"]` modes override the system fallback. Writing stays on neutral surfaces. Preview palette controls are samples; posts inherit the forum palette.

All current snippets use the fresh `champagne-media-v2.css` stylesheet. Older CSS files remain available for existing posts. Image-free reflow uses modern CSS `:has()` selectors. Hosted CSS, fonts and GIFs require internet access; font fallbacks remain available. Existing forum posts retain their original markup: paste the revised snippet to adopt its new GIF layout.

## Revision checks

The September 2026 GIF revision passed checks for all 180 posting snippets, 135 editor design selections, 540 zero/one/two-image editing states, 45 static copy panels and the twelve stylesheets. Writing and placeholders were preserved. The browser could not open local previews, so visual rendering and live JCink posting remain unverified.
