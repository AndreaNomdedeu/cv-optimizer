// ============================================================================
// Template Engine — a Template is a DESIGN SYSTEM, not a resume.
// It defines APPEARANCE (theme tokens + layout + per-section-type styling).
// It NEVER defines which sections exist or the user content.
// ============================================================================
import { SectionType } from './types';

export interface ThemeColors {
  primary: string;
  accent: string;
  text: string;
  muted: string;
  surface: string;
  onSurface: string;
  page: string;
}

export interface ThemeTypography {
  headingFont: string;
  bodyFont: string;
  baseSize: number;
  scale: number;
  nameSize: number;
  headingWeight: number;
  headingTransform: 'none' | 'uppercase' | 'capitalize';
  headingLetterSpacing: string;
}

export interface ThemeSpacing {
  sectionGap: number;
  itemGap: number;
  pagePadding: number;
}

export type HeaderStyle =
  | 'plain'
  | 'band'
  | 'centered'
  | 'split'
  | 'sidebar-name'
  | 'big-name';
export type DividerStyle =
  | 'none'
  | 'line'
  | 'rule-thick'
  | 'underline'
  | 'background';
export type LayoutType =
  | 'single'
  | 'sidebar-left'
  | 'sidebar-right'
  | 'two-column'
  | 'banner-top';

export interface SectionStyle {
  display?: string;
  headingStyle?: DividerStyle;
  accentColor?: string;
}

export interface TemplateLayout {
  type: LayoutType;
  sidebarSections: SectionType[];
  mainSections: SectionType[];
  sidebarWidth?: number;
}

export type TemplateCategory =
  | 'ATS-Safe'
  | 'Professional'
  | 'Creative'
  | 'Executive'
  | 'Academic'
  | 'Modern';

export interface ResumeTemplate {
  id: string;
  name: string;
  category: TemplateCategory;
  atsScore: number;
  atsSafe: boolean;
  blurb: string;
  colors: ThemeColors;
  typography: ThemeTypography;
  spacing: ThemeSpacing;
  headerStyle: HeaderStyle;
  dividerStyle: DividerStyle;
  layout: TemplateLayout;
  sectionStyles?: Partial<Record<SectionType, SectionStyle>>;
  showPhoto?: boolean;
}

export function themeToCssVars(t: ResumeTemplate): Record<string, string> {
  return {
    '--r-primary': t.colors.primary,
    '--r-accent': t.colors.accent,
    '--r-text': t.colors.text,
    '--r-muted': t.colors.muted,
    '--r-surface': t.colors.surface,
    '--r-on-surface': t.colors.onSurface,
    '--r-page': t.colors.page,
    '--r-heading-font': t.typography.headingFont,
    '--r-body-font': t.typography.bodyFont,
    '--r-base-size': t.typography.baseSize + 'px',
    '--r-name-size': t.typography.nameSize + 'px',
    '--r-heading-weight': String(t.typography.headingWeight),
    '--r-heading-transform': t.typography.headingTransform,
    '--r-heading-ls': t.typography.headingLetterSpacing,
    '--r-section-gap': t.spacing.sectionGap + 'px',
    '--r-item-gap': t.spacing.itemGap + 'px',
    '--r-page-pad': t.spacing.pagePadding + 'px',
  };
}

export function slotFor(
  t: ResumeTemplate,
  type: SectionType
): 'sidebar' | 'main' {
  if (t.layout.type === 'single' || t.layout.type === 'banner-top')
    return 'main';
  if (t.layout.sidebarSections.includes(type)) return 'sidebar';
  return 'main';
}
