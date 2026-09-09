# Cherry · Jaehwa & Ubin

Fifteen original JCink designs: five threads, five electronic-device comms and five miniature buds. Member colours run through titles, frames, borders and selected surfaces. Neutral reading areas and small cherry details tie the set together.

[Download the preview and editor](https://github.com/lexdoescodingnow/templates/raw/refs/heads/main/cherry/cherry-collection-preview.html)

Open any named `.txt` below and select **Copy raw file** on GitHub. Paste the entire block into your post; the `[dohtml]` tags and stylesheet link are already included.

Download the preview HTML and open it in your browser to select, edit and copy all fifteen templates. The CSS and editor are embedded in that file. Only the GIFs need an internet connection. GitHub shows HTML source instead of rendering the editor.

## Threads

| Design | Starting GIFs | Layout |
| --- | ---: | --- |
| [Stem Theory](cherry-stem-theory-thread-01.txt) | 2 | Twin circular portraits hang from a sweeping forked stem beneath a large editorial heading; an open reading column follows. |
| [Morello Index](cherry-morello-index-thread-02.txt) | 0 | An orchard archive card with a narrow numbered-edge motif, a raised name tab and a title between offset vertical rules. |
| [Maraschino Club](cherry-maraschino-club-thread-03.txt) | 1 | A sharp nightlife composition with a capsule panorama, a bold condensed heading and an inset octagonal reading panel. |
| [Griotte Duet](cherry-griotte-duet-thread-04.txt) | 2 | A title-led split header faces two stepped photographic windows, with a broad uninterrupted writing area underneath. |
| [Stone & Velvet](cherry-stone-and-velvet-thread-05.txt) | 0 | A literary folio with a stepped double frame, oversized italic heading and a small pit-and-orbit emblem. |

## Comms

| Design | Starting GIFs | Layout |
| --- | ---: | --- |
| [Cherrywire](cherry-cherrywire-comms-01.txt) | 1 | A modern phone with a camera capsule, a round contact portrait, soft message tails and a slim composer. |
| [Kirsch Key](cherry-kirsch-key-comms-02.txt) | 0 | A folding handset with a recessed conversation screen, a visible hinge and a compact three-column keypad. |
| [Glacé Link](cherry-glace-link-comms-03.txt) | 2 | A landscape sliding communicator with paired contact windows and a full-width keyboard deck beneath its chat screen. |
| [Sweet Frequency](cherry-sweet-frequency-comms-04.txt) | 1 | A curved pocket music messenger with a square contact screen, compact messages and an engraved circular clickwheel. |
| [Nightcherry](cherry-nightcherry-comms-05.txt) | 0 | A small wrist communicator with a rounded watch case, ribbed straps, a side crown and stacked notifications. |

## Buds

| Design | Starting GIFs | Layout |
| --- | ---: | --- |
| [Stipule](cherry-stipule-bud-01.txt) | 0 | A miniature hanging orchard label, with a punched eyelet, a curved base and a small stem seal. |
| [Pipmark](cherry-pipmark-bud-02.txt) | 1 | A compact asymmetric reply with a tiny round portrait tucked into a circular cutaway beside the heading. |
| [Blushlet](cherry-blushlet-bud-03.txt) | 0 | A small open note with a broad horizontal title tab and two offset cherry-colour dots. |
| [Twin Pits](cherry-twin-pits-bud-04.txt) | 2 | A short reply beneath two interlocking portrait lenses and a centred name, with an oval member-colour frame. |
| [Last Stone](cherry-last-stone-bud-05.txt) | 0 | A spare miniature page enclosed by opposing corner strokes, finished with a small oval pit mark. |

## Editing

Names, links and titles appear first as `[url]`, `[name]` and `[text]`. The comms time, GIFs and lorem ipsum follow, before the decorative elements and stylesheet link. The reply goes inside `chr-copy`. Posting HTML and template CSS contain no comments, hidden tips or editing instructions.

The preview displays Jaehwa & Ubin and a sample title while the corresponding fields contain placeholders. Copied code retains the field values. Change the name and title to export those changes. Each design retains its edits while the editor is open; **Download .txt** saves an edited posting snippet.

The editor converts `[b]`, `[i]` and `[u]` into HTML. The posting files use `<b>`, `<i>` and `<u>` because BBCode parsing inside `[dohtml]` depends on the forum. `<strong>` and `<em>` also work. Bold and underline use member colours 1 → 2 → 3; italics reverse them to 3 → 2 → 1.

Use ordinary `<p>` paragraphs for writing. Comms accept consecutive opening `<p>` tags without individual closing tags, with no class or div required per message. `data-flow="received"`, `"sent"` and `"alternate"` set the direction. Device hardware is decorative; it does not send messages.

Buds begin with 36 words and are intended for replies of 100 words or fewer. Writing areas grow with their content.

## GIFs, member colours and themes

Seven layouts start without images, four with one, and four with two. The supplied Tumblr GIF URLs are preserved exactly. These are defaults, not limits: add or remove GIFs and adjust their crop in the editor. Empty media blocks collapse; image-free designs also accept an optional `chr-media` block before the reply. Removing all GIFs through the editor omits the media block entirely.

All templates inherit `--mgrgb1`, `--mgrgb2` and `--mgrgb3` as comma-separated RGB triples. Missing secondary colours fall back to the available member colour. Preview colour controls are not exported, so they do not override the forum palette. Text emphasis mixes member colours with neutral ink to improve legibility.

Blue Hour’s `html[color-mode="light"]` and `html[color-mode="dark"]` take precedence over the operating system. Without an explicit forum mode, system dark mode is the fallback. Every template rule is scoped to `.bh-cherry`, with `chr-` child classes. The templates use no IDs or scripts in posts.

The designs use Georgia, Arial, Impact, Trebuchet MS and Courier New, with system fallbacks. Cherry motifs and device shapes are CSS; there are no additional image assets or font downloads. Modern CSS grid, flexbox, `:has()`, `color-mix()` and container queries are used.

## Source and verification

The posting snippets load [cherry-orchard-v1.css](cherry-orchard-v1.css) through jsDelivr at the immutable GitHub revision recorded in [stylesheet-revision.txt](stylesheet-revision.txt). Each has exactly one stylesheet link after the editable content. No template JavaScript injection is needed.

Run `node cherry/build.cjs` from the repository root to regenerate the fifteen posting files and standalone preview. `designs.json` lists the collection, `cherry-model.js` builds the markup, and `cherry-editor.js` supplies preview editing.

[VALIDATION.md](VALIDATION.md) records source checks and their limits. Browser rendering and a live JCink post have not been verified.
