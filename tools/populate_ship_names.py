"""Fill unassigned ship-name fields in snippets and their editor sources."""
from pathlib import Path
import html
import json
import re

ROOT = Path(__file__).resolve().parents[1]
SHIPS = json.loads((ROOT / 'ship-names.json').read_text())


def label(names):
    return ', '.join(names[:-1]) + ' & ' + names[-1]


def markup(text, names):
    ship = html.escape(label(names))
    # These older headings have one separate link for each partner.
    def paired(m):
        values = iter(names)
        return re.sub(r'\[name\]', lambda _: html.escape(next(values)), m[0])
    text = re.sub(r'<div class="(?:bn|ch|ct)-names">.*?</div>', paired, text)
    # The old Macadamia heading has three generic slots but this ship has two people.
    text = text.replace('[name] · [name] · [name]', ship)
    text = re.sub(r'(<a class="bh-maccomms-name"[^>]*>)\[name\]',
                  lambda m: m[1] + names[0], text)
    text = text.replace('to <strong>[name]</strong>', 'to <strong>' + names[-1] + '</strong>')
    return re.sub(r'(<(?:a|span|div|h[1-6]|strong)(?:\s[^<>]*?)?>)\[name\](?=<)',
                  lambda m: m[1] + ship, text)


def update(text, names):
    text = markup(text, names)
    # Static preview code boxes escape their HTML, sometimes including quotes.
    def escaped_line(old):
        if '&lt;' not in old or '[name]' not in old:
            return old
        decoded = html.unescape(old)
        new = markup(decoded, names)
        return html.escape(new, quote='&quot;' in old) if new != decoded else old
    text = ''.join(escaped_line(line) for line in text.splitlines(keepends=True))
    # Script defaults remain plain strings; the existing renderers escape them.
    text = re.sub(r'((?:[\'"]?name[\'"]?)\s*:\s*)([\'"])\[name\]\2',
                  lambda m: m[1] + m[2] + label(names) + m[2], text)
    text = re.sub(r'(\|\|\s*)([\'"])\[name\]\2',
                  lambda m: m[1] + m[2] + label(names) + m[2], text)
    text = text.replace('value="[name]"', 'value="' + html.escape(label(names)) + '"')
    return text


def main():
    changed = []
    for folder, names in SHIPS.items():
        aliases = json.loads((ROOT / 'collection-aliases.json').read_text()) if (ROOT / 'collection-aliases.json').exists() else {}
        folders = [folder] + [old for old, new in aliases.items() if new == folder]
        paths = [p for source in folders for p in (ROOT / source).rglob('*')]
        if folder == 'lavender':
            paths.append(ROOT / 'lavender-thread-snippet.txt')
        for path in paths:
            if not path.is_file() or path.suffix not in ('.txt', '.html', '.js', '.cjs'):
                continue
            original = path.read_text()
            revised = update(original, names)
            if revised != original:
                path.write_text(revised)
                changed.append(str(path.relative_to(ROOT)))
    print(f'Updated {len(changed)} snippet, preview and editor source files.')


if __name__ == '__main__':
    main()
