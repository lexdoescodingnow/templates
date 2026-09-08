# Italian Cuisine validation

Checked on 8 September 2026.

## Completed checks

- Exactly five thread, five comms and five bud designs, with 15 unique names and filenames.
- Every posting file exactly matches its model-generated export and has one complete `[dohtml]` block and one pinned hosted stylesheet link.
- Editable URL, name, title/status, time, GIFs and writing precede decoration and styling.
- No comments, hidden tips, instruction blocks or separator banners in posting HTML or template CSS.
- HTML5 parsing validates all 15 snippet structures. All five comms retain three separate messages when closing `</p>` tags are removed.
- The 199 qualified CSS rules and their declarations/selectors parse successfully with tinycss2 and cssselect2. Every named design has corresponding CSS.
- JavaScript source compiles. Field escaping, exact defaults, image counts, omission of empty image containers and 36-word bud samples pass model checks.
- Both supplied Tumblr URLs return HTTP 200 with `image/gif` content. The Google Fonts request returns the three requested font families.
- Source review checks forward bold/underline gradients, reverse italics, inherited RGB variables, explicit light/dark modes, fluid media, responsive portrait columns and no fixed writing heights.

## Verification limits

The Cloud Browser security policy blocked opening local preview files in this session. No browser layout screenshots or live editor interaction tests were completed; narrow layouts and image-removal reflow were reviewed in source, not confirmed by browser rendering. No authenticated JCink test post was created. Remote GIFs and fonts depend on their hosts, and forum skins may apply additional styling.

## Publication

The release uses a commit-pinned stylesheet link. GitHub file hashes and the served stylesheet are checked after publication; the release result is reported with the deliverable.
