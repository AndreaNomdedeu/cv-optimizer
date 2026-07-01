"use client";
import Link from "next/link";

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

const FEATURES = [
  ["Keyword matching", "We compare your resume against the job description and surface the exact keywords recruiters and ATS scanners look for."],
  ["ATS-friendly formatting", "Automatic checks for fonts, columns, headers and sections so your resume parses cleanly in any applicant tracking system."],
  ["Recruiter-ready bullet points", "Guided, achievement-driven bullet points that show real impact and match the role you are applying for."],
  ["Real-time match score", "See exactly how well your resume matches each job and what to fix to raise your score."],
  ["Built-in resume builder", "Edit and rebuild your resume in clean, modern templates that look great and stay ATS-safe."],
  ["Export to PDF or DOCX", "Download a polished, recruiter-ready resume in one click, ready to send to any application."],
];

const STEPS = [
  ["1", "Add your resume & the job", "Upload your resume and paste the job description you are targeting."],
  ["2", "Optimize & fix", "Get your match score, keyword gaps and formatting fixes, then apply them."],
  ["3", "Export & apply", "Download your ATS-ready resume and apply with confidence."],
];
export default function ResumePage() {
  return (
    <div style={{ background: C.surface, minHeight: "100vh" }}>
      <Nav />
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-10 text-center">
        <span className="inline-block rounded-full px-3 py-1 text-xs font-bold" style={{ background: "#EEF0FF", color: C.primary }}>ATS-RESUME</span>
        <h1 className="mx-auto mt-5 max-w-3xl text-4xl font-extrabold leading-tight md:text-5xl" style={{ color: C.ink }}>A resume that beats the ATS and wins interviews.</h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg" style={{ color: C.inkSoft }}>Optimize your resume against any job in seconds — keyword matching, formatting checks and recruiter-ready, ATS-friendly bullet points.</p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/optimize" className="rounded-full px-6 py-3 text-sm font-bold text-white" style={{ background: "linear-gradient(135deg, " + C.primary + ", " + C.primaryDark + ")" }}>Translate my CV</Link>
          <Link href="/auth" className="rounded-full border px-6 py-3 text-sm font-bold" style={{ borderColor: C.line, color: C.ink, background: "white" }}>Create free account</Link>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-6 py-10">
        <div className="grid gap-5 md:grid-cols-3">
          {FEATURES.map(([t, d]) => (
            <div key={t} className="rounded-2xl border bg-white p-6" style={{ borderColor: C.line }}>
              <h3 className="text-base font-bold" style={{ color: C.ink }}>{t}</h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: C.inkSoft }}>{d}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-6 py-10">
        <h2 className="text-center text-2xl font-extrabold" style={{ color: C.ink }}>How it works</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {STEPS.map(([n, t, d]) => (
            <div key={n} className="rounded-2xl bg-white p-6 text-center" style={{ border: "1px solid " + C.line }}>
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white" style={{ background: "linear-gradient(135deg, " + C.primary + ", " + C.secondary + ")" }}>{n}</div>
              <h3 className="mt-4 font-bold" style={{ color: C.ink }}>{t}</h3>
              <p className="mt-2 text-sm" style={{ color: C.inkSoft }}>{d}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="rounded-3xl px-8 py-12 text-center" style={{ background: "linear-gradient(135deg, " + C.primary + ", " + C.primaryDark + ")" }}>
          <h2 className="text-2xl font-extrabold text-white md:text-3xl">Ready to build an interview-winning resume?</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-white/80">Optimized for every job and built to pass the ATS. 3-day free trial.</p>
          <Link href="/auth" className="mt-6 inline-flex rounded-full bg-white px-6 py-3 text-sm font-bold" style={{ color: C.primary }}>Get started free</Link>
        </div>
      </section>
      <footer className="border-t py-8 text-center text-xs" style={{ borderColor: C.line, color: C.inkSoft }}>
        © 2026 CV Optimizer. All rights reserved.
      </footer>
    </div>
  );
}