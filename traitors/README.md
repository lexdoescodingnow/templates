# Blue Hour Traitors Thread Templates

These are hosted JCink thread templates inspired by The Traitors.

## Hosted stylesheets

Use both of these in each `[dohtml]` snippet. The first file handles the main layout. The second file is a fresh override that forces the angular generic header and visible member-group gradients.

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/lexdoescodingnow/templates@main/traitors/traitors.css?v=20260424g4">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/lexdoescodingnow/templates@main/traitors/traitors-v4.css?v=20260424g4">
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

The stylesheets use Blue Hour's dynamic member group variables:

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

## Generic header

The generic posting template now uses a `.dagger` header. The override file also restyles older `.waves` markup, but the newest snippet no longer uses that class.

## Dark mode

Dark mode is handled with:

```css
html[color-mode='dark'] .bh-traitors
```
