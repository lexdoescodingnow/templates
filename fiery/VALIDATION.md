# Fiery validation

## Completed

- Exactly fifteen uniquely named snippets: five threads, five comms and five buds.
- Every snippet includes `[dohtml]` wrappers and a single hosted stylesheet link after the editable HTML.
- `[url]`, `[name]` and `[text]` appear before the writing and decorative markup.
- Supplied Tumblr URLs are preserved exactly. Starting image counts total six image-free, six single-image and three paired-image designs.
- No HTML comments, CSS comments, hidden editing instructions or scripts occur in posting snippets or the shared template stylesheet.
- HTML parsing confirms the formatting elements and ordinary message paragraphs. Three successive comms `<p>` openings still parse as three messages when closing tags are omitted.
- Bud sample replies are 36 words, below the 100-word target.
- Every design has dedicated, wrapper-scoped CSS. Bold/underline use the forward member gradient; italics reverse it. Both neutral themes and explicit-mode precedence are present.
- Image-removal selectors remove media grid areas; writing has no fixed-height clipping or scrollbox.
- Node syntax checks passed for the model, editor and build script. Regeneration produces all fifteen snippets and embeds the CSS/editor in the standalone preview.

## Limits

The local browser executable was unavailable and its download failed. The available cloud browser then rejected the local preview URL with `ERR_BLOCKED_BY_CLIENT`. No screenshot inspection, computed-layout check, clipboard interaction or live JCink post was completed. Tumblr delivery and jsDelivr delivery have not been confirmed in a browser. These limits do not affect the verified source files in GitHub.
