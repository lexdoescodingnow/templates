# Fudge verification

## Completed

- Fifteen distinct names and posting files: five thread, five comms and five bud designs.
- All snippets parse as HTML and match their model defaults. Each has one `[dohtml]` block and one stylesheet link after the editable HTML.
- Names, links, titles, GIFs, times and writing appear before decorative device markup. All snippets retain `[url]`, `[name]`, `[text]` and lorem ipsum.
- Posting HTML and shared CSS contain no comments, hidden tips or editing instructions. No forum JavaScript is required.
- Bold and underline use the forward member gradient; italic uses the reverse gradient. Explicit Blue Hour modes take precedence over the system fallback.
- CSS syntax parses successfully: 190 rules, all scoped to `.bh-fudge`. Non-variable declaration values pass CSS grammar checks.
- All five comms parse successive opening `<p>` tags into three sibling messages without requiring closing paragraph tags.
- Every bud begins with 36 words. No height limit clips the writing area.
- Sixty generated image states checked: zero, one, two and three GIFs for each design. Zero images omit the media block. CSS includes empty-media hiding and portrait-column reflow rules.
- Fifteen editor selections and edit/export paths pass DOM-based execution checks, including basic formatting BBCode conversion and paragraph handling.
- GIF adding/removing, saved state across design selections, reset, theme controls and preview palette controls pass DOM checks. Preview palette values do not leak into posting code.
- Copy action passes the exact displayed snippet to the clipboard boundary; the successful-copy status updates. Clipboard access was simulated for this DOM check.
- Unsafe writing markup is removed by the editor's formatting filter. There were no uncaught editor exceptions.
- Model, builder, editor and embedded preview JavaScript pass syntax checks. The standalone preview contains fifteen selectors and unique element IDs, with its CSS and JavaScript embedded.
- Both supplied Tumblr URLs returned HTTP 200 and `image/gif` content types. URLs are preserved exactly.
- Posting stylesheet URLs share the immutable revision in `stylesheet-revision.txt`.

## Limits

These are source and DOM checks, not visual browser tests. Browser security policy blocked opening the local preview. Responsive appearance, image cropping and rendered light/dark presentation have not been visually verified. The system-preference fallback is verified in source, not through a rendered browser preference change.

Live JCink posting, actual system clipboard access and the browser's download UI have not been tested. The forum's permissions and handling of `[dohtml]` still apply. The standalone preview and named `.txt` files are provided for direct use and review.
