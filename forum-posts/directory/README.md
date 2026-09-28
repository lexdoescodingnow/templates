# Ship template directory

Paste all of [template-directory.txt](template-directory.txt), including `[dohtml]` and `[/dohtml]`, into the first post of the templates thread. The [browser preview](template-directory-preview.html) shows the widget above a Copy button and its complete code.

The directory contains 54 alphabetical entries linking to the 52 supplied posts. Mocha, Latte and Mocha & Latte share one destination. Milk uses the supplied Freddie & Oliver names. Only supplied destinations are included.

Search matches flavour and character names, ignores case and punctuation, and accepts names in either order. Clear or Escape restores the complete list. The list scrolls independently and adapts to narrow posts. It inherits the member group palette and the forum's explicit light/dark mode.

All editable links and names are together at the beginning of the posting code. To add a ship in the forum, duplicate an existing `bhtd-entry` line and change its link and two names. Search reindexes and alphabetises the entries when the post loads. For repository maintenance, edit `entries.tsv` and run `python forum-posts/directory/build-directory.py` from the repository root. The TSV columns are flavour, ship and post ID. No forum content is fetched by the widget.

The posting code has one hosted stylesheet and a short inline script. If scripts are disabled by the forum, the search control stays hidden and all links remain browsable. The preview embeds the stylesheet for offline use; its Copy button returns the hosted forum version. Existing forum posts are not edited automatically.
