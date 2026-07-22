# Bread templates

The Bread set is hosted as small JCink components. Each post contains only its editable fields and one script include; the layouts, responsive rules, light and dark mode styling, member-group gradients, placeholder content, and rendering logic live in this folder.

## Thread variants

The thread set contains five layouts:

- `standard` — the original two-GIF layout.
- `single` — one larger GIF using `[url]`; `[url2]` is not required.
- `rounded` — a softer two-GIF card with strongly rounded edges.
- `scroll` — a shorter media area with a fixed-height, member-coloured scrollbar.
- `split` — an editorial side-by-side layout that returns to a stacked card on smaller screens.

### Standard

```html
[dohtml]
<div class="bh-bread" data-variant="standard" data-gif-one="[url]" data-gif-two="[url2]" data-name="[name]">
  <div class="bh-bread-text">[text]</div>
</div>
<script src="https://cdn.jsdelivr.net/gh/lexdoescodingnow/templates@main/bread/bread-thread.js"></script>
[/dohtml]
```

### Single GIF

```html
[dohtml]
<div class="bh-bread" data-variant="single" data-gif-one="[url]" data-name="[name]">
  <div class="bh-bread-text">[text]</div>
</div>
<script src="https://cdn.jsdelivr.net/gh/lexdoescodingnow/templates@main/bread/bread-thread.js"></script>
[/dohtml]
```

### Rounded

```html
[dohtml]
<div class="bh-bread" data-variant="rounded" data-gif-one="[url]" data-gif-two="[url2]" data-name="[name]">
  <div class="bh-bread-text">[text]</div>
</div>
<script src="https://cdn.jsdelivr.net/gh/lexdoescodingnow/templates@main/bread/bread-thread.js"></script>
[/dohtml]
```

### Scroll

```html
[dohtml]
<div class="bh-bread" data-variant="scroll" data-gif-one="[url]" data-gif-two="[url2]" data-name="[name]">
  <div class="bh-bread-text">[text]</div>
</div>
<script src="https://cdn.jsdelivr.net/gh/lexdoescodingnow/templates@main/bread/bread-thread.js"></script>
[/dohtml]
```

### Split

```html
[dohtml]
<div class="bh-bread" data-variant="split" data-gif-one="[url]" data-gif-two="[url2]" data-name="[name]">
  <div class="bh-bread-text">[text]</div>
</div>
<script src="https://cdn.jsdelivr.net/gh/lexdoescodingnow/templates@main/bread/bread-thread.js"></script>
[/dohtml]
```

Omitting `data-variant` uses `standard`. The loader can safely appear more than once on a topic page and inserts each hosted stylesheet only once.

## Breadline Comms

Breadline is the matching quick-message component. It supports an animated avatar or icon, multiple text bubbles, sent and received alignment, an optional status, a time stamp, a fixed-height scrolling conversation area, and the same member-gradient formatting as the thread set.

```html
[dohtml]
<div class="bh-bread-comms" data-avatar="[url]" data-name="[name]" data-time="[time]" data-side="sent">
  <div class="bh-bread-comms-text">
    <p>[text]</p>
  </div>
</div>
<script src="https://cdn.jsdelivr.net/gh/lexdoescodingnow/templates@main/bread/bread-comms.js"></script>
[/dohtml]
```

Use one `<p>` for each separate message bubble. Change `data-side="sent"` to `data-side="received"` to reverse the alignment. Individual paragraphs may also use `data-side="received"` or `data-side="sent"` for mixed conversations. The optional `data-status` attribute replaces the default active-status line.

All Bread components use `--mgrgb1`, `--mgrgb2`, `--mgrgb3`, and `--icon` from Blue Hour. Bold and underline use the forward member-group gradient; italics use the reverse gradient.
