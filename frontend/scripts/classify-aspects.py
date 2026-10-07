#!/usr/bin/env python3
"""Heuristic sub-topic (aspect) classifier for the SACAA question bank.
Questions are tagged only at section level (A.8.3); this scores each question
against its section's sub-topic descriptions and assigns the best match, to
estimate per-sub-topic coverage and surface likely-uncovered sub-topics.
Run: python3 scripts/classify-aspects.py   (from frontend/)
Output: src/app/data/aspect-coverage.json  +  printed summary.
Heuristic — treat counts as estimates, zeros in multi-aspect sections as leads."""
import re,glob,json,os
D="src/app/data"
syl=open(f"{D}/sacaa-syllabus.ts",encoding="utf-8").read()
aspects={}
for m in re.finditer(r'id:\s*"([A-C]\.\d+\.\d+)\.([a-z]\d?)"\s*,\s*topic:\s*"([^"]+)"',syl):
    sec=m.group(1); aspects.setdefault(sec,[]).append((sec+"."+m.group(2),m.group(3)))
STOP=set("the a an and or of to in for with on at by is are be as from it its into when which that this these those within during due using use used only not no any all per each other more less than then them they you your we our can may must should will would between above below over under off out up down near far left right side what why how correct following statement statements aircraft aeroplane airplane will would also given used use".split())
def stem(w):
    for suf in ("ational","tion","ings","ing","ers","ies","ied","ment","ness","ers","est","ed","es","s","al","ic"):
        if len(w)-len(suf)>=3 and w.endswith(suf): return w[:-len(suf)]
    return w
