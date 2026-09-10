# Sesame validation

Checked on 10 September 2026.

## Passed static checks

- Fifteen unique designs and filenames: five threads, five comms and five buds.
- Every posting file includes one opening and one closing `[dohtml]` tag and one hosted stylesheet link.
- `[url]` and `[name]` occur on the first editable line, with `[text]` immediately below.
- Supplied GIF URLs match the model exactly. The defaults contain six image-free designs, six single-image designs and three paired-image designs.
- All snippets contain lorem ipsum and HTML bold, italic and underline examples. Bud defaults contain 36 words; comms use three ordinary `<p>` messages.
- Editable writing precedes decorative markup and the stylesheet link. Posting HTML and CSS contain no comments or hidden editing instructions.
- All named CSS grid areas form valid rectangles. Posting selectors use the `.bh-sesame-atelier` scope.
- Forward and reverse emphasis gradients and explicit Blue Hour theme precedence are present in the stylesheet.
- The standalone preview has fifteen design selections and unique control IDs. JavaScript source files pass Node syntax checks.
- Model output was checked for zero, one, two and three images, message direction values, and matching generated filenames.

## Verification limits

The browser security policy blocked opening the local preview. Visual rendering, narrow-screen appearance, browser clipboard interactions and interactive editor behaviour were not verified in a live browser. Static checks do not establish visual correctness.

The stylesheet was saved to GitHub and pinned to the commit in `stylesheet-revision.txt`. The environment could not independently fetch the jsDelivr URL; CDN delivery and the external Tumblr GIF responses were not verified. The downloadable preview embeds its stylesheet, so it can display the layouts without fetching the posting stylesheet.

The templates have not been submitted to a live JCink forum.
