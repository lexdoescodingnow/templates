# Bread thread template

The Bread thread template is hosted as a small JCink component. The post contains only the editable fields, a variation name, and one script include; the layout, responsive rules, light and dark mode styling, member-group gradients, placeholder GIFs, and rendering logic live in this folder.

## Variants

The set contains five layouts:

- `standard` — the original two-GIF layout.
- `single` — one larger GIF using `[url]`; `[url2]` is not required.
- `rounded` — a softer two-GIF card with strongly rounded edges.
- `scroll` — a shorter media area with a fixed-height, member-coloured scrollbar.
- `split` — an editorial side-by-side layout that returns to a stacked card on smaller screens.

## Standard

```html
[dohtml]
<div class="bh-bread" data-variant="standard" data-gif-one="[url]" data-gif-two="[url2]" data-name="[name]">
  <div class="bh-bread-text">[text]</div>
</div>
<script src="https://cdn.jsdelivr.net/gh/lexdoescodingnow/templates@main/bread/bread-thread.js"></script>
[/dohtml]
```

## Single GIF

```html
[dohtml]
<div class="bh-bread" data-variant="single" data-gif-one="[url]" data-name="[name]">
  <div class="bh-bread-text">[text]</div>
</div>
<script src="https://cdn.jsdelivr.net/gh/lexdoescodingnow/templates@main/bread/bread-thread.js"></script>
[/dohtml]
```

## Rounded

```html
[dohtml]
<div class="bh-bread" data-variant="rounded" data-gif-one="[url]" data-gif-two="[url2]" data-name="[name]">
  <div class="bh-bread-text">[text]</div>
</div>
<script src="https://cdn.jsdelivr.net/gh/lexdoescodingnow/templates@main/bread/bread-thread.js"></script>
[/dohtml]
```

## Scroll

```html
[dohtml]
<div class="bh-bread" data-variant="scroll" data-gif-one="[url]" data-gif-two="[url2]" data-name="[name]">
  <div class="bh-bread-text">[text]</div>
</div>
<script src="https://cdn.jsdelivr.net/gh/lexdoescodingnow/templates@main/bread/bread-thread.js"></script>
[/dohtml]
```

## Split

```html
[dohtml]
<div class="bh-bread" data-variant="split" data-gif-one="[url]" data-gif-two="[url2]" data-name="[name]">
  <div class="bh-bread-text">[text]</div>
</div>
<script src="https://cdn.jsdelivr.net/gh/lexdoescodingnow/templates@main/bread/bread-thread.js"></script>
[/dohtml]
```

Omitting `data-variant` uses `standard`. The loader can safely appear more than once on a topic page and inserts each hosted stylesheet only once.

The component uses `--mgrgb1`, `--mgrgb2`, `--mgrgb3`, and `--icon` from Blue Hour. Bold and underline use the forward member-group gradient; italics use the reverse gradient.