# Tropical · Meet me at the equator

Fifteen JCink templates for Davis and Theo: island cartography, fan palms, tidal contours, veranda shutters and geometric sunshades. Member colours carry the headers, frames, devices and emphasis; the writing surfaces stay neutral.

[Preview and editor](tropical-collection-preview.html)

Open any named `.txt` file below, use GitHub’s **Copy raw file**, and paste the complete `[dohtml]` block into your post. The hosted stylesheet is already included. Download the standalone HTML preview and open it in your browser to browse, edit and copy the designs; GitHub itself displays HTML as source.

## Threads

| Design | Default GIFs | Layout |
| --- | ---: | --- |
| [Latitude Letter](tropical-latitude-letter-thread-01.txt) | 2 | Cartographic rings and an offset double portrait beside an oversized editorial title. |
| [Canopy Reverie](tropical-canopy-reverie-thread-02.txt) | 2 | A palm-fan canopy, shuttered frame and paired panoramic windows above a long reply. |
| [Tidal Interval](tropical-tidal-interval-thread-03.txt) | 1 | A tall lagoon arch, a single portrait and concentric tidal lines around an open reading surface. |
| [Monsoon Margins](tropical-monsoon-margins-thread-04.txt) | 0 | An image-free folded folio with diagonal rain marks and a coloured marginal rule. |
| [Solstice Pavilion](tropical-solstice-pavilion-thread-05.txt) | 2 | A geometric sunshade roof, a broad typographic panel and paired portraits at the foot. |

## Comms

| Design | Default GIFs | Layout |
| --- | ---: | --- |
| [Palmline](tropical-palmline-comms-01.txt) | 1 | A slim island smartphone with a palm-etched case, contact portrait and incoming bubbles. |
| [Lagoon Link](tropical-lagoon-link-comms-02.txt) | 2 | A landscape dual-contact messenger with a raised camera rail and scalloped message panel. |
| [Tradewind Radio](tropical-tradewind-radio-comms-03.txt) | 1 | A rugged satellite messenger with an aerial, an inset contact screen and a rotary control. |
| [Cabana Chat](tropical-cabana-chat-comms-04.txt) | 0 | An image-free smart display with a shutter-grille speaker and softly tinted message cards. |
| [Atoll OS](tropical-atoll-os-comms-05.txt) | 1 | A circular camera island and full-width contact image inside an angular protective phone case. |

## Buds

| Design | Default GIFs | Layout |
| --- | ---: | --- |
| [Saltpetal](tropical-saltpetal-bud-01.txt) | 0 | A little tide-folded note with a radial salt-petal stamp. |
| [Sunlet](tropical-sunlet-bud-02.txt) | 1 | A tiny sunrise portrait with a curved horizon and an intimate short reply. |
| [Palmscript](tropical-palmscript-bud-03.txt) | 0 | A narrow palm-shaped accent beside an airy miniature letter. |
| [Reefnote](tropical-reefnote-bud-04.txt) | 2 | A compact triptych: two square stills framing the name, with the reply underneath. |
| [Driftsong](tropical-driftsong-bud-05.txt) | 0 | A low wave-edged reply card with small navigational notches. |

## Editing

`[url]`, `[name]` and `[text]` are the first three fields: the name link, displayed name and title or contact status. Comms timestamps, GIF URLs and the writing follow. All editable content comes before the decorative element and stylesheet link. Replace the lorem ipsum inside `trp-copy` with your reply. Posting snippets and the collection stylesheet contain no comments, hidden tips or editing notes.

The preview shows Davis & Theo and sample titles while the exported defaults retain your placeholders. Use the editor’s name, title, URL, writing, GIF and crop controls to generate personalised code. Each design keeps its own edits while the preview remains open. Download an edited snippet to keep it.

Use ordinary `<p>` paragraphs. Every comms paragraph becomes a separate message; successive opening `<p>` tags also work. The comms wrapper’s `data-flow="received"`, `"sent"` or `"mixed"` controls alignment. Device hardware is decorative.

Inside `[dohtml]`, `<b>` / `<strong>` and `<u>` use the forward member gradient, 1 → 2 → 3. `<i>` / `<em>` use the reverse, 3 → 2 → 1. The preview editor converts `[b]`, `[i]` and `[u]` into the corresponding HTML when copying. Raw snippets use HTML because BBCode parsing inside `[dohtml]` depends on the forum.

Buds are compact thread replies for around 100 words or fewer. Each default contains 36 words. Replies grow naturally without a fixed-height scrolling box.

## Images

The supplied Tumblr URLs are preserved exactly and contain animated GIF data: 400 × 319 pixels / 32 frames, and 540 × 400 pixels / 42 frames. Five designs start without images, five use one and five use two. These are layout defaults, not limits.

Use **Add GIF** or **Remove** in the editor. In raw code, edit or remove the `<img>` elements inside `trp-media`. Empty or absent image containers disappear and the layout reclaims their space. To add an image to an image-free design, place `<div class="trp-media"><img src="YOUR_GIF_URL" alt="Character GIF" style="object-position:50% 35%"></div>` before `trp-copy`. Additional images wrap within their designated media area. Reefnote moves three or more images onto a separate strip.

## Preview and copying

The standalone HTML contains the collection CSS, editor and all design data. The GIFs are the only external preview assets. Select any of the 15 designs or choose **View all 15**. The preview supports light, dark and system modes; three editable member colours; palette presets; and post-width controls.

**Copy JCink code** copies the complete posting block. When clipboard access is unavailable, the code opens and selects itself for manual copying. **Download .txt** exports the current edited snippet. Preview colours and mode are not hard-coded into exported posts, which inherit the forum’s own values.

## Forum integration

[tropical-equator-v1.css](tropical-equator-v1.css) is the complete shared stylesheet. Each posting link is pinned to the GitHub commit in [stylesheet-revision.txt](stylesheet-revision.txt). A stylesheet link loads the layout inside `[dohtml]`; no forum script or HTML injector is needed.

Blue Hour’s `--mgrgb1`, `--mgrgb2` and `--mgrgb3` RGB triples drive the collection. Missing secondary member colours fall back to the available primary member colour; the tropical fallback palette is used only where member variables are absent. Emphasis colours mix toward a contrasting neutral for readability.

Explicit `html[color-mode="light"]` and `html[color-mode="dark"]` take precedence over the system preference. All template rules use the `bh-tropical` or `trp-` namespace. The designs use modern CSS, including `:has()`, `color-mix()`, container queries and SVG masks. Fonts are local Georgia, Arial and Courier New with fallbacks. All decorative artwork is newly drawn CSS/SVG geometry; no decorative assets are copied from earlier flavour sets.

## Build and checks

Run `node tropical/build.cjs` from the repository root to regenerate all posting snippets and the standalone preview. `designs.json` defines the names and layouts; `tropical-model.js` defines markup and placeholders. The editor retains the established collection workflow.

Run `NODE_PATH=/path/to/dependencies/node_modules node tropical/validate.cjs` with `jsdom` and `css-tree` installed to check snippet structure and editor behaviour. See [VALIDATION.md](VALIDATION.md) for the checks performed and the visual-testing limitation.
