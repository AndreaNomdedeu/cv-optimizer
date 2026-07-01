// ============================================================================
// CV Optimizer — Core Resume Data Model (versioned)
// The user owns CONTENT + STRUCTURE. Templates own APPEARANCE only.
// Each section type owns a TYPED item shape (discriminated by section type),
// giving type-safety for validation, ATS analysis, AI generation and I/O,
// while the registry still drives a common editing experience.
// ============================================================================

export const RESUME_SCHEMA_VERSION = 1 as const;

export type SectionType =
  | 'summary'
  | 'objective'
  | 'experience'
  | 'education'
  | 'skills'
  | 'certifications'
  | 'languages'
  | 'projects'
  | 'awards'
  | 'achievements'
  | 'volunteer'
  | 'publications'
  | 'research'
  | 'conferences'
  | 'memberships'
  | 'references'
  | 'interests'
  | 'portfolio'
  | 'social'
  | 'military'
  | 'custom';

export type SectionMode = 'simple' | 'advanced';
export type DisplayMode =
  | 'list'
  | 'tags'
  | 'bars'
  | 'dots'
  | 'percent'
  | 'timeline'
  | 'grid';

export interface ContactItem {
  id: string;
  kind:
    | 'email'
    | 'phone'
    | 'location'
    | 'website'
    | 'linkedin'
    | 'github'
    | 'custom';
  label?: string;
  value: string;
}

export interface ResumeBasics {
  fullName: string;
  headline: string;
  photoUrl?: string;
  contacts: ContactItem[];
}

// --- Shared building blocks ----------------------------------------------
export interface DateRange {
  startDate?: string;
  endDate?: string;
} // endDate '' or 'Present'
export interface LinkRef {
  label: string;
  url: string;
}
export interface ItemBase {
  id: string;
}

// --- Typed per-section item shapes ---------------------------------------
export interface ExperienceItem extends ItemBase, DateRange {
  title: string; // job title
  employer: string;
  location?: string;
  bullets: string[];
  // advanced
  department?: string;
  industry?: string;
  employmentType?: string;
  workMode?: string;
  teamSize?: string;
  budget?: string;
  clients?: string;
  technologies?: string[];
  links?: LinkRef[];
}

export interface EducationItem extends ItemBase, DateRange {
  degree: string;
  institution: string;
  location?: string;
  // advanced
  major?: string;
  minor?: string;
  gpa?: string;
  honors?: string;
  thesis?: string;
  coursework?: string[];
  activities?: string[];
}

export interface SkillItem extends ItemBase {
  name: string;
  category?: string;
  level?: number; // 0..100
}

export interface LanguageItem extends ItemBase {
  name: string;
  proficiency?: string; // 'Native', 'C1'...
  level?: number; // 0..100
}

export interface ProjectItem extends ItemBase, DateRange {
  name: string;
  role?: string;
  description?: string;
  bullets?: string[];
  technologies?: string[];
  metric?: string;
  links?: LinkRef[];
}

export interface CertificationItem extends ItemBase {
  name: string;
  issuer?: string;
  date?: string;
  description?: string;
  link?: LinkRef;
}

export interface AwardItem extends ItemBase {
  title: string;
  issuer?: string;
  date?: string;
  description?: string;
}

export interface AchievementItem extends ItemBase {
  title: string;
  category?: string;
  description?: string;
  impact?: string;
  metric?: string;
  link?: LinkRef;
}

export interface PublicationItem extends ItemBase {
  title: string;
  venue?: string;
  date?: string;
  authors?: string;
  link?: LinkRef;
}

export interface ReferenceItem extends ItemBase {
  name: string;
  relationship?: string; // role / company
  contact?: string;
}

export interface NamedItem extends ItemBase {
  name: string;
  detail?: string;
} // interests/memberships
export interface LinkItem extends ItemBase {
  label: string;
  url: string;
} // portfolio/social
export interface TextItem extends ItemBase {
  text: string;
} // summary/objective
export interface CustomItem extends ItemBase {
  heading?: string;
  text?: string;
  bullets?: string[];
}

// Map every section type to its item type — single source of truth.
export interface SectionItemMap {
  summary: TextItem;
  objective: TextItem;
  experience: ExperienceItem;
  education: EducationItem;
  skills: SkillItem;
  languages: LanguageItem;
  projects: ProjectItem;
  certifications: CertificationItem;
  awards: AwardItem;
  achievements: AchievementItem;
  volunteer: ExperienceItem;
  publications: PublicationItem;
  research: ExperienceItem;
  conferences: PublicationItem;
  memberships: NamedItem;
  references: ReferenceItem;
  interests: NamedItem;
  portfolio: LinkItem;
  social: LinkItem;
  military: ExperienceItem;
  custom: CustomItem;
}

export type AnySectionItem = SectionItemMap[SectionType];

// A section is a discriminated union over the type field, so item types stay precise.
export type ResumeSection = {
  [K in SectionType]: {
    id: string;
    type: K;
    title: string;
    visible: boolean;
    mode: SectionMode;
    display?: DisplayMode;
    items: SectionItemMap[K][];
  };
}[SectionType];

export interface ResumeSettings {
  pageSize: 'A4' | 'Letter';
  density: 'compact' | 'normal' | 'relaxed';
  dateFormat: 'MMM YYYY' | 'MM/YYYY' | 'YYYY';
  showPhoto: boolean;
}

export interface ResumeDocument {
  version: typeof RESUME_SCHEMA_VERSION;
  id: string;
  templateId: string;
  basics: ResumeBasics;
  sections: ResumeSection[]; // ORDER === structure
  settings: ResumeSettings;
  updatedAt: number;
}
