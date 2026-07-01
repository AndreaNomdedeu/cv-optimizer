import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';

// Reads the key from the ANTHROPIC_API_KEY environment variable.
// NEVER hardcode your key here. Add it in StackBlitz Project Settings (Env) or a .env file.
const MODEL = 'claude-3-5-sonnet-latest';

type Body = {
  kind?: string;
  text?: string;
  role?: string;
  jd?: string;
  country?: string;
  tone?: string;
  company?: string;
  notes?: string;
};

function buildPrompt(b: Body): string {
  const kind = b.kind || 'rewrite';
  const text = (b.text || '').slice(0, 6000);
  if (kind === 'cover') {
    return [
      "You are a senior executive recruiter and former management consultant writing a cover letter that an experienced recruiter could not distinguish from one written by an exceptional candidate. Your goal is not an AI cover letter; it is a sharp business narrative.",
      "Hard bans. Never use these or anything close: I am writing to express, I am excited to apply, I believe I am a strong candidate, I think my skills, my background aligns, thank you for your consideration, I look forward to hearing from you. Never use the words passionate, hardworking, results-driven, team player, fast learner, dynamic, self-starter. Never copy phrases from the job description into unnatural sentences.",
      "Structure, four short paragraphs, 300 to 450 words total, readable in 90 seconds. First, open by demonstrating real understanding of the company or role; begin with something meaningful, not a self-introduction. Second, connect the candidate experience to the employer actual problems and explain why it matters rather than summarising the resume. Third, prove business impact with the candidate own measurable evidence, converting resume bullets into concrete stories. Fourth, close with confidence and specificity, never with thanks or hope.",
      "Every sentence must add new information. No filler, cliches, motivational language or buzzwords. Replace adjectives with evidence. Infer connections between the resume, job, industry, company, seniority and transferable skills. If the candidate lacks an exact requirement, explain the transferable experience instead of ignoring the gap. Reference the company, its product or mission if known, the real responsibilities, the candidate most relevant achievements and their trajectory.",
      "Tone: " + (b.tone || "professional") + ". Region: " + (b.country || "US") + ".",
      b.company ? ("Company: " + b.company) : "",
      b.role ? ("Target role: " + b.role) : "",
      b.notes ? ("What draws the candidate to this company (use naturally, do not quote verbatim): " + b.notes) : "",
      "Job description:" + String.fromCharCode(10) + (b.jd || "").slice(0, 4000),
      "Candidate resume and notes:" + String.fromCharCode(10) + text,
      "Before answering, silently check: does it sound generic, could it have been written for any company, does every paragraph contain evidence, does it explain why the experience matters, is every sentence useful, would a recruiter keep reading. If any answer is no, rewrite until it passes. Two similar resumes must produce noticeably different letters.",
      "Return only the letter body, starting with the greeting. No preamble, no bracketed placeholders, no notes about your process."
    ].filter(Boolean).join(String.fromCharCode(10) + String.fromCharCode(10));
  }
  return [
    'Rewrite the following resume content into strong, quantified, ATS-optimized achievements.',
    'Turn responsibilities into outcomes with metrics where reasonable. Use active verbs.',
    'Keep it truthful, concise, and free of buzzword stuffing.',
    b.jd ? 'Target job description:\n' + b.jd.slice(0, 3000) : '',
    'Content to rewrite:\n' + text,
    'Return only the rewritten content, no preamble.',
  ]
    .filter(Boolean)
    .join('\n\n');
}

export async function POST(req: NextRequest) {
  let body: Body = {};
  try {
    body = await req.json();
  } catch {}

  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) {
    return NextResponse.json(
      { ok: false, fallback: true, error: 'ANTHROPIC_API_KEY not set' },
      { status: 200 }
    );
  }

  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': key,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 2000,
        messages: [{ role: 'user', content: buildPrompt(body) }],
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      return NextResponse.json(
        {
          ok: false,
          fallback: true,
          error: 'Anthropic ' + res.status,
          detail: detail.slice(0, 400),
        },
        { status: 200 }
      );
    }

    const data = await res.json();
    const out = Array.isArray(data && data.content)
      ? data.content
          .map((c: any) => (c && c.text) || '')
          .join('')
          .trim()
      : '';
    return NextResponse.json({ ok: true, text: out });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, fallback: true, error: String((e && e.message) || e) },
      { status: 200 }
    );
  }
}
