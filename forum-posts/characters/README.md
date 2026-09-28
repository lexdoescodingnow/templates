# Leaf character PI directory

[Preview and search all 67 characters](character-directory-v2-preview.html)

The complete forum directory now needs **two posts**. Replace the previous directory post with Part 1, then add Part 2 as another post. Each file includes its own complete `[dohtml]` block, styling loader, character cards, search and copy controls. The preview searches all 67 together; each forum post searches its own alphabetical section.

| Forum file | Names | Characters |
| --- | --- | --- |
| [Part 1 — A–L](character-directory-v2-part-01.txt) | Akara Siripong through Lyle Park | 36 |
| [Part 2 — M–Y](character-directory-v2-part-02.txt) | Malachi Zhong through Yoon Kijoon | 31 |

`character-directory.txt` and `character-directory-v2.txt` are compatibility aliases for **Part 1 only**. They are labelled “part 1 of 2” inside the widget. Use both numbered files for the complete collection; do not paste both into one post. `character-directory-parts.json` records the current sections and their byte counts.

## Character details

Descriptions use the ❧ Leaf flourish, bold nicknames, bold organisation and partner names, delicate separators, and italic face claims. Relationship text is framed by outline hearts: `♡ in a relationship with [b]partner[/b] ♡`, `♡ dating [b]partner[/b] ♡` or `♡ married to [b]partner[/b] ♡`. Characters without a supplied relationship have no status field: Alfie Shin, Jeon Yejoon, Jessica Kim and Kim Heechan.

The third batch added 31 characters on 28 September 2026. Artie is **married to Nate Chung**, and Lyle is **married to Will Park**, as explicitly corrected by the user. These supersede the earlier generic relationship wording. Seo Hakyun remains 24 following his 20 September birthday. Toby's corrected avatar remains `https://i.pinimg.com/1200x/f1/a4/b5/f1a4b527b22e1de26c6140264ee1b193.jpg`.

Partner shorthand resolves only through established names and nicknames. This batch supplies full names for Jeremy, Yuseop, Haoyu, Malachi, Jaeho, Zhiyuan, Valerie, Hiroshi and others. Li Tao's previous “zhiyuan” now reads “dr zhou zhiyuan”. Seojun's entry includes his relationship with Wenjun Zhu, explicitly established by Wenjun's supplied record. The complete name tags are preserved, including `dr zhou zhiyuan` and the capitalisation in `Kobayashi yuki` (with the accidental leading space removed).

Full names are still needed for **Beau, Jian, Taejoo, Song, Kota, Yohan, Caleb and Ultra**. Their supplied shorthand is retained until confirmed. Do not infer surnames from marriage, face claims or unrelated name tokens; in particular, Qiang Yichen's partner “song” is not Song Yonggi.

All supplied image URLs, ages, pronouns, occupations and face claims are retained. Xue Yiyun keeps “any pronouns”, Hwak Hoseong keeps the supplied spelling, and quoted occupation wording is preserved. Face claims consistently use the “looks like” label. No automatic ageing is connected; Canopy remains the authority for future age updates. Updating these files does not alter copied PI blocks in existing forum posts.

## Maintenance

`characters.json` holds the complete PI strings. Edit it and run `python forum-posts/characters/build-characters.py` from the repository root. The generator sorts by displayed full name, partitions at initial-letter boundaries, writes the numbered forum sections and manifest, and refreshes both preview filenames and Part 1 aliases. Every section is checked against a 60,000-byte UTF-8 build budget.

All cards, images, descriptions and complete PI code panels are static HTML. “View / copy PI code” works without JavaScript. The hosted `character-directory-v2.js` adds search and one-click copying without relying on `document.currentScript`. The style inherits member colours and respects the forum's light/dark modes. A failed clipboard request opens and selects the code for manual copying.

Code brackets are escaped, with opening brackets split into spans. This preserves exact copied text while keeping literal PI/PG/CD/CN tag openings out of serialized HTML, where the forum's character-faking script would otherwise process them. Keep this protection and static rendering when expanding the directory. Do not return to the original JSON-only script renderer.

The user confirmed the original v2 layout works on the live forum. This expansion is checked locally for exact PI copying, source data preservation, unique coverage across both sections, static rendering, the forum character-faking script, partner search and matching preview copy panels. The browser preview contains all characters and separate copy controls for each forum section.
