'use client';
// ============================================================================
// Builder Store (Zustand) — owns the live ResumeDocument and all editing ops.
// Section management, template switching, selection, autosave + ATS hooks.
// ============================================================================
import { create } from 'zustand';
import {
  ResumeDocument,
  ResumeSection,
  SectionType,
  RESUME_SCHEMA_VERSION,
} from '../resume/types';
import { SECTION_REGISTRY, starterItems, exampleItem } from '../resume/sectionRegistry';
import { getTemplate } from '../resume/templates';
import { sampleForTemplate } from '../resume/sampleDocuments';

let _n = 0;
const nid = (p: string) => p + '_' + Date.now().toString(36) + '_' + ++_n;

function blankSection(type: SectionType): ResumeSection {
  const def = SECTION_REGISTRY[type];
  const base = {
    id: nid('s'),
    type,
    title: def.defaultTitle,
    visible: true,
    mode: 'simple' as const,
    display: def.defaultDisplay as any,
  };
  // Section Templates: seed starter content so a new section is never blank.
  let items: any[] = starterItems(type);
  if (!items.length) {
    const it: any = { id: nid('i') };
    if (def.freeText) it.text = '';
    items = [it];
  }
  return { ...base, items } as ResumeSection;
}

function newItem(type: SectionType): any {
  // Use a coaching example placeholder rather than a fully blank item.
  return exampleItem(type) as any;
}

// crude but useful ATS heuristic (presentation-agnostic, content-based)
export function computeAtsScore(
  doc: ResumeDocument,
  templateId: string
): number {
  const t = getTemplate(templateId);
  let score = t.atsSafe ? 70 : 55;
  const types = doc.sections.filter((s) => s.visible).map((s) => s.type);
  if (types.includes('experience')) score += 8;
  if (types.includes('education')) score += 5;
  if (types.includes('skills')) score += 5;
  if (types.includes('summary') || types.includes('objective')) score += 4;
  const expSec: any = doc.sections.find((s) => s.type === 'experience');
  if (
    expSec &&
    expSec.items.some((i: any) =>
      (i.bullets || []).some((b: string) => /[0-9]%|\$[0-9]|[0-9]x/.test(b))
    )
  )
    score += 8;
  return Math.max(0, Math.min(100, score));
}

interface BuilderState {
  doc: ResumeDocument;
  selectedSectionId: string | null;
  dirty: boolean;
  lastSavedAt: number | null;
  atsScore: number;
  // lifecycle
  loadTemplate: (templateId: string) => void;
  loadDocument: (doc: ResumeDocument) => void;
  setTemplate: (templateId: string) => void;
  // basics
  updateBasics: (patch: Partial<ResumeDocument['basics']>) => void;
  // sections
  addSection: (type: SectionType) => void;
  removeSection: (id: string) => void;
  duplicateSection: (id: string) => void;
  toggleSectionVisible: (id: string) => void;
  reorderSections: (from: number, to: number) => void;
  setSectionMode: (id: string, mode: 'simple' | 'advanced') => void;
  setSectionDisplay: (id: string, display: string) => void;
  updateSectionTitle: (id: string, title: string) => void;
  select: (id: string | null) => void;
  // items
  addItem: (sectionId: string) => void;
  removeItem: (sectionId: string, itemId: string) => void;
  duplicateItem: (sectionId: string, itemId: string) => void;
  updateItem: (sectionId: string, itemId: string, patch: any) => void;
  // persistence
  markSaved: () => void;
}

function recompute(doc: ResumeDocument): number {
  return computeAtsScore(doc, doc.templateId);
}
function touch(doc: ResumeDocument): ResumeDocument {
  return { ...doc, updatedAt: Date.now() };
}