def toks(s): return {stem(w) for w in re.split(r'[^a-z0-9]+',s.lower()) if len(w)>2 and w not in STOP}
akw={sec:[(aid,set(toks(txt))) for aid,txt in al] for sec,al in aspects.items()}
# Curated keyword boosts for low-recall sub-topics (merged with auto keywords).
OVERRIDE={
 "A.8.4.a":"celsius fahrenheit kelvin temperature degree convert thermometer scale",
 "A.8.4.b":"insolation radiation conduction convection advection heating terrestrial solar absorb reflect",
 "A.8.4.c":"diurnal specific heat land sea greenhouse continental maritime range capacity",
 "A.8.8.a":"veer back gust squall lull factor definition direction change",
 "A.8.8.b":"anemometer vane measure knot direction speed instrument",
 "A.8.8.c":"pressure gradient coriolis geostrophic buys ballot isobar deflection balance force",
 "A.8.8.d":"gradient surface friction diurnal veer backing boundary curved isobar",
 "A.8.8.e":"trade westerlies easterlies itcz circulation hadley global cell doldrums",
 "A.8.8.f":"land sea breeze katabatic anabatic fohn foehn berg sirocco haboob local mountain valley",
 "A.8.9.a":"adiabatic dalr salr elr lapse rate dry saturated environmental",
 "A.8.9.b":"stability unstable stable conditional neutral instability parcel buoyant",
 "A.8.9.c":"inversion isothermal subsidence temperature layer trapped",
 "A.8.11.a":"condensation nuclei bergeron coalescence collision droplet crystal theory",
 "A.8.11.b":"precipitation rain drizzle snow hail intensity continuity intermittent shower",
 "A.8.12.a":"thunderstorm formation condition development moisture instability trigger cumulonimbus",
 "A.8.12.b":"convective orographic frontal nocturnal squall line classification airmass",
 "A.8.12.c":"stage cumulus mature dissipating updraft downdraft gust front cell life",
 "A.8.12.d":"windshear microburst hail icing lightning tornado hazard downburst",
 "A.8.12.e":"avoid penetration procedure radar deviate thunderstorm distance",
 "A.8.20.a":"climatic region summer winter pattern season rainfall",
 "A.8.20.b":"frontal tropical cyclone coastal low berg guti cape doctor cut phenomena",
 "A.8.21.a":"saws website aviation layout information service briefing",
 "A.8.21.b":"synoptic sigwx significant upper wind chart prognostic surface",
 "A.8.21.c":"metar observation report present weather element decode",
 "A.8.21.d":"taf forecast aerodrome becmg tempo prob decode",
 "A.8.21.e":"speci sigmet airmet special air report arep atis",
 # Human Performance
 "A.6.1.a":"atmosphere composition nitrogen oxygen gas law partial pressure dalton boyle",
 "A.6.1.b":"circulatory blood heart pressure pulse artery vein haemoglobin cardiovascular",
 "A.6.1.c":"lung respiration hypoxia useful consciousness hyperventilation alveoli breathing",
 "A.6.1.d":"altitude ozone radiation humidity pressurisation oxygen mask decompression cabin",
 "A.6.1.e":"vision eye fovea foveal peripheral night rod cone retina illusion blind",
 "A.6.1.f":"hearing ear noise cochlea decibel loss deafness eardrum",
 "A.6.1.g":"equilibrium vestibular semicircular canal disorientation motion sickness balance",
 "A.6.1.h":"spatial disorientation illusion sensory leans somatogravic graveyard",
 "A.6.1.i":"acceleration gravity blackout redout grey limb cardiovascular",
 "A.6.2.a":"hygiene cold influenza flu gastro stomach dehydration infection",
 "A.6.2.b":"hearing vision hypertension obesity nutrition diabetes diet",
 "A.6.2.c":"tobacco smoking alcohol drug medication intoxication caffeine",
 "A.6.2.d":"incapacitation symptom cardiovascular epilepsy carbon monoxide poisoning subtle",
 "A.6.2.e":"stress anxiety stressor defence mechanism arousal management cope",
 "A.6.2.f":"fatigue tired sleepy acute chronic rest prevention",
 "A.6.2.g":"circadian rhythm sleep clock lag insomnia disturbance",
 "A.6.3.a":"nervous sensory threshold reflex adaptation processing neuron stimulus",
 "A.6.3.b":"memory sensory working term chunking mnemonic recall slip retention",
 "A.6.3.c":"personality attitude hazardous situational awareness behaviour trait",
 "A.6.3.d":"error shell model chain slip mistake violation prevention",
 "A.6.3.e":"decision making judgement process option risk influence group",
 "A.6.3.f":"crm cockpit resource automation complacency ergonomic checklist",
 "A.6.3.g":"leadership style democratic autocratic authority gradient captain",
 "A.6.3.h":"communication verbal conflict listening feedback message",
 "A.6.4.a":"first aid faint nose bleed poisoning dehydration bleeding fracture burn shock",
 "A.6.4.b":"survival body temperature equipment sea cold hot arid jungle hypothermia raft",
 # Flight Planning / Performance
 "A.4.1.a":"performance class classification limitation",
 "A.4.1.b":"net flight path dispatch limitation mass",
 "A.4.2.a":"type certificate airworthiness design standard",
 "A.4.2.b":"normal utility acrobatic commuter transport category",
 "A.4.4.a":"stage phase climb descent approach landing cruise",
 "A.4.4.b":"ias cas tas vno vne vso vfe vlo vle vmo speed indicated calibrated true",
 "A.4.4.c":"vmcg vmca vef vlof rotate screen decision speed",
 "A.4.5.a":"isa standard oat tat sat deviation temperature",
 "A.4.5.b":"pressure altitude density altitude qnh qfe qne",
 "A.4.5.c":"tora toda torr todr clearway stopway slope pcn acn",
 "A.4.7.a":"steady power required available force thrust drag",
 "A.4.7.b":"angle gradient flight path ceiling service absolute climb",
 "A.4.7.c":"range endurance specific consumption fuel",
 "A.4.8.a":"density mass configuration runway surface slope temperature",
 "A.4.8.b":"flap power wind altitude setting",
 "A.4.9.a":"wind temperature altitude variable",
 "A.4.9.b":"take off distance maximum mass speed component",
 "A.4.9.c":"rate climb time distance fuel speed",
 "A.4.9.d":"cruise power consumption range endurance",
 "A.4.9.e":"landing distance ground roll component",
 "A.4.10.a":"critical engine inoperative controllability asymmetric",
 "A.4.10.b":"flap thrust obstacle clearance take off",
 "A.4.10.c":"climb cruise descent inoperative oei",
 "A.4.10.d":"landing distance runway condition",
 "A.4.11.a":"field length accelerate stop obstacle",
 "A.4.11.b":"rate climb ceiling gradient single",
 "A.4.11.c":"cruise flow range endurance oei",
 "A.4.11.d":"landing field balked short",
 "A.4.12.a":"datum arm moment mac lemac mzfm mtom mlm terminology centre gravity",
 "A.4.12.b":"limit structural stress stability position centre gravity",
 "A.4.12.c":"calculation shift weight loss percent",
 "A.4.12.d":"taxi trip reserve extra payload fuel",
 "A.4.13.a":"equal time critical point pet",
 "A.4.13.b":"return safe point pnr psr",
 "A.4.13.c":"specific weight gravity consumption ratio fuel",
 # Air Law (multi sub-topic)
 "A.3.2.a":"accident incident notification report notify",
 "A.3.2.b":"scene guard access evidence removal wreckage",
 "A.3.3.a":"logbook entry falsification record",
 "A.3.3.b":"maintenance release service compass",
 "A.3.4.a":"licence rating pilot",
 "A.3.4.b":"medical language flight time logging",
 "A.3.4.c":"commercial examination skill test privilege validity cpl",
 "A.3.4.d":"type class rating",
 "A.3.5.a":"medical certificate class validity period",
 "A.3.5.b":"duty substance abuse suspension cancellation",
 "A.3.6.a":"authority commander crew responsibility recency",
 "A.3.6.b":"document carried flight plan fuel record",
 "A.3.6.c":"instrument equipment light oxygen elt acas taws",
 "A.3.6.d":"right way minimum height semi circular rule minima",
 "A.3.6.e":"radio communication mandatory failure rcf procedure",
 "A.3.6.f":"operating minima fuel supply passenger briefing",
 "A.3.16.a":"airspace classification radar altimeter setting",
 "A.3.16.b":"aerodrome information chart interpretation",
 "A.3.18.a":"runway clearway stopway taxiway threshold marking definition",
 "A.3.18.b":"declared distance tora toda asda lda",
 "A.3.18.c":"visual aid marking light sign",
}
for sec,al in akw.items():
    for i,(aid,kw) in enumerate(al):
        if aid in OVERRIDE: al[i]=(aid, kw | toks(OVERRIDE[aid]))
