"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

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
  const links = [["Resume","/resume"],["Cover letters","/cover-letters/write"],["LinkedIn","/linkedin"],["Pricing","/#pricing"]];
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


const TONES = ["Professional", "Enthusiastic", "Confident", "Friendly", "Formal"];

const TEMPLATES = [
  { id: "executive", name: "Executive", cat: "Noir family", accent: "#b08d57", primary: "#1a1a1a", page: "#faf7f1", text: "#2a2a2a", muted: "#8a8175", body: "Georgia, serif", head: "Didot, Bodoni MT, Georgia, serif", nameSize: 40, ls: "0.18em", tr: "uppercase", header: "plain", divider: "line" },
  { id: "modern", name: "Modern", cat: "Azure family", accent: "#2563eb", primary: "#1d4ed8", page: "#ffffff", text: "#1e293b", muted: "#64748b", body: "Verdana, Geneva, sans-serif", head: "Verdana, Geneva, sans-serif", nameSize: 34, ls: "0.06em", tr: "uppercase", header: "split", divider: "underline" },
  { id: "professional", name: "Professional", cat: "Classic family", accent: "#4a4a4a", primary: "#222222", page: "#ffffff", text: "#262626", muted: "#7a7a7a", body: "Garamond, Georgia, serif", head: "Garamond, Georgia, serif", nameSize: 36, ls: "0.14em", tr: "uppercase", header: "centered", divider: "line" },
  { id: "minimal", name: "Minimal", cat: "Sterling family", accent: "#555555", primary: "#2d2d2d", page: "#ffffff", text: "#2b2b2b", muted: "#888888", body: "Helvetica, Arial, sans-serif", head: "Helvetica, Arial, sans-serif", nameSize: 30, ls: "0.16em", tr: "uppercase", header: "plain", divider: "line" },
  { id: "contemporary", name: "Contemporary", cat: "Product family", accent: "#7c3aed", primary: "#4f46e5", page: "#ffffff", text: "#1f2430", muted: "#6b7280", body: "Segoe UI, Helvetica, Arial, sans-serif", head: "Segoe UI, Helvetica, Arial, sans-serif", nameSize: 36, ls: "0em", tr: "none", header: "centered", divider: "line" },
  { id: "creative", name: "Creative", cat: "Scarlet family", accent: "#d11f2a", primary: "#111111", page: "#ffffff", text: "#1c1c1c", muted: "#6e6e6e", body: "Arial, sans-serif", head: "Impact, Haettenschweiler, Arial, sans-serif", nameSize: 42, ls: "0.03em", tr: "uppercase", header: "big-name", divider: "rule-thick" },
];


