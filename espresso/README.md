# Espresso

## Current stylesheet delivery

This collection now follows the working Banana/Bingsu setup: direct stylesheet links on `@main`, with all layout and font-face rules included directly and no CSS imports. Current snippets, editor exports and forum masterposts use the new files. Earlier stylesheets remain available for existing posts.

- [espresso-layout-standalone-v2.css](espresso-layout-standalone-v2.css)

To rebuild this collection, run `python tools/build_standalone_styles.py`, `node espresso/build-espresso.cjs`, `python tools/build_forum_posts.py`, and `python tools/build_espresso_package.py` from the repository root. Follow the repository defaults to refresh the other split collection packages after a forum rebuild.


Fifteen JCink templates for **Jaeho & Leo**, inspired by a late-night café poster: expressive serif titles, member-coloured frames, neutral writing surfaces and small espresso-machine, coffee-bean and café details.

[Collection editor and preview](espresso-collection-preview.html) · [Download the complete collection](espresso-collection.zip)

The preview is a standalone HTML file with its styles and editor included. Download and open `espresso-collection-preview.html` directly in your browser; no ZIP extraction or companion files are needed. GIFs and web fonts still load online. GitHub displays its source when opened in the repository. The fifteen individual text files below can be copied directly from GitHub.

## Threads

| Design | GIFs | Composition |
| --- | ---: | --- |
| [Afterhours](espresso-afterhours-thread-01.txt) | 1 | A cinematic café poster: one wide character still, sweeping serif title and a fine metal colophon. |
| [Crema Obscura](espresso-crema-obscura-thread-02.txt) | 0 | An image-free café menu with a vertical wordmark, italic title and a generous literary page. |
| [Doppio Vow](espresso-doppio-vow-thread-03.txt) | 2 | Two character stills in a twin-shot frame, a centred title and a long, uncluttered writing area. |
| [Ninth Bar](espresso-ninth-bar-thread-04.txt) | 1 | A precision espresso-machine panel with one inset portrait and a small pressure gauge. |
| [Slow Extraction](espresso-slow-extraction-thread-05.txt) | 0 | An image-free barista order sheet with a stamped name, ruled writing and perforated details. |

## Comms

| Design | GIFs | Composition |
| --- | ---: | --- |
| [Steamline](espresso-steamline-comms-01.txt) | 1 | A modern phone with a single round contact portrait, member-coloured bubbles and a tiny steam detail. |
| [Dialtone Roast](espresso-dialtone-roast-comms-02.txt) | 1 | A nostalgic flip phone with a framed conversation screen, metal hinge and tactile keypad. |
| [Nightshift DM](espresso-nightshift-dm-comms-03.txt) | 0 | An image-free lock screen with a large café clock and incoming message notifications. |
| [Portafilter Ping](espresso-portafilter-ping-comms-04.txt) | 1 | A compact keyboard handset with a square contact image, LCD-style conversation and trackball. |
| [Last Call](espresso-last-call-comms-05.txt) | 1 | A portrait-led messenger with a wide contact cover, clock chip and simple received or sent bubbles. |

## Buds

| Design | GIFs | Composition |
| --- | ---: | --- |
| [Demitasse](espresso-demitasse-bud-01.txt) | 1 | A small cup-shaped reply with one round portrait and a delicate saucer mark. |
| [Ristretto](espresso-ristretto-bud-02.txt) | 0 | A concentrated, image-free reply with a compact monospaced heading and a single bean. |
| [Crema Kiss](espresso-crema-kiss-bud-03.txt) | 1 | A short reply beside a narrow character still, framed with a member-coloured edge. |
| [Beanmark](espresso-beanmark-bud-04.txt) | 0 | An open, image-free note with an italic heading, a tinted corner and a small coffee-bean signature. |
| [One More Sip](espresso-one-more-sip-bud-05.txt) | 0 | A tiny café receipt with split metadata, a perforated sign-off and a graphic till mark. |

## Posting

Open a named `.txt` file, use GitHub’s **Copy raw file** control, and paste the complete `[dohtml]` block into your forum post. Editable names, links, titles, times, GIF URLs and writing appear before the decoration and the stylesheet link. There are no template comments, hidden tips or instruction blocks.

The single stylesheet link loads [espresso-layout-standalone-v2.css](https://cdn.jsdelivr.net/gh/lexdoescodingnow/templates@main/espresso/espresso-layout-standalone-v2.css). The snippets contain no scripts, external HTML injection or per-message classes. No skin installation is required when the forum permits external stylesheets inside `[dohtml]`.

## Layout revision

The current snippets include the `esp-layout-v2` marker and a fresh standalone stylesheet. Use the updated masterpost or copy a current snippet to adopt these fixes.

- Ninth Bar and Crema Kiss keep portraits at a deliberate size, with stacked arrangements in narrow cards.
- Last Call’s clock stays within its contact section instead of crossing the portrait edge.
- Doppio Vow uses explicit portrait columns without a floating centre divider.
- Coffee beans, cups, steam and the pressure gauge fit inside reserved footer spaces; keyboard controls have separate columns.
- Title sizes and compact metadata respond to the template’s available width. Empty image areas still collapse.

Names, GIF URLs, member-colour gradients, light/dark support and editable writing are preserved. Older stylesheet endpoints remain available for existing posts.

## Editing

The collection editor provides all fifteen designs, per-design edits retained while the tab remains open, member-palette samples, light/dark/system themes, narrow-width previews, GIF controls and copy/download buttons. Preview palette choices do not override the member colours in copied code.

Each design begins with the GIF count shown above. Remove an image or clear its URL to omit it. When editing a snippet directly, remove an unused `<img>` tag; an empty or absent `esp-media` container collapses. You can add an `esp-media` container and ordinary images to the image-free designs, or use **Add GIF** in the editor. More than two images are supported, although portrait proportions will change with the available space.

Comms use plain `<p>` paragraphs, including successive opening `<p>` tags without their closing tags. Change the wrapper’s `data-direction` to `received`, `sent` or `mixed` to change message alignment. Phone keypads, clocks and composer bars are decorative. Buds encourage replies of 100 words or fewer; longer text remains visible.

The editor accepts plain paragraphs, `<p>`, `<br>`, links, blockquotes, and bold/italic/underline HTML. It also converts `[b]`, `[i]` and `[u]` to HTML. In a directly edited `[dohtml]` snippet, use `<b>`, `<i>` and `<u>`; `<strong>` and `<em>` work too. Scripts, unsafe URLs and unsupported markup are removed from editor output.

## Member colours and themes

The inherited RGB triples `--mgrgb1`, `--mgrgb2` and `--mgrgb3` drive headings, borders, frames, message tints and emphasis. Bold and underline follow group 1 → 2 → 3; italic follows group 3 → 2 → 1. Quiet bronze accents are confined to small flavour details. Backgrounds and ordinary writing remain neutral.

Blue Hour’s explicit `html[color-mode="light"]` and `html[color-mode="dark"]` modes take precedence over system preference. With no explicit forum mode, `prefers-color-scheme` supplies the fallback. Automatic image-free reflow uses CSS `:has()`. Fonts fall back to local serif, sans-serif and monospace families; the CDN, Google Fonts and placeholder GIFs need internet access.

## Validation

See [VALIDATION.md](VALIDATION.md) for the checks completed for this release and the limits of verification.

## Forum-ready collection

[Preview-above-code forum masterpost](../forum-posts/espresso-forum-masterpost.txt) · [Downloadable browser preview with Copy buttons](../forum-posts/espresso-preview.html) · [All collections and numbered post parts](../forum-posts/README.md).
