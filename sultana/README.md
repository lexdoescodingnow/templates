# Sultana

Fifteen JCink templates inspired by the supplied Sultana poster: engraved vinework, dried grape clusters, fluted velvet, fine frames and expressive serif lettering. Member colours shape the headers, frames, borders and emphasis; ordinary writing sits on neutral light or dark surfaces. All illustrations are original inline SVG linework.

[Standalone preview and editor](sultana-collection-preview.html) · [Complete collection ZIP](sultana-collection.zip)

Download the HTML preview and open it in your browser. Its styles and editor are included in that one file. Use the named design menu or **View all 15 designs** to browse the complete set. GitHub displays HTML source; the individual `.txt` files below are ready to copy directly.

## Threads

| Design | Default GIFs | Composition |
| --- | ---: | --- |
| [Vitis Obscura](sultana-vitis-obscura-thread-01.txt) | 1 | An engraved frontispiece with a portrait medallion, curling vinework and a generous literary page. |
| [Tendresse](sultana-tendresse-thread-02.txt) | 0 | A folded correspondence sheet, an oversized serif title and a small hanging cluster of sultanas. |
| [Twining Vows](sultana-twining-vows-thread-03.txt) | 2 | A pair of straight portrait panels, an engraved central ampersand and a double-thread frame. |
| [Velvet Vendange](sultana-velvet-vendange-thread-04.txt) | 1 | A fluted velvet heading and open writing, followed by a panoramic portrait and a fine vine signature. |
| [Late Harvest](sultana-late-harvest-thread-05.txt) | 0 | A trellis-edged literary folio with an inset title plaque, wide margins and a member-colour drop cap. |

## Comms

| Design | Default GIFs | Composition |
| --- | ---: | --- |
| [Vinewire](sultana-vinewire-comms-01.txt) | 1 | An engraved modern phone with a portrait contact tab, inset screen and soft message bubbles. |
| [Raisin Radio](sultana-raisin-radio-comms-02.txt) | 0 | A wide pocket pager with an LCD conversation screen, side keys and a miniature harvest seal. |
| [Trellis Touch](sultana-trellis-touch-comms-03.txt) | 1 | A slim PDA with an inset portrait, a stylus rail and stacked received-message bubbles. |
| [Aftervine](sultana-aftervine-comms-04.txt) | 0 | A quiet e-ink handset with a fine pinstripe shell, a tall clock and clean notification cards. |
| [Tendril Talk](sultana-tendril-talk-comms-05.txt) | 1 | A folding pocket communicator with a portrait contact screen and a separate conversation pane. |

## Buds

| Design | Default GIFs | Composition |
| --- | ---: | --- |
| [Gleaning](sultana-gleaning-bud-01.txt) | 0 | A small open reply between offset brackets, finished with a hanging grape engraving. |
| [Raisinette](sultana-raisinette-bud-02.txt) | 1 | A compact portrait button set into a fine oval label above a short reply. |
| [Vinelet](sultana-vinelet-bud-03.txt) | 0 | A slender note with an asymmetric vine margin and a tightly set serif heading. |
| [Honeyed Hush](sultana-honeyed-hush-bud-04.txt) | 1 | A miniature horizontal keepsake with a square character still, bevelled corner and intimate writing. |
| [Last Sultana](sultana-last-sultana-bud-05.txt) | 0 | A tiny centred reply with an engraved knot, a fine lower rule and an open upper edge. |

## Copy and edit

Open a named `.txt` file, select GitHub's **Copy raw file**, and paste the complete `[dohtml]` block into your forum post. `[url]`, `[name]` and `[text]` appear first, followed by time, GIF URLs and writing where applicable. Decoration and the stylesheet link are below the editable content. There are no comments, hidden tips or editing notes inside the posting snippets or template stylesheet.

`[url]` is the character or thread link; `[name]` is its display name; `[text]` is the title or comms status. Placeholder prose is lorem ipsum. The preview displays sample titles and Kia / Jaehyun in place of untouched placeholders, while the code retains the placeholders until you edit them.

Use ordinary `<p>` paragraphs for writing and comms messages. Successive opening `<p>` tags without closing paragraph tags also work inside the message container. Comms alignment can be `data-direction="received"`, `"sent"` or `"mixed"`. Device controls, clocks and composer bars are decorative.

Within `[dohtml]`, use `<b>`, `<i>` and `<u>` for the corresponding emphasis, with `<strong>` and `<em>` also supported. The editor converts `[b]`, `[i]` and `[u]` to HTML when entered into the writing field. Bold and underline follow group colours 1 → 2 → 3; italic reverses them to 3 → 2 → 1.

GIF counts are contextual: seven designs start without images, seven have one, and one has two. In the editor, use **Add GIF** or **Remove**. When editing a snippet directly, remove an unwanted `<img>`; empty media containers collapse and portrait columns reflow. To add an image to an image-free design, insert a `sul-media` div with an ordinary image tag above `sul-copy`. Adjust `object-position` on an image to change its crop. Both supplied placeholder GIF URLs are preserved exactly. Bud defaults contain 37 words, encourage replies of 100 words or fewer, and do not clip longer writing.

The editor keeps separate changes for each design while the page remains open. Download an edited `.txt` file to retain your work after closing the page. It includes palette samples and three member-colour pickers, light/dark/system modes, forum/375 px/320 px preview widths, all fifteen designs, category filters, and copy/download controls. Palette choices affect the preview only; posting snippets inherit the member palette. Clipboard access has a select-and-copy fallback.

## Forum integration

Each snippet includes one link to [sultana-collection-v1.css](https://cdn.jsdelivr.net/gh/lexdoescodingnow/templates@1dffec02044997bcef2ba6f8ec4d5a10fa5c0005/sultana/sultana-collection-v1.css), served through jsDelivr from the published commit `1dffec0`. The forum must allow an external stylesheet inside `[dohtml]`. No JavaScript or external HTML loader runs in forum posts.

Inherited RGB triples `--mgrgb1`, `--mgrgb2` and `--mgrgb3` drive the collection. Fallbacks apply only when those variables are missing. Dark mode lightens the member hues for legible emphasis. Blue Hour's explicit `html[color-mode="light"]` and `html[color-mode="dark"]` modes take precedence over the system preference fallback. Every template selector is scoped to `.sul`.

Cormorant Garamond and Manrope fall back to Georgia and Arial. GIFs, optional web fonts and the forum stylesheet require internet access. Empty-media reflow uses CSS `:has()`; dark-mode tinting uses `color-mix()`. The preview has all template styling inline, so it does not need the hosted forum stylesheet to display.

## Rebuilding and checks

Run `node sultana/build.cjs` from the repository root to rebuild all fifteen snippets and the standalone preview from the editor and CSS source files. `designs.json` provides a readable index of the names and default image counts.

See [VALIDATION.md](VALIDATION.md) for completed checks and their limits.
