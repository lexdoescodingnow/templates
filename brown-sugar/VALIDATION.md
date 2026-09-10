# Brown Sugar validation

## Source checks

- Fifteen unique design names and filenames: five threads, five comms and five buds.
- All posting files are generated from the same defaults and markup functions used by the editor.
- Every snippet includes complete `[dohtml]` tags, `[url]`, `[name]` and `[text]` in its first editable lines, and one hosted CSS link after the content.
- No comments, hidden instructions, scripts, style blocks or event attributes in posting HTML. Shared posting CSS contains no comments.
- The supplied GIF URLs remain exact `.gifv` URLs. Generated zero-image states omit the media element. Each design has an image-free CSS layout rule.
- Default comms use three ordinary paragraphs; HTML parsing also preserves three messages when paragraph end tags are omitted.
- All default buds contain 36 words, below the 100-word target.
- Shared styles use inherited member variables, forward bold/underline gradients, reverse italic gradients, explicit Blue Hour light/dark selectors, and a system fallback excluding both explicit modes.
- The standalone editor includes all fifteen navigation entries, the design registry, shared model, styling and editing script. JavaScript syntax checks pass.
- Generated snippets are checked against their shared model; source HTML is parsed for the expected structure.

## Limits

The browser security policy blocked local HTTP and synchronized-file preview navigation. No alternate browser route was used. Visual rendering, actual 320 px/550 px layout behavior, browser editor interactions, system colour emulation, live Tumblr image playback and live CDN response were not verified. Source checks do not establish those results. No live JCink board was supplied for an end-to-end posting check.

The stylesheet and collection files are published to GitHub using commits that preserve all existing repository files. Posting exports pin the stylesheet to its published commit. Final GitHub tree hashes are compared with the local files before delivery.
