# Blue Hour Traitors Thread Templates

These are hosted JCink thread templates inspired by The Traitors.

## Hosted stylesheet

Use this in each `[dohtml]` snippet:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/lexdoescodingnow/templates@main/traitors/traitors.css">
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
--accent: var(--mgrgb2, 180, 180, 180);
--accent2: var(--mgrgb1, 95, 95, 95);
--accent3: var(--mgrgb3, 225, 225, 225);
```

That means the template should match the current poster's member group automatically. The grey numbers are only neutral fallbacks for previews where the forum does not provide group variables.

## Dark mode

Dark mode is handled with:

```css
html[color-mode='dark'] .bh-traitors
```
