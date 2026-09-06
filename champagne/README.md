# Champagne · Cuvée

The first thread in the Champagne collection: engraved serif lettering, paired arched GIF frames, bubble trails, a fine double border and a champagne-coupe ornament. Inspired by the supplied Champagne poster's ivory and gold styling. Member colours flow through the title, crest, portrait frames, names, divider and formatting.

- [Copyable JCink snippet](champagne-cuvee.txt)
- [Interactive light/dark preview](champagne-preview.html) — download and open in a browser. Includes group-palette and narrow-width controls, plus copy/download buttons.
- [Shared stylesheet](champagne-cuvee-v1.css)

Copy the whole snippet, including `[dohtml]`, `[/dohtml]` and the final stylesheet link. All editable content appears before the decorative markup. Replace the two `[url]` and `[name]` pairs, the title, `[text]`, the two image `src` values and the lorem ipsum paragraphs. The GIF `object-position` values control the crop. Removing either image leaves a single centred GIF frame.

Writing uses plain `<p>` elements. Closing `</p>` tags are included for clarity; successive opening `<p>` tags also work. The sample uses native `<b>`, `<i>` and `<u>` formatting inside `[dohtml]`. The stylesheet also covers `strong` and `em`, and the corresponding HTML output when the forum parses `[b]`, `[i]` and `[u]`. BBCode parsing itself is handled by the forum.

The stylesheet inherits Blue Hour's RGB triplets `--mgrgb1`, `--mgrgb2` and `--mgrgb3`. Bold and underlined text use group 1 → group 2 → group 3; italic text reverses that gradient. Explicit `html[color-mode="light"]` and `html[color-mode="dark"]` take precedence over the system preference fallback. When no group variables are present, the design uses a champagne palette appropriate to the active mode.

The preview shows Toby and Jude as sample names; the copyable snippet retains `[name]`. Its copy/download actions return the same hosted-CSS snippet. The preview embeds its styling; the forum snippet loads it from jsDelivr. External GIFs and Google Fonts need an internet connection. Font fallbacks are included. No scripts run inside the forum snippet.

GIF sources: [Eric Sohn, bloomluvy on Tenor](https://tenor.com/view/eric-the-boyz-eric-sohn-%EC%97%90%EB%A6%AD-gif-18443610530332023836) and [Yoshinori Kanemoto, teumae on Tenor](https://tenor.com/view/yg-treasure-yoshi-yoshinori-kpop-cute-gif-17498243). Typography: [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond) and [Manrope](https://fonts.google.com/specimen/Manrope). Decorative motifs are embedded vector line work.
