# Banana templates

The current collection contains **five threads, five comms and five buds**, completed on 6 September 2026.

| Set | Included designs | Copyable code |
| --- | --- | --- |
| Threads | Keepsake, Cameo, Ribbon, Canopy, Postcard | [All five thread snippets](banana-thread-snippets.txt) |
| Comms | Keepsake, Cameo, Ribbon, Canopy, Postcard | [All five comms snippets](banana-comms-snippets.txt) |
| Buds | Sprout, Leaflet, Tendril, Twinleaf, Pressing | [All five bud snippets](banana-buds-snippets.txt) |

Use the [collection guide](banana-collection.md) for individual template links and editing details. Download [banana-collection-preview.html](banana-collection-preview.html) and open it in a browser to compare all fifteen with light/dark, sample group-colour and narrow-width controls. The GIFs require an internet connection.

The [Bud guide](banana-buds.md) and [Bud preview](banana-buds-preview.html) provide a focused view of the miniature templates.

## Editing

Copy one complete `[dohtml]` block. Editable names, profile URLs, subtitles, GIFs and writing are near the top; the included stylesheet link belongs at the bottom. Start each paragraph or comms message with `<p>`. Closing `</p>` tags also work.

All templates inherit the forum's `--mgrgb1`, `--mgrgb2` and `--mgrgb3` RGB variables. Member colours affect the design itself. Bold and underline use the forward gradient; italics use the reverse. Explicit `html[color-mode="light"]` or `html[color-mode="dark"]` takes precedence over the system preference.

## Stylesheets

| File | Used by |
| --- | --- |
| [banana-keepsake-v2.css](banana-keepsake-v2.css) | Original thread and shared thread styling |
| [banana-thread-variations.css](banana-thread-variations.css) | Cameo, Ribbon, Canopy and Postcard threads; imports the shared thread styling |
| [banana-comms-keepsake-v3.css](banana-comms-keepsake-v3.css) | Original phone and shared comms styling |
| [banana-comms-variations.css](banana-comms-variations.css) | Cameo, Ribbon, Canopy and Postcard comms; imports the shared phone styling |
| [banana-buds-keepsake.css](banana-buds-keepsake.css) | All five buds |

The three short Keepsake compatibility stylesheets from this session forward earlier snippet links to the current styling: [banana-keepsake.css](banana-keepsake.css), [banana-comms-keepsake.css](banana-comms-keepsake.css) and [banana-comms-keepsake-v2.css](banana-comms-keepsake-v2.css). The earlier [compact thread snippet](banana-compact-thread-snippets.txt) is a copy of the original [Keepsake snippet](banana-keepsake-snippet.txt).

The retired July templates and unused font kit have been removed. The current designs use system fonts and embedded motifs; they have no dependency on that font kit. Project defaults are in [AGENTS.md](../AGENTS.md).
