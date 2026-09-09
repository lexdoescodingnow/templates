# Oats verification

## Source checks

- Fifteen unique designs: five threads, five comms and five buds.
- Each snippet has one dohtml block and one stylesheet link after its editable content.
- URL, name and title placeholders appear before GIFs, writing and decoration.
- Posting templates and shared CSS contain no comments, hidden editing notes or template scripts.
- All snippets parse as HTML fragments with one writing area and bold, italic and underline examples.
- All five comms retain three sibling message paragraphs when closing paragraph tags are omitted.
- Every bud begins with 36 words.
- All fifteen model variants support zero, one, two and three GIFs. Zero GIFs omit the media block.
- Escaping preserves special characters in editable name fields.
- The first supplied URL was de-duplicated; both GIF endpoints returned HTTP 200 and image/gif content type on 9 September 2026.
- CSS Tree parsed the shared stylesheet without syntax errors. All 192 style rules are scoped to the Oats wrapper.
- Forward and reverse gradient definitions, explicit forum mode selectors and the system-dark fallback were checked.
- The embedded panicle SVG parses as valid XML.
- Model, build script, editor and embedded preview script pass Node syntax checks.
- The preview has fifteen design buttons, unique element IDs and embedded CSS and JavaScript.

- The pinned jsDelivr stylesheet returned HTTP 200 with text/css content type and matched the source byte-for-byte.

## Editor checks

An offline DOM simulation, with remote resources disabled and no layout rendering, checked all fifteen designs:

- Initial exported snippets match the named posting files exactly.
- Basic formatting BBCode becomes HTML bold, italic and underline.
- Consecutive opening paragraph tags become separate message paragraphs.
- Removing every GIF omits media markup; adding a GIF restores it.
- Name, title and writing edits persist when switching designs.
- Copied output matches the displayed code.
- Reset restores each design's defaults.
- Message-direction changes update the generated markup.
- Theme and member-colour controls update the preview's DOM values.
- Preview colour overrides do not appear in exported snippets.

## Limits

These are source and offline editor checks. Rendered appearance, responsive geometry and a live JCink post have not been tested. The available cloud browser rejected local-preview access earlier in this session; no alternate browser route was used.

Raw posting snippets use HTML emphasis. The editor converts the supported BBCode tags. The forum's own dohtml permissions, parsing and stylesheet policies still govern the final post.
