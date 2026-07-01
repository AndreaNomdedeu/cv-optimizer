import { NextRequest, NextResponse } from 'next/server';
import { MODEL_COACH, coachSystem, coachUser } from '../../../lib/cvPrompts';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parseJson = typeof body.parse === 'string' ? body.parse : JSON.stringify(body.parse || {});
    const reviewJson = typeof body.review === 'string' ? body.review : JSON.stringify(body.review || {});
    
    const key = process.env.ANTHROPIC_API_KEY;
    if (!key) {
      return NextResponse.json({ ok: false, error: 'Missing ANTHROPIC_API_KEY' });
    }

    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        "content-type": 'application/json',
        "x-api-key": key,
        "anthropic-version": '2023-06-01',
      },
      body: JSON.stringify({
        model: MODEL_COACH,
        max_tokens: 3000,
        system: coachSystem,
        messages: [{ role: 'user', content: coachUser(parseJson, reviewJson) }],
      }),
    });

    const data = await res.json();
    const out = Array.isArray(data && data.content) ? data.content.map((c: any) => (c && c.text) || '').join('') : '';

    let coaching: any = null;
    try {
      coaching = JSON.parse(out);
    } catch {
      const a = out.indexOf("{");
      const b = out.lastIndexOf("}");
      if (a > -1 && b > a) {
        try { coaching = JSON.parse(out.slice(a, b + 1)); } catch {}
      }
    }

    return NextResponse.json({ ok: true, coaching, raw: out });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}
