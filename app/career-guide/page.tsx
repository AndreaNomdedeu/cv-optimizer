'use client';

import React from 'react';
import Link from 'next/link';
import SiteHeader from '@/components/SiteHeader';

const BRAND = {
  primary: '#4F46E5',
  primaryDark: '#4338CA',
  secondary: '#0EA5A4',
  ink: '#1F2433',
  inkSoft: '#5B6478',
  surface: '#F7F8FC',
  surfaceAlt: '#FBFAFF',
  line: '#ECEDF3',
};

const steps = [
  {
    n: `01`,
    title: `Step 1 — Strip the sector jargon`,
    paras: [
      `Start by spotting the words that only make sense inside your world. Terms like protection monitoring, referrals, mandate, programme implementation, capacity-building, duty-bearers, beneficiaries carry precise meaning in the humanitarian and human rights sector, and almost none to a corporate recruiter who has never worked in it. They're not impressive on the other side; they're invisible.`,
      `Replace them with the business-world equivalent that describes the same function: risk assessment, stakeholder management, process improvement, service delivery, training and onboarding, programme delivery.`,
      `One important rule: translate the language, never the truth. Some words carry ethical weight you shouldn't erase. “Beneficiaries,” for instance, often means people in situations of real vulnerability, not paying customers. Use the corporate term when it describes the function, but don't sanitize away the nature of the work when that nature is the skill. Working with vulnerable populations in high-stakes environments is itself a rare and valuable competency. Keep it.`,
    ],
  },
  {
    n: `02`,
    title: `Step 2 — Name the business skill`,
    paras: [
      `For each line, ask one question: what would a consultant, an operations lead, or a hiring manager actually hear in this? Underneath the sector vocabulary, there's almost always a transferable competency they recognize instantly:`,
    ],
    bullets: [
      `Multi-stakeholder coordination`,
      `Operating in volatile or high-risk environments`,
      `Crisis management and rapid response`,
      `Compliance and governance`,
      `Data-driven decision-making`,
      `Process design and implementation`,
      `Team leadership across cultures and remote management`,
    ],
    after: `Lead with that skill. It's the bridge between what you did and what they're hiring for.`,
  },
  {
    n: `03`,
    title: `Step 3 — Quantify scope, complexity, and outcome`,
    paras: [
      `Institutional CVs describe responsibilities. Corporate CVs reward results. Close the gap with numbers and outcomes.`,
      `Add scope: people managed, budget size, locations covered, timeframes, volume of cases, percentage change. Then add the outcome in business-adjacent terms: reduced incidents, improved access, increased efficiency, cut processing time, raised quality.`,
      `Keep the ethical context, don't pretend these were commercial clients when they were survivors or communities in crisis, but lead with the operational impact. The truth and the impact can coexist in the same sentence.`,
    ],
  },
];

