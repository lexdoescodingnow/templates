# Citron · The art of something bright

Fifteen JCink templates for **Ben & Vince**: five threads, five phone-style comms and five miniature buds. Botanical specimen plates, wrinkled citron rind and perfume labels provide the details; member colours carry the design over neutral writing surfaces.

[Preview and editor](citron-collection-preview.html)

Open a named `.txt` file below and select **Copy raw file** on GitHub. Paste the whole block into your forum post; the `[dohtml]` tags and hosted stylesheet link are included. To use the editor, download the preview HTML and open it in your browser. GitHub displays HTML as source.

## Threads

| Design | Starting GIFs | Layout |
| --- | ---: | --- |
| [Cedrat Atelier](citron-cedrat-atelier-thread-01.txt) | 2 | A perfumer's specimen plate with a giant serif title, paired inset portraits and a textured citron medallion. |
| [Albedo Archive](citron-albedo-archive-thread-02.txt) | 0 | A spacious botanical journal with a split title band, embossed rind curves and an indented reading column. |
| [Vesicle Verse](citron-vesicle-verse-thread-03.txt) | 2 | A sculptural cell-window diptych with curved inner corners, a side-set caption and an open writing panel. |
| [Pith & Parfum](citron-pith-parfum-thread-04.txt) | 1 | A perfume-label composition with a wide portrait, a formal oval title cartouche and fine double rules. |
| [Zeste Manifesto](citron-zeste-manifesto-thread-05.txt) | 1 | An energetic typeset page with a narrow portrait column, oversized leading text and citrus-oil stippling. |

## Comms

| Design | Starting GIFs | Layout |
| --- | ---: | --- |
| [Zestline](citron-zestline-comms-01.txt) | 1 | A slim modern phone with an off-centre camera pill, round contact portrait and wide incoming bubbles. |
| [PithChat](citron-pithchat-comms-02.txt) | 1 | A soft square smart communicator with a small contact tile, inset chat display and circular lower controller. |
| [Cedra Sync](citron-cedra-sync-comms-03.txt) | 2 | A landscape pocket communicator with paired contact tabs, a status rail and a tiny horizontal keyboard. |
| [Rindr](citron-rindr-comms-04.txt) | 0 | A minimalist e-paper phone with a large contact name, squared bubbles and stippled rind grip. |
| [CitrOS](citron-citros-comms-05.txt) | 1 | A curved glass phone with a full-width photo card, floating status capsule and layered message bubbles. |

## Buds

| Design | Starting GIFs | Layout |
| --- | ---: | --- |
| [Zestmark](citron-zestmark-bud-01.txt) | 0 | A tiny typeset note with an oversized opening letter and three oil-gland marks. |
| [Pithlet](citron-pithlet-bud-02.txt) | 1 | A round little portrait beside a finely ruled title and a short open reply. |
| [Oilspot](citron-oilspot-bud-03.txt) | 0 | A miniature scent label with concentric rounded corners and an off-centre citron stamp. |
| [Vesicle Kiss](citron-vesicle-kiss-bud-04.txt) | 2 | Two tiny asymmetric cell portraits beside a shared heading, above a compact reply. |
| [Rindscript](citron-rindscript-bud-05.txt) | 0 | A low horizontal note with a coloured inset nameplate and a finely ridged right edge. |

## Editing

`[url]`, `[name]` and `[text]` are the first editable fields. `[text]` is the title or contact status. GIFs, the comms time and the lorem ipsum follow. The writing is in `ctn-copy`. All editable content comes before the decorative element and stylesheet link. Templates contain no comments, hidden editing notes or instruction blocks.

The preview shows **Ben & Vince** and sample titles. Unchanged exports keep the literal placeholders. Enter your actual name and title in the editor to include those in the copied code. Preview colours and mode are never written into posting snippets; forum posts inherit the member's group colours. Each design retains edits while the page stays open. Use **Download .txt** to save edited code.

Use ordinary `<p>` paragraphs. In comms, every paragraph is one message bubble, including successive opening `<p>` tags without closing tags. `data-flow="received"`, `"sent"` and `"mixed"` set message direction, also available in the editor. The device controls are decorative. Buds are designed for replies of 100 words or fewer; longer text remains visible.

Inside `[dohtml]`, use `<b>` / `<strong>`, `<i>` / `<em>` and `<u>`. The editor accepts `[b]`, `[i]` and `[u]` and converts them into HTML when generating code. Raw BBCode parsing inside `[dohtml]` depends on the forum, so direct posting snippets already use HTML emphasis.

## GIFs

Both supplied Tumblr GIF URLs are preserved exactly. Five designs start without images, six start with one, and four start with two. These are starting compositions, not fixed limits. Use **Add GIF**, **Remove**, or the crop-position field in the editor.

In raw snippets, edit or remove `<img>` elements in `ctn-media`. Empty image containers disappear automatically and layouts reclaim the portrait space. To add GIFs to an image-free design, insert a `ctn-media` div containing ordinary image elements before `ctn-copy`. Extra portraits wrap or stack; image URLs are never duplicated in CSS. Use direct image URLs from a host that allows embedding.

## Colours and modes

Inherited RGB triples `--mgrgb1`, `--mgrgb2` and `--mgrgb3` drive headers, borders, image frames, device details and emphasis. Missing secondary colours fall back to an available member colour. Bold and underline use the forward gradient, 1 → 2 → 3; italics use 3 → 2 → 1. Text gradients blend toward the neutral text colour to improve readability across member palettes.

Explicit `html[color-mode="light"]` and `html[color-mode="dark"]` override the system preference fallback. All stylesheet selectors are scoped to `bh-citron`. Forum snippets contain no scripts. Motifs are newly drawn CSS and inline SVG masks, embedded in the stylesheet. Fonts use local Bodoni/Didot/Times, Georgia and Trebuchet/Arial fallbacks, so no font service is required. Modern CSS features include `color-mix()`, `:has()`, masks and container queries.

## Files

[citron-atelier-v1.css](citron-atelier-v1.css) contains the shared styles. The posting URLs are pinned to the Git commit recorded in [stylesheet-revision.txt](stylesheet-revision.txt). The stylesheet applies directly to the pasted HTML; no JavaScript injector is required.

The preview is standalone, with its CSS and editor embedded; its GIFs require internet access. `designs.json` holds the names, sample titles and image defaults. Run `node citron/build.cjs` from the repository root to rebuild the 15 snippets and preview. [VALIDATION.md](VALIDATION.md) records the completed checks and their limits.
