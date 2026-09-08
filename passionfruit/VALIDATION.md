# Passionfruit validation

Checked on 8 September 2026.

- Fifteen individual posting snippets: five threads, five comms and five buds, with fifteen unique names.
- Every snippet has one complete `[dohtml]` block and one pinned stylesheet link. No forum JavaScript is included.
- `[url]`, `[name]` and `[text]` precede prose, decoration and the stylesheet. Supplied GIF URLs are preserved exactly.
- Seven image-free defaults, seven single-image defaults and one two-image default. Bud sample text is under 100 words.
- All snippets and the standalone preview passed balanced-HTML checks. Shared CSS passed delimiter and comment-exclusion checks. Posting snippets contain no comments or hidden instructions.
- Model, builder and editor JavaScript passed Node syntax checks. All snippets and the preview are generated from the same design definitions and markup function.
- The pinned jsDelivr stylesheet returned HTTP 200 with `text/css; charset=utf-8`. The served 33,406-byte file matched the local CSS byte for byte; SHA-256: `3fd6579acc1b47dead61cb16a5a63c71bfdd2a8e4fd15f86ae782e34fe187c8e`.
- Source inspection confirms forward bold/underline gradients, reverse italic gradients, inherited member RGB variables, explicit Blue Hour light/dark selectors with a system fallback, and optional-media reflow rules.

## Limits

The browser blocked local HTTP and local-file preview URLs. No browser screenshots, visual layout checks or interactive copy/edit checks were completed. Responsive rules, editor behaviour, web-font loading and GIF rendering have not been verified visually. No live JCink post was submitted or tested. The standalone preview includes its CSS and editor; only the short `.txt` snippets belong in forum posts.
