# Blue Hour · Character atelier

Open **[atelier.html](atelier.html)** in your browser. This single file contains the editor, the layout, and starter records for all 181 characters in the existing PI directory. You can download it and double-click it; there is nothing to install. Photos, Spotify players and the map still need an internet connection.

**[See Sam's completed example](sam-preview.html)** · **[Ben's sand palette](ben-preview.html)** · **[Cookie's apricot palette](cookie-preview.html)** · **[Sam's ready-to-paste forum post](sam-forum.txt)**

The third version keeps the character's colour palette in a compact panel layout. Facts appear in deliberate pairs; connections use equal-size cards with partners first; the timeline uses short rows. Three hanging polaroids and a small city map replace the trait bubbles. The soundtrack shows one song at a time, with swipe scrolling and previous/next arrows that wrap back to the start. Older stylesheets remain available for existing posts.

## Everyday editing

1. Choose a character or create a new one.
2. Edit the labelled fields. Add connections, songs and story entries with the corresponding buttons.
   In Photos, colour & place, choose a colour, adjust the header crop, and add a separate portrait / PI image. Use starter appearance restores the supplied header/PI photos and palette while keeping other details.
3. Change the three polaroid names, images and optional links. For a map, enter a city label, use Find a place on OpenStreetMap, then paste the map address into OpenStreetMap link and choose Use this map view. Coordinates and zoom can also be edited directly. Clearing the coordinates hides the map. The pin is a location you set for the character, not live tracking. Ship details and shared stories can be expanded inside their connection card.
4. Copy the forum post and paste it into your Blue Hour development post. The copy includes its `[dohtml]` wrapper and one hosted stylesheet link.
5. Save a library backup regularly. Import that backup on another computer or share it with Sara to continue editing.

Changes are saved in this browser when storage is available. A backup is a downloadable data file; you do not need to open or edit its contents. Browser saving does **not** publish to GitHub, update the live forum, or synchronise with Sara. Re-copy the forum post after changing its content. To keep a shared version in GitHub, upload the exported backup to the repository; import that same backup before either of you makes the next edit.

## One connected record

The same connection supplies its flavour, ship details and related story links. Each story entry is added once and can refer to more than one connection. A group connection works alongside individual people. Relationship status is edited once for the profile header; individual connections can retain their own labels and histories. The three polaroids are independently editable photographs and captions.

The dossier brings identity, factual details, inner circle, location, ships and flavours, chronology, soundtrack, and optional continuity notes into one consistent layout. Blank optional sections disappear. Spotify songs retain their real players inside the horizontal carousel, with ordinary listening links as a fallback. A full playlist, if supplied, becomes the last slide. There is no automatic playback or automatic cycling. Legacy trait and pin data is preserved in backups but is no longer displayed.

The **in-world date** controls chronology. A separate posting date is available. Dates can be a year, year-month, or full date. Undated entries stay in their supplied order at the end; the editor never guesses dates from topic numbers. Existing timeline entries can be marked as milestones.

## Included content

Sam is the worked example: his supplied profile facts, ten Spotify tracks, four flavour connections, and all five tracker links are preserved. His current age is **25**, and he is **partnered with Hoseong**, as confirmed by Lex. His polaroids show Hoseong, Jiae and Hajun as requested. The location headline remains Los Angeles and the residence remains San Bernardino; the map uses a city-level San Bernardino pin. None of the five tracker entries had an in-world date.

The other cast records are starters from the existing character directory, not a migration of every development post. Their missing biographies, playlists, timelines, polaroids and maps can be filled in through the form. Ages are imported snapshots, not automatic birthday calculations. The original PI directory remains separate and unchanged.

## GitHub and forum delivery

The layout, editor, starter content and generators live together in `character-dossier/`. Shared forum styling is served from the `character-dossier-v1` branch of `lexdoescodingnow/templates` through jsDelivr. Keep that branch available while posts use its stylesheet URL. The editor has an advanced stylesheet field for a future permanent destination.

The exported forum post contains static HTML and a stylesheet link. It needs no in-post JavaScript, JSON fetch, tracker library, icon package, or copy of the earlier third-party tracker code. Character colour leads the panels, borders and highlights, with member colours retained for bold/italic text. It follows Blue Hour light/dark mode. The browser editor uses JavaScript locally; that editor code is not included in forum posts. The current stylesheet is `dossier-v3.css` with the isolated `bh-dossier-v3` wrapper; the earlier v1 and v2 stylesheets remain unchanged. Map and music embeds depend on the forum permitting their iframe providers; external links remain available if an embed cannot load.

The folder is also suitable for [GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages), which serves static HTML, CSS and JavaScript. The portable editor is usable without setting up Pages.

## Development

Run `node character-dossier/build.cjs` from the repository root to refresh the starter data, portable editor and Sam outputs. Run `node character-dossier/check.cjs` for the content-preservation and export checks. The build does not alter existing collections or the PI directory.

Sources: the existing `forum-posts/characters/characters.json` and `ship-names.json`, Lex's supplied Sam profile and tracker, and Lex's confirmed revisions. Spotify iframe sizing follows the [official embed guide](https://developer.spotify.com/documentation/embeds/tutorials/creating-an-embed). The map uses OpenStreetMap's [share/embed feature](https://wiki.openstreetmap.org/wiki/Export), with Sam's initial city pin from [San Bernardino's city record](https://www.openstreetmap.org/relation/253639).
