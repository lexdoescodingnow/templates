# Delight collection

Fifteen JCink designs inspired by the supplied Delight poster: whipped dessert textures, fine glassware, heart-shaped spoons and romantic lettering. Member colours shape the headers, frames, rules, message bubbles and text emphasis over neutral backgrounds.

[Download the preview and editor](delight-collection-preview.html) · [Complete collection ZIP](delight-collection.zip)

| No. | Thread | Comms | Bud |
| --- | --- | --- | --- |
| 01 | [Cloudspun](delight-cloudspun-thread-01.txt) | [Pillowtalk](delight-pillowtalk-comms-01.txt) | [Softpeak](delight-softpeak-bud-01.txt) |
| 02 | [Mousse Amour](delight-mousse-amour-thread-02.txt) | [Sugar Dial](delight-sugar-dial-comms-02.txt) | [Blushdrop](delight-blushdrop-bud-02.txt) |
| 03 | [Chantilly Vow](delight-chantilly-vow-thread-03.txt) | [Rosewire](delight-rosewire-comms-03.txt) | [Cherubkiss](delight-cherubkiss-bud-03.txt) |
| 04 | [Parfait Reverie](delight-parfait-reverie-thread-04.txt) | [Whip Whisper](delight-whip-whisper-comms-04.txt) | [Rosette](delight-rosette-bud-04.txt) |
| 05 | [Velvet Spoon](delight-velvet-spoon-thread-05.txt) | [Sweet Frequency](delight-sweet-frequency-comms-05.txt) | [Last Spoonful](delight-last-spoonful-bud-05.txt) |

## Copy and edit

Open a named `.txt` file, choose **Raw**, and copy the complete `[dohtml]` block into your post. Its stylesheet link is already included. Names, links, titles, GIFs, time and writing come first; decoration and the stylesheet follow. Posting HTML and CSS contain no comments, hidden instructions or tips.

Replace `[url]`, `[name]` and `[text]` with your link, character name and title or status. Both supplied Tumblr GIFs and lorem ipsum are already inserted. Change an image URL or its `object-position` to adjust the crop. Either image, or the entire `dlt-gifs` container, can be removed.

Comms use one ordinary `<p>` per message. Successive opening `<p>` tags also work without closing tags. All bubbles belong to the current poster; set `data-direction="sent"` for outgoing alignment, or use `received`. No extra class or div is needed per message. The handset details are decorative. Buds encourage replies of 100 words or fewer; their sample replies are below that limit, and longer replies remain visible.

Within `[dohtml]`, use `<b>`, `<i>` and `<u>` for formatted writing. `<strong>` and `<em>` are supported too. The preview editor also accepts `[b]`, `[i]` and `[u]` and converts them into the appropriate HTML in copied snippets. Bold and underline follow member colours 1 → 2 → 3; italics reverse them to 3 → 2 → 1.

## Preview and editor

Download `delight-collection-preview.html` and open it in your browser. Select Threads, Comms or Buds and a named design, or use Previous and Next. Each design retains its edits during the current page session. The preview opens with example names and titles; the original GitHub `.txt` snippets retain the requested placeholders.

Names, links, title, both GIFs, crop positions, writing and comms time/direction are editable. **Copy code** and **Download snippet** use the current edits. **All 15 designs** shows the complete collection. Palette choices and Light/Dark/System controls affect the preview only; copied snippets inherit the forum's actual member colours. Edits are kept while the page remains open; download your snippet to keep them.

## Integration

The stylesheet is `delight-collection-v1.css`, loaded from jsDelivr. No JavaScript is required on the forum. All styles are scoped to `.dlt`. Member colours inherit the comma-separated RGB variables `--mgrgb1`, `--mgrgb2`, and `--mgrgb3`; the template does not override them. A forum group class can be added to the outer wrapper when a different group's palette is needed.

Blue Hour's `html[color-mode="light"]` and `html[color-mode="dark"]` take precedence over the system colour preference. If neither attribute is present, the system preference provides the fallback. Google Fonts provides Cormorant Garamond, Pinyon Script and DM Sans, with local fallbacks. The four original dessert ornaments are embedded SVG masks in the CSS; the supplied poster is inspiration and is not embedded. Online GIFs and fonts need internet access.

## Designs

- **Cloudspun (thread):** A softly rounded dessert-coupe frame with a sweeping script title and heart-shaped spoon.
- **Mousse Amour (thread):** A full-width portrait pair, fluted glass rim, and centred romantic serif title.
- **Chantilly Vow (thread):** An open-sided vow card with paired round portraits and a fine sugar-loop flourish.
- **Parfait Reverie (thread):** Uneven portrait layers, crisp coloured rules, and generous literary typography.
- **Velvet Spoon (thread):** A fluted side edge, text-first composition, and a little portrait signature below.
- **Pillowtalk (comms):** A soft rounded handset with coupe-shaped contact imagery and pillowy message bubbles.
- **Sugar Dial (comms):** A squared handset with a double-photo banner and neatly lined contact panel.
- **Rosewire (comms):** A slim messenger with stacked contact portraits and fine outlined bubbles.
- **Whip Whisper (comms):** A curved handset with whipped-peak portraits and softly edged messages.
- **Sweet Frequency (comms):** A colour-rimmed phone with a tinted contact panel and a slim portrait capsule.
- **Softpeak (bud):** A tiny dessert cup with a script heading and a short reply.
- **Blushdrop (bud):** A compact side-stacked portrait note with a coloured spine.
- **Cherubkiss (bud):** An open miniature vow with a double portrait signature after the reply.
- **Rosette (bud):** A turned-corner note with a whipped rosette and a small image pair.
- **Last Spoonful (bud):** A slim photo-topped card with a spoon flourish to finish.
