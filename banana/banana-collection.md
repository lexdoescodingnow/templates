# The Banana collection

The complete set contains **five threads, five comms and five buds**. Keepsake is the original thread and phone design. Cameo, Ribbon, Canopy and Postcard are coordinated variations of both.

Copy one linked snippet in full into a JCink post, including its `[dohtml]` wrapper and stylesheet link. Download [banana-collection-preview.html](banana-collection-preview.html) and open it in a browser to compare all fifteen with light/dark and sample group-colour controls. The preview uses the supplied online GIFs.

## Threads

| Template code | Design | GIFs |
| --- | --- | --- |
| [Keepsake](banana-keepsake-snippet.txt) | The original staggered GIF portraits and botanical frame. | 2 |
| [Cameo](banana-thread-cameo.txt) | A single oval portrait and a softer, rounded frame. | 1 |
| [Ribbon](banana-thread-ribbon.txt) | Two aligned square GIFs crossed by a band of member colours. | 2 |
| [Canopy](banana-thread-canopy.txt) | One wide, arched GIF with leaves framing the heading. | 1 |
| [Postcard](banana-thread-postcard.txt) | Two landscape prints, a postmark motif and a fine double border. | 2 |

[All five threads snippets](banana-thread-snippets.txt), in the order shown above.

## Comms

| Template code | Design | GIFs |
| --- | --- | --- |
| [Keepsake](banana-comms-snippet.txt) | The original Banana phone with its contact header and incoming bubbles. | 1 |
| [Cameo](banana-comms-cameo.txt) | A centred circular contact GIF and rounded message bubbles. | 1 |
| [Ribbon](banana-comms-ribbon.txt) | A coloured header rule, round avatar and edged message bubbles. | 1 |
| [Canopy](banana-comms-canopy.txt) | An arched contact banner inside a curved phone frame. | 1 |
| [Postcard](banana-comms-postcard.txt) | A compact phone with a portrait on the right and a round home button. | 1 |

[All five comms snippets](banana-comms-snippets.txt), in the order shown above.

## Buds

| Template code | Design | GIFs |
| --- | --- | --- |
| [Sprout](banana-bud-sprout.txt) | A rounded card with a leaf-shaped portrait. | 1 |
| [Leaflet](banana-bud-leaflet.txt) | A folded notecard with a taped miniature GIF. | 1 |
| [Tendril](banana-bud-tendril.txt) | An arched side portrait beside a short passage. | 1 |
| [Twinleaf](banana-bud-twinleaf.txt) | Two overlapping character GIFs. | 2 |
| [Pressing](banana-bud-pressing.txt) | A narrow film still above a compact reply. | 1 |

[All five buds snippets](banana-buds-snippets.txt), in the order shown above.

## Editing and shared behaviour

The new snippets put profile URLs, names, `[text]`, GIFs and writing before decorative elements and the stylesheet link. The comms time and receipt are also editable. All eight new templates use plain opening `<p>` tags; closing `</p>` tags remain optional in their writing/message containers. Use `<br>` within a paragraph or bubble.

The thread examples retain the original lorem ipsum reply. Comms contain three short sample messages. Buds encourage replies of 100 words or fewer. None of the writing areas has a fixed-height scroll region or truncates longer replies.

All wrappers inherit the forum’s `--mgrgb1`, `--mgrgb2` and `--mgrgb3` RGB variables. These colours affect the frames, surfaces, motifs and accents. Bold and underline use the forward gradient (1 → 2 → 3); italics use its reverse (3 → 2 → 1). Explicit `html[color-mode="light"]` or `html[color-mode="dark"]` takes precedence over the system preference.

Comms are received phone messages by default. An optional `<p class="bc-sent">` makes a bubble outgoing. Legacy `bc-message` divs and the `bc-received` class remain supported. Character images can also appear inside a message. Device clocks, icons, receipts, home indicators and compose bars are visual parts of the forum design; no JavaScript is used in the post snippets.

The four new comms snippets share identical markup apart from their wrapper modifier and sample GIF. With the variations stylesheet loaded, change `bc-cameo`, `bc-ribbon`, `bc-canopy` or `bc-postcard` to switch appearance.

Thread modifiers are `bn-cameo`, `bn-ribbon`, `bn-canopy` and `bn-postcard`. Cameo and Canopy use one GIF; Ribbon and Postcard use two, and also support a single image. Use the corresponding snippet when switching between one- and two-GIF designs. Removing the modifier gives the original Keepsake appearance.

## Hosted CSS

The new thread snippets load:

```text
https://cdn.jsdelivr.net/gh/lexdoescodingnow/templates@main/banana/banana-thread-variations.css
```

The new comms snippets load:

```text
https://cdn.jsdelivr.net/gh/lexdoescodingnow/templates@main/banana/banana-comms-variations.css
```

Each stylesheet imports its existing Keepsake base, so posts still need only one stylesheet link. Variant rules require both the family wrapper and the variation class. The original files and the five Bud designs are unchanged.

Documentation is kept here, outside the forum snippets. Source and paragraph parsing are checked; appearance still needs to be viewed inside JCink.
