import { NextRequest, NextResponse } from 'next/server';
import { MODEL_INTEL, intelSystem, intelUser } from '../../../lib/cvPrompts';

export const runtime = 'nodejs';

// Layer 1 - Career Intelligence (diagnosis). Reads ANTHROPIC_API_KEY from env.
export async function POST(req: NextRequest) {
  let body: any = {};
  try { body = await req.json(); } catch {}
  const track = (body.track || '').toString();
  const sectorOrigin = (body.sectorOrigin || '').toString();
  const parseJson =
    typeof body.parse === 'string' ? body.parse : JSON.stringify(body.parse || {});

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
        model: MODEL_INTEL,
        max_tokens: 4000,
        system: intelSystem,
        messages: [{ role: 'user', content: intelUser(parseJson, track, sectorOrigin) }],
      }),
    });
    const data = await res.json();
    if (!res.ok) { return NextResponse.json({ ok: false, error: data }, { status: 502 }); }
    const text = Array.isArray(data && data.content) ? data.content.map((c: any) => (c && c.text) || '').join('') : '';
    let diagnosis: any = null;
    try { diagnosis = JSON.parse(text); } catch {
      const a = text.indexOf('{'); const b = text.lastIndexOf('}');
      if (a > -1 && b > a) { try { diagnosis = JSON.parse(text.slice(a, b + 1)); } catch {} }
    }
    return NextResponse.json({ ok: true, diagnosis, raw: text });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: String(e) }, { status: 500 });
  }
}
