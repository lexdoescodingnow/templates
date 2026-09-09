# Nuts · Minharu & Taesung

Fifteen coordinated JCink templates: five threads, five device comms and five miniature buds. Shell curves, an original walnut engraving, almond silhouettes and small botanical details connect the collection. Member colours drive the headers, frames, borders and text accents; writing surfaces remain neutral.

[Download the preview and editor](https://github.com/lexdoescodingnow/templates/raw/refs/heads/main/nuts/nuts-collection-preview.html)

Open a named `.txt` file below, use **Copy raw file** on GitHub, and paste the complete block into your post. The `[dohtml]` tags and hosted stylesheet link are already included.

Download the HTML preview and open it in your browser to select and edit all 15 designs. It includes the CSS and editor; the placeholder GIFs load from Tumblr. GitHub itself displays the HTML source.

## Threads

| Design | Starting GIFs | Layout |
| --- | ---: | --- |
| [Split Shell](nuts-split-shell-thread-01.txt) | 2 | Two facing shell portraits, a bowed double frame and a generous centred reading column. |
| [Pistachio Study](nuts-pistachio-study-thread-02.txt) | 1 | An asymmetric specimen page with an almond-shaped portrait, a tall side rule and a sweeping serif heading. |
| [Walnut Intaglio](nuts-walnut-intaglio-thread-03.txt) | 0 | An engraved walnut line drawing on an open literary page, with nested contour borders and a quiet inset text column. |
| [Hazel Cabinet](nuts-hazel-cabinet-thread-04.txt) | 2 | A cabinet of paired arched portraits beneath a tabbed heading, followed by a broad writing drawer and inlaid handles. |
| [Cashew Current](nuts-cashew-current-thread-05.txt) | 1 | A rounded horizontal portrait and an offset heading follow a fine cashew curve down an open page. |

## Comms

| Design | Starting GIFs | Layout |
| --- | ---: | --- |
| [Kernel Call](nuts-kernel-call-comms-01.txt) | 1 | A softly ribbed smartphone with a circular contact portrait, pill camera and roomy incoming message bubbles. |
| [Shell Flip](nuts-shell-flip-comms-02.txt) | 1 | A vertical clamshell handset with a portrait cover screen, coloured hinge, separate message screen and tactile keypad. |
| [Grove Link](nuts-grove-link-comms-03.txt) | 2 | A landscape handheld messenger with twin contact capsules, recessed chat screen and side-mounted circular controls. |
| [Peanote](nuts-peanote-comms-04.txt) | 0 | A compact wide pager with a segmented time display, LCD-like conversation pane and three oval hardware keys. |
| [Cob OS](nuts-cob-os-comms-05.txt) | 1 | A narrow smartphone with a curved wallpaper strip, round contact portrait, outlined chat bubbles and a low home bar. |

## Buds

| Design | Starting GIFs | Layout |
| --- | ---: | --- |
| [Nutlet](nuts-nutlet-bud-01.txt) | 0 | A small tapered note with an almond seal, a left inset title and a curved coloured foot. |
| [Almond Kiss](nuts-almond-kiss-bud-02.txt) | 1 | An almond-cut portrait beside a short serif title and a compact reply with a delicate horizontal rule. |
| [Twin Kernels](nuts-twin-kernels-bud-03.txt) | 2 | Two overlapping oval portraits sit on a single slender capsule above a centred miniature reply. |
| [Cupule](nuts-cupule-bud-04.txt) | 0 | A small bowl-shaped note with layered curved borders, tiny nut scoring and a right-aligned signature. |
| [Bract](nuts-bract-bud-05.txt) | 1 | An off-centre portrait tab sits inside a botanical bracket beside a brief reply and a narrow vertical heading. |

## Editing

The linked `[name]`, its `[url]`, and the title or contact status `[text]` appear at the top. Time and GIF URLs follow where used. Replace the lorem ipsum inside `nts-copy` with your writing. The stylesheet link is last. There are no comments, hidden tips, or editing instructions inside the posting HTML or CSS.

The preview displays **Minharu & Taesung** and sample titles until you replace the placeholders. Copied code retains the field values. Each design keeps its edits while the page stays open. **Copy code** and **Download .txt** export the selected design with your edits. The width control offers Fit, 320 px and 550 px; colour pickers and the light/dark selector affect the preview only.

Use ordinary `<p>` paragraphs for writing and separate comms messages. Successive opening `<p>` tags work without closing each one. `data-flow="received"`, `"sent"`, or `"alternate"` sets message direction. Device buttons are decorative. Buds start with 36 words and are designed for replies of 100 words or fewer; longer writing is not clipped.

The editor accepts `[b]`, `[i]`, and `[u]` and converts them to HTML. Direct `[dohtml]` snippets use `<b>`, `<i>`, and `<u>`; `<strong>` and `<em>` also work. Bold and underline use member colours **1 → 2 → 3**; italic text uses **3 → 2 → 1**. These are gradients in the lettering itself.

## Images and themes

The starting image counts are choices for each composition. Add, remove, or clear images in the editor; its exported code contains only nonempty GIFs. In a raw snippet, remove an unwanted `<img>` tag. If you remove all images, you can remove the empty `nts-media` element as well. Empty image containers are hidden and image-dependent columns collapse.

Both user-supplied Tumblr URLs are preserved exactly and returned HTTP 200 with `image/gif` content types during verification. The CSS includes an original walnut line drawing; the other small shell motifs use CSS geometry. No external font or icon library is required.

Inherited `--mgrgb1`, `--mgrgb2`, and `--mgrgb3` RGB values set the member palette. Keep the snippet inside the forum's member-colour scope. Text colours mix these member hues towards the neutral text colour for legibility. The preview does not bake its sample colours into the posting code.

Blue Hour's `html[color-mode="light"]` and `html[color-mode="dark"]` determine the neutral surfaces. An explicit forum mode overrides the system dark-mode fallback. All forum styling is scoped to `.bh-nuts`.

## Repository integration

Every snippet includes one jsDelivr stylesheet link pinned to the immutable GitHub revision in [stylesheet-revision.txt](stylesheet-revision.txt). Posts need no JavaScript or board-wide stylesheet changes.

Run `node nuts/build.cjs` from the repository root to regenerate all snippets and the standalone preview. `designs.json` defines the catalogue, `nuts-model.js` produces posting markup, and `nuts-editor.js` powers the preview controls.

See [VALIDATION.md](VALIDATION.md) for checks and limitations. The browser security policy blocked access to the local preview, so visual rendering and live JCink posting remain unverified.
