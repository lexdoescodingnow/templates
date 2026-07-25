# Sweet Potato templates

This directory contains the current JCink-ready Sweet Potato template family.

## Live files

### Threads

- `sweet-potato-v3.css` — current hosted thread stylesheet.
- `thread-snippets.txt` — five copy-ready thread layouts.

### Comms

- `sweet-potato-comms-v3.css` — current hosted Comms stylesheet.
- `comms-snippets.txt` — sent and received Comms snippets.

### Buds

- `sweet-potato-buds.css` — shared Buds base stylesheet.
- `sweet-potato-buds-v2.css` — current Bud Note refinements; imports the shared base stylesheet locally.
- `buds-snippets.txt` — five copy-ready Bud layouts.

## JCink compatibility rules

- Forum snippets load CSS with a direct `<link rel="stylesheet">` inside `[dohtml]`.
- Do not replace the direct link with `<style>@import ...</style>`; Blue Hour strips that loader from finished posts.
- Snippets use commit-pinned jsDelivr URLs so later repository changes cannot silently alter existing forum posts.
- Example copy uses lorem ipsum rather than `[text]`.
- `--mgrgb1`, `--mgrgb2`, `--mgrgb3`, and `--icon` provide the posting member's group colours and icon.
- Bold and underline use the forward member gradient; italics use the reverse gradient.

Superseded v1/v2 thread and Comms files, duplicate versioned snippet files, and the old single-thread snippet have been removed.
