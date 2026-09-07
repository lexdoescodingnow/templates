# Banana buds

Buds are small thread replies intended to encourage 100 words or fewer: a brief beat of dialogue, a reaction or a small step forward. The five designs share the Banana family’s serif wordmark, botanical details and member-group palette.

| Bud | Design | GIFs | Maximum width |
| --- | --- | --- | --- |
| [Sprout](banana-bud-sprout.txt) | A rounded card with one small leaf-shaped portrait. | 1 | 350px |
| [Leaflet](banana-bud-leaflet.txt) | An image-free folded notecard. | 1 | 300px |
| [Tendril](banana-bud-tendril.txt) | An arched side portrait beside a short passage. | 1 | 410px |
| [Twinleaf](banana-bud-twinleaf.txt) | Two overlapping GIF portraits and a slim coloured rule. | 2 | 365px |
| [Pressing](banana-bud-pressing.txt) | A cropped film still above a compact story card. | 1 | 330px |

Copy one linked snippet in full into a JCink post. Each includes `[dohtml]` and its stylesheet link. [banana-buds-snippets.txt](banana-buds-snippets.txt) contains all five blocks, in the same order as the table. [banana-buds-preview.html](banana-buds-preview.html) is a downloadable browser preview with light/dark and sample member-colour controls; its GIFs need an internet connection.

## Editing

The first editable line contains the profile `[url]`, character `[name]` and `[text]` for a scene label, location or short subtitle. GIF URLs follow. Write the reply inside `bb-copy`, replacing the 36-word lorem ipsum sample.

Start a new paragraph with `<p>`:

```html
<p>Lorem ipsum dolor sit amet.
<p>Consectetur adipiscing elit.
```

Closing `</p>` tags are optional here; ordinary closed paragraphs also work. Use `<br>` for a line break within a paragraph. The 100-word target is an invitation, not a script-enforced limit: longer replies remain visible and grow the template naturally.

You can switch between the single-GIF designs by changing only the second class on the first div: `bb-sprout`, `bb-leaflet`, `bb-tendril` or `bb-pressing`. Twinleaf uses `bb-twinleaf` and two images in `bb-photo`; it also supports one image if you remove the second.

## Colours and formatting

All five inherit Blue Hour's RGB variables `--mgrgb1`, `--mgrgb2` and `--mgrgb3`. Those colours affect the card tints, frames, accents, leaf motifs and wordmark. The writing sits on neutral light/dark surfaces.

The shared stylesheet styles `b`/`strong` and `u` with the forward group gradient (1 → 2 → 3), and `i`/`em` with the reverse gradient (3 → 2 → 1). Within `[dohtml]`, the supplied examples use HTML formatting tags; the same styles apply when the forum converts BBCode to those elements.

The templates follow explicit `html[color-mode="light"]` and `html[color-mode="dark"]`. If the forum supplies no mode, the system preference applies. No JavaScript is required in a forum post.

## Shared stylesheet

```text
https://cdn.jsdelivr.net/gh/lexdoescodingnow/templates@main/banana/banana-buds-keepsake.css
```

This stylesheet is shared by the five current Bud designs, with rules scoped to `.banana-bud`.


Current default GIF counts: Sprout 1, Leaflet 0, Tendril 1, Twinleaf 2, Pressing 0. See [the collection guide](README.md) for current snippets.
