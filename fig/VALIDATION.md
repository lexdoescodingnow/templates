# Fig replacement validation

Checked 27 September 2026.

- All 15 supported Portuguese Cuisine designs are now Fig: five threads, five comms and five buds. Names are unique across the complete catalogue. Seojun & Wenjun, the two original GIF URLs and each design's initial GIF count are retained.
- 561 parser, DOM and editor assertions passed. All snippets match the content model and default editor exports. Both editable preview addresses contain identical Fig content.
- The standalone stylesheet matches its source exactly, has no imports or comments, and scopes every selector to `.fig-v1`. Each new portrait uses a separate `fg1-portrait` frame; decorations occupy reserved cells or device areas.
- 120 source-level legacy stylesheet cases passed: 15 designs × zero/one/two/four images × two retained Portuguese Cuisine stylesheets. No old selector matches the new markup, so neither old-before-new nor new-before-old load order can apply those legacy declarations to Fig. This is a selector check, not a computed-layout test.
- Plain comms paragraphs, including successive opening `<p>` tags, form separate messages. Zero images omit the media container. Added images use independent frames. Bud examples stay under 100 words.
- Editor design switching, BBCode conversion, escaping, unsafe-input removal, image add/remove, per-design edits, long writing, reset, gallery selection, mode controls, palette changes, clipboard copying and manual-copy fallback passed.
- Explicit forum modes take priority over the system fallback. Member colours are inherited; forward bold/underline and reversed italic gradient declarations were checked. Preview palette values are not exported.
- The forum masterpost and its compatibility alias contain Fig examples immediately above concise copyable code. The masterlist and complete forum ZIP include Fig in place of Portuguese Cuisine.
- The inventory remains at 860 designs across 60 collection entries. The other 845 source design records are unchanged. The rebuilt manifest also picks up the already-existing Soft Spill description correction from Milk's current source metadata.

## Rendering limit

The Cloud Browser rejected the local HTTP preview with `ERR_BLOCKED_BY_CLIENT`. No screenshot or live JCink layout test was completed. The checks above establish source consistency, editor behaviour and stylesheet isolation; exact appearance under the forum skin remains unverified. GIFs depend on their remote host.
