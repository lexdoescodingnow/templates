"""Package the separate Clementine and Tangerine collections."""
from collections import Counter
from pathlib import Path
import re
import zipfile

from forum_inventory import ROOT, inventory


def write_zip(path, files):
    with zipfile.ZipFile(path, 'w', zipfile.ZIP_DEFLATED) as archive:
        for name, data in sorted(files.items()):
            info = zipfile.ZipInfo(name, date_time=(2026, 9, 27, 0, 0, 0))
            info.compress_type = zipfile.ZIP_DEFLATED
            info.external_attr = 0o100644 << 16
            archive.writestr(info, data)


def main():
    preview = ROOT / 'tangerine/tangerine-collection-preview.html'
    current_css = (ROOT / 'tangerine/tangerine-media-standalone-v1.css').read_text()
    updated, count = re.subn(
        r'<style id="tangerine-current-css">.*?</style>',
        lambda _: '<style id="tangerine-current-css">' + current_css + '</style>',
        preview.read_text(), flags=re.S,
    )
    assert count == 1, 'Tangerine preview must contain one current stylesheet'
    preview.write_text(updated)
    rows = inventory()
    supporting = {
        'clementine': [
            'README.md', 'build-clementine.cjs', 'clementine-editor.js',
            'clementine-preview.css', 'clementine-softlight-v1.css',
            'clementine-softlight-preview.html', 'clementine-collection-preview.html',
            'SOFTLIGHT-VALIDATION.md',
        ],
        'tangerine': ['README.md', 'tangerine-media-v1.css', 'tangerine-collection-preview.html'],
    }
    for folder, extras in supporting.items():
        selected = [row for row in rows if row['folder'] == folder]
        assert Counter(row['type'] for row in selected) == {'thread': 5, 'comms': 5, 'bud': 5}
        assert all(('clm' in row['classes'].split()) == (folder == 'clementine') for row in selected)
        paths = {ROOT / folder / name for name in extras}
        for row in selected:
            paths.add(ROOT / row['source'])
            paths.update(ROOT / name for name in row['css'])
        paths.update((ROOT / 'forum-posts').glob(folder + '-*'))
        files = {path.relative_to(ROOT).as_posix(): path.read_bytes() for path in paths}
        name = 'clementine-softlight-collection.zip' if folder == 'clementine' else 'tangerine-collection.zip'
        write_zip(ROOT / folder / name, files)
        print(f'{folder}: {len(selected)} designs, {len(files)} files in {name}')


if __name__ == '__main__':
    main()
