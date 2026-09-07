# Gâteau

Fifteen JCink templates inspired by the supplied Gâteau poster: fine patisserie borders, layered cake details, sculptural serif lettering and small champagne-metal accents. Member colours drive the headers, frames, borders and emphasis. Writing sits on neutral surfaces.

[Download and open the standalone HTML preview](gateau-collection-preview.html) · [Complete collection ZIP](gateau-collection.zip)

GitHub shows HTML source. Download the preview and open it in a browser to browse, edit and copy all fifteen designs. Its styles and editor are included in the single file; online GIFs and fonts load separately.

## Threads

| Design | Default GIFs | Composition |
| --- | ---: | --- |
| [Entremet d’Or](gateau-entremet-d-or-thread-01.txt) | 1 | A tiered celebration cake: a domed portrait, sweeping title, double icing border and fine pedestal finish. |
| [Marjolaine Muse](gateau-marjolaine-muse-thread-02.txt) | 2 | Two staggered patisserie display windows, offset member-colour frames and an angular literary page. |
| [Opéra Minuit](gateau-opera-minuit-thread-03.txt) | 0 | An image-free editorial page with oversized serif lettering, three delicate cake-layer rules and a generous drop cap. |
| [Millefeuille Memoir](gateau-millefeuille-memoir-thread-04.txt) | 1 | A wide portrait ribbon, vertical title spine and an open writing column between crisp pastry-layer edges. |
| [Saint-Honoré Serenade](gateau-saint-honore-serenade-thread-05.txt) | 0 | An image-free ceremonial page with a cake crest, fine double frame and a sweeping asymmetric corner. |

## Comms

| Design | Default GIFs | Composition |
| --- | ---: | --- |
| [Fondant Feed](gateau-fondant-feed-comms-01.txt) | 1 | A modern phone with a round contact portrait, fine piped header and member-coloured received messages. |
| [Praline Line](gateau-praline-line-comms-02.txt) | 1 | An open foldable handset with a contact pane, portrait and a separate conversation screen. |
| [Icing Inbox](gateau-icing-inbox-comms-03.txt) | 0 | An image-free cover display with twin camera rings and small incoming-message cards. |
| [Ganache Connect](gateau-ganache-connect-comms-04.txt) | 1 | A desktop messenger window with a portrait rail, coloured window controls and a full conversation pane. |
| [Choux Chat](gateau-choux-chat-comms-05.txt) | 0 | An image-free wrist messenger with a ribbed strap, rounded metal case and compact message bubbles. |

## Buds

| Design | Default GIFs | Composition |
| --- | ---: | --- |
| [Sugar Petal](gateau-sugar-petal-bud-01.txt) | 0 | An open miniature reply with an embossed confection seal and italic heading. |
| [Crème Fleck](gateau-creme-fleck-bud-02.txt) | 1 | A curved portrait sliver beside a petite reply, finished with a cake-slice engraving. |
| [Petit Four](gateau-petit-four-bud-03.txt) | 0 | An image-free miniature confection box with inset coloured layers and centred writing. |
| [Pearl Crumb](gateau-pearl-crumb-bud-04.txt) | 1 | A pearl-piped note with a small teardrop portrait and a delicate signature flourish. |
| [Sugar Envoi](gateau-sugar-envoi-bud-05.txt) | 0 | An image-free reply slip with three stacked member-colour strips and a restrained patisserie sign-off. |

## Copy and edit

Open any named `.txt` file, choose GitHub’s **Copy raw file**, then paste the complete `[dohtml]` block into your forum post. All editable names, links, titles/status text, times, GIFs and writing appear above decorative markup and the stylesheet link. Templates contain no comments, editing notes or hidden tips.

`[url]` is the linked character or thread URL; `[name]` is its displayed name; `[text]` is your thread title or comms status. The placeholder prose uses ordinary `<p>` paragraphs. Comms accept successive opening `<p>` tags without requiring closing tags, classes or a div for every message. Use `data-direction="received"`, `"sent"` or `"mixed"` for message alignment. Device clocks, camera rings, composer bars and straps are decorative.

Inside `[dohtml]`, use `<b>`, `<i>` and `<u>` (or `<strong>` and `<em>`). The preview editor also converts `[b]`, `[i]` and `[u]` to their HTML equivalents. Bold and underline use group colours 1 → 2 → 3; italic uses 3 → 2 → 1.

GIFs are optional. Remove an unused `<img>` tag or clear its URL in the editor. An empty media container collapses, and portrait columns reflow in the designs that need it. Add ordinary images in a `gt-media` container, or use **Add GIF** in the editor. There is no fixed two-GIF requirement. Adjust `object-position` on the image to change its crop. Buds begin with fewer than 100 words and keep longer replies visible.

The editor supports plain paragraphs, basic formatting, links and blockquotes. Per-design edits remain while the page is open; switching designs does not discard them. It provides palette samples, three colour pickers, light/dark/system mode, forum/narrow widths, GIF editing, copy and download. Untouched placeholders use sample labels in the visual preview. Preview palette choices are not embedded in forum snippets. Download the edited snippet to keep your changes after closing the page.

## Forum integration

Each snippet loads [gateau-collection-v1.css](https://cdn.jsdelivr.net/gh/lexdoescodingnow/templates@main/gateau/gateau-collection-v1.css) from this repository. It contains no JavaScript and needs no additional HTML loader. The forum must allow external stylesheet links inside `[dohtml]`.

The inherited RGB triples `--mgrgb1`, `--mgrgb2`, and `--mgrgb3` drive the design. Dark mode lightens those hues for clearer text and frame contrast. Fallback colours only apply when those variables are absent. Explicit Blue Hour `html[color-mode="light"]` and `html[color-mode="dark"]` modes override the system-preference fallback. Scoped CSS prevents the collection from restyling unrelated forum content.

The ornaments are original inline SVG line drawings; no external image assets are required for the cake, petal or slice details. Cormorant Garamond and DM Sans fall back to Georgia and Arial. The optional fonts, hosted CSS and placeholder GIFs require internet access. Image-free reflow uses modern CSS `:has()` support.

See [VALIDATION.md](VALIDATION.md) for the checks and verification limits.
