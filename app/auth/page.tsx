"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

const BRAND = { primary: "#4F46E5", primaryDark: "#4338CA", secondary: "#0EA5A4", ink: "#1F2433", inkSoft: "#5B6478", surface: "#F7F8FC", line: "#ECEDF3" };

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5">
      <span className="flex h-9 w-9 items-center justify-center rounded-xl text-white shadow-sm" style={{ background: "linear-gradient(135deg, " + BRAND.primary + ", " + BRAND.secondary + ")" }}>
        <svg viewBox="0 0 36 36" width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="cvg" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse"><stop stop-color="#4F46E5"/><stop offset="0.55" stop-color="#2563EB"/><stop offset="1" stop-color="#1AB5C9"/></linearGradient></defs><rect width="36" height="36" rx="9" fill="url(#cvg)"/><path d="M9 9.5a1.5 1.5 0 0 1 1.5-1.5h9.7l5.3 5.3v13.2a1.5 1.5 0 0 1-1.5 1.5H10.5A1.5 1.5 0 0 1 9 26.5z" fill="#ffffff"/><path d="M20.2 8v3.8a1.5 1.5 0 0 0 1.5 1.5h3.8z" fill="#3B6FD4"/><circle cx="14.8" cy="14.6" r="2.3" fill="#3B6FD4"/><path d="M11.2 19.6c0-2 1.6-3.2 3.6-3.2s3.6 1.2 3.6 3.2z" fill="#3B6FD4"/><rect x="11.2" y="20.8" width="9.4" height="1.5" rx="0.75" fill="#3B6FD4"/><rect x="11.2" y="23.2" width="8" height="1.5" rx="0.75" fill="#3B6FD4"/><rect x="11.2" y="25.6" width="6" height="1.5" rx="0.75" fill="#3B6FD4"/><circle cx="24.5" cy="25.5" r="5.2" fill="#ffffff"/><path d="M24.8 21.6l0.7 2.1 2.1 0.7-2.1 0.7-0.7 2.1-0.7-2.1-2.1-0.7 2.1-0.7z" fill="#3B6FD4"/><path d="M22.3 26.2l0.4 1.2 1.2 0.4-1.2 0.4-0.4 1.2-0.4-1.2-1.2-0.4 1.2-0.4z" fill="#3B6FD4"/></svg>
      </span>
      <span className="text-lg font-extrabold tracking-tight" style={{ color: BRAND.ink }}>CV Optimizer</span>
    </Link>
  );
}

function SocialButton({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <button type="button" className="flex w-full items-center justify-center gap-2.5 rounded-xl border bg-white px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-gray-50" style={{ borderColor: BRAND.line, color: BRAND.ink }}>
      {children}<span>{label}</span>
    </button>
  );
}

