"""Package the two Bingsu generations without changing their hosted CSS URLs."""
from pathlib import Path
import collections
import html
import json
import re
import zipfile
from forum_inventory import ROOT, inventory
from forum_presentation import presentation


def write_zip(path, files):
    with zipfile.ZipFile(path, 'w', zipfile.ZIP_DEFLATED) as archive:
        for name, data in sorted(files.items()):
            info = zipfile.ZipInfo(name, date_time=(2026, 9, 27, 0, 0, 0))
            info.compress_type = zipfile.ZIP_DEFLATED
            info.external_attr = 0o100644 << 16
            archive.writestr(info, data)


rows = [r for r in inventory() if r['folder'] == 'bingsu']
summary = []
for generation in ('legacy', 'thaw'):
    selected = [r for r in rows if ('bgs' in r['classes'].split()) == (generation == 'thaw')]
    selected.sort(key=lambda r: (['thread', 'comms', 'bud'].index(r['type']), r['source'], r['block']))
    key = 'bingsu' if generation == 'thaw' else 'bingsu-legacy'
    title = 'Bingsu · ' + generation.title()
    files = {}
    designs = []
    readme = [f'# {title}', '', 'Isaiah & Max', '',
              ('The 15 newer designs for current forum use: five threads, five comms and five buds.'
               if generation == 'thaw' else
               'The 11 earlier designs: five threads, one comms template and five buds.'), '',
              f'[Forum masterpost](forum-posts/{key}-forum-masterpost.txt) · '
              f'[Browser preview with Copy buttons](forum-posts/{key}-preview.html)', '',
              'Paste the masterpost into the forum editor to display each example above its copyable code. '
              'For an individual template, open a file below and copy its entire `[dohtml]` block. '
              'Download the browser preview and open it locally for rendered examples and Copy buttons.', '',
              'Examples retain full sample writing. Posting snippets use `[TEXT GOES HERE]` or '
              '`[MESSAGE GOES HERE]`. Names, links, titles and GIFs remain editable.', '',
              '| Design | Type | Posting snippet |', '| --- | --- | --- |']
    for r in selected:
        code, _ = presentation(r)
        if generation == 'thaw':
            filename = Path(r['source']).name
        else:
            slug = re.sub(r'[^a-z0-9]+', '-', re.sub(r'^Variant \d+ — ', '', r['name']).lower()).strip('-')
            filename = f'bingsu-{slug}-{r["type"]}.txt'
        destination = 'bingsu/' + filename
        files[destination] = code
        readme.append(f'| {r["name"]} | {r["type"]} | [{filename}]({destination}) |')
        designs.append({'name': r['name'], 'type': r['type'], 'snippet': destination,
                        'classes': r['classes'], 'stylesheets': r['css']})
        for css in r['css']:
            files[css] = (ROOT / css).read_bytes()
    for path in sorted((ROOT / 'forum-posts').glob(key + '-*')):
        # The current set's prefix must not include the legacy set.
        if key == 'bingsu' and path.name.startswith('bingsu-legacy-'):
            continue
        files['forum-posts/' + path.name] = path.read_bytes()
    files['forum-posts/index.html'] = (
        '<!doctype html><html lang="en"><meta charset="utf-8"><title>' + title + '</title>'
        '<h1>' + title + '</h1><p><a href="' + key + '-preview.html">Preview and copy templates</a></p>'
        '<p><a href="' + key + '-forum-masterpost.txt">Forum masterpost</a></p></html>')
    files['designs.json'] = json.dumps(designs, ensure_ascii=False, indent=2) + '\n'
    readme += ['', '## Hosted styling', '',
               'The included stylesheets are copies of this set’s dependencies. Forum snippets keep their '
               'existing published stylesheet URLs in `lexdoescodingnow/templates`, so moving these files '
               'does not break existing posts. GIFs and optional fonts also require internet access. '
               'Member colours and forum light/dark modes are unchanged.', '',
               '## Repository contents', '',
               '`bingsu/` contains only this generation’s individual posting snippets and supporting CSS. '
               '`forum-posts/` contains its masterpost, numbered parts and browser preview. '
               '`designs.json` lists the included designs.', '']
    files['README.md'] = '\n'.join(readme)
    archive = ROOT / 'bingsu' / f'bingsu-{generation}-repository.zip'
    write_zip(archive, files)
    summary.append({'generation': generation, 'repository_name': 'bingsu-' + generation,
                    'designs': len(selected), 'types': dict(collections.Counter(r['type'] for r in selected)),
                    'archive': archive.name, 'forum_masterpost': f'../forum-posts/{key}-forum-masterpost.txt'})
(ROOT / 'bingsu' / 'repository-split.json').write_text(json.dumps(summary, indent=2) + '\n')
print(json.dumps(summary, indent=2))
