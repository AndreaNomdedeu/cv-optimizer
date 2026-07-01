'use client';
import { useState, useEffect } from 'react';

const STOP = new Set('a an the and or but if then for to of in on at by with from as is are was were be your you we our it its will can not no this that these those more most very just also'.split(' '));

function tokenize(text){
  const lower = (text||'').toLowerCase();
  let c = '';
  for (let i=0;i<lower.length;i++){
    const k = lower.charCodeAt(i);
    c += ((k>=97&&k<=122)||(k>=48&&k<=57)||k===43) ? lower[i] : ' ';
  }
  return c.split(' ').filter(w=>w.length>1 && !STOP.has(w));
}

function tone(n){ return n>=75?'#16a34a':n>=50?'#d97706':'#dc2626'; }

export default function JobMatchPanel(){
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(true);
  const [data, setData] = useState(null);

  useEffect(()=>{
    if (typeof window==='undefined') return;
    const path = window.location.pathname || '';
    if (path.indexOf('/builder')===-1){ setShow(false); return; }
    let storedJd='';
    try { storedJd = localStorage.getItem('cvopt_jd') || ''; } catch(e){}
    if (!storedJd){ setShow(false); return; }
    setShow(true);

    const jTokens = tokenize(storedJd);
    const freq = {};
    for (const t of jTokens) freq[t]=(freq[t]||0)+1;
    const jobKeywords = Object.keys(freq).sort((a,b)=>freq[b]-freq[a]).slice(0,25);

    const recompute = () => {
      let resumeText = '';
      const sels = ['[data-resume-preview]','.resume-preview','#resume-preview','[class*="ResumeRenderer"]','[class*="renderer"]'];
      for (const s of sels){
        const el = document.querySelector(s);
        if (el && el.innerText && el.innerText.length>resumeText.length) resumeText = el.innerText;
      }
      if (!resumeText){
        const all = Array.from(document.querySelectorAll('div,section,article'));
        let best='';
        for (const el of all){ const t=el.innerText||''; if (t.length>best.length && t.length<8000) best=t; }
        resumeText = best;
      }
      const rTokens = tokenize(resumeText);
      const rSet = new Set(rTokens);
      const matched = jobKeywords.filter(k=>rSet.has(k));
      const missing = jobKeywords.filter(k=>!rSet.has(k));
      const coverage = jobKeywords.length ? Math.round(matched.length/jobKeywords.length*100) : 0;
      const lc = resumeText.toLowerCase();
      const hasTable = (resumeText.match(/\t/g)||[]).length>0;
      const bullets = (resumeText.match(/[•\-\*]\s/g)||[]).length;
      const ats = Math.max(0, 100 - (hasTable?30:0) - (rTokens.length<120?25:0));
      const WEAK=['responsible','assisted','helped','worked','duties'];
      let weak=0; for(const w of WEAK) if(lc.indexOf(w)!==-1) weak++;
      const readability = Math.max(0, Math.min(100, 60 + (bullets>5?20:0) - weak*8));
      const job = Math.round((coverage*0.6) + (ats*0.2) + (readability*0.2));
      setData({ coverage, ats, readability, job, missing: missing.slice(0,8) });
    };
    recompute();
    const id = setInterval(recompute, 1600);
    return ()=>clearInterval(id);
  }, []);

  if (!show || !data) return null;

  const wrap = { position:'fixed', left:18, bottom:18, zIndex:9999, width: open?320:'auto', fontFamily:'system-ui,sans-serif' };
  const card = { background:'#fff', border:'1px solid #e5e7eb', borderRadius:14, boxShadow:'0 8px 30px rgba(0,0,0,0.14)', overflow:'hidden' };
  const row = (label,val) => (
    <div style={{display:'flex',alignItems:'center',gap:10,padding:'7px 0'}} key={label}>
      <span style={{flex:1,fontSize:13,color:'#475569'}}>{label}</span>
      <div style={{width:90,height:7,background:'#eef2f7',borderRadius:4,overflow:'hidden'}}>
        <div style={{width:val+'%',height:'100%',background:tone(val)}} />
      </div>
      <span style={{width:34,textAlign:'right',fontSize:13,fontWeight:700,color:tone(val)}}>{val}</span>
    </div>
  );

  return (
    <div style={wrap}>
      <div style={card}>
        <button onClick={()=>setOpen(!open)} style={{width:'100%',display:'flex',alignItems:'center',gap:8,background:'#4f46e5',color:'#fff',border:'none',padding:'11px 14px',cursor:'pointer',fontWeight:700,fontSize:14}}>
          <span style={{flex:1,textAlign:'left'}}>Live Job Match · {data.job}%</span>
          <span>{open?'▾':'▴'}</span>
        </button>
        {open && (
          <div style={{padding:'12px 14px'}}>
            {row('ATS Compatibility', data.ats)}
            {row('Job Match', data.coverage)}
            {row('Recruiter Readability', data.readability)}
            <p style={{margin:'10px 0 4px',fontSize:11,fontWeight:700,letterSpacing:0.5,color:'#94a3b8',textTransform:'uppercase'}}>Missing keywords</p>
            <div style={{display:'flex',flexWrap:'wrap',gap:5}}>
              {data.missing.length ? data.missing.map(k=>(
                <span key={k} style={{background:'#fee2e2',color:'#b91c1c',borderRadius:20,padding:'2px 9px',fontSize:12,fontWeight:600}}>{k}</span>
              )) : <span style={{fontSize:12,color:'#16a34a'}}>All key terms covered.</span>}
            </div>
            <p style={{margin:'12px 0 0',fontSize:11,color:'#94a3b8'}}>Updates live as you edit your resume.</p>
          </div>
        )}
      </div>
    </div>
  );
}
// touch 1782437549988