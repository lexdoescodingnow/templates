# Clementine collection

Five thread templates, five comms templates and five buds, inspired by the Arthur & Nate poster. The collection shares Bodoni Moda lettering, neutral paper and charcoal surfaces, engraved citrus details and inherited member colours.

Open [clementine-collection-preview.html](clementine-collection-preview.html) in a browser to see all fifteen designs. The named index links and Previous/Next links navigate all fifteen designs, including without JavaScript. Its category filters, light/dark buttons and sample group palettes change the preview; each design has its own exact posting snippet and copy-code button. All designs are present in the HTML, including when JavaScript is unavailable.

## Threads

| Design | Treatment | Posting snippet |
| --- | --- | --- |
| Zest | The original staggered portraits and engraved citrus details | [clementine-zest.txt](clementine-zest.txt) |
| Satsuma | Paired citrus-shaped frames and a centred masthead | [clementine-thread-satsuma.txt](clementine-thread-satsuma.txt) |
| Orangerie | Tall conservatory windows and a botanical finish | [clementine-thread-orangerie.txt](clementine-thread-orangerie.txt) |
| Marmalade | A horizontal portrait strip with a coloured spine | [clementine-thread-marmalade.txt](clementine-thread-marmalade.txt) |
| Sunroom | A wide photograph with a circular portrait inset | [clementine-thread-sunroom.txt](clementine-thread-sunroom.txt) |

## Comms

| Design | Treatment | Posting snippet |
| --- | --- | --- |
| Pulp | A rounded phone, centred portrait and soft message bubbles | [clementine-comms-pulp.txt](clementine-comms-pulp.txt) |
| Nectar | A compact chat screen with a tinted contact bar | [clementine-comms-nectar.txt](clementine-comms-nectar.txt) |
| Peel | A slim handset, vertical portrait and folded message corners | [clementine-comms-peel.txt](clementine-comms-peel.txt) |
| Fleur | A portrait-led messenger with a photographic header | [clementine-comms-fleur.txt](clementine-comms-fleur.txt) |
| Pressé | A square messenger with crisp message panels | [clementine-comms-presse.txt](clementine-comms-presse.txt) |

## Buds

| Design | Treatment | Posting snippet |
| --- | --- | --- |
| Pip | A tiny portrait beside a quick reply | [clementine-bud-pip.txt](clementine-bud-pip.txt) |
| Pith | A circular portrait above a small, centred note | [clementine-bud-pith.txt](clementine-bud-pith.txt) |
| Dew | Twin miniature portraits along the top edge | [clementine-bud-dew.txt](clementine-bud-dew.txt) |
| Segment | A little panoramic photograph over a short reply | [clementine-bud-segment.txt](clementine-bud-segment.txt) |
| Blossom | A leaf-shaped portrait and an asymmetric frame | [clementine-bud-blossom.txt](clementine-bud-blossom.txt) |

Buds are intended for replies of around 100 words or fewer. Their placeholder writing is under 100 words. They do not truncate text or enforce a word limit.

## Editing and posting

Copy one complete snippet, including `[dohtml]` and `[/dohtml]`. Editable names, URLs, titles or statuses, GIFs, timestamps and writing come before the decorative elements and stylesheet link.

Replace `[url]`, `[name]`, `[text]` and, for comms, `[time]`. The supplied Tumblr GIFs and lorem ipsum are already filled in. The `object-position` settings next to the GIF URLs control their crops. Threads include both GIFs; removing either leaves a single-image layout. Comms and most buds use one GIF, while Dew uses both.

Use ordinary `<p>` paragraphs for writing. Each comms paragraph becomes a separate message bubble, and successive opening `<p>` tags work without repeated wrappers, classes or closing paragraph tags. Comms show one character's outgoing messages with a delivery receipt. The phone decorations are static design elements; the posting templates do not contain scripts or functional message inputs.

The examples use `<b>`, `<i>` and `<u>`. Styles also cover `<strong>` and `<em>`, including equivalent HTML produced by a forum's BBCode parser. Bold and underline follow group colours 1→2→3; italics reverse them to 3→2→1. BBCode interpretation remains the forum's responsibility.

## Colours and shared styles

Member colours are inherited from Blue Hour's comma-separated RGB variables `--mgrgb1`, `--mgrgb2` and `--mgrgb3`. They colour the design as well as the formatting. Clementine, honey and leaf fallback colours appear when the variables are absent. No member group is hardcoded.

Explicit `html[color-mode="light"]` and `html[color-mode="dark"]` settings take precedence over the system preference. The system dark-mode fallback applies only when the HTML element has no `color-mode` attribute. Every template adapts to its container; all styles are scoped to the collection's wrappers.

| Stylesheet | Used by |
| --- | --- |
| [clementine-zest-v1.css](clementine-zest-v1.css) | Original Zest; base styling imported by the other threads |
| [clementine-threads-v1.css](clementine-threads-v1.css) | Satsuma, Orangerie, Marmalade and Sunroom |
| [clementine-companions-v1.css](clementine-companions-v1.css) | All five comms and all five buds |

The original Zest snippet and stylesheet are preserved. Each posting snippet contains exactly one stylesheet link. Shared citrus drawings are embedded in CSS; Google Fonts, Tumblr GIFs and hosted stylesheets require external access. System fonts provide fallbacks. Template HTML and CSS contain no comments, hidden tips or editing instructions.

The single collection preview includes the template CSS inline and the exact source for every design. The collection preview uses a fresh filename so older links to the original Zest preview cannot be mistaken for this file.

## Validation

Checks cover the five-of-each inventory, HTML and CSS parsing, snippet/preview agreement, copy-code selection, category filtering, theme and palette controls, inherited colour references, scoped selectors, script-free snippets, message paragraph structure, GIF URLs, stylesheet dependencies and bud word counts. Zest is compared with its previous committed version to confirm preservation.

The supplied GIFs were verified as animated image files during the initial build. Source and interaction checks do not establish pixel-level appearance or live JCink parsing. Visual browser verification remains unavailable because this session's browser blocks local preview files; live posting on JCink has not been tested.
