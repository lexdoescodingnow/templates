# Blue Hour · Character atelier

Open **[atelier.html](atelier.html)** in your browser. This single file contains the editor, the layout, and starter records for all 181 characters in the existing PI directory. You can download it and double-click it; there is nothing to install. Photos and Spotify players still need an internet connection.

**[See Sam's completed example](sam-preview.html)** · **[Sam's ready-to-paste forum post](sam-forum.txt)**

## Everyday editing

1. Choose a character or create a new one.
2. Edit the labelled fields. Add connections, songs and story entries with the corresponding buttons.
3. Pin up to three connections as the inner circle. Feature any relationship you want expanded as a ship, including past relationships or multiple partners.
4. Copy the forum post and paste it into your Blue Hour development post. The copy includes its `[dohtml]` wrapper and one hosted stylesheet link.
5. Save a library backup regularly. Import that backup on another computer or share it with Sara to continue editing.

Changes are saved in this browser when storage is available. A backup is a downloadable data file; you do not need to open or edit its contents. Browser saving does **not** publish to GitHub, update the live forum, or synchronise with Sara. Re-copy the forum post after changing its content. To keep a shared version in GitHub, upload the exported backup to the repository; import that same backup before either of you makes the next edit.

## One connected record

The same connection supplies its flavour, optional inner-circle card, optional ship feature, and related story links. Each story entry is added once and can refer to more than one connection. A group connection works alongside individual people. Relationship status is edited once for the profile header; individual connections can retain their own labels and histories.

The dossier brings identity, factual details, inner circle, ships and flavours, chronology, soundtrack, and optional continuity notes into one consistent layout. Blank optional sections disappear. Spotify songs retain their real players behind compact disclosures, with ordinary listening links as a fallback.

The **in-world date** controls chronology. A separate posting date is available. Dates can be a year, year-month, or full date. Undated entries stay in their supplied order at the end; the editor never guesses dates from topic numbers. Existing timeline entries can be marked as milestones.

## Included content

Sam is the worked example: his supplied profile facts, ten Spotify tracks, four flavour connections, and all five tracker links are preserved. His current age is **25**, and he is **partnered with Hoseong**, as confirmed by Lex. The location headline remains Los Angeles and the residence remains San Bernardino. None of the five tracker entries had an in-world date. No closest-three ranking was supplied, so none is invented.

The other cast records are starters from the existing character directory, not a migration of every development post. Their missing biographies, tags, playlists, timelines and closest connections can be filled in through the form. Ages are imported snapshots, not automatic birthday calculations. The original PI directory remains separate and unchanged.

## GitHub and forum delivery

The layout, editor, starter content and generators live together in `character-dossier/`. Shared forum styling is served from the `character-dossier-v1` branch of `lexdoescodingnow/templates` through jsDelivr. Keep that branch available while posts use its stylesheet URL. The editor has an advanced stylesheet field for a future permanent destination.

The exported forum post contains static HTML and a stylesheet link. It needs no in-post JavaScript, JSON fetch, tracker library, icon package, or copy of the earlier third-party tracker code. It follows the repository's member-group colours and Blue Hour light/dark mode. The browser editor uses JavaScript locally; that editor code is not included in forum posts.

The folder is also suitable for [GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages), which serves static HTML, CSS and JavaScript. The portable editor is usable without setting up Pages.

## Development

Run `node character-dossier/build.cjs` from the repository root to refresh the starter data, portable editor and Sam outputs. Run `node character-dossier/check.cjs` for the content-preservation and export checks. The build does not alter existing collections or the PI directory.

Sources: the existing `forum-posts/characters/characters.json` and `ship-names.json`, Lex's supplied Sam profile and tracker, and Lex's confirmation of the current age and relationship. Spotify iframe sizing follows the [official embed guide](https://developer.spotify.com/documentation/embeds/tutorials/creating-an-embed).
