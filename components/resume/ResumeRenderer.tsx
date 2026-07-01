'use client';
// ============================================================================
// Unified Resume Renderer
// The RENDERER decides WHAT to render (driven by document.sections).
// The TEMPLATE decides HOW it looks (theme tokens -> CSS variables).
// No template contains content logic; no section hardcodes appearance.
// ============================================================================
import React from 'react';
import { ResumeDocument, ResumeSection } from '../../lib/resume/types';
import {
  ResumeTemplate,
  themeToCssVars,
  slotFor,
} from '../../lib/resume/templateModel';
import { RESUME_CSS } from './resumeStyles';

function fmtRange(s?: string, e?: string) {
  if (!s && !e) return '';
  if (s && e) return s + ' \u2013 ' + e;
  return s || e || '';
}

// ---- per-section-type body renderers (appearance comes from CSS vars) ----
function Bullets({ items }: { items?: string[] }) {
  if (!items || !items.length) return null;
  return (
    <ul className="r-bullets">
      {items.map((b, i) => (
        <li key={i}>{b}</li>
      ))}
    </ul>
  );
}

function Tags({ items }: { items: string[] }) {
  return (
    <div className="r-tags">
      {items.map((t, i) => (
        <span key={i} className="r-tag">
          {t}
        </span>
      ))}
    </div>
  );
}

function Bars({ items }: { items: { name: string; level?: number }[] }) {
  return (
    <div className="r-bars">
      {items.map((s, i) => (
        <div key={i} className="r-bar-row">
          <span className="r-bar-label">{s.title || s.name}</span>
          <span className="r-bar-track">
            <span
              className="r-bar-fill"
              style={{ width: (s.level ?? 70) + '%' }}
            />
          </span>
        </div>
      ))}
    </div>
  );
}

