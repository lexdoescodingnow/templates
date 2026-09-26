# Forum template sweep · 21 September 2026

860 distinct supported posting designs across 54 themed collections, drawn from the current `lexdoescodingnow/templates` repository. Duplicate aggregate copies were removed from the catalogue; distinct sent/received versions, newer collections and older supported layouts were retained. Bread has 42 designs, Clementine and Oats have 30 each, and Bingsu, Macadamia and Sake have 26 each. The manifest records every source file and block, plus duplicate aliases.

## Posting format

Every design has its rendered template followed immediately by its native `[code]` box. The copied block includes its original hosted stylesheet loader and complete `[dohtml]` wrapper. Descriptions and instructions stay outside copied code. Older image placeholders receive example media only in the preview; the editable code retains its placeholders.

There are 54 collection masterposts, 61 numbered post parts below 45,000 characters, one combined archive text file, and a searchable browser index. Post parts never split a template or code box. Browser previews have working Copy buttons and a manual-selection fallback. Forum click-to-copy uses the board skin's native code controls; it is not supplied by the template itself.

## Repairs

- **Clementine, original collection:** repaired a split Google Fonts import that corrupted stylesheet parsing and left colour variables missing. The error made formatted text invisible in the comms and buds. Added a fresh `clementine-media-v3.css` entry point, repaired the older entry point, and updated associated snippets and preview.
- **Bingsu, older collection:** added forward bold/underline gradients and reversed italic gradients; restored editable names and text fields; changed comms messages to ordinary paragraphs while keeping compatible styling for the older markup. Removed references to custom font files absent from the repository, retaining the existing fallback fonts.
- **Macadamia, older collection:** converted literal formatting BBCode inside HTML blocks into HTML tags; changed comms messages to plain paragraphs and retained support for the earlier message containers.
- **Sake, older collection:** made explicit forum light/dark mode override the operating-system preference for threads; adjusted message bubble tails to avoid overflow. Fresh stylesheet entry points are included.
- **Petal:** replaced hard-coded sample palette overrides with inherited member colours; added forward/reversed formatting gradients and neutral light/dark surfaces following the forum mode. Restored reusable name, text and image placeholders.
- **Bread, older comms:** put editable message text inside ordinary paragraphs. Both sent and received versions are included separately.
- **Lavender and Traitors:** removed editing instructions from the copied HTML. Removed Lavender's fixed example member-group class so the surrounding member palette can inherit normally.
- **FaceTime:** restored reusable name, text and image fields. Its optional reaction script remains in the posting snippet; the static browser catalogue does not run that script.
- Moved stylesheet loaders below editable HTML in older snippets. Corrected the masterpost instructions to explain their hosted stylesheet dependency.
- Two historical root files, `petal-instagram.css` and `twig-facetime.css`, contained full demo HTML despite their CSS extensions. Their complete demos are preserved in matching `*-legacy-demo.html` files; the `.css` files now contain valid stylesheets. They are historical assets outside the 860 supported posting snippets.

## Verification

- Rendered all 860 supported snippets at 900px and 320px in explicit light and dark mode, with the opposing operating-system preference: 3,440 layout checks.
- Checked body text formatting gradients, including `strong` and `em`, and reversed italic colour order.
- Parsed every repository CSS file for syntax errors after repair.
- Verified all 860 preview/code pairs, balanced forum wrappers and code boxes, and complete section boundaries in all 61 numbered parts.
- Tested catalogue search, copying individual template code and copying a complete forum masterpost. Copied content matched its source exactly; no browser script errors occurred.
- Visually inspected the collection index and repaired Clementine preview.

Layout checks used locally available stylesheet content, including historical Git revisions referenced by CSS imports. External media and optional fonts were blocked during those deterministic layout checks. A separate HEAD-request sweep successfully reached all 116 unique media URLs used by the supported snippets; their long-term availability remains controlled by their hosts. Actual posting on the live forum and that skin's native code-copy controls were not exercised.

## Rebuilding

Run `python3 tools/build_forum_posts.py` from the repository root after updating canonical snippets. The inventory reads all supported `.txt` snippets and the four Traitors HTML snippets, retains distinct structural variants, and deduplicates aggregate copies. The browser previews embed their styling; forum posts retain short hosted stylesheet loaders.
