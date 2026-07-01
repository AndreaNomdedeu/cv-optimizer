'use client';
import React from 'react';

const DOCS = [
  { t:'cv', name:'Human Rights Officer — OHCHR — Pretoria', sub:'UN register · tailored', sector:'UN & agencies', sc:'un', track:'COMPETENCY-BASED', status:'Interview', created:'Mar 18, 2026', mod:'1 month ago' },
  { t:'cv', name:'Programme Manager — EU Delegation to Guyana', sub:'UN register → EPSO / EU', sector:'EU institutions', sc:'eu', track:'EU · EPSO', status:'Sent', created:'Mar 16, 2026', mod:'3 weeks ago' },
  { t:'cv', name:'Social Affairs Officer — ECLAC — Santiago', sub:'UN register · tailored', sector:'UN & agencies', sc:'un', track:'COMPETENCY-BASED', status:'Sent', created:'Mar 12, 2026', mod:'1 month ago' },
  { t:'cv', name:'Human Rights Specialist — IACHR — Washington DC', sub:'UN register · tailored', sector:'Inter-American', sc:'inter', track:'COMPETENCY-BASED', status:'Draft', created:'Mar 9, 2026', mod:'2 months ago' },
  { t:'cv', name:'Geopolitical Risk Researcher — Control Risks — Mexico City', sub:'UN register → Corporate (EN)', sector:'Corporate', sc:'corp', track:'CORPORATE', status:'Sent', created:'Feb 28, 2026', mod:'2 months ago' },
  { t:'cv', name:'Research & Advocacy Lead — Amnesty International', sub:'UN register · tailored', sector:'NGO / civil society', sc:'ngo', track:'COMPETENCY-BASED', status:'Draft', created:'Feb 20, 2026', mod:'3 months ago' },
  { t:'cv', name:'Governance Officer — African Union — Addis Ababa', sub:'UN register · tailored', sector:'African system', sc:'afr', track:'COMPETENCY-BASED', status:'Draft', created:'Feb 14, 2026', mod:'3 months ago' },
  { t:'cv', name:'Delegate — ICRC', sub:'UN register · tailored', sector:'Other intl org', sc:'other', track:'COMPETENCY-BASED', status:'Interview', created:'Feb 11, 2026', mod:'2 months ago' },
  { t:'cl', name:'Cover letter — OHCHR — Pretoria', sub:'Motivation letter', sector:'UN & agencies', sc:'un', track:'COMPETENCY-BASED', status:'Sent', created:'Mar 18, 2026', mod:'1 month ago' },
  { t:'cl', name:'Cover letter — Control Risks — Mexico City', sub:'Motivation letter', sector:'Corporate', sc:'corp', track:'CORPORATE', status:'Draft', created:'Feb 28, 2026', mod:'2 months ago' },
];