function Dots({ items }: { items: { name: string; level?: number }[] }) {
  return (
    <div className="r-dots">
      {items.map((s, i) => {
        const filled = Math.round(((s.level ?? 70) / 100) * 5);
        return (
          <div key={i} className="r-dot-row">
            <span className="r-dot-label">{s.title || s.name}</span>
            <span className="r-dot-set">
              {[0, 1, 2, 3, 4].map((n) => (
                <span key={n} className={'r-dot ' + (n < filled ? 'on' : '')} />
              ))}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function ExperienceBody({ section }: { section: any }) {
  return (
    <div className="r-items">
      {section.items.map((it: any) => (
        <div key={it.id} className="r-item">
          <div className="r-item-head">
            <span className="r-item-title">{it.title}</span>
            <span className="r-item-date">
              {fmtRange(it.startDate, it.endDate)}
            </span>
          </div>
          <div className="r-item-sub">
            {[it.employer, it.location].filter(Boolean).join(' \u00b7 ')}
          </div>
          {section.mode === 'advanced' &&
          (it.employmentType || it.workMode || it.teamSize) ? (
            <div className="r-item-meta">
              {[
                it.employmentType,
                it.workMode,
                it.teamSize && 'Team: ' + it.teamSize,
              ]
                .filter(Boolean)
                .join(' \u00b7 ')}
            </div>
          ) : null}
          <Bullets items={it.bullets} />
          {it.technologies && it.technologies.length ? (
            <Tags items={it.technologies} />
          ) : null}
        </div>
      ))}
    </div>
  );
}

function EducationBody({ section }: { section: any }) {
  return (
    <div className="r-items">
      {section.items.map((it: any) => (
        <div key={it.id} className="r-item">
          <div className="r-item-head">
            <span className="r-item-title">{it.degree}</span>
            <span className="r-item-date">
              {fmtRange(it.startDate, it.endDate)}
            </span>
          </div>
          <div className="r-item-sub">
            {[it.institution, it.location].filter(Boolean).join(' \u00b7 ')}
          </div>
          {it.gpa ? (
            <div className="r-item-meta">
              GPA: {it.gpa}
              {it.honors ? ' \u00b7 ' + it.honors : ''}
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}

function ProjectsBody({ section }: { section: any }) {
  return (
    <div className="r-items">
      {section.items.map((it: any) => (
        <div key={it.id} className="r-item">
          <div className="r-item-head">
            <span className="r-item-title">{it.name}</span>
            <span className="r-item-date">{it.role}</span>
          </div>
          {it.description ? (
            <div className="r-item-text">{it.description}</div>
          ) : null}
          <Bullets items={it.bullets} />
          {it.technologies && it.technologies.length ? (
            <Tags items={it.technologies} />
          ) : null}
        </div>
      ))}
    </div>
  );
}

function AchievementsBody({ section }: { section: any }) {
  return (
    <div className="r-items">
      {section.items.map((it: any) => (
        <div key={it.id} className="r-item r-achv">
          {it.metric ? <span className="r-metric">{it.metric}</span> : null}
          <div>
            <div className="r-item-title">{it.title}</div>
            {it.description ? (
              <div className="r-item-text">{it.description}</div>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
}

function DatedListBody({
  section,
  primary,
  sub,
}: {
  section: any;
  primary: string;
  sub: string;
}) {
  return (
    <div className="r-items">
      {section.items.map((it: any) => (
        <div key={it.id} className="r-item r-dated">
          <div className="r-item-title">{it[primary]}</div>
          <div className="r-item-sub">
            {[it[sub], it.date].filter(Boolean).join(' \u00b7 ')}
          </div>
        </div>
      ))}
    </div>
  );
}

function SimpleTextBody({ section }: { section: any }) {
  return <p className="r-text">{section.items[0]?.text}</p>;
}

function NamedBody({ section }: { section: any }) {
  if (section.display === 'tags')
    return <Tags items={section.items.map((i: any) => i.title || i.name).filter(Boolean)} />;
  return (
    <ul className="r-bullets">
      {section.items.map((i: any) => (
        <li key={i.id}>{i.title || i.name}</li>
      ))}
    </ul>
  );
}

function SkillsBody({ section }: { section: any }) {
  const d = section.display || 'tags';
  if (d === 'bars') return <Bars items={section.items} />;
  if (d === 'dots') return <Dots items={section.items} />;
  if (d === 'list')
    return (
      <ul className="r-bullets">
        {section.items.map((i: any) => (
          <li key={i.id}>{i.title || i.name}</li>
        ))}
      </ul>
    );
  if (d === 'percent') {
    return (
      <ul className="r-bullets">
        {section.items.map((i: any) => (
          <li key={i.id} style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
            <span>{i.title || i.name}</span>
            <span style={{ opacity: 0.7 }}>{(i.level ?? 0)}%</span>
          </li>
        ))}
      </ul>
    );
  }
  return <Tags items={section.items.map((i: any) => i.title || i.name).filter(Boolean)} />;
}

function LanguagesBody({ section }: { section: any }) {
  const d = section.display || 'list';
  if (d === 'bars') return <Bars items={section.items} />;
  if (d === 'dots') return <Dots items={section.items} />;
  if (d === 'cefr') {
    return (
      <ul className="r-bullets">
        {section.items.map((i: any) => (
          <li key={i.id} style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
            <span>{i.title || i.name}</span>
            <span style={{ opacity: 0.7, fontVariant: 'small-caps' }}>{i.subtitle || i.proficiency || ''}</span>
          </li>
        ))}
      </ul>
    );
  }
  return (
    <ul className="r-bullets">
      {section.items.map((i: any) => (
        <li key={i.id}>
          {i.title || i.name}
          {(i.subtitle || i.proficiency) ? ' — ' + (i.subtitle || i.proficiency) : ''}
        </li>
      ))}
    </ul>
  );
}

function ReferencesBody({ section }: { section: any }) {
  return (
    <div className="r-items">
      {section.items.map((it: any) => (
        <div key={it.id} className="r-item r-dated">
          <div className="r-item-title">{it.name}</div>
          <div className="r-item-sub">
            {[it.relationship, it.contact].filter(Boolean).join(' \u00b7 ')}
          </div>
        </div>
      ))}
    </div>
  );
}

function CustomBody({ section }: { section: any }) {
  return (
    <div className="r-items">
      {section.items.map((it: any) => (
        <div key={it.id} className="r-item">
          {it.heading ? <div className="r-item-title">{it.heading}</div> : null}
          {it.text ? <div className="r-item-text">{it.text}</div> : null}
          <Bullets items={it.bullets} />
        </div>
      ))}
    </div>
  );
}

// Dispatch a section to the right body renderer based on its TYPE.
function SectionBody({ section }: { section: ResumeSection }) {
  const s: any = section;
  switch (section.type) {
    case 'summary':
    case 'objective':
      return <SimpleTextBody section={s} />;
    case 'experience':
    case 'volunteer':
    case 'research':
    case 'military':
      return <ExperienceBody section={s} />;
    case 'education':
      return <EducationBody section={s} />;
    case 'projects':
      return <ProjectsBody section={s} />;
    case 'skills':
      return <SkillsBody section={s} />;
    case 'languages':
      return <LanguagesBody section={s} />;
    case 'achievements':
      return <AchievementsBody section={s} />;
    case 'certifications':
      return <DatedListBody section={s} primary="name" sub="issuer" />;
    case 'awards':
      return <DatedListBody section={s} primary="title" sub="issuer" />;
    case 'publications':
    case 'conferences':
      return <DatedListBody section={s} primary="title" sub="venue" />;
    case 'memberships':
    case 'interests':
      return <NamedBody section={s} />;
    case 'references':
      return <ReferencesBody section={s} />;
    case 'portfolio':
    case 'social':
      return (
        <ul className="r-bullets">
          {s.items.map((i: any) => (
            <li key={i.id}>{i.label || i.url}</li>
          ))}
        </ul>
      );
    case 'custom':
      return <CustomBody section={s} />;
    default:
      return null;
  }
}

function SectionBlock({ section }: { section: ResumeSection }) {
  if (!section.visible || !section.items || !section.items.length) return null;
  return (
    <section className="r-section">
      <h3 className="r-section-title">{section.title}</h3>
      <SectionBody section={section} />
    </section>
  );
}

function Header({
  doc,
  template,
}: {
  doc: ResumeDocument;
  template: ResumeTemplate;
}) {
  const contacts = doc.basics.contacts.map((c) => c.value).join('  \u00b7  ');
  return (
    <header className={'r-header h-' + template.headerStyle}>
      {template.showPhoto ? (doc.basics.photoUrl ? <div className="r-photo" style={{ backgroundImage: "url(" + doc.basics.photoUrl + ")", backgroundSize: "cover", backgroundPosition: "center" }} aria-hidden /> : <div className="r-photo r-photo-empty" aria-hidden><svg viewBox="0 0 24 24" width="42" height="42" fill="#9aa3af"><path d="M12 12a4 4 0 100-8 4 4 0 000 8zm0 2c-3.6 0-8 1.8-8 4.2V21h16v-2.8c0-2.4-4.4-4.2-8-4.2z"/></svg></div>) : null}
      <div className="r-id">
        <h1 className="r-name">{doc.basics.fullName}</h1>
        <div className="r-headline">{doc.basics.headline}</div>
        <div className="r-contacts">{contacts}</div>
      </div>
    </header>
  );
}

export interface ResumeRendererProps {
  doc: ResumeDocument;
  template: ResumeTemplate;
  scale?: number; // for thumbnails
}

export function ResumeRenderer({ doc, template, scale }: ResumeRendererProps) {
  const vars = themeToCssVars(template) as React.CSSProperties;
  const sidebar = doc.sections.filter(
    (s) => slotFor(template, s.type) === 'sidebar'
  );
  const main = doc.sections.filter((s) => slotFor(template, s.type) === 'main');
  const hasSidebar =
    template.layout.type === 'sidebar-left' ||
    template.layout.type === 'sidebar-right';
  const style: React.CSSProperties = { ...vars };
  if (scale) {
    (style as any).transform = 'scale(' + scale + ')';
    (style as any).transformOrigin = 'top left';
  }
  const sw = template.layout.sidebarWidth || 240;
  return (
    <div
      className={'r-paper layout-' + template.layout.type}
      data-template={template.id}
      style={style}
    >
      <style dangerouslySetInnerHTML={{ __html: RESUME_CSS }} />
      {hasSidebar ? (
        <div
          className="r-grid"
          style={{
            gridTemplateColumns:
              template.layout.type === 'sidebar-right'
                ? '1fr ' + sw + 'px'
                : sw + 'px 1fr',
          }}
        >
          <aside
            className="r-aside"
            style={{ order: template.layout.type === 'sidebar-right' ? 2 : 0 }}
          >
            <Header doc={doc} template={template} />
            {sidebar.map((s) => (
              <SectionBlock key={s.id} section={s} />
            ))}
          </aside>
          <main className="r-main">
            {main.map((s) => (
              <SectionBlock key={s.id} section={s} />
            ))}
          </main>
        </div>
      ) : (
        <div className="r-single">
          <Header doc={doc} template={template} />
          {doc.sections.map((s) => (
            <SectionBlock key={s.id} section={s} />
          ))}
        </div>
      )}
    </div>
  );
}

export default ResumeRenderer;
