# Sweet Potato templates

This directory contains the current JCink-ready Sweet Potato template family.

## Live files

### Master loader

- `sweet-potato-family.css` — the single stylesheet entry point used by all Sweet Potato forum snippets.

### Threads

- `sweet-potato-v3.css` — current thread styles.
- `thread-snippets.txt` — five copy-ready thread layouts.

### Comms

- `sweet-potato-comms-v3.css` — current Comms styles.
- `comms-snippets.txt` — sent and received Comms snippets.

### Buds

- `sweet-potato-buds.css` — shared Buds base styles.
- `sweet-potato-buds-v2.css` — current Bud Note refinements.
- `buds-snippets.txt` — five copy-ready Bud layouts.

## JCink compatibility rules

- Every forum snippet loads the same master stylesheet with `<style>@import url(...sweet-potato-family.css...);</style>` inside `[dohtml]`.
- This matches the loader structure used by the working flavoured template families.
- Do not replace the master loader with separate commit-pinned component links.
- Example copy uses lorem ipsum rather than `[text]`.
- `--mgrgb1`, `--mgrgb2`, `--mgrgb3`, and `--icon` provide the posting member's group colours and icon.
- Bold and underline use the forward member gradient; italics use the reverse gradient.

Superseded thread, Comms, and Bud files have been removed. The three canonical snippet files are the only examples intended for forum use.
