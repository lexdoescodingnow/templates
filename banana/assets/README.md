# Banana Display font asset

The production web font is hosted here:

| File | Size | SHA-256 |
|---|---:|---|
| `BananaDisplay-Prototype01.woff2` | 21,072 bytes | `c7da9b408ef74adc8080238efd5348390bbb70143e656cdb5a4bece496edea1c` |

The stylesheet loads this WOFF2 build directly through jsDelivr. The matching desktop TTF and OTF files are retained in the project font kit and are not required for JCink rendering.

After replacing the web font, verify its checksum before merging. jsDelivr may cache files addressed through `@main`; use a commit-pinned URL for production templates where permanent rendering is important.
