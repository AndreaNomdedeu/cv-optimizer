'use client';

import React from 'react';
import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';

const BRAND = { primary: '#4F46E5', primaryDark: '#4338CA', secondary: '#0EA5A4', ink: '#1F2433', inkSoft: '#5B6478', surface: '#F7F8FC', surfaceAlt: '#FBFAFF', line: '#ECEDF3' };

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (<span className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-extrabold uppercase tracking-[0.12em]" style={{ background: '#eef0fe', color: '#5B4FE8' }}><span className="h-1.5 w-1.5 rounded-full" style={{ background: '#5B4FE8' }} />{children}</span>);
}

function PrimaryButton({ children, className = '', href = '#' }: { children: React.ReactNode; className?: string; href?: string }) {
  return (<Link href={href} className={'inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md ' + className} style={{ background: BRAND.primary }}>{children}</Link>);
}

const STEPS = [
  {
    n: '01', t: 'Tell us your direction and paste your inputs',
    body: ["Choose your direction: moving from the institutional world (UN, NGOs, government) into the private sector, or into it from outside. Then paste your current CV and the specific job you're targeting. The job posting is what lets us translate toward a real destination , the more concrete the target, the sharper the result."],
  },
  {
    n: '02', t: 'Get your CV translated, line by line',
    body: ["We rewrite each line from the language of one world into the language of the other , turning process into impact, jargon into competencies a hiring manager recognizes. You see every change and the reason behind it, so you learn the register instead of just copying a file. Because the translation uses the exact vocabulary the role expects, your CV reads naturally to recruiters and clears the ATS as a consequence , not by keyword-stuffing.", "If a line lacks the detail to land, we flag it: “This line needs a number , how many people, what budget, what changed?” If the job asks for something your CV doesn't show, we tell you plainly: if you have it and left it out, omitting it is costing you; if you don't, it's a real gap to know about. We never add anything you didn't do. We translate what's true."],
  },
  {
    n: '03', t: 'Add a matching cover letter',
    body: ["With your CV translated and the job already loaded, generate a cover letter in the same register in one click , speaking the language of the role, powered by the CV you just built."],
  },
];

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen w-full bg-white antialiased" style={{ color: BRAND.ink, fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, -apple-system, sans-serif" }}>
      <SiteHeader />
      <section className="relative mx-auto max-w-3xl px-6 pt-16 pb-10 text-center lg:pt-24"><div aria-hidden style={{position:'absolute',top:'-120px',left:'50%',transform:'translateX(-50%)',width:'1100px',height:'360px',background:'radial-gradient(closest-side, rgba(255,214,196,0.55), transparent 70%)',zIndex:0,pointerEvents:'none'}} />
        <div className="relative z-10 flex justify-center"><Eyebrow>How it works</Eyebrow></div>
        <h1 className="relative z-10 mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl">Your CV, translated for <span style={{ color: '#5B4FE8' }}>where you're going.</span></h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed" style={{ color: BRAND.inkSoft }}>Upload what you have. Tell us where you're aiming. Get back a CV the other side actually understands , line by line, with the reasoning shown.</p>
      </section>
      <section className="relative mx-auto max-w-4xl px-6 py-10 lg:py-16">
        <h2 className="text-center text-2xl font-bold tracking-tight sm:text-3xl">How it works , three simple steps</h2>
        <div className="mt-12 space-y-6">
          {STEPS.map((step) => (
            <div key={step.n} className="relative rounded-2xl border bg-white p-7 shadow-[0_10px_30px_-20px_rgba(31,36,51,0.25)] sm:p-9" style={{ borderColor: BRAND.line }}>
              <div className="flex items-baseline gap-4">
                <span className="text-2xl font-extrabold tabular-nums" style={{ color: BRAND.primary }}>{step.n}</span>
                <h3 className="text-lg font-bold sm:text-xl">{step.t}</h3>
              </div>
              <div className="mt-4 space-y-4 sm:pl-12">
                {step.body.map((para, i) => (<p key={i} className="text-[15px] leading-relaxed" style={{ color: BRAND.inkSoft }}>{para}</p>))}
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-3xl px-6 pb-20 text-center">
        <div className="flex justify-center"><PrimaryButton href="/optimize" className="!px-8 !py-3.5 text-base">Translate my CV</PrimaryButton></div>
        <p className="mx-auto mt-8 max-w-2xl text-[15px] leading-relaxed" style={{ color: BRAND.inkSoft }}>We don't invent achievements or inflate your experience. We translate what you've already done into the language the people reading it actually understand.</p>
      </section>
    </div>
  );
}

