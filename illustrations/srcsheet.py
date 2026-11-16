#!/usr/bin/env python3
"""Local-only helper: build labelled contact sheets of source scans so each
redraw can be checked against its source. Output stays in /tmp (never published).
usage: srcsheet.py <outprefix> <label=path> ...   (or reads 'label\tpath' lines from stdin)"""
import sys, os, html, subprocess
CH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
def build(prefix, items, per=9, cols=3, h=300):
    os.makedirs(os.path.dirname(prefix), exist_ok=True)
    miss = [t for t, p in items if not os.path.exists(p)]
    if miss: print('MISSING SOURCES:', miss)
    items = [(t, p) for t, p in items if os.path.exists(p)]
    css = (f'<style>body{{margin:0;background:#222;font:600 13px sans-serif;color:#fff}}.g{{display:grid;grid-template-columns:repeat({cols},1fr);gap:6px;padding:6px}}'
           f'.c{{background:#333;padding:4px}}.c img{{width:100%;height:{h}px;object-fit:contain;background:#fff}}</style>')
    out = []
    rows = -(-per // cols)
    for i in range(0, len(items), per):
        hp = f'{prefix}{i//per}.html'; png = f'{prefix}{i//per}.png'
        open(hp, 'w').write(css + '<div class="g">' + ''.join(f'<div class="c">{html.escape(t)}<img src="file://{p}"></div>' for t, p in items[i:i+per]) + '</div>')
        subprocess.run([CH, '--headless=new', '--disable-gpu', '--hide-scrollbars', '--allow-file-access-from-files',
                        f'--window-size=1500,{rows*(h+32)+12}', '--virtual-time-budget=4000', f'--screenshot={png}', 'file://' + hp],
                       stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, timeout=90)
        out.append(png)
    print('\n'.join(out))
if __name__ == '__main__':
    prefix = sys.argv[1]
    items = [tuple(l.rstrip('\n').split('\t')) for l in sys.stdin if '\t' in l]
    build(prefix, items)
