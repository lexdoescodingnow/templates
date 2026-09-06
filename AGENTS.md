# Template project defaults

These are the user's defaults for new templates and requested revisions in this project.

- Keep forum snippets short: host shared CSS in this repository and include one stylesheet link inside each `[dohtml]` block. Put editable names, URLs, GIFs, timestamps and text before decorative markup and stylesheet links where possible.
- Use plain `<p>` elements for separate comms messages. Support successive opening `<p>` tags without requiring closing tags in the message container. Use ordinary paragraph markup for writing; avoid requiring a repeated class or div for every message.
- Use the member group's inherited `--mgrgb1`, `--mgrgb2` and `--mgrgb3` RGB variables. Let these colours affect the actual template design, including headers, borders, frames and appropriate surfaces. Keep the content readable on neutral light/dark surfaces. A subject's signature colour must not overwhelm the group palette.
- Bold (`b`, `strong`) and underline (`u`) use the forward gradient: group 1, group 2, group 3. Italics (`i`, `em`) use the reverse gradient: group 3, group 2, group 1.
- Support Blue Hour's `html[color-mode="light"]` and `html[color-mode="dark"]` conventions. An explicit forum mode takes precedence over a system preference fallback.
- Make comms resemble phone messages or another electronic messaging device by default, unless the user requests a different presentation. Preserve simple, editable message text and a character GIF slot.
- Keep related templates recognisably part of their themed set through typography and small motifs. Use the theme as an accent alongside member colours.
- Include `[url]`, `[name]` and `[text]` placeholders, supplied placeholder GIFs and lorem ipsum where appropriate. Do not put comments, hidden tips, instruction blocks or editing notes inside template HTML or CSS. Documentation belongs outside the template.
- Scope styles to each template's wrapper. Preserve older supported message markup during compatible updates. Use a fresh stylesheet filename for immediate use of changed snippets when cached CSS would prevent new behaviour; maintain older entry points where useful.
- Buds are miniature thread templates intended to encourage replies of 100 words or fewer. Keep their layouts compact, with ordinary paragraph markup and short placeholder replies.
- The Banana collection has five thread, five comms and five Bud choices. Preserve this five-of-each structure when extending or revising the collection, unless the user requests otherwise.
- The Champagne collection has five thread, five comms and five bud choices. Preserve this five-of-each structure when extending or revising it, unless the user requests otherwise. Give new variants distinct names that suit the theme.
- The Clementine collection has five thread, five comms and five bud choices. Preserve this five-of-each structure when extending or revising it, unless the user requests otherwise. Keep the named variants and their individual posting snippets in the collection preview.

