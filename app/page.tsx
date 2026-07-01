'use client';

import React from 'react';
import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';

const BRAND = {
  name: 'CV Optimizer',
  primary: '#5B4FE8',
  primaryDark: '#4338CA',
  secondary: '#13A99C',
  ink: '#1F2433',
  inkSoft: '#5B6478',
  surface: '#F7F8FC',
  surfaceAlt: '#FBFAFF',
  line: '#ECEDF3',
};

function DotPattern({ className = '', color = '#C9CCDA' }: { className?: string; color?: string }) {
  return (
    <svg className={className} width="140" height="140" viewBox="0 0 140 140" fill="none" aria-hidden="true">
      <defs>
        <pattern id="dots" x="0" y="0" width="18" height="18" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.6" fill={color} />
        </pattern>
      </defs>
      <rect width="140" height="140" fill="url(#dots)" />
    </svg>
  );
}

function HandCurve({ className = '', color = BRAND.secondary }: { className?: string; color?: string }) {
  return (
    <svg className={className} width="180" height="60" viewBox="0 0 180 60" fill="none" aria-hidden="true">
      <path d="M4 40 C 40 8, 70 8, 96 30 S 150 54, 176 18" stroke={color} strokeWidth="2.5" strokeLinecap="round" fill="none" opacity="0.7" />
    </svg>
  );
}

function ResumeMockup() {
  const rows = [
    { inst: "Coordinated inter-agency protection cluster meetings…", corp: "Led recurring cross-organizational stakeholder meetings to align priorities, resolve operational issues, and track delivery against shared targets." },
    { inst: "Conducted needs assessments and monitoring visits across X communities…", corp: "Designed and executed field research across X sites to gather user data, identify operational risks, and inform resource allocation and service design." },
    { inst: "Developed and delivered capacity-building trainings for partners…", corp: "Designed and facilitated training programs for partner organizations to standardize processes, improve performance, and ensure compliance with agreed standards." },
  ];
  return (
    <div className="relative">
      <div className="rounded-3xl bg-white shadow-[0_40px_90px_-30px_rgba(31,36,51,0.28)] ring-1 ring-slate-900/5 p-7 sm:p-9">
        <div className="flex items-center gap-4 border-b pb-5" style={{ borderColor: BRAND.line }}>
          <div className="h-14 w-14 rounded-full" style={{ background: 'linear-gradient(135deg,' + BRAND.primary + ',' + BRAND.secondary + ')' }} />
          <div className="flex-1">
            <div className="h-3.5 w-40 rounded-full" style={{ background: BRAND.ink }} />
            <div className="mt-2 h-2.5 w-28 rounded-full" style={{ background: '#D7DAE6' }} />
          </div>
          <div className="hidden sm:flex flex-col items-end gap-1.5">
            <div className="h-2 w-20 rounded-full" style={{ background: '#E4E6F0' }} />
            <div className="h-2 w-16 rounded-full" style={{ background: '#E4E6F0' }} />
          </div>
        </div>
        <div className="mt-6 grid grid-cols-[1fr_auto_1fr] gap-3 sm:gap-4 mb-3">
          <div className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: '#9AA1B4' }}>Institutional</div>
          <div className="w-7" />
          <div className="text-[11px] font-semibold uppercase tracking-wide" style={{ color: BRAND.secondary }}>Corporate</div>
        </div>
        <div className="space-y-3">
          {rows.map((row, i) => (
            <div key={i} className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-4">
              <p className="text-[11px] leading-snug" style={{ color: '#9AA1B4' }}>{row.inst}</p>
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-white text-sm" style={{ background: BRAND.secondary }}>→</span>
              <p className="text-[11px] font-medium leading-snug" style={{ color: BRAND.secondary }}>{row.corp}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="absolute -right-4 -top-4 rounded-xl bg-white px-3.5 py-2.5 shadow-lg ring-1 ring-black/5 flex items-center gap-2">
        <span className="flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-bold text-white" style={{ background: BRAND.secondary }}>✓</span>
        <span className="text-sm font-semibold" style={{ color: BRAND.secondary }}>Translated</span>
      </div>
    </div>
  );
}

function PrimaryButton({ children, className = '', href = '#' }: { children: React.ReactNode; className?: string; href?: string }) {
  return (
    <Link href={href} className={'inline-flex items-center justify-center rounded-xl px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_20px_-6px_rgba(79,70,229,0.5)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-8px_rgba(79,70,229,0.6)] ' + className} style={{ background: BRAND.primary }}>
      {children}
    </Link>
  );
}

function OutlineButton({ children, className = '', href = '#' }: { children: React.ReactNode; className?: string; href?: string }) {
  return (
    <Link href={href} className={'inline-flex items-center justify-center rounded-xl border px-6 py-3 text-sm font-semibold shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-50 hover:shadow-md ' + className} style={{ borderColor: BRAND.line, color: BRAND.ink }}>
      {children}
    </Link>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider" style={{ background: 'rgba(79,70,229,0.08)', color: BRAND.primary }}>
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: BRAND.primary }} />
      {children}
    </span>
  );
}

