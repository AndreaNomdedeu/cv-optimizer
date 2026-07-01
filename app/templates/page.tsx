'use client';

import Link from 'next/link';
import { TEMPLATES } from '@/lib/resume/templates';

const BRAND = { primary: '#4F46E5' };

export default function TemplatesPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#f8fafc', color: '#0f172a', fontFamily: 'Plus Jakarta Sans, system-ui, sans-serif' }}>
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 32px', borderBottom: '1px solid #e5e7eb', background: '#ffffff' }}>
        <Link href={'/'} style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: '#0f172a', fontWeight: 800, fontSize: 18 }}>
          <span style={{ width: 30, height: 30, borderRadius: 8, background: BRAND.primary, display: 'inline-block' }} />
          CV Optimizer
        </Link>
        <Link href={'/'} style={{ color: '#64748b', textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>Back to home</Link>
      </header>
      <section style={{ maxWidth: 1120, margin: '0 auto', padding: '48px 32px 24px' }}>
        <p style={{ color: BRAND.primary, fontWeight: 700, fontSize: 13, letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0 }}>Choose a template</p>
        <h1 style={{ fontSize: 36, fontWeight: 800, margin: '8px 0 10px' }}>Pick a design to start your resume</h1>
        <p style={{ color: '#64748b', fontSize: 16, margin: 0, maxWidth: 640 }}>Every template is A4 and built to pass ATS scans. Choose one to open the builder with sample content you can edit.</p>
      </section>
      <section style={{ maxWidth: 1120, margin: '0 auto', padding: '8px 32px 64px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 22 }}>
        {TEMPLATES.map((t) => (
          <div key={t.id} style={{ background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: 14, overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 1px 2px rgba(15,23,42,0.04)' }}>
            <div style={{ height: 168, background: t.colors.page, borderBottom: '1px solid #eef2f7', padding: 18, position: 'relative' }}>
              <div style={{ fontFamily: t.typography.headingFont, color: t.colors.primary, fontWeight: t.typography.headingWeight, fontSize: 22, lineHeight: 1.1, textTransform: (t.typography.headingTransform as any) }}>Jordan Avery</div>
              <div style={{ color: t.colors.accent, fontSize: 11, fontWeight: 700, marginTop: 4, letterSpacing: t.typography.headingLetterSpacing, textTransform: (t.typography.headingTransform as any) }}>PRODUCT DESIGNER</div>
              <div style={{ height: 2, background: t.colors.accent, width: 54, margin: '10px 0' }} />
              <div style={{ height: 6, background: t.colors.surface, borderRadius: 3, marginBottom: 6 }} />
              <div style={{ height: 6, background: t.colors.surface, borderRadius: 3, width: '85%', marginBottom: 6 }} />
              <div style={{ height: 6, background: t.colors.surface, borderRadius: 3, width: '70%' }} />
            </div>
            <div style={{ padding: 18, display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: 17, fontWeight: 800 }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: '#64748b', marginTop: 2 }}>{t.category}</div>
                </div>
                <div style={{ fontSize: 12, fontWeight: 800, color: '#166534', background: '#dcfce7', borderRadius: 999, padding: '4px 10px', whiteSpace: 'nowrap' }}>ATS {t.atsScore}</div>
              </div>
              <p style={{ fontSize: 13, color: '#475569', margin: 0, lineHeight: 1.5, flex: 1 }}>{t.blurb}</p>
              <Link href={`/builder/${t.id}`} style={{ marginTop: 4, textAlign: 'center', background: BRAND.primary, color: '#ffffff', textDecoration: 'none', fontWeight: 700, fontSize: 14, padding: '11px 16px', borderRadius: 10 }}>Use this template</Link>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
