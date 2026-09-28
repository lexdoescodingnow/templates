# Strawberry · Field Notes

Fifteen designs for Jaehoon & Jinseok: five threads, five device comms and five compact buds. They retain Strawberry as exes; the collection uses neutral wording and botanical details.

[Open the editable preview](https://raw.githack.com/lexdoescodingnow/templates/6ce739406213d4b9db2b88cb12f81f069ad1b411/strawberry/strawberry-collection-preview.html) · [Download the preview](https://github.com/lexdoescodingnow/templates/raw/refs/heads/main/strawberry/strawberry-collection-preview.html) · [Forum masterpost](../forum-posts/strawberry-forum-masterpost.txt) · [Complete download](strawberry-collection.zip)

Previews appear above complete copyable code. Download the HTML preview and open it in a browser, or use **Copy raw file** on each GitHub snippet.

## Threads

| Design | GIFs | Layout |
| --- | ---: | --- |
| [Achene Archive](strawberry-achene-archive-thread-01.txt) | 1 | Arched portrait and specimen index |
| [Runner Index](strawberry-runner-index-thread-02.txt) | 2 | Vertical spine and staggered photo register |
| [Punnet Proof](strawberry-punnet-proof-thread-03.txt) | 2 | Produce label with gridded photo tray |
| [Calyx Cut](strawberry-calyx-cut-thread-04.txt) | 1 | Tilted petal portrait and italic title |
| [Vesca Folio](strawberry-vesca-folio-thread-05.txt) | 0 | Writing-led folio with botanical margin |

## Comms

| Design | GIFs | Device |
| --- | ---: | --- |
| [Seedwave](strawberry-seedwave-comms-01.txt) | 1 | Rounded smartphone |
| [Runner Relay](strawberry-runner-relay-comms-02.txt) | 1 | Split-screen messenger |
| [Punnet Pager](strawberry-punnet-pager-comms-03.txt) | 0 | Compact text pager |
| [Calyx Console](strawberry-calyx-console-comms-04.txt) | 1 | Desktop messaging window |
| [Fragaria Flip](strawberry-fragaria-flip-comms-05.txt) | 2 | Clamshell phone |

## Buds

| Design | GIFs | Layout |
| --- | ---: | --- |
| [Achene Note](strawberry-achene-note-bud-01.txt) | 1 | Small portrait bookmark |
| [Sepal Slip](strawberry-sepal-slip-bud-02.txt) | 0 | Perforated field slip |
| [Fieldlet](strawberry-fieldlet-bud-03.txt) | 2 | Twin-photo miniature |
| [Vesca Margin](strawberry-vesca-margin-bud-04.txt) | 1 | Photo-stamp footnote |
| [Runner Mark](strawberry-runner-mark-bud-05.txt) | 0 | Compact runner label |

## Editing

The snippets retain literal `[url]`, `[name]` and `[text]` fields at the top, followed by the supplied Tumblr GIFs and lorem ipsum. The preview renders Jaehoon & Jinseok and sample titles in their place. **Copy template** retains the fields; **Copy with sample names** substitutes the displayed names and title. Changing editor fields updates the preview and exported code.

The single shared stylesheet link sits at the bottom of each `[dohtml]` block. No comments, hidden instructions or tips are embedded in template HTML or CSS.

Inside the HTML blocks, `<b>` / `<strong>`, `<i>` / `<em>` and `<u>` carry the member gradients. The editor also accepts `[b]`, `[i]` and `[u]` and converts them to HTML when copying. Direct BBCode parsing inside `[dohtml]` depends on the forum skin. Bold and underline run group 1 → 2 → 3; italics reverse that gradient.

Frames, headings, borders and device accents inherit the forum's `--mgrgb1`, `--mgrgb2`, `--mgrgb3` RGB variables. Preview palettes are not exported. Small botanical drawings use a muted strawberry accent. Neutral backgrounds follow `html[color-mode="light"]` and `html[color-mode="dark"]`, with system preference as a fallback only when the forum does not specify a mode.

Comms use ordinary `<p>` messages. Successive opening `<p>` tags also work without closing tags. `data-direction` accepts `received`, `sent` or `alternating`. Device controls are decorative. Buds have short sample replies and encourage approximately 100 words or fewer; longer text remains visible.

Clear a GIF URL to remove its image, or add one to an image-free design. For hand edits, remove the corresponding `sb-shot` span; empty media areas collapse. Adjust `--sb-crop` to reposition the image within its frame. GIFs use fixed proportions without stretching.

The preview embeds its CSS and editor script, and works when downloaded. GIFs load online. Posted templates require no JavaScript and load one import-free stylesheet using system serif, sans-serif and monospace fonts. Layouts use modern container queries, `:has()` and `color-mix()`.

## Rebuilding

Run `node strawberry/build.cjs`, `python tools/build_forum_posts.py`, then `python strawberry/package.py`. `designs.json` supplies the unique names. Strawberry's presentation override preserves the explicitly requested placeholders and lorem ipsum in forum copy boxes while showing named examples.

## Forum-ready collection

[Preview-above-code forum masterpost](../forum-posts/strawberry-forum-masterpost.txt) · [Downloadable browser preview with Copy buttons](../forum-posts/strawberry-preview.html) · [All collections and numbered post parts](../forum-posts/README.md).
