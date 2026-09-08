# Ginger verification

## Passed

- Fifteen distinct named designs: five threads, five comms and five buds.
- Every posting snippet is enclosed in one `[dohtml]` block and contains one shared stylesheet link after the actual editable HTML.
- `[url]`, `[name]` and `[text]` appear first. Any time and GIF fields follow before the reply; decoration appears after the reply.
- Posting snippets contain no scripts, style blocks, IDs, HTML comments, hidden tips or instruction banners. Template CSS contains no comments.
- The supplied GIF URLs are preserved exactly. Default image counts are six image-free designs, six single-image designs and three paired-image designs.
- Model generation accepts zero or additional images. Zero images omit the media container entirely. CSS contains rules to hide empty containers and collapse dedicated portrait columns.
- Every comms snippet contains three plain paragraph messages. Parsing successive opening `<p>` tags without closing tags still produces three sibling message paragraphs.
- Every bud sample contains 36 words.
- Forward (1 → 2 → 3) bold/underline and reverse (3 → 2 → 1) italic gradients are present, including strong/em aliases.
- Inherited member-colour variables and explicit Blue Hour light/dark selectors are present. The system fallback excludes both explicit modes.
- Default snippet content agrees with the source model. Design data and the complete template CSS are embedded in the standalone preview.
- Name, title and link values are HTML-escaped by the model.
- JavaScript syntax checks pass for the model, editor and build script. CSS delimiters and quoted strings are balanced.

## Limits

The session's browser blocked local preview navigation with `net::ERR_BLOCKED_BY_CLIENT`. Browser rendering, computed styles, narrow-width appearance, clipboard interaction and editor click-through were therefore not visually or interactively verified. Source checks do not establish a flawless rendered layout.

No live JCink test post was submitted. External CSS and GIF availability depend on the user's network and forum permissions. The shared stylesheet revision is pinned in the posting files; publication integrity is checked against GitHub's file hashes separately.
