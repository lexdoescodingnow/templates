# Praline validation

Checked 10 September 2026.

- All fifteen designs are present, with five threads, five comms and five buds, unique names and the established `praline-name-type-01.txt` filename pattern.
- Posting files match their generated editor defaults exactly, retain top-of-snippet `[url]`, `[name]` and `[text]` fields, and include one stylesheet link inside their `[dohtml]` wrappers.
- The scoped stylesheet parses without errors. Posting HTML and CSS have no comments, hidden tips, instruction blocks or scripts.
- DOM checks cover the supplied image URLs, default image counts, zero through three images, and absence of empty exported image containers.
- All five comms correctly parse successive opening `<p>` tags into separate messages. Bud defaults contain 36 words.
- Editor checks cover all fifteen designs: selecting, editing, escaping names and titles, converting `[b]`, `[i]` and `[u]`, removing all GIFs, adding a GIF, changing its crop, and exporting the resulting code.
- Checks also cover retained edits, reset, message direction, theme controls, preview width and member-colour controls. Preview palette values do not leak into exported code. No editor script errors were reported.
- Both supplied Tumblr GIF URLs returned HTTP 200 with the `image/gif` content type.
- The GitHub files and pinned CDN stylesheet are verified after publication.

The DOM and CSS checks do not establish visual layout quality. The preview browser blocked the local preview URL with `ERR_BLOCKED_BY_CLIENT`; no rendered desktop/mobile screenshots or computed layout checks were available. Clipboard and file-download interactions were not exercised in a real browser. No test post was made on the live JCink forum.
