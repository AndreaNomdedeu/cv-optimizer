'use client';
import React, { useState } from 'react';
import { useBuilderStore } from '@/lib/store/builderStore';
import { SECTION_REGISTRY, ADDABLE_SECTIONS, SECTION_META } from '@/lib/resume/sectionRegistry';
import type { FieldDef } from '@/lib/resume/sectionRegistry';
import { TEMPLATES } from '@/lib/resume/templates';

const FIELD_CLS = 'w-full rounded-md bg-[#0f1115] border border-[#2d3340] px-2.5 py-1.5 text-[13px] text-[#e6e8ec] outline-none focus:border-[#34d399] transition-colors placeholder:text-[#5b6472]';
const LABEL_CLS = 'block text-[11px] font-medium uppercase tracking-wide text-[#9aa3b2] mb-1';

function Labeled(props: { label: string; children: React.ReactNode }) {
  return (
    <label className='block mb-2.5'>
      <span className={LABEL_CLS}>{props.label}</span>
      {props.children}
    </label>
  );
}

// ---- Completion scoring (NOT ATS) : encourages users to finish a section ----
function isFilled(v: any): boolean {
  if (v == null) return false;
  if (Array.isArray(v)) return v.length > 0;
  if (typeof v === String.fromCharCode(115,116,114,105,110,103)) return v.trim().length > 0;
  if (typeof v === String.fromCharCode(110,117,109,98,101,114)) return true;
  return Boolean(v);
}
function sectionCompletion(section: any, def: any): number {
  if (!def) return 0;
  if (def.freeText) {
    const t = (section.items && section.items[0] && section.items[0].text) || String.fromCharCode(39,39);
    return t.trim().length >= 40 ? 100 : t.trim().length > 0 ? 50 : 0;
  }
  const items = section.items || [];
  if (!items.length) return 0;
  const core = (def.fields || []).filter((f: any) => !f.advanced);
  if (!core.length) return 100;
  let sum = 0;
  items.forEach((it: any) => {
    const filled = core.filter((f: any) => isFilled(it[f.key])).length;
    sum += filled / core.length;
  });
  return Math.round((sum / items.length) * 100);
}
function CompletionBar(props: { value: number; label?: string }) {
  const v = Math.max(0, Math.min(100, props.value));
  const filled = Math.round(v / 10);
  const blocks = Array.from({ length: 10 }, (_, i) => i < filled);
  const tone = v >= 80 ? String.fromCharCode(35,52,102,57,57,55,50) : v >= 40 ? String.fromCharCode(35,101,49,98,52,48,98) : String.fromCharCode(35,54,98,55,52,56,52);
  return (
    <div className={String.fromCharCode(39)+"flex items-center gap-2"+String.fromCharCode(39)}>
      <div className={String.fromCharCode(39)+"flex gap-[2px]"+String.fromCharCode(39)} aria-hidden>
        {blocks.map((on, i) => (
          <span key={i} className={String.fromCharCode(39)+"h-1.5 w-2.5 rounded-[1px]"+String.fromCharCode(39)} style={{ background: on ? tone : String.fromCharCode(35,50,98,51,49,51,98) }} />
        ))}
      </div>
      <span className={String.fromCharCode(39)+"text-[11px] tabular-nums"+String.fromCharCode(39)} style={{ color: tone }}>{v}%</span>
    </div>
  );
}
// Coaching empty state shown when a section has no content yet.
function SectionEmpty(props: { def: any }) {
  const d = props.def || {};
  const ex: string[] = (d.examples || []).slice(0, 3);
  return (
    <div className={String.fromCharCode(39)+"rounded-lg border border-dashed border-[#2d3340] bg-[#13171f] px-3 py-4 text-center"+String.fromCharCode(39)}>
      <p className={String.fromCharCode(39)+"text-[13px] text-[#cdd3dd] mb-1"+String.fromCharCode(39)}>Nothing here yet</p>
      {d.description && (<p className={String.fromCharCode(39)+"text-[12px] leading-snug text-[#8b93a1] mb-2"+String.fromCharCode(39)}>{d.description}</p>)}
      {ex.length > 0 && (
        <ul className={String.fromCharCode(39)+"text-[11px] text-[#6b7484] space-y-0.5"+String.fromCharCode(39)}>
          {ex.map((e, i) => (<li key={i}>{String.fromCharCode(8226)} {e}</li>))}
        </ul>
      )}
    </div>
  );
}

