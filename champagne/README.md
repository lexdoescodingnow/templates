# Champagne collection

The completed Champagne collection contains **five threads, five comms and five buds**. All share fine gold line work, neutral writing surfaces, inherited member colours, Cormorant Garamond and Manrope typography, and the two supplied Tumblr GIFs.

Open [champagne-preview.html](champagne-preview.html) in a browser to choose a category and design, compare light/dark modes, try sample group colours and a narrow width, then copy or download the selected snippet.

## Designs

### Threads

[All five threads snippets](champagne-thread-snippets.txt) — the five complete `[dohtml]` blocks appear in the same order as this table.

| Design | Look | Individual snippet |
| --- | --- | --- |
| Cuvée | Paired arched portraits, engraved lettering and a fine double frame. | [champagne-cuvee.txt](champagne-cuvee.txt) |
| Millésime | A vintage bottle label with squared landscape portraits and ruled borders. | [champagne-thread-millesime.txt](champagne-thread-millesime.txt) |
| Rosée | Softly curved borders, staggered oval portraits and an italic heading. | [champagne-thread-rosee.txt](champagne-thread-rosee.txt) |
| Éclat | A geometric diptych with corner brackets and a left-aligned title. | [champagne-thread-eclat.txt](champagne-thread-eclat.txt) |
| Réserve | A quieter writing-led layout with miniature portraits beneath the reply. | [champagne-thread-reserve.txt](champagne-thread-reserve.txt) |

### Comms

[All five comms snippets](champagne-comms-snippets.txt) — the five complete `[dohtml]` blocks appear in the same order as this table.

| Design | Look | Individual snippet |
| --- | --- | --- |
| Perlage | A champagne-trimmed phone with a contact strip and separate message bubbles. | [champagne-comms-perlage.txt](champagne-comms-perlage.txt) |
| Flûte | A slender handset with a tall cameo portrait and centred contact details. | [champagne-comms-flute.txt](champagne-comms-flute.txt) |
| Tchin | A compact retro phone with a square avatar, message tiles and a round home button. | [champagne-comms-tchin.txt](champagne-comms-tchin.txt) |
| Capsule | A softly rounded phone with a large circular portrait and right-aligned bubbles. | [champagne-comms-capsule.txt](champagne-comms-capsule.txt) |
| Veillée | A wider phone with a character GIF banner and fine accent bars on the messages. | [champagne-comms-veillee.txt](champagne-comms-veillee.txt) |

### Buds

[All five buds snippets](champagne-buds-snippets.txt) — the five complete `[dohtml]` blocks appear in the same order as this table.

| Design | Look | Individual snippet |
| --- | --- | --- |
| Mignon | A compact double-framed card with two miniature portrait circles. | [champagne-bud-mignon.txt](champagne-bud-mignon.txt) |
| Perle | A pearl-like single portrait above a centred name and a short reply. | [champagne-bud-perle.txt](champagne-bud-perle.txt) |
| Pétale | A petite side portrait beside the name and writing, with a softer corner shape. | [champagne-bud-petale.txt](champagne-bud-petale.txt) |
| Étincelle | A crisp miniature card with geometric photos, a diamond accent and a footer signature. | [champagne-bud-etincelle.txt](champagne-bud-etincelle.txt) |
| Goutte | A slim colour ribbon, a spacious short reply and two tiny drop-shaped portraits below. | [champagne-bud-goutte.txt](champagne-bud-goutte.txt) |

## Editing

Copy one whole `[dohtml]` block, including its single stylesheet link. All editable names, URLs, subtitles, GIFs, times and writing precede the decorative markup where possible. The `[url]`, `[name]`, `[text]` and comms `[time]` placeholders remain in the snippets; the preview uses sample values. The theme heading can also be edited.

Every comms message is one plain `<p>` element. Successive opening `<p>` tags work without closing tags or a repeated class. Closed `</p>` tags also work. Messages in every design belong to one sender; Capsule places that sender’s bubbles on the right. Receipt text is editable. Phone controls are decorative, and the forum snippets contain no scripts.

Buds are intended for replies of **100 words or fewer**. Each has a 36-word sample reply. There is no silent truncation or enforced input limit. Perle and Pétale start with a single GIF; the other buds and all threads use two. Single-GIF styling is included across the family.

Native `<b>`, `<i>` and `<u>` examples are supplied inside `[dohtml]`. The CSS also covers `strong`, `em`, and the corresponding HTML when the forum parses `[b]`, `[i]` and `[u]`. BBCode parsing itself belongs to the forum.

## Colours and modes

The inherited `--mgrgb1`, `--mgrgb2` and `--mgrgb3` RGB triplets colour headings, frames, dividers, message edges and appropriate surfaces. Bold and underline use the forward group gradient, 1 → 2 → 3; italics use the reverse, 3 → 2 → 1. Body text stays on neutral light/dark surfaces. The default champagne palette is used only when group variables are absent.

An explicit `html[color-mode="light"]` or `html[color-mode="dark"]` overrides the device preference fallback. All variants inherit this behaviour.

## Stylesheets

| Stylesheet | Purpose |
| --- | --- |
| [champagne-cuvee-v1.css](champagne-cuvee-v1.css) | Original Cuvée and shared thread styling |
| [champagne-companions-v1.css](champagne-companions-v1.css) | Original Perlage/Mignon and shared comms/bud styling; imports the original thread file |
| [champagne-thread-variations-v1.css](champagne-thread-variations-v1.css) | Four additional threads; imports the original thread file |
| [champagne-comms-variations-v1.css](champagne-comms-variations-v1.css) | Four additional comms; imports the shared companions file |
| [champagne-bud-variations-v1.css](champagne-bud-variations-v1.css) | Four additional buds; imports the shared companions file |

Cuvée, Perlage and Mignon keep their original snippet and stylesheet URLs. The new variants each carry one stylesheet link. All style selectors remain scoped to their template wrappers. The preview embeds the complete styling, with external font and GIF dependencies.

## Assets and checks

The current collection uses the two GIF URLs supplied by Lex: [portrait one](https://64.media.tumblr.com/cbcc309cd601f309dd8fd3dfd13b6bf8/996ba8d81fe808ab-3f/s540x810/d716b6373ccd5520d0ee95ad468c3aa7b272e7d3.gifv) and [portrait two](https://64.media.tumblr.com/5171fa96d9b8536ee1c661571af91b19/e4d3e377f6ce0b88-55/s540x810/992ab5016a2dc63e0f5b00ccee85c0ceee182158.gifv). Typography uses Cormorant Garamond and Manrope through Google Fonts, with system fallbacks; decorative line work is embedded in CSS.

Checks cover all fifteen snippets, paragraph parsing, placeholder placement, GIF URLs, stylesheet imports, and the preview’s copy/download content. Browser visual verification and live JCink posting were not performed in this session.
