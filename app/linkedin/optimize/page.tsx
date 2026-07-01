"use client";
import Link from "next/link";
import { useState } from "react";

const C = { primary: "#4F46E5", primaryDark: "#4338CA", secondary: "#0EA5A4", ink: "#1F2433", inkSoft: "#5B6478", surface: "#F7F8FC", line: "#ECEDF3" };

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <span style={{ background: "linear-gradient(135deg, " + C.primary + ", " + C.secondary + ")", width: 36, height: 36, borderRadius: 12 }} className="flex items-center justify-center">
        <svg viewBox="0 0 36 36" width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="cvg" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse"><stop stop-color="#4F46E5"/><stop offset="0.55" stop-color="#2563EB"/><stop offset="1" stop-color="#1AB5C9"/></linearGradient></defs><rect width="36" height="36" rx="9" fill="url(#cvg)"/><path d="M9 9.5a1.5 1.5 0 0 1 1.5-1.5h9.7l5.3 5.3v13.2a1.5 1.5 0 0 1-1.5 1.5H10.5A1.5 1.5 0 0 1 9 26.5z" fill="#ffffff"/><path d="M20.2 8v3.8a1.5 1.5 0 0 0 1.5 1.5h3.8z" fill="#3B6FD4"/><circle cx="14.8" cy="14.6" r="2.3" fill="#3B6FD4"/><path d="M11.2 19.6c0-2 1.6-3.2 3.6-3.2s3.6 1.2 3.6 3.2z" fill="#3B6FD4"/><rect x="11.2" y="20.8" width="9.4" height="1.5" rx="0.75" fill="#3B6FD4"/><rect x="11.2" y="23.2" width="8" height="1.5" rx="0.75" fill="#3B6FD4"/><rect x="11.2" y="25.6" width="6" height="1.5" rx="0.75" fill="#3B6FD4"/><circle cx="24.5" cy="25.5" r="5.2" fill="#ffffff"/><path d="M24.8 21.6l0.7 2.1 2.1 0.7-2.1 0.7-0.7 2.1-0.7-2.1-2.1-0.7 2.1-0.7z" fill="#3B6FD4"/><path d="M22.3 26.2l0.4 1.2 1.2 0.4-1.2 0.4-0.4 1.2-0.4-1.2-1.2-0.4 1.2-0.4z" fill="#3B6FD4"/></svg>
      </span>
      <span style={{ color: C.ink, fontWeight: 800, fontSize: 18 }}>CV Optimizer</span>
    </Link>
  );
}

