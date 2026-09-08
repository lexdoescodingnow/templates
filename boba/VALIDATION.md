# Boba verification

Checked on 8 September 2026.

- Exactly 15 unique named designs: five threads, five comms and five buds.
- All 15 posting files have one `[dohtml]` block, one template wrapper and one hosted stylesheet link.
- The editable `[url]`, `[name]` and `[text]` fields precede GIFs, writing, decoration and the stylesheet link.
- HTML parsed with the HTML5 parser. All comms preserve three separate message paragraphs when closing `</p>` tags are omitted.
- Each sample includes bold, italic and underline HTML. CSS supplies the forward and reverse member gradients and explicit Blue Hour mode overrides.
- All five bud samples contain 36 words.
- All 193 CSS selector rules parse; stylesheet declarations parse without errors. Selectors are confined to Boba classes and explicit mode ancestors.
- No HTML comments, CSS comments, instruction blocks or scripts occur inside the posting snippets.
- Named README links point to the correct 15 files. The preview embeds the current CSS and contains all 15 design definitions.
- The model, editor and build script pass Node syntax checks.
- Both supplied Tumblr URLs returned HTTP 200 and animated GIF data: 90 frames at 540 × 320, and 69 frames at 268 × 380. The Google Fonts stylesheet returned HTTP 200.

The Cloud Browser blocked local and inline preview URLs. No browser-rendered layout, clipboard interaction, narrow-width visual check or live JCink post was completed in this session. The HTML preview is provided for visual inspection. Light/dark overrides, automatic media removal and the editor were checked in source; their rendered behavior has not been certified here.

The forum must allow `[dohtml]` and external stylesheet links. Fonts, GIFs and jsDelivr styling require network access. An unavailable external font falls back to the declared local font stack.
