# Praline · Dongmin & Yonggi

Fifteen coordinated JCink designs: five threads, five electronic-device comms, and five miniature buds. Pleated confectionery paper, spun-sugar lines, folded sleeves and tiny caramel details connect the collection. Member colours drive the headers, frames, lettering and message accents; the reading surfaces remain neutral.

[Download the preview and editor](https://github.com/lexdoescodingnow/templates/raw/refs/heads/main/praline/praline-collection-preview.html)

Open a named `.txt` file below and use **Copy raw file** on GitHub. Paste the whole block into your JCink post; `[dohtml]` tags and the hosted stylesheet link are already included.

Download the HTML preview and open it in your browser to see and edit the collection. The preview includes its CSS and editor; the placeholder GIFs load from Tumblr. GitHub displays the HTML source rather than running the preview.

## Threads

| Design | Starting GIFs | Layout |
| --- | ---: | --- |
| [Dentelle Room](praline-dentelle-room-thread-01.txt) | 2 | A pleated confectionery-paper frame, paired ribbon-wide portraits and a generous centred reading page. |
| [Filament](praline-filament-thread-02.txt) | 0 | An open literary page with a flowing italic heading and a fine spun-sugar line ornament. |
| [Caissette](praline-caissette-thread-03.txt) | 1 | A portrait inset beside a narrow title column, opening into a full-width reply with a folded-paper foot. |
| [Pralinograph](praline-pralinograph-thread-04.txt) | 2 | A paired portrait frieze with an inset nameplate and a low, wide title above an indented reading column. |
| [Noisette Ledger](praline-noisette-ledger-thread-05.txt) | 0 | A letterpress-inspired page with a coloured double-rule masthead, an oversized initial-like ornament and small caramel grains. |

## Comms

| Design | Starting GIFs | Layout |
| --- | ---: | --- |
| [Glacé Chat](praline-glace-chat-comms-01.txt) | 1 | A softly squared smartphone with a broad contact-photo header, a tiny offset camera and rounded received messages. |
| [Prali-Slide](praline-prali-slide-comms-02.txt) | 0 | A compact slider handset with a recessed chat screen, a ridged sliding joint and a visible numeric keypad. |
| [Bonbon Mail](praline-bonbon-mail-comms-03.txt) | 2 | A small desktop messenger window with a twin-avatar toolbar, window controls and neatly stacked chat bubbles. |
| [Sucrose Touch](praline-sucrose-touch-comms-04.txt) | 1 | An angular slim phone with a contact tile, outlined message bubbles and an off-centre navigation wheel. |
| [Pocket Temper](praline-pocket-temper-comms-05.txt) | 0 | A compact wrist-device messenger with ribbed straps, a side crown and a tall rounded display. |

## Buds

| Design | Starting GIFs | Layout |
| --- | ---: | --- |
| [Sugar Pleat](praline-sugar-pleat-bud-01.txt) | 0 | A miniature pleated note with a broad serif title and a fine member-colour paper edge. |
| [Gossamer](praline-gossamer-bud-02.txt) | 1 | A light asymmetric reply with a narrow portrait stamp and a threadlike loop at its foot. |
| [Deux Bouchées](praline-deux-bouchees-bud-03.txt) | 2 | Two tiny portrait squares share a stepped confectionery-paper band above a compact reply. |
| [Paillette](praline-paillette-bud-04.txt) | 0 | A horizontal miniature note with a small faceted sugar flake and a coloured title rail. |
| [Pralinette](praline-pralinette-bud-05.txt) | 1 | A tiny confectionery sleeve with a full-width photo lip, a folded name tab and a short reply. |

## Editing

The linked `[name]` and `[url]`, followed by the title or contact status `[text]`, are at the top of every snippet. Comms times and GIF URLs follow where used. The lorem ipsum sits inside `prl-copy`, before the small decorative elements and the stylesheet link. There are no comments, hidden tips or editing notes inside the posting HTML or CSS.

The preview shows **Dongmin & Yonggi** and a sample title when those fields still contain placeholders. Replace the fields to put your own names and title into copied code. Each design keeps its edits while the preview stays open. **Copy code** and **Download .txt** export the selected design with your current edits; **Reset design** restores that design's defaults.

The editor converts `[b]`, `[i]` and `[u]` into HTML. When editing a raw `[dohtml]` snippet, use `<b>`, `<i>` and `<u>` directly; `<strong>` and `<em>` also work. Bold and underlined lettering follow member colours **1 → 2 → 3**; italics reverse this to **3 → 2 → 1**. Underlines retain a visible rule. The lettering mixes member colours towards the neutral text colour for legibility.

Separate paragraphs and comms messages with plain `<p>` elements. Successive opening `<p>` tags work without individually closing each message. No repeated message classes or divs are required. Comms support `data-flow="received"`, `"sent"` and `"alternate"`. Device keys and window controls are decorative. Each bud starts with 36 words and is intended for replies of 100 words or fewer; longer writing is not clipped.

## GIFs and member colours

Starting GIF counts are composition choices. Use **Add GIF**, **Remove** or clear a URL to change the count; crop sliders adjust the vertical framing. Copied code includes only populated GIFs. In a raw snippet, remove an unwanted `<img>` tag. Empty image containers are hidden, and image-dependent columns collapse when no GIF remains. The two supplied placeholder URLs are preserved exactly.

Inherited `--mgrgb1`, `--mgrgb2` and `--mgrgb3` RGB variables provide the member palette. Keep the snippet within your forum's member-colour scope. The preview's colour pickers change only its sample display; those colours are not written into the posting snippet.

Neutral surfaces follow Blue Hour's `html[color-mode="light"]` and `html[color-mode="dark"]`. An explicit forum mode takes precedence over the system-preference fallback. The preview also offers Fit, 320 px and 550 px widths. All forum CSS is scoped to `.bh-praline`. No external fonts, icon libraries, JavaScript or forum-wide CSS changes are needed for a post.

## Repository integration

All snippets contain one jsDelivr link to [praline-atelier-v1.css](praline-atelier-v1.css), pinned to the immutable GitHub revision in [stylesheet-revision.txt](stylesheet-revision.txt).

Run `node praline/build.cjs` from the repository root to regenerate all fifteen snippets and the standalone preview. `designs.json` defines the catalogue, `praline-model.js` builds posting markup, and `praline-editor.js` powers the preview controls.

[VALIDATION.md](VALIDATION.md) records the completed checks and their limits. Browser visual rendering and posting on the live forum remain unverified.
