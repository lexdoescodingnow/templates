# Lavender · The Stillroom collection

Fifteen JCink templates for **Jinwoo & Yohan**: five threads, five device-style comms and five miniature buds. Lavender fields, distillation glass, seed heads and small textile details accompany inherited member colours on neutral backgrounds.

[Preview and editor](lavender-collection-preview.html)

Open a named `.txt` file below and choose **Copy raw file** on GitHub. Paste the entire block into your forum post: `[dohtml]`, the stylesheet link and `[/dohtml]` are already included.

Download the preview HTML and open it in a browser to preview, edit and copy every design. GitHub displays HTML as source. The preview includes its CSS and editor; only the supplied GIFs require a connection.

## Threads

| Design | Starting GIFs | Layout |
| --- | ---: | --- |
| [Stillroom Nocturne](lavender-stillroom-nocturne-thread-01.txt) | 1 | A perfume-flask silhouette with sloping shoulders, a ribbed stopper and a wide photographic label above a generous reading panel. |
| [Parallel Fields](lavender-parallel-fields-thread-02.txt) | 2 | Two staggered portrait windows rise over fine furrow lines, with a wide serif heading and a divided member-colour frame. |
| [Linen Devotion](lavender-linen-devotion-thread-03.txt) | 0 | A writing-led lavender sachet, gathered at the neck and edged with small stitches, with an open bow above the title. |
| [Vesper Specimen](lavender-vesper-specimen-thread-04.txt) | 1 | A botanical study sheet with a tall oval portrait, an off-centre heading and a drawn lavender raceme in the margin. |
| [Inflorescence](lavender-inflorescence-thread-05.txt) | 2 | Two seed-head portraits grow from fine stems above a symmetrical title and an airy page with a branching lower flourish. |

## Comms

| Design | Starting GIFs | Layout |
| --- | ---: | --- |
| [Duskline](lavender-duskline-comms-01.txt) | 1 | A softly arched smartphone with a seed-shaped contact portrait, an inset earpiece and generous incoming message bubbles. |
| [Sachet Sync](lavender-sachet-sync-comms-02.txt) | 2 | A book-style folding phone with two portrait tiles in its cover screen and a separate conversation display across a narrow hinge. |
| [Stemwave](lavender-stemwave-comms-03.txt) | 0 | A slender candybar messenger with a tall signal rail, square inset bubbles and a tactile twelve-key lower panel. |
| [Lavandula OS](lavender-lavandula-os-comms-04.txt) | 1 | A desktop messenger window with a narrow portrait sidebar, small window controls and a wide neutral conversation pane. |
| [Pillow Talk](lavender-pillow-talk-comms-05.txt) | 2 | A bedside smart clock with a large time display, paired contact tiles, rounded message cards and a perforated speaker base. |

## Buds

| Design | Starting GIFs | Layout |
| --- | ---: | --- |
| [Calyx](lavender-calyx-bud-01.txt) | 0 | A compact capsule note held between three-colour brackets, with a tiny lavender-flower punctuation mark. |
| [Lavandin](lavender-lavandin-bud-02.txt) | 1 | A tiny seed-shaped portrait nestles beside a short reply, with three descending stitch lines in the opposite margin. |
| [Scent Letter](lavender-scent-letter-bud-03.txt) | 0 | A slim perfume blotter with a rounded tip, a narrow vertical name rail and a spare little note. |
| [Twin Whorls](lavender-twin-whorls-bud-04.txt) | 2 | Two miniature oval portraits sit like paired flowers at the centre of a branching divider above a brief reply. |
| [Afterbloom](lavender-afterbloom-bud-05.txt) | 0 | An open miniature folio with a small descending seed-head motif and an offset member-colour underline. |

## Editing

Every snippet begins with the linked `[name]`, `[url]` and `[text]` fields. `[text]` is the title or contact status; the writing follows in `lvd-copy`. GIFs, time and writing all come before the decorative element and stylesheet link. Posting snippets and shared CSS contain no comments, hidden tips or instructions.

Preview samples show Jinwoo & Yohan. Default posting files retain the placeholders. Enter your own names and titles in the editor to include them in copied code. Each design retains its edits while the preview is open. Download an edited `.txt` to keep it.

Use ordinary `<p>` paragraphs. Every paragraph in a comms writing area becomes a message bubble, including successive opening `<p>` tags without individual closing tags. The editor offers received, sent and alternating messages. The device keys, clock and speaker details are decorative.

The editor converts `[b]`, `[i]` and `[u]` into HTML formatting. In raw `[dohtml]` snippets use `<b>`, `<i>` and `<u>`; raw BBCode parsing inside `[dohtml]` depends on the forum. `<strong>` and `<em>` also work. Bold and underline run through member colours 1 → 2 → 3; italics use 3 → 2 → 1. Emphasis mixes the palette with the neutral text colour for legibility.

Buds start below 100 words. Writing areas grow with the text, without fixed-height scroll boxes.

## Images and colours

Five designs start without GIFs, five with one and five with two. The provided Tumblr URLs are used exactly. These counts are defaults. The editor can add or remove images and change crop positions. Removing all GIFs omits the media block; portrait columns collapse where appropriate. An image-free design can also accept a `lvd-media` block containing `<img>` elements before `lvd-copy`.

The templates inherit `--mgrgb1`, `--mgrgb2` and `--mgrgb3` RGB triples. If a secondary colour is missing it falls back to an available member colour. Header lettering, frames, borders, device cases and text emphasis follow those variables. Lavender is limited to small flower details. No preview colour settings are exported into posting snippets.

Blue Hour's `html[color-mode="light"]` and `html[color-mode="dark"]` take precedence over the system preference fallback. All template rules are scoped to `.bh-lavender`; inner classes use `lvd-`. The layouts use modern CSS grid, flexbox, container queries, `:has()`, `color-mix()` and text clipping. Georgia, Trebuchet MS, Arial and Courier New provide typography without external font dependencies. The lavender sprig is an original SVG mask embedded in CSS; all other motifs are CSS shapes.

## Files and verification

[lavender-stillroom-v1.css](lavender-stillroom-v1.css) is the shared stylesheet. Posting snippets load the immutable revision recorded in [stylesheet-revision.txt](stylesheet-revision.txt) through jsDelivr. Each named snippet is self-contained apart from that stylesheet and its GIFs. No injection script is required.

Run `node lavender/build.cjs` from the repository root to rebuild the fifteen snippets and standalone preview. `designs.json` holds the names and layout descriptions; `lavender-model.js` supplies the markup and defaults. The editor interface follows the existing collection workflow; the fifteen template layouts and botanical details were created for Lavender.

The HTML, CSS structure and editor behaviour passed automated checks. Visual browser review and a live JCink posting test were unavailable because the cloud browser blocked preview URLs. [VALIDATION.md](VALIDATION.md) records the checks and limits.