hard={"aircraft-technical-pof-boost.ts":"A.1.8","aircraft-technical-electrics-boost.ts":"A.1.3"}
SEC=re.compile(r'^[A-C]\.\d+\.\d+$')
def lits(s): return re.findall(r'"((?:[^"\\]|\\.)*)"',s)
pref=('aircraft-technical','airlaw','fpp','human-performance','instruments','met','nav','radionav')
EXCL=('notes','flashcard','syllabus','figure','infographic','brief','seed')
files=[os.path.basename(f) for f in glob.glob(f"{D}/*.ts")
       if any(os.path.basename(f).startswith(p) for p in pref)
       and not os.path.basename(f).startswith(('ppl','ir-'))
       and re.search(r'question|boost|gap|ecqb|cae|exam',os.path.basename(f))
       and not any(e in os.path.basename(f) for e in EXCL)]
ASP=re.compile(r'^[A-C]\.\d+\.\d+\.[a-z]\d?$')
# rows: (id, sec, text, explicit_aspect_or_None)
rows=[]
OPT=r'optionA:\s*"((?:[^"\\]|\\.)*)".*?optionB:\s*"((?:[^"\\]|\\.)*)".*?optionC:\s*"((?:[^"\\]|\\.)*)".*?optionD:\s*"((?:[^"\\]|\\.)*)"'
for f in files:
    s=open(f"{D}/{f}",encoding="utf-8").read()
    # object-literal questions (question + the 4 options as classification text)
    for m in re.finditer(r'id:\s*"([^"]+)",\s*sectionId:\s*"([^"]+)"(.*?)question:\s*"((?:[^"\\]|\\.)*)"(.*?)'+OPT,s,re.DOTALL):
        if not SEC.match(m.group(2)): continue
        am=re.search(r'aspect:\s*"([^"]+)"',m.group(3)+m.group(5))
        text=" ".join([m.group(4),m.group(6),m.group(7),m.group(8),m.group(9)])
        rows.append((m.group(1),m.group(2),text,am.group(1) if am and ASP.match(am.group(1)) else None))
    for m in re.finditer(r'\bq\(\s*((?:"(?:[^"\\]|\\.)*"\s*,\s*){2,})',s):
        L=lits(m.group(1))
        if not L: continue
        qid=L[0]
        # find question index, then use question + next 4 (options) as text
        if len(L)>=3 and SEC.match(L[1]) and ASP.match(L[2]): sec=L[1]; asp=L[2]; qi=3
        elif len(L)>=2 and SEC.match(L[1]): sec=L[1]; asp=None; qi=2
        else: sec=hard.get(f); asp=None; qi=1
        if not (sec and SEC.match(sec)): continue
        text=" ".join(L[qi:qi+5])
        rows.append((qid,sec,text,asp))
