# Espresso release checks

Checked on 7 September 2026.

| Check | Result |
| --- | --- |
| Five threads, five comms and five buds, with fifteen distinct names | Passed |
| Fifteen default editor outputs match their individual posting files byte for byte | Passed |
| `[dohtml]` wrappers, one hosted stylesheet link, and editable fields before decoration | Passed |
| No comments, hidden tips or scripts in posting snippets; no comments in template CSS | Passed |
| Zero, one, two and three GIFs across every design, in editor and copied HTML | 60 states passed |
| Each design retains its edited fields while switching designs in the current tab | 15 checks passed |
| Plain `<p>` messages, including omitted closing tags, and received/sent/mixed output | All five comms passed |
| Bold and underline use the forward member gradient; italics use the reverse gradient | Passed |
| Member variables remain inherited; preview palettes stay out of posting code | Passed |
| Explicit light/dark and system theme controls | Passed |
| Empty image containers containing whitespace are hidden by the stylesheet | Passed in DOM style checks |
| Bud placeholder replies stay below 100 words; CSS imposes no text height limit | Passed |
| BBCode conversion, HTML escaping, unsupported-markup removal and safe editor URLs | Passed |
| Clipboard-unavailable fallback selects the complete posting block | Passed |
| Template stylesheet and preview stylesheet syntax | Parsed successfully; 214 template rules |
| JavaScript syntax | Passed |
| Both supplied Tumblr GIF URLs | HTTP 200, image/gif |
| Requested Google Fonts stylesheet | HTTP 200 |

HTML and editor checks used a local DOM implementation and a CSS parser. These checks establish structure and editor behaviour; they do not measure actual browser layout, image cropping, font rendering or contrast on the user's forum palette.

The browser's security policy blocked the local preview, so visual rendering, narrow-screen appearance and a live JCink post remain unverified. No changes were made to the forum.