const MATCHER_BACKGROUNDS = [
  {
    id: `human-rights`, label: `Human rights`,
    matches: [
      { role: `Compliance`, stars: 5, why: `Interpreting legal standards and verifying adherence is the core of corporate compliance. Your normative background maps almost directly.` },
      { role: `ESG & Sustainability (legal)`, stars: 4, why: `Corporate ESG legal teams increasingly handle human rights and due diligence, your exact expertise.` },
      { role: `Investigations & Due Diligence`, stars: 4, why: `Fact-finding, documentation and analysis transfer straight to corporate investigations.` },
    ],
  },
  {
    id: `legal`, label: `Legal`,
    matches: [
      { role: `Compliance`, stars: 5, why: `A direct bridge: regulatory interpretation and legal frameworks are what compliance roles are built on.` },
      { role: `Corporate Governance`, stars: 4, why: `Drafting, reviewing and advising on legal modalities maps to governance and board-facing roles.` },
      { role: `ESG & Sustainability`, stars: 4, why: `ESG legal counsel roles need exactly your ability to navigate evolving regulation.` },
    ],
  },
  {
    id: `protection`, label: `Protection`,
    matches: [
      { role: `Compliance`, stars: 3, why: `Your safeguarding protocols and accountability systems are operational compliance. The gap is regulatory and legal depth, often closeable with a short certification.` },
      { role: `Operations`, stars: 3, why: `Coordinating sensitive delivery across sites maps to operational roles, though corporate operations lean more commercial.` },
      { role: `Safeguarding & Corporate Ethics`, stars: 3, why: `Protection of vulnerable groups translates to ethics, safeguarding and conduct functions.` },
    ],
  },
  {
    id: `mel`, label: `Monitoring & Evaluation (MEL)`,
    matches: [
      { role: `Business Intelligence`, stars: 4, why: `You likely already use SQL, Power BI and Excel, the exact stack BI roles require. Few institutional profiles arrive this ready.` },
      { role: `Performance Management`, stars: 4, why: `Measuring outcomes against targets is the heart of corporate performance management.` },
      { role: `Data & Insights`, stars: 3, why: `Indicator design and reporting transfer well; deepen Python and data engineering to compete fully.` },
    ],
  },
  {
    id: `wash-engineering`, label: `WASH / Engineering`,
    matches: [
      { role: `Infrastructure Project Management`, stars: 4, why: `Your technical degree and field delivery experience are exactly what infrastructure PM needs.` },
      { role: `ESG & Sustainability`, stars: 3, why: `Water, sanitation and environmental work feeds naturally into corporate sustainability.` },
      { role: `Operations`, stars: 3, why: `Systems design and operational delivery map to utilities and operations roles.` },
    ],
  },
  {
    id: `programme-management`, label: `Programme management`,
    matches: [
      { role: `Project / Programme Management`, stars: 4, why: `Planning, budgeting and delivery transfer almost unchanged to corporate programmes.` },
      { role: `Operations`, stars: 3, why: `Coordinating delivery across teams and sites maps to operational roles.` },
      { role: `Consulting`, stars: 3, why: `Multi-stakeholder programme design fits consulting, though top firms often expect an MBA or prior firm experience.` },
    ],
  },
  {
    id: `logistics-supply-chain`, label: `Logistics & Supply Chain`,
    matches: [
      { role: `Supply Chain (corporate)`, stars: 5, why: `An almost one-to-one match: procurement, logistics and distribution use the same vocabulary corporate supply chain expects.` },
      { role: `Operations`, stars: 4, why: `Running complex operations under constraint is exactly what operations roles need.` },
      { role: `Procurement`, stars: 4, why: `Sourcing, vendor management and market assessment transfer straight across.` },
    ],
  },
];

