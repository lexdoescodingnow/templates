# Cashew · The Curved Line

Fifteen original designs for Cookie & Yiyun: five threads, five device comms and five compact buds.

[Open the editable preview](https://raw.githack.com/lexdoescodingnow/templates/main/cashew/cashew-collection-preview.html) · [Download the preview](https://github.com/lexdoescodingnow/templates/raw/refs/heads/main/cashew/cashew-collection-preview.html) · [Forum masterpost](../forum-posts/cashew-forum-masterpost.txt) · [Complete download](cashew-collection.zip)

Each preview appears above its copyable code. The HTML preview can be downloaded and opened in a browser. On GitHub, use **Copy raw file** on the individual `.txt` snippets.

## Threads

| Design | GIFs | Snippet |
| --- | ---: | --- |
| 01 · Reniform Reverie | 1 | [Reniform Reverie](cashew-reniform-reverie-thread-01.txt) |
| 02 · Under the Cashew Tree | 2 | [Under the Cashew Tree](cashew-under-the-cashew-tree-thread-02.txt) |
| 03 · Ivory Cotyledon | 1 | [Ivory Cotyledon](cashew-ivory-cotyledon-thread-03.txt) |
| 04 · Roast Register | 0 | [Roast Register](cashew-roast-register-thread-04.txt) |
| 05 · Anacardium Nocturne | 2 | [Anacardium Nocturne](cashew-anacardium-nocturne-thread-05.txt) |

## Comms

| Design | GIFs | Snippet |
| --- | ---: | --- |
| 01 · Cashew Calling | 1 | [Cashew Calling](cashew-cashew-calling-comms-01.txt) |
| 02 · Kernelink | 1 | [Kernelink](cashew-kernelink-comms-02.txt) |
| 03 · Roastwave | 1 | [Roastwave](cashew-roastwave-comms-03.txt) |
| 04 · Shellmail | 1 | [Shellmail](cashew-shellmail-comms-04.txt) |
| 05 · Caju Connect | 2 | [Caju Connect](cashew-caju-connect-comms-05.txt) |

## Buds

| Design | GIFs | Snippet |
| --- | ---: | --- |
| 01 · Seedcurl | 1 | [Seedcurl](cashew-seedcurl-bud-01.txt) |
| 02 · Cashewlet | 0 | [Cashewlet](cashew-cashewlet-bud-02.txt) |
| 03 · Ivory Nib | 2 | [Ivory Nib](cashew-ivory-nib-bud-03.txt) |
| 04 · Toasted Comma | 0 | [Toasted Comma](cashew-toasted-comma-bud-04.txt) |
| 05 · Caju Sprig | 1 | [Caju Sprig](cashew-caju-sprig-bud-05.txt) |

## Editing

Names, link URLs, titles, status, GIFs and paragraph text precede decoration and the single stylesheet link. The snippets and forum copy boxes retain Cookie & Yiyun, the requested Tumblr GIFs and lorem ipsum. [Placeholder variants](cashew-placeholder-masterpost.txt) retain literal `[url]`, `[name]` and `[text]` at the top; the editor has a dedicated copy button for them. No comments, hidden tips or editing notes appear inside posted HTML or CSS.

Inside `[dohtml]`, `<b>` / `<strong>`, `<i>` / `<em>`, and `<u>` carry the member gradients. The editor also accepts `[b]`, `[i]`, `[u]` and converts them into HTML when copying. Raw BBCode entered directly in a forum HTML block depends on that forum’s parser. Bold and underline run group 1 → 2 → 3; italics reverse the gradient.

All frames, heading accents and message borders inherit the forum variables `--mgrgb1`, `--mgrgb2`, `--mgrgb3`. Preview palettes are not copied into posting code. Neutral surfaces follow Blue Hour’s `html[color-mode="light"]` and `html[color-mode="dark"]`; an explicit mode takes precedence over the system preference.

Comms use plain `<p>` messages, including successive opening `<p>` tags without closing tags. Change `data-direction` between `received`, `sent`, and `alternating`. Device buttons are decorative. Buds are intended for replies of approximately 100 words or fewer, with no forced text clipping.

Clear a GIF field to remove its image or add a URL to include one. For hand edits, remove the image’s `cw1-shot` span; empty media containers collapse. Portrait crop positions are editable via `--cw-crop`, such as `50% 35%`. The image-free Roast Register, Cashewlet and Toasted Comma also accept images.

The preview embeds all layout CSS and the editor. Fonts and GIFs load online. Forum snippets need no JavaScript; they load one import-free stylesheet, `cashew-curved-line-v1.css`, with embedded font-face definitions. Layouts use modern container queries, `:has()` and `color-mix()`.

## Rebuilding

Run `node cashew/build.cjs`, then `python tools/build_forum_posts.py`, and `python cashew/package.py`. `designs.json` supplies the public names. The Cashew exception in `tools/forum_presentation.py` preserves the requested lorem ipsum in copyable code.

## Forum-ready collection

[Preview-above-code forum masterpost](../forum-posts/cashew-forum-masterpost.txt) · [Downloadable browser preview with Copy buttons](../forum-posts/cashew-preview.html) · [All collections and numbered post parts](../forum-posts/README.md).