const faqs = [
  {
    q: `Will companies value my UN or NGO experience?`,
    a: [
      {
        t: 'p',
        x: `Yes, far more than most people leaving the sector believe. Running humanitarian and human rights programmes, coordinating complex strategies across governments and agencies, managing large budgets, leading teams under pressure, working directly with victims and survivors, negotiating in high-stakes situations, and protecting the reputation of the institution you represent: these are exactly the capabilities companies pay for. The problem is almost never your experience. It's that it's written in a language corporate recruiters don't read.`,
      },
      {
        t: 'p',
        x: `A recruiter who has never worked in the sector doesn't know what “technical assistance” means, or how much skill sits behind “stakeholder coordination.” Many are uncomfortable even reading about human rights violations, and most people outside the field simply don't grasp what the work actually involves. They're not dismissing your experience, they're failing to recognize it, because it's described in institutional terms instead of business ones. Translate the same work into the language they use every day, start speaking in results and numbers, and suddenly nine years that looked invisible become an obvious hire.`,
      },
    ],
  },
  {
    q: `How do I translate humanitarian, human rights, development or institutional experience into corporate language?`,
    a: [
      {
        t: 'p',
        x: `You don't change what you did. You change the language that describes it, from process to impact.`,
      },
      {
        t: 'p',
        x: `Institutional CVs often emphasize mandates, responsibilities and programme implementation, while corporate recruiters typically look first for measurable business impact and outcomes. The translation is moving from one to the other.`,
      },
      { t: 'label', x: `For example:` },
      {
        t: 'q',
        x: `Coordinated protection monitoring activities and referrals for survivors of gender-based violence and other vulnerable individuals across three field locations.`,
      },
      {
        t: 'p',
        x: `A recruiter reads that and sees a task, not a person who delivers. Translated:`,
      },
      {
        t: 'q',
        x: `Managed sensitive case handling across 3 sites under strict confidentiality and safeguarding protocols, coordinating 35 institutional partners, built the tracking system that ensured compliance and accountability across all locations.`,
      },
      {
        t: 'p',
        x: `Same work. But now it names transferable competencies a hiring manager in risk, compliance or operations recognizes instantly, handling sensitive information under protocol, and building systems for accountability across multiple sites. The rule: if a phrase only makes sense to someone inside your sector, it hasn't been translated yet. Strip the jargon, surface the result, and keep every word true.`,
      },
    ],
  },
  {
    q: `Why am I not getting interviews despite years at the UN?`,
    a: [
      {
        t: 'p',
        x: `One of the most common reasons is that your CV lists responsibilities instead of demonstrating impact.`,
      },
      {
        t: 'p',
        x: `Institutional CVs tend to focus on mandates, programme implementation and areas of responsibility. Corporate recruiters are looking for the opposite: evidence of ownership, measurable outcomes, and business-relevant competencies. They want to know not just what your role involved, but what changed because you were there.`,
      },
      {
        t: 'p',
        x: `There's a filtering layer before that, too. Many employers use Applicant Tracking Systems (ATS) to organize and rank applications before a recruiter sees them. If your CV is written entirely in institutional language, it may not match the terminology in the job description, making it harder for both the software and the recruiter to see how closely your experience actually fits. The fix isn't to stuff your CV with keywords. It's to translate your experience into the language the target sector naturally uses: do that, and the right terminology appears organically, your achievements become legible, and both the ATS and the human are far more likely to recognize the value you already bring.`,
      },
      {
        t: 'p',
        x: `In most cases, the problem isn't your experience. It's that your experience hasn't been translated for the audience reading it.`,
      },
    ],
  },
  {
    q: `How is a UN CV different from a corporate CV?`,
    a: [
      {
        t: 'p',
        x: `They're written for different audiences, and confusing the two is one of the main reasons strong candidates struggle when moving between sectors.`,
      },
      {
        t: 'p',
        x: `A corporate CV is designed to demonstrate measurable impact. Recruiters want to understand the scope of your responsibilities, the results you achieved, the problems you solved and the value you created. It's usually concise, one or two pages, and focuses on relevance to the specific role.`,
      },
      {
        t: 'p',
        x: `A UN or international organization application has a different objective. It must demonstrate that you meet the competencies required for the position through concrete examples of your work. Recruiters look not only at what you achieved, but also at how you achieved it: collaborating across cultures, managing partnerships, working in complex environments, exercising integrity and delivering results within institutional mandates. Applications are often more detailed and may require a Personal History Profile (PHP/P-11), competency-based questions and additional supporting information.`,
      },
      {
        t: 'p',
        x: `Neither format is better, they simply answer different questions. A corporate recruiter asks, “Can this person deliver results in this role?” A UN recruiter asks, “Has this person demonstrated the competencies and behaviours required for this position?” Understanding which question you're answering is often the difference between being shortlisted and being overlooked.`,
      },
    ],
  },
  {
    q: `Do ATS keywords actually matter?`,
    a: [
      { t: 'p', x: `Yes, but not exactly how you've been told.` },
      {
        t: 'p',
        x: `Many employers use Applicant Tracking Systems (ATS) to organize, search, and rank applications before a recruiter reviews them. That means the language in your CV matters: if your experience is described using terminology that doesn't match the role, both the software and the person reviewing your application will have a harder time seeing how well you fit. But the solution isn't to stuff your CV with keywords or copy phrases from the job description. That creates a CV written for software instead of people, and people still make the hiring decision.`,
      },
      {
        t: 'p',
        x: `A better approach is to translate your experience into the language your target sector genuinely uses. For example:`,
      },
      { t: 'label', x: `Institutional CV:` },
      {
        t: 'q',
        x: `Supported capacity-building of duty-bearers on international human rights standards.`,
      },
      { t: 'label', x: `Corporate CV:` },
      {
        t: 'q',
        x: `Designed and delivered training programmes for public-sector professionals on international human rights compliance and best practices.`,
      },
      {
        t: 'p',
        x: `Same experience. Different language. The second version doesn't invent new responsibilities or exaggerate the work; it simply describes the same experience using terminology recruiters in Learning & Development, Compliance, Consulting, or Public Sector Advisory immediately recognize. That way, relevant keywords appear naturally because they accurately reflect what you actually did.`,
      },
      {
        t: 'p',
        x: `The goal isn't to beat the ATS. It's to make your experience immediately recognizable to both the software and the person reading your CV.`,
      },
    ],
  },
  {
    q: `What corporate roles match a humanitarian or human rights background?`,
    a: [
      {
        t: 'p',
        x: `More than most people from the sector expect, and rarely in sales, which is the fear that holds many back. The corporate functions that map most naturally to humanitarian, UN, international organization, or NGO experience are those built on skills you already use every day: managing complexity, coordinating multiple stakeholders, delivering under constraint, and navigating risk and governance.`,
      },
      { t: 'label', x: `Common landing spots` },
      {
        t: 'il',
        k: `Project and programme management:`,
        x: `your planning, budgeting, M&E, and delivery experience transfers to corporate programmes, change initiatives, or client projects.`,
      },
      {
        t: 'il',
        k: `Compliance and risk management:`,
        x: `governance, policy interpretation, donor rules, and accountability systems translate directly to regulatory compliance, internal controls, and enterprise risk roles.`,
      },
      {
        t: 'il',
        k: `ESG and sustainability:`,
        x: `designing socially responsible programmes, stakeholder engagement, and impact measurement fit ESG reporting, strategy, and implementation roles.`,
      },
      {
        t: 'il',
        k: `Public policy, government relations, and corporate affairs:`,
        x: `policy analysis, advocacy, and liaison with governments map to roles shaping corporate public policy, regulatory strategy, and stakeholder engagement.`,
      },
      {
        t: 'il',
        k: `Operations and programme delivery:`,
        x: `field coordination, logistics, procurement, and operations management move into supply chain, operational excellence, or delivery functions.`,
      },
      {
        t: 'il',
        k: `Partnerships and business development:`,
        x: `partnership-building with NGOs, donors, and governments transfers to alliance management, strategic partnerships, and B2B roles.`,
      },
      {
        t: 'il',
        k: `Strategy and management consulting:`,
        x: `analytical problem-solving, programme design, and multi-stakeholder advising are a strong fit for consulting teams serving public-sector, development, or social-impact clients.`,
      },
      {
        t: 'p',
        x: `The move isn't reinventing yourself. It's recognizing which corporate function your existing experience already qualifies you for, and describing it in that function's language.`,
      },
    ],
  },
  {
    q: `Which corporate role fits my specific UN, international organization, or NGO background?`,
    a: [
      {
        t: 'p',
        x: `The right corporate function depends on what you actually did day to day. The same sector contains very different profiles, and each points somewhere distinct:`,
      },
      {
        t: 'q',
        x: `Governance-heavy background → Compliance, Risk, Internal Audit.`,
      },
      {
        t: 'q',
        x: `Field coordination and operations → Operations, Supply Chain, Programme Delivery.`,
      },
      {
        t: 'q',
        x: `Policy and advocacy → Public Affairs, Government Relations, Policy & Regulatory roles.`,
      },
      {
        t: 'q',
        x: `Monitoring, evaluation and learning (MEL) → Impact Measurement, Data & Insights, Performance Management.`,
      },
      {
        t: 'q',
        x: `Partnerships and fundraising → Strategic Partnerships, Alliance Management, Corporate Development.`,
      },
      {
        t: 'p',
        x: `The point isn't that you can only go one way, most people in the sector have touched several of these. Your strongest thread usually points most clearly to one function; leading with it makes your CV legible instead of generic. Identify the slice of your experience that's deepest, and aim there first.`,
      },
    ],
  },
  {
    q: `How do I position myself for a corporate role coming from the UN, international organization, or NGO sector?`,
    a: [
      {
        t: 'p',
        x: `Once you know which function you're targeting, positioning is what gets you read. The work is the same; the framing is what changes.`,
      },
      { t: 'label', x: `Translate functions, not job titles.` },
      {
        t: 'p',
        x: `Describe your duties in corporate terms, “designed and delivered training,” “managed programme budgets,” “developed compliance frameworks”, rather than relying on institutional titles that mean little outside the sector.`,
      },
      { t: 'label', x: `Lead with outcomes and scope.` },
      {
        t: 'p',
        x: `Show size (budget, team, countries), impact (KPIs improved, cost or time saved), and the level you operated at (ministerial, donor, private sector).`,
      },
      { t: 'label', x: `Highlight transferable systems and tools.` },
      {
        t: 'p',
        x: `Project management methods, M&E and governance frameworks, risk registers, partnership-management platforms, name the ones you genuinely used. They signal you already speak the function's language.`,
      },
      { t: 'label', x: `Tailor your CV to the function.` },
      {
        t: 'p',
        x: `Emphasize the version of each role that matches what that function values: compliance language for risk roles, delivery language for operations.`,
      },
      { t: 'label', x: `Use the sector's real vocabulary, accurately.` },
      {
        t: 'p',
        x: `Don't bolt on keywords. Describe what you actually did in the terms that function uses, “programme management,” “compliance,” “ESG,” “stakeholder engagement,” “MEL”, wherever they genuinely apply. The right words then appear because they're true, not because you forced them.`,
      },
      {
        t: 'p',
        x: `The goal is the same as everywhere: make the fit immediately obvious to both the ATS and the hiring manager, not by reinventing your career, but by describing it in the language of the role you want.`,
      },
    ],
  },
];

