# Honey · Kota & Yuki

Fifteen coordinated JCink templates: five full threads, five electronic-message comms and five miniature buds. Comb cells, honey-dipper grooves, small bee marks, wax seals and falling drops connect the set. Member colours carry the frames, headers, borders and text accents over neutral reading surfaces.

[Download the preview and editor](https://github.com/lexdoescodingnow/templates/raw/refs/heads/main/honey/honey-collection-preview.html)

Open a named `.txt` file below and choose **Copy raw file** on GitHub. Paste the complete block into your JCink post; its `[dohtml]` tags and hosted stylesheet link are already included. Download the HTML preview and open it in a browser to browse, edit and copy the designs. GitHub's file viewer displays HTML source.

## Threads

| Design | Starting GIFs | Layout |
| --- | ---: | --- |
| [Comb Archive](honey-comb-archive-thread-01.txt) | 2 | Two hexagonal portraits lock into a comb-shaped header beside a large serif title and an open letter. |
| [The Slow Pour](honey-the-slow-pour-thread-02.txt) | 0 | A long honey-dipper stroke and falling drops border an airy, writing-led page. |
| [Apiary No. Two](honey-apiary-no-two-thread-03.txt) | 1 | A bevelled portrait window meets a small bee emblem and a tall, offset typographic header. |
| [Wax & Wane](honey-wax-and-wane-thread-04.txt) | 0 | A scalloped wax seal anchors a double-framed letter with an asymmetric title and inset name band. |
| [Melliferous](honey-melliferous-thread-05.txt) | 1 | A panoramic portrait rests beneath a wide italic heading, between grooved dipper rails and a soft-ended letter. |

## Comms

| Design | Starting GIFs | Layout |
| --- | ---: | --- |
| [Hivewire](honey-hivewire-comms-01.txt) | 1 | A slim smartphone with a hexagonal camera island, honeycomb contact portrait and softly tailed messages. |
| [Nectar Ping](honey-nectar-ping-comms-02.txt) | 0 | A squat pocket pager with a monochrome display, offset clock and a recessed circular navigation wheel. |
| [Buzzline](honey-buzzline-comms-03.txt) | 1 | A narrow handset with a grooved case, a panoramic contact screen and a honeycomb key deck. |
| [Royal Relay](honey-royal-relay-comms-04.txt) | 2 | An open flip phone joins two clipped contact windows to a separate conversation screen through a ribbed hinge. |
| [HoneyOS](honey-honeyos-comms-05.txt) | 0 | A broad touch phone pairs an oversized clock with a scalloped contact tab and inset notification cards. |

## Buds

| Design | Starting GIFs | Layout |
| --- | ---: | --- |
| [Combkiss](honey-combkiss-bud-01.txt) | 0 | A tiny bevelled note with a cluster of open comb cells and a coloured corner. |
| [Dipperlet](honey-dipperlet-bud-02.txt) | 1 | A miniature portrait is suspended beside a short reply from a fine, grooved dipper bar. |
| [Waxwing](honey-waxwing-bud-03.txt) | 0 | A narrow folded note is fastened by a small scalloped wax seal and a diagonal colour clasp. |
| [Twin Drops](honey-twin-drops-bud-04.txt) | 2 | Two teardrop portraits touch above a tiny centred title and a shared miniature reply. |
| [Afterglaze](honey-afterglaze-bud-05.txt) | 1 | A landscape keepsake puts a low panoramic image under a short letter, with a liquid-curved colour edge. |

## Editing

Every snippet begins with the linked `[name]` and `[url]`, followed by the `[text]` title or contact status. The time, GIFs and lorem ipsum writing follow. Decoration and the stylesheet link come last. There are no comments, hidden tips or editing instructions in the posting HTML or CSS.

The preview displays **Kota & Yuki** on threads, buds and Royal Relay, and **Yuki** as the other comms contact. Exported code keeps `[name]`, `[url]` and `[text]` until you change the fields. Copy code and Download .txt export your current edits. Each design retains its edits while the preview remains open. Reset design restores only the selected design.

Use ordinary `<p>` elements for paragraphs and separate message bubbles. Successive opening `<p>` tags work without per-message classes or divs. Comms support `data-flow="received"`, `"sent"` and `"alternate"`. The device hardware is decorative.

The editor converts `[b]`, `[i]` and `[u]` to HTML formatting. In a raw `[dohtml]` snippet, use `<b>`, `<i>` and `<u>`; `<strong>` and `<em>` also work. Bold and underline use member colours 1 → 2 → 3, and italics use 3 → 2 → 1. Underline retains a visible line. Text gradients mix toward the neutral text colour for readability.

Buds start with a 36-word reply and suit writing of 100 words or fewer. The editor includes a word counter. Extra writing expands the template instead of being clipped.

## GIFs, colours and themes

The collection starts with six image-free designs, six single-GIF designs and three paired-GIF designs. These are layout choices, not limits. Both supplied Tumblr GIF URLs are retained exactly, including `.gifv`. Add, remove, replace and crop images in the editor; the preview and exported code update together. Every design can accept GIFs. Removing all images also removes the corresponding media row or column. When editing raw snippets, delete an unwanted `<img>` or the entire `hn-media` element.

The templates inherit `--mgrgb1`, `--mgrgb2` and `--mgrgb3` as comma-separated RGB triplets from the forum's member-colour scope. The preview's three palette controls are for display only; exports continue to inherit the current member's colours. Honey's small amber details do not replace the member palette.

Blue Hour's `html[color-mode="light"]` and `html[color-mode="dark"]` take precedence over the system preference fallback. The preview offers light/dark modes and Fit, 320 px and 550 px widths. Reading surfaces remain neutral in both modes.

All posting CSS is scoped to `.bh-honey`. It uses modern CSS grid, `:has()`, `color-mix()` and container queries. Posting snippets need no JavaScript, icon library or external fonts. Decorative motifs are drawn in CSS; the character GIFs load from Tumblr.

## Source and verification

`designs.json` and `honey-model.js` supply the named snippets and editor defaults. Run `node honey/build.cjs` from the repository root to rebuild the fifteen posting files and standalone editor. The editor embeds its CSS and JavaScript; only its character GIFs need a network connection. The posting stylesheet is pinned to the immutable GitHub commit recorded in `stylesheet-revision.txt`.

See [VALIDATION.md](VALIDATION.md) for completed checks and the limits of browser verification.
