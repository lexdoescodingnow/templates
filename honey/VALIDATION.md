# Honey validation

Validated 10 September 2026.

## Completed

- Fifteen uniquely named designs: five threads, five comms and five buds.
- Posting CSS parses successfully. All selectors are scoped to `.bh-honey`; there are no CSS comments.
- Every named posting file contains one complete `[dohtml]` block and one hosted stylesheet link. The linked name, title, time, GIFs and writing precede the decorative markup and stylesheet. Posting HTML contains no scripts, comments or hidden editing instructions.
- All fifteen snippets exactly match the initial code injected into the standalone editor.
- Simulated DOM checks passed for all fifteen designs: edited names and URLs, escaped attributes, `[b]`/`[i]`/`[u]` conversion, successive opening `<p>` message tags, image removal, paired-image additions, per-design edit persistence, reset, clipboard handler output and download filename/output generation.
- Comms direction controls produce received, sent and alternating markup. Theme, width and member-colour controls update the expected DOM values. Preview colour changes do not override inherited member colours in posting code.
- The editor removes executable markup, unsafe links and HTML comments from writing fields.
- Buds begin with 36-word replies. Longer writing has no fixed-height clipping rule.
- All image-dependent designs include CSS arrangements for empty media. The export removes empty media containers.
- Bold and underline use the forward member-colour gradient; italics use the reverse gradient. Explicit Blue Hour colour-mode selectors take precedence over system preference rules.
- The immutable stylesheet URL returned HTTP 200 with `text/css`; its bytes exactly matched the checked local stylesheet.
- Both exact supplied Tumblr `.gifv` URLs returned HTTP 200 with `image/gif` and `GIF89a` signatures.

## Limits

Browser URL policy blocked access to the local preview. Visual layout, actual browser clipboard permissions, narrow-width rendering and a live JCink post have not been verified. Editor checks used a simulated DOM; width and mode checks confirm the controls and CSS structure, not a rendered screenshot.

The standalone preview includes the actual posting CSS and an editor with 320 px, 550 px, light and dark controls for review in a browser. The GIFs are external resources and require a network connection.

## Hosted stylesheet

`https://cdn.jsdelivr.net/gh/lexdoescodingnow/templates@2f3e100fd0060773112ad7b345d433a81c642cfd/honey/honey-apiary-v1.css`
