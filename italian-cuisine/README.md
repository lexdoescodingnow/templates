# Italian Cuisine · A Tavola

Fifteen JCink templates inspired by the supplied Italian Cuisine poster: trattoria arches, porcelain plates, basil engravings, wine labels and strings of terrace lights. Member colours carry the headers, frames and emphasis over neutral reading surfaces.

[Preview and editor](italian-collection-preview.html)

Open any named `.txt` file below and use GitHub’s **Copy raw file**. Paste the whole block, including `[dohtml]` and `[/dohtml]`, into your post. Its hosted stylesheet link is already included.

## Threads

| Design | Default GIFs | Layout |
| --- | ---: | --- |
| [Portico d’Amore](italian-portico-damore-thread-01.txt) | 1 | A tall trattoria arch, portrait window and engraved name plaque above an open letter. |
| [Tavola per Due](italian-tavola-per-due-thread-02.txt) | 2 | Paired porcelain portrait plates, a woven tablecloth edge and a generous shared page. |
| [Lettera al Basilico](italian-lettera-al-basilico-thread-03.txt) | 0 | A folded recipe folio with an member-colour basil engraving, a sideways margin rule and literary typography. |
| [Vino di Sera](italian-vino-di-sera-thread-04.txt) | 1 | A wine-label composition with a narrow portrait column, sweeping italic title and a tiny stemmed-glass engraving. |
| [Sotto le Stelle](italian-sotto-le-stelle-thread-05.txt) | 0 | An airy terrace letter beneath a curved strand of lights, an open corner frame and a small evening star. |

## Comms

| Design | Default GIFs | Layout |
| --- | ---: | --- |
| [Pronto, Amore](italian-pronto-amore-comms-01.txt) | 1 | A polished smartphone with a square contact badge, tiled case detail and soft incoming bubbles. |
| [Ciao Ciao](italian-ciao-ciao-comms-02.txt) | 2 | A wide folding messenger with a paired contact strip, a central hinge and a separate chat screen. |
| [Basilico Signal](italian-basilico-signal-comms-03.txt) | 0 | An e-ink pocket messenger with an inset contact display, geometric bubbles and a little basil stamp. |
| [Vespa Line](italian-vespa-line-comms-04.txt) | 0 | A landscape pocket communicator with a ridged side grip, a compact message screen and hardware keys. |
| [Dolce Frequenza](italian-dolce-frequenza-comms-05.txt) | 1 | A tall phone with a panoramic contact image, a soft arched screen header and a five-bar voice indicator. |

## Buds

| Design | Default GIFs | Layout |
| --- | ---: | --- |
| [Bocconcino](italian-bocconcino-bud-01.txt) | 0 | A miniature folded napkin with a fine cutlery impression and a short reply. |
| [Olivetta](italian-olivetta-bud-02.txt) | 1 | A low olive-branch card with a small rounded portrait and a compact caption. |
| [Farfallina](italian-farfallina-bud-03.txt) | 0 | A tiny bow-pasta note with a broad member-colour band and open writing space. |
| [Piccolo Brindisi](italian-piccolo-brindisi-bud-04.txt) | 2 | A petite toast card with twin oval portraits, a fine stem-like divider and a brief reply. |
| [Bacio al Tiramisù](italian-bacio-al-tiramisu-bud-05.txt) | 0 | A layered dessert note with an offset title and three delicate colour bands. |

## Editing your post

The linked `[name]`, `[url]` and title/status `[text]` appear first, followed by the comms time, optional GIFs and writing. All editable content comes before the decorative element and stylesheet link. Replace the lorem ipsum inside `itc-copy` with ordinary `<p>` paragraphs.

Each comms paragraph becomes one message. Successive opening `<p>` tags work without closing tags. Set `data-flow="received"`, `"sent"` or `"mixed"` to choose incoming, outgoing or alternating messages. The device controls are decorative.

Inside `[dohtml]`, use `<b>`, `<i>` and `<u>` (also `<strong>` and `<em>`). Bold and underline use the forward member gradient, 1 → 2 → 3; italics reverse it, 3 → 2 → 1. The preview editor converts `[b]`, `[i]` and `[u]` to the equivalent HTML when copying. Literal BBCode processing inside `[dohtml]` depends on the forum, so the supplied snippets use HTML.

Buds are miniature thread templates for replies of about 100 words or fewer. Each sample reply is 36 words. Longer replies grow normally; no content scrollbox or word cap is imposed.

## GIFs

The two supplied Tumblr `.gifv` URLs remain exactly as provided. Both URLs responded as `image/gif` during asset checks. The images are optional placeholders, and the design determines the default count: seven designs begin without images, five with one image, and three with two.

Use **Add GIF** or **Remove** in the editor. Directly in a snippet, remove an `<img>` or the entire `itc-media` container to remove its images. Empty or absent image containers disappear; portrait columns collapse where applicable. To add images to an image-free snippet, insert `<div class="itc-media"><img src="YOUR_GIF_URL" alt="Character GIF" style="object-position:50% 35%"></div>` before `itc-copy`. Multiple images are supported and wrap when needed.

## Preview and editor

Download `italian-collection-preview.html` from GitHub and open it in a browser; GitHub’s file view shows the source. The preview embeds all styles, design data and editor code. Only fonts and GIFs need their external hosts.

Select a named design, or choose **View all 15**. Edit names, links, title/status, time, message direction, GIFs, crop positions and writing. **Copy JCink code** exports a complete posting block; **Download .txt** saves the edited snippet. If clipboard access is unavailable, the code is selected for manual copying. Edits remain while the page is open and when switching designs. Download the snippet to keep them.

Light/dark/system mode, member palette presets, three custom colour pickers and narrow-width controls change the preview only. Exported posts inherit the forum’s colours and mode. The writing editor accepts paragraphs, line breaks, emphasis and links.

## Styling and compatibility

The single stylesheet is [italian-a-tavola-v1.css](italian-a-tavola-v1.css), pinned in posting code to the GitHub commit recorded in [stylesheet-revision.txt](stylesheet-revision.txt). Every snippet already includes it. No JavaScript injector is required in a forum post.

Colours inherit Blue Hour’s `--mgrgb1`, `--mgrgb2` and `--mgrgb3` RGB triples. Fallback colours apply only when the inherited values are absent. Emphasis shades deepen on light surfaces and lighten on dark surfaces. Explicit `html[color-mode="light"]` and `html[color-mode="dark"]` take precedence over a system dark-mode fallback.

The small olive, basil, cutlery, wineglass, farfalle and audio motifs are original inline SVG masks contained in the CSS. No decorative bitmap or poster file is required. Cormorant Garamond, Italiana and Manrope load through Google Fonts, with Georgia, Arial and monospace fallbacks. The stylesheet uses modern `:has()`, `color-mix()` and container-query support. The forum must permit the external stylesheet inside `[dohtml]`.

There are no comments, hidden tips, instructional banners or editing notes in the posting HTML or template CSS. Documentation stays here and in the editor interface.

## Build and verification

Run `node italian-cuisine/build.cjs` from the repository root to regenerate the posting snippets and preview. `designs.json` holds the 15 distinct names and defaults; `italian-model.js` generates both posting markup and the preview. The existing editor workflow is retained, with original Italian Cuisine template styling.

See [VALIDATION.md](VALIDATION.md) for completed source checks and the browser verification limitation.
