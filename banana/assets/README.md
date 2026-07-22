# Banana Display font assets

Place the three Prototype 0.1 font files in this directory with these exact names:

| File | Size | SHA-256 |
|---|---:|---|
| `BananaDisplay-Prototype01.woff2` | 21,072 bytes | `c7da9b408ef74adc8080238efd5348390bbb70143e656cdb5a4bece496edea1c` |
| `BananaDisplay-Prototype01.ttf` | 55,440 bytes | `663f22448860f826c720b362693e754014d789c5517a2e2eeacc313406a1c992` |
| `BananaDisplay-Prototype01.otf` | 51,468 bytes | `6719708f9a7b85366d28220a9d06641b5ccfa9412fd791cefcbd3b6684bb88ba` |

The hosted stylesheet prioritises WOFF2 and uses TTF as its browser fallback. OTF is kept for desktop/archive use.

After adding or replacing an asset, verify its checksum before merging. jsDelivr may cache files addressed through `@main`; use a commit-pinned URL for production templates where permanent rendering is important.
