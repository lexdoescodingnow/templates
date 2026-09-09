# Cocktail · A little after hours

Fifteen JCink templates for **Callum & Dae**. Cocktail menus, coupe stems, fluted glass, citrus twists and bar tabs form a new collection, with member colours carrying the frames, headings and details over neutral writing surfaces.

[Preview and editor](cocktail-collection-preview.html)

Open a named `.txt` file below, select GitHub’s **Copy raw file**, then paste the entire `[dohtml]` block into your post. Its hosted stylesheet is already linked. To use the preview/editor, download the HTML file and open it in a browser; GitHub displays HTML as source.

## Threads

| Design | GIFs | Layout |
| --- | ---: | --- |
| [Velvet Martini](cocktail-velvet-martini-thread-01.txt) | 2 | Twin coupe-shaped portraits, fine glass stems and a sweeping cocktail-menu heading. |
| [Highball Hour](cocktail-highball-hour-thread-02.txt) | 1 | A tall portrait in a fluted glass column beside a stacked heading, opening into generous writing space. |
| [Cut Crystal](cocktail-cut-crystal-thread-03.txt) | 2 | A faceted double portrait, cut-glass corner engravings and an angular reading frame. |
| [Open Tab](cocktail-open-tab-thread-04.txt) | 0 | A slender bar-tab folio with a ruled heading, column of measure marks and an open-ended reply. |
| [Last Pour](cocktail-last-pour-thread-05.txt) | 1 | A tilted citrus-peel flourish above an intimate letter, with a panoramic portrait resting on a thin glass foot. |

## Comms

| Design | GIFs | Layout |
| --- | ---: | --- |
| [Olive Wire](cocktail-olive-wire-comms-01.txt) | 1 | A polished smartphone with a pill-shaped contact portrait, olive-pick speaker and soft incoming bubbles. |
| [Shaker Chat](cocktail-shaker-chat-comms-02.txt) | 1 | A compact slide-phone silhouette with a brushed cap, contact screen and stacked messages over a ribbed lower grip. |
| [Rocks Relay](cocktail-rocks-relay-comms-03.txt) | 2 | An angular tabletop messenger with two contact tiles, a glassy display and a separate side status rail. |
| [Neon Dial](cocktail-neon-dial-comms-04.txt) | 0 | An image-free edge-lit phone with a large contact heading, compact incoming bubbles and a recessed gesture strip. |
| [Afterhours OS](cocktail-afterhours-os-comms-05.txt) | 1 | A portrait-backed contact header above neutral notification bubbles in a rounded glass-screen phone. |

## Buds

| Design | GIFs | Layout |
| --- | ---: | --- |
| [Twistlet](cocktail-twistlet-bud-01.txt) | 0 | A tiny note crossed by a loose citrus-peel flourish and a single member-colour rule. |
| [Dash of You](cocktail-dash-of-you-bud-02.txt) | 1 | A short horizontal reply with a little square portrait tucked into a measuring-line frame. |
| [Swizzle](cocktail-swizzle-bud-03.txt) | 0 | A narrow reply card with an olive-tipped stirrer running through the title margin. |
| [Double Measure](cocktail-double-measure-bud-04.txt) | 2 | Two miniature tumbler portraits beneath a shared heading and a small, open reply. |
| [Nightcap](cocktail-nightcap-bud-05.txt) | 0 | A rounded coaster note with embossed concentric corners, a centred caption and a final short reply. |

## Editing and posting

`[url]`, `[name]` and `[text]` are the first fields in every snippet. `[text]` is the title or contact status; the lorem ipsum in `ckt-copy` is the reply or messages. Comms time and GIF URLs follow the heading fields. All editable content precedes the decorative element and stylesheet link. No HTML or CSS comments, hidden tips or editing notes appear inside the templates.

The preview displays **Callum & Dae** with sample titles; unchanged exports retain your placeholders. Each design keeps its own edits while the page is open. **Copy JCink code** or **Download .txt** exports the current design. Preview member colours and mode remain outside your posting code, so posted templates inherit the forum’s values.

Use ordinary `<p>` paragraphs for writing. Every comms paragraph becomes a message bubble; successive opening `<p>` tags also work. Comms can use `data-flow="received"`, `"sent"` or `"mixed"`. Device hardware is decorative. Buds contain a short sample reply and grow naturally with the writing; they are intended for replies of around 100 words or fewer.

Inside `[dohtml]`, use `<b>` / `<strong>`, `<i>` / `<em>` and `<u>`. Bold and underline use the forward member gradient, 1 → 2 → 3; italics use the reverse, 3 → 2 → 1. The preview editor also accepts `[b]`, `[i]` and `[u]` and converts them to HTML. Literal BBCode parsing inside `[dohtml]` depends on the forum.

## GIFs

Both supplied Tumblr URLs are preserved exactly. They return animated 400 × 400 GIFs with 42 and 56 frames. Five designs start without images, six use one and four use two; these are defaults, not limits.

The editor supports adding, removing and cropping GIFs. In raw snippets, edit the `<img>` elements in `ckt-media`. Empty or removed image containers reclaim their space. To add an image to an image-free design, insert a `ckt-media` div containing an ordinary `<img>` before `ckt-copy`. Extra images wrap or stack within the chosen layout.

## Colour and mode

Blue Hour’s inherited `--mgrgb1`, `--mgrgb2` and `--mgrgb3` RGB triples drive the collection. Missing secondary colours fall back to an available member colour. Emphasis colours blend toward the neutral text colour for readability. Neutral light/dark surfaces preserve the writing space.

Explicit `html[color-mode="light"]` and `html[color-mode="dark"]` take precedence over system preference. Styles are scoped to `bh-cocktail`; the forum snippets contain no scripts. Fonts use local Palatino/Georgia, Trebuchet/Arial and Courier fallbacks, and motifs are newly drawn CSS/SVG geometry. The collection uses modern CSS including `:has()`, `color-mix()`, masks and container queries.

## Files and verification

[cocktail-afterhours-v1.css](cocktail-afterhours-v1.css) is the complete shared stylesheet. Posting URLs are pinned to the commit in [stylesheet-revision.txt](stylesheet-revision.txt). No forum HTML injector is required; the included stylesheet link applies the design to the pasted markup.

Run `node cocktail/build.cjs` from the repository root to regenerate all snippets and the standalone preview. The preview contains its own CSS, model and editor; the supplied GIFs are its only external assets. `designs.json` stores the names and layout defaults.

Run `python3 cocktail/validate.py` with `lxml` installed for structural checks. Run `node cocktail/validate.cjs` with `jsdom` and `css-tree` available for the editor and CSS checks. See [VALIDATION.md](VALIDATION.md) for the checks completed and the browser verification limitation.
