# Banana templates

## Current thread template: Banana Keepsake

The current thread design uses butter-yellow paper, olive leaves, gold lettering, two staggered character GIFs, and a small banana illustration. It preserves the Banana design created in this conversation.

Copy the complete contents of [banana-keepsake-snippet.txt](banana-keepsake-snippet.txt) into a JCink post. The snippet includes its own `[dohtml]` wrapper. [banana-compact-thread-snippets.txt](banana-compact-thread-snippets.txt) contains the same current snippet.

The shared styling lives in [banana-keepsake.css](banana-keepsake.css). Each post loads it with:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/lexdoescodingnow/templates@main/banana/banana-keepsake.css">
```

The stylesheet link stays at the bottom of the snippet so the editable names, profile links, subtitle, GIF URLs, and writing appear first. The wrapper is `<div class="banana-keepsake">`. Keep the link inside the `[dohtml]` block.

The snippet is 1,817 bytes, compared with 9,334 bytes for the original self-contained version, using the same placeholder writing and GIFs.

### Per-post editing

- Change the two `[name]` and `[url]` values in the first line of content.
- Change `[text]` to the subtitle and replace the paragraphs inside `bn-copy` with your writing.
- Replace either image `src` with a character GIF URL. Remove the second image element for a centered single-GIF layout.
- Use `<b>`, `<i>`, and `<u>` within the HTML for the group-colour formatting.

Blue Hour's inherited `--mgrgb1`, `--mgrgb2`, and `--mgrgb3` variables supply the formatting colours automatically. The `html[color-mode="dark"]` switch supplies the dark palette; explicit light mode retains the light palette. If the forum does not set `color-mode`, the stylesheet follows the system preference.

The shared stylesheet contains all layout and decorative code, including the embedded botanical artwork. The post snippet contains no CSS block, JavaScript, comments, or hidden editing instructions. The `banana-keepsake` wrapper keeps the new design separate from older Banana classes on the same page.

### Shared updates

Editing `banana-keepsake.css` on `main` updates the styling for posts using the link after caches refresh. jsDelivr documents a 12-hour cache for branch URLs; see [jsDelivr caching](https://github.com/jsdelivr/jsdelivr#caching). The short HTML remains in each individual forum post, so character names and writing stay independent.

The extraction was checked against the original HTML and CSS: only the root class was renamed and the CSS was moved outside the post. It has not been tested inside the live forum.

## Companion comms template

[banana-comms-snippet.txt](banana-comms-snippet.txt) is the current companion to Banana Keepsake. It uses a compact 360px message card, a character GIF in an arched frame, warm yellow message bubbles, the same gold serif Banana title, and matching botanical artwork.

Copy the complete snippet into a JCink post. It uses `<div class="banana-comms-keepsake">` and loads [banana-comms-keepsake-v2.css](banana-comms-keepsake-v2.css) through the stylesheet link at the bottom. The comms stylesheet is independent of the thread stylesheet.

The editable name, profile URL, status line, GIF URL and timestamp are first. Start each text message with a plain `<p>` inside `bc-messages`. Like the forum example, closing `</p>` tags are optional here: the next `<p>` starts another bubble. Explicit `<p>message</p>` also works. Use `<br>` for a line break within one bubble. Replace or add message lines directly. The timestamp and Delivered label are editable display text, not live messaging indicators.

For a received message, add the `bc-received` class to its paragraph:

```html
<p class="bc-received">Lorem ipsum dolor sit amet.</p>
```

An image or GIF can also go inside a message:

```html
<p><img src="[url]" alt="Character attachment"></p>
```

Bold, italic and underlined text uses the same inherited Blue Hour group colours as the thread template. Light/dark colours use the same forum switch and system fallback. Text grows with the messages; there is no fixed-height message area. The comms selectors are scoped to their own wrapper so both templates can appear together.

Existing `<div class="bc-message">` messages remain supported, including paragraphs inside one legacy bubble. Only direct paragraph children of `bc-messages` become new bubbles. The earlier `banana-comms-keepsake.css` address imports the current version after its cache refreshes; the updated snippet links directly to v2 so it can be used immediately.

The copy-paste snippet has no comments, hidden instructions, inline stylesheet or JavaScript. Its hosted CSS and markup received static checks; shorthand paragraphs were parsed and checked as sibling messages. Live forum rendering has not been tested.

## Banana Display

Banana Display is the custom high-contrast serif used for the Banana template family. This folder contains the live JCink-ready font integration layer, OpenType utility classes, an editable `[dohtml]` example, licence information, and validation notes for Prototype 0.1.

## Hosted web font

The live stylesheet loads:

```text
banana/assets/BananaDisplay-Prototype01.woff2
```

WOFF2 is the production browser format used by the Banana templates. The desktop TTF and OTF builds remain available in the project font kit but are not required by JCink.

## JCink setup

Place this line immediately after `[dohtml]`:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/lexdoescodingnow/templates@main/banana/banana-display.css">
```

Then apply one of the font classes:

```html
<h1 class="banana-display">Banana</h1>
<h1 class="banana-display banana-display--swash">Banana</h1>
<h1 class="banana-display banana-display--ligatures">BANANA</h1>
<h1 class="banana-display banana-display--signature">BANANA</h1>
```

## OpenType features

- `banana-display`: clean default alphabet with kerning and standard ligatures.
- `banana-display--swash`: enables Stylistic Set 01 (`ss01`) for the decorative A, B, N, Q, R, Y, and Z alternates.
- `banana-display--ligatures`: enables discretionary ligatures (`dlig`) for BA, AN, NA, ANA, and BANANA combinations.
- `banana-display--signature`: enables both the decorative alternates and discretionary ligatures.

For direct use inside an existing selector:

```css
.banana-title {
  font-family: "Banana Display", "Times New Roman", serif;
  font-synthesis: none;
  font-kerning: normal;
  font-feature-settings: "kern" 1, "liga" 1, "dlig" 1, "ss01" 1;
}
```

## Cache-safe URLs

During active development, `@main` serves the current merged version. For a finished production template, replace `@main` with a specific commit SHA so later font revisions cannot unexpectedly change an older template.

## Prototype status

Prototype 0.1 contains 347 glyphs and 346 encoded characters, including uppercase and lowercase Latin, numerals, punctuation, accented characters, stylistic alternates, discretionary ligatures, GSUB features, GPOS kerning, and web-font delivery.

The next drawing pass is expected to refine G, J, K, Q, R, S, and Z and further tune the decorative flourishes after live Banana-template testing.

## Licence

Banana Display is a modified font structurally based on GFS Didot by the Greek Font Society and is distributed under the SIL Open Font License 1.1. The reserved name `GFS Didot` is not used for this derivative. See `OFL.txt`.