function BackgroundMatcher() {
  const [selected, setSelected] = React.useState('');
  const current = MATCHER_BACKGROUNDS.find((b) => b.id === selected);
  return (
    <div className="relative">
      <DotPattern className="pointer-events-none absolute -right-8 -bottom-8 opacity-50" />
      <div className="relative rounded-2xl bg-white p-7 shadow-[0_20px_50px_-24px_rgba(31,36,51,0.3)] ring-1 ring-black/5">
        <label className="block text-[11px] font-semibold uppercase tracking-wide" style={{ color: BRAND.inkSoft }}>I work in...</label>
        <select value={selected} onChange={(e) => setSelected(e.target.value)} className="mt-2 w-full rounded-xl border px-4 py-3 text-sm font-medium outline-none" style={{ borderColor: BRAND.line, color: BRAND.ink, background: BRAND.surface }}>
          <option value="">Select your background</option>
          {MATCHER_BACKGROUNDS.map((b) => (<option key={b.id} value={b.id}>{b.label}</option>))}
        </select>
        {current && (
          <div className="mt-5 space-y-3">
            {current.matches.map((mm, i) => (
              <div key={i} className="rounded-xl border px-4 py-3" style={{ borderColor: BRAND.line, background: BRAND.surface }}>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold" style={{ color: BRAND.ink }}>{mm.role}</span>
                  <span className="flex gap-0.5 text-sm" aria-label={mm.stars + ' out of 5'}>
                    {[0, 1, 2, 3, 4].map((s) => (<span key={s} style={{ color: s < mm.stars ? BRAND.secondary : '#D7DAE6' }}>★</span>))}
                  </span>
                </div>
                <p className="mt-1.5 text-[13px] leading-snug" style={{ color: BRAND.inkSoft }}>{mm.why}</p>
              </div>
            ))}
          </div>
        )}
        {!current && (
          <p className="mt-5 text-[13px] leading-snug" style={{ color: BRAND.inkSoft }}>Pick your background to see the corporate roles that fit you, ranked by how directly your experience transfers.</p>
        )}
        <Link href={current ? ('/optimize?background=' + current.id) : '/optimize'} className="mt-5 inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md" style={{ background: BRAND.primary }}>Translate my CV</Link>
      </div>
    </div>
  );
}


