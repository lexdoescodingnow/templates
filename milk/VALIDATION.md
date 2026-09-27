# Milk validation

Checked 27 September 2026.

- Exactly 15 replacement designs: five threads, five comms, five buds. The catalogue remains at 860 designs, with 845 other design records unchanged. All public names are unique across the catalogue.
- All 15 source snippets exactly match the editor model. They retain the original filenames, supplied GIF URLs and default GIF counts, with Freddie & Ollie and readable sample headings prefilled.
- Every snippet contains one `[dohtml]` block and one direct `@main/milk/milk-bottlelight-standalone-v1.css` link, with editable content before decoration and styling. No comments or hidden instructions occur in posting HTML or CSS.
- The standalone stylesheet includes all font-face and layout declarations without imports. Milk rules parse successfully with tinycss2 and cssselect2. JavaScript syntax checks pass.
- Static CSS selector/cascade comparison checks all 15 designs with their default images and with media removed, alongside the legacy Italian stylesheet in both load orders. No differing non-pseudo-element declarations remain. Milk decorations use new `mk2` classes. This is a source-level compatibility check, not browser layout rendering.
- Comms parse as three separate messages with successive opening `<p>` tags. All bud defaults remain under 100 words. Removing images in the model removes the media container.
- Generated forum examples retain full sample writing; copyable writing uses `[TEXT GOES HERE]` / `[MESSAGE GOES HERE]`. The Milk masterpost, numbered part and preview replace Italian Cuisine in the active index. Their old addresses serve identical Milk copies.
- The two editor preview addresses contain identical current markup, data, scripts and standalone CSS. The complete forum ZIP is regenerated from current files.

## Limitations

The Cloud Browser blocked local HTTP and file preview access. No visual browser rendering, live editor interaction test or authenticated JCink post was completed in this session. Remote GIFs and fonts depend on their hosts, and forum skins may add styling. Source and publication verification do not establish pixel-level rendering on the live forum.
