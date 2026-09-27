"""Keep full showcase samples separate from concise posting code."""
from dataclasses import dataclass, field
from functools import lru_cache
from pathlib import Path
from html import escape
from html.parser import HTMLParser
import json
import re
from forum_inventory import ROOT

VOID = {'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'}
BODY_CLASS = re.compile(r'(?:^|[-_])(?:copy|writing|reply|body|messages|chat|bubble)(?:$|[-_])')
BODY_EXTRA = {'lavender-post-text', 'bh-sake-pour__text', 'ft-dialogue', 'petal-post-caption', 'petal-post-comments', 'petal-blurb', 'post', 'transcript'}
BODY_EXCLUDE = {'ft-contact-copy', 'bh-sake-pour__label-copy', 'spv3-standard-ticket-copy'}
SAMPLE = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. <b>Aliquam erat volutpat.</b> <i>Sed do eiusmod tempor</i> incididunt ut labore et dolore magna aliqua. <u>Ut enim ad minim veniam.</u>'


@dataclass(eq=False)
class Node:
    tag: str
    attrs: dict
    start: int
    inner: int
    parent: object
    close: int = 0
    end: int = 0
    children: list = field(default_factory=list)

    def ancestors(self):
        node = self.parent
        while node:
            yield node
            node = node.parent


class Markup(HTMLParser):
    def __init__(self, source):
        super().__init__(convert_charrefs=False)
        self.source = source
        self.lines = [0] + [m.end() for m in re.finditer('\n', source)]
        self.nodes, self.stack, self.data = [], [], []
        self.feed(source)
        self.finish(len(source))

    def position(self):
        line, column = self.getpos()
        return self.lines[line - 1] + column

    def finish(self, position, index=0):
        for node in self.stack[index:]:
            node.close = node.end = position
        del self.stack[index:]

    def handle_starttag(self, tag, attrs):
        start = self.position()
        if tag == 'p':
            for i, node in enumerate(self.stack):
                if node.tag == 'p':
                    self.finish(start, i)
                    break
        parent = self.stack[-1] if self.stack else None
        node = Node(tag, dict(attrs), start, start + len(self.get_starttag_text()), parent)
        self.nodes.append(node)
        if parent:
            parent.children.append(node)
        if tag in VOID:
            node.close = node.end = node.inner
        else:
            self.stack.append(node)

    def handle_startendtag(self, tag, attrs):
        self.handle_starttag(tag, attrs)
        if tag not in VOID:
            self.finish(self.position() + len(self.get_starttag_text()), len(self.stack) - 1)

    def handle_endtag(self, tag):
        for i in range(len(self.stack) - 1, -1, -1):
            if self.stack[i].tag == tag:
                node = self.stack[i]
                self.finish(self.position(), i)
                node.end = self.source.index('>', self.position()) + 1
                break

    def handle_data(self, data):
        self.data.append((self.position(), data, self.stack[-1] if self.stack else None))


def bodies(markup):
    candidates = [n for n in markup.nodes if n.tag not in ('script', 'style') and
                  any((BODY_CLASS.search(c) or c in BODY_EXTRA) and c not in BODY_EXCLUDE
                      for c in n.attrs.get('class', '').split())]
    return [n for n in candidates if not any(n in x.ancestors() for x in candidates if x is not n)]


def apply(source, edits):
    end = len(source)
    for start, stop, replacement in sorted(edits, reverse=True):
        if stop > end:
            raise ValueError('Overlapping presentation edits')
        source = source[:start] + replacement + source[stop:]
        end = start
    return source


@lru_cache(maxsize=None)
def samples(folder):
    result = []
    for filename in ('designs.json', 'bread-second-rise-manifest.json'):
        path = ROOT / folder / filename
        if path.exists():
            result.extend(json.loads(path.read_text()))
    return result


def sample_title(row):
    for design in samples(str(Path(row['source']).parent)):
        if design.get('slug', 'NO_SLUG') in row['source']:
            return design.get('sample', design.get('sampleTitle', row['name']))
    return row['name']


def clean_fields(source, row, preview):
    markup = Markup(source)
    writing = bodies(markup)
    title = escape(sample_title(row))
    edits = []
    for start, data, node in markup.data:
        if not node or node.tag in ('script', 'style'):
            continue
        owner = next((b for b in writing if b is node or b in node.ancestors()), None)
        revised = data
        if '[text]' in data:
            if owner:
                body = source[owner.inner:owner.close]
                if re.search(r'Lorem ipsum', body, re.I):
                    replacement = ''
                else:
                    replacement = SAMPLE if preview else '[TEXT GOES HERE]'
                    if node is owner and node.tag not in ('p', 'span'):
                        replacement = '<p>' + replacement + '</p>'
            elif any(c.endswith(('-note', '-sprig')) or c == 'bh-macbud-meta'
                     for c in node.attrs.get('class', '').split()) and data.strip() == '[text]':
                edits.append((node.start, node.end, ''))
                continue
            elif 'status' in node.attrs.get('class', ''):
                replacement = 'online' if row['type'] == 'comms' else title
            elif row['folder'] == 'petal':
                replacement = '@character' if 'handle' in node.attrs.get('class', '') else 'Character name'
            elif row['folder'] == 'facetime':
                replacement = 'connected'
            elif row['folder'] == 'traitors' and (node.attrs.get('class') == 'vote-name' or node.tag == 'strong'):
                replacement = 'Player name' if preview else '[NAME GOES HERE]'
            else:
                replacement = title
            revised = revised.replace('[text]', replacement)
        revised = revised.replace('[time]', '09:41').replace('[date]', 'Today')
        revised = revised.replace('[name]', 'Character name' if preview else '[NAME GOES HERE]')
        if not owner and node.tag in ('h1', 'h2', 'h3') and 'Lorem ipsum' in revised:
            revised = title
        if revised != data:
            edits.append((start, start + len(data), revised))
    return re.sub(r'(?m)^[ \t]+$', '', apply(source, edits))


def concise_code(source, row):
    source = clean_fields(source, row, False)
    markup = Markup(source)
    edits = []
    marker = '[MESSAGE GOES HERE]' if row['type'] == 'comms' else '[TEXT GOES HERE]'
    for body in bodies(markup):
        paragraphs = [n for n in markup.nodes if n.tag == 'p' and body in n.ancestors()]
        if body.tag in ('p', 'span'):
            edits.append((body.inner, body.close, marker))
        elif row['type'] == 'comms' and paragraphs:
            for p in paragraphs:
                metadata = [n for n in p.children if re.search(r'time|receipt', n.attrs.get('class', ''))]
                kept = ''.join(source[n.start:n.end] for n in metadata)
                edits.append((p.inner, p.close, marker + (('\n' + kept) if kept else '') + ('\n' if p.end == p.close else '')))
        elif paragraphs and any(n.tag in ('img', 'span') for n in body.children):
            for i, p in enumerate(paragraphs):
                edits.append((p.start, p.end, '<p>' + marker + '</p>' if i == 0 else ''))
        else:
            edits.append((body.inner, body.close, '\n<p>' + marker + '</p>\n'))
    return apply(source, edits)


def presentation(row):
    source = row['code'].strip()
    if row['folder'] in ('cereal', 'cashew'):
        return source, source
    return concise_code(source, row), clean_fields(source, row, True)
