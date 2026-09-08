# Plum validation

Verified on 8 September 2026.

## Posting files

- Exactly five threads, five comms and five buds, each with a distinct name and individual `.txt` file.
- Every snippet matches the shared model and the editor's initial exported code.
- Each complete `[dohtml]` block has the editable URL, name, title/status, GIFs and writing before the final hosted stylesheet link.
- No comments, editing notes, hidden tips or separator banners in the template HTML or CSS.
- Both supplied Tumblr URLs were fetched successfully as `image/gif`; their bytes were used for browser rendering. GIF URLs remain exactly as supplied.
- All bud sample replies contain 36 words.

## Browser checks

The collection was rendered in Chromium 151.0.7922.34 using the actual supplied GIFs and the Google Fonts files. All fifteen designs were visually reviewed in light and dark contact sheets. The preview editor was also visually reviewed.

The automated browser run covered 60 combinations of design, mode and available post width (560 px and 320 px), within a wide viewport to simulate narrow forum post columns. It checked content bounds and overlap, plus removal of both images and media containers. Empty media disappears, writing space is reclaimed, and name, title, images and reply remain separate.

Editor checks covered all fifteen initial exports; ordinary and unclosed `<p>` message paragraphs; BBCode emphasis conversion; forward bold/underline gradients and reverse italic gradients; alternating messages; image removal and addition; member palette changes without adding fixed colours to exported code; explicit forum modes overriding system preference; preserving edits across design switches; all fifteen gallery entries; exact downloaded text; clipboard fallback; and a 375 px mobile preview. No page script errors occurred.

## Hosting

The posting stylesheet is pinned to the revision in `stylesheet-revision.txt`. The published stylesheet was fetched through jsDelivr and compared byte-for-byte with the local compiled CSS. The release verification also checked the GitHub files against their local Git blob hashes.

## Limits

No authenticated live JCink post was created. Browser checks validate the template HTML and stylesheet, not every possible forum skin override or the site's permission to load external stylesheets. The forum must allow the stylesheet link in `[dohtml]`. Remote GIFs and fonts remain dependent on their hosts; Georgia and Arial are font fallbacks.

## Repeat the checks

Run `node plum/build.cjs`, then `node plum/validate.cjs` with Playwright and Chromium available. `PLUM_BROWSER` can specify a Chromium executable. `PLUM_ASSET_MAP` can specify a JSON mapping of original asset URLs to local `{ "path": "...", "contentType": "..." }` fixtures; without fixtures the browser checks use font fallbacks and block external asset requests.