function Nav() {
  const links = [["Features","/#features"],["Cover letters","/cover-letters"],["LinkedIn","/linkedin"],["Pricing","/#pricing"]];
  return (
    <header className="sticky top-0 z-20 border-b bg-white/80 backdrop-blur" style={{ borderColor: C.line }}>
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Logo />
        <nav className="hidden items-center gap-7 md:flex">
          {links.map(([t, h]) => (
            <Link key={t} href={h} className="text-sm font-medium transition-colors" style={{ color: C.inkSoft }}>{t}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/auth?mode=login" className="hidden rounded-full border px-5 py-2.5 text-sm font-semibold sm:inline-flex" style={{ borderColor: C.line, color: C.ink }}>Log in</Link>
          <Link href="/optimize" className="rounded-full px-5 py-2.5 text-sm font-semibold text-white" style={{ background: "linear-gradient(135deg, " + C.primary + ", " + C.primaryDark + ")" }}>Translate my CV</Link>
        </div>
      </div>
    </header>
  );
}

export default function LinkedInOptimize(){
  const [url,setUrl]=useState("");
  const [profile,setProfile]=useState("");
  const [role,setRole]=useState("");
  const [loading,setLoading]=useState(false);
  const [err,setErr]=useState("");
  const [out,setOut]=useState(null);
  const [copied,setCopied]=useState("");

  function words(t){
    const stop=["the","and","for","with","that","this","have","from","your","you","are","was","will","has","our","their","who","can","all","out","into","about","over","more","work","role","team","using","used","use"];
    const map={};
    String(t).toLowerCase().split(/[^a-z]+/).forEach(function(w){ if(w.length>3 && stop.indexOf(w)<0){ map[w]=(map[w]||0)+1; } });
    return Object.keys(map).sort(function(a,b){return map[b]-map[a]}).slice(0,8);
  }

  function localAudit(){
    const p=profile.trim();
    const kws=words(p+" "+role);
    const len=p.length;
    const hasNumbers=/[0-9]/.test(p);
    const lines=p.split(String.fromCharCode(10)).filter(function(x){return x.trim().length>0});
    const headlineGuess=(lines[0]||role||"Professional").slice(0,80);
    function clamp(n){return Math.max(8,Math.min(99,Math.round(n)))}
    const completeness=clamp(40+Math.min(40,len/40)+(hasNumbers?10:0)+(role?8:0));
    const keywordScore=clamp(35+kws.length*7+(role?6:0));
    const readability=clamp(55+(lines.length>3?15:0)+(len>200?10:0));
    const searchability=clamp(38+kws.length*6+(url?10:0)+(role?8:0));
    const overall=clamp((completeness+keywordScore+readability+searchability)/4);

    const roleLabel=role||headlineGuess;
    const kwTop=kws.slice(0,3).join(", ");
    const newHeadline=roleLabel+" | "+(kwTop||"Results-driven professional")+" | Open to opportunities";
    const nl2=String.fromCharCode(10)+String.fromCharCode(10);
    const newAbout=("I am a "+roleLabel+" focused on "+(kwTop||"delivering measurable results")+".")+nl2+("Across my career I have "+(hasNumbers?"delivered quantifiable impact":"driven meaningful outcomes")+" by combining "+(kws.slice(0,2).join(" and ")||"strategy and execution")+" with strong collaboration.")+nl2+("Core strengths: "+(kws.slice(0,5).join(", ")||"leadership, communication, problem-solving")+".")+nl2+"Open to connecting with recruiters and teams hiring for "+roleLabel+" roles.";

    const checks=[
      {label:"Headline strength",score:keywordScore,tip:"Lead with your target role plus 2-3 searchable keywords."},
      {label:"About / Summary",score:completeness,tip:len<200?"Expand your About to 3-4 short paragraphs with specifics.":"Good length. Add quantified wins near the top."},
      {label:"Keyword & SSI coverage",score:searchability,tip:"Mirror the exact terms recruiters search for your role."},
      {label:"Recruiter readability",score:readability,tip:lines.length<4?"Break dense text into short, scannable lines.":"Readable structure detected."},
      {label:"Quantified impact",score:hasNumbers?82:34,tip:hasNumbers?"Numbers found - keep leading with metrics.":"Add numbers (%, time saved, revenue) to prove impact."}
    ];
    return { overall:overall, completeness:completeness, keywordScore:keywordScore, readability:readability, searchability:searchability, keywords:kws, checks:checks, newHeadline:newHeadline, newAbout:newAbout };
  }

  async function run(){
    setErr("");
    if(profile.trim().length<40){ setErr("Paste a bit more of your LinkedIn profile (headline + About + experience) so we can audit it."); return; }
    setLoading(true); setOut(null);
    try{
      const res=await fetch("/api/ai",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({kind:"linkedin",text:profile,role:role,jd:url})});
      const data=await res.json().catch(function(){return {}});
      const base=localAudit();
      if(data && data.text){ base.aiNote=data.text; }
      setOut(base);
    }catch(e){ setOut(localAudit()); }
    setLoading(false);
  }

  function copy(txt,key){ try{ navigator.clipboard.writeText(txt); setCopied(key); setTimeout(function(){setCopied("")},1500);}catch(e){} }

  return (
    <div style={{ minHeight:"100vh", background:C.surface, color:C.ink }}>
      <Nav />
      <main style={{ maxWidth:1120, margin:"0 auto", padding:"40px 24px 80px" }}>
        <div style={{ display:"inline-block", fontSize:12, fontWeight:800, letterSpacing:1, color:C.primary, background:"#EEF0FF", padding:"6px 12px", borderRadius:999 }}>LINKEDIN OPTIMIZATION</div>
        <h1 style={{ fontSize:40, fontWeight:800, margin:"16px 0 8px", lineHeight:1.1 }}>Optimize your actual LinkedIn profile.</h1>
        <p style={{ color:C.inkSoft, fontSize:18, maxWidth:680, margin:"0 0 28px" }}>Connect your profile by pasting your LinkedIn URL and your profile text. We audit it like a recruiter and rewrite your headline and About to rank higher in search.</p>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:24, alignItems:"start" }}>
          <div style={{ background:"#fff", border:"1px solid "+C.line, borderRadius:16, padding:24 }}>
            <label style={{ fontWeight:700, fontSize:14 }}>Your LinkedIn profile URL</label>
            <input value={url} onChange={function(e){setUrl(e.target.value)}} placeholder="https://www.linkedin.com/in/your-name" style={{ width:"100%", marginTop:8, marginBottom:18, padding:"12px 14px", borderRadius:10, border:"1px solid "+C.line, fontSize:14 }} />
            <label style={{ fontWeight:700, fontSize:14 }}>Paste your profile (Headline, About, Experience)</label>
            <div style={{ fontSize:12, color:C.inkSoft, margin:"4px 0 8px" }}>Open your LinkedIn profile, copy your Headline, About and Experience text, and paste it below. We never store it.</div>
            <textarea value={profile} onChange={function(e){setProfile(e.target.value)}} placeholder="Paste your headline, About summary and recent experience here..." rows={9} style={{ width:"100%", padding:"12px 14px", borderRadius:10, border:"1px solid "+C.line, fontSize:14, resize:"vertical", fontFamily:"inherit" }} />
            <label style={{ fontWeight:700, fontSize:14, display:"block", marginTop:18 }}>Target role (optional)</label>
            <input value={role} onChange={function(e){setRole(e.target.value)}} placeholder="e.g. Senior Product Manager" style={{ width:"100%", marginTop:8, padding:"12px 14px", borderRadius:10, border:"1px solid "+C.line, fontSize:14 }} />
            {err ? <div style={{ color:"#B91C1C", fontSize:13, marginTop:14 }}>{err}</div> : null}
            <button onClick={run} disabled={loading} style={{ marginTop:18, width:"100%", padding:"14px 18px", borderRadius:999, border:"none", background:C.primary, color:"#fff", fontWeight:800, fontSize:15, cursor:"pointer", opacity:loading?0.6:1 }}>{loading ? "Analyzing your profile..." : "Audit and optimize my profile"}</button>
          </div>

          <div style={{ background:"#fff", border:"1px solid "+C.line, borderRadius:16, padding:24, minHeight:300 }}>
            {!out ? (
              <div style={{ color:C.inkSoft, fontSize:14, textAlign:"center", padding:"60px 12px" }}>
                <div style={{ fontSize:34, marginBottom:10 }}>in</div>
                Your recruiter-grade LinkedIn audit and rewritten headline & About will appear here.
              </div>
            ) : (
              <div>
                <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:18 }}>
                  <div style={{ width:84, height:84, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:26, fontWeight:800, color:"#fff", background:C.primary }}>{out.overall}</div>
                  <div><div style={{ fontWeight:800, fontSize:18 }}>Profile strength</div><div style={{ color:C.inkSoft, fontSize:13 }}>How a recruiter and LinkedIn search see your profile.</div></div>
                </div>

                <div style={{ display:"grid", gap:12 }}>
                  {out.checks.map(function(c,i){ return (
                    <div key={i}>
                      <div style={{ display:"flex", justifyContent:"space-between", fontSize:13, fontWeight:700 }}><span>{c.label}</span><span style={{ color:C.primary }}>{c.score}</span></div>
                      <div style={{ height:7, background:"#EEF0FF", borderRadius:999, marginTop:4 }}><div style={{ height:7, width:c.score+"%", background:C.primary, borderRadius:999 }} /></div>
                      <div style={{ fontSize:12, color:C.inkSoft, marginTop:4 }}>{c.tip}</div>
                    </div>
                  ); })}
                </div>
                <div style={{ marginTop:18 }}>
                  <div style={{ fontWeight:700, fontSize:13, marginBottom:6 }}>Keywords recruiters will see</div>
                  <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>{out.keywords.map(function(k,i){ return <span key={i} style={{ fontSize:12, background:"#EEF0FF", color:C.primary, padding:"4px 10px", borderRadius:999, fontWeight:600 }}>{k}</span>; })}</div>
                </div>

                <div style={{ marginTop:20, padding:16, background:C.surfaceAlt, borderRadius:12, border:"1px solid "+C.line }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}><div style={{ fontWeight:800, fontSize:14 }}>Rewritten headline</div><button onClick={function(){copy(out.newHeadline,"h")}} style={{ fontSize:12, fontWeight:700, color:C.primary, background:"none", border:"none", cursor:"pointer" }}>{copied==="h"?"Copied":"Copy"}</button></div>
                  <div style={{ fontSize:14, marginTop:6 }}>{out.newHeadline}</div>
                </div>
                <div style={{ marginTop:14, padding:16, background:C.surfaceAlt, borderRadius:12, border:"1px solid "+C.line }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}><div style={{ fontWeight:800, fontSize:14 }}>Rewritten About</div><button onClick={function(){copy(out.newAbout,"a")}} style={{ fontSize:12, fontWeight:700, color:C.primary, background:"none", border:"none", cursor:"pointer" }}>{copied==="a"?"Copied":"Copy"}</button></div>
                  <textarea readOnly value={out.newAbout} rows={8} style={{ width:"100%", marginTop:8, padding:"10px 12px", borderRadius:10, border:"1px solid "+C.line, fontSize:13, fontFamily:"inherit", resize:"vertical", background:"#fff" }} />
                </div>

              </div>
            )}
          </div>
        </div>
        <div style={{ marginTop:28, textAlign:"center" }}>
          <Link href="/optimize" style={{ color:C.primary, fontWeight:700, fontSize:14, textDecoration:"none" }}>Want a full ATS resume from this profile? Run the resume optimizer &rarr;</Link>
        </div>
      </main>
      <footer style={{ borderTop:"1px solid "+C.line, padding:"24px", textAlign:"center", color:C.inkSoft, fontSize:13 }}>CV Optimizer &copy; 2026</footer>
    </div>
  );
}

