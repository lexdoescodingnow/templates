# Cherry verification

## Completed checks

- Exactly fifteen unique named designs: five threads, five comms and five buds.
- Every snippet contains one `[dohtml]` block and one stylesheet link after the editable content.
- `[url]`, `[name]` and `[text]` appear before GIFs, writing and decoration.
- Posting HTML and shared CSS contain no comments, hidden editing notes or template scripts.
- All fifteen snippets parse as HTML fragments, with a single writing area and bold, italic and underline examples.
- All five comms retain three sibling message paragraphs with individual closing `</p>` tags omitted.
- All five buds start with 36 words.
- All fifteen model variants support zero, one, two and three GIFs; zero GIFs omit the media block. Names containing angle brackets and ampersands are escaped.
- Default GIF distribution: seven image-free designs, four single-image designs and four paired-image designs.
- Both supplied Tumblr GIF URLs returned HTTP 200 with image/gif content type on 9 September 2026.
- CSS delimiter balance, named layout selectors, wrapper scoping, theme selectors and forward/reverse gradient definitions were checked.
- Explicit forum modes are excluded from the system-dark fallback.
- Model, editor, build script and preview's embedded script pass Node syntax checks.
- Preview contains fifteen design buttons and unique element IDs. CSS and editor code are embedded for local use.
- Posting snippets use the same immutable CSS revision recorded in stylesheet-revision.txt.

- The pinned jsDelivr stylesheet returned HTTP 200 with text/css content type and matched the source file byte-for-byte.

## Limits

The browser security policy blocked opening the local preview, so rendered appearance, responsive layout and editor interaction have not been visually tested. A live JCink post has not been tested. The source checks confirm structure and intended rules; they do not establish browser or forum rendering.

Raw posting snippets use HTML emphasis. The editor converts basic formatting BBCode to HTML. Forum permissions and parsing determine how raw BBCode behaves inside dohtml.
