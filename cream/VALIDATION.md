# Cream verification

## Completed checks

- Exactly five thread, five comms and five bud designs, with fifteen unique names and separate posting files.
- Each posting file has one `[dohtml]` block and one stylesheet link, placed after the editable HTML.
- `[url]`, `[name]` and `[text]` are the first editable fields. Supplied GIFs and lorem ipsum match the model defaults.
- Posting HTML and shared CSS contain no comments, hidden editing tips, instruction blocks or template scripts.
- All fifteen snippets parse as HTML fragments. Each writing area includes bold, italic and underline samples.
- All five comms preserve three sibling message paragraphs when individual closing `</p>` tags are omitted.
- Every bud starts with 36 words.
- Model generation accepts zero, one, two and three GIFs for every design; zero images omit the media block. Template CSS includes empty-media collapse rules and removal of portrait columns where needed.
- Name values containing angle brackets and ampersands are escaped correctly.
- Shared CSS has balanced rule and function delimiters, wrapper-scoped template rules, separate named layout rules, forward and reverse emphasis gradients, explicit forum mode selectors and a system-preference fallback that excludes explicit modes.
- Model, build script, editor and embedded preview JavaScript pass Node syntax checks.
- The standalone preview has fifteen design buttons, unique element IDs, embedded CSS and embedded JavaScript. It requires no separate local asset files; the supplied remote GIFs require a connection.
- README snippet links point to existing local posting files. All posting stylesheet URLs use the same immutable revision recorded in `stylesheet-revision.txt`.

## Limits

These checks cover generated source and HTML structure. Browser rendering, editor interaction, responsive appearance and a live JCink post have not been tested. The forum's own permissions and handling of `[dohtml]` and BBCode still apply. The editor converts basic formatting BBCode into HTML; raw posting files use HTML formatting directly.

The provided Tumblr GIF URLs are preserved exactly. Their availability and cropping have not been independently confirmed.
