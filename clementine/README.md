# Clementine · Zest

The first thread template in the Clementine collection, inspired by the supplied Arthur & Nate poster. Zest uses engraved citrus motifs, fine double borders, an italic Bodoni Moda masthead and staggered portrait frames. Neutral paper and charcoal surfaces keep the writing readable; inherited member colours flow through the title, frames, decorative panel and formatting.

## Files

| File | Use |
| --- | --- |
| [clementine-zest.txt](clementine-zest.txt) | Complete, short JCink posting snippet |
| [clementine-zest-v1.css](clementine-zest-v1.css) | Shared stylesheet |
| [clementine-preview.html](clementine-preview.html) | Browser preview with light/dark and sample member colours, plus a copy-code button |

## Posting

Copy the complete text from `clementine-zest.txt`, including `[dohtml]` and `[/dohtml]`. The editable names, links, title, subtitle, GIFs and paragraphs appear before the decorative elements and stylesheet link.

Replace `[url]` with each character's profile URL, `[name]` with their name, and `[text]` with a thread subtitle. Change `Clementine` to a thread title if desired. Replace the lorem ipsum in `.ct-copy` with the reply, using ordinary `<p>` paragraphs. Both supplied Tumblr GIF URLs are already filled in; the `object-position` values next to them control their crops. Removing either image leaves a single wide GIF frame.

The snippet uses `<b>`, `<i>` and `<u>` for its formatting examples. The stylesheet also supports `<strong>` and `<em>`, including those produced by a forum's BBCode parser. Bold and underline use group colours 1→2→3; italics use 3→2→1. BBCode interpretation itself remains the forum's responsibility.

## Colours and compatibility

Member colours are inherited from `--mgrgb1`, `--mgrgb2` and `--mgrgb3`, in the comma-separated RGB format used by Blue Hour. No group class is hardcoded. Clementine, honey and leaf fallback colours apply where group variables are absent. The preview's extra palettes demonstrate inheritance without changing the copied snippet.

Blue Hour's `html[color-mode="light"]` and `html[color-mode="dark"]` conventions take priority over the system preference. The system dark-mode fallback applies only when the HTML element has no `color-mode` attribute.

The template is 540px wide at most and adapts to its container. All stylesheet selectors are scoped to `.clementine-zest`. The posting snippet has no script, IDs, comments, hidden tips or editing instructions. Citrus drawings are embedded in the stylesheet; GIFs, Google Fonts and the jsDelivr stylesheet require external access. System serif and sans-serif fallbacks remain available if web fonts fail.

The preview contains the same template CSS inline and the exact posting snippet in its copy field. Its controls sit outside the template. Source validation checks parsed HTML and CSS, selector scoping, editable-field order, gradient directions, theme selectors and agreement between the preview and posting snippet. Both supplied GIF URLs returned HTTP 200 with image/gif content and decoded successfully as animated images. Visual browser verification was blocked by this session’s local-file access policy; the live JCink parser has not been tested.
