# Lavender validation

## Passed

- Fifteen distinct names with five thread, five comms and five bud designs.
- Every named posting file matches the editor model and contains one complete `[dohtml]` block and one stylesheet link.
- Placeholders and editable content precede decorative markup and shared CSS.
- No scripts, comments, hidden tips or instructional text in exported templates or shared CSS.
- All stylesheet selectors are scoped to `.bh-lavender`; stylesheet syntax parsed successfully.
- Explicit forum light/dark selectors take priority over the system fallback by stylesheet construction.
- Bold/underline and reverse italic gradient declarations, and inherited member colour variables, are present.
- Supplied GIF URLs preserved exactly; zero, one and two default images agree across preview and posting files.
- Removing images omits the media container; additional images are supported by the model.
- All bud samples contain fewer than 100 words.
- Successive opening `<p>` tags produce separate comms messages.
- All fifteen designs selectable in the editor and available in the overview gallery.
- Field editing, HTML escaping, BBCode conversion, long writing, per-design state, reset, GIF addition/removal, mode switching, member palettes and width controls passed DOM checks.
- Clipboard export copies the complete current snippet; the fallback selects all code when clipboard access is denied.
- Preview controls and member colour values stay out of forum snippets.
- No editor JavaScript runtime errors in the DOM test environment.

429 assertions passed before the publication revision was pinned; the full suite is rerun after the final build.

## Limits

The cloud browser rejected local HTTP and self-contained data preview URLs. No screenshot review, measured browser layout/contrast checks, animated-GIF rendering check, or live JCink posting test was completed. CSS parsing and DOM/editor checks do not establish pixel-level rendering correctness. The standalone preview is included for visual review.

The tests use Node.js, `jsdom` and `css-tree`. With those dependencies available, run `node lavender/validate.cjs` from the repository root. Test execution does not fetch the external GIFs or CSS; publication transport is checked separately.
