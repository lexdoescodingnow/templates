# Fiery · Asher & Hiroshi

Fifteen coordinated JCink templates: five threads, five phone/device comms and five miniature buds. Match strikes, candle windows, exhaust grilles, heat trails and small flames carry the inherited member palette over neutral reading surfaces.

[Download the preview and editor](https://github.com/lexdoescodingnow/templates/raw/refs/heads/main/fiery/fiery-collection-preview.html)

Open a named `.txt` file below and choose **Copy raw file** on GitHub. Paste the complete block into your post; the `[dohtml]` tags and hosted stylesheet link are included.

Download the HTML preview and open it in a browser to select, edit and copy any design. Styling and the editor are embedded in the preview; the character GIFs load from Tumblr. GitHub displays HTML source rather than running the preview.

## Threads

| Design | Starting GIFs | Layout |
| --- | ---: | --- |
| [Flashpoint](fiery-flashpoint-thread-01.txt) | 1 | An oversized split heading meets a single angular portrait, with a struck-match rail and a broad neutral reading page. |
| [Twin Wicks](fiery-twin-wicks-thread-02.txt) | 2 | Two stacked candle-window portraits form a narrow side column beside a bookish title and an uninterrupted letter. |
| [Backdraft](fiery-backdraft-thread-03.txt) | 0 | An image-free page uses a rising stepped crest, compressed display type and a diagonal exhaust edge. |
| [Heat Veil](fiery-heat-veil-thread-04.txt) | 1 | A soft italic title floats above a clean letter, while a panoramic portrait and rising heat lines finish the page. |
| [Pyre Script](fiery-pyre-script-thread-05.txt) | 0 | A spare centred folio with a fan of matchsticks, a framed nameplate and a delicate ruled reading panel. |

## Comms

| Design | Starting GIFs | Layout |
| --- | ---: | --- |
| [Fuse Touch](fiery-fuse-touch-comms-01.txt) | 1 | A modern narrow phone with an offset camera strip, square contact portrait, luminous side fuse and curved message bubbles. |
| [Burner Line](fiery-burner-line-comms-02.txt) | 0 | A compact rugged handset with a segmented signal meter, recessed message screen and a three-button control deck. |
| [Flare Cast](fiery-flare-cast-comms-03.txt) | 1 | A landscape message tablet places a portrait in a slim right bezel beside a wide, softly inset conversation screen. |
| [Kindle Link](fiery-kindle-link-comms-04.txt) | 2 | A tall chat phone separates two contact tiles with a bright vertical wick, above a shared conversation and a wide bottom speaker. |
| [Pilot Light](fiery-pilot-light-comms-05.txt) | 0 | A gently curved phone with a large lock-screen clock, a tiny pilot indicator and stacked notification-style messages. |

## Buds

| Design | Starting GIFs | Layout |
| --- | ---: | --- |
| [Sparklet](fiery-sparklet-bud-01.txt) | 0 | A miniature open reply with an angled ignition mark and a broad, split-colour title rule. |
| [Wicktip](fiery-wicktip-bud-02.txt) | 1 | A narrow candle-window portrait rises beside a short reply, grounded by a delicate wick and a compact name strip. |
| [Coalprint](fiery-coalprint-bud-03.txt) | 0 | A squat, chamfered keepsake with a compressed title, neutral centre and a fine faceted coal impression. |
| [Firefly Pair](fiery-firefly-pair-bud-04.txt) | 2 | Two tiny square portraits sit at opposite corners of a compact reply, joined by fine spark trails. |
| [Last Flicker](fiery-last-flicker-bud-05.txt) | 1 | A short note with a low horizontal portrait, an offset italic heading and a fading three-part flame rail. |

## Editing

The linked `[name]` and `[url]`, then the `[text]` title/contact status, are the first editable fields in every snippet. Time, GIF URLs and the `fy-copy` writing follow. Decorative markup and the stylesheet link are at the bottom. Posting HTML and CSS contain no comments, hidden tips or editing notes.

The preview displays **Asher & Hiroshi** for threads and buds and **Hiroshi** as the sample phone contact. The copied snippet retains `[name]`, `[url]` and `[text]` until you change those fields. **Copy code** and **Download .txt** export your current edits. Each design keeps its edits while the page remains open; **Reset design** restores its defaults.

Use ordinary `<p>` paragraphs for writing. Comms use one plain `<p>` per message and accept successive opening `<p>` tags without closing tags. `data-flow="received"`, `"sent"` and `"alternate"` select message direction without individual message classes. Device hardware is decorative.

The editor converts `[b]`, `[i]` and `[u]` into HTML formatting. When editing a raw `[dohtml]` snippet directly, use `<b>`, `<i>` and `<u>`. `<strong>` and `<em>` also work. Bold and underline use the forward member gradient **1 → 2 → 3**; italics use the reverse **3 → 2 → 1**. Underline retains a visible rule. Accent text blends the member colours with the neutral text colour to improve contrast.

Buds start with 36 words and are designed for replies of 100 words or fewer. The editor includes a word counter; longer replies are never clipped.

## Images and colours

Image counts vary with the design. Add, remove, replace or crop GIFs in the editor. Both supplied Tumblr `.gifv` URLs are retained exactly. In a raw snippet, remove unwanted `<img>` elements or the entire `fy-media` block. Image-free layouts reclaim their media rows and portrait columns. Images use `object-fit:cover`; their editable `object-position` controls the crop.

Templates inherit the forum's `--mgrgb1`, `--mgrgb2` and `--mgrgb3` RGB triplets. Colours appear in headings, frames, devices, rules, flame details and text accents. The preview's palette controls affect only the preview; posting snippets do not override the member group.

Blue Hour's `html[color-mode="light"]` and `html[color-mode="dark"]` control neutral surfaces. An explicit forum setting takes precedence over the system preference fallback. All template selectors are scoped to `.bh-fiery`. Posting snippets require no JavaScript, font downloads or icon libraries. The designs use modern grid, `:has()`, `color-mix()` and CSS container units.

## Source and checks

`designs.json` and `fiery-model.js` provide the fifteen snippets and editor defaults. Run `node fiery/build.cjs` from the repository root to rebuild the individual snippets and standalone preview. Each snippet includes the stylesheet at the immutable commit recorded in `stylesheet-revision.txt`.

[Validation details](VALIDATION.md). Static checks passed. Browser rendering and a live JCink post remain unverified: the available browser blocked access to the local preview.
