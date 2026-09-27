# Potato · Earth & Edge

Fifteen original designs for Minwoo & Phoenix: five threads, five device comms and five compact buds.

[Open the editable preview](https://raw.githack.com/lexdoescodingnow/templates/main/potato/potato-collection-preview.html) · [Download the preview](https://github.com/lexdoescodingnow/templates/raw/refs/heads/main/potato/potato-collection-preview.html) · [Forum masterpost](../forum-posts/potato-forum-masterpost.txt) · [Complete download](potato-collection.zip)

Each preview appears above its copyable code. The HTML preview can be downloaded and opened in a browser. On GitHub, use **Copy raw file** on the individual `.txt` snippets.

## Threads

| Design | GIFs | Snippet |
| --- | ---: | --- |
| 01 · Furrow & Fable | 1 | [Furrow & Fable](potato-furrow-and-fable-thread-01.txt) |
| 02 · Hasselback Hours | 2 | [Hasselback Hours](potato-hasselback-hours-thread-02.txt) |
| 03 · Foil Moon | 2 | [Foil Moon](potato-foil-moon-thread-03.txt) |
| 04 · Russet Press | 0 | [Russet Press](potato-russet-press-thread-04.txt) |
| 05 · Solanum Study | 1 | [Solanum Study](potato-solanum-study-thread-05.txt) |

## Comms

| Design | GIFs | Snippet |
| --- | ---: | --- |
| 01 · Spudline | 1 | [Spudline](potato-spudline-comms-01.txt) |
| 02 · Tater Text | 1 | [Tater Text](potato-tater-text-comms-02.txt) |
| 03 · Crinkle Chat | 2 | [Crinkle Chat](potato-crinkle-chat-comms-03.txt) |
| 04 · Jacket Pocket | 1 | [Jacket Pocket](potato-jacket-pocket-comms-04.txt) |
| 05 · Chit Circuit | 0 | [Chit Circuit](potato-chit-circuit-comms-05.txt) |

## Buds

| Design | GIFs | Snippet |
| --- | ---: | --- |
| 01 · Potato Eye | 1 | [Potato Eye](potato-potato-eye-bud-01.txt) |
| 02 · Wedgelet | 0 | [Wedgelet](potato-wedgelet-bud-02.txt) |
| 03 · Salt Fleck | 1 | [Salt Fleck](potato-salt-fleck-bud-03.txt) |
| 04 · Twin Tubers | 2 | [Twin Tubers](potato-twin-tubers-bud-04.txt) |
| 05 · Rootbound Kiss | 0 | [Rootbound Kiss](potato-rootbound-kiss-bud-05.txt) |

## Editing

Names, link URLs, titles, status, GIFs and paragraph text precede decoration and the single stylesheet link. The snippets and forum copy boxes retain Minwoo & Phoenix, the requested Tumblr GIFs and lorem ipsum. [Placeholder variants](potato-placeholder-masterpost.txt) retain literal `[url]`, `[name]` and `[text]` at the top; the editor has a dedicated copy button for them. No comments, hidden tips or editing notes appear inside posted HTML or CSS.

Inside `[dohtml]`, `<b>` / `<strong>`, `<i>` / `<em>`, and `<u>` carry the member gradients. The editor also accepts `[b]`, `[i]`, `[u]` and converts them into HTML when copying. Raw BBCode entered directly in a forum HTML block depends on that forum’s parser. Bold and underline run group 1 → 2 → 3; italics reverse the gradient.

All frames, heading accents and message borders inherit the forum variables `--mgrgb1`, `--mgrgb2`, `--mgrgb3`. Preview palettes are not copied into posting code. Neutral surfaces follow Blue Hour’s `html[color-mode="light"]` and `html[color-mode="dark"]`; an explicit mode takes precedence over the system preference.

Comms use plain `<p>` messages, including successive opening `<p>` tags without closing tags. Change `data-direction` between `received`, `sent`, and `alternating`. Device buttons are decorative. Buds are intended for replies of approximately 100 words or fewer, with no forced text clipping.

Clear a GIF field to remove its image or add a URL to include one. For hand edits, remove the image’s `pt1-shot` span; empty media containers collapse. Portrait crop positions are editable via `--pt-crop`, such as `50% 35%`. The image-free Russet Press, Chit Circuit, Wedgelet and Rootbound Kiss also accept images.

The preview embeds all layout CSS and the editor. GIFs load online. Forum snippets need no JavaScript; they load one import-free stylesheet, `potato-earth-and-edge-v1.css`, using local system fonts. Layouts use modern container queries, `:has()` and `color-mix()`.

## Rebuilding

Run `node potato/build.cjs`, then `python tools/build_forum_posts.py`, and `python potato/package.py`. `designs.json` supplies the public names. The Potato exception in `tools/forum_presentation.py` preserves the requested lorem ipsum in copyable code.

## Forum-ready collection

[Preview-above-code forum masterpost](../forum-posts/potato-forum-masterpost.txt) · [Downloadable browser preview with Copy buttons](../forum-posts/potato-preview.html) · [All collections and numbered post parts](../forum-posts/README.md).
