// plan:page: the whole course on one local page: the written units as they are and the planned units from the plan,
// every module with every word it teaches and the word's meaning, where each level is reached, and a search box.
// The page is for reading on this machine. When this machine has a frequency file for the language, the page shows
// each unit's band; it never shows a frequency value, and the page is not committed.
//
// renderPage({ plan, report, context, lang, repoRoot, trend }) -> html
import { READING_KIND } from './md.mjs';
import { wordReader } from './words.mjs';

const E = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const fold = (s) => String(s).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
const KIND = { lesson: 'Lesson', guide: 'Guide', reading: 'Reading', practice: 'Practice', unit_exam: 'Exam', reference: 'Reference' };
const num = (x) => x.toLocaleString('en-US');

const CSS = `:root{--ink:#1d2433;--soft:#5b6476;--line:#e3e6ec;--bg:#f7f8fa;--card:#fff;--navy:#1f3a6e;--blue:#e8eefb;--add:#fff3d6}
*{box-sizing:border-box}body{margin:0;font:15px/1.5 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;color:var(--ink);background:var(--bg)}
main{max-width:1100px;margin:0 auto;padding:32px 20px 80px}h1{font-size:28px;margin:0 0 6px}h2{font-size:19px;margin:40px 0 12px}
.lead{color:var(--soft);margin:0 0 24px;max-width:780px}.grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
.stat{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:14px}.stat b{display:block;font-size:24px}.stat span{color:var(--soft);font-size:13px}
table{width:100%;border-collapse:collapse}.mil td,.mil th{padding:8px 10px;border-bottom:1px solid var(--line);text-align:left}.mil{background:var(--card);border:1px solid var(--line);border-radius:12px;overflow:hidden}
.trend{display:flex;gap:4px;align-items:flex-end;height:120px;background:var(--card);border:1px solid var(--line);border-radius:12px;padding:12px 12px 26px}
.bar{flex:1;height:100%;position:relative;display:flex;align-items:flex-end}.bar i{display:block;width:100%;background:var(--navy);border-radius:3px 3px 0 0;opacity:.8}
.bar span{position:absolute;bottom:-20px;left:0;right:0;text-align:center;font-size:11px;color:var(--soft)}
.note{color:var(--soft);font-size:13px;margin:8px 0 0}
.tools{position:sticky;top:0;background:var(--bg);padding:12px 0;z-index:2;display:flex;gap:10px;align-items:center}
.tools input{flex:1;padding:10px 12px;border:1px solid var(--line);border-radius:10px;font-size:15px}.tools button{padding:9px 12px;border:1px solid var(--line);border-radius:10px;background:var(--card);cursor:pointer}
details.unit{background:var(--card);border:1px solid var(--line);border-radius:12px;margin:0 0 10px;padding:4px 14px}
summary{cursor:pointer;padding:10px 0;list-style:none}summary::-webkit-details-marker{display:none}
.un{font-weight:700;color:var(--navy)}.ut{font-weight:600}.st{font-size:12px;padding:2px 8px;border-radius:99px;margin-left:6px}.st.written{background:#e4f4ea;color:#1c6b3a}.st.planned{background:var(--blue);color:var(--navy)}
.cnt{float:right;color:var(--soft);font-size:13px}.can{color:var(--soft);font-size:14px;margin-top:2px}
.set,.rd{font-size:14px;margin:4px 0 10px;color:#333}td{vertical-align:top;padding:10px 8px;border-top:1px solid var(--line)}
td.kind{width:84px;font-size:12px;color:var(--soft);text-transform:uppercase;letter-spacing:.04em}td.n{width:34px;text-align:right;color:var(--soft)}
tr.k-guide td.kind{color:#8a4b00}tr.k-reading td.kind{color:#1c6b3a}.mt{font-weight:600}.goal{font-size:13px;color:var(--soft)}
.ws{margin-top:6px;display:flex;flex-wrap:wrap;gap:4px}.w{background:var(--blue);border-radius:6px;padding:2px 7px;font-size:13px}.w i{color:var(--soft);font-style:normal}
.w.add{background:var(--add)}.cx{display:inline-block;font:12px ui-monospace,Menlo,monospace;background:#f0f0f3;border-radius:4px;padding:1px 5px;margin:4px 4px 0 0}
.sp{font-size:13px;margin-top:6px;padding:6px 9px;background:#eef4fb;border-radius:8px;color:#1f3550}.sp i{color:#3d5878}.cn{font-size:13px;margin-top:6px;padding:6px 9px;background:#fbf6ea;border-radius:8px;color:#4a3d1c}.cu{font-size:14px;margin:2px 0 6px;color:#333}
.tag{font-size:11px;padding:2px 8px;border-radius:99px;margin-left:6px;font-weight:600}.tag.th{background:#f3e3d3;color:#7a3e0c}.tag.tc{background:#e3efe0;color:#27632a}p.cu .tag{margin:0 6px 0 0}
.rk{font-size:11px;padding:2px 8px;border-radius:99px;margin:0 2px;background:#ece8f7;color:#44307a;font-weight:600}
.hide{display:none!important}.legend{font-size:13px;color:var(--soft)}.legend .w{margin:0 4px}`;

