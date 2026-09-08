# Coconut

Fifteen JCink templates inspired by the supplied Coconut poster: soft ivory fabric, protective coconut shells, palm shadows, woven coir and graceful italic lettering. Member colours shape the headers, frames, borders, emphasis and message surfaces. Ordinary writing rests on neutral light or dark backgrounds.

[Download the standalone preview/editor](coconut-collection-preview.html) · [Complete collection ZIP](coconut-collection.zip)

GitHub displays HTML source. Download `coconut-collection-preview.html` and open it in a browser to view, edit and copy every design. The editor and all styles are included in that single file; GIFs and optional web fonts load online. Choose **View all 15 designs** for the complete gallery, or use the named menu, design selector and previous/next controls.

## Threads

| Design | Default GIFs | Composition |
| --- | ---: | --- |
| [Copra Silhouette](coconut-copra-silhouette-thread-01.txt) | 1 | An organic coconut portrait beside an italic title, an angled colour wash and a fine protective frame. |
| [Palmshade Pavilion](coconut-palmshade-pavilion-thread-02.txt) | 0 | An open literary page with a palm-shadow fan, spacious serif writing and a member-colour masthead. |
| [Twin Husk](coconut-twin-husk-thread-03.txt) | 2 | Two curved coconut halves joined by a fine seam, above a paired-portrait literary panel. |
| [Coirbound](coconut-coirbound-thread-04.txt) | 1 | A woven book-jacket edge, a narrow portrait, a long writing column and a small coir-knot signature. |
| [Coconut Water](coconut-coconut-water-thread-05.txt) | 0 | A fluid asymmetric double contour, a sweeping title, a curved divider and image-free writing. |

## Comms

| Design | Default GIFs | Composition |
| --- | ---: | --- |
| [Palmline](coconut-palmline-comms-01.txt) | 1 | A curved phone with a small contact portrait beside the header and received-message bubbles. |
| [Husk Relay](coconut-husk-relay-comms-02.txt) | 1 | A ribbed pocket handset with a landscape contact window and an inset conversation screen. |
| [Cabana Chat](coconut-cabana-chat-comms-03.txt) | 1 | A phone home screen with a clock, portrait tile and a separate rounded conversation widget. |
| [Lagoon Link](coconut-lagoon-link-comms-04.txt) | 0 | A nostalgic pebble-shaped communicator with an inset screen and circular thumb control. |
| [Nacre Notifications](coconut-nacre-notifications-comms-05.txt) | 0 | A quiet lock screen with an oversized clock, notification cards and tiny frond markers. |

## Buds

| Design | Default GIFs | Composition |
| --- | ---: | --- |
| [Coconut Flake](coconut-coconut-flake-bud-01.txt) | 0 | A tiny reply slip with a flaked edge and the three small eyes of a coconut. |
| [Milkdrop](coconut-milkdrop-bud-02.txt) | 1 | A teardrop portrait beside an italic heading and a curved member-colour edge. |
| [Coir Knot](coconut-coir-knot-bud-03.txt) | 1 | A woven keepsake with a small framed character portrait and a knot signature. |
| [Shellscript](coconut-shellscript-bud-04.txt) | 0 | A miniature reply held between two pairs of curved shell contours. |
| [Tender Kernel](coconut-tender-kernel-bud-05.txt) | 0 | A coconut-half note with a curved lower frame and an engraved shell. |

## Copy and edit

Open a named `.txt` file, choose GitHub's **Copy raw file**, and paste the complete `[dohtml]` block into your forum post. Editable names, links, titles/statuses, times, GIF URLs and prose appear before decorative markup and the stylesheet link. There are no comments, editing notes or hidden tips inside the posting snippets or shared template CSS.

`[url]` is the linked character or thread URL. `[name]` is the displayed name. `[text]` is the title or comms status. All default writing uses lorem ipsum. The preview displays sample names and titles while the untouched copied code retains the placeholders.

Use ordinary `<p>` paragraphs for writing. Comms also accept successive opening `<p>` tags without closing each paragraph. No repeated message class or div is required. Set the comms wrapper's `data-direction` to `received`, `sent` or `mixed` to change alignment. Device clocks, composer bars, battery symbols and thumb controls are decorative.

Inside `[dohtml]`, use `<b>`, `<i>` and `<u>` for emphasis; `<strong>` and `<em>` work too. The preview editor also converts `[b]`, `[i]` and `[u]` into those HTML elements. Bold and underline follow group colours 1 → 2 → 3. Italics reverse the gradient to 3 → 2 → 1.

The default GIF counts are design choices, not quotas. Remove an unused `<img>` tag or use **Remove** in the editor. Empty media containers collapse and portrait columns reflow. Use **Add GIF** for image-free designs; when editing directly, insert a `ccn-media` div containing ordinary image tags above `ccn-copy`. Adjust an image's `object-position` to change its crop. Both supplied placeholder URLs are retained exactly. Buds begin with 37 words and encourage replies of 100 words or fewer; longer text is not clipped.

The editor retains separate edits for each design while the page is open. Download an edited snippet to keep it after closing the page. It supports paragraph text, basic emphasis, links and blockquotes. Preview palette samples and colour pickers affect only the preview; copied forum code inherits the member's group colours. The preview has light/dark/system controls and forum/375 px/320 px viewing widths. Clipboard access has a select-and-copy fallback.

## Forum integration

Every snippet loads [coconut-collection-v1.css](https://cdn.jsdelivr.net/gh/lexdoescodingnow/templates@main/coconut/coconut-collection-v1.css). The forum must permit an external stylesheet link inside `[dohtml]`. No JavaScript or external HTML loader is used in forum posts.

The inherited RGB triples `--mgrgb1`, `--mgrgb2` and `--mgrgb3` drive the designs. Fallbacks apply only when a variable is absent. Dark mode lightens the inherited hues for clearer emphasis and frames. Explicit Blue Hour `html[color-mode="light"]` and `html[color-mode="dark"]` settings take precedence over the system preference fallback. All template selectors are scoped to `.ccn`.

Baskervville and Outfit fall back to Georgia and Arial. Original inline SVG line drawings supply the shell, frond, knot and drop motifs; no illustration downloads are needed. The coconut accents stay small while member colours remain prominent. Automatic empty-media reflow uses CSS `:has()`; dark-mode tinting uses `color-mix()`.

The preview is an authoring tool; only the `.txt` snippets belong in forum posts. To rebuild the included snippets and standalone preview from the source files, run `node coconut/build.cjs` from the repository root.

See [VALIDATION.md](VALIDATION.md) for completed checks and their limits.
