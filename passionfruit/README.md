# Passionfruit

Fifteen JCink templates inspired by the Passionfruit poster: passionflower coronas, glossy seed shapes, botanical cross-sections and sweeping romantic lettering. Member colours drive the headers, frames, borders and emphasis, with neutral writing surfaces.

[Standalone preview and editor](passionfruit-collection-preview.html)

[Download the complete collection](passionfruit-collection.zip)

Download the HTML preview and open it in your browser. Select any of the fifteen named designs or **View all 15 designs**, edit the fields, and copy or download the posting code. All preview styling and editor code are included in that single HTML file. GitHub displays HTML source; the individual `.txt` files below are ready to copy directly.

## Threads

| Design | Default GIFs | Composition |
| --- | ---: | --- |
| [Corolla Afterglow](passionfruit-corolla-afterglow-thread-01.txt) | 1 | A cinematic landscape still beneath an asymmetric flower-corona masthead and a generous reading page. |
| [Maracuja Reverie](passionfruit-maracuja-reverie-thread-02.txt) | 1 | A botanical magazine spread with a narrow portrait alongside the writing, a vertical imprint and an oversized title. |
| [Golden Aril](passionfruit-golden-aril-thread-03.txt) | 0 | An image-free specimen plate with a sectional fruit drawing, offset title and a ruled literary column. |
| [Purple Hour](passionfruit-purple-hour-thread-04.txt) | 2 | A staggered two-still composition, a title crossing the open space and a broad, quiet reading panel. |
| [Feverbloom](passionfruit-feverbloom-thread-05.txt) | 0 | A sculptural invitation with radiating petal lines, centred display lettering and a crisp inner writing panel. |

## Comms

| Design | Default GIFs | Composition |
| --- | ---: | --- |
| [Pollen Ping](passionfruit-pollen-ping-comms-01.txt) | 1 | A slim contemporary phone with a capsule contact portrait, inset screen and soft received-message bubbles. |
| [Rind Ring](passionfruit-rind-ring-comms-02.txt) | 0 | A compact slider handset with a small conversation screen, a navigation ring and a twelve-key pad. |
| [Nectarline](passionfruit-nectarline-comms-03.txt) | 1 | A portrait-banner smartphone with a floating contact label and broad, rounded message bubbles. |
| [Tropic Touch](passionfruit-tropic-touch-comms-04.txt) | 0 | A precise e-paper phone with a typographic contact header, outlined chat bubbles and a segmented colour frame. |
| [Fuchsia Frequency](passionfruit-fuchsia-frequency-comms-05.txt) | 1 | A small desktop messenger with a contact sidebar, window controls and a roomy chat pane. |

## Buds

| Design | Default GIFs | Composition |
| --- | ---: | --- |
| [Seedkiss](passionfruit-seedkiss-bud-01.txt) | 0 | A compact horizontal reply with a tiny seed cluster, a coloured name tab and a clean lower rule. |
| [Petal Pulse](passionfruit-petal-pulse-bud-02.txt) | 1 | A small portrait strip beside a miniature reply, finished with a cropped passionflower corona. |
| [Aril Aside](passionfruit-aril-aside-bud-03.txt) | 0 | A little marginal note with a vertical imprint and a fruit-section seal at its foot. |
| [Tiny Tang](passionfruit-tiny-tang-bud-04.txt) | 1 | A short reply beneath a slim cinematic still with split-colour corner marks and a narrow title band. |
| [Sweet Ache](passionfruit-sweet-ache-bud-05.txt) | 0 | An intimate centred note cradled by fine radial petals and a single member-colour signature rule. |

## Copy and edit

Open one named `.txt` file and use GitHub's **Copy raw file**. Paste the complete `[dohtml]` block into your forum post.

The `[url]`, `[name]` and `[text]` fields appear first. `[url]` is the linked character or thread URL; `[name]` is its displayed name; `[text]` is the thread title or message status. Time, GIFs and writing follow, ahead of decoration and the stylesheet link. All default prose is lorem ipsum. There are no comments, hidden tips or editing notes in the posting snippets or template CSS.

Use ordinary `<p>` paragraphs. In comms, each paragraph creates a message bubble; successive opening `<p>` tags without closing paragraph tags also work. No repeated message class or div is needed. Comms use `data-direction="received"`, `"sent"` or `"mixed"`; mixed alternates the direction. Clocks, device controls, keys and composer bars are decorative.

Inside `[dohtml]`, use `<b>`, `<i>` and `<u>` for emphasis; `<strong>` and `<em>` also work. The preview editor converts `[b]`, `[i]` and `[u]` to HTML. Bold and underline use member colours 1 → 2 → 3. Italics reverse them to 3 → 2 → 1. The body text stays on a neutral surface.

The seven image-free, seven single-GIF and one paired-GIF defaults are composition choices. Both supplied GIF URLs are preserved exactly. Use **Add GIF** or **Remove** in the preview. When editing code directly, delete an unwanted `<img>` tag or the entire `pfr-media` div. Empty media containers disappear, and portrait columns reflow. To add a GIF to an image-free design, insert `<div class="pfr-media"><img src="YOUR_GIF_URL" alt="Character portrait"></div>` above `pfr-copy`. Use an image's `object-position` to adjust its crop. Bud defaults have fewer than 100 words, and longer text is not clipped.

The editor retains separate changes for each design while the page remains open. **Download .txt** keeps an edited snippet after closing the preview. It supports basic paragraph markup, emphasis, links and blockquotes. It also has light/dark/system modes, five palette samples, three member-colour pickers, 375 px and 320 px post widths, previous/next navigation and a full gallery. Palette and mode choices are preview settings: the copied code inherits the forum's member palette and mode. If clipboard access is unavailable, the code is selected for manual copying.

## Forum integration

Every snippet contains one link to [passionfruit-collection-v1.css](https://cdn.jsdelivr.net/gh/lexdoescodingnow/templates@a0c45fbc2a048a28c6d23745eeb930628af98c7f/passionfruit/passionfruit-collection-v1.css), pinned to the published stylesheet commit `a0c45fb`. The forum must allow external stylesheet links inside `[dohtml]`. No JavaScript or external HTML injector runs in forum posts.

The inherited RGB triples `--mgrgb1`, `--mgrgb2` and `--mgrgb3` drive the colours. Fallbacks apply only when those variables are absent. Light mode deepens member hues for emphasis; dark mode lightens them. Blue Hour's explicit `html[color-mode="light"]` and `html[color-mode="dark"]` settings override the system-preference fallback. Template styles are scoped to `.pfr` and its prefixed design classes.

Bodoni Moda and DM Sans fall back to Georgia and Arial. Original vector passionflower, seed, fruit-section and filament motifs are encoded in the shared CSS, keeping the posting snippets short. CSS `:has()` handles empty media, and `color-mix()` tints the member hues. GIFs, optional web fonts and the forum stylesheet require internet access.

## Build and verification

Run `node passionfruit/build.cjs` from the repository root to rebuild all snippets, the compiled stylesheet, design index and standalone preview. The builder reads `stylesheet-revision.txt`; for a future stylesheet release, publish the revised CSS and update that revision before rebuilding the posting snippets. The ZIP includes the sources and all fifteen snippets.

See [VALIDATION.md](VALIDATION.md) for completed source and hosting checks. Visual rendering and live JCink behaviour remain unverified because this session's preview browser blocked local HTML files.