export default function WriteCoverLetter() {
  const [jd, setJd] = useState("");
  const [cv, setCv] = useState("");
  const [role, setRole] = useState("");
  const [tone, setTone] = useState("Professional");
  const [out, setOut] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [copied, setCopied] = useState(false);
  const [appName, setAppName] = useState("");
  const [appEmail, setAppEmail] = useState("");
  const [appPhone, setAppPhone] = useState("");
  const [appLoc, setAppLoc] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [notes, setNotes] = useState("");
  const [tpl, setTpl] = useState("modern");
  const [pdfBusy, setPdfBusy] = useState(false);

  useEffect(function(){
    try {
      var last = localStorage.getItem('cvo:lastTemplate');
      if (!last) return;
      var map = { noir: 'executive', graphite: 'executive', azure: 'modern', verdant: 'modern', terminal: 'modern', monolith: 'modern', slate: 'professional', sage: 'professional', classic: 'professional', sterling: 'minimal', product: 'contemporary', editorial: 'creative', scarlet: 'creative', gazette: 'creative', vivid: 'creative' };
      var match = map[last];
      if (match) setTpl(match);
    } catch (e) {}
  }, []);

  function localLetter() {
  var jdRaw = (jd || "");
  var cvRaw = (cv || "");
  var jdLow = jdRaw.toLowerCase();
  var NL2 = String.fromCharCode(10) + String.fromCharCode(10);
  function clean(t){ return (t||"").split(String.fromCharCode(10)).join(" ").split("  ").join(" ").trim(); }
  function cap(w){ return w ? w.charAt(0).toUpperCase() + w.slice(1) : w; }
  function hasNum(str){ for (var i=0;i<str.length;i++){ var ch=str.charCodeAt(i); if (ch>=48 && ch<=57) return true; } return (str.indexOf("%")>=0 || str.indexOf("$")>=0); }
  function lower1(t){ return t ? t.charAt(0).toLowerCase()+t.slice(1) : t; }
  function story(t){ if(!t) return t; var x=t.trim(); var low=x.toLowerCase(); if(low.indexOf("i ")===0||low.indexOf("my ")===0||low.indexOf("as ")===0) return lower1(x); return "I "+lower1(x); }
  var rawWords = jdRaw.split(String.fromCharCode(10)).join(" ").split(" ");
  var STOP = "the,and,for,with,that,this,will,have,your,you,our,are,who,how,from,they,their,about,looking,candidate,experience,requirements,role,roles,team,teams,work,working,years,year,join,including,strong,ability,plus,into,across,within,using,help,build,building,drive,driving,own,lead,leading,senior,junior,principal,staff,manager,management,director,head,lead,position,opportunity,company,companies,responsibilities,responsible,skills,skill,qualifications,preferred,must,should,would,could,proven,track,record,excellent,great,good,passionate,what,when,where,which,while,more,most,than,then,them,been,were,also,such,both,each,other,some,many,well,make,made,need,needs,want,wants,like,able,etc".split(",");
  var stopSet = {}; for (var si=0; si<STOP.length; si++){ stopSet[STOP[si]] = 1; }
  var freq = {};
  for (var wi=0; wi<rawWords.length; wi++){
    var w0 = rawWords[wi].toLowerCase();
    var w = "";
    for (var ci=0; ci<w0.length; ci++){ var cc=w0.charCodeAt(ci); if ((cc>=97 && cc<=122) || cc===43 || cc===35) { w += w0.charAt(ci); } }
    if (w.length >= 4 && !stopSet[w]) { freq[w] = (freq[w]||0) + 1; }
  }
  var keys = Object.keys(freq).sort(function(a,b){ return freq[b]-freq[a]; });
  function inferCompany(){
    var trig = { at:1, join:1, with:1, for:1 };
    for (var i=0; i<rawWords.length-1; i++){
      var lw = rawWords[i].toLowerCase();
      var lws = ""; for (var k=0;k<lw.length;k++){ var c=lw.charCodeAt(k); if (c>=97&&c<=122) lws+=lw.charAt(k); }
      if (trig[lws]) {
        var nxt = rawWords[i+1] || "";
        var core = ""; for (var j=0;j<nxt.length;j++){ var cc=nxt.charCodeAt(j); if ((cc>=65&&cc<=90)||(cc>=97&&cc<=122)||(cc>=48&&cc<=57)||cc===38) core+=nxt.charAt(j); else break; }
        if (core.length>1 && core.charCodeAt(0)>=65 && core.charCodeAt(0)<=90) {
          var low=core.toLowerCase();
          if (low!=="the" && low!=="a" && low!=="our" && low!=="your" && low!=="their" && low!=="us" && low!=="we") return core;
        }
      }
    }
    return "";
  }
  var company = clean(companyName) || inferCompany();
  var co = company || "your team";
  if (company) { var coLow = company.toLowerCase(); keys = keys.filter(function(kk){ return kk !== coLow && coLow.indexOf(kk) < 0; }); }
  var targetRole = clean(role) || "this role";
  var cvFlat = cvRaw.split(String.fromCharCode(10)).join(". ");
  var rawSent = cvFlat.split(".");
  var sents = [];
  for (var s2=0; s2<rawSent.length; s2++){ var t=rawSent[s2].trim(); if (t.length>10) sents.push(t); }
  var evid = []; var plain = [];
  for (var s3=0; s3<sents.length; s3++){ if (hasNum(sents[s3])) evid.push(sents[s3]); else plain.push(sents[s3]); }
  function hash(str){ var h=5381; for (var i=0;i<str.length;i++){ h=((h<<5)+h+str.charCodeAt(i))>>>0; } return h; }
  var seed = hash(cvRaw + "|" + jdRaw + "|" + targetRole + "|" + (tone||""));
  function pick(arr){ return arr[seed % arr.length]; }
  function pick2(arr){ return arr[(seed >>> 4) % arr.length]; }
  function pick3(arr){ return arr[(seed >>> 8) % arr.length]; }
  var k0 = keys[0] || ""; var k1 = keys[1] || ""; var k2 = keys[2] || "";
  function phrase(a,b){ if (a && b) return a + " and " + b; return a || b || ""; }
  var domain = phrase(k0, k1) || "this space";
  var focus = phrase(k0, k2) || phrase(k0,k1) || "the core of this role";
  var roleLabel = (targetRole === "this role") ? (k0 ? (cap(k0) + " work") : "this work") : targetRole;
  var openers = [
    "What stood out about the " + roleLabel + " opening at " + co + " is how directly it maps to the " + domain + " problems I have spent the last several years solving rather than merely describing.",
    "Companies at the stage " + co + " is reaching usually need someone who can take " + domain + " from ambition to measurable outcomes. That gap between intent and execution is where I have done my strongest work.",
    "The hard part of a " + roleLabel + " mandate is rarely the strategy on a slide; it is delivering " + domain + " under real constraints, which is the part I have consistently owned.",
    "A " + roleLabel + " hire at " + co + " really comes down to one test: can this person turn " + focus + " into results that show up in the numbers. My record is built on exactly that."
  ];
  var p1 = pick(openers);
  // P2 anchor: prefer a non-metric experience so it does not repeat P3 metrics
  var anchor = plain[0] || evid[0] || "";
  var p2;
  if (anchor) {
    var connectTpls = [
      "Concretely, " + story(anchor) + ". That matters here because the same judgement, knowing which problems actually move " + focus + ", is what " + co + " is hiring for, not a checklist of tools.",
      "For context, " + story(anchor) + ". It transfers directly: " + co + " is working a closely related version of the same problem, and I have already learned where that work tends to break.",
      "Closest to what you are solving, " + story(anchor) + ". I read your priorities around " + focus + " as the next turn of that same wheel, which shortens my ramp considerably."
    ];
    p2 = pick2(connectTpls);
  } else {
    p2 = "My background sits squarely in " + domain + ", and the way " + co + " frames " + focus + " matches the problems I have spent my career solving rather than observing from the side.";
  }
  // P3 evidence, excluding the anchor already used in P2
  var ev2 = [];
  for (var e3=0; e3<evid.length; e3++){ if (evid[e3] !== anchor) ev2.push(evid[e3]); }
  ev2 = ev2.slice(0,3);
  var p3;
  if (ev2.length >= 2) {
    var joined = ev2.map(function(x){ return cap(x.trim()); }).join(". ");
    p3 = "The numbers make the case better than adjectives can. " + joined + ". None of these were vanity metrics; each came from choosing where to spend limited time and resources, which is the judgement " + co + " is actually buying.";
  } else if (ev2.length === 1) {
    p3 = cap(ev2[0].trim()) + ". That result came from prioritising hard and measuring honestly, and it is the same discipline I would bring to " + co + " from the first week.";
  } else {
    var hi = plain.slice(1,3).map(function(x){ return cap(x.trim()); }).join(". ");
    p3 = hi ? (hi + ". Where the resume is lighter on numbers, the pattern holds: I take ambiguous mandates and turn them into shipped, defensible outcomes.") : "The consistent thread across my roles has been converting ambiguous mandates into shipped, defensible outcomes instead of motion.";
  }
  // P_extra: trajectory + why this company, using leftover material
  var used = {}; used[anchor]=1; for (var u=0;u<ev2.length;u++){ used[ev2[u]]=1; }
  var rest = [];
  for (var r2=0; r2<sents.length; r2++){ if (!used[sents[r2]]) rest.push(sents[r2]); }
  var note = clean(notes);
  var pExtraTpls = [
    "Across these moves the trajectory has been consistent: more ownership, harder problems, and a sharper focus on " + domain + ". ",
    "Taken together, the through-line of my career has been steadily larger scope in " + domain + ", earned by delivering rather than by tenure. ",
    "What ties this together is a deliberate path toward " + domain + " problems with real stakes, each role chosen for the size of the challenge. "
  ];
  var pExtra = pick(pExtraTpls);
  if (rest.length) { pExtra += "It also shows up in work that resists tidy metrics, like " + story(rest[0].trim()) + ". "; }
  if (note) { pExtra += "On " + co + " specifically: " + note + ((note.charAt(note.length-1)===".")?"":"."); }
  else { pExtra += "If " + co + " is pushing on " + focus + ", that is precisely the kind of mandate I look for next."; }
  var closes = [
    "I would welcome a conversation about where " + co + " wants " + focus + " to be a year from now, and how I would shorten the path there.",
    "If it is useful, I am happy to walk through how I would approach the first ninety days against your priorities in " + domain + ".",
    "I would value the chance to discuss how this experience could support " + co + " as it scales " + domain + ", and to get into the specifics behind any of the results above."
  ];
  var p4 = pick3(closes);
  var signoff = (appName && appName.trim()) ? (String.fromCharCode(10) + appName.trim()) : "";
  var parts = ["Dear Hiring Manager,", p1, p2, p3, pExtra, p4, "Best regards," + signoff];
  return parts.join(NL2);
}

  async function generate() {
    setErr("");
    if (jd.trim().length < 20) { setErr("Please paste the job description (at least a few sentences)."); return; }
    if (cv.trim().length < 20) { setErr("Please paste your CV / resume so we can tailor the letter."); return; }
    setLoading(true);
    setOut("");
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "cover", jd, text: cv, role, tone, company: companyName, notes }),
      });
      const data = await res.json();
      if (data && data.text) { setOut(data.text); }
      else { setOut(localLetter()); }
    } catch (e) {
      setErr("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function copyOut() {
    if (!out) return;
    navigator.clipboard.writeText(out).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1800); });
  }
    function docHtml() {
    var today = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    var name = (appName || "Your Name").trim();
    var contact = [appEmail, appPhone, appLoc].filter(function(x){ return x && x.trim(); }).join("   ");
    var nn = String.fromCharCode(10) + String.fromCharCode(10);
    var paras = (out || "").split(nn).map(function(x){ return x.trim(); }).filter(Boolean);
    function esc(t){ return t.split("&").join("&amp;").split("<").join("&lt;").split(String.fromCharCode(10)).join("<br/>"); }
    var body = paras.map(function(x){ return "<p>" + esc(x) + "</p>"; }).join("");
    var T = TEMPLATES.filter(function(x){ return x.id === tpl; })[0] || TEMPLATES[0];
    var css = "";
    css += "*{margin:0;padding:0;box-sizing:border-box}";
    css += "html,body{background:" + T.page + "}";
    css += ".page{width:210mm;min-height:297mm;background:" + T.page + ";margin:0 auto;position:relative}";
    css += ".inner{padding:19mm 19mm 19mm 19mm}";
    css += "body{font-family:" + T.body + ";color:" + T.text + ";font-size:11pt;line-height:1.3}";
    css += "p{text-align:justify;text-justify:inter-word;-webkit-hyphens:auto;-ms-hyphens:auto;hyphens:auto;font-size:11pt;line-height:1.3;margin:0 0 11pt}";
    css += ".nm{font-family:" + T.head + ";font-size:" + T.nameSize + "px;font-weight:700;color:" + T.primary + ";letter-spacing:" + T.ls + ";text-transform:" + T.tr + ";line-height:1.1}";
    css += ".hl{font-size:11pt;color:" + T.accent + ";font-weight:600;margin-top:3pt}";
    css += ".ct{font-size:10pt;color:" + T.muted + ";margin-top:5pt;line-height:1.5}";
    css += ".hd{margin-bottom:14pt}";
    css += ".hd.centered{text-align:center}";
    css += ".hd.split{display:flex;justify-content:space-between;align-items:flex-end;gap:16pt}";
    css += ".rule{border:0;border-top:1px solid " + T.accent + ";margin:10pt 0 16pt}";
    css += ".rule.thick{border-top:3px solid " + T.accent + "}";
    css += ".rule.underline{border-top:2px solid " + T.accent + ";width:64px;margin:8pt 0 16pt}";
    css += ".dt{font-size:10.5pt;color:" + T.muted + ";margin:0 0 14pt}";
    css += ".greet{font-size:11pt;margin:0 0 11pt}";
    css += ".sig{margin-top:16pt;font-size:11pt;line-height:1.3}";
    css += ".signame{font-weight:700;color:" + T.primary + "}";
    var hl = (role && role.trim()) ? ("<div class=hl>" + esc(role.trim()) + "</div>") : "";
    var ctHtml = contact ? ("<div class=ct>" + esc(contact) + "</div>") : "";
    var nameHtml = "<div class=nm>" + esc(name) + "</div>";
    var hd;
    if (T.header === "split") { hd = "<div class='hd split'><div>" + nameHtml + hl + "</div>" + (ctHtml ? ("<div style='text-align:right'>" + ctHtml + "</div>") : "") + "</div>"; }
    else if (T.header === "centered") { hd = "<div class='hd centered'>" + nameHtml + hl + ctHtml + "</div>"; }
    else { hd = "<div class=hd>" + nameHtml + hl + ctHtml + "</div>"; }
    var dvClass = T.divider === "rule-thick" ? "rule thick" : (T.divider === "underline" ? "rule underline" : "rule");
    var dv = "<hr class='" + dvClass + "'/>";
    var html = "<!doctype html><html><head><meta charset=utf-8><title>Cover Letter</title><style>" + css + "</style></head><body>";
    html += "<div class=page><div class=inner>";
    html += hd + dv;
    html += "<div class=dt>" + esc(today) + "</div>";
    html += body;
    html += "</div></div></body></html>";
    return html;
  }