const CSS = `
.mdoc{min-height:100vh;display:flex;background:#F7F8FC;color:#1F2433;font-family:ui-sans-serif,system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial}
.side{width:248px;flex-shrink:0;background:#fff;border-right:1px solid #ECEDF3;padding:22px 16px;display:flex;flex-direction:column;gap:18px;position:sticky;top:0;height:100vh}
.brand{display:flex;align-items:center;gap:10px;padding:4px 6px}
.logo{width:34px;height:34px;border-radius:10px;overflow:hidden;display:flex;align-items:center;justify-content:center;flex-shrink:0}
.brand b{font-size:18px;font-weight:800;letter-spacing:-.02em}
.cta{display:flex;align-items:center;justify-content:center;gap:8px;background:#4F46E5;color:#fff;border:none;border-radius:12px;padding:12px;font-weight:700;font-size:14px;cursor:pointer;text-decoration:none}
.cta:hover{background:#4338CA}
.nav{display:flex;flex-direction:column;gap:2px;margin-top:4px}
.nav a{display:flex;align-items:center;gap:11px;padding:10px 12px;border-radius:10px;color:#5B6478;font-size:14px;font-weight:600;text-decoration:none}
.nav a:hover{background:#F7F8FC;color:#1F2433}
.nav a.active{background:#EEF0FF;color:#4F46E5}
.nav a svg{width:18px;height:18px;flex-shrink:0}
.main{flex:1;padding:34px 40px;max-width:1280px}
.htop{display:flex;align-items:flex-start;justify-content:space-between;gap:20px;flex-wrap:wrap}
.h1{font-size:30px;font-weight:800;letter-spacing:-.02em;margin:0}
.lede{margin:6px 0 0;color:#5B6478;font-size:15px}
.lede b{color:#1F2433;font-weight:700}
.bar{display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;margin-top:26px;border-bottom:1px solid #ECEDF3;padding-bottom:0}
.tabs{display:flex;gap:26px}
.tab{display:flex;align-items:center;gap:8px;padding:0 2px 14px;color:#5B6478;font-size:14px;font-weight:600;cursor:pointer;border-bottom:2px solid transparent;background:none;border-top:none;border-left:none;border-right:none}
.tab .ct{color:#9aa1b2;font-weight:700}
.tab.active{color:#4F46E5;border-bottom-color:#4F46E5}
.tab.active .ct{color:#4F46E5}
.tools{display:flex;align-items:center;gap:10px;padding-bottom:10px}
.sel,.search{height:42px;border:1px solid #E3E5ee;border-radius:11px;background:#fff;font-size:14px;color:#1F2433}
.sel{padding:0 14px;min-width:150px}
.search{display:flex;align-items:center;gap:8px;padding:0 14px;min-width:280px;color:#9aa1b2}
.search input{border:none;outline:none;font-size:14px;width:100%;background:none;color:#1F2433}
.search svg{width:18px;height:18px;flex-shrink:0;color:#9aa1b2}
.tab svg{width:16px;height:16px;flex-shrink:0}
.sel{appearance:none}
.mdcard{margin-top:18px;background:#fff;border:1px solid #ECEDF3;border-radius:16px;overflow:hidden}
.thead,.row{display:grid;grid-template-columns:minmax(280px,2.4fr) 1.3fr .9fr .8fr .9fr 120px;align-items:start;gap:14px;padding:18px 22px}
.thead{color:#9aa1b2;font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;border-bottom:1px solid #F0F1F6}
.row{border-bottom:1px solid #F4F5F9}
.row:last-child{border-bottom:none}
.row:hover{background:#FBFBFE}
.row.hl{background:#FBFAFF;box-shadow:inset 3px 0 0 #4F46E5}
.icobtn{background:none;border:none;padding:0;cursor:pointer;color:#b6bccb;display:flex;align-items:center}
.nm{display:flex;align-items:flex-start;gap:13px}
.dico{width:34px;height:34px;border-radius:9px;flex-shrink:0;display:flex;align-items:center;justify-content:center}
.dico.cv{background:#EEF0FF;color:#4F46E5}
.dico.cl{background:#E6F5F4;color:#0EA5A4}
.nm b{font-size:14.5px;font-weight:700;line-height:1.3;display:block}
.nm span{font-size:12.5px;color:#9aa1b2}
.badges{display:flex;flex-direction:column;gap:7px;align-items:flex-start}
.sect{display:inline-flex;align-items:center;gap:7px;font-size:12.5px;font-weight:700;padding:5px 11px;border-radius:999px}
.sect .dt{width:7px;height:7px;border-radius:999px;background:currentColor}
.mdtrack{display:inline-block;font-size:10.5px;font-weight:700;letter-spacing:.04em;color:#8b93a5;border:1px solid #E7E9F1;border-radius:7px;padding:3px 8px}
.mdpill{display:inline-flex;align-items:center;gap:7px;font-size:12.5px;font-weight:700;padding:5px 12px;border-radius:999px}
.mdpill .dt{width:7px;height:7px;border-radius:999px;background:currentColor}
.dt2{color:#9aa1b2;font-size:13.5px}
.acts{display:flex;align-items:center;gap:14px;color:#b6bccb;justify-content:flex-end}
.acts svg{width:17px;height:17px;cursor:pointer}
.acts svg:hover{color:#4F46E5}
`;

const SECT = {
  un:    { bg: '#EEF0FF', fg: '#4F46E5' },
  eu:    { bg: '#E8F0FE', fg: '#2563EB' },
  inter: { bg: '#FCEFE0', fg: '#C2772A' },
  corp:  { bg: '#E6F5F4', fg: '#0E8F8E' },
  ngo:   { bg: '#FCE8F0', fg: '#C43B7A' },
  afr:   { bg: '#E7F4EA', fg: '#2E8B57' },
  other: { bg: '#EFECFB', fg: '#6A5CF0' },
};
const STAT = {
  Interview: { bg: '#FBEFD8', fg: '#B5862B' },
  Sent:      { bg: '#E6EEFC', fg: '#3B6FD4' },
  Draft:     { bg: '#EDEFF3', fg: '#6B7080' },
};