function FounderNote() {
  const [open, setOpen] = React.useState(false);
  return (
    <div
      className="mt-8 rounded-2xl border bg-white"
      style={{
        borderColor: BRAND.line,
        boxShadow: open ? '0 8px 30px rgba(31,36,51,0.06)' : 'none',
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span
          className="text-base sm:text-lg font-semibold"
          style={{ color: BRAND.ink }}
        >
          Why I built this
        </span>
        <span className="text-xl" style={{ color: BRAND.primary }}>
          {open ? '–' : '+'}
        </span>
      </button>
      {open && (
        <div
          className="px-6 pb-6 -mt-1 space-y-4 text-base leading-relaxed"
          style={{ color: BRAND.inkSoft }}
        >
          <p>
            I spent years inside the institutional world, UN agencies, NGOs and
            government programs, doing work that genuinely mattered.
          </p>
          <p>
            When I tried to move into the corporate sector, recruiters could not
            read my CV. The same experience that made me valuable on one side
            became invisible jargon on the other.
          </p>
          <p>
            I built CV Optimizer so that no one has to lose years of real impact
            in translation, in either direction. Same career, different
            language.
          </p>
          <p className="font-semibold" style={{ color: BRAND.ink }}>
            The founder
          </p>
        </div>
      )}
    </div>
  );
}

function FAQItem({ item }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div
      className="overflow-hidden rounded-2xl border bg-white transition-shadow"
      style={{
        borderColor: BRAND.line,
        boxShadow: open ? '0 8px 30px rgba(31,36,51,0.06)' : 'none',
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span
          className="text-base sm:text-lg font-semibold"
          style={{ color: BRAND.ink }}
        >
          {item.q}
        </span>
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xl font-light leading-none"
          style={{
            background: open ? BRAND.primary : 'rgba(79,70,229,0.08)',
            color: open ? '#fff' : BRAND.primary,
          }}
        >
          {open ? '−' : '+'}
        </span>
      </button>
      {open && (
        <div className="space-y-4 px-6 pb-6">
          {item.a.map((b, i) => {
            if (b.t === 'q')
              return (
                <div
                  key={i}
                  className="rounded-xl border-l-4 px-5 py-4 leading-relaxed"
                  style={{
                    borderColor: BRAND.secondary,
                    background: 'rgba(14,165,164,0.06)',
                    color: BRAND.ink,
                  }}
                >
                  {b.x}
                </div>
              );
            if (b.t === 'label')
              return (
                <p
                  key={i}
                  className="text-sm font-semibold"
                  style={{ color: BRAND.inkSoft }}
                >
                  {b.x}
                </p>
              );
            if (b.t === 'il')
              return (
                <p
                  key={i}
                  className="leading-relaxed"
                  style={{ color: BRAND.inkSoft }}
                >
                  <strong style={{ color: BRAND.ink }}>{b.k}</strong> {b.x}
                </p>
              );
            return (
              <p
                key={i}
                className="leading-relaxed"
                style={{ color: BRAND.inkSoft }}
              >
                {b.x}
              </p>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function CareerGuidePage() {
  return (
    <div
      className="min-h-screen w-full bg-white antialiased"
      style={{
        color: BRAND.ink,
        fontFamily: `"Plus Jakarta Sans", ui-sans-serif, system-ui, -apple-system, sans-serif`,
      }}
    >
      <SiteHeader />

      {/* Hero */}
      <section
        className="relative overflow-hidden px-6"
        style={{
          background:
            `linear-gradient(160deg, ` +
            BRAND.surfaceAlt +
            ` 0%, ` +
            BRAND.surface +
            ` 55%, #EEF0FB 100%)`,
        }}
      >
        <div
          aria-hidden
          style={{
            position: 'absolute',
            top: '-120px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '1100px',
            height: '360px',
            background:
              'radial-gradient(closest-side, rgba(255,214,196,0.55), transparent 70%)',
            zIndex: 0,
            pointerEvents: 'none',
          }}
        />
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full opacity-20 blur-3xl"
          style={{
            background:
              `radial-gradient(circle, ` + BRAND.primary + `, transparent 70%)`,
          }}
        />
        <div
          className="pointer-events-none absolute -left-20 bottom-0 h-72 w-72 rounded-full opacity-20 blur-3xl"
          style={{
            background:
              `radial-gradient(circle, ` +
              BRAND.secondary +
              `, transparent 70%)`,
          }}
        />
        <div className="relative mx-auto max-w-3xl py-20 sm:py-28 text-center">
          <span
            className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-extrabold uppercase tracking-[0.12em]"
            style={{ background: '#eef0fe', color: '#5B4FE8' }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: '#5B4FE8' }}
            />
            Career Guide
          </span>
          <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold leading-[1.1] tracking-tight">
            Moving{' '}
            <span style={{ color: '#5B4FE8' }}>
              between the institutional and corporate worlds
            </span>
            , and how to be understood on the other side.
          </h1>
          <p
            className="mt-8 text-lg sm:text-xl leading-relaxed"
            style={{ color: BRAND.inkSoft }}
          >
            Most people don't get screened out because they lack experience.
            They get screened out because their experience is written in the
            wrong language for where they're going. This guide is the playbook
            for crossing between worlds: leaving the UN, an NGO or government
            for the private sector, or breaking into the institutional world
            from outside.
          </p>
          <p
            className="mt-5 text-lg leading-relaxed"
            style={{ color: BRAND.inkSoft }}
          >
            Written by someone who's made the crossing and helped others do the
            same, not generic CV advice, but the specific codes each side
            actually reads.
          </p>
          <FounderNote />
        </div>
      </section>

      {/* Method */}
      <section className="px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <div
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em]"
            style={{ color: BRAND.secondary }}
          >
            <span>★</span>
            <span>The Method</span>
          </div>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight">
            The 3-step formula to translate any line of your CV
          </h2>
          <p
            className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed"
            style={{ color: BRAND.inkSoft }}
          >
            Strip the jargon. Name the transferable skill. Quantify the impact.
            It's the same method the tool is built around, here it is in full,
            so you can do it by hand on any bullet point.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-3xl space-y-6">
          {steps.map((s) => (
            <div
              key={s.n}
              className="group relative overflow-hidden rounded-3xl border bg-white p-7 shadow-sm transition-shadow hover:shadow-lg sm:p-9"
              style={{ borderColor: BRAND.line }}
            >
              <span
                className="absolute left-0 top-0 h-full w-1.5"
                style={{
                  background:
                    `linear-gradient(to bottom, ` +
                    BRAND.primary +
                    `, ` +
                    BRAND.secondary +
                    `)`,
                }}
              />
              <div className="flex items-start gap-5">
                <span
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-lg font-extrabold text-white shadow-sm"
                  style={{
                    background:
                      `linear-gradient(135deg, ` +
                      BRAND.primary +
                      `, ` +
                      BRAND.secondary +
                      `)`,
                  }}
                >
                  {s.n}
                </span>
                <div className="min-w-0">
                  <h3 className="text-xl font-extrabold tracking-tight">
                    {s.title}
                  </h3>
                  {s.paras.map((p, i) => (
                    <p
                      key={i}
                      className="mt-4 leading-relaxed"
                      style={{ color: BRAND.inkSoft }}
                    >
                      {p}
                    </p>
                  ))}
                  {s.bullets && (
                    <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
                      {s.bullets.map((b, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2.5 rounded-xl border px-3.5 py-2.5 text-sm font-medium"
                          style={{
                            borderColor: BRAND.line,
                            background: BRAND.surfaceAlt,
                            color: BRAND.ink,
                          }}
                        >
                          <span
                            className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-white"
                            style={{ background: BRAND.secondary }}
                          >
                            <svg
                              width="11"
                              height="11"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path
                                d="M5 13l4 4L19 7"
                                stroke="white"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                          {b}
                        </div>
                      ))}
                    </div>
                  )}
                  {s.after && (
                    <p
                      className="mt-5 leading-relaxed"
                      style={{ color: BRAND.inkSoft }}
                    >
                      {s.after}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Worked example */}
        <div className="mx-auto mt-20 max-w-3xl">
          <div className="text-center">
            <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              The formula in one example
            </h3>
          </div>
          <div
            className="mt-8 rounded-2xl border p-6"
            style={{ borderColor: '#E3E1EC', background: BRAND.surface }}
          >
            <div
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide"
              style={{ color: '#9AA1B4' }}
            >
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: '#9AA1B4' }}
              />
              Before
            </div>
            <p
              className="mt-3 text-lg leading-relaxed line-through decoration-1"
              style={{ color: BRAND.inkSoft, textDecorationColor: '#C7CBDA' }}
            >
              Coordinated protection monitoring and referrals for beneficiaries
              in the field.
            </p>
          </div>
          <p className="mt-6 leading-relaxed" style={{ color: BRAND.inkSoft }}>
            A recruiter reads that and sees a vague task. Now run the three
            steps:
          </p>
          <div className="mt-5 space-y-3">
            <div
              className="flex items-start gap-3 rounded-xl border p-4"
              style={{ borderColor: BRAND.line, background: '#fff' }}
            >
              <span
                className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white"
                style={{ background: BRAND.primary }}
              >
                1
              </span>
              <p className="leading-relaxed" style={{ color: BRAND.ink }}>
                <strong>Strip:</strong> out go “protection monitoring,”
                “referrals,” “beneficiaries.”
              </p>
            </div>
            <div
              className="flex items-start gap-3 rounded-xl border p-4"
              style={{ borderColor: BRAND.line, background: '#fff' }}
            >
              <span
                className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white"
                style={{ background: BRAND.primary }}
              >
                2
              </span>
              <p className="leading-relaxed" style={{ color: BRAND.ink }}>
                <strong>Name the skill:</strong> this is case coordination +
                multi-stakeholder work + operating in a high-risk environment.
              </p>
            </div>
            <div
              className="flex items-start gap-3 rounded-xl border p-4"
              style={{ borderColor: BRAND.line, background: '#fff' }}
            >
              <span
                className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white"
                style={{ background: BRAND.primary }}
              >
                3
              </span>
              <p className="leading-relaxed" style={{ color: BRAND.ink }}>
                <strong>Quantify:</strong> how many people? how many locations?
                what improved?
              </p>
            </div>
          </div>
          <div
            className="mt-6 overflow-hidden rounded-2xl border"
            style={{
              borderColor: BRAND.secondary,
              background: 'rgba(14,165,164,0.06)',
            }}
          >
            <div
              className="flex items-center gap-2 px-6 pt-5 text-xs font-bold uppercase tracking-wide"
              style={{ color: BRAND.secondary }}
            >
              <span
                className="flex h-5 w-5 items-center justify-center rounded-full text-white"
                style={{ background: BRAND.secondary }}
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 13l4 4L19 7"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              After
            </div>
            <p
              className="px-6 pb-6 pt-3 text-lg font-semibold leading-relaxed"
              style={{ color: BRAND.ink }}
            >
              Managed case coordination for 400+ individuals across 6 field
              locations, working with local authorities and partner
              organizations to improve access to services in a high-risk
              operational environment.
            </p>
          </div>
          <p className="mt-6 leading-relaxed" style={{ color: BRAND.inkSoft }}>
            Same work. Every word still true. But now it reads as operational
            competence a hiring manager can place, and it keeps the dignity of
            what the work actually was.
          </p>
          <p className="mt-4 leading-relaxed" style={{ color: BRAND.inkSoft }}>
            Doing this by hand for every line of a CV is slow and easy to
            second-guess. That's exactly what the tool does for you, line by
            line, in the right direction, in minutes.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="px-6 pb-20">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <div
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em]"
              style={{ color: BRAND.secondary }}
            >
              <span>★</span>
              <span>FAQ</span>
            </div>
            <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight">
              Questions people ask before they switch
            </h2>
          </div>
          <div className="mt-10 space-y-4">
            {faqs.map((item, i) => (
              <FAQItem key={i} item={item} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 pb-24">
        <div
          className="mx-auto max-w-3xl overflow-hidden rounded-3xl px-8 py-12 text-center shadow-lg sm:px-12"
          style={{
            background:
              `linear-gradient(135deg, ` +
              BRAND.primary +
              `, ` +
              BRAND.secondary +
              `)`,
          }}
        >
          <Link
            href="/optimize"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-8 py-3.5 text-base font-bold shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
            style={{ color: BRAND.primary }}
          >
            Translate my CV →
          </Link>
        </div>
      </section>
    </div>
  );
}
