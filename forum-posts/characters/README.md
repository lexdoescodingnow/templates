# Character PI directory — Yonggi starter

[Preview and copy](character-directory-preview.html) · [Forum widget code](character-directory.txt)

This starter contains only the supplied Song Yonggi entry. It shows his portrait, GIF and description, searches names, groups and face claims, and copies his complete original PI block without changing its spelling, formatting, spacing or URLs. The shared directory inherits member colours and supports the forum's light/dark modes.

The Copy PI button returns just the character block to paste at the end of a post. Copy directory widget returns the complete `[dohtml]` block to publish the directory. A failed clipboard request opens and selects the code for manual copying.

Character records are maintained in `characters.json`. Edit the original complete PI string there and run `python forum-posts/characters/build-characters.py` from the repository root. The generated posting code also keeps records at the top. It escapes bracket characters in stored JSON, then assigns decoded PI blocks to textarea values without inserting PI tags into the directory's normal HTML text. This reduces interference with character-faking scripts; the live forum's implementation still needs checking.

Yonggi remains 20, exactly as supplied. Automatic ageing is not enabled. Full birth dates and the intended calendar or forum timeline are needed before adding that behaviour. Updating a directory later will not alter old forum posts that already contain copied PI blocks.

The directory needs JavaScript to display and copy character records. No data is stored in the visitor's browser, no character details are uploaded by the widget, and no existing forum post is edited automatically.
