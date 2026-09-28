from pathlib import Path
import zipfile
root=Path(__file__).resolve().parents[1]
with zipfile.ZipFile(root/'strawberry/strawberry-collection.zip','w',zipfile.ZIP_DEFLATED) as z:
    files=sorted(p for p in (root/'strawberry').glob('*') if p.is_file() and p.suffix!='.zip')
    files+=sorted(p for p in (root/'forum-posts').glob('strawberry-*') if p.is_file())
    for p in files:
        info=zipfile.ZipInfo(p.relative_to(root).as_posix(),date_time=(2026,9,28,0,0,0))
        info.compress_type=zipfile.ZIP_DEFLATED
        info.external_attr=0o100644<<16
        z.writestr(info,p.read_bytes())
print('Packaged Strawberry sources, editor, snippets and forum posts.')
