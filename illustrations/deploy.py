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
    'fpp-b':       ('fpp-b-gallery.html', 'fpp', lambda t: t + '.png'),
    'airlaw':      ('airlaw-gallery.html', 'airlaw', lambda t: t + '.png'),
    'radionav':    ('radionav-gallery.html', 'radionav', lambda t: t + '.png'),
    'hp1':         ('hp1-gallery.html', 'human-performance', lambda t: t + '.png'),
    'hp2':         ('hp2-gallery.html', 'human-performance', lambda t: t + '.png'),
    'nav1':        ('nav1-gallery.html', 'nav', lambda t: t + '.png'),
    'nav2':        ('nav2-gallery.html', 'nav', lambda t: t + '.png'),
    'el1':         ('el1-gallery.html', 'electrics', lambda t: t + '.png'),
    'el2':         ('el2-gallery.html', 'electrics', lambda t: t + '.png'),
    'el3':         ('el3-gallery.html', 'electrics', lambda t: t + '.png'),
    'ins5':        ('ins5-gallery.html', 'instruments', lambda t: t + '.png'),
    'ins6':        ('ins6-gallery.html', 'instruments', lambda t: t + '.png'),
    'ins7':        ('ins7-gallery.html', 'instruments', lambda t: t + '.png'),
    'af1':         ('af1-gallery.html', 'airframes', lambda t: t + '.png'),
    'af2':         ('af2-gallery.html', 'airframes', lambda t: t + '.png'),
    'af3':         ('af3-gallery.html', 'airframes', lambda t: t + '.png'),
    'af4':         ('af4-gallery.html', 'airframes', lambda t: t + '.png'),
    'af5':         ('af5-gallery.html', 'airframes', lambda t: t + '.png'),
    'af6':         ('af6-gallery.html', 'airframes', lambda t: t + '.png'),
    'al2':         ('al2-gallery.html', 'airlaw', lambda t: t + '.png'),
    'fp2':         ('fp2-gallery.html', 'fpp', lambda t: t + '.png'),
    'met2':        ('met2-gallery.html', 'met', lambda t: t + '.png'),
    'rn2':         ('rn2-gallery.html', 'radionav', lambda t: t + '.png'),
    'pp6':         ('pp6-gallery.html', 'powerplant', lambda t: t + '.png'),
    'pp1':         ('pp1-gallery.html', 'powerplant', lambda t: t + '.png'),
    'pp2':         ('pp2-gallery.html', 'powerplant', lambda t: t + '.png'),
    'pp3':         ('pp3-gallery.html', 'powerplant', lambda t: t + '.png'),
    'pp4':         ('pp4-gallery.html', 'powerplant', lambda t: t + '.png'),
    'pp5':         ('pp5-gallery.html', 'powerplant', lambda t: t + '.png'),
}
NEW_OK = {'pp6', 'met2', 'rn2', 'al2', 'fp2', 'fpp-b', 'airlaw', 'radionav', 'hp1', 'hp2', 'nav1', 'nav2', 'el1', 'el2', 'el3', 'ins5', 'ins6', 'ins7'}   # sets allowed to create files that do not exist yet

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
        os.makedirs(os.path.dirname(target), exist_ok=True)
        if not svg or (not os.path.exists(target) and name not in NEW_OK):
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
