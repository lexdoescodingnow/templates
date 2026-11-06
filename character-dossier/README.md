# Blue Hour · Character atelier

Open **[atelier.html](atelier.html)** in your browser. This single file contains the editor, the layout, and starter records for all 181 characters in the existing PI directory. You can download it and double-click it; there is nothing to install. Photos, Spotify players and the map still need an internet connection.

**[See Sam's completed example](sam-preview.html)** · **[Ben's photo theme](ben-preview.html)** · **[Cookie's photo theme](cookie-preview.html)** · **[Sam's ready-to-paste forum post](sam-forum.txt)**

The fifth version automatically matches the panel colours to the header photograph, separates flavours from brands, and makes the three hanging polaroids smaller. Its clean location map is created after Blue Hour processes the post, avoiding the quotation-mark changes that broke the earlier map in the forum preview. The compact panels, song carousel, readable Title Case and earlier stylesheet addresses are preserved.

## Everyday editing

1. Choose a character or create a new one.
2. Edit the labelled fields. Add connections, songs and story entries with the corresponding buttons.
   In Photos, colour & place, replace the header photo and its colours will be matched automatically. Adjust the crop and add a separate portrait / PI image as needed. Manual colour is an optional override. Use starter appearance restores the supplied header/PI photos while keeping other details.
3. Change the three polaroid names, images and optional links. For a map, enter a city label, use Find a place on OpenStreetMap, then paste the map address into OpenStreetMap link and choose Use this map view. Coordinates and zoom can also be edited directly. Clearing the coordinates hides the map. The pin is a location you set for the character, not live tracking. Ship details and shared stories can be expanded inside their connection card.
4. Copy the forum post and paste it into your Blue Hour development post. The copy includes its `[dohtml]` wrapper, one hosted stylesheet and one shared script for the map and automatic colour matching.
5. Save a library backup regularly. Import that backup on another computer or share it with Sara to continue editing.

Changes are saved in this browser when storage is available. A backup is a downloadable data file; you do not need to open or edit its contents. Browser saving does **not** publish to GitHub, update the live forum, or synchronise with Sara. Re-copy the forum post after changing its content. To keep a shared version in GitHub, upload the exported backup to the repository; import that same backup before either of you makes the next edit.

## One connected record

Each connection has separate optional Flavour and Brand fields, alongside its relationship type and related story links. A flavour or brand name does not itself establish romance; Partner is recorded separately. Each story entry is added once and can refer to more than one connection. A group connection works alongside individual people. Relationship status is edited once for the profile header; individual connections can retain their own labels and histories. The three polaroids are independently editable photographs and captions.

The dossier brings identity, factual details, inner circle, location, ships and flavours, chronology, soundtrack, and optional continuity notes into one consistent layout. Blank optional sections disappear. Spotify songs retain their real players inside the horizontal carousel, with ordinary listening links as a fallback. A full playlist, if supplied, becomes the last slide. There is no automatic playback or automatic cycling. Legacy trait and pin data is preserved in backups but is no longer displayed.

The **in-world date** controls chronology. A separate posting date is available. Dates can be a year, year-month, or full date. Undated entries stay in their supplied order at the end; the editor never guesses dates from topic numbers. Existing timeline entries can be marked as milestones.

## Included content

Sam is the worked example: his supplied profile facts, ten Spotify tracks, four connections, and all five original tracker links are preserved. **Cereal** is his flavour with Hoseong; **Lindor** (Dom), **Mochidoki** (CRAZHES), and **Pringles** (Jiae) are brands. The three renamed comms keep their original links, now titled Lindor Pistachio, Pringles Texas BBQ and Mochidoki Cake Batter. The newer Cereal Bar comms is also included. His current age is **25**, and he is **partnered with Hoseong**, as confirmed by Lex. His polaroids show Hoseong, Jiae and Hajun as requested. The location headline remains Los Angeles and the residence remains San Bernardino; the map uses a city-level San Bernardino pin. No in-world dates have been guessed for these entries.

The other cast records are starters from the existing character directory, not a migration of every development post. Their missing biographies, playlists, timelines, polaroids and maps can be filled in through the form. Ages are imported snapshots, not automatic birthday calculations. The original PI directory remains separate and unchanged.

## GitHub and forum delivery

The layout, editor, starter content and generators live together in `character-dossier/`. Shared forum styling is served from the `character-dossier-v1` branch of `lexdoescodingnow/templates` through jsDelivr. Keep that branch available while posts use its stylesheet URL. The editor has an advanced stylesheet field for a future permanent destination.

The exported profile uses static HTML, one shared stylesheet and one external runtime script. The facts, connections, timeline and song carousel remain readable without that script. The runtime creates the optional map in a separate sandboxed iframe and matches the colour of each header photo. Character colour leads the panels, borders and highlights, with member colours retained for bold/italic text. It follows Blue Hour light/dark mode. The current stylesheet is `dossier-v5.css` with the isolated `bh-dossier-v5` wrapper; the earlier v1–v4 stylesheets remain unchanged.

The clean map needs the shared script to load, an internet connection, and browser support for WebGL and Blob workers. Its iframe is created after forum parsing and has `sandbox="allow-scripts"`, without same-origin permission. MapLibre is pinned to the 5.6.2 classic bundle for its self-contained worker; its automatic attribution renderer is disabled and fixed visible credit links are provided below the map instead. Keep user text out of the generated map script and do not enable arbitrary attribution HTML. External location and music links remain available if an embed cannot load.

Automatic colour matching runs both in the editor and in the posted template. Replacing the header URL in either place triggers a new match; the image controls the accent and its related panel tints, borders and highlights. It does not change the layout or the forum's light/dark setting. A cached accent keeps the post styled while the image is being analysed. Changing the file behind an unchanged URL may be delayed by the image host's cache; a new image URL gives a fresh match.

Public image hosts such as l3n do not permit direct browser colour sampling. For those images, the matcher uses a small image copy from the [wsrv.nl image cache and resize service](https://wsrv.nl/docs/). Other hosts are sampled directly where possible. Use public image URLs; the fallback excludes local addresses, embedded credentials and common signed or authentication query parameters. If a photo cannot be sampled or the service is unavailable, the previous accent is retained and the editor reports the problem. Automatic matching does not require a manual palette or another assistant request.

The folder is also suitable for [GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages), which serves static HTML, CSS and JavaScript. The portable editor is usable without setting up Pages.

## Development

Run `node character-dossier/build.cjs` from the repository root to refresh the starter data, portable editor and Sam outputs. Run `node character-dossier/check.cjs` for the content-preservation and export checks. The build does not alter existing collections or the PI directory.

Sources: the existing `forum-posts/characters/characters.json` and `ship-names.json`, Lex's supplied Sam profile and tracker, Lex's confirmed revisions, the encyclopaedia's [Flavour and brand name key](https://chatgpt.com/space/page_0eadef96d4a0819194dc68c40f67f199), and the comms catalogue verified on 5 November 2026. Spotify iframe sizing follows the [official embed guide](https://developer.spotify.com/documentation/embeds/tutorials/creating-an-embed). Map styling and tiles come from [OpenFreeMap](https://openfreemap.org/quick_start/) with [MapLibre](https://maplibre.org/maplibre-gl-js/docs/); the initial location is [San Bernardino's city record](https://www.openstreetmap.org/relation/253639). Map credits follow the providers' [attribution guidance](https://openfreemap.org/#attribution).
