# Clementine Softlight validation

Completed on 8 September 2026.

- Fifteen unique designs: five thread, five comms, five bud.
- All fifteen default editor outputs match their individual posting files exactly.
- Forty-five zero/one/two-GIF editing states preserve prose, output the chosen image count and omit empty media wrappers.
- All snippets preserve top-positioned [url], [name] and [text] placeholders, supplied GIFs, lorem ipsum and one stylesheet link inside [dohtml].
- Every default has bold, italic and underlined text. Bud defaults are below 100 words.
- Successive opening paragraph tags form separate comms messages; BBCode emphasis converts to HTML in the editor.
- Editing, per-design state retention, direction selection, gallery creation and five-of-type filtering pass DOM-based checks.
- Light/dark/system attributes, width controls and colour-picker isolation pass generated-document checks.
- CSS parses successfully; snippets and shared CSS contain no comments or instruction blocks.
- Earlier Clementine posting files, CSS and preview remain unchanged for the later Tangerine migration.

These checks use HTML/CSS parsers and a DOM simulation, which does not calculate layout. The Cloud Browser security policy blocked local-file previews, so screenshots, rendered dimensions, visual font/GIF loading and live Blue Hour posting were not verified. Responsive rules and explicit forum-mode precedence are present in the stylesheet; they are not a claim of visual browser testing.
