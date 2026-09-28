# Leaf character PI directory

[Preview and copy](character-directory-preview.html) · [Forum widget code](character-directory.txt)

The directory contains 12 characters: Akara, Artie, Clarity, Dom, Eric, Haeun, Lyle, Mia, Tae, Toby, X and Yonggi. Each description uses the agreed ❧ Leaf flourish, bold nickname, delicate separators and italic face claim. Organisation names are bold where supplied. Avatars, GIFs, nicknames, ages, pronouns, jobs, face claims and final full-name tags retain their supplied details.

Search matches full names, nicknames, employers, groups and face claims. The cards show portraits, GIFs and formatted descriptions above individual Copy PI buttons. The directory inherits member colours and supports the forum's light/dark modes.

Copy PI returns the complete character block for the end of a post. Copy directory widget returns the complete `[dohtml]` block to publish this directory. A failed clipboard request opens and selects the code for manual copying.

Character records are maintained in `characters.json`. Edit the complete PI string there and run `python forum-posts/characters/build-characters.py` from the repository root. The generated posting code keeps records at the top. It escapes brackets in stored JSON, then assigns decoded PI blocks to textarea values without inserting PI tags into ordinary HTML text. This reduces interference with character-faking scripts; live forum behaviour still needs checking.

Ages remain exactly as supplied. Automatic ageing is not enabled or connected to Canopy. Canopy is the agreed authority for future age updates. Updating the directory does not alter existing forum posts that already contain copied PI blocks.

JavaScript is required to display and copy records. The widget does not save visitor data or edit existing forum posts. The preview and copyable widget contain the same records; only the preview's stylesheet is embedded for offline use.
