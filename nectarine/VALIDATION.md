# Nectarine validation

All 165 structural, CSS-parser and editor checks passed before publication. The same checks were rerun after the immutable stylesheet reference was inserted.

- Exactly five thread, five comms and five bud designs, with fifteen unique names and individual posting files.
- Each file matches the shared model and is wrapped in one `[dohtml]` block with one hosted stylesheet link.
- Editable name, URL, title, time, GIFs and writing precede decoration and the stylesheet link.
- No comments, hidden editing tips, scripts or inline style blocks in posting snippets; no comments in the posting stylesheet.
- All posting selectors are scoped to `.bh-nectarine`; CSS syntax parses successfully.
- Forward bold/underline and reverse italic gradient definitions are present, along with explicit forum-mode precedence over the system preference.
- Supplied GIF URLs are preserved exactly. Default counts vary from zero to two; additions, empty URLs, cropping, removal and reset work in the editor.
- Every design has an image-free grid rule, and exporting without images removes the media container.
- Default preview code equals each posting file. Preview-only sample names and titles do not replace placeholders in exported code.
- Independent edits persist when switching designs. Text escaping, BBCode conversion, message directions, copied-code fallback selection and downloaded-code contents were checked.
- Comms parse successive opening `<p>` tags as three separate messages. Bud defaults are below 100 words; longer text remains in the output and activates the word-count indicator.
- Member-colour controls and light/dark and width selectors update preview settings without embedding preview colours into posting snippets.

Checks use Node.js, `jsdom` and `css-tree`. With these packages available, run `node nectarine/validate.cjs` from the repository root. Rebuild generated snippets and the standalone editor with `node nectarine/build.cjs`.

The browser returned `ERR_BLOCKED_BY_CLIENT` for the local preview URL. Browser layout, overflow, visual contrast and external GIF/CDN loading were not verified by these parser and DOM checks. No live JCink post was made.
