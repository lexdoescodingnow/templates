# Leaf character PI directory

[Preview and search all 180 characters](character-directory-v2-preview.html)

The full forum directory uses **six posts**. Replace all six earlier sections with the current numbered files to use the directory-wide lookup. Character data, alphabetical ranges and section counts are unchanged by this lookup update. Each file includes its own complete `[dohtml]` block, static character cards, stylesheet loader, and embedded search and copy controls. Every search box searches all 180 names, nicknames and partner references and lists the matching names with their forum part number and letter range. An entry on the current page can be opened directly from its result; an entry on another page shows which forum section to open. The lookup does not invent cross-page post links.

| Forum file | Names | Characters |
| --- | --- | --- |
| [Part 1 — A–B](character-directory-v2-part-01.txt) | Aaron Wang through Byun Yuseop | 23 |
| [Part 2 — C–G](character-directory-v2-part-02.txt) | Cal Myung through Gyeon Seunghwan | 35 |
| [Part 3 — H–K](character-directory-v2-part-03.txt) | Han Seoyeon through Kwon Ubin | 36 |
| [Part 4 — L–O](character-directory-v2-part-04.txt) | Lee Joonki through Oprah Winfrey | 34 |
| [Part 5 — P–T](character-directory-v2-part-05.txt) | Park Haeun through Trần Bảo | 36 |
| [Part 6 — V–Z](character-directory-v2-part-06.txt) | Valerie Kwon through Zhou Yujie | 16 |

`character-directory.txt` and `character-directory-v2.txt` are compatibility aliases for **Part 1 only**. Use all six numbered files for the full directory, posting each separately. `character-directory-parts.json` records their ranges, counts and byte sizes.

Copy the raw contents of each numbered TXT file, including the opening `[dohtml]` and closing `[/dohtml]`, into its own forum post. The stylesheet is near the beginning. The complete search and copy script is embedded at the end of each block, matching the working ship-template directory's inline delivery approach. Keep the whole block together. The six alphabetical divisions and every PI code are unchanged.

These snippets use in-post search with no external search hyperlink. No external JavaScript request or JSON fetch is required. The browser preview and [Part 1 delivery preview](character-directory-delivery-preview.html) also exercise the complete embedded controls.

The refreshed forum HTML supplied on 28 September 2026 exposed the embedded-script failure: the forum changed backslashes to `&#092;`, inserted spaces and `<br />` inside long JavaScript tokens, and converted symbols such as `(r)` to HTML entities. The first altered regular expression throws a syntax error, so search and Copy PI never initialize. Earlier tests had not reproduced this server-side formatting.

The current builder emits ASCII-only embedded JavaScript without backslashes, avoids the forum's symbol shortcuts, and puts safe whitespace between JavaScript tokens so no unbroken stretch exceeds 40 characters. Accented names and interface symbols are produced with character codes, preserving their displayed and searchable spelling. The script remains ordinary JavaScript; no executable text is decoded or evaluated. Readable source files and the hosted compatibility bundles remain available. The user confirmed that this correction restored working search on the live forum.

The forum's character script also serializes and rebuilds post content. This preserves generated markup but resets the JavaScript initialization flags, which previously created three copies of the search help line. Locator initialization now removes its previous help, count and results elements before recreating and binding them. Repeated forum-script rebuilds were tested across all six sections: each retains one help line and one results panel, with working name lookup, clearing and copy controls.

## Finding a character

Search a given name, nickname or full name from any section. For example, **Jinseok** or **Jinny** finds **Choi Jinseok — Part 2 · C–G**, even from Part 1. The alphabetical filing remains based on the displayed full name, so Korean/Chinese/Japanese and Western naming order does not need to be guessed before searching.

Names and nicknames rank ahead of partner matches. Full-name, nickname and partner lookup covers all 180 characters; the local card filter also reads occupations, groups and face claims from the cards present in that section. A search for Jinseok therefore places his own entry ahead of Lucas's related partner match. Local character cards still filter below the directory-wide location results.

When the destination card is present anywhere on the current page, its result is a button that reveals and focuses the card. If the destination is on another forum page, the result states its part number and range. Direct cross-page navigation would require the actual forum post URLs; none have been invented.

## Character details

The eighth batch added seven characters on 28 September 2026, bringing the directory to 180. Xiaoyang now has the supplied animated GIF, and Rain Jeon and Ryu Hyemi name each other consistently. Escaped URL punctuation has been cleaned and Nicky’s stray leading nickname space removed; the uppercase nickname B is retained. All supplied entries include an avatar, secondary image, nickname, numeric age, pronouns, occupation, face claim and full-name CN field. The ❧ Leaf flourish, bold nicknames, bold organisations and partner names, italic face claims and outline-heart relationship framing are consistent throughout.

Every earlier “dating” status reads **in a relationship with**. Married couples retain **married to**, and Cal Myung and Mun Dae retain **engaged to**. Where no relationship has been supplied or established by a partner's record, the status is omitted. Choi Taeyang, Baek Yujun and Elias Lim each list both other partners individually in bold.