function FieldEditor(props: { field: FieldDef; value: any; onChange: (v: any) => void }) {
  const { field, value, onChange } = props;
  const k = field.kind;
  if (k === 'textarea') {
    return (
      <Labeled label={field.label}>
        <textarea className={FIELD_CLS + ' min-h-[72px] resize-y leading-snug'} value={value || ''} onChange={(e) => onChange(e.target.value)} placeholder={field.label} />
      </Labeled>
    );
  }
  if (k === 'number') {
    return (
      <Labeled label={field.label}>
        <input type='number' className={FIELD_CLS} value={value ?? ''} onChange={(e) => onChange(e.target.value === '' ? undefined : Number(e.target.value))} />
      </Labeled>
    );
  }

  if (k === 'tags') {
    const arr: string[] = Array.isArray(value) ? value : [];
    return (
      <Labeled label={field.label}>
        <div className='flex flex-wrap gap-1.5 rounded-md bg-[#0f1115] border border-[#2d3340] p-1.5 focus-within:border-[#34d399]'>
          {arr.map((t, i) => (
            <span key={i} className='inline-flex items-center gap-1 rounded bg-[#1c2230] text-[#cdd3dd] text-[12px] px-1.5 py-0.5'>
              {t}
              <button type='button' onClick={() => onChange(arr.filter((_, j) => j !== i))} className='text-[#6b7484] hover:text-[#ff6b6b]'>×</button>
            </span>
          ))}
          <input className='flex-1 min-w-[80px] bg-transparent text-[13px] text-[#e6e8ec] outline-none px-1' placeholder='Add + Enter' onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); const v = (e.target as HTMLInputElement).value.trim(); if (v) { onChange([...arr, v]); (e.target as HTMLInputElement).value = ''; } } }} />
        </div>
      </Labeled>
    );
  }

  if (k === 'bullets') {
    const arr: string[] = Array.isArray(value) ? value : [];
    return (
      <Labeled label={field.label}>
        <textarea className={FIELD_CLS + ' min-h-[88px] resize-y leading-relaxed'} value={arr.join(String.fromCharCode(10))} placeholder='One point per line' onChange={(e) => onChange(e.target.value.split(String.fromCharCode(10)).map((s) => s.replace(/^s*[-•]s*/, '')).filter((s, i, a) => s.length > 0 || i < a.length - 1))} />
      </Labeled>
    );
  }
  if (k === 'links') {
    const arr: any[] = Array.isArray(value) ? value : [];
    const upd = (i: number, patch: any) => onChange(arr.map((x, j) => (j === i ? { ...x, ...patch } : x)));
    return (
      <Labeled label={field.label}>
        <div className='space-y-1.5'>
          {arr.map((lnk, i) => (
            <div key={i} className='flex gap-1.5'>
              <input className={FIELD_CLS} placeholder='Label' value={lnk.label || ''} onChange={(e) => upd(i, { label: e.target.value })} />
              <input className={FIELD_CLS} placeholder='https://' value={lnk.url || ''} onChange={(e) => upd(i, { url: e.target.value })} />
              <button type='button' onClick={() => onChange(arr.filter((_, j) => j !== i))} className='shrink-0 px-2 rounded-md text-[#6b7484] hover:text-[#ff6b6b] hover:bg-[#1c2230]'>×</button>
            </div>
          ))}
          <button type='button' onClick={() => onChange([...arr, { label: '', url: '' }])} className='text-[12px] text-[#34d399] hover:underline'>+ Add link</button>
        </div>
      </Labeled>
    );
  }

  return (
    <Labeled label={field.label}>
      <input type={k === 'date' ? 'text' : 'text'} className={FIELD_CLS} value={value || ''} placeholder={k === 'date' ? 'e.g. Jan 2023 or Present' : field.label} onChange={(e) => onChange(e.target.value)} />
    </Labeled>
  );
}

function itemSummary(item: any, fields: FieldDef[]): string {
  const first = fields.find((f) => f.kind === 'text' || f.kind === 'textarea');
  const v = first ? item[first.key] : undefined;
  return (typeof v === 'string' && v.trim()) ? v : 'Untitled';
}

