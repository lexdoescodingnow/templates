# Leaf character PI directory

[Preview and search all 180 characters](character-directory-v2-preview.html)

The full forum directory uses **six posts**. Replace the earlier sections with the current numbered files. Parts 4–6 have new alphabetical boundaries; Part 2 is unchanged. Each file includes its own complete `[dohtml]` block, static character cards, stylesheet loader, search and copy controls. The preview searches the whole directory; each forum post searches its own section.

| Forum file | Names | Characters |
| --- | --- | --- |
| [Part 1 — A–B](character-directory-v2-part-01.txt) | Aaron Wang through Byun Yuseop | 23 |
| [Part 2 — C–G](character-directory-v2-part-02.txt) | Cal Myung through Gyeon Seunghwan | 35 |
| [Part 3 — H–K](character-directory-v2-part-03.txt) | Han Seoyeon through Kwon Ubin | 36 |
| [Part 4 — L–O](character-directory-v2-part-04.txt) | Lee Joonki through Oprah Winfrey | 34 |
| [Part 5 — P–T](character-directory-v2-part-05.txt) | Park Haeun through Trần Bảo | 36 |
| [Part 6 — V–Z](character-directory-v2-part-06.txt) | Valerie Kwon through Zhou Yujie | 16 |

`character-directory.txt` and `character-directory-v2.txt` are compatibility aliases for **Part 1 only**. Use all six numbered files for the full directory, posting each separately. `character-directory-parts.json` records their ranges, counts and byte sizes.

## Character details

The eighth batch added seven characters on 28 September 2026, bringing the directory to 180. Xiaoyang now has the supplied animated GIF, and Rain Jeon and Ryu Hyemi name each other consistently. Escaped URL punctuation has been cleaned and Nicky’s stray leading nickname space removed; the uppercase nickname B is retained. All supplied entries include an avatar, secondary image, nickname, numeric age, pronouns, occupation, face claim and full-name CN field. The ❧ Leaf flourish, bold nicknames, bold organisations and partner names, italic face claims and outline-heart relationship framing are consistent throughout.

Every earlier “dating” status reads **in a relationship with**. Married couples retain **married to**, and Cal Myung and Mun Dae retain **engaged to**. Where no relationship has been supplied or established by a partner's record, the status is omitted. Choi Taeyang, Baek Yujun and Elias Lim each list both other partners individually in bold.

The user confirmed Cal is the preferred displayed name and Callum is his birth name. Keep `cal myung` as the CN field and use Cal in partner references. Forest's face claim is corrected to `kim seokjin`, and Diego's to `samuel arredondo kim`. Kwon Ubin now has his own entry; Jaehwa's partner reference also uses his full name.

Duke's supplied Tenor page was resolved to its direct GIF, `https://media1.tenor.com/m/4H65zb14YZ0AAAAd/chu-siwoo-siwoo.gif`, from [the original Tenor page](https://tenor.com/view/chu-siwoo-siwoo-just-b-gif-16176571204859617693). Xiaoyang's old JPG is replaced with the user's new GIF URL, `https://64.media.tumblr.com/04bd1731504c32e7b24691ff601ec343/e3bdd1a9b92f498e-eb/s400x600/c1edb5c6b5b1d754dc9198754b87a6f924c8484c.gifv`. Ubin's workplace remains `7/11`, bolded as an organisation without introducing spaces into its name. Chunhee's group NYHD is bold, with the separate “& soloist” role in ordinary text.

Job titles are written out. Earlier chief-officer expansions, “television personality” and Jude's “registered nurse at LACH” are retained. Stella and Kijoon use “idol / member of”, matching other group members. Han Seoyeon includes her established relationship with Mia Park. Danwoo's partner is Gwan Janghoon, resolved through their reciprocal entries; Bae Jaehoon is a different Jay. Duplicate nicknames, including Hiro, never merge characters or override confirmed partner names.

Earlier corrections remain: Seo Hakyun is 24; Artie and Nate are married; Lyle and William are married; Toby and Kai have their corrected avatars; Dongmin's latest supplied name is Shin Dongmin. Meaningful diacritics, pronouns, titles in CN fields, and intentional nickname case such as X and JJ are preserved. No automatic ageing is connected; Canopy remains the authority for future age updates. Updating this directory does not alter copied PI blocks in existing forum posts.

See [the consistency audit](character-directory-audit.md). No missing required fields, unmatched partner references or conflicting reciprocal statuses remain in the supplied directory. All PG fields now contain direct GIF URLs. Characters without a supplied relationship omit the status field; no unprovided relationship has been invented.

## Maintenance

`characters.json` holds the complete PI strings. Edit it and run `python forum-posts/characters/build-characters.py` from the repository root. The generator sorts by displayed full name without treating accent marks as separate letters, partitions at initial-letter boundaries, writes the numbered sections and manifest, and refreshes both preview filenames and Part 1 aliases. Every section is checked against a 60,000-byte UTF-8 build budget.

All cards, images, descriptions and complete PI code panels are static HTML. “View / copy PI code” works without JavaScript. The hosted `character-directory-v2.js` adds search and one-click copying without relying on `document.currentScript`. The style inherits member colours and respects the forum's light/dark modes. A failed clipboard request opens and selects the code for manual copying.

Code brackets are escaped, with opening brackets split into spans. This preserves exact copied text while keeping literal PI/PG/CD/CN tag openings out of serialized HTML, where the forum's character-faking script would otherwise process them. Keep this protection and static rendering when expanding the directory. Do not return to the original JSON-only script renderer.

The user confirmed the original v2 layout works on the live forum. This 180-character expansion passed local checks for complete and balanced fields, intended source edits, static rendering, delayed/script-detached initialization, compatibility with the forum character-faking script, exact copying of every PI code, 36 searches, reciprocal relationship status and complete coverage across six bounded sections. All preview copy panels match their forum files. Image URLs were preserved and checked against source data; live availability of every third-party image was not reverified.
