import { NextRequest, NextResponse } from 'next/server';
import { MODEL_REVIEW, reviewSystem, reviewUser } from '../../../lib/cvPrompts';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parseJson = typeof body.parse === 'string' ? body.parse : JSON.stringify(body.parse || {});
    const positionJson = typeof body.position === 'string' ? body.position : JSON.stringify(body.position || {});
    const budget = body.budget || '3-5';
    const track = body.track || '';

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
        model: MODEL_REVIEW,
        max_tokens: 3000,
        system: reviewSystem,
        messages: [{ role: 'user', content: reviewUser(parseJson, positionJson, track, budget) }],
      }),
    });

    const data = await res.json();
    const out = Array.isArray(data && data.content) ? data.content.map((c: any) => (c && c.text) || '').join('') : '';

    let position: any = null;
    try {
      position = JSON.parse(out);
    } catch {
      const a = out.indexOf("{");
      const b = out.lastIndexOf("}");
      if (a > -1 && b > a) {
        try { position = JSON.parse(out.slice(a, b + 1)); } catch {}
      }
    }

        return NextResponse.json({ ok: true, review: position, raw: out });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}
