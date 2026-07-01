'use client';

import React from 'react';
import Link from 'next/link';

const BRAND = {
  primary: '#4F46E5',
  secondary: '#0EA5A4',
  ink: '#1F2433',
  inkSoft: '#5B6478',
  line: '#ECEDF3',
};

const navLinks = ['How it works', 'Interview tips', 'Career Guide', 'Pricing'];

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/5 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 lg:px-10">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl overflow-hidden shadow-sm"><svg viewBox="0 0 36 36" width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="cvg" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse"><stop stop-color="#4F46E5"/><stop offset="0.55" stop-color="#2563EB"/><stop offset="1" stop-color="#1AB5C9"/></linearGradient></defs><rect width="36" height="36" rx="9" fill="url(#cvg)"/><path d="M9 9.5a1.5 1.5 0 0 1 1.5-1.5h9.7l5.3 5.3v13.2a1.5 1.5 0 0 1-1.5 1.5H10.5A1.5 1.5 0 0 1 9 26.5z" fill="#ffffff"/><path d="M20.2 8v3.8a1.5 1.5 0 0 0 1.5 1.5h3.8z" fill="#3B6FD4"/><circle cx="14.8" cy="14.6" r="2.3" fill="#3B6FD4"/><path d="M11.2 19.6c0-2 1.6-3.2 3.6-3.2s3.6 1.2 3.6 3.2z" fill="#3B6FD4"/><rect x="11.2" y="20.8" width="9.4" height="1.5" rx="0.75" fill="#3B6FD4"/><rect x="11.2" y="23.2" width="8" height="1.5" rx="0.75" fill="#3B6FD4"/><rect x="11.2" y="25.6" width="6" height="1.5" rx="0.75" fill="#3B6FD4"/><circle cx="24.5" cy="25.5" r="5.2" fill="#ffffff"/><path d="M24.8 21.6l0.7 2.1 2.1 0.7-2.1 0.7-0.7 2.1-0.7-2.1-2.1-0.7 2.1-0.7z" fill="#3B6FD4"/><path d="M22.3 26.2l0.4 1.2 1.2 0.4-1.2 0.4-0.4 1.2-0.4-1.2-1.2-0.4 1.2-0.4z" fill="#3B6FD4"/></svg></span>
          <span className="text-lg font-extrabold tracking-tight">CV Optimizer</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <a key={l} href={l==="How it works"?"/how-it-works":l==="Career Guide"?"/career-guide":l==="Interview tips"?"/interview-tips.html":"Pricing"?"/pricing":"#"} className="text-sm font-medium transition-colors hover:opacity-70" style={{ color: BRAND.inkSoft }}>{l}</a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <Link href="/auth?mode=login" className="hidden sm:inline-flex items-center rounded-full border px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-black/5" style={{ borderColor: BRAND.line, color: BRAND.ink }}>Log in</Link>
          <Link href="/optimize" className="inline-flex items-center rounded-full px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-transform hover:-translate-y-0.5" style={{ background: BRAND.primary }}>Translate my CV <span aria-hidden="true" className="ml-1">→</span></Link>
        </div>
      </div>
    </header>
  );
}
