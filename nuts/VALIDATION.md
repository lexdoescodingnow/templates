# Nuts validation

## Completed checks

- Exactly 15 unique named designs: five threads, five comms, five buds.
- Individual snippet files match the model-generated output byte for byte.
- Every snippet has paired `[dohtml]` tags and exactly one hosted stylesheet link at the bottom.
- `[url]`, `[name]` and `[text]` appear before images, prose and decorative markup.
- All snippets contain lorem ipsum and styled bold, italic and underline examples.
- All five buds start below 100 words (36 words each).
- Neither posting HTML nor shared CSS contains comments or hidden editing notes. Posting snippets have no scripts.
- Generated zero-, one-, two- and three-image variants have the expected image counts; zero-image output omits the media container.
- HTML attribute and text escaping preserves ampersands, angle brackets and quotes.
- All five comms parse successive opening `<p>` tags into three separate sibling messages using lxml's HTML parser.
- Every catalogue design has its own scoped CSS variant selector.
- JavaScript syntax checks pass for the model, editor and builder.
- Both supplied GIF URLs returned HTTP 200 and `image/gif` during verification.
- The neutral light/dark variables, explicit Blue Hour selectors, system fallback precedence, forward b/u and reverse i gradients, media-removal rules and responsive declarations were inspected in source.

## Limits

Browser security policy blocked local HTTP and file preview access. No visual rendering, viewport overflow measurement, clipboard interaction or browser editor interaction is claimed. The preview includes a 320 px width setting for manual inspection. Live JCink posting has not been tested. Third-party GIF and CDN availability can change.