function AboutFounder() {
  const [open, setOpen] = React.useState(false);
  return (
<section id="about-founder" className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <div className="mx-auto max-w-[65ch]">
            <div className="flex flex-col items-center text-center">
              <span className="h-20 w-20 rounded-full ring-4 ring-white shadow-md" style={{ background: 'linear-gradient(135deg,' + BRAND.primary + ',' + BRAND.secondary + ')' }} aria-hidden />
              <button type="button" onClick={() => setOpen((v) => !v)} className="mt-5 inline-flex items-center gap-2 text-3xl font-extrabold tracking-tight sm:text-4xl" style={{ color: BRAND.ink, background: "transparent", border: "none", cursor: "pointer", padding: 0 }}>About the Founder <span aria-hidden style={{ color: BRAND.primary, fontWeight: 400 }}>{open ? "–" : "+"}</span></button>
            </div>
            {open && (
            <>
<div className="mt-10 space-y-5 text-left text-[16px] leading-relaxed" style={{ color: BRAND.inkSoft }}>
              <p>After seven years working within the United Nations system, I found myself facing the same transition thousands of international professionals eventually encounter: translating a career built in one world into another.</p>
              <p>As my time in the UN system came to a close, I began exploring the private sector. It quickly became clear that the challenge wasn't my experience, it was the language used to describe it.</p>
              <p>I had led projects, advised governments, coordinated international stakeholders, managed complex programmes and delivered measurable results. Yet much of that was expressed in terminology that made perfect sense inside international organizations and meant very little to corporate recruiters. The work was relevant; the language wasn't.</p>
              <p>So I spent months learning how companies actually evaluate candidates, analyzing hundreds of job descriptions, studying hiring practices, and speaking with recruiters across industries until I could translate institutional experience into language the private sector understood. What surprised me most was how often the underlying work was exactly the same. The difference was never the skills. It was the vocabulary, the framing, and the expectations.</p>
              <p>And I was far from alone. In conversation after conversation, former colleagues, friends, strangers online, the same frustration repeated: talented people overlooked not for lack of experience, but because their achievements were written in a language recruiters outside their sector couldn't read.</p>
              <p>Long before this platform existed, I'd spent years helping others navigate it from the other side too, colleagues and graduates asking how to write a CV for the UN, how to prepare an application, what organizations like it were really looking for. That gave me a deep feel for both directions: how institutional recruitment works, and exactly where candidates get stuck.</p>
              <p>This platform brings those two perspectives together. It doesn't invent achievements or rewrite careers. It translates them, faithfully and strategically, so your experience is understood by the people reading it. Whether you're moving from the United Nations to the private sector, from corporate into international organizations, or anywhere in between.</p>
              <p className="pt-2 text-[17px] font-medium" style={{ color: BRAND.ink }}>Because careers don't need to change to open new doors.<br />Sometimes they simply need to be translated.</p>
            </div>
            <div className="mt-10 flex justify-center">
              <PrimaryButton href="/optimize" className="px-7 py-3.5 text-base">Translate my CV</PrimaryButton>
            </div>
          
            </>
            )}
          </div>
        </section>
  );
}

export default function LandingPage() {
  const navLinks = ['How it works', 'Job board', 'Career Guide', 'Pricing'];
  return (
    <div className="min-h-screen w-full antialiased" style={{ color: BRAND.ink, fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, -apple-system, sans-serif" }}><div className="hero-bg" />

      <SiteHeader />

      <section className="relative overflow-hidden pt-4">

        
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <svg className="pointer-events-none absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" viewBox="0 0 1600 900">
            <g fill="none" stroke="#ffffff" stroke-opacity="0.55" stroke-width="1.5">
              <path d="M1600 240 C 1380 300, 1320 460, 1500 560 S 1600 760, 1600 760" />
              <path d="M1600 300 C 1340 360, 1280 520, 1460 620 S 1600 820, 1600 820" stroke-opacity="0.40" />
              <path d="M1600 190 C 1420 250, 1360 410, 1540 510 S 1600 700, 1600 700" stroke-opacity="0.30" />
            </g>
            <g fill="#ffffff" fill-opacity="0.7">
              <circle cx="1480" cy="360" r="2.5" />
              <circle cx="1540" cy="300" r="2" />
              <circle cx="1430" cy="520" r="2" />
              <circle cx="1560" cy="600" r="2.5" />
              <circle cx="1500" cy="700" r="1.8" />
            </g>
          </svg>
        </div>
      
      <DotPattern className="pointer-events-none absolute left-6 top-32 opacity-[0.03]" />
        <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full blur-3xl" style={{ background: 'radial-gradient(circle, rgba(79,70,229,0.10), transparent 70%)' }} />

        <div className="pointer-events-none absolute -left-32 -top-24 h-96 w-96 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(99,102,241,0.08), transparent 70%)" }} />
        <div className="pointer-events-none absolute bottom-0 right-1/3 h-96 w-96 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(14,165,164,0.06), transparent 70%)" }} />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 pt-3 pb-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16 lg:px-10 lg:pt-4 lg:pb-16">
          <div>
            <Eyebrow>Built for careers that move between sectors.</Eyebrow>
            <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.5rem]">
              Same career. <span style={{ color: BRAND.primary }}>Different language.</span>
            </h1>
            <p className="mt-6 max-w-sm text-lg leading-[1.7]" style={{ color: BRAND.inkSoft }}>
              Leaving the UN, an NGO, or government? Your experience reads like jargon to corporate recruiters. Going the other way? We translate your CV in both directions, so your impact is clear, anywhere.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <PrimaryButton href="/optimize" className="!px-7 !py-3.5 text-base">Translate my CV</PrimaryButton>
              <OutlineButton className="!px-7 !py-3.5 text-base"><span aria-hidden="true" className="mr-1.5 text-xs">▷</span>See it in action</OutlineButton>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4 text-sm font-medium">
