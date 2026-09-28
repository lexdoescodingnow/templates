# Leaf character PI directory

[Preview and copy — v2](character-directory-v2-preview.html) · [Forum widget code — v2](character-directory-v2.txt)

The directory contains 12 characters: Akara, Artie, Clarity, Dom, Eric, Haeun, Lyle, Mia, Tae, Toby, X and Yonggi. Each description uses the agreed ❧ Leaf flourish, bold nickname, delicate separators and italic face claim. Organisation names are bold where supplied. Avatars, GIFs, nicknames, ages, pronouns, jobs, face claims and final full-name tags retain their supplied details.

Search matches full names, nicknames, employers, groups and face claims. All twelve cards, portraits, GIFs, formatted descriptions and complete PI code panels are present in the initial HTML. Opening View / copy PI code and selecting the code works without JavaScript. Search and one-click Copy PI buttons appear when the enhancement script runs. The directory inherits member colours and supports the forum's light/dark modes.

Copy PI returns the complete character block for the end of a post. Copy directory widget returns the complete `[dohtml]` block to publish this directory. A failed clipboard request opens and selects the code for manual copying.

Character records are maintained in `characters.json`. Edit the complete PI string there and run `python forum-posts/characters/build-characters.py` from the repository root. The generated posting code keeps character content before its stylesheet and script loaders. Version 2 builds ordinary HTML cards and removes the embedded JSON dependency. Code panels use escaped brackets in separate spans, so their text copies exactly while the posting source and serialized HTML contain no literal PI/PG/CD/CN tag openings. The separate `character-directory-v2.js` script finds wrappers by class, supports delayed or dynamically inserted previews and does not depend on `document.currentScript`.

Ages remain exactly as supplied. Automatic ageing is not enabled or connected to Canopy. Canopy is the agreed authority for future age updates. Updating the directory does not alter existing forum posts that already contain copied PI blocks.

Version 2 was checked with scripts disabled, stripped, delayed, executed outside the widget and loaded from the hosted-script path. All twelve PI strings and 24 image URLs are preserved. Search, clipboard success/fallback, repeated initialization and multiple widgets were also checked. The live forum has not been tested directly. The widget does not save visitor data or edit existing posts. The downloadable preview embeds both assets for offline use; its Copy directory widget button returns the forum version with hosted assets.

Replace the entire old forum block, including both `[dohtml]` tags, with `character-directory-v2.txt`. The saved forum code supplied on 28 September 2026 was still the original v1: it contained embedded JSON, an empty count and an empty card list. All twelve character records matched the current records. Changing only its stylesheet or refreshing that post cannot add the static cards.

The versioned download starts with `<section class="bh-character-directory pc-v2"` after `[dohtml]`, includes a visible `12 characters · A–Z` count and contains twelve `<article>` cards. The builder also refreshes the original unversioned download and preview for compatibility. Use the versioned links above when replacing an older download.
