# Portuguese cuisine · À mesa

Fifteen JCink templates for **Seojun & Wenjun**: five threads, five device-style comms and five miniature buds. Seafood tins, pastry paper, café hardware and small Portuguese table details sit alongside member colours on neutral backgrounds.

[Preview and editor](portuguese-cuisine-collection-preview.html)

Open a named `.txt` file below, choose **Copy raw file** on GitHub, and paste the complete block into your post. Each file already contains `[dohtml]`, its stylesheet link and `[/dohtml]`. No additional injection script is needed.

Download the preview HTML and open it in a browser to compare, edit and copy all fifteen designs. The preview is self-contained apart from the supplied GIFs. GitHub displays HTML as source.

## Threads

| Design | Starting GIFs | Layout |
| --- | ---: | --- |
| [Conserva de Saudade](portuguese-cuisine-conserva-de-saudade-thread-01.txt) | 2 | A rounded seafood tin with a raised pull tab, engraved side ribs and two portrait compartments. |
| [Mil Folhas](portuguese-cuisine-mil-folhas-thread-02.txt) | 1 | A pastry-paper composition with a scalloped portrait mat, stacked fine edges and a broad italic heading. |
| [Maré à Mesa](portuguese-cuisine-mare-a-mesa-thread-03.txt) | 2 | An open coastal composition with twin low portrait windows, undulating borders and a sardine engraving. |
| [Tasca das Horas](portuguese-cuisine-tasca-das-horas-thread-04.txt) | 0 | An oversized typographic menu with a checkerboard side seam and a small diamond table number motif. |
| [Nata de Domingo](portuguese-cuisine-nata-de-domingo-thread-05.txt) | 1 | A custard-tart rosette above a quiet page, with a circular portrait, radiating pastry folds and a central caption. |

## Comms

| Design | Starting GIFs | Layout |
| --- | ---: | --- |
| [Bica Chamada](portuguese-cuisine-bica-chamada-comms-01.txt) | 1 | A slim phone with a circular contact portrait tucked into the left bezel and an espresso-cup home key. |
| [Piri-Piri Ping](portuguese-cuisine-piri-piri-ping-comms-02.txt) | 0 | A clipped-corner handset with a perforated speaker, angular bubbles and a chilli-shaped signal mark. |
| [Linha de Mercado](portuguese-cuisine-linha-de-mercado-comms-03.txt) | 1 | A small café counter terminal with a landscape contact screen, inset messages and three broad lower keys. |
| [Doce Recado](portuguese-cuisine-doce-recado-comms-04.txt) | 2 | A candybar phone with paired narrow contact windows, a striped confectionery bezel and a circular navigation ring. |
| [Mesa Reservada](portuguese-cuisine-mesa-reservada-comms-05.txt) | 0 | A tabletop smart display with an offset clock, wide message panel and a short pedestal stand. |

## Buds

| Design | Starting GIFs | Layout |
| --- | ---: | --- |
| [Migalha](portuguese-cuisine-migalha-bud-01.txt) | 0 | A short paper offcut with a dotted crumb trail and an oversized member-colour corner bracket. |
| [Beijinho de Canela](portuguese-cuisine-beijinho-de-canela-bud-02.txt) | 1 | A compact cinnamon-kiss note with a round portrait at the right and a tiny crossed-spice detail. |
| [Sal de Mar](portuguese-cuisine-sal-de-mar-bud-03.txt) | 0 | A miniature wavy salt label with a diamond seal and a short centred title. |
| [Gota de Azeite](portuguese-cuisine-gota-de-azeite-bud-04.txt) | 1 | A spare note with a droplet portrait, a thin pouring line and a small name set against the frame. |
| [Última Colher](portuguese-cuisine-ultima-colher-bud-05.txt) | 2 | A petite dessert card with two small square portraits beside a spoon-shaped divider beneath the reply. |

## Editing and formatting

The first editable fields in every snippet are `[url]`, `[name]` and `[text]`. `[text]` is the heading or contact status. GIF URLs, comms time and writing follow, above the decorative element and stylesheet link. The templates and shared CSS contain no comments, hidden tips or editing instructions.

The preview displays Seojun & Wenjun and sample headings. Default exported snippets keep the requested placeholders. Enter your own values in the editor to include them in copied code. Edits remain for each design while the preview is open; **Download .txt** saves an edited version.

Use ordinary `<p>` paragraphs for writing. Each paragraph inside a comms message area becomes a bubble. Successive opening `<p>` tags also work without individual closing tags. `data-flow="received"`, `"sent"` or `"mixed"` controls alignment. Device keys and signal marks are decorative.

The editor converts `[b]`, `[i]` and `[u]` into HTML emphasis. In directly edited `[dohtml]` blocks use `<b>`, `<i>` and `<u>`; whether raw BBCode is parsed inside `[dohtml]` depends on the forum. `<strong>` and `<em>` work too. Bold and underline use member colours 1 → 2 → 3; italics reverse the order. Emphasis colours mix with the neutral text colour to remain readable.

Buds begin with a 36-word sample and are intended for replies of about 100 words or fewer. Text areas grow with their content.

## Images

The two supplied Tumblr GIF URLs appear exactly as provided. Five designs start without an image, six with one and four with two. These are defaults, not limits. Add or remove GIFs and adjust their crop positions in the editor. Removing every image omits the image container from the exported code. The stylesheet also hides an empty media container and collapses portrait columns where appropriate.

When editing a raw snippet, add or remove `<img>` elements in `ptg-media`. Image-free designs can accept the same media block before `ptg-copy`. The provided image URLs are confined to the editable HTML, never embedded in the shared CSS.

## Member colours and modes

The templates inherit Blue Hour's `--mgrgb1`, `--mgrgb2` and `--mgrgb3` RGB triples. Missing secondary colours fall back to an available member colour. Headers, image frames, device cases, borders and emphasis use those colours. A muted spice accent is limited to tiny decorative details.

`html[color-mode="light"]` and `html[color-mode="dark"]` take priority over the system preference fallback. Preview palettes, colour pickers, mode and width controls stay outside exported forum code. The CSS is scoped to `.bh-portuguese`, with `ptg-` inner classes. Typography uses Georgia, Trebuchet MS, Arial and Courier New fallbacks. Motifs are CSS shapes and original embedded SVG masks; the forum snippets need no JavaScript or external font service.

The stylesheet uses modern CSS grid, container queries, `:has()`, `color-mix()` and text clipping. The preview's editor interface follows the existing collection workflow; all fifteen template layouts and motif drawings were created for this set.

## Files and checks

[portuguese-cuisine-mesa-v1.css](portuguese-cuisine-mesa-v1.css) is the shared stylesheet. Every exported snippet loads the immutable GitHub revision recorded in [stylesheet-revision.txt](stylesheet-revision.txt), served through jsDelivr.

Run `node portuguese-cuisine/build.cjs` from the repository root to regenerate the snippets and standalone preview. `designs.json` holds the catalogue, and `portuguese-cuisine-model.js` supplies default content and markup. Run `node portuguese-cuisine/validate.cjs` with `jsdom` and `css-tree` available to repeat the structural and editor checks.

[VALIDATION.md](VALIDATION.md) records the checks and their limits. Browser screenshots and a live JCink rendering check were unavailable in the creation session; the cloud browser blocked local preview URLs. The saved preview is provided for visual review.
