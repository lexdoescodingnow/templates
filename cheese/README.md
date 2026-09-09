# Cheese · A little culture

Fifteen JCink designs for Minseo and Tommy: five threads, five electronic comms and five compact buds. Dairy labels, cheese-wheel portraits, Swiss holes, melting edges, branching veins and foil details give the collection its own visual identity. Member colours carry the headers, frames and emphasis; writing sits on neutral backgrounds.

[Preview and editor](cheese-collection-preview.html)

Open any named `.txt` file below and choose **Copy raw file**. Paste the complete block, including `[dohtml]`, its stylesheet link and `[/dohtml]`, into the forum. No separate script or injector is required. Download the preview HTML and open it in a browser to edit and compare the designs; GitHub displays HTML as source.

## Threads

| Design | Default GIFs | Layout |
| --- | ---: | --- |
| [Fromagerie Folio](cheese-fromagerie-folio-thread-01.txt) | 2 | A dairy-label folio with a bold circular maker seal, ribbon spine and paired photographs. |
| [Emmental Aperture](cheese-emmental-aperture-thread-02.txt) | 1 | An asymmetric Swiss-cheese frame with punched circles, a porthole portrait and broad typography. |
| [Raclette Reverie](cheese-raclette-reverie-thread-03.txt) | 2 | A low melting canopy above two cinematic photographs and a quiet, spacious reading panel. |
| [Blue Vein Letter](cheese-blue-vein-letter-thread-04.txt) | 0 | An open letter with branching blue-cheese veins, a marginal name and a generous editorial heading. |
| [Affinage Nocturne](cheese-affinage-nocturne-thread-05.txt) | 1 | A circular cheese-wheel portrait seated in a square label, with a banded spine and a calm reading column. |

## Comms

| Design | Default GIFs | Layout |
| --- | ---: | --- |
| [Curdline](cheese-curdline-comms-01.txt) | 1 | A slim smartphone with a Swiss-hole bumper, an inset contact tile and soft incoming message bubbles. |
| [Wheywave](cheese-wheywave-comms-02.txt) | 0 | A compact oval-ended communicator with a wide e-paper screen and a perforated speaker foot. |
| [Rind Relay](cheese-rind-relay-comms-03.txt) | 2 | A folding phone with paired contact screens, two visible hinge joints and a separate chat display. |
| [Fondue Link](cheese-fondue-link-comms-04.txt) | 1 | A desktop messenger with a contact sidebar, a window-control strip and generous floating bubbles. |
| [Casein Pocket](cheese-casein-pocket-comms-05.txt) | 1 | A chunky pocket device with a portrait window, a thumb dial and squared chat bubbles. |

## Buds

| Design | Default GIFs | Layout |
| --- | ---: | --- |
| [Brielet](cheese-brielet-bud-01.txt) | 0 | A tiny round-ended cheese label with concentric rind rules and a short reply. |
| [Crumble](cheese-crumble-bud-02.txt) | 0 | A compact open note with a punched-circle spine and a bold little heading. |
| [Petit Rind](cheese-petit-rind-bud-03.txt) | 1 | A small portrait tab beside a folded paper slip with a ridged edge. |
| [Curd Kiss](cheese-curd-kiss-bud-04.txt) | 2 | Two miniature wheel portraits above a narrow shared name ribbon and a tiny reply. |
| [Last Shaving](cheese-last-shaving-bud-05.txt) | 0 | An airy miniature note with a curled foil corner and one fine diagonal rule. |

## Editing

The first editable fields are `[url]`, `[name]` and `[text]`, followed by the timestamp for comms, GIFs and writing. They appear before decorative markup and the stylesheet link. There are no comments, hidden tips or editing instructions inside the posting snippets or template stylesheet.

Replace the lorem ipsum inside `chs-copy` using ordinary `<p>` paragraphs. A comms paragraph becomes one message; successive opening `<p>` tags also work. Change the wrapper's `data-flow` to `received`, `sent` or `mixed` for incoming, outgoing or alternating messages. Device controls are decorative.

The editor accepts `[b]`, `[i]` and `[u]` and converts them to `<b>`, `<i>` and `<u>` in copied code. Inside raw `[dohtml]` snippets, use the HTML versions because literal BBCode processing depends on the forum. `<strong>` and `<em>` are supported too. Bold and underline follow member colours 1 → 2 → 3; italics reverse them, 3 → 2 → 1. Text gradients blend toward the neutral text colour for readability.

Buds begin with a 36-word sample and are intended for replies around 100 words or fewer. The writing grows naturally; no hard word limit or scrolling text box is imposed.

## GIFs

Both supplied Tumblr URLs are used exactly as given. Five designs begin without images, six with one, and four with two. These are defaults rather than limits. The preview supplies Minseo & Tommy and example titles while exported defaults retain the requested placeholders.

Use **Add GIF**, **Remove**, the URL fields and crop-position fields in the preview editor. In the posting code, edit or remove the `<img>` elements inside `chs-media`. An absent or empty image area collapses and releases its text space. To add a GIF to an image-free snippet, insert this before `chs-copy`:

```html
<div class="chs-media">
<img src="[url]" alt="Character GIF" style="object-position:50% 35%">
</div>
```

Images automatically share or stack within each design's media region. The editor supports additional images and an independent crop position for each one.

## Preview and copy

The standalone HTML includes all styles, all fifteen designs and the editor. GIFs are its only external visual assets. Choose one design, or **View all 15**, and edit the name, link, title/status, writing, time, message alignment and GIFs. Each design retains edits while the page is open. Download an edited `.txt` to keep it.

Light/dark/system modes, member-colour presets, three custom colour pickers and width controls affect only the preview. Copied snippets inherit forum colours and mode. **Copy JCink code** copies the complete block; if the clipboard is unavailable, it opens and selects the code for manual copying. **Download .txt** exports the current design.

The editor accepts paragraphs, line breaks, links and emphasis. Use the raw snippet for additional HTML your forum permits. The preview workflow follows the existing collections; the fifteen template layouts and decorative art are newly created for Cheese.

## Forum integration

The shared [cheese-fromagerie-v1.css](cheese-fromagerie-v1.css) is loaded by one stylesheet link per snippet. Links use the immutable GitHub revision recorded in [stylesheet-revision.txt](stylesheet-revision.txt), served through jsDelivr.

The collection inherits `--mgrgb1`, `--mgrgb2` and `--mgrgb3` as RGB triples. Missing secondary colours fall back to the first available member colour. The sample palette applies only when member variables are absent.

`html[color-mode="light"]` and `html[color-mode="dark"]` take precedence over the system preference. All template selectors are scoped to `.bh-cheese`; inner classes use `chs-`. Modern CSS includes grid, `:has()`, `color-mix()`, text clipping and masks. Fonts use local Palatino, Georgia, Verdana, Arial and Courier families with fallbacks. Decorations are CSS and embedded SVG, with no external font or icon dependencies.

## Maintenance

Run `node cheese/build.cjs` from the repository root to regenerate the snippets and standalone preview. `designs.json` is the catalogue; `cheese-model.js` supplies defaults and markup. The editor and exported defaults are generated from this same model.

Run `NODE_PATH=/path/to/node_modules node cheese/validate.cjs` with `jsdom` and `css-tree` installed. See [VALIDATION.md](VALIDATION.md) for the checks performed and their limits.
