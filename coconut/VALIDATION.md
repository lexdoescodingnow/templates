# Coconut validation

Checked on 8 September 2026.

## Completed

- Fifteen individually named posting snippets: five threads, five comms and five buds. Names were checked against the existing repository collections.
- Every file contains one complete `[dohtml]` block and one link to the shared Coconut stylesheet. `[url]`, `[name]` and `[text]` are at the top. Writing and GIFs precede decorative markup and the stylesheet link.
- No scripts, comments, hidden tips or instruction blocks appear in posting snippets. The template CSS contains no comments.
- All fifteen default outputs from the preview editor match their corresponding `.txt` files exactly.
- The stylesheet parses successfully. Its 243 style rules are scoped to `.ccn`, and the CSS property/value validator reports no invalid declarations.
- Group colours are inherited through `--mgrgb1`, `--mgrgb2` and `--mgrgb3`. Forward gradients are assigned to bold/underline; reverse gradients to italics. Explicit forum theme selectors and a system-preference fallback are present.
- DOM-level editor checks passed for all design selections, three width controls, light/dark/system output, adding/removing GIFs, simple successive `<p>` messages, BBCode emphasis conversion, direction changes, per-design edit retention, body sanitization, preview-only palettes, the complete fifteen-design gallery, type filters and the copy control.
- GIF distribution: seven image-free designs, seven with one GIF and one with two GIFs. Clearing the last image removes the media markup from editor output; stylesheet reflow rules cover empty or omitted media.
- Bud placeholder replies contain fewer than 100 words and have no fixed-height clipping.
- Both supplied Tumblr `.gifv` URLs respond with HTTP 200 and `image/gif`. The optional Google Fonts stylesheet responds with HTTP 200 and `text/css`.

## Verification limits

The Cloud browser rejected both the localhost preview and local-file navigation under its URL policy. No alternative browser route was used. Layouts were reviewed in code and editor behaviour was checked in a DOM simulation; pixel rendering, actual responsive appearance and real browser clipboard permissions were not verified in this session.

The collection has not been pasted into a live JCink post. A site's skin selectors and its rules for external stylesheets can affect integration. Remote GIFs, web fonts and the hosted shared CSS require internet access.
