"use client";
import Link from "next/link";
import SiteHeader from '@/components/SiteHeader';


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


const PLANS = [
  { id:"monthly", name:"Monthly", perMonth:"8.99", cadence:"per month", billed:"Billed monthly. Free for the first 3 days.", badge:"", save:"" },
  { id:"quarterly", name:"3 Months", perMonth:"7.99", cadence:"per month", billed:"$23.97 billed every 3 months.", badge:"MOST POPULAR", save:"Save 11%" },
  { id:"annual", name:"Annual", perMonth:"5.99", cadence:"per month", billed:"$71.88 billed yearly.", badge:"BEST VALUE", save:"Save 33%" },
];

const FEATURES = [
  "Unlimited ATS resume scans",
  "Full Resume Intelligence Report (20+ checks)",
  "Recruiter readability & keyword coverage",
  "Country-specific hiring recommendations",
  "One-click AI rewrite suggestions",
  "AI cover letter writer",
  "Export to PDF & DOCX",
];

function startTrial() {
  try {
    if (!localStorage.getItem('cvopt_trial_start')) {
      localStorage.setItem('cvopt_trial_start', String(Date.now()));
    }
  } catch (e) {}
  window.location.href = '/auth?trial=1';
}

export default function Pricing() {
  return (
    <main style={{ minHeight: "100vh", background: C.surface, color: C.ink, fontFamily: "Plus Jakarta Sans, system-ui, sans-serif" }}>
      <SiteHeader />
      <section style={{ position: "relative", maxWidth: 720, margin: "0 auto", padding: "56px 24px 8px", textAlign: "center" }}><div aria-hidden style={{ position: "absolute", top: -120, left: "50%", transform: "translateX(-50%)", width: 1100, height: 360, background: "radial-gradient(closest-side, rgba(255,214,196,0.55), transparent 70%)", zIndex: -1, pointerEvents: "none" }} />
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 12, fontWeight: 800, letterSpacing: 1.4, textTransform: "uppercase", color: "#5B4FE8", background: "#eef0fe", borderRadius: 999, padding: "8px 16px" }}><span style={{ width: 6, height: 6, borderRadius: 999, background: "#5B4FE8" }} />PRICING</span>
        <h1 style={{ fontSize: 38, fontWeight: 800, margin: "16px 0 8px", letterSpacing: -0.5 }}>Choose the plan that fits you.</h1>
        <p style={{ fontSize: 17, color: C.inkSoft, maxWidth: 540, margin: "0 auto" }}>Every plan unlocks all features. Try free for 3 days, then pick monthly, quarterly, or annual.</p>
      </section>
      <section style={{ maxWidth: 1040, margin: "0 auto", padding: "24px 24px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, alignItems: "stretch" }}>
          {PLANS.map((pl) => {
            const featured = pl.id === "quarterly";
            return (
              <div key={pl.id} style={{ position: "relative", background: "#fff", border: featured ? ("2px solid " + C.primary) : ("1px solid " + C.line), borderRadius: 20, padding: 28, boxShadow: featured ? "0 18px 50px rgba(79,70,229,0.14)" : "0 6px 20px rgba(16,23,42,0.05)", display: "flex", flexDirection: "column" }}>
                {pl.badge ? (<span style={{ position: "absolute", top: -12, left: 24, fontSize: 11, fontWeight: 800, letterSpacing: 0.6, color: "#fff", background: featured ? C.primary : C.secondary, borderRadius: 999, padding: "5px 12px" }}>{pl.badge}</span>) : null}
                <h2 style={{ fontSize: 19, fontWeight: 800, margin: "4px 0 2px" }}>{pl.name}</h2>
                {pl.save ? (<span style={{ fontSize: 12, fontWeight: 700, color: C.secondary }}>{pl.save}</span>) : (<span style={{ fontSize: 12, color: C.inkSoft }}>Flexible, cancel anytime</span>)}
                <div style={{ display: "flex", alignItems: "baseline", gap: 5, margin: "14px 0 2px" }}>
                  <span style={{ fontSize: 40, fontWeight: 800, letterSpacing: -1 }}>{"$" + pl.perMonth}</span>
                  <span style={{ fontSize: 14, color: C.inkSoft }}>/ mo</span>
                </div>
                <p style={{ fontSize: 13, color: C.inkSoft, margin: "0 0 18px", minHeight: 34 }}>{pl.billed}</p>
                <button onClick={startTrial} style={{ width: "100%", padding: "13px 16px", borderRadius: 999, border: featured ? "none" : ("1px solid " + C.primary), cursor: "pointer", fontSize: 15, fontWeight: 700, color: featured ? "#fff" : C.primary, background: featured ? C.primary : "#fff", marginTop: "auto" }}>Start 3-day free trial</button>
              </div>
            );
          })}
        </div>
        <p style={{ textAlign: "center", fontSize: 13, color: C.inkSoft, marginTop: 20 }}>All plans include a 3-day free trial. No charge until your trial ends. Cancel anytime.</p>
      </section>
      <footer style={{ borderTop: "1px solid " + C.line, padding: "28px 24px", textAlign: "center", color: C.inkSoft, fontSize: 13 }}>
        © {new Date().getFullYear()} CV Optimizer. All rights reserved.
      </footer>
    </main>
  );
}