# dedup by id (last wins)
byid={r[0]:r for r in rows}; rows=list(byid.values())
secq={}      # sec -> texts needing keyword classification
preset={}    # sec -> {aspectId: count} (exact: explicit tag or single-aspect section)
amap={}      # id -> {aspect, conf}
def add_tagged(sec,asp):
    preset.setdefault(sec,{}); preset[sec][asp]=preset[sec].get(asp,0)+1
for qid,sec,text,exp in rows:
    al=aspects.get(sec,[])
    if exp:
        add_tagged(sec,exp); amap[qid]={"aspect":exp,"conf":"exact"}
    elif len(al)==1:                         # single sub-topic → certain
        add_tagged(sec,al[0][0]); amap[qid]={"aspect":al[0][0],"conf":"exact"}
    else:
        secq.setdefault(sec,[]).append((qid,text))
def classify(sec,text):
    al=akw.get(sec,[])
    if len(al)==1: return al[0][0]           # single sub-topic → all belong to it
    tt=set(toks(text)); best=None;bs=0
    for aid,kw in al:
        sc=len(tt&kw)
        if sc>bs: bs=sc;best=aid
    return best
cov={}
allsecs=set(preset)|set(secq)
for sec in allsecs:
    al=aspects.get(sec)
    base=dict(preset.get(sec,{}))
    if not al:
        cov[sec]={"total":sum(base.values())+len(secq.get(sec,[])),"aspects":{},"unmatched":len(secq.get(sec,[])),"note":"no sub-topics defined"}; continue
    cnt={aid:0 for aid,_ in al}
    for aid,n in base.items():
        if aid in cnt: cnt[aid]+=n
    un=0; exact=sum(base.values())
    for qid,q in secq.get(sec,[]):
        a=classify(sec,q)
        if a: cnt[a]+=1; amap[qid]={"aspect":a,"conf":"estimated"}
        else: un+=1; amap[qid]={"aspect":None,"conf":"unmatched"}
    cov[sec]={"total":exact+len(secq.get(sec,[])),"aspects":cnt,"unmatched":un,
              "exact":exact,"estimated":len(secq.get(sec,[]))-un,
              "zero":[aid for aid,c in cnt.items() if c==0],
              "descriptions":{aid:txt for aid,txt in al}}
json.dump(cov,open(f"{D}/aspect-coverage.json","w"),indent=1)
json.dump(amap,open(f"{D}/aspect-map.json","w"),indent=0)
tq=sum(v["total"] for v in cov.values())
ex=sum(1 for v in amap.values() if v["conf"]=="exact")
es=sum(1 for v in amap.values() if v["conf"]=="estimated")
um=sum(1 for v in amap.values() if v["conf"]=="unmatched")
print(f"Tagged {len(amap)} questions across {len(cov)} sections.")
print(f"  EXACT (tagged or single-sub-topic section): {ex}")
print(f"  ESTIMATED (keyword match, needs review):     {es}")
print(f"  UNMATCHED (no keyword overlap):              {um}")
print(f"-> {D}/aspect-coverage.json  +  {D}/aspect-map.json\n")
print("LIKELY-UNCOVERED sub-topics (multi-aspect, zero count, unmatched<=5):")
leads=0
for sec in sorted(cov,key=lambda x:(int(x.split('.')[1]),int(x.split('.')[2]))):
    v=cov[sec]
    if v.get("zero") and len(v["aspects"])>1 and v["unmatched"]<=5:
        for z in v["zero"]: print(f"  {z}  — {v['descriptions'][z]}"); leads+=1
if not leads: print("  (none)")
