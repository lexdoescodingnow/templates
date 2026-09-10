# Macadamia validation

## Completed source checks

- Fifteen distinct names and files: five threads, five comms and five buds.
- All generated snippets match the shared model and defaults.
- Every snippet has one complete `[dohtml]` block, one hosted CSS link and editable name, URL and title fields at the top.
- Template HTML and CSS contain no comments, hidden instructions, editing tips or executable scripts.
- Expected image counts match the design manifest. Image-free exports omit the media container. Both supplied placeholder GIF URLs remain unchanged.
- HTML parsing confirms one writing container per design, ordinary paragraphs and three separate messages when closing paragraph tags are omitted.
- Bud placeholder replies contain 36 words.
- JavaScript source and embedded editor script pass syntax checks. All fifteen selector buttons and both embedded source replacements are present.
- CSS delimiters are balanced. Source includes inherited member RGB variables, forward bold/underline colours, reversed italic colours, explicit Blue Hour modes, and a system fallback that excludes explicit modes.
- Source includes received/sent/alternating message alignment, image-removal expansion, narrow-container adjustments, crop controls and complete copy/download output.

## Verification limits

The available browser blocked local HTTP and file URLs. No rendered screenshots, viewport measurements, clipboard interaction tests, external GIF playback tests or live JCink posting tests were completed. CSS source checks are not proof of rendered layout or browser compatibility.

## Publishing

The stylesheet is pinned to the immutable revision in `stylesheet-revision.txt`. The collection index links the fifteen posting snippets and standalone editor. Older Macadamia posting files and styles are retained.
