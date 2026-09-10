# Nectarine · Akara & Clarity

Fifteen coordinated JCink templates: five threads, five phone/device comms and five miniature buds. Fruit seams, curved cheeks, freestone outlines, produce seals and flowing nectar details appear in the member palette, with neutral reading surfaces.

[Download the preview and editor](https://github.com/lexdoescodingnow/templates/raw/refs/heads/main/nectarine/nectarine-collection-preview.html)

Open any named `.txt` file below and choose **Copy raw file** on GitHub. Paste the complete block into your post; `[dohtml]` tags and the hosted stylesheet link are included.

Download the HTML preview and open it in your browser to select, edit and copy any design. The editor and stylesheet are embedded; character GIFs load from Tumblr. GitHub's HTML file viewer shows source code.

## Threads

| Design | Starting GIFs | Layout |
| --- | ---: | --- |
| [Suture Study](nectarine-suture-study-thread-01.txt) | 1 | A tall portrait and a split nectarine contour share the opening, above an open page with a fine seam running down its edge. |
| [Cheek to Cheek](nectarine-cheek-to-cheek-thread-02.txt) | 2 | Two differently curved portrait panels meet at an offset seam, above a broad italic title and a low, softly framed writing panel. |
| [Freestone Journal](nectarine-freestone-journal-thread-03.txt) | 0 | A large typographic opening rests inside a broken fruit outline, with a small produce seal and a clean inset journal page. |
| [Nectar Current](nectarine-nectar-current-thread-04.txt) | 1 | A fine flowing contour travels around a spacious letter and a panoramic portrait at its foot, with a small drop-shaped finish. |
| [Espalier Letters](nectarine-espalier-letters-thread-05.txt) | 0 | An open trellis masthead holds the title between asymmetric crossing bars, above an unboxed reading area and a three-part signature rule. |

## Comms

| Design | Starting GIFs | Layout |
| --- | ---: | --- |
| [Blushline](nectarine-blushline-comms-01.txt) | 1 | A softly squared smartphone with a pill earpiece, a large circular contact portrait and rounded received-message bubbles. |
| [Stonefold](nectarine-stonefold-comms-02.txt) | 1 | A hinged clamshell phone with a compact top display, a bright three-piece hinge and a separate lower conversation screen. |
| [Nectar Slide](nectarine-nectar-slide-comms-03.txt) | 1 | A slider handset with a small contact tile, a tall inset message screen and an exposed twelve-key pad. |
| [Orchard Sync](nectarine-orchard-sync-comms-04.txt) | 2 | A landscape folding communicator places paired contact portraits in the left screen and a full conversation in the right screen. |
| [Sunskin OS](nectarine-sunskin-os-comms-05.txt) | 0 | A spare curved smartphone uses a narrow floating status pill, an oversized contact name and lightly outlined message cards. |

## Buds

| Design | Starting GIFs | Layout |
| --- | ---: | --- |
| [Suturelet](nectarine-suturelet-bud-01.txt) | 0 | An open miniature note with a stitched top seam, a tiny title tab and a rounded lower member-colour rule. |
| [Blushmark](nectarine-blushmark-bud-02.txt) | 1 | A narrow oval portrait sits beside a miniature reply beneath a broad member-colour cap. |
| [Stonekiss](nectarine-stonekiss-bud-03.txt) | 2 | A compact reply shares its lower edge with two touching seed-shaped portraits, under a small right-aligned signature. |
| [Nectardrop](nectarine-nectardrop-bud-04.txt) | 0 | A short teardrop-corner note with a large fine droplet outline at the edge and a recessed name plaque. |
| [Ripening Note](nectarine-ripening-note-bud-05.txt) | 1 | A slim panoramic portrait rests above a two-column title and signature, with a tiny reply and an offset ruled foot. |

## Editing and formatting

The linked `[name]` and `[url]`, then the `[text]` title/contact status, appear at the top of each snippet. Time, GIF URLs and the `nc-copy` writing follow. Decorative elements and the stylesheet link are at the bottom. Posting HTML and CSS contain no comments, hidden tips or editing instructions.

The preview substitutes **Akara & Clarity** and a sample title for display. Copied code preserves your actual field values, including untouched placeholders. Changes persist per design while the page remains open. **Copy code** and **Download .txt** export current edits; **Reset design** restores the selected design.

Write with ordinary `<p>` paragraphs. Comms use a plain paragraph for each message and accept successive opening `<p>` tags without closing tags. The device hardware is decorative. `data-flow="received"`, `"sent"` and `"alternate"` control message direction without requiring classes on individual messages.

The editor converts `[b]`, `[i]` and `[u]` to their HTML equivalents. For direct editing inside a raw `[dohtml]` snippet, use `<b>`, `<i>` and `<u>`; `<strong>` and `<em>` are supported too. Bold and underline follow member colours **1 → 2 → 3**, while italics reverse **3 → 2 → 1**. Underline keeps its visible rule. Accent text is mixed with the neutral text colour to improve readability across palettes.

Buds start with 36 words and are intended for replies of 100 words or fewer. Longer replies remain visible; the editor's word counter highlights when they exceed 100.

## Images and themes

GIF counts vary by design. Add, remove, replace or vertically crop GIFs in the editor. In raw snippets, remove unwanted `<img>` elements; image-free layouts reclaim their media rows and portrait columns. Both supplied Tumblr URLs are retained exactly, including `.gifv`. Additional images share the available media area.

The templates inherit `--mgrgb1`, `--mgrgb2` and `--mgrgb3` RGB triplets from your forum's member-group scope. These colours appear in headers, frames, type, rules, device details and message accents. Preview palette controls affect only the sample and do not hard-code colours into posting snippets.

Blue Hour's `html[color-mode="light"]` and `html[color-mode="dark"]` set the neutral surfaces. An explicit forum setting overrides the system dark preference. The preview includes Fit, 320 px and 550 px widths. Template styles are scoped to `.bh-nectarine`. Posting snippets use no JavaScript, font downloads or external icon sets. Modern CSS grid, `:has()`, container queries and `color-mix()` are used.

## Source and validation

`designs.json` and `nectarine-model.js` supply all fifteen snippets and the editor. Run `node nectarine/build.cjs` from the repository root to regenerate them. Each posting snippet links to `nectarine-sunskin-v1.css` at the immutable revision in `stylesheet-revision.txt`.

[Validation details](VALIDATION.md). Browser rendering and a live JCink post remain unverified because this session's browser cannot open the local preview.
