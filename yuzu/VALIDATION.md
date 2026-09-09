# Yuzu validation

## Completed automated checks

- Fifteen unique names and filenames, with five threads, five comms and five buds.
- All 202 template CSS rules parse and are scoped to `.bh-yuzu`.
- Explicit Blue Hour dark mode and system fallback selectors are present.
- Bold and underline use the forward member gradient; italics use the reverse gradient.
- Each posting file starts and ends with `[dohtml]` wrappers and includes exactly one shared stylesheet link.
- `[url]`, `[name]` and `[text]` appear in the initial editable markup.
- No comments, hidden editing instructions, scripts or iframes appear in forum snippets; no CSS comments are present.
- The writing rules impose no maximum height, clipping or scroll boxes.
- All fifteen editor selections export exactly the corresponding default posting snippet.
- Each design's initial GIF count matches the catalogue. Removing all images removes the media markup. Adding three images works in every editor state. Reset restores each default.
- Both supplied placeholder GIF URLs are preserved in the content model.
- Bud placeholder replies remain below 100 words.
- Comms messages use ordinary paragraphs, including successive opening `<p>` tags.
- The editor converts `[b]`, `[i]` and `[u]`; name and URL text is escaped; executable markup is removed from editor writing.
- Design edits persist while switching designs. Copy, download, reset, gallery navigation, message direction and preview mode, palette and width controls pass simulated DOM interaction checks.

## Limits

Browser security policy blocked access to the local preview. No rendered screenshot, visual layout check, browser GIF-loading check, live forum injection or real clipboard/download check is claimed. Clipboard and download behavior were verified using simulated DOM browser APIs. The self-contained preview is included for visual review.

The posting snippets load CSS directly; this collection does not require a JavaScript injector. Raw BBCode handling inside `[dohtml]` varies by forum, so snippets use HTML emphasis and the editor converts the supported BBCode tags.
