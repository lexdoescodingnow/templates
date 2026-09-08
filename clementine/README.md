# Clementine · Softlight collection

Fifteen new JCink designs inspired by the supplied Clementine poster: slow tenderness, soft daylight, delicate lettering, curling peel and small botanical line drawings. Member colours run through headers, frames, rules and emphasis, with neutral writing surfaces and restrained citrus accents.

[Download the standalone preview/editor](clementine-softlight-preview.html) · [Complete collection ZIP](clementine-softlight-collection.zip)

GitHub shows HTML source. Download the preview HTML and open it in your browser to browse, edit and copy all fifteen designs. The HTML includes its own styles and editor; GIFs and optional Google Fonts load online. **View all 15 designs**, the named menu and previous/next controls all reach the complete collection.

The previous collection was intended to be **Tangerine**. Its snippets, stylesheets and preview remain unchanged at their existing paths. See the [earlier collection index](https://github.com/lexdoescodingnow/templates/blob/main/clementine/tangerine-legacy-README.md) or its [original preview](https://github.com/lexdoescodingnow/templates/blob/main/clementine/clementine-collection-preview.html). This new collection uses separate class names and a new stylesheet, so existing posts retain their original design.

## Threads

| Design | Default GIFs | Composition |
| --- | ---: | --- |
| [Slow Peel](clementine-slow-peel-thread-01.txt) | 1 | A curled corner portrait beside an airy title, a fine colour frame and a hand-drawn ribbon of peel. |
| [Daylit Vellum](clementine-daylit-vellum-thread-02.txt) | 0 | An image-free translucent-paper composition with segmented colour rules, leaf shadows and a literary drop cap. |
| [Shared Segments](clementine-shared-segments-thread-03.txt) | 2 | A close-set pair of cinematic stills, a tiny ampersand seal and a spacious, centred title. |
| [The Tender Hour](clementine-the-tender-hour-thread-04.txt) | 1 | A letterpress-style masthead, an offset landscape still and a sunrise drawn with the lightest possible line. |
| [Citrus Reverie](clementine-citrus-reverie-thread-05.txt) | 0 | An image-free page with a sweeping type-led header, right-aligned dedication and one softly curved corner. |

## Comms

| Design | Default GIFs | Composition |
| --- | ---: | --- |
| [Pocket Grove](clementine-pocket-grove-comms-01.txt) | 1 | A softly framed phone with a leaf-corner contact portrait and received-message bubbles. |
| [Clementine OS](clementine-clementine-os-comms-02.txt) | 0 | A compact desktop-style messenger with a toolbar clock and crisp, coloured message rails. |
| [Soft Signal](clementine-soft-signal-comms-03.txt) | 0 | A tall, rounded lock screen with a delicate oversized clock and stacked notification cards. |
| [Petal Pixel](clementine-petal-pixel-comms-04.txt) | 1 | A camera-led chat device with a wide contact image, serif contact card and soft message bubbles. |
| [Dusk Dial](clementine-dusk-dial-comms-05.txt) | 1 | A pocket flip-phone treatment with a small contact display, hinge rule and oval control pad. |

## Buds

| Design | Default GIFs | Composition |
| --- | ---: | --- |
| [Rindlet](clementine-rindlet-bud-01.txt) | 0 | A miniature folded-corner reply with a peel flourish and a member-colour lower edge. |
| [Little Halo](clementine-little-halo-bud-02.txt) | 1 | A tiny ringed portrait beside a short title, followed by a compact reply. |
| [Sugar Pollen](clementine-sugar-pollen-bud-03.txt) | 0 | A centred miniature note on a barely dotted background, with a small five-petal blossom. |
| [Leaflit](clementine-leaflit-bud-04.txt) | 1 | A portrait tab to the right of a literary heading, with a fine botanical signature. |
| [Clement Kiss](clementine-clement-kiss-bud-05.txt) | 0 | A small, gently curved reply card with a paired-segment signature. |

## Copy and edit

Open a named `.txt` file on GitHub and use **Copy raw file**. Paste the entire `[dohtml]` block into your forum post. Names, URLs, title/status, GIF URLs, comms time and writing come before decoration and the stylesheet link. Posting snippets and template CSS contain no comments, hidden tips or editing instructions.

`[url]` is the linked character or thread URL; `[name]` is the displayed name; `[text]` is the title or message status. The preview supplies sample names and titles while untouched copied code keeps all three placeholders. Writing defaults to lorem ipsum.

Use ordinary `<p>` paragraphs. Comms accept successive opening `<p>` tags without closing each paragraph or adding a repeated class. `data-direction="received"`, `"sent"` and `"mixed"` select message alignment; mixed alternates the message direction. Device clocks, composer bars, hinge and control-pad details are decorative.

Inside `[dohtml]`, use `<b>`, `<i>` and `<u>`; `<strong>` and `<em>` also work. The preview editor converts `[b]`, `[i]` and `[u]` to HTML. Bold and underline run through member colours 1 → 2 → 3; italics reverse them to 3 → 2 → 1.

GIF counts follow each composition. Both supplied placeholder URLs are used exactly. Remove an image tag or use the editor’s **Remove** button; unused media space collapses. To add GIFs to an image-free design, use **Add GIF**, or add `<div class="cl-media"><img src="YOUR_GIF_URL" alt="Character portrait"></div>` immediately before `cl-copy`. Use `object-position` on an image to adjust its crop. Bud defaults have fewer than 100 words; longer replies are never clipped.

Each design retains its edits while the preview is open. Use **Download .txt** to keep the edited code. The editor accepts paragraph text, emphasis, links and blockquotes. Preview colour samples and custom colour pickers do not enter the posting code; the forum supplies the actual member palette. Light/dark/system and forum/375 px/320 px controls apply to the preview. Clipboard access has a select-and-copy fallback.

## Forum integration

Every current snippet includes one [hosted stylesheet link](https://cdn.jsdelivr.net/gh/lexdoescodingnow/templates@main/clementine/clementine-softlight-v1.css) inside its `[dohtml]` block. The forum must permit external stylesheet links. No JavaScript or HTML loader runs in forum posts.

Blue Hour’s inherited RGB triples `--mgrgb1`, `--mgrgb2` and `--mgrgb3` colour the templates. Dark mode lightens those hues for emphasis and frames. Explicit `html[color-mode="light"]` or `html[color-mode="dark"]` overrides the system fallback. Styles are scoped to `.clm` wrappers and their descendants.

Libre Caslon Display, Italiana and DM Sans fall back to Georgia and Arial. Original inline SVG peel, branch, segment, sunrise and blossom drawings require no external image downloads. Modern CSS `:has()`, container queries and `color-mix()` handle optional media, small layouts and colour tinting.

To rebuild snippets and the standalone preview, run `node clementine/build-clementine.cjs` from the repository root. The ZIP includes this collection’s snippets, stylesheet, preview and build sources. See [validation notes](SOFTLIGHT-VALIDATION.md) for completed checks and their limits.