export default function MyDocumentsPage() {
  const [tab, setTab] = React.useState('all');
  const [docs, setDocs] = React.useState(DOCS.map(function (d, i) { return Object.assign({ id: i, hl: false }, d); }));
  const STATES = ['Draft', 'Sent', 'Interview'];
  function cycle(id) { setDocs(function (ds) { return ds.map(function (d) { if (d.id !== id) return d; var n = STATES[(STATES.indexOf(d.status) + 1) % STATES.length]; return Object.assign({}, d, { status: n }); }); }); }
  function toggleHl(id) { setDocs(function (ds) { return ds.map(function (d) { return d.id === id ? Object.assign({}, d, { hl: !d.hl }) : d; }); }); }
  function dup(id) { setDocs(function (ds) { var idx = ds.findIndex(function (d) { return d.id === id; }); var copy = Object.assign({}, ds[idx], { id: Date.now() + Math.random() }); var out = ds.slice(); out.splice(idx + 1, 0, copy); return out; }); }
  function remove(id) { if (typeof window !== 'undefined' && !window.confirm('Delete this document?')) return; setDocs(function (ds) { return ds.filter(function (d) { return d.id !== id; }); }); }
  function download(d) { if (typeof window === 'undefined') return; var body = d.name + '\n' + d.sub + '\n' + d.sector + ' / ' + d.track; var blob = new Blob([body], { type: 'text/plain' }); var url = URL.createObjectURL(blob); var a = document.createElement('a'); a.href = url; a.download = d.name.replace(/[^a-z0-9]+/gi, '_') + '.txt'; a.click(); URL.revokeObjectURL(url); }
  const counts = { all: docs.length, cv: docs.filter(function (d) { return d.t === 'cv'; }).length, cl: docs.filter(function (d) { return d.t === 'cl'; }).length };
  const shown = docs.filter(function (d) { return tab === 'all' ? true : d.t === tab; });

  return (
    <div className='mdoc'>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <aside className='side'>
        <div className='brand'>
          <span className='logo'><svg viewBox="0 0 36 36" width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="cvg" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse"><stop stop-color="#4F46E5"/><stop offset="0.55" stop-color="#2563EB"/><stop offset="1" stop-color="#1AB5C9"/></linearGradient></defs><rect width="36" height="36" rx="9" fill="url(#cvg)"/><path d="M9 9.5a1.5 1.5 0 0 1 1.5-1.5h9.7l5.3 5.3v13.2a1.5 1.5 0 0 1-1.5 1.5H10.5A1.5 1.5 0 0 1 9 26.5z" fill="#ffffff"/><path d="M20.2 8v3.8a1.5 1.5 0 0 0 1.5 1.5h3.8z" fill="#3B6FD4"/><circle cx="14.8" cy="14.6" r="2.3" fill="#3B6FD4"/><path d="M11.2 19.6c0-2 1.6-3.2 3.6-3.2s3.6 1.2 3.6 3.2z" fill="#3B6FD4"/><rect x="11.2" y="20.8" width="9.4" height="1.5" rx="0.75" fill="#3B6FD4"/><rect x="11.2" y="23.2" width="8" height="1.5" rx="0.75" fill="#3B6FD4"/><rect x="11.2" y="25.6" width="6" height="1.5" rx="0.75" fill="#3B6FD4"/><circle cx="24.5" cy="25.5" r="5.2" fill="#ffffff"/><path d="M24.8 21.6l0.7 2.1 2.1 0.7-2.1 0.7-0.7 2.1-0.7-2.1-2.1-0.7 2.1-0.7z" fill="#3B6FD4"/><path d="M22.3 26.2l0.4 1.2 1.2 0.4-1.2 0.4-0.4 1.2-0.4-1.2-1.2-0.4 1.2-0.4z" fill="#3B6FD4"/></svg></span>
          <b>CV Optimizer</b>
        </div>
        <a className='cta' href='/optimize'>+ Translate my CV</a>
        <nav className='nav'>
          <a href='/dashboard'><svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round'><path d='M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-4v-6H8v6H4a1 1 0 0 1-1-1z'/></svg>Dashboard</a>
          <a href='/optimize'><svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round'><path d='M7 3h7l5 5v13H7z'/><path d='M14 3v5h5'/></svg>Translate my CV</a>
          <a href='/cover-letters/write'><svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round'><rect x='3' y='5' width='18' height='14' rx='2'/><path d='M3 7l9 6 9-6'/></svg>Write my cover letter</a>
          <a href='/my-documents' className='active'><svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round'><path d='M7 3h7l5 5v13H7z'/><path d='M9 13h6M9 17h4'/></svg>My documents</a>
          <a href='/interview-tips'><svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round'><circle cx='12' cy='12' r='9'/><path d='M12 8v4l3 2'/></svg>Interview tips</a>
          <a href='/templates'><svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round'><rect x='4' y='4' width='16' height='16' rx='2'/><path d='M8 9h8M8 13h5'/></svg>CV templates</a>
          <a href='/career-guide'><svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round'><path d='M4 5h11v15H4z'/><path d='M8 9h6M8 13h8'/></svg>Career Guide</a>
        </nav>
      </aside>
      <main className='main'>
        <div className='htop'>
          <div>
            <h1 className='h1'>My documents</h1>
            <p className='lede'>Welcome back, Andrea  You have <b>{DOCS.length} documents</b> across <b>7 sectors</b>.</p>
          </div>
        </div>
        <div className='bar'>
          <div className='tabs'>
            <button className={tab === 'all' ? 'tab active' : 'tab'} onClick={function () { setTab('all'); }}>All documents <span className='ct'>{counts.all}</span></button>
            <button className={tab === 'cv' ? 'tab active' : 'tab'} onClick={function () { setTab('cv'); }}><svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round'><path d='M7 3h7l5 5v13H7z'/></svg>Resumes <span className='ct'>{counts.cv}</span></button>
            <button className={tab === 'cl' ? 'tab active' : 'tab'} onClick={function () { setTab('cl'); }}><svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round'><rect x='3' y='5' width='18' height='14' rx='2'/><path d='M3 7l9 6 9-6'/></svg>Cover letters <span className='ct'>{counts.cl}</span></button>
          </div>
          <div className='tools'>
            <select className='sel' defaultValue='all'>
              <option value='all'>All sectors</option>
              <option>UN & agencies</option>
              <option>EU institutions</option>
              <option>Corporate</option><option>Inter-American</option><option>NGO / civil society</option><option>African system</option><option>Other intl org</option>
            </select>
            <div className='search'><svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round'><circle cx='11' cy='11' r='7'/><path d='M21 21l-4-4'/></svg><input placeholder='Search by role or organization...' /></div>
          </div>
        </div>
        <div className='mdcard'>
          <div className='thead'>
            <div>Name</div><div>Sector / Track</div><div>Status</div><div>Created</div><div>Modified</div><div></div>
          </div>
          {shown.map(function (d, i) {
            var sc = SECT[d.sc] || SECT.un;
            var st = STAT[d.status] || STAT.Draft;
            return (
              <div className={d.hl ? 'row hl' : 'row'} key={d.id}>
                <div className='nm'>
                  <span className={'dico ' + d.t}>
                    {d.t === 'cl'
                      ? <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round'><rect x='3' y='5' width='18' height='14' rx='2'/><path d='M3 7l9 6 9-6'/></svg>
                      : <svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round'><path d='M7 3h7l5 5v13H7z'/><path d='M14 3v5h5'/></svg>}
                  </span>
                  <div><b>{d.name}</b><span>{d.sub}</span></div>
                </div>
                <div className='badges'>
                  <span className='sect' style={{ background: sc.bg, color: sc.fg }}><span className='dt' /> {d.sector}</span>
                  <span className='mdtrack'>{d.track}</span>
                </div>
                <div><span className='mdpill' onClick={function () { cycle(d.id); }} title='Click to change status' style={{ background: st.bg, color: st.fg, cursor: 'pointer' }}><span className='dt' /> {d.status}</span></div>
                <div className='dt2'>{d.created}</div>
                <div className='dt2'>{d.mod}</div>
                <div className='acts'>
                  <button type='button' className='icobtn' onClick={() => dup(d.id)}><svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round'><rect x='9' y='9' width='12' height='12' rx='2'/><path d='M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1'/></svg></button>
                  <button type='button' className='icobtn' onClick={() => toggleHl(d.id)}><svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round'><path d='M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6z'/></svg></button>
                  <button type='button' className='icobtn' onClick={() => download(d)}><svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round'><path d='M12 4v10m0 0l-4-4m4 4l4-4'/><path d='M5 20h14'/></svg></button>
                  <button type='button' className='icobtn' onClick={() => remove(d.id)}><svg viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round'><path d='M4 7h16M9 7V5h6v2m-7 0v12a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V7'/></svg></button>
                </div>

              </div>
            );
          })}
        </div>
      </main>
    </div>
  );
}

