# Cream · Haoyu & Malachi

Fifteen coordinated JCink templates: five threads, five electronic-device comms and five miniature buds. Cream appears through soft curves, layered borders, neutral surfaces and serif typography. Member colours carry the headers, frames and text accents.

[Download the preview and editor](https://github.com/lexdoescodingnow/templates/raw/refs/heads/main/cream/cream-collection-preview.html)

Open a named `.txt` below and use **Copy raw file** on GitHub. Paste the complete block into your post; the `[dohtml]` tags and stylesheet link are included.

Download the preview HTML and open it in your browser to browse, edit and copy all fifteen designs. The preview contains its CSS and editor, so it can open as a local file. The placeholder GIFs require a connection. GitHub displays HTML as source rather than rendering it.

## Threads

| Design | Starting GIFs | Layout |
| --- | ---: | --- |
| [Chantilly Chamber](cream-chantilly-chamber-thread-01.txt) | 2 | A broad inset title between curved colour bands, two wide portraits and a generous single reading column. |
| [Double Fold](cream-double-fold-thread-02.txt) | 2 | A narrow photographic left wing meets an offset title and long writing panel; the paired images sit in a vertical stack. |
| [Clotted Reverie](cream-clotted-reverie-thread-03.txt) | 0 | A quiet literary page with a large inset quotation title, double cream-toned borders and a generous dropped initial. |
| [Crème Diplomate](cream-creme-diplomate-thread-04.txt) | 1 | A low panoramic photograph beneath a split title-and-name header, held by fine alternating colour rules. |
| [Satin Custard](cream-satin-custard-thread-05.txt) | 0 | An asymmetric rounded panel with a large title descending beside a narrow colour seam and a soft inset writing surface. |

## Comms

| Design | Starting GIFs | Layout |
| --- | ---: | --- |
| [Softline](cream-softline-comms-01.txt) | 1 | A tall smartphone with a large rounded contact tile, slim status strip and soft incoming bubbles. |
| [Whip Signal](cream-whip-signal-comms-02.txt) | 0 | A compact square communicator with a prominent clock, layered screen corners and short squared message bubbles. |
| [Crème Connect](cream-creme-connect-comms-03.txt) | 2 | A wide smartphone with a twin-photo contact banner, contrasting side bezels and a rounded conversation panel. |
| [Silk Relay](cream-silk-relay-comms-04.txt) | 1 | A slim messaging handset with an inset portrait beside the contact details, an edge-lit screen and compact chat bubbles. |
| [Velvet Inbox](cream-velvet-inbox-comms-05.txt) | 0 | A wide tablet messenger with a vertical time rail, a recessed conversation screen and three small navigation marks. |

## Buds

| Design | Starting GIFs | Layout |
| --- | ---: | --- |
| [Dollop](cream-dollop-bud-01.txt) | 0 | A tiny rounded reply with one lifted corner, a colour-block name tab and a short italic title. |
| [Petite Rosette](cream-petite-rosette-bud-02.txt) | 1 | A small square portrait interrupts the top rule of a compact centred note with a double-line frame. |
| [Creamdrop](cream-creamdrop-bud-03.txt) | 0 | A brief open reply beside a broad curved colour bracket, with the name following the title. |
| [Two Spoonfuls](cream-two-spoonfuls-bud-04.txt) | 2 | Two miniature square portraits bookend a centred heading above a short shared reply. |
| [Last Lick](cream-last-lick-bud-05.txt) | 0 | A horizontal closing note with a right-aligned signature, a fine three-colour underline and a compact reading area. |

## Editing

Each snippet begins with `[url]`, `[name]` and `[text]`. `[text]` is the title or contact status; the reply is the lorem ipsum inside `crm-copy`. GIFs and comms time also appear before the writing. The single stylesheet link comes last. Posting snippets and shared CSS contain no comments, hidden tips or editing instructions.

The preview shows Haoyu & Malachi and a sample title while those fields contain placeholders. Copied code retains the actual field values, so fill in the name and title to export them. Each design retains your edits while the page is open. Use **Download .txt** to keep an edited snippet.

The editor accepts `[b]`, `[i]` and `[u]`, converting them to HTML. Inside a raw `[dohtml]` block use `<b>`, `<i>` and `<u>`; whether BBCode is parsed there depends on the forum. `<strong>` and `<em>` work too. Bold and underline use the forward member-colour gradient, 1 → 2 → 3. Italics reverse it, 3 → 2 → 1.

Separate comms messages with ordinary `<p>` tags; successive opening `<p>` tags also work without individual closing tags. No per-message class or div is required. `data-flow="received"`, `"sent"` and `"alternate"` select the message direction. Phone and tablet hardware is decorative; the editable conversation is inside `crm-copy`.

Buds start with 36 words, below the 100-word target. All writing areas grow with their contents.

## GIFs, colours and modes

Seven designs start without GIFs, four with one and four with two. The supplied Tumblr URLs are used exactly. Counts are defaults: the editor adds and removes GIFs and changes vertical cropping. Removing all images omits the media container and reclaims the space. Every image-free template accepts a `crm-media` block before `crm-copy` when wanted.

The forum supplies RGB triples through `--mgrgb1`, `--mgrgb2` and `--mgrgb3`. Missing secondary colours fall back to the available member colour. Preview palette changes never override the forum in copied code. Member colours mix with neutral ink in text emphasis to improve readability; the small cream border accent stays neutral.

`html[color-mode="light"]` and `html[color-mode="dark"]` override the operating-system preference. Without either attribute, the system preference provides the fallback. Rules are scoped to `.bh-cream`, with `crm-` child classes. Multiple Cream designs can share one post without IDs or template scripts.

Georgia, Trebuchet MS, Arial and Courier New supply typography without external font dependencies. Modern CSS grid, flexbox, `:has()`, `color-mix()` and container queries support the layouts. The collection uses the two supplied GIFs and abstract CSS framing, with no additional asset downloads.

## Source and verification

The snippets load [cream-patisserie-v1.css](cream-patisserie-v1.css) from an immutable GitHub revision through jsDelivr. [stylesheet-revision.txt](stylesheet-revision.txt) records that revision. No JavaScript injection is required in forum posts.

Run `node cream/build.cjs` from the repository root to rebuild the fifteen snippets and standalone preview. `designs.json` holds the collection names; `cream-model.js` generates the posting markup. `cream-editor.js` and `cream-preview.css` belong to the preview only.

[VALIDATION.md](VALIDATION.md) records checks and their limits. A live JCink posting test has not been performed.
