# Bingsu · The Thaw Collection

Fifteen new JCink designs inspired by the supplied Bingsu poster: icy glass, crystalline edges, melting snow, dessert-glass curves and soft handwritten lettering. Member colours run through the headers, frames, borders and emphasis. Writing stays on neutral surfaces.

[Standalone HTML preview and editor](bingsu-collection-preview.html) · [Download the complete collection](bingsu-thaw-collection.zip)

Download the HTML file and open it in a browser to see the designs. It includes all styling and the editor in one file. Choose a name in the menu, use previous/next, or select **View all 15 designs**. GitHub displays the HTML source; the individual `.txt` files are ready to copy directly.

## Threads

| Design | Default GIFs | Composition |
| --- | ---: | --- |
| [Rime Reverie](bingsu-rime-reverie-thread-01.txt) | 1 | A frost-edged portrait window, a sweeping title and a clean page within an angular glass frame. |
| [Crystal Veil](bingsu-crystal-veil-thread-02.txt) | 2 | Two portraits in a single fractured-glass composition, held above a fine central seam. |
| [Meltwater Letters](bingsu-meltwater-letters-thread-03.txt) | 0 | An open snowfield page with flowing type, a narrow meltwater margin and a suspended droplet. |
| [First Thaw](bingsu-first-thaw-thread-04.txt) | 1 | A shallow dessert-glass portrait, three fine syrup lines and a broad literary page. |
| [Snowlight Sonata](bingsu-snowlight-sonata-thread-05.txt) | 0 | An airy frost-window folio with a geometric upper lattice, wide writing and a quiet lower signature. |

## Comms

| Design | Default GIFs | Composition |
| --- | ---: | --- |
| [Frostline](bingsu-frostline-comms-01.txt) | 1 | A translucent smartphone with a stepped ice frame, contact portrait and soft received-message bubbles. |
| [Glacé Chat](bingsu-glace-chat-comms-02.txt) | 0 | A compact wrist communicator with a ridged strap, curved display and small digital crown. |
| [Snowglow](bingsu-snowglow-comms-03.txt) | 1 | A frosted notification phone with a tall clock, floating portrait tile and a separate message tray. |
| [Sleet Signal](bingsu-sleet-signal-comms-04.txt) | 0 | A slim candybar phone with crystalline navigation keys and a real twelve-key silhouette. |
| [Berry Byte](bingsu-berry-byte-comms-05.txt) | 1 | A small landscape tablet with a capsule camera, contact portrait and generous inset conversation pane. |

## Buds

| Design | Default GIFs | Composition |
| --- | ---: | --- |
| [Icelet](bingsu-icelet-bud-01.txt) | 0 | A tiny angular glass slip with a notched heading and a crisp member-colour edge. |
| [Milky Kiss](bingsu-milky-kiss-bud-02.txt) | 1 | A small curved dessert-glass portrait above a short reply and an understated signature. |
| [Frostpetal](bingsu-frostpetal-bud-03.txt) | 0 | A compact reply held within four delicate crystalline corners and an open centre. |
| [Syrup Trace](bingsu-syrup-trace-bud-04.txt) | 1 | A portrait postage tile aligned with a flowing colour trace and a miniature literary reply. |
| [Last Snow](bingsu-last-snow-bud-05.txt) | 0 | A low, quiet note with a broken frost baseline and a sweeping handwritten heading. |

## Copy and edit

Open an individual `.txt` file and select GitHub's **Copy raw file**. Paste the complete `[dohtml]` block into your forum post.

The first editable elements contain `[url]`, `[name]` and `[text]`. The URL links the name to a character or thread; `[text]` is the thread title or comms status. Comms times, GIF URLs and lorem ipsum writing follow, ahead of decorative markup and the stylesheet link. There are no comments, hidden tips or editing instructions inside the posting snippets or template CSS.

Use ordinary `<p>` paragraphs. For comms, each paragraph becomes a message bubble; successive opening `<p>` tags work without separate closing tags. Set `data-direction` on the outer comms wrapper to `received`, `sent` or `mixed`. The device clocks, status symbols, keys and composer bars are decorative.

Inside `[dohtml]`, use `<b>`, `<i>` and `<u>`; `<strong>` and `<em>` also work. Bold and underline use member colours 1 → 2 → 3. Italics reverse them to 3 → 2 → 1. The preview editor converts `[b]`, `[i]` and `[u]` into HTML before copying. Literal BBCode inside `[dohtml]` depends on the forum parser, so the supplied snippets use HTML emphasis.

Seven designs begin without GIFs, seven with one and Crystal Veil with two. These are composition choices. Use **Add GIF** or **Remove** in the editor; both supplied URLs are preserved exactly. To remove an image in the code, delete its `<img>` element or the entire `bgs-media` div. Empty media containers disappear, and the portrait columns in Berry Byte and Syrup Trace reflow. To add an image to an image-free design, insert `<div class="bgs-media"><img src="YOUR_GIF_URL" alt="Character GIF"></div>` above `bgs-copy`. Change `object-position` to adjust the crop. Bud samples contain 43 words; the layouts accommodate longer writing without clipping.

The preview editor supports name, title/status, URL, time, GIF and writing edits. Each design keeps its own edits while the page is open. Use **Download .txt** to keep an edited snippet. The palette controls and light/dark/system modes affect the preview only; forum snippets inherit member colours and the forum's selected mode. The preview includes 375 px and 320 px width options and a full collection gallery. If clipboard access is unavailable, **Copy code** selects the code for manual copying.

## Forum integration

Every snippet loads [bingsu-thaw-v1.css](https://cdn.jsdelivr.net/gh/lexdoescodingnow/templates@e253a721b65f56194260de60b03f676479ae72bd/bingsu/bingsu-thaw-v1.css), pinned to stylesheet commit `e253a721b65f56194260de60b03f676479ae72bd`. The forum must permit external stylesheet links inside `[dohtml]`. Posts contain the actual HTML and one stylesheet link; no JavaScript or external HTML injector runs in forum posts.

The inherited `--mgrgb1`, `--mgrgb2` and `--mgrgb3` RGB triples supply the member palette. Fallbacks apply only when they are absent. Colour mixes deepen emphasis on light backgrounds and lighten it on dark backgrounds. Blue Hour's `html[color-mode="light"]` and `html[color-mode="dark"]` override system preference. Template rules use the distinct `bgs` prefix.

Allura, Newsreader and DM Sans load from Google Fonts, with local cursive, Georgia and Arial fallbacks. Original crystal, ice-shard, droplet and dessert-glass motifs are encoded as SVG masks in the stylesheet. No separate decorative image files are required. CSS uses `color-mix()` and `:has()` for palette tinting and empty-media reflow. GIFs, optional fonts and the forum stylesheet need internet access.

## Build and verification

Run `node bingsu/build.cjs` from the repository root to rebuild the 15 snippets, compiled CSS, design index and standalone preview. The builder reads `stylesheet-revision.txt`; publish a new stylesheet revision and update that file before rebuilding when changing the hosted styles. The ZIP contains this new collection and its sources.

See [VALIDATION.md](VALIDATION.md) for checks and limitations. Source validation passed; visual browser rendering and live JCink posting were not verified because the session's browser blocked local preview access.

## Earlier Bingsu designs

The previous [thread snippets](bingsu-compact-thread-snippets.txt), [comms snippet](bingsu-comms-snippet.txt), [buds snippets](bingsu-buds-snippets.txt) and their supporting stylesheets remain available. The new collection uses separate filenames and classes.
