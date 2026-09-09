# Oats validation

## Passed

- JavaScript syntax checks for the model, builder and editor.
- CSS syntax parsing and declaration grammar validation with css-tree.
- Fifteen distinct names and filenames: five threads, five comms and five buds.
- Every generated posting file matches the shared markup model and includes one complete `[dohtml]` block and one stylesheet link.
- Editable URL, name and title placeholders precede the writing, decorative markup and stylesheet link.
- Posting snippets and shared CSS contain no comments or editing notes; posting snippets contain no scripts or IDs.
- HTML parsing with jsdom (scripts disabled) confirmed valid component structure, image counts and bold, italic and underline markup.
- Each comms template correctly parses successive opening `<p>` tags as three separate message paragraphs.
- All fifteen models accept zero, one, two and three images. Zero images omit the media container.
- Names and titles escape HTML special characters; unsafe name-link schemes are rejected.
- All buds begin with 36 words.
- Preview contains all fifteen design controls, the same stylesheet and the configured posting stylesheet URL.
- Source inspection confirms forward bold/underline and reverse italic gradients, inherited member-colour variables and explicit forum-mode precedence over the system fallback.

## Limits

The cloud preview browser blocked both the local server URL and local file URL. Visual layout, narrow-width appearance, live editor controls and clipboard behaviour were therefore not tested in a browser. The HTML parser was used only for static parsing, with scripts disabled.

A live JCink post was not made. Forum-specific filtering, CSS conflicts and BBCode behaviour remain dependent on the target board. The templates use HTML emphasis tags; the separate editor converts basic emphasis BBCode when generating code.

Both supplied Tumblr URLs returned HTTP 200 with image/gif content during validation. Publication and stylesheet availability are checked separately after pushing.
