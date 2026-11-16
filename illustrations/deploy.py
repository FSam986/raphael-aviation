#!/usr/bin/env python3
"""Deploy verified redraws into the app: render each gallery card's SVG with
headless Chrome and overwrite the matching file in frontend/public/figures.

Only galleries whose cards map one-to-one onto real figure files are listed in
SETS. Usage:  python3 deploy.py [set ...]      (default: all sets)
"""
import os, re, subprocess, sys, tempfile, shutil

ROOT = os.path.dirname(os.path.abspath(__file__))
PUB = os.path.join(ROOT, '..', 'frontend', 'public', 'figures')
CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
W = 1520          # output width in px (2x the 760 viewBox)
PAD = 20

# gallery file, public folder, tag -> filename
SETS = {
    'instruments': ('instruments-gallery.html', 'instruments', lambda t: t + '.png'),
    'met':         ('met-gallery.html', 'met', lambda t: t),
    'fpp':         ('fpp-gallery.html', 'fpp', lambda t: t + '.png'),
}

def run(name):
    gal, folder, fn = SETS[name]
    s = open(os.path.join(ROOT, gal)).read()
    style = re.search(r'<style>.*?</style>', s, re.S).group(0)
    defs = ''.join(m.group(0) for m in re.finditer(r'<svg width="0".*?</svg>', s, re.S))
    cards = re.findall(r'<section class="card">.*?</section>', s, flags=re.S)
    tmp = tempfile.mkdtemp(prefix='deploy_')
    done = skipped = 0
    for c in cards:
        tag = re.search(r'<span class="tag">([^<]+)', c).group(1).strip()
        svg = re.search(r'<svg viewBox="0 0 ([\d.]+) ([\d.]+)".*?</svg>', c, re.S)
        target = os.path.join(PUB, folder, fn(tag))
        if not svg or not os.path.exists(target):
            print('  skip (no target file):', tag); skipped += 1; continue
        vw, vh = float(svg.group(1)), float(svg.group(2))
        iw = W - 2 * PAD; ih = iw * vh / vw; H = int(round(ih + 2 * PAD))
        html = (f'<!doctype html><html><head><meta charset="utf-8">{style}<style>html,body{{margin:0;background:#10171b}}'
                f'.w{{padding:{PAD}px;width:{iw}px}}</style></head><body>{defs}<div class="w">{svg.group(0)}</div></body></html>')
        hp = os.path.join(tmp, 'f.html'); png = os.path.join(tmp, 'f.png')
        open(hp, 'w').write(html)
        subprocess.run([CHROME, '--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1',
                        f'--window-size={W},{H}', '--virtual-time-budget=3000', f'--screenshot={png}', 'file://' + hp],
                       stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, timeout=60)
        if not os.path.exists(png):
            print('  FAILED render:', tag); skipped += 1; continue
        if target.lower().endswith(('.jpg', '.jpeg')):
            subprocess.run(['sips', '-s', 'format', 'jpeg', '-s', 'formatOptions', '90', png, '--out', target], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        else:
            shutil.copy(png, target)
        os.remove(png); done += 1
    shutil.rmtree(tmp)
    print(f'{name}: deployed {done}, skipped {skipped}, cards {len(cards)}')

if __name__ == '__main__':
    for n in (sys.argv[1:] or list(SETS)): run(n)