async function loadScript(src) {
  return new Promise(function(resolve, reject){
    var s = document.createElement("script");
    s.src = src; s.onload = function(){ resolve(true); }; s.onerror = function(){ reject(new Error("load failed")); };
    document.head.appendChild(s);
  });
}
async function downloadPdf() {
  if (!out) return;
  setPdfBusy(true);
  try {
    if (!window.html2canvas) { await loadScript("https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js"); }
    if (!(window.jspdf && window.jspdf.jsPDF)) { await loadScript("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"); }
    var holder = document.createElement("div");
    holder.style.position = "fixed"; holder.style.left = "-10000px"; holder.style.top = "0"; holder.style.width = "794px"; holder.style.background = "#fff";
    holder.innerHTML = docHtml();
    document.body.appendChild(holder);
    var canvas = await window.html2canvas(holder, { scale: 2, backgroundColor: "#ffffff", useCORS: true });
    document.body.removeChild(holder);
    var imgData = canvas.toDataURL("image/jpeg", 0.95);
    var JsPDF = window.jspdf.jsPDF;
    var pdf = new JsPDF("p", "mm", "a4");
    var pw = pdf.internal.pageSize.getWidth();
    var ph = pdf.internal.pageSize.getHeight();
    var iw = pw;
    var ih = canvas.height * pw / canvas.width;
    var pos = 0;
    pdf.addImage(imgData, "JPEG", 0, pos, iw, ih);
    var left = ih - ph;
    while (left > 0) {
      pos = pos - ph;
      pdf.addPage();
      pdf.addImage(imgData, "JPEG", 0, pos, iw, ih);
      left = left - ph;
    }
    pdf.save("cover-letter.pdf");
  } catch (e) {
    try {
      var w = window.open("", "_blank");
      if (w) { w.document.write(docHtml()); w.document.close(); w.focus(); setTimeout(function(){ w.print(); }, 350); }
    } catch (e2) {}
  } finally {
    setPdfBusy(false);
  }
}
function downloadTxt() {
    if (!out) return;
    var blob = new Blob([out], { type: "text/plain;charset=utf-8" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url; a.download = "cover-letter.txt";
    document.body.appendChild(a); a.click(); document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }


  return (
    <div className="dashpage"><div className="app">
    <style jsx global>{`:root{--indigo:#5B4FE8;--indigo-d:#4a3fd4;--ink:#1b1c2a;--grey:#6b7080;--mut:#9498a8;--teal:#13a99c;--green:#1aa251;--bg:#f6f7fb;--card:#fff;--border:#ececf3;--lav:#eef0fe;}.dashpage *{margin:0;padding:0;box-sizing:border-box}.app{font-family:'Inter',system-ui,sans-serif;color:var(--ink);-webkit-font-smoothing:antialiased;display:flex;min-height:100vh;background:var(--bg)}.side{width:265px;background:#fff;border-right:1px solid var(--border);padding:22px 18px;display:flex;flex-direction:column;flex-shrink:0}.brand{display:flex;align-items:center;gap:10px;font-weight:800;font-size:19px;padding:4px 6px 22px}.brand .logo{width:34px;height:34px;border-radius:10px;background:linear-gradient(145deg,#6a5cf0,#4a8fe0);display:flex;align-items:center;justify-content:center}.newbtn{background:var(--indigo);color:#fff;border:none;border-radius:11px;padding:13px;font-weight:700;font-size:14.5px;cursor:pointer;font-family:inherit;margin-bottom:20px;box-shadow:0 8px 18px rgba(91,79,232,.28)}.nav{display:flex;flex-direction:column;gap:3px}.nav a{display:flex;align-items:center;gap:12px;padding:11px 13px;border-radius:10px;text-decoration:none;color:#54596b;font-weight:600;font-size:14.5px}.nav a svg{stroke:#9aa0b2}.nav a.active{background:var(--lav);color:var(--indigo)}.nav a.active svg{stroke:var(--indigo)}.nav a:hover:not(.active){background:#f6f7fb}.upsell{margin-top:auto;background:#f4f5fd;border:1px solid #e8e8f6;border-radius:14px;padding:16px;margin-bottom:14px}.upsell .t{display:flex;align-items:center;gap:8px;font-weight:700;font-size:14px;color:var(--indigo);margin-bottom:8px}.upsell p{font-size:12.5px;color:var(--grey);line-height:1.45;margin-bottom:12px}.upsell button{width:100%;background:#fff;border:1px solid #ddd9f3;color:var(--indigo);border-radius:9px;padding:9px;font-weight:700;font-size:13.5px;cursor:pointer;font-family:inherit}.profile{display:flex;align-items:center;gap:11px;padding:8px 6px}.av{width:38px;height:38px;border-radius:50%;background:linear-gradient(140deg,#6a5cf0,#3ba9e0);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:15px;flex-shrink:0}.profile .nm{font-weight:700;font-size:13.5px}.profile .em{font-size:11.5px;color:var(--mut)}.main{flex:1;padding:26px 34px 40px;min-width:0}.top{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:24px}.top h1{font-size:27px;font-weight:800;letter-spacing:-.02em}.top .sub{color:var(--grey);font-size:15px;margin-top:4px}.topr{display:flex;align-items:center;gap:16px}.upg{display:flex;align-items:center;gap:8px;background:#fff;border:1px solid var(--border);border-radius:10px;padding:10px 16px;font-weight:700;font-size:14px;color:var(--indigo);cursor:pointer;font-family:inherit}.bell{width:40px;height:40px;border-radius:10px;background:#fff;border:1px solid var(--border);display:flex;align-items:center;justify-content:center}.hero{position:relative;overflow:hidden;border-radius:20px;padding:36px 40px;margin-bottom:24px;background:linear-gradient(125deg,#5b4fe8 0%,#5a43d8 45%,#4039b4 100%);color:#fff;display:grid;grid-template-columns:1fr 1fr;gap:30px;align-items:center}.hero .dots{position:absolute;inset:0;opacity:.5;background-image:radial-gradient(rgba(255,255,255,.18) 1px,transparent 1px);background-size:22px 22px;-webkit-mask-image:linear-gradient(110deg,transparent 55%,#000 100%);mask-image:linear-gradient(110deg,transparent 55%,#000 100%)}.hero>*{position:relative;z-index:1}.startbadge{display:inline-block;background:rgba(255,255,255,.16);border:1px solid rgba(255,255,255,.2);color:#fff;font-size:11px;font-weight:800;letter-spacing:.1em;padding:6px 13px;border-radius:20px;margin-bottom:18px}.hero h2{font-size:32px;line-height:1.12;font-weight:800;letter-spacing:-.02em;margin-bottom:16px}.hero p{font-size:14.5px;line-height:1.55;color:rgba(255,255,255,.86);max-width:430px;margin-bottom:24px}.herobtns{display:flex;gap:12px;margin-bottom:18px}.hb-w{background:#fff;color:var(--indigo);border:none;border-radius:11px;padding:13px 22px;font-weight:700;font-size:14.5px;cursor:pointer;font-family:inherit;display:inline-flex;align-items:center;gap:8px}.hb-g{background:rgba(255,255,255,.12);color:#fff;border:1px solid rgba(255,255,255,.28);border-radius:11px;padding:13px 22px;font-weight:700;font-size:14.5px;cursor:pointer;font-family:inherit}.pills{display:flex;gap:10px}.pill{background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.22);border-radius:20px;padding:7px 15px;font-size:13px;font-weight:600;color:rgba(255,255,255,.92)}.minicardwrap{position:relative}.squig{position:absolute;left:-70px;top:30px;z-index:0}.minicard{position:relative;background:#fff;border-radius:16px;padding:20px 22px;color:var(--ink);box-shadow:0 24px 50px -20px rgba(20,10,60,.4)}.mcbadge{position:absolute;top:-16px;right:-8px;background:#fff;border-radius:10px;padding:8px 13px 8px 9px;display:flex;align-items:center;gap:7px;box-shadow:0 10px 24px -8px rgba(20,10,60,.3);font-weight:700;font-size:13px}.mcbadge .c{width:20px;height:20px;border-radius:50%;background:var(--teal);display:flex;align-items:center;justify-content:center}.mchead{display:flex;align-items:center;gap:13px;margin-bottom:18px}.mcav{width:40px;height:40px;border-radius:50%;background:linear-gradient(140deg,#6a5cf0,#3ba9e0);flex-shrink:0}.mcbar{height:9px;border-radius:5px}.mclines{flex:1;display:flex;flex-direction:column;gap:7px}.mcend{display:flex;flex-direction:column;gap:6px;align-items:flex-end}.divline{height:1px;background:#eee;margin-bottom:16px}.mccols{display:grid;grid-template-columns:1fr 1fr;gap:24px}.mct{font-size:9px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;margin-bottom:14px}.mct.i{color:#aeb2c0}.mct.c{color:var(--teal)}.mci{font-size:10.5px;line-height:1.4;color:#a0a4b2;margin-bottom:15px;font-weight:500}.mcc{display:flex;gap:9px;margin-bottom:14px}.mcc .ar{width:22px;height:22px;border-radius:50%;background:var(--teal);flex-shrink:0;display:flex;align-items:center;justify-content:center;margin-top:1px}.mcc p{font-size:10.5px;line-height:1.4;color:var(--teal);font-weight:600}.row3{display:grid;grid-template-columns:1.28fr 1fr .96fr;gap:22px;margin-bottom:24px}.panel{background:#fff;border:1px solid var(--border);border-radius:16px;padding:24px}.ph{display:flex;align-items:flex-start;justify-content:space-between;margin-bottom:20px}.ph .ic{width:38px;height:38px;border-radius:10px;background:var(--lav);display:flex;align-items:center;justify-content:center;margin-bottom:0}.ph .tt{font-weight:700;font-size:16px}.ph .ds{font-size:12.5px;color:var(--grey);margin-top:3px}.ph .lk{color:var(--indigo);font-weight:600;font-size:13px;text-decoration:none;white-space:nowrap}.phleft{display:flex;gap:12px}.step{display:flex;align-items:center;gap:13px;padding:13px 6px;border-top:1px solid #f1f1f6}.step:first-of-type{border-top:none}.step .si{width:36px;height:36px;border-radius:9px;background:#f4f4fb;display:flex;align-items:center;justify-content:center;flex-shrink:0}.step .st{font-weight:700;font-size:14px}.step .sd{font-size:12.5px;color:var(--grey);margin-top:2px}.step .chev{margin-left:auto;color:#c2c6d4}.doc{display:flex;align-items:center;gap:13px;padding:13px 0;border-top:1px solid #f1f1f6}.doc:first-of-type{border-top:none}.doc .di{width:36px;height:36px;border-radius:9px;background:#f4f4fb;display:flex;align-items:center;justify-content:center;flex-shrink:0}.doc .dt{font-weight:700;font-size:13.5px}.doc .dm{font-size:12px;color:var(--mut);margin-top:2px}.doc .ats{margin-left:auto;text-align:right;display:flex;align-items:center;gap:12px}.doc .atsbadge{font-size:11.5px;font-weight:700;color:#6b7080;background:#f2f2f7;padding:3px 9px;border-radius:6px}.doc .open{color:var(--indigo);font-weight:600;font-size:13px}.docfoot{margin-top:8px;color:var(--indigo);font-weight:600;font-size:13.5px}.diag{display:flex;align-items:center;justify-content:space-between;padding:14px 0;border-top:1px solid #f1f1f6}.diag:first-of-type{border-top:none}.diag .dl{font-weight:600;font-size:14px;color:#3c4150}.diag .dv{font-weight:700;font-size:14px}.dv.good{color:var(--green)}.dv.high{color:var(--green)}.dv.role{color:var(--indigo)}.diagnote{margin-top:14px;font-size:11.5px;color:var(--mut);line-height:1.5}.stats{display:grid;grid-template-columns:repeat(4,1fr);background:#fff;border:1px solid var(--border);border-radius:16px;padding:24px 10px}.sx{display:flex;align-items:center;gap:15px;padding:0 26px;border-left:1px solid #f0f0f5}.sx:first-child{border-left:none}.sx .ic{width:46px;height:46px;border-radius:12px;background:var(--lav);display:flex;align-items:center;justify-content:center;flex-shrink:0}.sx .num{font-size:24px;font-weight:800;color:var(--indigo);line-height:1}.sx .lbl{font-size:13px;color:var(--grey);margin-top:5px;font-weight:500}`}</style>
    <aside className="side"><div className="brand"><span className="logo" style={{background:"none",overflow:"hidden"}}><svg viewBox="0 0 36 36" width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="cvg" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse"><stop stop-color="#4F46E5"/><stop offset="0.55" stop-color="#2563EB"/><stop offset="1" stop-color="#1AB5C9"/></linearGradient></defs><rect width="36" height="36" rx="9" fill="url(#cvg)"/><path d="M9 9.5a1.5 1.5 0 0 1 1.5-1.5h9.7l5.3 5.3v13.2a1.5 1.5 0 0 1-1.5 1.5H10.5A1.5 1.5 0 0 1 9 26.5z" fill="#ffffff"/><path d="M20.2 8v3.8a1.5 1.5 0 0 0 1.5 1.5h3.8z" fill="#3B6FD4"/><circle cx="14.8" cy="14.6" r="2.3" fill="#3B6FD4"/><path d="M11.2 19.6c0-2 1.6-3.2 3.6-3.2s3.6 1.2 3.6 3.2z" fill="#3B6FD4"/><rect x="11.2" y="20.8" width="9.4" height="1.5" rx="0.75" fill="#3B6FD4"/><rect x="11.2" y="23.2" width="8" height="1.5" rx="0.75" fill="#3B6FD4"/><rect x="11.2" y="25.6" width="6" height="1.5" rx="0.75" fill="#3B6FD4"/><circle cx="24.5" cy="25.5" r="5.2" fill="#ffffff"/><path d="M24.8 21.6l0.7 2.1 2.1 0.7-2.1 0.7-0.7 2.1-0.7-2.1-2.1-0.7 2.1-0.7z" fill="#3B6FD4"/><path d="M22.3 26.2l0.4 1.2 1.2 0.4-1.2 0.4-0.4 1.2-0.4-1.2-1.2-0.4 1.2-0.4z" fill="#3B6FD4"/></svg></span>CV Optimizer</div><button className="newbtn">+ Translate my CV</button><nav className="nav"><a href="#"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" strokeWidth="1.8"><path d="M3 11l9-7 9 7M5 10v10h14V10" strokeLinecap="round" strokeLinejoin="round"/></svg>Dashboard</a><a href="#"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" strokeWidth="1.8"><path d="M7 3h7l5 5v13H7z" strokeLinejoin="round"/><path d="M14 3v5h5" strokeLinejoin="round"/></svg>Translate my CV</a><a href="/cover-letters/write" className="active"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" strokeWidth="1.8"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 8l9 5 9-5" strokeLinecap="round"/></svg>Write my cover letter</a><a href='/my-documents'><svg width="19" height="19" viewBox="0 0 24 24" fill="none" strokeWidth="1.8"><path d="M7 3h10l3 3v15H7z" strokeLinejoin="round"/><path d="M10 9h7M10 13h7M10 17h4" strokeLinecap="round"/></svg>My documents</a><a href="/interview-tips"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" strokeWidth="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2" strokeLinecap="round"/></svg>Interview tips</a><a href="/templates"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" strokeWidth="1.8"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M8 9h3M8 13h3M8 17h2" strokeLinecap="round"/></svg>CV templates</a><a href="#"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" strokeWidth="1.8"><path d="M4 5h11l5 5v9H4z" strokeLinejoin="round"/><path d="M8 9h6M8 13h8" strokeLinecap="round"/></svg>Career Guide</a></nav><div className="upsell"><div className="t"><svg width="16" height="16" viewBox="0 0 24 24" fill="#5B4FE8"><path d="M5 8l4 3 3-6 3 6 4-3-2 11H7z"/></svg>Unlock more features</div><p>Upgrade to Premium for unlimited translations, AI tips &amp; more.</p><button>Upgrade plan</button></div><div className="profile"><span className="av">A</span><div><div className="nm">Alex Morgan</div><div className="em">alex.morgan@email.com</div></div></div></aside>
    <main className="main" style={{ background: C.surface, color: C.ink, fontFamily: "Plus Jakarta Sans, system-ui, sans-serif" }}>
      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "40px 24px 8px" }}>
        <span style={{ display: "inline-block", fontSize: 12, fontWeight: 700, letterSpacing: 1, color: C.primary, background: C.surfaceAlt, border: "1px solid " + C.line, borderRadius: 999, padding: "6px 12px" }}>AI COVER LETTER WRITER</span>
        <h1 style={{ fontSize: 34, fontWeight: 800, margin: "16px 0 8px", letterSpacing: -0.5 }}>Write a cover letter tailored to the job.</h1>
        <p style={{ fontSize: 16, color: C.inkSoft, maxWidth: 640, margin: 0 }}>Paste the job description and your CV. Our AI writes a focused, recruiter-ready cover letter that matches the role and sounds like you.</p>
      </section>
      <section style={{ maxWidth: 1120, margin: "0 auto", padding: "20px 24px 64px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, alignItems: "start" }}>
        <div style={{ background: "#fff", border: "1px solid " + C.line, borderRadius: 16, padding: 22 }}>
          <label style={{ display: "block", fontSize: 13, fontWeight: 700, marginBottom: 6 }}>Job description</label>
          <textarea value={jd} onChange={(e) => setJd(e.target.value)} placeholder="Paste the full job posting here..." style={{ width: "100%", minHeight: 150, padding: 12, borderRadius: 12, border: "1px solid " + C.line, fontSize: 14, fontFamily: "inherit", resize: "vertical", color: C.ink, background: "#fff", boxSizing: "border-box" }} />
          <label style={{ display: "block", fontSize: 13, fontWeight: 700, margin: "16px 0 6px" }}>Your CV / resume</label>
          <textarea value={cv} onChange={(e) => setCv(e.target.value)} placeholder="Paste your current resume or key experience..." style={{ width: "100%", minHeight: 150, padding: 12, borderRadius: 12, border: "1px solid " + C.line, fontSize: 14, fontFamily: "inherit", resize: "vertical", color: C.ink, background: "#fff", boxSizing: "border-box" }} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 16 }}>
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 700, marginBottom: 6 }}>Position you're applying for</label>
              <input value={role} onChange={(e) => setRole(e.target.value)} placeholder="e.g. Marketing Manager" style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid " + C.line, fontSize: 14, color: C.ink, background: "#fff", boxSizing: "border-box" }} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 700, marginBottom: 6 }}>Tone</label>
              <select value={tone} onChange={(e) => setTone(e.target.value)} style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid " + C.line, fontSize: 14, color: C.ink, background: "#fff", boxSizing: "border-box" }}>
                {TONES.map((t) => (<option key={t} value={t}>{t}</option>))}
              </select>
            </div>
          </div>
          <div style={{ marginTop: 16 }}>
