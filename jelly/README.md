# Jelly · The Soft Set

Fifteen JCink templates inspired by the supplied Jelly poster: translucent gel, soft moulded curves, glossy heart details and flowing serif lettering. Member colours run through the headers, frames, accents and formatted text, with neutral light and dark reading surfaces.

[HTML preview and editor](jelly-collection-preview.html) · [Download the complete collection](jelly-soft-set.zip)

Download the HTML preview and open it in a browser. All template styling and editor code are included in that one file. GitHub shows HTML as source; the individual `.txt` files below are the ready-to-copy posting snippets.

## Threads

| Design | GIFs | Layout |
| --- | ---: | --- |
| [Tremolo](jelly-tremolo-thread-01.txt) | 1 | Upright jelly-mould portrait, rippled frame and open writing. |
| [Vitreous Vow](jelly-vitreous-vow-thread-02.txt) | 2 | Interlocking rounded portraits, sweeping title and a signature rail. |
| [Velvet Set](jelly-velvet-set-thread-03.txt) | 0 | Asymmetric literary page with a narrow translucent side panel. |
| [Sweet Suspension](jelly-sweet-suspension-thread-04.txt) | 1 | Floating landscape still, suspended title tab and offset glass corners. |
| [Soft Centre](jelly-soft-centre-thread-05.txt) | 0 | Curved writing card with a translucent top lip and a tiny heart. |

## Comms

| Design | GIFs | Device |
| --- | ---: | --- |
| [Quiver Chat](jelly-quiver-chat-comms-01.txt) | 1 | Clear-case smartphone with a contact capsule. |
| [Gel Relay](jelly-gel-relay-comms-02.txt) | 1 | Flip phone with a portrait screen and a visible hinge. |
| [Lovebyte](jelly-lovebyte-comms-03.txt) | 0 | Landscape chat handheld with gel buttons. |
| [Wobblewave](jelly-wobblewave-comms-04.txt) | 1 | Music-player messenger with a circular control wheel. |
| [Blush Beep](jelly-blush-beep-comms-05.txt) | 0 | Two-way pager with a recessed display and rounded keys. |

## Buds

| Design | GIFs | Layout |
| --- | ---: | --- |
| [Heartlet](jelly-heartlet-bud-01.txt) | 0 | Miniature gel frame with a glossy heart seal. |
| [Gliss](jelly-gliss-bud-02.txt) | 1 | A small slanted portrait beside a short reply. |
| [Sugar Tremor](jelly-sugar-tremor-bud-03.txt) | 0 | Rippled note with a floating name tab. |
| [Gelée Kiss](jelly-gelee-kiss-bud-04.txt) | 2 | Paired miniature portrait tiles alongside the reply. |
| [Little Quake](jelly-little-quake-bud-05.txt) | 0 | An open horizontal note with a translucent title lozenge. |

## Copy and edit

Open one `.txt` file, use GitHub's **Copy raw file**, and paste the entire block, including `[dohtml]` and `[/dohtml]`, into your post. Each snippet contains the actual editable HTML and one link to the complete [Jelly stylesheet](jelly-glass-v1.css). No script or HTML injector is required in a forum post.

The first fields contain `[url]`, `[name]` and `[text]`. `[text]` is the title or comms status; the lorem ipsum in `bhj-copy` is the reply. Comms times and any GIFs follow those fields. All writing is above the decorative markup and the final stylesheet link. The posting snippets and template stylesheet contain no comments, hidden tips, editing instructions or separator banners.

Use normal `<p>` paragraphs. In comms, each paragraph is a separate message; successive opening `<p>` tags also work without closing each paragraph manually. `data-flow="received"`, `"sent"` or `"mixed"` controls message alignment. The hardware keys, clock symbols and composer shapes are decorative.

For emphasis inside `[dohtml]`, use `<b>`, `<i>` and `<u>`; `<strong>` and `<em>` are supported too. Bold and underline use member colours 1 → 2 → 3, while italics reverse them to 3 → 2 → 1. The preview editor converts `[b]`, `[i]` and `[u]` into HTML before copying. Literal BBCode processing inside `[dohtml]` depends on the forum, so the ready-to-use snippets use HTML.

Seven designs start without GIFs, six have one, and two have a pair. These counts are layout choices, not requirements. **Add GIF** and **Remove** update both the preview and the posting code. In raw code, remove an `<img>` or its entire `bhj-media` container. Empty containers disappear; portrait columns in Quiver Chat, Gliss and Gelée Kiss collapse when all images are removed. Add a `bhj-media` div containing real `<img>` elements above `bhj-copy` to include GIFs in a design that starts without them. The inline `object-position` controls the crop.

Both supplied Tumblr `.gifv` URLs are kept exactly as supplied. They returned animated `image/gif` data when checked. The defaults contain lorem ipsum, and all bud samples are below 100 words. Replies grow naturally; text is not clipped or put in a fixed-height scrolling box.

## Preview editor

Choose a design by name, step between designs, or select **View all 15**. Edit names, URLs, titles, times, message direction, GIFs and writing. Changes stay with each design while the page is open. Download the edited `.txt` file to keep changes after closing the page.

The preview has light, dark and system modes, member palette presets, three custom colour controls and narrow-width options. Palette and mode controls affect the preview only; copied snippets inherit the actual forum values. If clipboard access is unavailable, the code box opens and selects the snippet for manual copying.

## Forum styling

The stylesheet URL is `https://cdn.jsdelivr.net/gh/lexdoescodingnow/templates@main/jelly/jelly-glass-v1.css?v=20260908a`. It is a complete stylesheet, with no CSS imports or dependency on another flavour. The `bh-jelly` wrapper and `bhj-` classes isolate the collection from other template sets.

Inherited `--mgrgb1`, `--mgrgb2` and `--mgrgb3` RGB triples drive the design. Poster-inspired fallback colours apply only when those variables are absent. Emphasis is darkened in light mode and lightened in dark mode to improve readability. Blue Hour's `html[color-mode="light"]` and `html[color-mode="dark"]` override the operating system preference.

The type uses Georgia, Times New Roman, Arial and Courier New with local fallbacks. No external font service or decorative image download is required. Small gel details are CSS shapes. Modern CSS features include `color-mix()`, `:has()` and container queries. The forum needs to allow external stylesheet links in `[dohtml]`; GIFs and the hosted CSS require network access.

## Rebuild and verification

Run `node jelly/build.cjs` and `node jelly/validate.cjs` from the repository root. The source model produces both the individual snippets and the standalone preview, so they use the same markup and defaults.

See [VALIDATION.md](VALIDATION.md) for the verification scope. Browser rendering and live JCink posting were not verified because local preview access was blocked by the session's browser policy.
