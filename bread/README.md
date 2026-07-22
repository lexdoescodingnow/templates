# Bread templates

The Bread set is delivered as forum-safe JCink `[dohtml]` markup with its visual styling hosted in GitHub. The posts do not rely on JavaScript. Each snippet imports one master stylesheet, then contains the ordinary HTML required for the layout, so it can render in the post editor, preview screen, and finished topic.

```html
<style>@import url('https://cdn.jsdelivr.net/gh/lexdoescodingnow/templates@main/bread/bread.css');</style>
```

The master stylesheet loads the thread, Comms, Bud, responsive, light-mode, dark-mode, member-gradient, icon, and placeholder-image rules.

## Thread variants

The thread set contains five layouts:

- `standard` — the original two-GIF layout.
- `single` — one larger GIF using `[url]`; `[url2]` is not required.
- `rounded` — a softer two-GIF card with strongly rounded edges.
- `scroll` — a shorter media area with a fixed-height, member-coloured scrollbar.
- `split` — an editorial side-by-side layout that returns to a stacked card on smaller screens.

All five complete copy-ready versions are stored in `bread-thread-snippet.txt`.

## Breadline Comms

Breadline is the matching quick-message component. It supports an animated avatar or the member icon, sent and received message alignment, a time stamp, a fixed-height scrolling conversation area, and the same member-gradient formatting as the thread set.

The sent and received copy-ready versions are stored in `bread-comms-snippet.txt`. Additional messages can be added by copying a complete `.bh-bread-comms-row` block and choosing either `is-sent` or `is-received`.

## Bread Buds

Buds are compact quick-reply templates designed to encourage replies of 100 words or fewer. The CSS-only edition keeps the limit visible in the footer without hiding, truncating, or programmatically changing the reply.

The set contains five layouts:

- `standard` — a balanced horizontal card with one GIF.
- `portrait` — a narrower card with a taller portrait GIF.
- `duo` — two small GIFs above the reply.
- `minimal` — an icon-led text-only card with no GIF field.
- `strip` — a narrow cinematic GIF strip above the reply.

All five copy-ready versions are stored in `bread-buds-snippets.txt`.

## Blue Hour integration

All Bread components use `--mgrgb1`, `--mgrgb2`, `--mgrgb3`, and `--icon`. Bold and underline use the forward member-group gradient; italics use the reverse gradient.

The placeholder GIFs remain as fallback background layers. Replacing `[url]` and `[url2]` supplies the character images; leaving one unchanged allows the fallback behind it to remain visible.

## Compatibility correction

The first draft used external JavaScript to construct the cards. That approach was removed because JCink previews do not reliably execute post-level scripts. The current snippets use only HTML and hosted CSS. Old snippets containing `<script src="...bread-thread.js">`, `<script src="...bread-comms.js">`, or `<script src="...bread-buds.js">` must be replaced with the current versions.