<label style={{ display: "block", fontSize: 13, fontWeight: 700, marginBottom: 6 }}>Company (optional)</label>
<input value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="e.g. Acme" style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid " + C.line, fontSize: 14, color: C.ink, background: "#fff", boxSizing: "border-box" }} />
<label style={{ display: "block", fontSize: 13, fontWeight: 700, margin: "16px 0 6px" }}>Why this company (optional)</label>
<textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="One specific thing that draws you to them: a product bet, a mission, a recent move..." style={{ width: "100%", minHeight: 70, padding: 12, borderRadius: 12, border: "1px solid " + C.line, fontSize: 14, fontFamily: "inherit", resize: "vertical", color: C.ink, background: "#fff", boxSizing: "border-box" }} />
</div>
{err ? (<p style={{ color: "#B42318", fontSize: 13, fontWeight: 600, margin: "14px 0 0" }}>{err}</p>) : null}
          <div style={{ marginTop: 16 }}>
<label style={{ display: "block", fontSize: 13, fontWeight: 700, marginBottom: 6 }}>Your details (for the letter header)</label>
<input value={appName} onChange={(e) => setAppName(e.target.value)} placeholder="Full name" style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid " + C.line, fontSize: 14, color: C.ink, background: "#fff", boxSizing: "border-box", marginBottom: 10 }} />
<div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
<input value={appEmail} onChange={(e) => setAppEmail(e.target.value)} placeholder="Email" style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid " + C.line, fontSize: 14, color: C.ink, background: "#fff", boxSizing: "border-box" }} />
<input value={appPhone} onChange={(e) => setAppPhone(e.target.value)} placeholder="Phone" style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid " + C.line, fontSize: 14, color: C.ink, background: "#fff", boxSizing: "border-box" }} />
</div>
<input value={appLoc} onChange={(e) => setAppLoc(e.target.value)} placeholder="Location (city, country)" style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid " + C.line, fontSize: 14, color: C.ink, background: "#fff", boxSizing: "border-box", marginTop: 10 }} />
</div>
              <button onClick={generate} disabled={loading} style={{ marginTop: 18, width: "100%", padding: "13px 18px", borderRadius: 999, border: "none", cursor: loading ? "default" : "pointer", fontSize: 15, fontWeight: 700, color: "#fff", background: loading ? C.inkSoft : (C.primary), opacity: loading ? 0.85 : 1 }}>{loading ? "Writing your letter..." : "Generate with AI"}</button>
        </div>
        <div style={{ background: "#fff", border: "1px solid " + C.line, borderRadius: 16, padding: 22, minHeight: 420, display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <span style={{ fontSize: 13, fontWeight: 700 }}>Your cover letter</span>
            <div style={{ display: "flex", alignItems: "center" }}><button onClick={copyOut} disabled={!out} style={{ fontSize: 13, fontWeight: 600, padding: "7px 14px", borderRadius: 999, border: "1px solid " + C.line, background: "#fff", color: C.ink, cursor: "pointer" }}>{copied ? "Copied" : "Copy"}</button><button onClick={downloadPdf} disabled={!out || pdfBusy} style={{ fontSize: 13, fontWeight: 600, padding: "7px 14px", borderRadius: 999, border: "none", background: out ? C.primary : C.line, color: out ? "#fff" : C.inkSoft, cursor: out ? "pointer" : "default", marginLeft: 8 }}>{pdfBusy ? "Generating..." : "Download PDF"}</button>
<button onClick={downloadTxt} disabled={!out} style={{ fontSize: 13, fontWeight: 600, padding: "7px 14px", borderRadius: 999, border: "1px solid " + C.line, background: "#fff", color: C.ink, cursor: out ? "pointer" : "default", marginLeft: 8 }}>.txt</button>
</div>
          </div>
          <div style={{ marginBottom: 14 }}>
<div style={{ fontSize: 12, fontWeight: 700, color: C.inkSoft, marginBottom: 8 }}>Choose a template (matches your resume template family)</div>
<div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8 }}>
{TEMPLATES.map(function(tp){ var on = tpl === tp.id; return (
<button key={tp.id} onClick={function(){ setTpl(tp.id); }} style={{ cursor: "pointer", textAlign: "left", padding: 10, borderRadius: 10, background: tp.page, border: (on ? "2px solid " + C.primary : "1px solid " + C.line) }}>
<div style={{ fontFamily: tp.head, fontSize: 13, fontWeight: 700, color: tp.primary, letterSpacing: 0.3, textTransform: (tp.tr === "none" ? "none" : "uppercase") }}>{tp.name}</div>
<div style={{ height: 3, width: 34, background: tp.accent, margin: "5px 0 6px", borderRadius: 2 }} />
<div style={{ fontFamily: tp.body, fontSize: 9, color: tp.muted, lineHeight: 1.3 }}>Aa Bb Cc 0123</div>
<div style={{ fontSize: 10, fontWeight: 600, color: on ? C.primary : C.inkSoft, marginTop: 6 }}>{tp.cat}</div>
</button>
); })}
</div>
</div>
{out ? (
            <textarea value={out} onChange={(e) => setOut(e.target.value)} style={{ flex: 1, width: "100%", minHeight: 340, padding: 16, borderRadius: 12, border: "1px solid " + C.line, fontSize: 14, lineHeight: 1.6, fontFamily: "inherit", color: C.ink, background: C.surfaceAlt, resize: "vertical", boxSizing: "border-box" }} />
          ) : (
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", color: C.inkSoft, fontSize: 14, border: "1px dashed " + C.line, borderRadius: 12, padding: 24 }}>
              {loading ? "Analysing the job and your CV, then drafting your letter..." : "Your tailored cover letter will appear here. Fill in the job description and your CV, then click Generate."}
            </div>
          )}
          <p style={{ fontSize: 12, color: C.inkSoft, margin: "12px 0 0" }}>You can edit the letter above before copying. Tip: review names, dates and company details before sending.</p>
        </div>
      </section>
      
    </main></div></div>
  );
}