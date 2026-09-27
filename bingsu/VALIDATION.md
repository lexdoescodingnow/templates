# Bingsu Thaw validation

## Forum stylesheet loader · 27 September 2026

The reported Crystal Veil screenshot displays unstyled HTML: original-size GIFs, ordinary forum typography and no frame. The exact pinned stylesheet URL returned HTTP 200 with `text/css` and matched the local stylesheet byte for byte. The live topic returned a permission message, so the precise forum-side cause could not be inspected.

The 15 Thaw snippets, builder and editor exports now use a `<style>` element containing one `@import` rule, replacing the `<link>` loader. This addresses post parsers that remove link elements while retaining styles. The stylesheet, design markup, GIF URLs, member-colour rules and light/dark rules are unchanged. A separate style-only repair block loads the same stylesheet once for an existing masterpost.

Verified that all 15 canonical snippets and generated forum masterposts differ only in the loader, that every preview remains paired with its matching copy block, and that the imported URL resolves to the same shared CSS. JavaScript syntax and editor exports were checked. Refreshed the collection ZIP, repository package and complete forum-post pack. Legacy Bingsu files remain unchanged. Rendering on the member-only topic has not been verified; reposting or adding the repair block requires the forum member’s access.

## Original source checks

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