<div className="flex items-center gap-2.5">
<span className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: "#ECEBFB", color: BRAND.primary }}>
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2"/><circle cx="8.5" cy="11" r="2"/><path d="M5.5 16.5c.6-1.4 1.7-2 3-2s2.4.6 3 2"/><path d="M14 10h4"/><path d="M14 14h4"/></svg>
</span>
<span className="leading-tight" style={{ color: BRAND.inkSoft }}>Sector-aware<br/>translations</span>
</div>
<div className="flex items-center gap-2.5">
<span className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: "#ECEBFB", color: BRAND.primary }}>
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="5" cy="6" r="2"/><circle cx="19" cy="6" r="2"/><circle cx="12" cy="18" r="2"/><path d="M6.7 7.3 10.5 16.3"/><path d="M17.3 7.3 13.5 16.3"/></svg>
</span>
<span className="leading-tight" style={{ color: BRAND.inkSoft }}>ATS & recruiter<br/>optimized</span>
</div>
<div className="flex items-center gap-2.5">
<span className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: "#ECEBFB", color: BRAND.primary }}>
<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
</span>
<span className="leading-tight" style={{ color: BRAND.inkSoft }}>Privacy-first<br/>& secure</span>
</div>
</div>
          </div>
          <div className="relative">
              <div className="pointer-events-none absolute -inset-6 -z-10 rounded-[2rem] blur-2xl" style={{ background: "radial-gradient(60% 60% at 50% 40%, rgba(99,102,241,0.18), transparent 75%)" }} />
            
            <ResumeMockup />
          </div>
        </div>
      </section>

      <section className="border-y" style={{ borderColor: BRAND.line, background: BRAND.surfaceAlt }}>
        <div className="mx-auto max-w-7xl px-6 pt-8 pb-3 lg:px-10">
          <p className="mx-auto max-w-2xl text-center text-lg leading-relaxed" style={{ color: BRAND.ink }}>Built by someone who's written CVs on both sides of the line, inside international organizations and out in the private sector.</p>
          <p className="mx-auto mt-4 max-w-2xl text-center text-base leading-relaxed" style={{ color: BRAND.inkSoft }}>We know both languages because we've had to speak both.</p>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-6 pt-5 pb-12 lg:px-10 lg:pt-6 lg:pb-20">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>What we promise</Eyebrow>
          <h2 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-4xl">What you can count on, both directions</h2>
        </div>
        <div className="mt-14 grid grid-cols-1 divide-y divide-[#ECEDF3] overflow-hidden rounded-2xl border bg-white sm:grid-cols-3 sm:divide-x sm:divide-y-0" style={{ borderColor: BRAND.line }}>
{[
{ n: 'Both ways', l: 'we translate into and out of the institutional sector' },
{ n: '0 invented', l: 'every line stays true to what you actually did; we reframe, never fabricate' },
{ n: 'Minutes', l: 'not weeks of guessing the right register' },
].map((s) => (
<div key={s.l} className="px-8 py-5 text-center">
<div className="text-5xl font-extrabold tracking-tight" style={{ color: BRAND.secondary }}>{s.n}</div>
<p className="mx-auto mt-3 max-w-[15rem] text-sm leading-relaxed" style={{ color: BRAND.inkSoft }}>{s.l}</p>
</div>
))}
</div>
      </section>

      <section id="features" className="relative mx-auto max-w-7xl px-6 pt-6 pb-20 lg:px-10 lg:pt-10 lg:pb-28">
        <DotPattern className="pointer-events-none absolute right-6 top-10 opacity-50" />
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Where applications go to die</Eyebrow>
          <h2 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-4xl">Same experience. <span style={{ color: BRAND.primary }}>Read completely differently.</span></h2>
          <p className="mt-4 text-lg leading-relaxed" style={{ color: BRAND.inkSoft }}>What gets you hired in one world gets you filtered out in the other. The problem is rarely your experience, it's the register it's written in.</p>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {[
            {
              t: 'From institutional to plain',
              href: '/resume',
              d: '"Technical assistance within the mandate" means nothing to a corporate recruiter. We turn process-language into the results and impact a hiring manager recognizes.',
              icon: (<path d="M6 3h8l4 4v14H6z M14 3v4h4 M9 12h6 M9 16h6" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" fill="none" />),
            },
            {
              t: 'From corporate to institutional',
              href: '/cover-letters/write',
              d: 'The UN, NGOs and governments expect a register you were never taught, competency frameworks, results-based language, the P-11. We help you speak it.',
              icon: (<path d="M4 6h16v12H4z M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" fill="none" />),
            },
            {
              t: 'Truthful, both directions',
              href: '/linkedin',
              d: 'We never invent achievements. We say what you have already done in the language the other side actually understands.',
              icon: (<path d="M5 4a1.5 1.5 0 100 3 1.5 1.5 0 000-3z M4 9h2v11H4z M9 9h2v1.5 M11 10.5c.6-1 4-1.5 4 2V20h-2v-6c0-1.5-2-1.5-2 0V20H9z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" fill="none" />),
            },
          ].map((c, i) => (
            <div key={i} className="group relative rounded-2xl border bg-white p-8 shadow-[0_10px_30px_-20px_rgba(31,36,51,0.25)] transition-all hover:-translate-y-1 hover:shadow-[0_20px_40px_-22px_rgba(31,36,51,0.3)]" style={{ borderColor: BRAND.line }}>
              <span className="flex h-12 w-12 items-center justify-center rounded-xl" style={{ background: 'rgba(79,70,229,0.08)', color: BRAND.primary }}>
                <svg width="24" height="24" viewBox="0 0 24 24">{c.icon}</svg>
              </span>
              <h3 className="mt-5 text-lg font-bold">{c.t}</h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: BRAND.inkSoft }}>{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden" style={{ background: BRAND.surface }}>
        <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 py-20 lg:grid-cols-2 lg:px-10 lg:py-28">
          <div>
            <Eyebrow>Find your match</Eyebrow>
            <h2 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-4xl">Where does your experience fit in the corporate world?</h2>
            <p className="mt-5 max-w-md text-lg leading-relaxed" style={{ color: BRAND.inkSoft }}>
              Paste your CV. We show you exactly which lines read as jargon to the other side, and translate each one into the transferable impact a hiring manager rewards. For any line missing a result, we'll ask you for the number.
            </p>
            <ul className="mt-7 space-y-3.5">
              {['Matched to the corporate function that actually fits you', 'Every line translated to impact, never invented', 'The right keywords appear naturally, never stuffed'].map((f) => (
                <li key={f} className="flex items-start gap-3 text-[15px]" style={{ color: BRAND.ink }}>
                  <span className="mt-0.5 flex h-5 w-5 flex-none items-center justify-center rounded-full text-[11px] font-bold text-white" style={{ background: BRAND.primary }}>✓</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <BackgroundMatcher />
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>No more guessing</Eyebrow>
          <h2 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-4xl">Stop rewriting your resume in the dark</h2>
          <p className="mt-4 text-lg leading-relaxed" style={{ color: BRAND.inkSoft }}>Three steps to a resume you actually trust hitting submit on.</p>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {[
            { s: '01', t: 'Tell us your direction', d: 'Leaving the institutional world for the private sector, or trying to break in. Each direction speaks a different language, we pick the right one from the start.' },
            { s: '02', t: 'Paste your CV and your target', d: 'Your current CV plus the specific role or organization you are aiming at. The more concrete the target, the sharper the translation.' },
            { s: '03', t: 'Get your translated CV, and learn why', d: 'Your CV rewritten in the right register, with a plain "what we changed and why" for every line. You walk away understanding the language, not just holding a file.' },
          ].map((step) => (
            <div key={step.s} className="relative rounded-2xl border bg-white p-8 shadow-[0_10px_30px_-20px_rgba(31,36,51,0.25)]" style={{ borderColor: BRAND.line }}>
              <span className="text-sm font-extrabold" style={{ color: BRAND.primary }}>{step.s}</span>
              <h3 className="mt-3 text-lg font-bold">{step.t}</h3>
              <p className="mt-2 text-sm leading-relaxed" style={{ color: BRAND.inkSoft }}>{step.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative overflow-hidden" style={{ background: BRAND.surface }}>
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>Real callbacks</Eyebrow>
            <h2 className="mt-5 text-3xl font-extrabold tracking-tight sm:text-4xl">People who stopped getting ghosted</h2>
          </div>
          <div className="mt-14 columns-1 gap-6 sm:columns-2 lg:columns-3 [&>*]:mb-6">
            {[
              { q: "Nine years at a UN agency, and every corporate recruiter glazed over my CV. This turned ‘technical assistance within the mandate’ into something a hiring manager understood. Three interviews in a month.", n: "Former UN officer, now in consulting", r: "", img: "/testimonial-1.jpg" },
              { q: "I was a private-sector PM with no idea how NGO applications worked. It showed me the competency-framework language and the P-11 logic I was completely missing.", n: "Moved into an international NGO", r: "", img: "/testimonial-2.jpg" },
              { q: "It didn't invent anything. It said what I'd already done, in language the other side understands. That's why I trusted it.", n: "Career switcher into development", r: "", img: "/testimonial-4.jpg" },
              { q: "My CV was written for a company, not for a mandate-driven organization. I couldn't see the gap until it was pointed out line by line.", n: "Joined a UN programme", r: "", img: "/testimonial-3.jpg" },
              { q: "I came out of the humanitarian world thinking my experience didn't ‘count’ in the private sector. Turns out it did, it was just in the wrong words.", img: "/testimonial-6.jpg", n: "Ex-NGO, now in corporate strategy", r: "" },
              { q: "The ‘what changed and why’ is the part that matters. I finally understood the register instead of just pasting someone else's CV.", n: "First government role", r: "", img: "/testimonial-5.jpg" },
            ].map((t, i) => (
              <figure key={i} className="break-inside-avoid rounded-2xl border bg-white p-6 shadow-[0_10px_30px_-22px_rgba(31,36,51,0.3)]" style={{ borderColor: BRAND.line }}>
                <div className="flex gap-0.5" style={{ color: BRAND.secondary }}>★★★★★</div>
                <blockquote className="mt-3 text-[15px] leading-relaxed" style={{ color: BRAND.ink }}>“{t.q}”</blockquote>
                <figcaption className="mt-4 flex items-center gap-3">
                  {t.img ? <img src={t.img} alt={t.n} className="h-9 w-9 rounded-full object-cover" /> : <span className="h-9 w-9 rounded-full" style={{ background: 'linear-gradient(135deg,' + BRAND.primary + ',' + BRAND.secondary + ')' }} />}
                  <span><span className="block text-sm font-semibold">{t.n}</span><span className="block text-xs" style={{ color: BRAND.inkSoft }}>{t.r}</span></span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

        <AboutFounder />

      <section className="relative mx-auto max-w-7xl px-6 py-20 lg:px-10 lg:py-24">
        <div className="relative overflow-hidden rounded-3xl px-8 py-16 text-center sm:px-16" style={{ background: 'linear-gradient(135deg,' + BRAND.primary + ',' + BRAND.primaryDark + ')' }}>
          <DotPattern className="pointer-events-none absolute left-6 top-6 opacity-20" color="#FFFFFF" />
          <DotPattern className="pointer-events-none absolute bottom-6 right-6 opacity-20" color="#FFFFFF" />
          <h2 className="mx-auto max-w-2xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Your experience already qualifies you. Does your CV say so in the right language?</h2>
          <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-white/80">See exactly which lines read wrong for where you're going, and how we'd translate them.</p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link href="/optimize" className="inline-flex items-center justify-center rounded-full bg-white px-7 py-3.5 text-base font-semibold shadow-sm transition-transform hover:-translate-y-0.5" style={{ color: BRAND.primary }}>Translate my CV</Link>
            <Link href="#" className="inline-flex items-center justify-center rounded-full border border-white/40 px-7 py-3.5 text-base font-semibold text-white transition-colors hover:bg-white/10">See a sample before & after</Link>
          </div>
        </div>
      </section>

      <footer className="border-t" style={{ borderColor: BRAND.line }}>
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
          <div className="grid gap-10 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl overflow-hidden shadow-sm"><svg viewBox="0 0 36 36" width="36" height="36" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="cvg" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse"><stop stop-color="#4F46E5"/><stop offset="0.55" stop-color="#2563EB"/><stop offset="1" stop-color="#1AB5C9"/></linearGradient></defs><rect width="36" height="36" rx="9" fill="url(#cvg)"/><path d="M9 9.5a1.5 1.5 0 0 1 1.5-1.5h9.7l5.3 5.3v13.2a1.5 1.5 0 0 1-1.5 1.5H10.5A1.5 1.5 0 0 1 9 26.5z" fill="#ffffff"/><path d="M20.2 8v3.8a1.5 1.5 0 0 0 1.5 1.5h3.8z" fill="#3B6FD4"/><circle cx="14.8" cy="14.6" r="2.3" fill="#3B6FD4"/><path d="M11.2 19.6c0-2 1.6-3.2 3.6-3.2s3.6 1.2 3.6 3.2z" fill="#3B6FD4"/><rect x="11.2" y="20.8" width="9.4" height="1.5" rx="0.75" fill="#3B6FD4"/><rect x="11.2" y="23.2" width="8" height="1.5" rx="0.75" fill="#3B6FD4"/><rect x="11.2" y="25.6" width="6" height="1.5" rx="0.75" fill="#3B6FD4"/><circle cx="24.5" cy="25.5" r="5.2" fill="#ffffff"/><path d="M24.8 21.6l0.7 2.1 2.1 0.7-2.1 0.7-0.7 2.1-0.7-2.1-2.1-0.7 2.1-0.7z" fill="#3B6FD4"/><path d="M22.3 26.2l0.4 1.2 1.2 0.4-1.2 0.4-0.4 1.2-0.4-1.2-1.2-0.4 1.2-0.4z" fill="#3B6FD4"/></svg></span>
                <span className="text-base font-extrabold tracking-tight">{BRAND.name}</span>
              </div>
              <p className="mt-4 max-w-xs text-sm leading-relaxed" style={{ color: BRAND.inkSoft }}>Same career. Different language. We translate your experience between the institutional and corporate worlds, so the people reading it understand what you've actually done.</p>
            </div>
            {[
            { h: 'Product', items: [{ t: 'Translate', h: '/optimize' }, { t: 'Dashboard', h: '/dashboard' }, { t: 'Pricing', h: '/pricing' }] },
            { h: 'Resources', items: [{ t: 'How it works', h: '/how-it-works' }, { t: 'Career Guide', h: '/career-guide' }, { t: 'Interview tips', h: '/interview-tips.html' }, { t: 'FAQs', h: '/career-guide#faq' }] },
            { h: 'Company', items: [{ t: 'About the Founder', h: '/#about-founder' }] },
          ].map((col) => (
              <div key={col.h}>
                <h4 className="text-sm font-bold">{col.h}</h4>
                <ul className="mt-4 space-y-2.5">
                  {col.items.map((it) => (
                    <li key={it.t}><a href={it.h} className="text-sm transition-colors hover:opacity-70" style={{ color: BRAND.inkSoft }}>{it.t}</a></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t pt-6 sm:flex-row" style={{ borderColor: BRAND.line }}>
            <p className="text-xs" style={{ color: BRAND.inkSoft }}>(c) {new Date().getFullYear()} {BRAND.name}. All rights reserved.</p>
            <p className="text-xs" style={{ color: BRAND.inkSoft }}>Built for careers that move between worlds.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}


