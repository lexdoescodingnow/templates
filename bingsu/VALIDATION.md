# Bingsu Thaw validation

Source checks completed on 8 September 2026.

- Exactly 15 unique new design names, with five threads, five comms and five buds. Names were checked against the repository's existing snippets and design indexes.
- Every individual posting file has one complete `[dohtml]` block, one external stylesheet link and actual HTML content. The URL, name and title/status precede GIFs, writing, decorations and the stylesheet link.
- No HTML/CSS comments, hidden editing tips, inline scripts or repeated per-message classes appear in the posting templates.
- All 15 contain bold, italic and underline sample markup. CSS defines forward and reverse member gradients, neutral content surfaces and explicit forum-mode precedence over system mode.
- All five comms retain three separate paragraphs when parsed with successive opening `<p>` tags and omitted closing tags. Device controls are decorative.
- GIF counts match the design index and editor defaults: seven image-free designs, seven with one GIF and one with two. Both supplied URLs returned HTTP 200 with `image/gif` content and GIF89a signatures.
- Every bud contains a 43-word initial reply.
- Builder, model, editor and the final preview's inline JavaScript pass Node syntax checks. The preview embeds its own template CSS, interface CSS and editor code. All 15 named choices, gallery controls, editing fields, copy/download actions, palette controls and mode options are present.
- Empty-media removal, optional GIF addition, narrow-width rules and non-clipping copy layouts were checked in the source. No global IDs or scripts are introduced into forum posts.

## Limits

The available browser blocked both local HTTP preview access and the documented shared-file route. No alternative browser or execution route was used to evade that restriction. Visual layout, actual clipboard/download interactions, live rendering of responsive CSS and a live JCink post therefore remain unverified. Theme and layout checks above refer to source inspection, not browser execution.

The forum must permit external stylesheets in `[dohtml]`. Network access is required for the shared CSS, Tumblr GIFs and optional Google Fonts. Local font fallbacks are included.
