# Blue Hour Traitors Thread Templates

These are hosted JCink thread templates inspired by The Traitors.

## Hosted stylesheets

Use both of these in each `[dohtml]` snippet. The second file loads after the main template CSS and forces the visible member-group gradients for bold, italic, underline, and links.

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/lexdoescodingnow/templates@main/traitors/traitors.css?v=20260424g2">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/lexdoescodingnow/templates@main/traitors/traitors-gradient.css?v=20260424g2">
```

## Snippets

- `generic-post-snippet.html` is for arrivals, tasks, conversations, and normal posting.
- `round-table-vote-snippet.html` is for round table votes.
- `traitor-murder-snippet.html` is for traitor murders.

## Editable fields

Each snippet keeps these fields at the top:

```html
[url]  = character GIF URL
[name] = character name
[text] = location, vote target, victim, clue, or thread note
```

## Group colors

The stylesheet uses Blue Hour's dynamic member group variables:

```css
--mgrgb1
--mgrgb2
--mgrgb3
```

That means the template should match the current poster's member group automatically. The grey numbers in the CSS are only neutral fallbacks for previews where the forum does not provide group variables.

## Formatting gradients

- `<b>` / `[B]` uses the member-group gradient forward.
- `<i>` / `[I]` uses the member-group gradient backward.
- `<u>` / `[U]` uses gradient text plus a gradient underline.
- Links use gradient text plus a gradient underline.

## Dark mode

Dark mode is handled with:

```css
html[color-mode='dark'] .bh-traitors
```
