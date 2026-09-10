# Brown Sugar · Chanwoo & Taehwan

Fifteen JCink templates: five threads, five electronic comms and five compact buds. Member colours carry the headers, frames, borders and formatted writing; neutral surfaces keep the body readable. Faceted grains, pressed sugar, molasses traces and tiny bronze details connect the collection.

[Download the preview and editor](https://github.com/lexdoescodingnow/templates/raw/refs/heads/main/brown-sugar/brown-sugar-collection-preview.html)

Download the HTML file and open it in your browser to view and edit the collection. GitHub displays HTML source. To post directly from GitHub, open a named `.txt` file below, use **Copy raw file**, and paste the complete block into a post. The `[dohtml]` tags and hosted stylesheet link are included.

## Threads

| Design | Starting GIFs | Composition |
| --- | ---: | --- |
| [Demerara Drift](brown-sugar-demerara-drift-thread-01.txt) | 1 | Faceted portrait, generous serif title, diagonal crystal seam. |
| [Muscovado Press](brown-sugar-muscovado-press-thread-02.txt) | 0 | Pressed slab, stacked type, granular cut edges and recessed writing. |
| [Molasses Manuscript](brown-sugar-molasses-manuscript-thread-03.txt) | 1 | Narrow portrait spine, looping molasses trace and long letter. |
| [Turbinado Terrace](brown-sugar-turbinado-terrace-thread-04.txt) | 2 | Stepped portrait tiles, stair-set heading and wide writing terrace. |
| [Soft Brown Reverie](brown-sugar-soft-brown-reverie-thread-05.txt) | 1 | Centred italic heading, shallow portrait, grain margins and scoop finish. |

## Comms

| Design | Starting GIFs | Device |
| --- | ---: | --- |
| [Grainline](brown-sugar-grainline-comms-01.txt) | 1 | Angular touch phone with a square contact portrait. |
| [Molassenger](brown-sugar-molassenger-comms-02.txt) | 0 | Landscape pocket messenger with a vertical clock and small keyboard. |
| [Caster Call](brown-sugar-caster-call-comms-03.txt) | 1 | Portrait clamshell with a double hinge and navigation key. |
| [Duo Crystal](brown-sugar-duo-crystal-comms-04.txt) | 2 | Paired-contact phone with crystal windows and a message timeline. |
| [Treacle Terminal](brown-sugar-treacle-terminal-comms-05.txt) | 0 | Square handheld terminal with a rounded display and monospace messages. |

## Buds

| Design | Starting GIFs | Composition |
| --- | ---: | --- |
| [Grainlet](brown-sugar-grainlet-bud-01.txt) | 0 | Double corner binding and three scattered grains. |
| [Sugar Pin](brown-sugar-sugar-pin-bud-02.txt) | 1 | A tiny faceted portrait pinned beside a short title. |
| [Brown Kiss](brown-sugar-brown-kiss-bud-03.txt) | 2 | A broad miniature reply with overlapping portrait tiles beneath. |
| [Crumbscript](brown-sugar-crumbscript-bud-04.txt) | 0 | Notched inset label with a slim name band. |
| [Last Crystal](brown-sugar-last-crystal-bud-05.txt) | 0 | Quiet italic note and three tilted crystal tiles. |

## Editing

Every posting snippet begins with `[url]`, `[name]`, and the `[text]` title or contact status. Editable clock, GIFs and writing follow. Decorative markup and the stylesheet link come last. Posting HTML and CSS contain no comments, hidden tips or editing instructions.

The preview displays **Chanwoo & Taehwan** on threads, buds and Duo Crystal, and **Taehwan** as the contact on other comms. The exported code retains the top placeholders until you edit them. Change the linked name, title, time, message direction, GIFs, image crop and writing in the editor. Each design keeps its edits while the page is open. Reset affects only the selected design. Copy and `.txt` download export those edits.

Use ordinary `<p>` elements for paragraphs and separate messages. Successive opening `<p>` tags work without closing tags or a repeated class. Device hardware is decorative. Comms support received, sent and alternating messages through `data-flow`.

The editor converts `[b]`, `[i]` and `[u]` to their HTML equivalents. When editing raw `[dohtml]` code, use `<b>`, `<i>` and `<u>`; `<strong>` and `<em>` also work. Bold and underline follow member colours 1 → 2 → 3; italics reverse them, 3 → 2 → 1. Underline retains a visible line. Text gradients mix with the neutral text colour to help readability.

Buds start with a 36-word lorem ipsum reply and suit replies of 100 words or fewer. The editor shows a word count; longer replies expand normally.

## Images and colours

Defaults include six image-free layouts, six single-GIF layouts and three paired layouts. The two supplied Tumblr `.gifv` addresses are preserved exactly. Every design can accept GIFs; the default counts are not limits. Add or remove images in the editor. In raw code, delete an unwanted `<img>` or the entire `bs-media` element. Removing all images also removes the image space from the layout.

The templates inherit the forum's comma-separated RGB triplets `--mgrgb1`, `--mgrgb2` and `--mgrgb3`. Preview palette controls affect only the preview. Exported snippets continue to use inherited member colours, with muted fallbacks if the forum does not supply them.

Blue Hour's `html[color-mode="light"]` and `html[color-mode="dark"]` take precedence over the system preference fallback. The editor includes light/dark and Fit, 320 px and 550 px controls. Styling is scoped to `.bh-bs`. The templates use system serif, sans-serif and monospace fonts, with no icon or font-service dependency. Posting snippets require no JavaScript. Their CSS uses modern grid, container queries, `:has()` and `color-mix()`.

## Build and validation

Run `node brown-sugar/build.cjs` from the repository root to rebuild all fifteen snippets and the standalone editor from the shared model, design registry and styles. The editor embeds its CSS and JavaScript; GIFs load from Tumblr. Posting snippets use the immutable stylesheet revision recorded in `stylesheet-revision.txt`.

[Validation details](VALIDATION.md) record source checks and the unverified visual rendering.
