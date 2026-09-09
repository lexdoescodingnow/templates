# Oats · Chen & Song

Fifteen original JCink templates: five threads, five electronic-device comms and five miniature buds. Oat panicles, rolled-grain forms, milled-paper details and folded oatmilk packaging supply the small flavour accents. Member colours carry the headers, frames and emphasis against neutral reading surfaces.

[Download the preview and editor](https://github.com/lexdoescodingnow/templates/raw/refs/heads/main/oats/oats-collection-preview.html)

Open any named `.txt` below and use **Copy raw file** on GitHub. Paste the entire block into your post. Both `[dohtml]` tags and the hosted stylesheet link are included.

Download the preview HTML and open it in a browser to browse, edit and copy all fifteen designs. Its CSS and editor are embedded. The GIFs require a connection; GitHub itself displays HTML source.

## Threads

| Design | Starting GIFs | Layout |
| --- | ---: | --- |
| [Avena Archive](oats-avena-archive-thread-01.txt) | 2 | An editorial page with offset horizontal grain-window portraits, a fine panicle drawing in the margin and a generous writing column. |
| [Kilnlight](oats-kilnlight-thread-02.txt) | 0 | A typography-first composition with a curved mill-end header, a ruled side band and a quiet rectangular reading surface. |
| [Husk & Honey](oats-husk-and-honey-thread-03.txt) | 1 | A compact portrait sits in a notched colour frame beside the title, above a broad writing area with a woven hem. |
| [Oatmilk Press](oats-oatmilk-press-thread-04.txt) | 2 | A folded carton-inspired frame with an angular cap, two photographic windows and a wide member-colour label band. |
| [Fieldwake](oats-fieldwake-thread-05.txt) | 0 | An airy open page with a slanting panicle above the title, a suspended name bar and three fine harvest lines. |

## Comms

| Design | Starting GIFs | Layout |
| --- | ---: | --- |
| [Groatline](oats-groatline-comms-01.txt) | 1 | A notchless smartphone with a square contact portrait, short grain-shaped speaker slots and an inset conversation screen. |
| [Rolled Signal](oats-rolled-signal-comms-02.txt) | 0 | A rollable electronic screen held between two cylindrical end bars, with wide incoming messages and a narrow side control. |
| [Kernel OS](oats-kernel-os-comms-03.txt) | 2 | A compact handheld terminal with twin small contact windows, a recessed screen and a row of oval navigation keys. |
| [Overnight Sync](oats-overnight-sync-comms-04.txt) | 1 | A bedside message clock with a panoramic contact image, an oversized time display, soft notification cards and a low speaker grille. |
| [Harvest Pocket](oats-harvest-pocket-comms-05.txt) | 0 | A slim e-ink handset with a vertical stylus channel, an offset contact heading and crisp rectangular message cards. |

## Buds

| Design | Starting GIFs | Layout |
| --- | ---: | --- |
| [Floret](oats-floret-bud-01.txt) | 0 | A compact oval-ended note with a tiny falling grain motif, a centred name and a delicate italic heading. |
| [Groat](oats-groat-bud-02.txt) | 1 | A miniature two-column reply with a squared portrait tile and a member-colour border that turns around its lower edge. |
| [Chafflet](oats-chafflet-bud-03.txt) | 0 | A small folded-paper reply with three stitched colour bars and an angled upper corner. |
| [Twin Flakes](oats-twin-flakes-bud-04.txt) | 2 | A short reply above two tilted clipped portrait tiles, finished with a small name line between the images and heading. |
| [Milkdrop](oats-milkdrop-bud-05.txt) | 0 | A tiny asymmetric note with a tapered corner, a narrow side title and three rolled-grain marks. |

## Editing

Each snippet starts with `[url]`, `[name]` and `[text]`. `[text]` is the title or contact status. GIFs and comms time follow before the reply in `oat-copy`. Decoration and the stylesheet link come last. There are no comments, hidden tips or editing instructions inside the posting templates or shared stylesheet.

The preview displays Chen & Song and a sample title while the fields contain placeholders. Copied code keeps the actual field values; fill in the name and title to export those changes. The editor retains edits for each design while the page stays open. **Download .txt** saves the current edited snippet.

Use `<p>` for ordinary writing paragraphs and individual message bubbles. Comms support consecutive opening `<p>` tags without individual closing tags, so no per-message class or div is needed. `data-flow="received"`, `"sent"` and `"alternate"` control direction. The electronic-device hardware is decorative.

The editor converts `[b]`, `[i]` and `[u]` into HTML. Raw `[dohtml]` posting snippets use `<b>`, `<i>` and `<u>`; BBCode parsing inside those blocks depends on the forum. `<strong>` and `<em>` are supported too. Bold and underline use the forward member gradient, 1 → 2 → 3. Italics reverse it, 3 → 2 → 1.

Buds begin with 36 words and are intended for replies of 100 words or fewer. The writing areas grow with the content.

## GIFs, colours and modes

Seven designs start without GIFs, four with one, and four with two. These counts are defaults: the editor can add or remove images and adjust the crop. Removing all GIFs omits the media container. Empty image containers collapse, and image-free templates accept an optional `oat-media` block before the writing.

The first supplied GIF appeared twice in one concatenated string; the collection uses that single valid URL. The second supplied GIF is unchanged. Both URLs returned HTTP 200 with image/gif content type.

The templates inherit the forum’s `--mgrgb1`, `--mgrgb2` and `--mgrgb3` comma-separated RGB triples. Missing secondary colours fall back to an available member colour. Preview palettes never enter copied code. Text emphasis mixes the member colours with neutral ink to improve readability.

Blue Hour’s `html[color-mode="light"]` and `html[color-mode="dark"]` override system preferences. Without an explicit forum mode, system dark mode supplies the fallback. Template selectors are scoped to `.bh-oats` with `oat-` child classes, and no template IDs or scripts are required in forum posts.

Typography uses Palatino, Georgia, Verdana, Arial and Courier New with system fallbacks. An original line-drawn oat panicle is embedded as a small SVG mask in the CSS; grain details and device hardware are CSS shapes. No additional external font or motif files are needed. Layouts use modern CSS grid, flexbox, `:has()`, `color-mix()` and container queries.

## Source and checks

All posting snippets load [oats-harvest-v1.css](oats-harvest-v1.css) from jsDelivr at the immutable GitHub revision recorded in [stylesheet-revision.txt](stylesheet-revision.txt). One stylesheet link after the editable content supplies the styling; no template JavaScript injection is required.

Run `node oats/build.cjs` from the repository root to regenerate the fifteen snippets and the standalone preview. `designs.json` lists the collection, `oats-model.js` builds the markup, and `oats-editor.js` supplies the preview controls.

[VALIDATION.md](VALIDATION.md) records the source and editor checks. Rendered appearance and a live JCink post have not been tested.
