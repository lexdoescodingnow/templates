# Leaf character PI directory

[Preview and search all 151 characters](character-directory-v2-preview.html)

The complete forum directory uses **five posts**. Replace the three older sections with current Parts 1–3, then add Parts 4–5 as separate posts. All alphabetical boundaries have changed. Each file includes its own complete `[dohtml]` block, static character cards, stylesheet loader, search and copy controls. The preview searches the whole directory; each forum post searches its own section.

| Forum file | Names | Characters |
| --- | --- | --- |
| [Part 1 — A–C](character-directory-v2-part-01.txt) | Aaron Wang through Cookie Chalongrat Vihokratana | 36 |
| [Part 2 — D–J](character-directory-v2-part-02.txt) | Davis Huang-Yoon through Jung Woobin | 35 |
| [Part 3 — K–O](character-directory-v2-part-03.txt) | Kai Jeong through Oliver Min-Peters | 36 |
| [Part 4 — P–V](character-directory-v2-part-04.txt) | Park Haeun through Vince Seok | 33 |
| [Part 5 — W–Z](character-directory-v2-part-05.txt) | Wang Linyu through Zhou Yujie | 11 |

`character-directory.txt` and `character-directory-v2.txt` are compatibility aliases for **Part 1 only**. Use all five numbered files for the full directory, posting each separately. `character-directory-parts.json` records their ranges, counts and byte sizes.

## Character details

The sixth batch added 43 characters on 28 September 2026, bringing the directory to 151. Every record includes an avatar, GIF, nickname, numeric age, pronouns, occupation, face claim and full-name CN field. The ❧ Leaf flourish, bold nicknames, bold organisations and partner names, italic face claims and outline-heart relationship framing are consistent throughout.

Every earlier “dating” status now reads **in a relationship with**. Married couples keep **married to**, and Cal Myung and Mun Dae keep **engaged to**. Where no relationship has been supplied or established by a partner's record, the status is omitted. Both partners remain listed individually for Choi Taeyang and Baek Yujun.

Job titles are written out. Matthew and Lena's “tv personality” is now “television personality”; earlier chief-officer expansions and Jude's “registered nurse at LACH” are retained. Stella and Kijoon use the same “idol / member of” structure as other group members. Group and company names retain their own spelling and abbreviations. Miren's group TÉA is bold; the separate “& soloist” role remains ordinary text.

Cal's malformed CD/nickname tag is repaired. Han Seoyeon's entry includes Mia Park, as explicitly established by Mia's supplied relationship. Partner names now include Micah Ahn, Jung Taejoo and William Park. Danwoo's partner is Gwan Janghoon, resolved from their reciprocal entries rather than the other character nicknamed Jay, Bae Jaehoon. Cal's CN remains `cal myung`, exactly as supplied, despite the shorthand “callum” in Mun's note.

See [the consistency audit](character-directory-audit.md) for the remaining missing partner profiles, possible source spelling errors and the list of characters without a supplied status. No unprovided surname, avatar, job or relationship has been invented.

Earlier corrections are preserved: Seo Hakyun is 24; Artie and Nate are married; Lyle and William are married; Toby and Kai have their corrected avatars; Dongmin's latest supplied name is Shin Dongmin. Ages, image URLs, pronouns and face claims retain the supplied information, with surrounding whitespace cleaned. Xue Yiyun, Mun Dae and Miren Su retain “any pronouns”; Seok Cam retains “they / them”. Diacritics and intentional nickname case such as X and JJ are preserved.

No automatic ageing is connected; Canopy remains the authority for future age updates. Updating this directory does not alter copied PI blocks in existing forum posts.

## Maintenance

`characters.json` holds the complete PI strings. Edit it and run `python forum-posts/characters/build-characters.py` from the repository root. The generator sorts by displayed full name without treating accent marks as separate letters, partitions at initial-letter boundaries, writes the numbered sections and manifest, and refreshes both preview filenames and Part 1 aliases. Every section is checked against a 60,000-byte UTF-8 build budget.

All cards, images, descriptions and complete PI code panels are static HTML. “View / copy PI code” works without JavaScript. The hosted `character-directory-v2.js` adds search and one-click copying without relying on `document.currentScript`. The style inherits member colours and respects the forum's light/dark modes. A failed clipboard request opens and selects the code for manual copying.

Code brackets are escaped, with opening brackets split into spans. This preserves exact copied text while keeping literal PI/PG/CD/CN tag openings out of serialized HTML, where the forum's character-faking script would otherwise process them. Keep this protection and static rendering when expanding the directory. Do not return to the original JSON-only script renderer.

The user confirmed the original v2 layout works on the live forum. This 151-character expansion passed local checks for complete and balanced fields, intended source edits, static rendering, delayed/script-detached initialization, compatibility with the forum character-faking script, exact copying of every PI code, 25 searches, reciprocal relationship status and complete coverage across five bounded sections. All preview copy panels match their forum files. Image URLs were preserved and checked against source data; live availability of every third-party image was not reverified.
