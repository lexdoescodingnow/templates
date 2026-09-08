# Boba · Two Hearts, One Cup

Fifteen JCink templates inspired by the Boba poster: late-night cafe windows, neon hearts, twin drinks, tiger-sugar strokes and pearl impressions. Member colours shape the headers, borders, frames and emphasis; writing stays on neutral light or dark surfaces.

[Downloadable preview and editor](boba-collection-preview.html) · [Complete collection ZIP](boba-two-hearts.zip)

Open any named `.txt` file below and use GitHub’s **Copy raw file**. Paste the complete block, including `[dohtml]` and `[/dohtml]`, into your post. The stylesheet link is already included.

## Threads

| Design | GIFs by default | Layout |
| --- | ---: | --- |
| [Neon Steep](boba-neon-steep-thread-01.txt) | 1 | An illuminated cafe window with a panoramic still, tiled header and a neon heart above an open reading page. |
| [Double Pour](boba-double-pour-thread-02.txt) | 2 | Twin tall cup portraits, a striped straw spine and a generous neutral letter beneath a shared drink seal. |
| [Afterhours Menu](boba-afterhours-menu-thread-03.txt) | 0 | An image-free cafe menu with a large block title, fine order rules and a spacious single-column reply. |
| [Tiger Reverie](boba-tiger-reverie-thread-04.txt) | 1 | An offset landscape still, flowing tiger-sugar strokes and a handwritten heading on a clean reading panel. |
| [Sealed Promise](boba-sealed-promise-thread-05.txt) | 0 | A circular drink-seal heading, pearl impression and fine double frame around a quiet romantic page. |

## Comms

| Design | GIFs by default | Layout |
| --- | ---: | --- |
| [Pearl Ping](boba-pearl-ping-comms-01.txt) | 1 | A rounded phone with a pearl-ring contact portrait, incoming bubbles and a dotted home dock. |
| [Steep Speak](boba-steep-speak-comms-02.txt) | 1 | A compact clamshell messenger with a landscape contact screen, horizontal hinge and squared chat bubbles. |
| [Tapioca Touch](boba-tapioca-touch-comms-03.txt) | 0 | An image-free edge-to-edge phone with a bold contact header, narrow colour rail and floating speech bubbles. |
| [Sipline](boba-sipline-comms-04.txt) | 1 | A slim notification phone with a small contact badge, striped side rail and tidy rounded messages. |
| [Last Order](boba-last-order-comms-05.txt) | 0 | A pocket cafe terminal with an inset digital display, monospaced contact details and a three-key control pad. |

## Buds

| Design | GIFs by default | Layout |
| --- | ---: | --- |
| [Mini Pearl](boba-mini-pearl-bud-01.txt) | 0 | A tiny rounded note with a single oversized pearl corner and a short open reply. |
| [Sugar Dot](boba-sugar-dot-bud-02.txt) | 1 | A compact square label with a little portrait, double-rule heading and member-colour seal. |
| [Soft Sip](boba-soft-sip-bud-03.txt) | 0 | A drink-sleeve note with a gently tapered frame and a striped edge. |
| [Lidnote](boba-lidnote-bud-04.txt) | 2 | Two miniature portrait seals alongside a small caption and a short reply beneath. |
| [Chewlet](boba-chewlet-bud-05.txt) | 0 | A low open note with an offset title and a neat row of pearl impressions. |

## Editing your post

`[url]`, `[name]` and `[text]` appear first. Replace them with the linked profile/thread URL, character name, and title or contact status. Comms time, any GIFs, and the reply follow before decoration and the stylesheet link. Replace the lorem ipsum inside `bba-copy` with your writing.

Use ordinary `<p>` paragraphs. In comms each paragraph becomes a message, including successive opening `<p>` tags without closing tags. `data-flow="received"` is the default; `sent` aligns messages right and `mixed` alternates them. Device controls are decorative.

Inside `[dohtml]`, use `<b>`, `<i>` and `<u>`; `<strong>` and `<em>` work too. Bold and underline use the forward member gradient (1 → 2 → 3); italics reverse it (3 → 2 → 1). The preview editor converts `[b]`, `[i]` and `[u]` to HTML. Literal BBCode parsing inside `[dohtml]` depends on the forum, so the supplied posting snippets use HTML.

The supplied Tumblr GIF URLs are retained exactly. Their count is a design choice: seven designs start without images, six with one, and two with a pair. Any design accepts extra images. In the editor use **Add GIF** or **Remove**, or directly remove an `<img>` from `bba-media`. An absent or empty media container disappears, and portrait columns collapse to reclaim their space. To add a GIF to an image-free snippet, insert `<div class="bba-media"><img src="YOUR_GIF_URL" alt="Character GIF"></div>` above `bba-copy`. Adjust each image’s `object-position` to change its crop.

Buds are miniature thread templates for replies of around 100 words or fewer. Their sample replies have 36 words, and longer text grows normally without clipping.

There are no comments, hidden tips, instruction banners or editing notes inside the posting HTML or template CSS.

## Preview and editor

Download `boba-collection-preview.html` using GitHub’s raw download button and open it in your browser. GitHub itself displays HTML source. All template styling, design data and editor code are embedded in the file; fonts and GIFs load externally.

Select a named design or **View all 15**. Edit names, URL, title/status, time, message direction, GIF URLs, crop positions and writing. The preview and posting code update together. **Copy JCink code** copies the complete snippet; if clipboard access fails, the code is selected for manual copying. **Download .txt** saves your edited post. Edits remain while the page is open.

Light, dark and system mode; member-colour presets; three custom colour pickers; and 375/320 px post-width controls affect the preview only. Exported code inherits the forum’s member group and mode. The editor accepts paragraphs, line breaks, emphasis and links, and cleans other HTML from the writing field.

## Shared styling

The single hosted stylesheet is [boba-afterhours-v1.css](boba-afterhours-v1.css). Snippets use a jsDelivr URL pinned to the GitHub revision in [stylesheet-revision.txt](stylesheet-revision.txt), so each copied post requests the published CSS directly. The forum must allow external stylesheets in `[dohtml]`. No JavaScript injector is required in forum posts.

The collection inherits RGB triples from `--mgrgb1`, `--mgrgb2` and `--mgrgb3`. Fallback colours are only used when those variables are absent. Emphasis colours are deepened on light surfaces and lightened on dark surfaces. Explicit Blue Hour `html[color-mode="light"]` or `html[color-mode="dark"]` takes precedence over the system preference.

Original motifs are drawn in CSS, with a tiny inline SVG neon-heart outline. Allura, Bricolage Grotesque and DM Sans are served through Google Fonts, with local fallbacks. No poster image or decorative bitmap is required. The CSS uses modern browser features including `:has()`, `color-mix()` and container query units.

## Source and verification

Run `node boba/build.cjs` from the repository root to regenerate the 15 snippets and standalone preview. `designs.json` contains the named designs; `boba-model.js` supplies the shared markup and defaults. The editor shell follows the existing collection workflow; Boba’s template styling and motifs are new.

See [VALIDATION.md](VALIDATION.md) for checks and the testing limitation.
