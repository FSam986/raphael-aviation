#!/usr/bin/env python3
"""Render review sheets (N figures per PNG, captions hidden) for a gallery. usage: sheets.py gallery.html outprefix [per] [idx,idx,...]"""
import re, sys, subprocess
CH='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
g, pre = sys.argv[1], sys.argv[2]; per = int(sys.argv[3]) if len(sys.argv) > 3 else 4
s = open(g).read(); head = s[:s.index('<header>')]
hid = ''.join(m.group(0) for m in re.finditer(r'<svg width="0".*?</svg>', s, re.S))
cards = re.findall(r'<section class="card">.*?</section>', s, flags=re.S)
if len(sys.argv) > 4: cards = [cards[int(i)] for i in sys.argv[4].split(',')]
head = head.replace('max-width:860px', 'max-width:1500px').replace('padding:28px 18px 80px', 'padding:4px').replace('</style>', '.grid{display:grid;grid-template-columns:1fr 1fr;gap:6px}.card{margin:0;padding:8px}.card h2{font-size:13px;margin:0 0 2px}.meta{display:none}.stage{margin:0;padding:4px}</style>')
for i in range(0, len(cards), per):
    body = ''.join(re.sub(r'<p class="cap">.*?</p>', '', c, flags=re.S) for c in cards[i:i+per])
    hp = f'{pre}{i//per}.html'; open(hp, 'w').write(head + hid + '<div class="grid">' + body + '</div></div></body></html>')
    subprocess.run([CH, '--headless=new', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1', '--window-size=1520,820', '--virtual-time-budget=4000', f'--screenshot={pre}{i//per}.png', 'file://' + hp], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, timeout=90)
    print(f'{pre}{i//per}.png')
