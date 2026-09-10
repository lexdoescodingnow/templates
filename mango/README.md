# Mango · Alastair & Jiyong

Fifteen JCink designs with member-colour frames, headings and text accents on neutral surfaces. Asymmetric mango cheeks, scored flesh, small stones, stems and peel ribbons connect the collection.

[Download the standalone preview and editor](https://github.com/lexdoescodingnow/templates/raw/refs/heads/main/mango/mango-collection-preview.html)

Open a named `.txt` file below and use **Copy raw file** on GitHub. Paste the complete block into a post; `[dohtml]` tags and the hosted stylesheet link are included. Download the HTML editor and open it in a browser to see and edit the designs. GitHub itself displays HTML source.

## Threads

| Design | Starting GIFs | Layout |
| --- | ---: | --- |
| [Alphonso Atelier](mango-alphonso-atelier-thread-01.txt) | 1 | A broad asymmetric mango-cheek portrait sits inside concentric member-colour arcs, above an offset title and a spacious letter. |
| [Cheek to Cheek](mango-cheek-to-cheek-thread-02.txt) | 2 | Two opposing fruit-cheek portraits flank a slim vertical name spine; the title stretches beneath them and opens into the writing. |
| [The Scored Heart](mango-the-scored-heart-thread-03.txt) | 0 | An open typographic page with a nine-square mango score, a squared title field and a quiet inset writing panel. |
| [Peel Poetry](mango-peel-poetry-thread-04.txt) | 0 | A narrow curling peel winds through the margin of a tall letter, with a small vertical name tab and an expansive italic title. |
| [Mangifera Nocturne](mango-mangifera-nocturne-thread-05.txt) | 1 | A slender side portrait, an oversized monogram-like fruit curve and staggered ruled text create an intimate evening folio. |

## Comms

| Design | Starting GIFs | Layout |
| --- | ---: | --- |
| [Pulp Signal](mango-pulp-signal-comms-01.txt) | 1 | A smooth asymmetric smartphone with a curved top corner, tiny contact portrait and side-aligned incoming bubbles. |
| [Lassi Link](mango-lassi-link-comms-02.txt) | 0 | A compact square-screen messenger with a ribbed speaker, recessed display and rounded hardware keys. |
| [Cheek Chat](mango-cheek-chat-comms-03.txt) | 2 | A wide folding touch device places paired portraits beside the conversation, joined by a vertical hinge. |
| [SliceOS](mango-sliceos-comms-04.txt) | 0 | A tall lock-screen handset frames an enormous clock, mango-slice notifications and a slim gesture bar. |
| [Manila Mail](mango-manila-mail-comms-05.txt) | 1 | A slim slider handset with a broad portrait header, separate message screen and a scored nine-key deck. |

## Buds

| Design | Starting GIFs | Layout |
| --- | ---: | --- |
| [Stonelet](mango-stonelet-bud-01.txt) | 0 | A compact seed-shaped corner and coloured binding hold a tiny open note. |
| [Petiole](mango-petiole-bud-02.txt) | 1 | A petite side portrait hangs from a curved stem beside a short reply. |
| [Golden Cube](mango-golden-cube-bud-03.txt) | 0 | A small squared card with a scored corner, stacked title and inset member-colour rule. |
| [Blush Bite](mango-blush-bite-bud-04.txt) | 2 | A low paired-image strip sits beneath a tiny reply, with opposed mango-cheek curves. |
| [Last Sliver](mango-last-sliver-bud-05.txt) | 0 | A slender diagonal peel edge holds a minimal note with a sideways name tab. |

## Editing and formatting

Each posting snippet starts with `[url]` and `[name]`, then the `[text]` title or status. The clock, GIFs and writing follow; ornaments and the stylesheet link come last. Posting HTML and CSS contain no comments, hidden tips or editing notes.

The preview displays **Alastair & Jiyong** on threads, buds and Cheek Chat, and **Jiyong** as the contact on the other devices. Copied code keeps `[name]`, `[url]` and `[text]` until those fields are edited. Names, titles, times, GIFs, crop position and writing update the preview and export together. Each design retains its edits while the editor stays open. Reset restores only the selected design.

Use plain `<p>` elements for writing or separate message bubbles. Successive opening `<p>` tags work without a class or a separate div for each message. Comms offer received, sent and alternating messages through `data-flow`. Device controls are decorative.

The editor accepts `[b]`, `[i]` and `[u]`, converting them to the HTML needed inside `[dohtml]`. When editing a posting snippet directly, use `<b>`, `<i>` and `<u>`; `<strong>` and `<em>` also work. Bold and underline use the forward member gradient, 1 → 2 → 3; italics use the reverse, 3 → 2 → 1. Underline keeps its visible line. Text gradients mix toward the neutral text colour for readability.

Buds start with a 36-word reply and are intended for replies of 100 words or fewer. The editor counts words; longer replies expand naturally.

## Images, member colours and modes

Defaults include seven image-free layouts, five single-GIF layouts and three paired-GIF layouts. Every design can accept images. Add or remove GIFs in the editor; deleting all GIFs removes the media row or column. In raw snippets, delete an unwanted `<img>` or the whole `mg-media` element. Both supplied Tumblr GIF URLs are preserved exactly, including `.gifv`. These placeholders do not limit image count.

The templates inherit `--mgrgb1`, `--mgrgb2` and `--mgrgb3` as comma-separated RGB triplets from the forum's member-colour scope. Preview palette controls affect only the preview; exported snippets continue to inherit forum colours. Mango's small golden details are accents.

Blue Hour's `html[color-mode="light"]` and `html[color-mode="dark"]` override the system preference fallback. The editor provides light/dark and Fit, 320 px and 550 px preview controls. Styles are scoped to `.bh-mango`. Posting snippets need no JavaScript, font service or icon library; ornaments are CSS shapes. The stylesheet uses modern CSS grid, container queries, `:has()` and `color-mix()`.

## Build and verification

`designs.json` and `mango-model.js` supply all fifteen snippets and editor defaults. Run `node mango/build.cjs` from the repository root to rebuild them and the standalone editor. The editor embeds its CSS and JavaScript; character GIFs still load from Tumblr. Posting snippets use the immutable stylesheet commit recorded in `stylesheet-revision.txt`.

[Validation details](VALIDATION.md) distinguish completed functional checks from unverified browser rendering.
