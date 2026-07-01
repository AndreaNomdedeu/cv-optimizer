import { NextRequest, NextResponse } from 'next/server';
import { MODEL_PARSE, parseSystem, parseUser } from '../../../lib/cvPrompts';

export const runtime = 'nodejs';

// Layer 0 - Parse. Reads the key from ANTHROPIC_API_KEY (set it in StackBlitz env).
export async function POST(req: NextRequest) {
  let body: any = {};
  try { body = await req.json(); } catch {}
  const cvText = (body.cvText || '').toString();
  const jobText = (body.jobText || '').toString();

  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) {
    return NextResponse.json({ ok: false, error: 'Missing ANTHROPIC_API_KEY' }, { status: 500 });
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
        model: MODEL_PARSE,
        max_tokens: 3000,
        system: parseSystem,
        messages: [{ role: 'user', content: parseUser(cvText, jobText) }],
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      return NextResponse.json({ ok: false, error: data }, { status: 502 });
    }
    const text = Array.isArray(data && data.content)
      ? data.content.map((c: any) => (c && c.text) || '').join('')
      : '';
    let parsed: any = null;
    try { parsed = JSON.parse(text); } catch {
      const a = text.indexOf('{'); const b = text.lastIndexOf('}');
      if (a > -1 && b > a) { try { parsed = JSON.parse(text.slice(a, b + 1)); } catch {} }
    }
    return NextResponse.json({ ok: true, parsed, raw: text });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}
