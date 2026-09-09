# Cocktail validation · 9 September 2026

## Passed

- Exactly fifteen unique designs: five threads, five comms and five buds, with individual `[dohtml]` posting files.
- `[url]`, `[name]` and `[text]` are in the first editable fields of each file. GIFs and writing precede decorative markup and the stylesheet link.
- Every posting file contains a single version-pinned stylesheet link and no scripts, comments, hidden tips or editing notes.
- All fifteen default editor exports match their individual posting files exactly.
- GIF defaults agree between the catalogue, preview and snippets. Adding three GIFs, removing every GIF and resetting defaults pass for every design. Empty media markup is omitted; CSS includes the corresponding grid collapse rules.
- All comms accept plain paragraphs and successive opening `<p>` tags. Default buds contain fewer than 100 words.
- HTML parsing, JavaScript syntax and parsing of all 153 scoped CSS rules pass.
- Editor DOM checks pass for edit persistence, `[b]` / `[i]` / `[u]` conversion, text escaping, script/event removal, URL filtering, message direction, mode and palette controls, gallery selection, copying and the download code path.
- Changing the preview palette does not insert colour overrides into exported posting code.
- Source checks confirm inherited RGB member variables, forward bold/underline and reverse italic gradients, and explicit Blue Hour mode selectors taking precedence over the system fallback.
- The two supplied Tumblr URLs returned HTTP 200 and animated GIF data, both 400 × 400 pixels, with 42 and 56 frames.
- The shared stylesheet URL returned HTTP 200 with `text/css; charset=utf-8` and matched the local 23,215-byte file exactly.

Stylesheet revision: `11eec1056bb0117cc4998c8ce676508fbfca1ac5`.

Stylesheet SHA-256: `e63bfc6324e0b24ee32fc9daa640bec9613589e026d3751b1e4cfac99a4b647f`.

## Limits

The Browser skill's security policy blocked local HTTP and shared-file preview URLs. No alternative browser route was used. Visual appearance, computed responsive layout, image cropping and live JCink rendering have therefore not been verified in a browser. DOM tests validate structure and editor behaviour, not rendered geometry. The forum's handling of `[dohtml]` and stylesheet links still depends on its configuration.

## Reproduce

From the repository root:

```sh
node cocktail/build.cjs
python3 cocktail/validate.py
NODE_PATH=/path/to/node_modules node cocktail/validate.cjs
```

The Python check uses `lxml`. The DOM/CSS check uses `jsdom` 26.1.0 and `css-tree` 3.1.0. Test dependencies are separate from the published template files.
