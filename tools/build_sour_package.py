"""Refresh Sour's download after rebuilding its editor and forum posts."""
from pathlib import Path
import zipfile

ROOT = Path(__file__).resolve().parents[1]
paths = {path for path in (ROOT / 'sour').iterdir()
         if path.is_file() and path.suffix in ('.txt', '.css', '.py', '.html', '.md')}
paths.update((ROOT / 'forum-posts').glob('sour-*'))
assert len([p for p in paths if p.parent.name == 'sour' and p.suffix == '.txt']) == 15
with zipfile.ZipFile(ROOT / 'sour/sour-collection.zip', 'w', zipfile.ZIP_DEFLATED) as archive:
    for path in sorted(paths):
        info = zipfile.ZipInfo(path.relative_to(ROOT).as_posix(), date_time=(2026, 9, 27, 0, 0, 0))
        info.compress_type = zipfile.ZIP_DEFLATED
        info.external_attr = 0o100644 << 16
        archive.writestr(info, path.read_bytes())
print(f'Packaged {len(paths)} Sour files, including all 15 designs and their forum masterpost.')