export const useBuilderStore = create<BuilderState>((set, get) => ({
  doc: sampleForTemplate('aria'),
  selectedSectionId: null,
  dirty: false,
  lastSavedAt: null,
  atsScore: 0,

  loadTemplate: (templateId) => {
    const doc = JSON.parse(
      JSON.stringify(sampleForTemplate(templateId))
    ) as ResumeDocument;
    doc.templateId = templateId;
    doc.version = RESUME_SCHEMA_VERSION;
    set({
      doc,
      selectedSectionId: doc.sections[0]?.id ?? null,
      dirty: false,
      atsScore: recompute(doc),
    });
  },
  loadDocument: (doc) =>
    set({
      doc,
      selectedSectionId: doc.sections[0]?.id ?? null,
      dirty: false,
      atsScore: recompute(doc),
    }),
  setTemplate: (templateId) =>
    set((st) => {
      const doc = touch({ ...st.doc, templateId });
      return { doc, dirty: true, atsScore: recompute(doc) };
    }),

  updateBasics: (patch) =>
    set((st) => ({
      doc: touch({ ...st.doc, basics: { ...st.doc.basics, ...patch } }),
      dirty: true,
    })),

  addSection: (type) =>
    set((st) => {
      const sec = blankSection(type);
      const doc = touch({ ...st.doc, sections: [...st.doc.sections, sec] });
      return {
        doc,
        selectedSectionId: sec.id,
        dirty: true,
        atsScore: recompute(doc),
      };
    }),
  removeSection: (id) =>
    set((st) => {
      const doc = touch({
        ...st.doc,
        sections: st.doc.sections.filter((s) => s.id !== id),
      });
      return {
        doc,
        dirty: true,
        atsScore: recompute(doc),
        selectedSectionId:
          st.selectedSectionId === id ? null : st.selectedSectionId,
      };
    }),
  duplicateSection: (id) =>
    set((st) => {
      const src = st.doc.sections.find((s) => s.id === id);
      if (!src) return {} as any;
      const copy: any = JSON.parse(JSON.stringify(src));
      copy.id = nid('s');
      copy.items = copy.items.map((i: any) => ({ ...i, id: nid('i') }));
      const idx = st.doc.sections.findIndex((s) => s.id === id);
      const sections = [...st.doc.sections];
      sections.splice(idx + 1, 0, copy);
      const doc = touch({ ...st.doc, sections });
      return { doc, dirty: true };
    }),
  toggleSectionVisible: (id) =>
    set((st) => {
      const doc = touch({
        ...st.doc,
        sections: st.doc.sections.map((s) =>
          s.id === id ? { ...s, visible: !s.visible } : s
        ),
      });
      return { doc, dirty: true, atsScore: recompute(doc) };
    }),
  reorderSections: (from, to) =>
    set((st) => {
      const sections = [...st.doc.sections];
      const [m] = sections.splice(from, 1);
      sections.splice(to, 0, m);
      return { doc: touch({ ...st.doc, sections }), dirty: true };
    }),
  setSectionMode: (id, mode) =>
    set((st) => ({
      doc: touch({
        ...st.doc,
        sections: st.doc.sections.map((s) =>
          s.id === id ? { ...s, mode } : s
        ),
      }),
      dirty: true,
    })),
  setSectionDisplay: (id, display) =>
    set((st) => ({
      doc: touch({
        ...st.doc,
        sections: st.doc.sections.map((s) =>
          s.id === id ? ({ ...s, display } as any) : s
        ),
      }),
      dirty: true,
    })),
  updateSectionTitle: (id, title) =>
    set((st) => ({
      doc: touch({
        ...st.doc,
        sections: st.doc.sections.map((s) =>
          s.id === id ? { ...s, title } : s
        ),
      }),
      dirty: true,
    })),
  select: (id) => set({ selectedSectionId: id }),

  addItem: (sectionId) =>
    set((st) => ({
      doc: touch({
        ...st.doc,
        sections: st.doc.sections.map((s: any) =>
          s.id === sectionId
            ? { ...s, items: [...s.items, newItem(s.type)] }
            : s
        ),
      }),
      dirty: true,
    })),
  removeItem: (sectionId, itemId) =>
    set((st) => ({
      doc: touch({
        ...st.doc,
        sections: st.doc.sections.map((s: any) =>
          s.id === sectionId
            ? { ...s, items: s.items.filter((i: any) => i.id !== itemId) }
            : s
        ),
      }),
      dirty: true,
    })),
  duplicateItem: (sectionId, itemId) =>
    set((st) => ({
      doc: touch({
        ...st.doc,
        sections: st.doc.sections.map((s: any) => {
          if (s.id !== sectionId) return s;
          const idx = s.items.findIndex((i: any) => i.id === itemId);
          if (idx < 0) return s;
          const copy = { ...s.items[idx], id: nid('i') };
          const items = [...s.items];
          items.splice(idx + 1, 0, copy);
          return { ...s, items };
        }),
      }),
      dirty: true,
    })),
  updateItem: (sectionId, itemId, patch) =>
    set((st) => {
      const doc = touch({
        ...st.doc,
        sections: st.doc.sections.map((s: any) =>
          s.id === sectionId
            ? {
                ...s,
                items: s.items.map((i: any) =>
                  i.id === itemId ? { ...i, ...patch } : i
                ),
              }
            : s
        ),
      });
      return { doc, dirty: true, atsScore: recompute(doc) };
    }),

  markSaved: () => set({ dirty: false, lastSavedAt: Date.now() }),
}));