const JS = `var q=document.getElementById('q');
q.addEventListener('input',function(){var v=q.value.trim().toLowerCase().normalize('NFD').replace(/[\\u0300-\\u036f]/g,'');
document.querySelectorAll('details.unit').forEach(function(d){var any=false;d.querySelectorAll('.w').forEach(function(w){var hit=!v||w.dataset.q.indexOf(v)>=0;w.classList.toggle('hide',!hit);if(v&&hit)any=true;});
d.querySelectorAll('tr').forEach(function(tr){tr.classList.toggle('hide',!!v&&!tr.querySelector('.w:not(.hide)'));});d.classList.toggle('hide',!!v&&!any);if(v&&any)d.open=true;});});
document.getElementById('all').onclick=function(){document.querySelectorAll('details.unit').forEach(function(d){d.open=true;});};
document.getElementById('none').onclick=function(){document.querySelectorAll('details.unit').forEach(function(d){d.open=false;});};`;

export function renderPage({ plan, report, context, lang, repoRoot, trend = null }) {
  const word = wordReader({ repoRoot, plan, lookups: context.lookups });
  const span = (text) => E(text).replace(/\{([^}]+)\}/g, `<span lang="${lang}">$1</span>`);
  const chip = (w) => `<span class="w${w.to_add ? ' add' : ''}" data-q="${E(fold(`${w.lemma} ${w.gloss}`))}"><b lang="${lang}">${E(w.lemma)}</b>${w.gloss ? ` <i>${E(w.gloss)}</i>` : ''}</span>`;
  const language = new Intl.DisplayNames(['en'], { type: 'language' }).of(lang);
  const short = (id) => id.split(':').slice(2).join(':');

  // The written course, from the module files: each module with the words its table teaches.
  const units = [];
  let cards = 0;
  for (const u of context.base.content.units) {
    const mods = u.modules.filter((m) => m.status !== 'planned').map((m) => {
      const seen = new Set();
      const words = (m.vocabulary ?? []).filter((v) => !v.review && typeof v.fr === 'string' && !seen.has(fold(v.fr)) && seen.add(fold(v.fr)))
        .map((v) => ({ lemma: v.fr, gloss: String(v.gloss ?? '').replace(/[{}]/g, ''), to_add: false }));
      cards += words.length;
      return { kind: m.kind, title: m.title ?? KIND[m.kind], words };
    });
    if (mods.length) units.push({ unit_key: u.unit_key, n: units.length + 1, title: u.name, can: u.can_do_short ?? '', written: true, mods });
  }
  const writtenUnits = units.length;
  for (const u of plan.units) {
    units.push({
      unit_key: u.unit_key, n: units.length + 1, title: u.title, can: u.can_do, written: false, plan: u,
      mods: u.modules.map((m) => ({ ...m, words: m.teaches.words.map(word) })),
    });
  }
  const noGloss = units.flatMap((u) => u.mods).flatMap((m) => m.words).filter((w) => !w.gloss).length;

  const sections = units.map((u, i) => {
    const rows = u.mods.map((m) => {
      const cx = (m.teaches?.constructions ?? []).map((c) => `<span class="cx">${E(short(c))}</span>`).join('');
      return `<tr class="k-${E(m.kind)}"><td class="kind">${E(KIND[m.kind] ?? m.kind)}</td><td><div class="mt">${span(m.title)}</div>`
        + (m.goal ? `<div class="goal">${span(m.goal)}</div>` : '') + (cx ? `<div>${cx}</div>` : '')
        + (m.culture_note ? `<div class="cn"><b>Culture note.</b> ${E(m.culture_note)}</div>` : '')
        + (m.spoken?.length ? `<div class="sp"><b>Spoken.</b> <span lang="${lang}">${E(m.spoken.join(', '))}</span>${m.spoken_example ? ` <i lang="${lang}">${E(m.spoken_example)}</i>` : ''}</div>` : '')
        + `<div class="ws">${m.words.map(chip).join('')}</div></td><td class="n">${m.words.length || ''}</td></tr>`;
    }).join('');
    let extra = '';
    let marks = '';
    if (u.plan) {
      extra += `<p class="set"><b>Setting.</b> ${E(u.plan.setting.cast.join('; '))}</p>`;
      for (const m of u.plan.modules.filter((x) => x.reading)) {
        const r = m.reading;
        const parts = r.parts.map((p) => `<span lang="${lang}">${E(p.title)}</span> <span class="rk">${E(READING_KIND[p.kind])}</span>`).join(' and ');
        extra += `<p class="rd"><b>Reading: ${parts}</b> (${E(r.parts.map((p) => p.title_native).join('; '))}${r.genre ? `, ${E(r.genre)}` : ''}). ${E(r.premise)}</p>`;
      }
      const cu = u.plan.culture ?? {};
      if (cu.history) extra += `<p class="cu"><span class="tag th">History</span> ${E(cu.history)}.</p>`;
      if (cu.customs) extra += `<p class="cu"><span class="tag tc">Customs</span> ${E(cu.customs)}.</p>`;
      marks = (cu.history ? '<span class="tag th">History</span>' : '') + (cu.customs ? '<span class="tag tc">Customs</span>' : '');
    }
    const count = u.mods.reduce((s, m) => s + m.words.length, 0);
    return `<details class="unit" id="${E(u.unit_key)}"${i === writtenUnits ? ' open' : ''}><summary><span class="un">Unit ${u.n}</span> <span class="ut">${span(u.title)}</span> `
      + `<span class="st ${u.written ? 'written' : 'planned'}">${u.written ? 'Written' : 'Planned'}</span> ${marks}<span class="cnt">${u.mods.length} modules, ${count} ${u.written ? 'word cards' : 'new words'}</span>`
      + `<div class="can">${span(u.can)}</div></summary>${extra}<table>${rows}</table></details>`;
  }).join('\n');

  const unitNumber = new Map(units.map((u) => [u.unit_key, u.n]));
  const levels = Object.entries(report.levels).map(([level, l]) => {
    const where = !l.reached ? 'Not reached' : l.in_written_course ? 'In the written units' : `Unit ${unitNumber.get(l.unit_key)}`;
    const which = l.reached && l.teaching_module ? `lesson or guide ${l.teaching_module} of ${l.of}` : '';
    return `<tr><td>${level}</td><td><b>${where}</b></td><td>${which}</td><td>${l.reached ? l.position : ''}</td></tr>`;
  }).join('');
  const lastLevel = Object.entries(report.levels).filter(([, l]) => l.reached).at(-1);
  const bands = trend ? Math.max(...trend.map((t) => t.band_index ?? 0)) + 1 : 0;
  const bars = trend ? trend.filter((t) => t.band !== null).map((t) => `<div class="bar" title="Unit ${unitNumber.get(t.unit_key)}: its middle new word is in ${E(t.band)}"><i style="height:${Math.round(((t.band_index + 1) / bands) * 100)}%"></i><span>${unitNumber.get(t.unit_key)}</span></div>`).join('') : '';

  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${E(language)} course, Units 1 to ${units.length}: every word</title>
