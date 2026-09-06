# Banana templates

The current Banana set uses member-group colours throughout the design, with neutral light/dark surfaces and small Banana motifs. Project-wide authoring defaults are recorded in [AGENTS.md](../AGENTS.md).

## Thread template

Copy [banana-keepsake-snippet.txt](banana-keepsake-snippet.txt) into a JCink post. [banana-compact-thread-snippets.txt](banana-compact-thread-snippets.txt) contains the same snippet. Both include their own `[dohtml]` wrapper and load [banana-keepsake-v2.css](banana-keepsake-v2.css).

The thread layout retains its serif heading, staggered GIF portraits and botanical details. Member-group colours now supply the title gradient, header glow, leaf colours, GIF outlines and decorative rules. The writing sits on a neutral surface. A small banana illustration preserves the theme without turning the whole template yellow.

Edit the names, profile URLs, subtitle, GIF URLs and writing in the HTML at the top. Remove the second image for the centered single-GIF layout.

## Phone comms template

Copy [banana-comms-snippet.txt](banana-comms-snippet.txt) into a JCink post. It loads [banana-comms-keepsake-v3.css](banana-comms-keepsake-v3.css).

The 360px comms template now resembles a phone message screen, with a device frame, top clock and status indicators, camera cutout, contact header, character GIF, incoming message bubbles, visual message bar and home indicator. The header, borders, avatar frame, message bubbles and message-bar accent use the member-group palette. Banana appears as a small serif wordmark and fruit motif.

The first fields are the contact name, profile URL, status line, GIF and time. Start each message with a plain `<p>` inside `bc-messages`:

```html
<p>Lorem ipsum dolor sit amet.
<p>Consectetur adipiscing elit.
```

Closing `</p>` tags are optional in this message container. Explicit `<p>message</p>` also works. Use `<br>` for a new line within one bubble.

Messages align left by default, as received texts. For an outgoing message, use:

```html
<p class="bc-sent">Lorem ipsum dolor sit amet.</p>
```

The `bc-received` class also remains supported. Older `<div class="bc-message">` messages still work, including paragraphs inside one legacy message. Only direct paragraph children of `bc-messages` become separate bubbles.

Images and GIFs can appear inside a message:

```html
<p><img src="[url]" alt="Character attachment"></p>
```

The clock, receipt label and message bar are visual parts of a forum template. They do not send messages or report live device status. The message area grows with the text and has no fixed-height scroll region.

## Colours and formatting

The template wrappers inherit Blue Hour's RGB variables `--mgrgb1`, `--mgrgb2` and `--mgrgb3`; no per-post group name or colour entry is needed.

- Bold (`b`, `strong`) and underline (`u`) use group 1 → group 2 → group 3.
- Italics (`i`, `em`) use group 3 → group 2 → group 1.

The same member colours also affect the visible template surfaces. Neutral light/dark ink and surfaces preserve the reading area. Golden/olive fallbacks apply only when the forum does not supply member-group variables.

Explicit `html[color-mode="light"]` and `html[color-mode="dark"]` settings take precedence. Without a forum mode, both stylesheets follow the system preference.

## Hosted files

The short snippets load these current stylesheets directly:

```text
https://cdn.jsdelivr.net/gh/lexdoescodingnow/templates@main/banana/banana-keepsake-v2.css
https://cdn.jsdelivr.net/gh/lexdoescodingnow/templates@main/banana/banana-comms-keepsake-v3.css
```

Use the updated snippets for the new appearance immediately. Previous Keepsake CSS addresses import the current versions after caches refresh. jsDelivr caches branch URLs; see [its caching documentation](https://github.com/jsdelivr/jsdelivr#caching).

Template code contains no comments or hidden editing instructions. All CSS is scoped to the relevant wrapper. Markup, shorthand message parsing, embedded SVGs and hosted stylesheets are checked; live forum rendering is not part of these checks.

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

