# Raspberry validation

Checked on 9 September 2026.

## Completed

- Fifteen uniquely named posting files: five threads, five comms and five buds.
- HTML parsed with jsdom: URL, name and title/status come first; GIFs and writing precede decoration and the single stylesheet link.
- Complete `[dohtml]` wrappers, no posting scripts, no template comments or hidden editing tips.
- CSS parsed with css-tree without syntax errors; model, editor and build scripts pass Node syntax checks.
- All fifteen initial editor exports match their individual posting files exactly.
- Normal and successive unclosed `<p>` paragraphs remain separate messages.
- Editor checks cover BBCode emphasis conversion, text escaping, unsupported writing markup removal, adding/removing GIFs, alternating message direction, resetting a design, draft retention, gallery selection, member-palette isolation, mode controls, clipboard copying and its manual-copy fallback.
- Bud samples contain 36 words each.
- Both supplied Tumblr URLs returned HTTP 200 and `image/gif`. They contain 95 and 105 frames, respectively, at 400 × 274 pixels.
- The pinned jsDelivr stylesheet returned HTTP 200 and `text/css`. Its bytes match the local stylesheet exactly (SHA-256 `54bdd8a667f3c5a756722687d627267e2ea1cd75d5721e7b01a52059006badd5`).

## Scope and limits

These are source and simulated-DOM checks, not browser rendering checks. The available preview browser blocked local-page navigation with `ERR_BLOCKED_BY_CLIENT`. No alternate browser mechanism was used. Visual layout, narrow-width rendering, computed colour contrast, image-space reclamation and the native download action were not verified in a live browser.

The CSS supplies neutral light/dark tokens, explicit forum-mode precedence, forward bold/underline gradients, reverse italic gradients, responsive widths, optional-media selectors and unrestricted writing height. Their definitions were inspected; their visual rendering remains unverified in this session.

No live JCink post was created. Forum skin overrides and external-stylesheet permissions can affect the result. GIFs and the hosted stylesheet require their remote hosts.

## Repeat

Run `node raspberry/build.cjs`, then `node raspberry/validate.cjs` with `jsdom` and `css-tree` available to Node. The validator does not fetch external assets or use a rendering browser. Review `raspberry-collection-preview.html` in a browser for visual checks.
