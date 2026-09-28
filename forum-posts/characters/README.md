# Leaf character PI directory

[Preview and search all 85 characters](character-directory-v2-preview.html)

The complete forum directory now uses **three posts**. Replace both earlier forum sections with the current Parts 1 and 2, then add Part 3 as another post. The alphabetical boundaries have changed; replace the complete older blocks rather than appending to them. Each file includes its own complete `[dohtml]` block, styling loader, character cards, search and copy controls. The preview searches all 85 together; each forum post searches its own alphabetical section.

| Forum file | Names | Characters |
| --- | --- | --- |
| [Part 1 — A–I](character-directory-v2-part-01.txt) | Aaron Wang through Isaiah Park | 30 |
| [Part 2 — J–R](character-directory-v2-part-02.txt) | Jake Lee through Ryan Min | 30 |
| [Part 3 — S–Y](character-directory-v2-part-03.txt) | Sato Hyunwoo through Yoon Kijoon | 25 |

`character-directory.txt` and `character-directory-v2.txt` are compatibility aliases for **Part 1 only**. They are labelled “part 1 of 3” inside the widget. Use all three numbered files for the complete collection; post each file separately. `character-directory-parts.json` records the current sections and their byte counts.

## Character details

Descriptions use the ❧ Leaf flourish, bold nicknames, bold organisation and partner names, delicate separators, and italic face claims. Relationship text is framed by outline hearts: `♡ in a relationship with [b]partner[/b] ♡`, `♡ dating [b]partner[/b] ♡` or `♡ married to [b]partner[/b] ♡`. Characters without a supplied relationship have no status field: Alfie Shin, Cho Minho, Jeon Yejoon, Jessica Kim, Kim Heechan, Kim Jihwan and Wei Bowen.

The fourth batch added 18 characters on 28 September 2026, bringing the directory to 85. Artie is **married to Nate Chung**, and Lyle is **married to Will Park**, as explicitly corrected by the user. These supersede the earlier generic relationship wording. Seo Hakyun remains 24 following his 20 September birthday. Toby's corrected avatar remains `https://i.pinimg.com/1200x/f1/a4/b5/f1a4b527b22e1de26c6140264ee1b193.jpg`.

Job titles are written out: Jake is chief content officer, River is chief security officer, Isaiah is chief marketing officer, and Park Taein and Seojun are chief executive officers. Toby's COO is expanded to chief operating officer and Dom's HR role to head of human resources. Jude is a registered nurse at **LACH**. Company, hospital and group names retain their established abbreviations, and the newly supplied chief medical and chief property officer roles are preserved exactly.

Partner shorthand resolves only through established names and nicknames. The fourth batch identifies Beau as Gil Bokyung, Ultra as Gi Daehyun, Jian as Jian Cheng, Kota as Segasaki Kota and Yohan as Jang Yohan; their existing partners' PI descriptions now use these full names. Bandy's full name retains the supplied diacritics: Bāng Dí Wang. Aaron's partner text also preserves them.

The latest supplied Dongmin block uses **Shin Dongmin**, superseding the earlier “Song Dongmin” reference. His CN tag stays `shin dongmin`, and Yonggi's PI now says he is married to **Shin Dongmin**. Dongmin's reciprocal entry names Song Yonggi. Artie and Lyle retain their confirmed marriage wording.

Adrian's entry includes the relationship with Shane Kang explicitly established by Shane's supplied record, just as Seojun's relationship with Wenjun was established by Wenjun's earlier record. Full names are still needed for **Taejoo, Song, Caleb and Ubin**. Their supplied shorthand is retained until confirmed. Do not infer surnames from marriage, face claims or unrelated name tokens; in particular, Qiang Yichen's partner “song” is not Song Yonggi.

All supplied image URLs, ages, pronouns and face claims are retained; occupations include the requested corrections and written-out titles. Xue Yiyun keeps “any pronouns”, Hwak Hoseong keeps the supplied spelling, and quoted occupation wording is preserved. Face claims consistently use the “looks like” label. No automatic ageing is connected; Canopy remains the authority for future age updates. Updating these files does not alter copied PI blocks in existing forum posts.

## Maintenance

`characters.json` holds the complete PI strings. Edit it and run `python forum-posts/characters/build-characters.py` from the repository root. The generator sorts by displayed full name without treating accent marks as separate letters, partitions at initial-letter boundaries, writes the numbered forum sections and manifest, and refreshes both preview filenames and Part 1 aliases. Every section is checked against a 60,000-byte UTF-8 build budget.

All cards, images, descriptions and complete PI code panels are static HTML. “View / copy PI code” works without JavaScript. The hosted `character-directory-v2.js` adds search and one-click copying without relying on `document.currentScript`. The style inherits member colours and respects the forum's light/dark modes. A failed clipboard request opens and selects the code for manual copying.

Code brackets are escaped, with opening brackets split into spans. This preserves exact copied text while keeping literal PI/PG/CD/CN tag openings out of serialized HTML, where the forum's character-faking script would otherwise process them. Keep this protection and static rendering when expanding the directory. Do not return to the original JSON-only script renderer.

The user confirmed the original v2 layout works on the live forum. This expansion is checked locally for exact PI copying, source data preservation, unique coverage across all three sections, static rendering, the forum character-faking script, partner search and matching preview copy panels. The browser preview contains all characters and separate copy controls for each forum section.
