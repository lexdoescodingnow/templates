# Sake · Jett & Miles

Fifteen new JCink designs: five threads, five phone-style comms and five miniature buds. Sake-label typography, tasting-ring details and brewery-register rules connect the collection. Member colours run through headers, frames, rules and text accents; reading surfaces stay neutral.

[Download the preview and editor](https://github.com/lexdoescodingnow/templates/raw/refs/heads/main/sake/sake-collection-preview.html)

Open a named `.txt` file below and select **Copy raw file** on GitHub. Paste the complete block into your JCink post. Every snippet includes `[dohtml]` tags and one hosted stylesheet link.

The downloadable HTML preview runs when opened in a browser. GitHub’s file viewer shows its source. The editor, design catalogue and CSS are embedded; the character GIFs load from Tumblr.

## Threads

| Design | Starting GIFs | Layout |
| --- | ---: | --- |
| [Koji Chronicle](sake-koji-chronicle-thread-01.txt) | 0 | A tall brewery-label page with an inset title block, three-colour margin bars and a generous uninterrupted letter. |
| [Kikichoko Reverie](sake-kikichoko-reverie-thread-02.txt) | 1 | A tasting-ring portrait sits between two fine horizontal rules, opening into a centred title and spacious prose. |
| [Moromi Interval](sake-moromi-interval-thread-03.txt) | 2 | A narrow name rail meets a broad letter with two unequal rectangular portraits and an offset typographic heading. |
| [Kurabito Ledger](sake-kurabito-ledger-thread-04.txt) | 0 | An open brewer's ledger with a broad left register, stepped colour rules and a quiet serif reading column. |
| [Ginjo Veil](sake-ginjo-veil-thread-05.txt) | 1 | A wide portrait under a translucent label band, asymmetric corner brackets and a fine-lined writing panel. |

## Comms

| Design | Starting GIFs | Layout |
| --- | ---: | --- |
| [Kura Dial](sake-kura-dial-comms-01.txt) | 1 | A slim smartphone with an inset square contact portrait, a narrow earpiece and rounded incoming messages. |
| [Koji Key](sake-koji-key-comms-02.txt) | 0 | A compact keyboard handset with a recessed message display, a two-tone name bar and a tactile key deck. |
| [Masu Relay](sake-masu-relay-comms-03.txt) | 2 | A square folding communicator with a slim twin-contact panel beside its larger conversation screen. |
| [Namazake Touch](sake-namazake-touch-comms-04.txt) | 1 | A tall edge-to-edge phone with a full-width contact photograph, oversized clock and floating neutral message cards. |
| [Shizuku Signal](sake-shizuku-signal-comms-05.txt) | 0 | A compact flip handset with a separate clock display, a narrow hinge and a stepped lower conversation panel. |

## Buds

| Design | Starting GIFs | Layout |
| --- | ---: | --- |
| [Ochoko](sake-ochoko-bud-01.txt) | 1 | A tiny tasting-circle portrait sits beside a compact reply, anchored by a fine three-colour footer. |
| [Komelet](sake-komelet-bud-02.txt) | 0 | A narrow miniature label with double outer rules, a notched name band and a short centred heading. |
| [Kasumi Slip](sake-kasumi-slip-bud-03.txt) | 1 | A flat keepsake slip pairs a shallow panoramic portrait with a delicately offset title and short reply. |
| [Tomezoe](sake-tomezoe-bud-04.txt) | 0 | A spare reply card with a vertical colour register, a low-set heading and a right-aligned name strip. |
| [Renzoku](sake-renzoku-bud-05.txt) | 2 | Two small square portraits stack in a narrow side rail next to a shared miniature letter. |

## Editing

The linked `[name]` and `[url]` are the first editable fields in every snippet, followed by the heading or contact status `[text]`. Comms times and any character GIFs follow. Lorem ipsum sits in `sk-copy`, above decorative elements and the stylesheet link. Posting HTML and CSS contain no comments, hidden tips or instructions.

The preview displays **Jett & Miles**, or **Miles** as the comms contact, while the initial field values remain placeholders. Copy code and Download .txt export the current field values. Each design retains its edits while the page remains open; Reset design restores that design’s defaults.

Use ordinary `<p>` paragraphs for writing and separate messages. Successive opening `<p>` tags are supported without repeating a class or a div for each message. Comms offer received, sent and alternating message layouts through `data-flow`. The device controls are decorative. Buds begin with 36 words and are designed for replies of 100 words or fewer; longer replies remain visible.

The editor accepts `[b]`, `[i]` and `[u]` and converts them into `<b>`, `<i>` and `<u>`. For direct raw `[dohtml]` posting, use those HTML tags. `<strong>` and `<em>` are supported too. Bold and underline use member colours **1 → 2 → 3**; italics reverse them to **3 → 2 → 1**. Underlining retains a visible line. Emphasis colours mix toward the neutral text colour for readability.

## Images and themes

The supplied Tumblr GIF addresses are retained exactly, including `.gifv`. The starting image counts vary with the layout. Add GIF, Remove, blank URLs and crop controls update the preview and exported code together. To remove an image directly in a snippet, delete its `<img>` element. Empty media containers collapse, and image-dependent columns reflow. Image-free designs can also accept images through the editor.

The forum’s inherited `--mgrgb1`, `--mgrgb2` and `--mgrgb3` comma-separated RGB variables provide the palette. The snippets should sit inside the forum’s member-colour scope. Preview colour controls change only the preview; they do not hard-code member colours in exported snippets.

Blue Hour’s `html[color-mode="light"]` and `html[color-mode="dark"]` set the neutral surfaces. An explicit forum mode takes precedence over the system preference. The preview provides Fit, 320 px and 550 px widths. All posting CSS is scoped to `.bh-sake-brew`; posts need no JavaScript, external fonts or icon libraries. The styling uses modern CSS grid, flexbox, `:has()`, `color-mix()` and container queries.

## Source and integration

`designs.json` and `sake-model.js` generate the fifteen named snippets. Run `node sake/build.cjs` from the repository root to rebuild them and the standalone preview. The hosted posting CSS is pinned to the immutable GitHub revision in `stylesheet-revision.txt`. The earlier Sake files remain available for existing posts; the new collection has its own wrapper and stylesheet.

[Validation details](VALIDATION.md).

