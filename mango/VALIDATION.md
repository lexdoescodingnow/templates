# Mango validation

## Passed

- Exactly five threads, five comms and five buds, with fifteen unique design names and filenames.
- All fifteen editor defaults match their generated `.txt` files exactly.
- Every snippet has one complete `[dohtml]` block, one hosted stylesheet link, editable fields first, no scripts and no HTML comments.
- Posting CSS parses successfully, contains no comments and scopes all rules to `.bh-mango`.
- All fifteen designs support image removal and paired-image insertion; exported code omits the media element after the last image is removed.
- Both exact supplied GIF URLs are present in generated defaults.
- Plain and successively opened `<p>` messages parse into separate paragraphs.
- Editor conversion for `[b]`, `[i]` and `[u]`, forward/reverse gradient declarations, and visible underline rules.
- Received, sent and alternating message exports.
- Name, URL, title and writing edits; per-design state retention and reset.
- Clipboard and download handlers in a simulated DOM, with output matched to the edited code.
- Escaping of name/link fields and removal of unsupported active HTML from editor writing.
- Light/dark, member palette and width controls in the editor DOM; explicit forum mode precedence in CSS.
- All default bud replies are below 100 words.
- Git whitespace checks.

## Limits

The managed browser refused the local preview URL with `ERR_BLOCKED_BY_CLIENT`. Browser rendering, computed widths, visual light/dark contrast, image loading and live clipboard behaviour have not been verified. The checks above used Node, a CSS parser and a simulated DOM. A live JCink forum post was not available for testing.
