# Fudge · Ren & Tsubasa

Fifteen coordinated JCink templates: five threads, five device comms and five miniature buds. Scored slabs, marbled seams, foil folds and tiny cocoa accents tie the set together. Member colours drive the lettering, borders, frames and device details; the writing surfaces stay neutral.

[Download the preview and editor](https://github.com/lexdoescodingnow/templates/raw/refs/heads/main/fudge/fudge-collection-preview.html)

Open a named `.txt` below, use **Copy raw file** on GitHub, and paste the complete block into your post. Each block includes its `[dohtml]` tags and hosted stylesheet link.

To preview and edit, download the HTML file and open it in your browser. It contains the styles and editor. GitHub displays HTML as source; downloading it lets you use the interactive preview. GIFs load from the supplied Tumblr links.

## Threads

| Design | Starting GIFs | Layout |
| --- | ---: | --- |
| [Softcut Atelier](fudge-softcut-atelier-thread-01.txt) | 2 | A scored confectionery slab: a bold condensed title, two square portraits in a stepped tray, and a broad reading panel with a coloured cut edge. |
| [Marble Batch](fudge-marble-batch-thread-02.txt) | 0 | An open, asymmetric page with a fine marbled side panel and a large serif title floating across the seam. |
| [Copper Set](fudge-copper-set-thread-03.txt) | 1 | A thin foil frame around a tall portrait and a compressed heading; a tiny cocoa-coloured square seals the generous text panel. |
| [Ribbon Knife](fudge-ribbon-knife-thread-04.txt) | 2 | A long diagonal cutting line passes between two staggered photo tiles, with a small aligned title and a wide, quiet reading column. |
| [Aftermelt](fudge-aftermelt-thread-05.txt) | 0 | An indented literary page topped with oversized outline lettering, a block of member-colour bars and a small sugar-grain constellation. |

## Comms

| Design | Starting GIFs | Layout |
| --- | ---: | --- |
| [Fudgephone](fudge-fudgephone-comms-01.txt) | 1 | A flat-edged smartphone with a square camera aperture, contact portrait, incoming bubbles and a three-part navigation strip. |
| [Setline](fudge-setline-comms-02.txt) | 0 | A compact candybar handset with a speaker grille, inset chat screen, broad clock bar and three chunky hardware keys. |
| [Twin Temper](fudge-twin-temper-comms-03.txt) | 2 | A book-fold phone: stacked contact windows occupy one screen, messages fill the second, and a narrow scored hinge connects them. |
| [Sugarbyte](fudge-sugarbyte-comms-04.txt) | 1 | An upright keyboard phone with a small square portrait, a recessed conversation screen and a compact physical QWERTY deck. |
| [Confection OS](fudge-confection-os-comms-05.txt) | 0 | A slim transparent-edge smartphone with an offset camera strip, a ticket-like contact header and sharply inset message bubbles. |

## Buds

| Design | Starting GIFs | Layout |
| --- | ---: | --- |
| [Cubit](fudge-cubit-bud-01.txt) | 0 | A tiny square reply with an extruded member-colour edge, a scored corner and a compact title. |
| [Saltpin](fudge-saltpin-bud-02.txt) | 1 | A compact portrait-led note with a fine vertical rule and three small salt-crystal marks beside the title. |
| [Niblet](fudge-niblet-bud-03.txt) | 0 | A low, wide reply with a notched flavour tab, a condensed heading and a member-colour footing. |
| [Two Cuts](fudge-two-cuts-bud-04.txt) | 2 | Two narrow square-edged portraits bracket a small shared title above a brief reply on an inset confectionery tray. |
| [Crinkle](fudge-crinkle-bud-05.txt) | 0 | A miniature foil-inspired note with short crimped edges, a staggered signature and a little diagonal fold. |

## Editing

The first fields are the linked `[name]`, its `[url]`, and the title or contact status `[text]`. Comms time and GIF URLs follow. Replace the lorem ipsum inside `fdg-copy` with your writing. The single stylesheet link appears last. Template HTML and CSS contain no comments, hidden tips or editing instructions.

The preview displays **Ren & Tsubasa** and sample titles while the name/title fields still contain placeholders. Fill those fields to put your own values into the copied code. Each design keeps its edits while the preview is open. **Download .txt** saves the selected, edited snippet.

The editor accepts `[b]`, `[i]` and `[u]` and converts them to HTML. Raw `[dohtml]` files use `<b>`, `<i>` and `<u>` directly; `<strong>` and `<em>` also work. Bold and underline follow member colours **1 → 2 → 3**; italics use **3 → 2 → 1**.

Separate comms messages with ordinary `<p>` elements. Successive opening `<p>` tags work without individual closing tags; no repeated classes or message divs are needed. `data-flow="received"`, `"sent"` and `"alternate"` select the message direction. Device keys are decorative. Buds begin with a 36-word reply and suit replies of 100 words or fewer; longer writing is not clipped.

## Images and themes

GIF counts belong to the starting compositions, not a fixed requirement. Use **Add GIF**, **Remove**, and the crop controls in the preview. Clearing a GIF URL removes that image from generated code. In a raw snippet, remove an unwanted image tag; removing the final image also allows you to remove the empty `fdg-media` container. Empty media is hidden, and portrait columns collapse where needed.

The supplied URLs are preserved exactly. Both returned HTTP 200 with `image/gif` content types during verification. They remain third-party assets.

The forum's inherited `--mgrgb1`, `--mgrgb2` and `--mgrgb3` RGB values colour the templates. The preview colour pickers are examples and do not hard-code the posting palette. Group-colour text is mixed towards the neutral text colour for legibility. Neutral backgrounds switch with Blue Hour's `html[color-mode="light"]` and `html[color-mode="dark"]`. An explicit forum mode overrides the system preference fallback.

## Repository integration

Every snippet loads [fudge-confection-v1.css](fudge-confection-v1.css) through jsDelivr at the immutable GitHub revision in [stylesheet-revision.txt](stylesheet-revision.txt). All forum styling is scoped to `.bh-fudge`; no JavaScript or forum-wide stylesheet edit is needed in a post.

Run `node fudge/build.cjs` from the repository root to rebuild the snippets and standalone preview. `designs.json` defines the catalogue, `fudge-model.js` generates the markup, and `fudge-editor.js` powers the preview controls.

[VALIDATION.md](VALIDATION.md) records checks and limits. Browser visual rendering and live JCink posting have not been verified.
