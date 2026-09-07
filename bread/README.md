# Bread collection

Fifteen JCink templates inspired by the Bread poster: paper-bag folds, recipe notes, wheat engravings, scored loaves, and soft bakery windows. Inherited member colours shape the headers, frames, borders, and formatted text. Writing sits on neutral light or dark paper.

[Preview and editor](bread-collection-preview.html) · [Download the complete collection](bread-collection.zip)

| No. | Thread | Comms | Bud |
| --- | --- | --- | --- |
| 01 | [Pain de Papier](bread-pain-de-papier-thread-01.txt) | [Crumbline](bread-crumbline-comms-01.txt) | [Petit Pain](bread-petit-pain-bud-01.txt) |
| 02 | [Levain Letters](bread-levain-letters-thread-02.txt) | [Toast Talk](bread-toast-talk-comms-02.txt) | [Sesame Kiss](bread-sesame-kiss-bud-02.txt) |
| 03 | [Hearthbound](bread-hearthbound-thread-03.txt) | [Batch Chat](bread-batch-chat-comms-03.txt) | [Crustlet](bread-crustlet-bud-03.txt) |
| 04 | [The Proofing Room](bread-the-proofing-room-thread-04.txt) | [Butterwire](bread-butterwire-comms-04.txt) | [Rye Note](bread-rye-note-bud-04.txt) |
| 05 | [Sunday Crust](bread-sunday-crust-thread-05.txt) | [Daily Knead](bread-daily-knead-comms-05.txt) | [Pocket Roll](bread-pocket-roll-bud-05.txt) |

## Copy and edit

Open a named `.txt` file, select **Raw**, and copy the full `[dohtml]` block into your post. The single stylesheet link is included. `[url]`, `[name]`, `[text]`, the two supplied Tumblr GIFs, and lorem ipsum writing are at the top. There are no comments, hidden instructions, or editing tips in the template HTML or CSS.

Replace `[url]` with a profile or thread URL, `[name]` with the character name or names, and `[text]` with a title or status. Both GIFs are actual image elements; replace their URLs or delete an image line. `object-position` controls the crop. Removing the entire GIF container also works.

Download the preview HTML and open it in a browser to browse all 15 designs. Use the type buttons, named choices, or Previous/Next. Each design keeps its own edits for the current page session. The preview includes editable fields, GIF crops, member palette controls, light/dark/system modes, live formatting, and Copy/Download actions. The original snippets remain available in a disclosure even if JavaScript is disabled. The preview's styling is embedded; GIFs and Google Fonts require an internet connection.

Use ordinary `<p>` paragraphs. Comms create one bubble per paragraph, including successive opening `<p>` tags without closing tags. `data-direction="received"` gives incoming messages; change it to `sent` for outgoing messages. Times and the receipt label are editable. The handset details are decorative, with no fake send buttons.

The preview editor accepts `[b]`, `[i]`, and `[u]` and converts them to HTML. Inside `[dohtml]`, use `<b>`, `<i>`, and `<u>` (also `<strong>` and `<em>`). Bold and underline use group 1 → 2 → 3; italics reverse this to group 3 → 2 → 1. Bud samples are under 100 words. Their editor counts words without truncating the reply.

## Styling

All current snippets load `bread-collection-v1.css` through jsDelivr. They need no forum JavaScript, IDs, inline instructions, or extra image assets. Styles are scoped to `.brd`, separate from older `.bh-bread` templates.

Colours inherit Blue Hour's comma-separated RGB variables `--mgrgb1`, `--mgrgb2`, and `--mgrgb3`. The preview's test palettes never become fixed colours in the copied snippet. Explicit `html[color-mode="light"]` and `html[color-mode="dark"]` override the system preference, which applies only when the attribute is absent.

Cormorant Garamond, DM Sans, and Nanum Pen Script use Google Fonts with local fallbacks. Wheat, loaf, scoring, and banneton drawings are original SVG masks embedded in the CSS. Bread accents stay small while member colours drive the design.

## Designs

- **Pain de Papier (thread):** Folded paper-bag seams and a pair of framed keepsakes.
- **Levain Letters (thread):** A handwritten recipe page with pinned photographs.
- **Hearthbound (thread):** Twin bakery windows with a soft, arched silhouette.
- **The Proofing Room (thread):** A slender portrait rail, a banneton seal, and room to write.
- **Sunday Crust (thread):** A linen edge and two portraits tucked beside the title.
- **Crumbline (comms):** A classic handset with a paper-band contact header.
- **Toast Talk (comms):** A compact phone with a double portrait screen.
- **Batch Chat (comms):** A small desktop messenger with recipe-card portraits.
- **Butterwire (comms):** An intimate contact bar with overlapping arched avatars.
- **Daily Knead (comms):** A rounded handset with a bakery-window contact card.
- **Petit Pain (bud):** A miniature loaf label and two tiny arched portraits.
- **Sesame Kiss (bud):** Two portrait coins tucked beside a little reply.
- **Crustlet (bud):** A folded bakery packet with small photograph stamps.
- **Rye Note (bud):** A handwritten note with a narrow portrait margin.
- **Pocket Roll (bud):** A pocket-sized letter with a cinematic GIF ribbon.

## Earlier Bread templates

The earlier `bread.css`, `bread-thread.css`, `bread-thread-variants.css`, `bread-comms.css`, `bread-buds.css`, and their combined snippet files are retained for existing forum posts. The 15 individually named files above are the new collection.