<style>
${CSS}
</style></head><body><main>
<h1>${E(language)} course, Units 1 to ${units.length}: every word, in order</h1>
<p class="lead">Units 1 to ${writtenUnits} are written. Units ${writtenUnits + 1} to ${units.length} are planned and not written yet. Every lesson lists every new word it teaches, with its English. Guides, readings, culture notes and the history and customs each unit carries are in place. Search for any word to see where it is taught.</p>
<div class="grid">
<div class="stat"><b>${units.length}</b><span>units (${writtenUnits} written, ${plan.units.length} planned)</span></div>
<div class="stat"><b>${num(units.reduce((s, u) => s + u.mods.length, 0))}</b><span>modules: lessons, guides, readings, practice sets, exams</span></div>
<div class="stat"><b>${num(report.words)}</b><span>new words planned, each taught once (the written units show their ${num(cards)} word cards)</span></div>
<div class="stat"><b>${lastLevel ? lastLevel[0] : 'No level'}</b><span>${lastLevel ? `is the highest level the course reaches, in Unit ${unitNumber.get(lastLevel[1].unit_key) ?? ''}` : 'reached yet'}</span></div>
</div>
<h2>Where each level is reached</h2>
<table class="mil"><tr><th>Level</th><th>Reached in</th><th>At</th><th>Position</th></tr>
${levels}</table>
<p class="note">A level counts as reached when 90% of its core words, with the levels below, are available and every core grammar pattern is taught. Positions are places in course order.</p>
${trend ? `<h2>Common words first</h2>
<div class="trend">${bars}</div>
<p class="note">Each bar is a unit. A higher bar means its typical new word is less common in the spoken language. Frequency is used for this check only and is stored in no course file.</p>` : ''}
<h2>Every unit</h2>
<div class="tools"><input id="q" type="search" placeholder="Find a word in either language (maison, house)"><button id="all" type="button">Open all</button><button id="none" type="button">Close all</button></div>
<p class="legend"><span class="w"><b>mot</b> <i>word</i></span> taught and in the language graph <span class="w add"><b>mot</b> <i>word</i></span> to add to the graph before writing${noGloss ? `. ${noGloss} words have no English here yet.` : ''}</p>
${sections}
</main><script>
${JS}
</script></body></html>
`;
}
