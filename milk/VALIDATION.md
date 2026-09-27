# Milk layout repair validation

Checked 27 September 2026.

## Corrections

- GIFs use independent `mk3-portrait` grid frames. Borders and padding belong to the frame; its image fills the interior with `object-fit: cover`. Clipping is restricted to image frames, not writing or entire cards.
- Cap Kiss and Carton Call portraits keep square proportions; Dairy Dial portraits follow their column width. Sipmates keeps explicit paired tracks. Wholehearted Pour and Dairy Dial no longer draw outlines outside their portrait boxes.
- Milkglass Letter, Dairy Dial, Sipmates and Cap Kiss reflow at narrow container widths. Added images wrap or stack; removing all images removes their media container.
- Splashlet’s accent sits in a grid cell. Droplet masks fit their reserved dimensions without rotation overflow. Morning Delivery reserves a full carton slot. Device controls keep their own minimum height and timestamps reserve battery space.
- Scoped resets cover pseudo-elements and first letters as well as template elements. The new `mk3` decorations are isolated from earlier controls. Old `mk2` decorations and direct-image Milk markup remain supported.

## Checks completed

- All 15 snippets exactly match the editor model: five threads, five comms and five buds. GIF defaults, editable member names and crop positions are retained. Bud sample writing stays under 100 words. Empty GIF entries are filtered out.
- Static selector/cascade comparisons cover 360 markup/query cases: 15 designs, zero/one/two/four images, new and already-posted Milk markup, and 520px/300px/210px assumed container widths. Each case is compared with both older stylesheets before and after the repair stylesheet. No differing declarations remain, including generated pseudo-elements and first-letter rules. This is a source-level cascade comparison, not a browser computed-layout test; it does not expand every CSS shorthand.
- CSS rules and selectors parse; JavaScript syntax checks pass. New snippets each contain one direct `@main/milk/milk-bottlelight-standalone-v2.css` link. Posting HTML and CSS contain no comments or hidden editing instructions.
- The v1 and v2 standalone Milk endpoints contain identical repaired CSS and cached font-face rules without imports. The original Italian Cuisine stylesheet is unchanged. Both editable preview addresses contain identical rebuilt content.
- All 15 forum examples and copyable blocks are rebuilt. Examples retain lorem ipsum; copyable writing uses `[TEXT GOES HERE]` or `[MESSAGE GOES HERE]`. Existing Italian Cuisine forum addresses remain identical Milk aliases.
- The inventory still contains 860 designs across 60 collection entries. The other 845 design records are unchanged. Every file in the complete forum ZIP matches the rebuilt directory byte for byte.

## Rendering limit

Local HTTP and file previews were rejected by the Cloud Browser security policy. No visual browser rendering, live editor interaction or authenticated JCink posting was completed. These checks establish source consistency and stylesheet isolation, but cannot confirm the exact appearance under the forum’s own skin. GIFs and fonts continue to depend on their remote hosts.
