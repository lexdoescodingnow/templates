# Raspberry · Between the Brambles

Fifteen JCink templates for Jian and Kijoon: raspberry cells, thorn stitching, seed marks and crisp member-coloured frames. Reading surfaces stay neutral in light and dark mode.

[Preview and editor](raspberry-collection-preview.html)

Open a named `.txt` file below, use GitHub’s **Copy raw file**, and paste the entire `[dohtml]` block into your post. Every snippet already includes its hosted stylesheet. Download the HTML preview and open it in a browser to edit and compare the designs; GitHub displays HTML as source.

## Threads

| Design | Default GIFs | Layout |
| --- | ---: | --- |
| [Framboise Study](raspberry-framboise-study-thread-01.txt) | 2 | An asymmetric editorial heading beside two offset portrait panels, with a miniature raspberry engraving. |
| [Bramble Letter](raspberry-bramble-letter-thread-02.txt) | 1 | A panoramic portrait inside thorn-stitched borders, a bold split heading and an open letter. |
| [Drupelet Mosaic](raspberry-drupelet-mosaic-thread-03.txt) | 1 | A contact-sheet composition with a broad portrait, a berry-cell mosaic and a crisp typographic masthead. |
| [Coulis Manuscript](raspberry-coulis-manuscript-thread-04.txt) | 0 | A writing-led page with a broad coloured spine, a large italic heading and fine seed-shaped punctuation. |
| [Rubus Nocturne](raspberry-rubus-nocturne-thread-05.txt) | 2 | An intimate night-letter composition with a perforated binding and a paired GIF signature beneath the writing. |

## Comms

| Design | Default GIFs | Layout |
| --- | ---: | --- |
| [Bramble OS](raspberry-bramble-os-comms-01.txt) | 1 | A rounded smartphone with a beaded case edge, square contact tile and floating message bubbles. |
| [Drupelet DM](raspberry-drupelet-dm-comms-02.txt) | 2 | A compact dual-screen clamshell with two contact stills above a ribbed hinge and a separate message display. |
| [Framboise FM](raspberry-framboise-fm-comms-03.txt) | 1 | A retro candybar phone with a square display, slim contact portrait, pill navigation and a nine-key pad. |
| [Coulis Connect](raspberry-coulis-connect-comms-04.txt) | 0 | A horizontal chat tablet with a side camera, a wide contact bar and stacked incoming message tiles. |
| [Thorntext](raspberry-thorntext-comms-05.txt) | 1 | A translucent bumper phone with a panoramic contact banner, angular message tails and a thin gesture bar. |

## Buds

| Design | Default GIFs | Layout |
| --- | ---: | --- |
| [Piplet](raspberry-piplet-bud-01.txt) | 0 | A tiny horizontal slip with a seed-shaped title marker and clustered berry seal. |
| [Bramblekiss](raspberry-bramblekiss-bud-02.txt) | 1 | A compact portrait bookmark with a thorn-stitched lower edge and short reply. |
| [Drupe Drop](raspberry-drupe-drop-bud-03.txt) | 0 | A small stepped card with an offset heading and three member-colour droplet marks. |
| [Raspberry Fleck](raspberry-raspberry-fleck-bud-04.txt) | 2 | Two miniature square stills sit at opposite ends of a short central note. |
| [Calyx](raspberry-calyx-bud-05.txt) | 0 | A miniature open frame with a five-point calyx at its edge and a quiet two-line heading. |

## Editing

`[url]`, `[name]` and `[text]` are the first fields: the linked destination, displayed name and title or contact status. Comms time, GIFs and writing follow. Replace the lorem ipsum inside `rby-copy` with your reply. The editable HTML stays above the decorative element and stylesheet link. Posting snippets and template CSS contain no comments, hidden tips or editing instructions.

Use normal `<p>` paragraphs. Each comms paragraph becomes a message, and successive opening `<p>` tags also work. `data-flow="received"`, `"sent"` or `"mixed"` controls incoming, outgoing or alternating alignment. The device hardware is decorative.

Inside `[dohtml]`, use `<b>`, `<i>` and `<u>`; `<strong>` and `<em>` also work. Bold and underline use the forward member gradient, 1 → 2 → 3. Italics use the reverse gradient, 3 → 2 → 1. The editor converts `[b]`, `[i]` and `[u]` to HTML when copying; raw posting snippets use HTML because BBCode handling inside `[dohtml]` depends on the forum.

Buds are miniature thread templates for replies of approximately 100 words or fewer. Each sample contains 36 words. Writing grows naturally without a scrolling text box or enforced word limit.

## GIFs

The two supplied Tumblr URLs are retained exactly. Both returned animated GIF data: 400 × 274 pixels, with 95 and 105 frames respectively. 5 designs start without images, 6 use one and 4 use two. These are defaults, not limits.

Use **Add GIF** or **Remove** in the editor. In raw code, edit or remove the `<img>` elements in `rby-media`. An empty or absent media container disappears. Designs with image columns let their text expand when images are removed. To add images to a text-only design, insert `<div class="rby-media"><img src="YOUR_GIF_URL" alt="Character GIF" style="object-position:50% 35%"></div>` before `rby-copy`. Each image has a crop-position field.

## Preview and copying

The standalone preview contains all styling, code and design data; only GIFs request external assets. Select a named design, use the previous/next buttons, or choose **View all 15**. Edit names, titles, URLs, messages, time, direction, GIFs and crops. Each design keeps its edits while the page is open.

**Copy JCink code** copies the whole posting block. If clipboard access is unavailable, the code opens and is selected for manual copying. **Download .txt** saves your edited snippet. Light/dark/system mode, three member-colour controls, palette presets and post-width choices affect the preview; exported posts inherit the forum’s actual member colours and mode.

The writing editor accepts paragraphs, line breaks, emphasis and links. Use the downloaded code directly for any additional HTML permitted by your forum.

## Shared stylesheet

[raspberry-bramble-v1.css](raspberry-bramble-v1.css) is the complete collection stylesheet. Posting links are pinned to the GitHub commit recorded in [stylesheet-revision.txt](stylesheet-revision.txt). No script or HTML injector is needed in forum posts.

Blue Hour’s inherited `--mgrgb1`, `--mgrgb2` and `--mgrgb3` RGB triples drive headers, frames, device details and emphasis. Raspberry fallback colours apply only when member variables are absent. Emphasis colours are mixed toward a dark neutral in light mode and a light neutral in dark mode. Explicit `html[color-mode="light"]` and `html[color-mode="dark"]` override the system preference.

All artwork is original CSS geometry or an embedded raspberry engraving. Local Trebuchet MS, Georgia and Arial fallbacks avoid external font requests. Styles use prefixed wrappers and modern CSS including `:has()`, `color-mix()`, masks and container units. Your forum must allow the stylesheet link inside `[dohtml]`.

## Build and verification

Run `node raspberry/build.cjs` from the repository root to regenerate the posting snippets and standalone preview. Names and layout descriptions live in `designs.json`; markup and placeholders live in `raspberry-model.js`. The editor interface retains the familiar collection workflow; Raspberry template styling and artwork are new.

See [VALIDATION.md](VALIDATION.md) for completed checks and the browser-preview limitation. No live JCink post was made.
