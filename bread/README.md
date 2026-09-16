# Bread · Second Rise

A fresh 15-design collection for Jinseok and Lucas.

[Download the preview and editor](https://github.com/lexdoescodingnow/templates/raw/refs/heads/main/bread/bread-second-rise-preview.html) · [Preview HTML source](bread-second-rise-preview.html) · [Forum showcase](bread-second-rise-forum-post.txt)

Download the HTML preview and open it in your browser. GitHub displays HTML source. To use a template directly from GitHub, open its named `.txt` file below, click **Copy raw file**, and paste the full block into your forum post.

## Threads

| Design | GIFs | Layout |
| --- | ---: | --- |
| [01 · Crumb Structure](bread-crumb-structure-thread-01.txt) | 2 | Sculpted, staggered portrait panels over a generous editorial reply. |
| [02 · Pullman Nocturne](bread-pullman-nocturne-thread-02.txt) | 1 | A ridged loaf-tin frame, cooling-rack edge, and panoramic closing portrait. |
| [03 · Plaited Vows](bread-plaited-vows-thread-03.txt) | 2 | An interwoven spine and overlapping round portraits, made for two. |
| [04 · Fougasse Folio](bread-fougasse-folio-thread-04.txt) | 0 | An open writing page with a cut-leaf silhouette and a generous drop cap. |
| [05 · Baker’s Measure](bread-bakers-measure-thread-05.txt) | 1 | A measured top edge, tall side portrait, and full-width writing below. |

## Comms

| Design | GIFs | Layout |
| --- | ---: | --- |
| [01 · Crust Signal](bread-crust-signal-comms-01.txt) | 1 | A soft modern phone with a contact portrait, a camera island, and grouped bubbles. |
| [02 · Loafline](bread-loafline-comms-02.txt) | 1 | A compact candybar handset with a separate screen and a physical number pad. |
| [03 · Starter Sync](bread-starter-sync-comms-03.txt) | 1 | A folding phone with a large cover portrait and a visible hinge. |
| [04 · Brioche Buffer](bread-brioche-buffer-comms-04.txt) | 2 | A small tablet messenger with two profile tiles in its contact rail. |
| [05 · Toastwave](bread-toastwave-comms-05.txt) | 0 | A slim lock-screen phone with stacked notification cards and a large editable clock. |

## Buds

| Design | GIFs | Layout |
| --- | ---: | --- |
| [01 · Croûton](bread-crouton-bud-01.txt) | 0 | A tiny open-corner note with a single toasted square accent. |
| [02 · Pinch of Rye](bread-pinch-of-rye-bud-02.txt) | 1 | A pinched corner, small rounded portrait, and a compact reply. |
| [03 · Little Plait](bread-little-plait-bud-03.txt) | 2 | A miniature woven sign-off with two overlapping portrait seals. |
| [04 · Heel & Heart](bread-heel-and-heart-bud-04.txt) | 0 | A rounded loaf-heel silhouette for a short, writing-led reply. |
| [05 · Last Morsel](bread-last-morsel-bud-05.txt) | 1 | A narrow portrait tucked beside the reply and a broken crust edge. |

## Editing

Copy a named `.txt` block into a JCink post. Keep its `[dohtml]` tags and the single stylesheet link. The `[url]`, `[name]` and `[text]` fields, GIF URLs and writing come before the decorative markup and linked CSS. All notes live in this guide and the preview interface; the templates contain no comments or hidden instructions.

Use `<b>`, `<i>` and `<u>` inside `[dohtml]`; `<strong>` and `<em>` also work. The preview editor accepts `[b]`, `[i]` and `[u]` and converts them before copying. Literal BBCode pasted directly into an HTML block depends on the forum parser. Bold and underline use group colours 1 → 2 → 3; italics reverse them. The inherited `--mgrgb1`, `--mgrgb2`, `--mgrgb3` variables must contain comma-separated RGB values.

Neutral paper and writing surfaces follow Blue Hour’s `html[color-mode="light"]` and `html[color-mode="dark"]`. An explicit mode wins over the system preference. Preview palettes are samples and are never written into posting snippets. Headers, edges, portrait frames, ornament details, links and emphasis use the member colours. Main writing stays neutral for readability.

Each comms message is a plain `<p>` paragraph; successive opening tags work without closing tags. Change the wrapper’s `data-direction` to `received`, `sent`, or `alternating`. The device controls are decorative and do not send messages. Buds use short sample replies for posts of 100 words or fewer; longer writing expands normally.

Images are optional in all 15 designs. Clear either GIF field in the editor, or delete the relevant image tags from a snippet. Empty image containers collapse and the layout reflows. The supplied Tumblr GIF URLs are preserved exactly. Device layouts have zero, one or two default portraits as appropriate.

The downloadable preview includes its CSS and editor, so its layout works when opened locally. GIFs still need access to Tumblr. Templates need the hosted CSS file; they use system fonts and no JavaScript. The forum showcase places a rendered template above each native `[code]` block. Click-to-copy on the forum depends on the skin’s code-block controls; the HTML preview has its own Copy code buttons.

## Earlier Bread collection

[Original 15 designs and guide](bread-original-collection.md) · [Original preview](bread-collection-preview.html)

## Source

`bread-second-rise-v1.css` contains the scoped posting styles. `second-rise-build.cjs` generates all 15 snippets, the standalone preview, this guide and the forum showcase. `second-rise-preview.css` and `second-rise-preview.js` are preview-only sources. Rebuild with `node bread/second-rise-build.cjs`.
