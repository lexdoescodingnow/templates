# Sake collection validation

- Five thread, five comms and five bud snippets, with fifteen unique names and filenames.
- Every snippet has one `[dohtml]` block and one hosted stylesheet link, with editable fields above decorative markup.
- Snippet HTML parsed successfully, and all contain bold, italic and underline examples.
- Plain comms `<p>` messages also parse into separate bubbles when closing `</p>` tags are omitted.
- Placeholder image counts match the design catalogue, and both supplied GIF URLs returned HTTP 200 with `image/gif` content.
- Bud placeholder replies are fewer than 100 words; posting snippets are each under 2,200 characters.
- Posting CSS has balanced delimiters, scoped selectors, three member-colour variables, forward and reverse emphasis gradients, explicit Blue Hour theme selectors and an explicit-mode-safe system fallback.
- The standalone preview contains all fifteen design selectors and the required editing controls. Build and JavaScript syntax checks passed.
- Publishing verification compares GitHub blob hashes for every delivered file and checks the immutable CDN stylesheet against the local CSS.

Browser visual rendering, clipboard interaction in a live browser and posting on the user’s forum have not been tested.