function ItemCard(props: { sectionId: string; item: any; index: number; fields: FieldDef[]; mode: string }) {
  const { sectionId, item, index, fields, mode } = props;
  const [open, setOpen] = useState(true);
  const updateItem = useBuilderStore((s) => s.updateItem);
  const removeItem = useBuilderStore((s) => s.removeItem);
  const duplicateItem = useBuilderStore((s) => s.duplicateItem);
  const visibleFields = fields.filter((f) => mode === 'advanced' || !f.advanced);
  return (
    <div className='rounded-lg border border-[#262b35] bg-[#13171f] overflow-hidden'>
      <div className='flex items-center gap-2 px-2.5 py-2 group'>
        <button type='button' onClick={() => setOpen(!open)} className='flex-1 flex items-center gap-2 text-left min-w-0'>
          <span className={'text-[#5b6472] transition-transform ' + (open ? 'rotate-90' : '')}>›</span>
          <span className='text-[13px] text-[#e6e8ec] truncate'>{itemSummary(item, fields)}</span>
        </button>
        <button type='button' title='Duplicate' onClick={() => duplicateItem(sectionId, item.id)} className='opacity-0 group-hover:opacity-100 text-[12px] text-[#9aa3b2] hover:text-[#34d399] px-1'>⧉</button>
        <button type='button' title='Delete' onClick={() => removeItem(sectionId, item.id)} className='opacity-0 group-hover:opacity-100 text-[12px] text-[#9aa3b2] hover:text-[#ff6b6b] px-1'>✕</button>
      </div>
      {open && (
        <div className='px-2.5 pb-2.5 pt-0.5 border-t border-[#1d222b]'>
          {visibleFields.map((f) => (
            <FieldEditor key={f.key} field={f} value={item[f.key]} onChange={(v) => updateItem(sectionId, item.id, { [f.key]: v })} />
          ))}
        </div>
      )}
    </div>
  );
}

function TemplateSwitcher() {
  const templateId = useBuilderStore((s) => s.doc.templateId);
  const setTemplate = useBuilderStore((s) => s.setTemplate);
  return (
    <div className='mb-3'>
      <span className={LABEL_CLS}>Template</span>
      <div className='flex flex-wrap gap-1.5'>
        {TEMPLATES.map((t: any) => (
          <button key={t.id} type='button' onClick={() => setTemplate(t.id)} className={'text-[12px] px-2 py-1 rounded-md border transition-colors ' + (t.id === templateId ? 'border-[#34d399] text-[#34d399] bg-[#13251f]' : 'border-[#2d3340] text-[#9aa3b2] hover:text-[#e6e8ec] hover:border-[#3a4150]')}>{t.name}</button>
        ))}
      </div>
    </div>
  );
}

