'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function TranslatePage() {
  const [mode, setMode] = useState('upload');
  const [fileName, setFileName] = useState('');
  const [cvText, setCvText] = useState('');
  const [jobLink, setJobLink] = useState('');
  const [jobText, setJobText] = useState('');
  const [comingFrom, setComingFrom] = useState('');
  const [goingTo, setGoingTo] = useState('');

  const P = '#4F46E5', INK = '#1F2433', MUT = '#6B7384', LINE = '#E5E7F0', BG = '#F6F7FB', CARD = '#FFFFFF', SOFT = '#EEF0FB';
  const steps = ['Your CV', 'The job', 'Direction', 'Review'];
  const active = 3;
  const [running, setRunning] = useState(false);
  const [err, setErr] = useState('');
  const [parsed, setParsed] = useState<any>(null);
  const [position, setPosition] = useState<any>(null);
  const [review, setReview] = useState<any>(null);
  const [intel, setIntel] = useState<any>(null);
  const [coaching, setCoaching] = useState<any>(null);
  const [depthLoading, setDepthLoading] = useState('');
  async function post(url: string, payload: any) {
    const r = await fetch(url, { method: 'POST', headers: { "Content-Type": 'application/json' }, body: JSON.stringify(payload) });
    return r.json();
  }
  async function runCorePath() {
    setErr('');
    if (!cvText.trim()) { setErr('Add your CV text first (paste text mode).'); return; }
    if (!jobText.trim()) { setErr('Paste the job description first.'); return; }
    setRunning(true);
    setParsed(null); setPosition(null); setReview(null); setIntel(null); setCoaching(null);
    try {
      const p = await post('/api/parse', { cvText, jobText });
      if (!p.ok) throw new Error(p.error || 'Parse failed');
      setParsed(p.parsed);
      const pos = await post('/api/position', { parse: p.parsed, diagnosis: null, track: goingTo });
      if (!pos.ok) throw new Error(pos.error || 'Position failed');
      setPosition(pos.position);
      const rev = await post('/api/review', { parse: p.parsed, position: pos.position, track: goingTo, budget: '3-5' });
      if (!rev.ok) throw new Error(rev.error || 'Review failed');
      setReview(rev.review);
    } catch (e: any) {
      setErr(String(e && e.message ? e.message : e));
    } finally {
      setRunning(false);
    }
  }
  async function loadIntel() {
    if (!parsed) return;
    setDepthLoading('intel'); setErr('');
    try {
      const d = await post('/api/intelligence', { parse: parsed, track: goingTo, sectorOrigin: comingFrom });
      if (!d.ok) throw new Error(d.error || 'Intelligence failed');
      setIntel(d.diagnosis);
    } catch (e: any) { setErr(String(e && e.message ? e.message : e)); }
    finally { setDepthLoading(''); }
  }
  async function loadCoaching() {
    if (!parsed || !review) return;
    setDepthLoading('coach'); setErr('');
    try {
      const d = await post('/api/coaching', { parse: parsed, review });
      if (!d.ok) throw new Error(d.error || 'Coaching failed');
      setCoaching(d.coaching);
    } catch (e: any) { setErr(String(e && e.message ? e.message : e)); }
    finally { setDepthLoading(''); }
  }


  return (
    <div className="app dashpage"><style jsx global>{`:root{--indigo:#5B4FE8;--indigo-d:#4a3fd4;--ink:#1b1c2a;--grey:#6b7080;--mut:#9498a8;--teal:#13a99c;--green:#1aa251;--bg:#f6f7fb;--card:#fff;--border:#ececf3;--lav:#eef0fe;}.dashpage *{margin:0;padding:0;box-sizing:border-box}.app{font-family:'Inter',system-ui,sans-serif;color:var(--ink);-webkit-font-smoothing:antialiased;display:flex;min-height:100vh;background:var(--bg)}.side{width:265px;background:#fff;border-right:1px solid var(--border);padding:22px 18px;display:flex;flex-direction:column;flex-shrink:0}.brand{display:flex;align-items:center;gap:10px;font-weight:800;font-size:19px;padding:4px 6px 22px}.brand .logo{width:34px;height:34px;border-radius:10px;background:linear-gradient(145deg,#6a5cf0,#4a8fe0);display:flex;align-items:center;justify-content:center}.newbtn{background:var(--indigo);color:#fff;border:none;border-radius:11px;padding:13px;font-weight:700;font-size:14.5px;cursor:pointer;font-family:inherit;margin-bottom:20px;box-shadow:0 8px 18px rgba(91,79,232,.28)}.nav{display:flex;flex-direction:column;gap:3px}.nav a{display:flex;align-items:center;gap:12px;padding:11px 13px;border-radius:10px;text-decoration:none;color:#54596b;font-weight:600;font-size:14.5px}.nav a svg{stroke:#9aa0b2}.nav a.active{background:var(--lav);color:var(--indigo)}.nav a.active svg{stroke:var(--indigo)}.nav a:hover:not(.active){background:#f6f7fb}.upsell{margin-top:auto;background:#f4f5fd;border:1px solid #e8e8f6;border-radius:14px;padding:16px;margin-bottom:14px}.upsell .t{display:flex;align-items:center;gap:8px;font-weight:700;font-size:14px;color:var(--indigo);margin-bottom:8px}.upsell p{font-size:12.5px;color:var(--grey);line-height:1.45;margin-bottom:12px}.upsell button{width:100%;background:#fff;border:1px solid #ddd9f3;color:var(--indigo);border-radius:9px;padding:9px;font-weight:700;font-size:13.5px;cursor:pointer;font-family:inherit}.profile{display:flex;align-items:center;gap:11px;padding:8px 6px}.av{width:38px;height:38px;border-radius:50%;background:linear-gradient(140deg,#6a5cf0,#3ba9e0);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:15px;flex-shrink:0}.profile .nm{font-weight:700;font-size:13.5px}.profile .em{font-size:11.5px;color:var(--mut)}.main{flex:1;padding:26px 34px 40px;min-width:0}.top{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:24px}.top h1{font-size:27px;font-weight:800;letter-spacing:-.02em}.top .sub{color:var(--grey);font-size:15px;margin-top:4px}.topr{display:flex;align-items:center;gap:16px}.upg{display:flex;align-items:center;gap:8px;background:#fff;border:1px solid var(--border);border-radius:10px;padding:10px 16px;font-weight:700;font-size:14px;color:var(--indigo);cursor:pointer;font-family:inherit}.bell{width:40px;height:40px;border-radius:10px;background:#fff;border:1px solid var(--border);display:flex;align-items:center;justify-content:center}.hero{position:relative;overflow:hidden;border-radius:20px;padding:36px 40px;margin-bottom:24px;background:linear-gradient(125deg,#5b4fe8 0%,#5a43d8 45%,#4039b4 100%);color:#fff;display:grid;grid-template-columns:1fr 1fr;gap:30px;align-items:center}.hero .dots{position:absolute;inset:0;opacity:.5;background-image:radial-gradient(rgba(255,255,255,.18) 1px,transparent 1px);background-size:22px 22px;-webkit-mask-image:linear-gradient(110deg,transparent 55%,#000 100%);mask-image:linear-gradient(110deg,transparent 55%,#000 100%)}.hero>*{position:relative;z-index:1}.startbadge{display:inline-block;background:rgba(255,255,255,.16);border:1px solid rgba(255,255,255,.2);color:#fff;font-size:11px;font-weight:800;letter-spacing:.1em;padding:6px 13px;border-radius:20px;margin-bottom:18px}.hero h2{font-size:32px;line-height:1.12;font-weight:800;letter-spacing:-.02em;margin-bottom:16px}.hero p{font-size:14.5px;line-height:1.55;color:rgba(255,255,255,.86);max-width:430px;margin-bottom:24px}.herobtns{display:flex;gap:12px;margin-bottom:18px}.hb-w{background:#fff;color:var(--indigo);border:none;border-radius:11px;padding:13px 22px;font-weight:700;font-size:14.5px;cursor:pointer;font-family:inherit;display:inline-flex;align-items:center;gap:8px}.hb-g{background:rgba(255,255,255,.12);color:#fff;border:1px solid rgba(255,255,255,.28);border-radius:11px;padding:13px 22px;font-weight:700;font-size:14.5px;cursor:pointer;font-family:inherit}.pills{display:flex;gap:10px}.pill{background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.22);border-radius:20px;padding:7px 15px;font-size:13px;font-weight:600;color:rgba(255,255,255,.92)}.minicardwrap{position:relative}.squig{position:absolute;left:-70px;top:30px;z-index:0}.minicard{position:relative;background:#fff;border-radius:16px;padding:20px 22px;color:var(--ink);box-shadow:0 24px 50px -20px rgba(20,10,60,.4)}.mcbadge{position:absolute;top:-16px;right:-8px;background:#fff;border-radius:10px;padding:8px 13px 8px 9px;display:flex;align-items:center;gap:7px;box-shadow:0 10px 24px -8px rgba(20,10,60,.3);font-weight:700;font-size:13px}.mcbadge .c{width:20px;height:20px;border-radius:50%;background:var(--teal);display:flex;align-items:center;justify-content:center}.mchead{display:flex;align-items:center;gap:13px;margin-bottom:18px}.mcav{width:40px;height:40px;border-radius:50%;background:linear-gradient(140deg,#6a5cf0,#3ba9e0);flex-shrink:0}.mcbar{height:9px;border-radius:5px}.mclines{flex:1;display:flex;flex-direction:column;gap:7px}.mcend{display:flex;flex-direction:column;gap:6px;align-items:flex-end}.divline{height:1px;background:#eee;margin-bottom:16px}.mccols{display:grid;grid-template-columns:1fr 1fr;gap:24px}.mct{font-size:9px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;margin-bottom:14px}.mct.i{color:#aeb2c0}.mct.c{color:var(--teal)}.mci{font-size:10.5px;line-height:1.4;color:#a0a4b2;margin-bottom:15px;font-weight:500}.mcc{display:flex;gap:9px;margin-bottom:14px}.mcc .ar{width:22px;height:22px;border-radius:50%;background:var(--teal);flex-shrink:0;display:flex;align-items:center;justify-content:center;margin-top:1px}.mcc p{font-size:10.5px;line-height:1.4;color:var(--teal);font-weight:600}.row3{display:grid;grid-template-columns:1.28fr 1fr .96fr;gap:22px;margin-bottom:24px}.panel{background:#fff;border:1px solid var(--border);border-radius:16px;padding:24px}.ph{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:20px}.ph .ic{width:38px;height:38px;border-radius:10px;background:var(--lav);display:flex;align-items:center;justify-content:center;margin-bottom:0}.ph .tt{font-weight:700;font-size:16px}.ph .ds{font-size:12.5px;color:var(--grey);margin-top:3px}.ph .lk{color:var(--indigo);font-weight:600;font-size:13px;text-decoration:none;white-space:nowrap}.phleft{display:flex;gap:12px}.step{display:flex;align-items:center;gap:13px;padding:13px 6px;border-top:1px solid #f1f1f6}.step:first-of-type{border-top:none}.step .si{width:36px;height:36px;border-radius:9px;background:#f4f4fb;display:flex;align-items:center;justify-content:center;flex-shrink:0}.step .st{font-weight:700;font-size:14px}.step .sd{font-size:12.5px;color:var(--grey);margin-top:2px}.step .chev{margin-left:auto;color:#c2c6d4}.doc{display:flex;align-items:center;gap:13px;padding:13px 0;border-top:1px solid #f1f1f6}.doc:first-of-type{border-top:none}.doc .di{width:36px;height:36px;border-radius:9px;background:#f4f4fb;display:flex;align-items:center;justify-content:center;flex-shrink:0}.doc .dt{font-weight:700;font-size:13.5px}.doc .dm{font-size:12px;color:var(--mut);margin-top:2px}.doc .ats{margin-left:auto;text-align:right;display:flex;align-items:center;gap:12px}.doc .atsbadge{font-size:11.5px;font-weight:700;color:#6b7080;background:#f2f2f7;padding:3px 9px;border-radius:6px}.doc .open{color:var(--indigo);font-weight:600;font-size:13px}.docfoot{margin-top:8px;color:var(--indigo);font-weight:600;font-size:13.5px}.diag{display:flex;align-items:center;justify-content:space-between;padding:14px 0;border-top:1px solid #f1f1f6}.diag:first-of-type{border-top:none}.diag .dl{font-weight:600;font-size:14px;color:#3c4150}.diag .dv{font-weight:700;font-size:14px}.dv.good{color:var(--green)}.dv.high{color:var(--green)}.dv.role{color:var(--indigo)}.diagnote{margin-top:14px;font-size:11.5px;color:var(--mut);line-height:1.5}.stats{display:grid;grid-template-columns:repeat(4,1fr);background:#fff;border:1px solid var(--border);border-radius:16px;padding:24px 10px}.sx{display:flex;align-items:center;gap:15px;padding:0 26px;border-left:1px solid #f0f0f5}.sx:first-child{border-left:none}.sx .ic{width:46px;height:46px;border-radius:12px;background:var(--lav);display:flex;align-items:center;justify-content:center;flex-shrink:0}.sx .num{font-size:24px;font-weight:800;color:var(--indigo);line-height:1}.sx .lbl{font-size:13px;color:var(--grey);margin-top:5px;font-weight:500}`}</style><aside className="side"><div className="brand"><span className="logo" style={{background:"none",overflow:"hidden"}}><svg viewBox="0 0 36 36" width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="cvg" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse"><stop stop-color="#4F46E5"/><stop offset="0.55" stop-color="#2563EB"/><stop offset="1" stop-color="#1AB5C9"/></linearGradient></defs><rect width="36" height="36" rx="9" fill="url(#cvg)"/><path d="M9 9.5a1.5 1.5 0 0 1 1.5-1.5h9.7l5.3 5.3v13.2a1.5 1.5 0 0 1-1.5 1.5H10.5A1.5 1.5 0 0 1 9 26.5z" fill="#ffffff"/><path d="M20.2 8v3.8a1.5 1.5 0 0 0 1.5 1.5h3.8z" fill="#3B6FD4"/><circle cx="14.8" cy="14.6" r="2.3" fill="#3B6FD4"/><path d="M11.2 19.6c0-2 1.6-3.2 3.6-3.2s3.6 1.2 3.6 3.2z" fill="#3B6FD4"/><rect x="11.2" y="20.8" width="9.4" height="1.5" rx="0.75" fill="#3B6FD4"/><rect x="11.2" y="23.2" width="8" height="1.5" rx="0.75" fill="#3B6FD4"/><rect x="11.2" y="25.6" width="6" height="1.5" rx="0.75" fill="#3B6FD4"/><circle cx="24.5" cy="25.5" r="5.2" fill="#ffffff"/><path d="M24.8 21.6l0.7 2.1 2.1 0.7-2.1 0.7-0.7 2.1-0.7-2.1-2.1-0.7 2.1-0.7z" fill="#3B6FD4"/><path d="M22.3 26.2l0.4 1.2 1.2 0.4-1.2 0.4-0.4 1.2-0.4-1.2-1.2-0.4 1.2-0.4z" fill="#3B6FD4"/></svg></span>CV Optimizer</div><a href="/optimize" style={{ textDecoration: 'none' }}><button className="newbtn">+ Translate my CV</button></a><nav className="nav"><a href="#" className="active"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" strokeWidth="1.8"><path d="M3 11l9-7 9 7M5 10v10h14V10" strokeLinecap="round" strokeLinejoin="round"/></svg>Dashboard</a><a href="/optimize"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" strokeWidth="1.8"><path d="M7 3h7l5 5v13H7z" strokeLinejoin="round"/><path d="M14 3v5h5" strokeLinejoin="round"/></svg>Translate my CV</a><a href="/cover-letters/write"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" strokeWidth="1.8"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 8l9 5 9-5" strokeLinecap="round"/></svg>Write my cover letter</a><a href='/my-documents'><svg width="19" height="19" viewBox="0 0 24 24" fill="none" strokeWidth="1.8"><path d="M7 3h10l3 3v15H7z" strokeLinejoin="round"/><path d="M10 9h7M10 13h7M10 17h4" strokeLinecap="round"/></svg>My documents</a><a href="/interview-tips"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" strokeWidth="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2" strokeLinecap="round"/></svg>Interview tips</a><a href="/templates"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" strokeWidth="1.8"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M8 9h3M8 13h3M8 17h2" strokeLinecap="round"/></svg>CV templates</a><a href="#"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" strokeWidth="1.8"><path d="M4 5h11l5 5v9H4z" strokeLinejoin="round"/><path d="M8 9h6M8 13h8" strokeLinecap="round"/></svg>Career Guide</a></nav><div className="upsell"><div className="t"><svg width="16" height="16" viewBox="0 0 24 24" fill="#5B4FE8"><path d="M5 8l4 3 3-6 3 6 4-3-2 11H7z"/></svg>Unlock more features</div><p>Upgrade to Premium for unlimited translations, AI tips &amp; more.</p><button>Upgrade plan</button></div><div className="profile"><span className="av">A</span><div><div className="nm">Alex Morgan</div><div className="em">alex.morgan@email.com</div></div></div></aside><main className="main" style={{ background: BG, fontFamily: 'Inter, system-ui, sans-serif' }}>
      <div style={{ maxWidth: 920, margin: '0 auto' }}>
        <h1 style={{ fontSize: 30, fontWeight: 800, margin: 0, letterSpacing: -0.5 }}>Translate my CV</h1>
        <p style={{ color: MUT, marginTop: 8, marginBottom: 26, fontSize: 15 }}>Upload your CV, paste the job you're targeting, tell us the direction — and we'll tailor it line by line.</p>

        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 28 }}>
          {steps.map((s, i) => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', flex: i < steps.length - 1 ? 1 : 'none' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 30, height: 30, borderRadius: 999, display: 'grid', placeItems: 'center', fontSize: 13, fontWeight: 700, border: '2px solid ' + (i <= active ? P : LINE), color: i <= active ? P : MUT, background: CARD }}>{i + 1}</span>
                <span style={{ fontSize: 14, fontWeight: 600, color: i <= active ? INK : MUT }}>{s}</span>
              </div>
              {i < steps.length - 1 && <div style={{ flex: 1, height: 2, background: LINE, margin: '0 12px' }} />}
            </div>
          ))}
        </div>
        <section style={{ background: CARD, border: '1px solid ' + LINE, borderRadius: 16, padding: 24, marginBottom: 18, boxShadow: '0 1px 2px rgba(16,24,40,.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 26, height: 26, borderRadius: 8, background: SOFT, color: P, display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: 13 }}>1</span>
            <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>Add your CV</h2>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: .4, color: '#E0517A', background: '#FDEBF1', padding: '4px 8px', borderRadius: 6 }}>REQUIRED</span>
          </div>
          <p style={{ color: MUT, fontSize: 14, margin: '10px 0 16px' }}>PDF or Word — or paste the text. Bring it as it is; the design doesn't matter.</p>
          <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
            <button onClick={() => setMode('upload')} style={{ padding: '10px 18px', borderRadius: 10, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 14, background: mode === 'upload' ? P : SOFT, color: mode === 'upload' ? '#fff' : INK }}>Upload file</button>
            <button onClick={() => setMode('paste')} style={{ padding: '10px 18px', borderRadius: 10, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 14, background: mode === 'paste' ? P : SOFT, color: mode === 'paste' ? '#fff' : INK }}>Paste text</button>
          </div>
          {mode === 'upload' ? (
            <label style={{ display: 'block', border: 'dashed 2px ' + (fileName ? '#9AD8B8' : '#C9CCE8'), borderRadius: 14, padding: '40px 20px', textAlign: 'center', cursor: 'pointer', background: fileName ? '#F2FBF6' : '#FCFCFF' }}>
<input type="file" accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" style={{ display: 'none' }} onChange={(e) => setFileName(e.target.files && e.target.files[0] ? e.target.files[0].name : '')} />
<div style={{ width: 52, height: 52, margin: '0 auto 14px', borderRadius: 12, background: fileName ? '#D7F0E2' : SOFT, display: 'grid', placeItems: 'center', color: fileName ? '#1B7A4B' : P, fontSize: 22 }}>{fileName ? '✓' : '↑'}</div>
<div style={{ fontWeight: 700, fontSize: 15, wordBreak: 'break-word' }}>{fileName ? fileName : (<span>Drag your CV here, or <span style={{ color: P }}>browse</span></span>)}</div>
<div style={{ color: MUT, fontSize: 13, marginTop: 6 }}>{fileName ? (<span onClick={(e) => { e.preventDefault(); e.stopPropagation(); setFileName(''); }} style={{ color: '#B4245F', fontWeight: 600, cursor: 'pointer' }}>Remove file</span>) : 'PDF or DOCX · up to 10 MB'}</div>
</label>

          ) : (
            <textarea value={cvText} onChange={(e) => setCvText(e.target.value)} placeholder="Paste your CV text here..." style={{ width: '100%', minHeight: 160, borderRadius: 12, border: '1px solid ' + LINE, padding: 14, fontSize: 14, fontFamily: 'inherit', resize: 'vertical', boxSizing: 'border-box' }} />
          )}
        </section>
        <section style={{ background: CARD, border: '1px solid ' + LINE, borderRadius: 16, padding: 24, marginBottom: 18, boxShadow: '0 1px 2px rgba(16,24,40,.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 26, height: 26, borderRadius: 8, background: SOFT, color: P, display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: 13 }}>2</span>
            <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>The job you're targeting</h2>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: .4, color: '#E0517A', background: '#FDEBF1', padding: '4px 8px', borderRadius: 6 }}>REQUIRED</span>
          </div>
          <p style={{ color: MUT, fontSize: 14, margin: '10px 0 16px' }}>We tailor to this role — prioritising the experience it rewards and mirroring its keywords, so you clear the ATS and speak the recruiter's language.</p>
          <input value={jobLink} onChange={(e) => setJobLink(e.target.value)} placeholder="Paste the job link (optional)" style={{ width: '100%', padding: '14px', borderRadius: 12, border: '1px solid ' + LINE, fontSize: 14, boxSizing: 'border-box' }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, margin: '18px 0' }}>
            <div style={{ flex: 1, height: 1, background: LINE }} />
            <span style={{ fontSize: 12, fontWeight: 700, color: MUT }}>or paste the text</span>
            <div style={{ flex: 1, height: 1, background: LINE }} />
          </div>
          <textarea value={jobText} onChange={(e) => setJobText(e.target.value)} placeholder="Paste the full job description here..." style={{ width: '100%', minHeight: 140, borderRadius: 12, border: '1px solid ' + LINE, padding: 14, fontSize: 14, fontFamily: 'inherit', resize: 'vertical', boxSizing: 'border-box' }} />
          <div style={{ marginTop: 16, background: '#ECFAF3', border: '1px solid ' + '#BFE9D4', borderRadius: 12, padding: '14px 16px', color: '#1B7A4B', fontSize: 13.5, display: 'flex', gap: 10 }}>
            <span>○</span>
            <span>If the role asks for something we can't find in your CV, we'll <b>flag it and ask</b> — never invent it or stuff keywords you can't back up.</span>
          </div>
        </section>
        <section style={{ background: CARD, border: '1px solid ' + LINE, borderRadius: 16, padding: 24, marginBottom: 18, boxShadow: '0 1px 2px rgba(16,24,40,.04)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ width: 26, height: 26, borderRadius: 8, background: SOFT, color: P, display: 'grid', placeItems: 'center', fontWeight: 700, fontSize: 13 }}>3</span>
            <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>Set your direction</h2>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: .4, color: '#E0517A', background: '#FDEBF1', padding: '4px 8px', borderRadius: 6 }}>REQUIRED</span>
          </div>
          <p style={{ color: MUT, fontSize: 14, margin: '10px 0 18px' }}>This decides how we edit — what we keep, merge, quantify or suggest cutting.</p>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: .6, color: MUT, marginBottom: 8 }}>I'M COMING FROM...</div>
          <select value={comingFrom} onChange={(e) => setComingFrom(e.target.value)} style={{ width: '100%', padding: '14px', borderRadius: 12, border: '1px solid ' + LINE, fontSize: 14, background: CARD, color: comingFrom ? INK : MUT, boxSizing: 'border-box', marginBottom: 20 }}>
            <option value="">Select your sector...</option>
            <option value="institutional">Institutional</option>
            <option value="eu">EU · EPSO</option>
            <option value="corporate">Corporate</option>
          </select>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: .6, color: MUT, marginBottom: 10 }}>I'M GOING TO...</div>
          <div style={{ display: 'grid', gap: 12 }}>
            {[
              { id: 'institutional', dot: '#4F46E5', t: 'Institutional', d: 'UN, inter-American, African, NGOs, other IOs. Competency-based — keep the detail.' },
              { id: 'eu', dot: '#2563EB', t: 'EU · EPSO', d: 'EU institutions. Competency framework + EU register and keywords.' },
              { id: 'corporate', dot: '#10B981', t: 'Corporate', d: 'Private sector. Impact-first, jargon stripped, 3–5 highlights per role.' },
            ].map((o) => (
              <button key={o.id} onClick={() => setGoingTo(o.id)} style={{ textAlign: 'left', cursor: 'pointer', background: CARD, border: '2px solid ' + (goingTo === o.id ? P : LINE), borderRadius: 14, padding: '18px 20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontWeight: 700, fontSize: 16 }}><span style={{ width: 10, height: 10, borderRadius: 999, background: o.dot }} />{o.t}</div>
                <div style={{ color: MUT, fontSize: 13.5, marginTop: 8 }}>{o.d}</div>
              </button>
            ))}
          </div>
        </section>
        {err ? (
          <div style={{ margin: '8px 0 0', padding: '12px 16px', borderRadius: 10, background: '#FDECEC', color: '#B42318', fontSize: 13 }}>{err}</div>
        ) : null}
        {position ? (
          <section style={{ background: CARD, border: '1px solid ' + LINE, borderRadius: 16, padding: 24, marginTop: 20 }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase ', color: P }}>Your target and angle</div>
            <div style={{ fontSize: 20, fontWeight: 800, marginTop: 8, color: INK }}>Target: {position.target ? (position.target.role || '-') : '-'}{position.target && position.target.org ? ' . ' + position.target.org : ''}</div>
            <div style={{ fontSize: 14, color: MUT, marginTop: 8, lineHeight: 1.5 }}>{position.positioning_angle}</div>
            {position.recommended_headline ? (<div style={{ marginTop: 16, fontSize: 15, fontWeight: 700, color: INK }}>{position.recommended_headline}</div>) : null}
            {position.recommended_summary ? (<div style={{ marginTop: 6, fontSize: 14, color: MUT, lineHeight: 1.6 }}>{position.recommended_summary}</div>) : null}
            {position.reductions && position.reductions.length ? (
              <div style={{ marginTop: 14, display: 'flex ', flexWrap: 'wrap ', gap: 8 }}>
                {position.reductions.map((r: any, i: number) => (
                  <span key={i} style={{ fontSize: 12, fontWeight: 600, padding: '6px 10px', borderRadius: 999, background: SOFT, color: P }}>{r.recommendation || r.finding}</span>
                ))}
              </div>
            ) : null}
          </section>
        ) : null}
        {review && review.experience ? (
          <section style={{ background: CARD, border: '1px solid ' + LINE, borderRadius: 16, padding: 24, marginTop: 20 }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase ', color: P }}>Line-by-line review</div>
            {review.experience.map((job: any, ji: number) => (
              <div key={ji} style={{ marginTop: 18 }}>
                {(job.items || []).map((it: any, ii: number) => (
                  <div key={ii} style={{ border: '1px solid ' + LINE, borderRadius: 12, padding: 16, marginTop: 12 }}>
                    <div style={{ fontSize: 13, color: MUT }}><b style={{ color: INK }}>You wrote:</b> {it.reader_reaction ? it.reader_reaction.you_wrote : ''}</div>
                    <div style={{ fontSize: 13, color: MUT, marginTop: 6 }}><b style={{ color: INK }}>Reader hears:</b> {it.reader_reaction ? it.reader_reaction.reader_hears : ''}</div>
                    <div style={{ fontSize: 13, color: MUT, marginTop: 6 }}><b style={{ color: INK }}>Reality:</b> {it.reader_reaction ? it.reader_reaction.reality : ''}</div>
                    <div style={{ marginTop: 10, display: 'flex ', alignItems: 'center ', gap: 8, flexWrap: 'wrap ' }}>
                      <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase ', padding: '4px 8px', borderRadius: 6, background: SOFT, color: P }}>{it.decision}</span>
                      {it.priority ? <span style={{ fontSize: 11, color: MUT }}>{it.priority} priority</span> : null}
                    </div>
                    {it.proposed_rewrite ? (<div style={{ marginTop: 10, padding: '10px 12px', borderRadius: 8, background: '#F2FBF6', border: '1px solid #9AD8B8', fontSize: 14, color: INK }}>{it.proposed_rewrite}</div>) : null}
                    {it.question ? (<div style={{ marginTop: 8, fontSize: 13, color: '#B4690E' }}>{it.question}</div>) : null}
                  </div>
                ))}
              </div>
            ))}
          </section>
        ) : null}
        {review && review.gaps && review.gaps.length ? (
          <section style={{ background: CARD, border: '1px solid ' + LINE, borderRadius: 16, padding: 24, marginTop: 20 }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase ', color: P }}>Gaps we need to ask about</div>
            {review.gaps.map((g: any, i: number) => (
              <div key={i} style={{ marginTop: 12, fontSize: 14, color: INK }}><b>{g.requirement}</b><div style={{ fontSize: 13, color: MUT, marginTop: 4 }}>{g.question}</div></div>
            ))}
          </section>
        ) : null}
        {review ? (
          <div style={{ display: 'flex ', gap: 10, marginTop: 20, flexWrap: 'wrap ' }}>
            {!intel ? (<button onClick={loadIntel} disabled={depthLoading === 'intel '} style={{ padding: '10px 16px', borderRadius: 10, border: '1px solid ' + P, background: '#fff ', color: P, fontWeight: 700, fontSize: 13, cursor: 'pointer ' }}>{depthLoading === 'intel ' ? ' Loading...' : 'Show me what you see (diagnosis)'}</button>) : null}
            {!coaching ? (<button onClick={loadCoaching} disabled={depthLoading === 'coach '} style={{ padding: '10px 16px', borderRadius: 10, border: '1px solid ' + P, background: '#fff ', color: P, fontWeight: 700, fontSize: 13, cursor: 'pointer ' }}>{depthLoading === 'coach ' ? ' Loading...' : 'Coach me (patterns)'}</button>) : null}
          </div>
        ) : null}
        {intel ? (
          <section style={{ background: CARD, border: '1px solid ' + LINE, borderRadius: 16, padding: 24, marginTop: 20 }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase ', color: P }}>Here is what we see</div>
            {intel.readiness ? (<div style={{ fontSize: 14, color: MUT, marginTop: 8 }}>{intel.readiness.frame}</div>) : null}
            {intel.readiness && intel.readiness.components ? (
              <div style={{ marginTop: 12 }}>
                {intel.readiness.components.map((c: any, i: number) => (
                  <div key={i} style={{ display: 'flex ', gap: 8, marginTop: 8, fontSize: 13 }}><span style={{ fontWeight: 700, color: INK, minWidth: 120 }}>{c.name}</span><span style={{ color: P, fontWeight: 700 }}>{c.level}</span><span style={{ color: MUT }}>{c.note}</span></div>
                ))}
              </div>
            ) : null}
            {intel.reader_perception ? (<div style={{ marginTop: 14, fontSize: 14, color: MUT, lineHeight: 1.6 }}><b style={{ color: INK }}>Reader perception: </b>{intel.reader_perception}</div>) : null}
          </section>
        ) : null}
        {coaching ? (
          <section style={{ background: CARD, border: '1px solid ' + LINE, borderRadius: 16, padding: 24, marginTop: 20 }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.08em', textTransform: 'uppercase ', color: P }}>The biggest thing holding your CV back</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: INK, marginTop: 8, lineHeight: 1.5 }}>{coaching.biggest_misconception}</div>
            {coaching.patterns && coaching.patterns.length ? (
              <div style={{ marginTop: 12 }}>
                {coaching.patterns.map((pt: any, i: number) => (
                  <div key={i} style={{ marginTop: 12, padding: 14, borderRadius: 10, background: SOFT }}><div style={{ fontSize: 14, fontWeight: 700, color: INK }}>{pt.pattern} <span style={{ color: P }}>({pt.evidence_count})</span></div><div style={{ fontSize: 13, color: MUT, marginTop: 4 }}>{pt.lesson}</div></div>
                ))}
              </div>
            ) : null}
          </section>
        ) : null}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 6 }}>
          <Link href="/dashboard" style={{ color: MUT, fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>← Back to dashboard</Link>
                  <button style={{ padding: '14px 28px', borderRadius: 12, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 15, color: '#fff', background: running ? '#9aa0b8' : P, opacity: running ? 0.8 : 1 }} onClick={runCorePath} disabled={running}>{running ? ' Analyzing your CV...' : 'Continue to Review →'}</button>
        </div>
      </div>
    </main></div>
  );
}
