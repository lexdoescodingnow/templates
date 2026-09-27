# Cereal · First Pour

Fifteen original designs for Hoseong & Sam: five threads, five device comms and five compact buds.

[Open the live editable preview](https://raw.githack.com/lexdoescodingnow/templates/main/cereal/cereal-collection-preview.html) · [Download the editor](https://github.com/lexdoescodingnow/templates/raw/refs/heads/main/cereal/cereal-collection-preview.html) · [Forum masterpost](../forum-posts/cereal-forum-masterpost.txt) · [Complete Cereal download](cereal-collection.zip)

Download the HTML preview and open it in your browser to view, edit and copy. GitHub itself displays the HTML source. Individual `.txt` files below can be copied directly with GitHub’s **Copy raw file** button.

## Threads

| Design | GIFs | Snippet |
| --- | ---: | --- |
| 01 · Breakfast Club | 2 | [Breakfast Club](cereal-breakfast-club-thread-01.txt) |
| 02 · Spoon Theory | 1 | [Spoon Theory](cereal-spoon-theory-thread-02.txt) |
| 03 · Prize Inside | 0 | [Prize Inside](cereal-prize-inside-thread-03.txt) |
| 04 · Orbit O’s | 2 | [Orbit O’s](cereal-orbit-os-thread-04.txt) |
| 05 · After the Crunch | 1 | [After the Crunch](cereal-after-the-crunch-thread-05.txt) |

## Comms

| Design | GIFs | Snippet |
| --- | ---: | --- |
| 01 · Crunchline | 1 | [Crunchline](cereal-crunchline-comms-01.txt) |
| 02 · Loopback | 1 | [Loopback](cereal-loopback-comms-02.txt) |
| 03 · Snap Dispatch | 2 | [Snap Dispatch](cereal-snap-dispatch-comms-03.txt) |
| 04 · Breakfast Broadcast | 1 | [Breakfast Broadcast](cereal-breakfast-broadcast-comms-04.txt) |
| 05 · Spoonful SMS | 0 | [Spoonful SMS](cereal-spoonful-sms-comms-05.txt) |

## Buds

| Design | GIFs | Snippet |
| --- | ---: | --- |
| 01 · Little Loop | 1 | [Little Loop](cereal-little-loop-bud-01.txt) |
| 02 · Flakelet | 0 | [Flakelet](cereal-flakelet-bud-02.txt) |
| 03 · Double Scoop | 2 | [Double Scoop](cereal-double-scoop-bud-03.txt) |
| 04 · Pocket Prize | 1 | [Pocket Prize](cereal-pocket-prize-bud-04.txt) |
| 05 · Last Cheerio | 0 | [Last Cheerio](cereal-last-cheerio-bud-05.txt) |

## Editing

Editable names, `[url]`, titles, GIF URLs and writing are at the top of each block; decoration and the single shared stylesheet link come last. Default snippets contain Hoseong & Sam, the supplied Tumblr GIFs and lorem ipsum, including in the forum masterpost’s copy boxes. The [placeholder versions](cereal-placeholder-masterpost.txt) keep `[url]`, `[name]` and `[text]` at the top with the same GIFs and sample writing. The editor also has a separate button to copy these fields as placeholders. No editing comments or hidden tips are included in the posted HTML or CSS.

Inside `[dohtml]`, use `<b>`, `<i>`, `<u>` (or `<strong>`, `<em>`). The editor converts `[b]`, `[i]` and `[u]` before exporting. Direct BBCode inside a forum HTML block depends on the forum parser; these snippets need no JavaScript to display. Bold and underline use the forward member gradient; italics reverse it.

All headers, frames, borders and decorative accents inherit `--mgrgb1`, `--mgrgb2`, `--mgrgb3`. Preview palettes never appear in copied snippets. Neutral backgrounds follow Blue Hour’s `html[color-mode="light"]` and `html[color-mode="dark"]`; explicit forum mode overrides system preference.

Comms use separate plain `<p>` messages; successive opening tags work without closing tags. Set `data-direction` to `received`, `sent` or `alternating`. Device controls are decorative. Buds are miniature threads for replies of around 100 words or fewer and expand naturally for longer writing.

GIFs can be added or removed in any design. Clear a GIF field or remove its entire `crl1-shot` span; remove the empty media container if editing by hand. Layouts reclaim empty portrait space. Crop positions are editable percentages, defaulting to `50% 35%`. No text areas have a fixed height.

The standalone preview includes its CSS and editor; GIFs need internet access. Posted templates load one import-free stylesheet from `@main/cereal/cereal-first-pour-v1.css`, with system fonts and CSS-drawn motifs. Modern `:has()`, container queries and `color-mix()` are used.

## Rebuilding

Run `node cereal/build.cjs`, then `python tools/build_forum_posts.py` and `python cereal/package.py`. The Cereal exception in `tools/forum_presentation.py` preserves the user-requested lorem ipsum in copyable code. `designs.json` supplies public names to the master catalogue.

## Forum-ready collection

[Preview-above-code forum masterpost](../forum-posts/cereal-forum-masterpost.txt) · [Downloadable browser preview with Copy buttons](../forum-posts/cereal-preview.html) · [All collections and numbered post parts](../forum-posts/README.md).
