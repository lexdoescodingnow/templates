# Banana Display

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