The user confirmed Cal is the preferred displayed name and Callum is his birth name. Keep `cal myung` as the CN field and use Cal in partner references. Forest's face claim is corrected to `kim seokjin`, and Diego's to `samuel arredondo kim`. Kwon Ubin now has his own entry; Jaehwa's partner reference also uses his full name.

Duke's supplied Tenor page was resolved to its direct GIF, `https://media1.tenor.com/m/4H65zb14YZ0AAAAd/chu-siwoo-siwoo.gif`, from [the original Tenor page](https://tenor.com/view/chu-siwoo-siwoo-just-b-gif-16176571204859617693). Xiaoyang's old JPG is replaced with the user's new GIF URL, `https://64.media.tumblr.com/04bd1731504c32e7b24691ff601ec343/e3bdd1a9b92f498e-eb/s400x600/c1edb5c6b5b1d754dc9198754b87a6f924c8484c.gifv`. Ubin's workplace remains `7/11`, bolded as an organisation without introducing spaces into its name. Chunhee's group NYHD is bold, with the separate “& soloist” role in ordinary text.

Job titles are written out. Earlier chief-officer expansions, “television personality” and Jude's “registered nurse at LACH” are retained. Stella and Kijoon use “idol / member of”, matching other group members. Han Seoyeon includes her established relationship with Mia Park. Danwoo's partner is Gwan Janghoon, resolved through their reciprocal entries; Bae Jaehoon is a different Jay. Duplicate nicknames, including Hiro, never merge characters or override confirmed partner names.

Earlier corrections remain: Seo Hakyun is 24; Artie and Nate are married; Lyle and William are married; Toby and Kai have their corrected avatars; Dongmin's latest supplied name is Shin Dongmin. Meaningful diacritics, pronouns, titles in CN fields, and intentional nickname case such as X and JJ are preserved. No automatic ageing is connected; Canopy remains the authority for future age updates. Updating this directory does not alter copied PI blocks in existing forum posts.

See [the consistency audit](character-directory-audit.md). No missing required fields, unmatched partner references or conflicting reciprocal statuses remain in the supplied directory. All PG fields now contain direct GIF URLs. Characters without a supplied relationship omit the status field; no unprovided relationship has been invented.

## Maintenance

`characters.json` holds the complete PI strings. Edit it and run `python forum-posts/characters/build-characters.py` from the repository root. The generator sorts by displayed full name without treating accent marks as separate letters, partitions at initial-letter boundaries, writes the numbered sections and manifest, and refreshes both preview filenames, Part 1 aliases, and the directory-wide location index. The same partition data produces every lookup label, preventing a name from pointing to the wrong section. Every section is checked against a 60,000-byte UTF-8 build budget.

All cards, images, descriptions and complete PI code panels are static HTML. “View / copy PI code” works without JavaScript. Search and Copy PI buttons are created by the embedded enhancement when it starts. Each snippet contains the complete core and locator plus a compact name/nickname/partner index; the forum section labels are derived from that same index. No redirects, script loaders or JSON-fetch dependencies are used by the current snippets. The standalone preview additionally supports global searches of complete profile descriptions because all 180 cards are present there.

The builder reduces redundant markup and shortens selected internal JavaScript identifiers while preserving the original six ranges and the 60,000-byte UTF-8 budget. `vendor/rjsmin.py` is the vendored rJSmin build-time whitespace minifier; it is not loaded by a browser. Keep its included license notice. After minification, the builder applies the forum-safe string and whitespace rules above. Do not minify the final posting code again. Readable JavaScript sources remain in `character-directory-v2.js` and `character-directory-locator.js`. The full v1/v2 compiled script endpoints are still generated for compatibility with earlier posts. Styling remains hosted in `character-directory-v2-locator-v1.css` and inherits member colours and the forum's light/dark modes.

Run `node forum-posts/characters/tests/check-forum-script.cjs` after rebuilding. It reproduces the actual saved-page regular-expression syntax error, verifies that the generated scripts survive entity/symbol conversion and long-token wrapping, and checks the original six section ranges and posting budgets.

Opening brackets in copy text remain HTML-escaped. The PI/PG/CD/CN field openings also remain split into spans so the forum's character-faking script cannot consume them. Formatting-tag brackets do not need extra spans. Complete copied strings remain identical to `characters.json`. Do not return to JSON-only card rendering or rely on `document.currentScript`.

The inline revision was tested with external resource loading disabled in all six parts, both independently and through Blue Hour's saved character-faking script. Every inline search initialized, Jinseok and Jinny located Part 2 · C–G, all 180 PI copies matched exactly, and all original part ranges and counts were preserved.

The user confirmed the original v2 layout works on the live forum. This 180-character expansion passed local checks for complete and balanced fields, intended source edits, static rendering, delayed/script-detached initialization, compatibility with the forum character-faking script, exact copying of every PI code, 36 searches, reciprocal relationship status and complete coverage across six bounded sections. All preview copy panels match their forum files. Image URLs were preserved and checked against source data; live availability of every third-party image was not reverified.

The lookup update also passed checks for all 180 location mappings, Jinseok/Jinny discovery from every section, identity-first ordering, destinations absent from the current page, same-page jumps and focus, late-added sections, duplicate script loading, both legacy/enhanced script orders, clearing and Escape. All 180 copied PI strings remain exact.
