# Milk · Bottlelight

Freddie & Ollie’s collection: five threads, five phone/device comms and five buds, redesigned around milk bottles, folded cartons, foil caps, delivery dockets, measuring marks and soft pours. All headers, frames and emphasis use inherited member colours over neutral light/dark surfaces.

[Editable preview](milk-collection-preview.html) · [Forum masterpost](../forum-posts/milk-forum-masterpost.txt) · [Preview above copyable code](../forum-posts/milk-preview.html)

## Threads

| Design | Default GIFs | Posting snippet |
| --- | ---: | --- |
| Bottlelight | 1 | [Copy code](../italian-cuisine/italian-portico-damore-thread-01.txt) |
| Wholehearted Pour | 2 | [Copy code](../italian-cuisine/italian-tavola-per-due-thread-02.txt) |
| Morning Delivery | 0 | [Copy code](../italian-cuisine/italian-lettera-al-basilico-thread-03.txt) |
| Milkglass Letter | 1 | [Copy code](../italian-cuisine/italian-vino-di-sera-thread-04.txt) |
| Soft Spill | 0 | [Copy code](../italian-cuisine/italian-sotto-le-stelle-thread-05.txt) |

## Comms

| Design | Default GIFs | Posting snippet |
| --- | ---: | --- |
| Carton Call | 1 | [Copy code](../italian-cuisine/italian-pronto-amore-comms-01.txt) |
| Dairy Dial | 2 | [Copy code](../italian-cuisine/italian-ciao-ciao-comms-02.txt) |
| Frothline | 0 | [Copy code](../italian-cuisine/italian-basilico-signal-comms-03.txt) |
| Milk Run | 0 | [Copy code](../italian-cuisine/italian-vespa-line-comms-04.txt) |
| Silvercap Signal | 1 | [Copy code](../italian-cuisine/italian-dolce-frequenza-comms-05.txt) |

## Buds

| Design | Default GIFs | Posting snippet |
| --- | ---: | --- |
| Little Droplet | 0 | [Copy code](../italian-cuisine/italian-bocconcino-bud-01.txt) |
| Cap Kiss | 1 | [Copy code](../italian-cuisine/italian-olivetta-bud-02.txt) |
| Splashlet | 0 | [Copy code](../italian-cuisine/italian-farfallina-bud-03.txt) |
| Sipmates | 2 | [Copy code](../italian-cuisine/italian-piccolo-brindisi-bud-04.txt) |
| Last Mouthful | 0 | [Copy code](../italian-cuisine/italian-bacio-al-tiramisu-bud-05.txt) |

## Editing and delivery

Copy the complete `[dohtml]` block from any snippet, or copy the forum masterpost to display each example above its editable code. Names, links, titles/status, time, GIFs and writing come first. The forum masterpost uses full sample writing for examples and `[TEXT GOES HERE]` / `[MESSAGE GOES HERE]` markers in the copyable blocks.

Freddie & Ollie are prefilled and editable. The editor accepts HTML or `[b]`, `[i]`, `[u]`, converting the latter to HTML. Direct forum snippets use `<b>`, `<i>`, `<u>` (and support `<strong>`, `<em>`). Bold/underline use the forward member gradient, and italics use the reverse. Comms use plain `<p>` messages, including successive opening tags. Received, sent and alternating layouts are supported. Device controls are decorative.

The original placeholder GIF URLs and per-design counts are retained. Images can be added, removed or cropped in the editor. Empty image containers disappear, and portrait columns reflow. Buds are intended for replies around 100 words or fewer.

Each snippet links directly to [milk-bottlelight-standalone-v2.css](milk-bottlelight-standalone-v2.css) on `@main`. The compiled file contains the complete design and font-face rules with no CSS imports. Explicit Blue Hour light/dark mode overrides the system preference. Modern `:has()`, `color-mix()` and container queries are used. No hidden tips or editing comments are included in posting HTML or CSS.

## Layout repair

All 15 designs use the repaired v2 stylesheet. GIFs fill the inside of their frames; circular portraits stay square, paired portraits use explicit grid tracks, and empty media is removed. Milkglass Letter, Dairy Dial, Cap Kiss and Sipmates reflow their portrait columns in narrow cards. Droplets, carton marks, foil caps and Splashlet’s accent occupy reserved spaces. Writing grows naturally without a fixed height or card clipping.

For existing Milk posts, replace `milk-bottlelight-standalone-v1.css` with `milk-bottlelight-standalone-v2.css` in the stylesheet link. The old endpoint also receives the compatible fixes, but the fresh URL avoids its cached copy. No text needs to be re-entered. The original Italian Cuisine designs keep their own unchanged CSS.

## Compatibility and source

Milk replaces the former Italian Cuisine collection in the catalogue. Existing source filenames and CSS identifiers remain stable under `italian-cuisine/`; those snippets and its existing preview now contain the Milk designs. This keeps saved source links useful. The old Italian Cuisine stylesheet files remain only for already-posted legacy HTML. To change an existing forum post to Milk, use its updated snippet.

The `milk-v2` wrapper and `mk3` decorative elements isolate Milk from legacy styling. Each GIF sits inside its own `mk3-portrait` frame, so frame borders, padding and image cropping are sized separately. Older direct-image and `mk2` markup remain supported. The canonical collection alias is recorded in `collection-aliases.json`. All 15 public names are registered in `template-names.json` and the ship is recorded under Milk in `ship-names.json`.

Run `python tools/build_standalone_styles.py`, `node italian-cuisine/build.cjs`, then `python tools/build_forum_posts.py` from the repository root. See [VALIDATION.md](VALIDATION.md) for checks and limits.

## Forum-ready collection

[Preview-above-code forum masterpost](../forum-posts/milk-forum-masterpost.txt) · [Downloadable browser preview with Copy buttons](../forum-posts/milk-preview.html) · [All collections and numbered post parts](../forum-posts/README.md).