export default function AuthPage() {
  const router = useRouter();
  const params = useSearchParams();
  const initialMode = params.get("mode") === "login" ? "login" : "signup";
  const [mode, setMode] = useState<"signup" | "login">(initialMode);
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");
  const isSignup = mode === "signup";
  const canSubmit = email.indexOf("@") > 0 && pw.length >= 8 && (!isSignup || agree);
  function submit(e: React.FormEvent) { e.preventDefault(); const em=email.trim(); if (em.indexOf(String.fromCharCode(64))<1||em.lastIndexOf(String.fromCharCode(46))<em.indexOf(String.fromCharCode(64))) { setError(String.fromCharCode(80)+"lease enter a valid email address."); return; } if (pw.length<8) { setError(String.fromCharCode(80)+"assword must be at least 8 characters."); return; } if (isSignup && !agree) { setError(String.fromCharCode(80)+"lease accept the Terms to continue."); return; } setError(""); router.push("/dashboard"); }

  return (
    <div className="flex min-h-screen" style={{ background: BRAND.surface }}>
      <div className="relative hidden w-1/2 flex-col justify-between p-12 text-white lg:flex" style={{ background: "linear-gradient(150deg, " + BRAND.primaryDark + " 0%, " + BRAND.primary + " 55%, " + BRAND.secondary + " 120%)" }}>
        <Logo />
        <div className="max-w-md">
          <h2 className="text-3xl font-extrabold leading-tight">Same career. Different language.</h2>
          <p className="mt-4 text-white/80">The translator for professionals moving between the institutional and corporate worlds. Your experience, finally understood by the people reading it.</p>
          <div className="mt-8 flex items-center gap-3 rounded-2xl bg-white/10 p-4 backdrop-blur">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/20 font-bold">UN</div>
            <div><p className="text-sm font-semibold">"Nine years at a UN agency, invisible to corporate recruiters. Translated, I had three interviews in a month."</p><p className="text-xs text-white/70">former UN officer, now in consulting</p></div>
          </div>
        </div>
        <p className="text-xs text-white/60">© 2026 CV Optimizer. All rights reserved.</p>
      </div>

      <div className="flex w-full items-center justify-center px-6 py-10 lg:w-1/2">
        <div className="w-full max-w-md">
          <div className="mb-8 flex items-center justify-between lg:hidden"><Logo /></div>
          <h1 className="text-2xl font-extrabold" style={{ color: BRAND.ink }}>{isSignup ? "Create your account" : "Welcome back"}</h1>
          <p className="mt-1 text-sm" style={{ color: BRAND.inkSoft }}>{isSignup ? "Start optimizing your resume in minutes — no credit card needed." : "Log in to pick up where you left off."}</p>
          {params.get("trial") ? (
            <div style={{ marginTop: 14, marginBottom: 4, padding: "12px 14px", borderRadius: 12, background: "#EEF2FF", border: "1px solid #C7D2FE" }}>
              <div style={{ fontWeight: 700, color: "#4338CA", fontSize: 14 }}>Your 3-day free trial starts now</div>
              <div style={{ color: "#5B6478", fontSize: 13, marginTop: 2 }}>Create your account to begin. No charge for 3 days, cancel anytime.</div>
            </div>
          ) : null}
          <div className="mt-6 space-y-3">
            <SocialButton label={isSignup ? "Sign up with Google" : "Continue with Google"}><svg width="18" height="18" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.4 29.3 35 24 35c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16 19 13 24 13c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.6 6.1 29.6 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35 26.7 36 24 36c-5.3 0-9.7-2.6-11.3-7l-6.5 5C9.6 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4.1 5.6l6.2 5.2C39 36.7 44 31 44 24c0-1.3-.1-2.3-.4-3.5z"/></svg></SocialButton>
            <SocialButton label={isSignup ? "Sign up with LinkedIn" : "Continue with LinkedIn"}><svg width="18" height="18" viewBox="0 0 24 24" fill="#0A66C2"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 110-4.13 2.06 2.06 0 010 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z"/></svg></SocialButton>
          </div>

          <div className="my-5 flex items-center gap-3 text-xs" style={{ color: BRAND.inkSoft }}><span className="h-px flex-1" style={{ background: BRAND.line }} />or<span className="h-px flex-1" style={{ background: BRAND.line }} /></div>
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-semibold" style={{ color: BRAND.ink }}>Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" className="w-full rounded-xl border px-3.5 py-2.5 text-sm outline-none focus:ring-2" style={{ borderColor: BRAND.line }} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-semibold" style={{ color: BRAND.ink }}>Password</label>
              <div className="relative">
                <input type={showPw ? "text" : "password"} value={pw} onChange={(e) => setPw(e.target.value)} placeholder="At least 8 characters" className="w-full rounded-xl border px-3.5 py-2.5 pr-12 text-sm outline-none focus:ring-2" style={{ borderColor: BRAND.line }} />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold" style={{ color: BRAND.primary }}>{showPw ? "Hide" : "Show"}</button>
              </div>
            </div>
            {isSignup && (
              <label className="flex items-start gap-2 text-xs" style={{ color: BRAND.inkSoft }}>
                <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-0.5" />
                <span>I agree to the <Link href="#" className="font-semibold" style={{ color: BRAND.primary }}>Terms of Service</Link> and <Link href="#" className="font-semibold" style={{ color: BRAND.primary }}>Privacy Policy</Link>.</span>
              </label>
            )}
        {error && (<div className="rounded-lg bg-red-50 px-3 py-2 text-xs font-semibold text-red-600">{error}</div>)}
            <button type="submit" className="w-full rounded-xl px-4 py-3 text-sm font-bold text-white transition-opacity disabled:opacity-50" style={{ background: "linear-gradient(135deg, " + BRAND.primary + ", " + BRAND.primaryDark + ")" }}>{isSignup ? "Create account" : "Log in"}</button>
          </form>
          <p className="mt-6 text-center text-sm" style={{ color: BRAND.inkSoft }}>
            {isSignup ? "Already have an account? " : "New to CV Optimizer? "}
            <button type="button" onClick={() => setMode(isSignup ? "login" : "signup")} className="font-bold" style={{ color: BRAND.primary }}>{isSignup ? "Log in" : "Create one"}</button>
          </p>
        </div>
      </div>
    </div>
  );
}