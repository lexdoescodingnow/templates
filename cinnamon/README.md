# Cinnamon collection

Five threads, five comms and five buds. GIFs follow the composition: portrait pairs for paired frames, single portraits for contacts and narrow photo spaces, and image-free options for letters and tiny replies.

[Preview and code](cinnamon-collection-preview.html) · [Download collection](cinnamon-collection.zip)

## Threads

| Design | GIFs | Layout |
| --- | ---: | --- |
| [Ceylon Sonata](cinnamon-ceylon-sonata-thread-01.txt) | 2 | A bound folio with a coloured spine, engraved cinnamon quills and portraits cut into a shallow chevron. |
| [Quill and Quiet](cinnamon-quill-and-quiet-thread-02.txt) | 1 | An oversized literary title beside one slender portrait sliver. |
| [Canela Vellum](cinnamon-canela-vellum-thread-03.txt) | 1 | A vaulted vellum page with a double inset border and one panoramic portrait ribbon. |
| [Barkbound](cinnamon-barkbound-thread-04.txt) | 0 | A tinted title panel, generous manuscript text and an engraved signature beneath. |
| [Saigon Silk](cinnamon-saigon-silk-thread-05.txt) | 2 | A fine gradient binding with staggered silk-corner portraits and gently bracketed writing. |

## Comms

| Design | GIFs | Layout |
| --- | ---: | --- |
| [Cindertext](cinnamon-cindertext-comms-01.txt) | 1 | One character contact portrait, with the original device frame and message bubbles. |
| [Velvet Relay](cinnamon-velvet-relay-comms-02.txt) | 1 | One character contact portrait, with the original device frame and message bubbles. |
| [Quillwave](cinnamon-quillwave-comms-03.txt) | 1 | One character contact portrait, with the original device frame and message bubbles. |
| [Simmer Signal](cinnamon-simmer-signal-comms-04.txt) | 1 | One character contact portrait, with the original device frame and message bubbles. |
| [Afterglow Inbox](cinnamon-afterglow-inbox-comms-05.txt) | 0 | A lock-screen-inspired phone with a large clock and image-free notification cards. |

## Buds

| Design | GIFs | Layout |
| --- | ---: | --- |
| [Barklet](cinnamon-barklet-bud-01.txt) | 1 | One small character portrait beside a compact reply and the original themed details. |
| [Curlsong](cinnamon-curlsong-bud-02.txt) | 1 | One small character portrait beside a compact reply and the original themed details. |
| [Silkseed](cinnamon-silkseed-bud-03.txt) | 0 | A fine-lined, image-free reply slip with a literary heading. |
| [Cinderbud](cinnamon-cinderbud-bud-04.txt) | 2 | A double-spined miniature with curled portrait corners and a perforated text divider. |
| [Quilltip](cinnamon-quilltip-bud-05.txt) | 0 | An open little letter with a full-width reply and fine cinnamon engraving. |

## Editing and integration

Copy a complete `[dohtml]` block from a named `.txt` file. The editable `[url]`, `[name]`, `[text]`, image URLs, writing and comms time remain above the decoration and the stylesheet link. The supplied GIF URLs are examples, not a required pair.

Use the default layout in the table, or remove an image tag. If removing the final image, remove its empty portrait container too. Image-free layouts reclaim the space automatically. In previews with an editor, clearing a GIF URL omits that image from the preview and copied code; clearing both produces an image-free post. Custom edits are kept when switching designs.

Comms messages use ordinary `<p>` paragraphs; successive opening `<p>` tags work without closing tags or repeated classes. Device decoration is static. Buds encourage 100 words or fewer and never clip longer replies.

Use `<b>`, `<i>` and `<u>` inside `[dohtml]`; `<strong>` and `<em>` work too. Editors that accept `[b]`, `[i]` and `[u]` convert them to HTML. The inherited `--mgrgb1`, `--mgrgb2` and `--mgrgb3` colour the design and emphasis. Bold and underline use colours 1 → 2 → 3; italics use 3 → 2 → 1.

Explicit Blue Hour `html[color-mode="light"]` and `html[color-mode="dark"]` modes override the system fallback. Writing stays on neutral surfaces. Preview palette controls are samples; posts inherit the forum palette.

All current snippets use the fresh `cinnamon-media-v2.css` stylesheet. Older CSS files remain available for existing posts. Image-free reflow uses modern CSS `:has()` selectors. Hosted CSS, fonts and GIFs require internet access; font fallbacks remain available. Existing forum posts retain their original markup: paste the revised snippet to adopt its new GIF layout.

## Revision checks

The September 2026 GIF revision passed checks for all 180 posting snippets, 135 editor design selections, 540 zero/one/two-image editing states, 45 static copy panels and the twelve stylesheets. Writing and placeholders were preserved. The browser could not open local previews, so visual rendering and live JCink posting remain unverified.