function SectionEditor(props: { section: any }) {
  const { section } = props;
  const def: any = (SECTION_REGISTRY as any)[section.type];
  const updateSectionTitle = useBuilderStore((s) => s.updateSectionTitle);
  const setSectionMode = useBuilderStore((s) => s.setSectionMode);
  const setSectionDisplay = useBuilderStore((s) => s.setSectionDisplay);
  const toggleSectionVisible = useBuilderStore((s) => s.toggleSectionVisible);
  const addItem = useBuilderStore((s) => s.addItem);
  const fields: FieldDef[] = def?.fields || [];
  const hasAdvanced = fields.some((f) => f.advanced);
  const items: any[] = section.items || [];
  return (
    <div>
      <div className='flex items-center gap-2 mb-3'>
        <input className={FIELD_CLS + ' font-medium'} value={section.title} onChange={(e) => updateSectionTitle(section.id, e.target.value)} />
        <button type='button' title='Toggle visibility' onClick={() => toggleSectionVisible(section.id)} className={'shrink-0 text-[12px] px-2 py-1.5 rounded-md border ' + (section.visible ? 'border-[#2d3340] text-[#9aa3b2]' : 'border-[#3a2530] text-[#ff6b6b]')}>{section.visible ? 'Shown' : 'Hidden'}</button>
      </div>
      {def && def.description && (
        <p className={String.fromCharCode(39)+"text-[12px] leading-snug text-[#8b93a1] mb-2"+String.fromCharCode(39)}>{def.description}</p>
      )}
      <div className={String.fromCharCode(39)+"flex items-center justify-between mb-3"+String.fromCharCode(39)}>
        <span className={String.fromCharCode(39)+"text-[11px] uppercase tracking-wide text-[#6b7484]"+String.fromCharCode(39)}>Completion</span>
        <CompletionBar value={sectionCompletion(section, def)} />
      </div>

      <div className='flex items-center gap-2 mb-3'>
        {hasAdvanced && (
          <div className='inline-flex rounded-md border border-[#2d3340] overflow-hidden'>
            {(['simple', 'advanced'] as const).map((m) => (
              <button key={m} type='button' onClick={() => setSectionMode(section.id, m)} className={'text-[12px] px-2.5 py-1 capitalize ' + (section.mode === m ? 'bg-[#34d399] text-[#06281d] font-medium' : 'text-[#9aa3b2] hover:text-[#e6e8ec]')}>{m}</button>
            ))}
          </div>
        )}
        {def?.displayModes && def.displayModes.length > 0 && (
          <select className={FIELD_CLS + ' flex-1'} value={section.display || ''} onChange={(e) => setSectionDisplay(section.id, e.target.value)}>
            {def.displayModes.map((d: string) => (<option key={d} value={d}>{d}</option>))}
          </select>
        )}
      </div>

      {def?.freeText ? (
        <div className='space-y-2'>
          {items.map((it) => (
            <div key={it.id} className='rounded-lg border border-[#262b35] bg-[#13171f] p-2.5'>
              {fields.filter((f) => section.mode === 'advanced' || !f.advanced).map((f) => (
                <FieldEditorBound key={f.key} sectionId={section.id} itemId={it.id} field={f} value={it[f.key]} />
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className='space-y-2'>
          {items.map((it, i) => (
            <ItemCard key={it.id} sectionId={section.id} item={it} index={i} fields={fields} mode={section.mode} />
          ))}
          {items.length === 0 && (<SectionEmpty def={def} />)}
          {def?.repeatable !== false && (
            <button type='button' onClick={() => addItem(section.id)} className='w-full text-[13px] text-[#34d399] border border-dashed border-[#2d4a3f] rounded-lg py-2 hover:bg-[#13251f] transition-colors'>+ Add {def?.label || 'item'}</button>
          )}
        </div>
      )}
    </div>
  );
}

function FieldEditorBound(props: { sectionId: string; itemId: string; field: FieldDef; value: any }) {
  const updateItem = useBuilderStore((s) => s.updateItem);
  return (<FieldEditor field={props.field} value={props.value} onChange={(v) => updateItem(props.sectionId, props.itemId, { [props.field.key]: v })} />);
}

export default function Inspector() {
  const doc = useBuilderStore((s) => s.doc);
  const selectedSectionId = useBuilderStore((s) => s.selectedSectionId);
  const addSection = useBuilderStore((s) => s.addSection);
  const section = doc.sections.find((s: any) => s.id === selectedSectionId);
  const existingTypes = new Set(doc.sections.map((s: any) => s.type));
  const addable = (ADDABLE_SECTIONS as any[]).filter((t) => !existingTypes.has(t) || (SECTION_REGISTRY as any)[t]?.repeatable);
  return (
    <div className='h-full overflow-y-auto p-3 text-[#e6e8ec]'>
      <TemplateSwitcher />
      <div className='mb-3'>
        <span className={LABEL_CLS}>Add section</span>
        <select className={FIELD_CLS} value='' onChange={(e) => { if (e.target.value) addSection(e.target.value as any); }}>
          <option value=''>Choose a section to add…</option>
          {addable.map((t) => (<option key={t} value={t}>{(SECTION_REGISTRY as any)[t]?.label || t}</option>))}
        </select>
      </div>
      <div className='h-px bg-[#1d222b] my-3' />
      {section ? (
        <SectionEditor section={section} />
      ) : (
        <div className='text-[13px] text-[#5b6472] py-10 text-center leading-relaxed'>Select a section on the left to start editing.<br/>Your changes preview instantly — no save needed.</div>
      )}
    </div>
  );
}

