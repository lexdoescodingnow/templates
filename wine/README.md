# Wine · Casper & Micah

Fifteen coordinated JCink designs: five threads, five phone-style comms and five miniature buds. Vineyard contours, decanter curves, bottle foils and sediment details connect the set. Member colours drive the headers, frames, lettering and message accents; reading surfaces stay neutral.

[Download the preview and editor](https://github.com/lexdoescodingnow/templates/raw/refs/heads/main/wine/wine-collection-preview.html)

Open a named `.txt` file below and choose **Copy raw file** on GitHub. Paste the complete block into a JCink post. The `[dohtml]` tags and one hosted stylesheet link are included.

Download the HTML preview and open it in your browser to select, edit and copy designs. Its CSS and editor are embedded; placeholder GIFs load from Tumblr. GitHub's file viewer displays HTML source rather than running the editor.

## Threads

| Design | Starting GIFs | Layout |
| --- | ---: | --- |
| [Terroir Atlas](wine-terroir-atlas-thread-01.txt) | 0 | An open cartographic page with a broad contour-map crest, an offset title and three coloured vineyard coordinates. |
| [Decanter Study](wine-decanter-study-thread-02.txt) | 1 | A curving, wide-bottomed frame holds a single portrait beside a tall heading, opening into a spacious reading bowl. |
| [Tannin & Time](wine-tannin-and-time-thread-03.txt) | 2 | Two tall portraits form an asymmetric diptych above a strong horizontal title and a slim coloured margin rail. |
| [The Lees](wine-the-lees-thread-04.txt) | 0 | A spare typographic page with an oversized low-set heading, generous paragraph space and a stippled sediment base. |
| [Véraison](wine-veraison-thread-05.txt) | 2 | A diagonal vineyard trellis frames two curved portraits over a colour-block name ribbon and airy full-width prose. |

## Comms

| Design | Starting GIFs | Layout |
| --- | ---: | --- |
| [Sommelier OS](wine-sommelier-os-comms-01.txt) | 1 | A tailored smartphone with a pill camera, a small circular contact portrait and a framed conversation screen. |
| [Corkline](wine-corkline-comms-02.txt) | 0 | A notification-style phone with a large lock-screen clock, compact contact label and individually outlined message cards. |
| [Claret Connect](wine-claret-connect-comms-03.txt) | 1 | A tall phone with a panoramic contact-photo header, a colour-washed name strip and rounded received bubbles. |
| [Amphora Link](wine-amphora-link-comms-04.txt) | 2 | A broad foldable messenger with twin portrait tiles, a centre hinge seam and softly squared message bubbles. |
| [Vintner Touch](wine-vintner-touch-comms-05.txt) | 0 | A slim corner-cut smartphone with a fine illuminated edge, a bottom contact dock and square inset message bubbles. |

## Buds

| Design | Starting GIFs | Layout |
| --- | ---: | --- |
| [Pipette](wine-pipette-bud-01.txt) | 1 | A narrow miniature reply with a tall glass-tube portrait and a small drop of colour beside the writing. |
| [Winefoil](wine-winefoil-bud-02.txt) | 0 | A compact bottle-foil sleeve with a serrated top edge, a narrow name band and a softly slanted title. |
| [Two Sips](wine-two-sips-bud-03.txt) | 2 | Two small bowl-shaped portraits sit above a shared stem line and a centred miniature reply. |
| [Corklet](wine-corklet-bud-04.txt) | 0 | A horizontal cellar-tag note with a punched loop, inked edge and a compact left-aligned reply. |
| [Rimprint](wine-rimprint-bud-05.txt) | 1 | A small open note with a ring-framed portrait overlapping a partial glass-rim impression and fine coloured rules. |

## Editing

The linked `[name]` and `[url]`, followed by the title or contact status `[text]`, sit at the top of every snippet. Comms times and GIF URLs follow where used. Lorem ipsum is in `wn-copy`, above the decorative elements and stylesheet link. Posting HTML and CSS contain no comments, hidden tips or editing notes.

The preview displays **Casper & Micah** and a sample heading while the name and title fields contain placeholders. Copied snippets preserve the actual field values. Each design keeps its edits while the preview remains open. **Copy code** and **Download .txt** export current edits; **Reset design** restores that design's defaults.

Use ordinary `<p>` paragraphs for writing and separate comms messages. Successive opening `<p>` tags work without closing each paragraph or adding a class to each message. Comms support `data-flow="received"`, `"sent"` and `"alternate"`. Device controls are decorative. Buds start with 36 words and are intended for replies of 100 words or fewer; longer writing is not clipped.

The editor converts `[b]`, `[i]` and `[u]` into HTML. Inside a raw `[dohtml]` snippet, use `<b>`, `<i>` and `<u>`; `<strong>` and `<em>` also work. Bold and underline follow member colours **1 → 2 → 3**; italics use **3 → 2 → 1**. Underlining retains a visible rule. Emphasis colours mix towards the neutral text colour for readability.

## GIFs, colours and themes

The starting image counts are design choices. **Add GIF**, **Remove**, a blank image URL and crop sliders update both the preview and copied code. In a raw snippet, remove the unwanted `<img>` element. Empty image containers disappear; image-dependent columns adapt when no GIF remains. Both supplied Tumblr URLs are retained exactly, including `.gifv`.

Inherited `--mgrgb1`, `--mgrgb2` and `--mgrgb3` RGB variables supply the member palette. Keep snippets inside the forum's member-colour scope. Preview colour controls affect the sample display and are not written into posting code.

Blue Hour `html[color-mode="light"]` and `html[color-mode="dark"]` set the neutral surfaces. Explicit forum modes take precedence over the system preference fallback. The editor offers Fit, 320 px and 550 px preview widths. The posting stylesheet is scoped to `.bh-wine`; posts need no JavaScript, external fonts or icon libraries. Modern CSS including `:has()`, `color-mix()` and grid is used.

## Repository integration

All fifteen named snippets and the standalone editor use the same `designs.json` catalogue and `wine-model.js` generator. Run `node wine/build.cjs` from the repository root to regenerate the snippets and editor. All posting snippets load `wine-cellar-v1.css` from the immutable GitHub revision recorded in `stylesheet-revision.txt`.

[Validation details](VALIDATION.md). Structural and editor checks passed; browser visual rendering and posting on the live forum remain unverified.
