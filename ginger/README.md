# Ginger · Some Connections Stay

Fifteen JCink templates inspired by the supplied Ginger poster: apothecary labels, porcelain tea vessels, pressed botanicals and curling steam. Member colours shape the headers, frames, details and emphasis; the reading surfaces remain neutral in light and dark mode.

[Downloadable preview and editor](ginger-collection-preview.html)

Open a named `.txt` file below and use GitHub's **Copy raw file**. Paste the complete block, including `[dohtml]` and `[/dohtml]`, into your post. Each snippet already includes its shared stylesheet link.

## Threads

| Design | Default GIFs | Layout |
| --- | ---: | --- |
| [Rhizome Reverie](ginger-rhizome-reverie-thread-01.txt) | 1 | Upright specimen portrait, finely ruled heading and botanical stamp. |
| [Porcelain Promise](ginger-porcelain-promise-thread-02.txt) | 2 | Paired porcelain cameos above a softly framed letter. |
| [Infusion Folio](ginger-infusion-folio-thread-03.txt) | 0 | Vertical title margin and an open literary page with a drop cap. |
| [Steamwritten](ginger-steamwritten-thread-04.txt) | 1 | Sweeping italic title, cinematic portrait and a curl of steam. |
| [Kindred Remedy](ginger-kindred-remedy-thread-05.txt) | 0 | Notched remedy label, large italic heading and double prescription rules. |

## Comms

| Design | Default GIFs | Device |
| --- | ---: | --- |
| [Rootline](ginger-rootline-comms-01.txt) | 1 | Slim glass phone with a little contact portrait and camera pill. |
| [Kettlecall](ginger-kettlecall-comms-02.txt) | 1 | Tabletop video intercom with a wide portrait screen and speaker grille. |
| [Steep Sync](ginger-steep-sync-comms-03.txt) | 2 | Book-fold phone with paired contact thumbnails on its narrow screen. |
| [Ginger Pulse](ginger-ginger-pulse-comms-04.txt) | 1 | Elongated smartwatch messenger with ribbed straps and notifications. |
| [Remedy Relay](ginger-remedy-relay-comms-05.txt) | 0 | Pocket e-ink messenger with a quiet inset display and tactile keys. |

## Buds

| Design | Default GIFs | Layout |
| --- | ---: | --- |
| [Rootlet](ginger-rootlet-bud-01.txt) | 0 | Tiny specimen slip with an offset botanical tab. |
| [Zestling](ginger-zestling-bud-02.txt) | 1 | Small upright portrait beside a ruled pocket note. |
| [Candied Knot](ginger-candied-knot-bud-03.txt) | 0 | Folded paper band with crossing colour seams. |
| [Sip of You](ginger-sip-of-you-bud-04.txt) | 2 | Two miniature saucer portraits beside a shared heading. |
| [Warmthmark](ginger-warmthmark-bud-05.txt) | 0 | Slim keepsake with a coloured end tab and a pressed-root mark. |

## Editing

The `[url]`, `[name]` and `[text]` fields come first. Replace them with the profile/thread link, character name and title or contact status. Time, GIF URLs and the lorem ipsum reply follow. All editable content sits above the decorative markup and stylesheet link. There are no comments, hidden tips, separator banners or editing instructions inside the posting HTML or template CSS.

Writing uses ordinary `<p>` paragraphs inside `ggr-copy`. In comms, every paragraph becomes one message; successive opening `<p>` tags work without requiring closing paragraph tags. Set `data-flow="received"`, `"sent"` or `"mixed"` to align incoming, outgoing or alternating messages. The device hardware is decorative.

Inside `[dohtml]`, use `<b>`, `<i>` and `<u>` for emphasis; `<strong>` and `<em>` also work. Bold and underline use the forward member gradient (1 → 2 → 3), while italics reverse it (3 → 2 → 1). The preview editor converts `[b]`, `[i]` and `[u]` into HTML before copying. Literal BBCode parsing inside `[dohtml]` depends on the forum, so the posting files use HTML.

The supplied Tumblr GIF URLs are retained exactly. Six designs start without images, six use one and three use a pair. These counts are defaults. Use **Add GIF** or **Remove** in the editor, or edit the `<img>` elements in `ggr-media`. An empty or absent media container disappears, and layouts with dedicated image columns reclaim their space. To add a GIF to an image-free snippet, place `<div class="ggr-media"><img src="YOUR_GIF_URL" alt="Character GIF" style="object-position:50% 35%"></div>` above `ggr-copy`. Each image has its own crop position.

Buds are miniature thread templates for replies of approximately 100 words or fewer. Their samples contain 36 words each. Longer replies grow normally, with no fixed-height writing box.

## Preview and editor

Download `ginger-collection-preview.html` using GitHub's raw download button and open it in a browser. GitHub displays HTML as source. The preview contains its own stylesheet, design data and editor code; only the supplied GIFs need an external image request.

Choose any named design or **View all 15**. Edit the name, link, title/status, time, message direction, GIF URLs, crop positions and writing. The preview and code update together. **Copy JCink code** copies the complete snippet; when clipboard access is unavailable, the code is selected for manual copying. **Download .txt** saves the edited post. Each design keeps its edits while the page is open.

Mode, member-colour presets, custom colour pickers and post-width controls change the preview. The copied code inherits the forum's real member colours and mode. The editor accepts paragraphs, line breaks, emphasis and links, and removes unsupported HTML from the writing field.

## Shared styling

The collection uses [ginger-apothecary-v1.css](ginger-apothecary-v1.css), pinned to the GitHub commit recorded in [stylesheet-revision.txt](stylesheet-revision.txt). One stylesheet link is already placed at the end of every snippet. Forum posts require no script or HTML injector. The forum must allow external stylesheet links in `[dohtml]`.

The inherited RGB triples `--mgrgb1`, `--mgrgb2` and `--mgrgb3` supply the member palette. Fallback colours apply only when those variables are absent. Emphasis colours are mixed toward a darker neutral in light mode and toward a lighter neutral in dark mode. Explicit Blue Hour `html[color-mode="light"]` and `html[color-mode="dark"]` values take precedence over system preference.

All motifs are new CSS details or an embedded vector ginger-root drawing. The poster itself is not embedded. Palatino, Georgia, Arial and Courier New use local font fallbacks; no external font service or decorative bitmap is required. Styles are isolated to the Ginger wrapper and its prefixed classes. The CSS uses modern features including `:has()`, `color-mix()` and masks.

## Rebuilding and checks

Run `node ginger/build.cjs` from the repository root to regenerate the 15 snippets and the standalone preview. `designs.json` contains the names and layouts; `ginger-model.js` supplies the shared markup and defaults. The editor interface follows the existing collection workflow; the template designs and motifs are new.

Run `python ginger/validate.py` with `lxml` installed for the source checks. See [VALIDATION.md](VALIDATION.md) for their scope and the browser limitation.
