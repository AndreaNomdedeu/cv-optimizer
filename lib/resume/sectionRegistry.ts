// ============================================================================
// Universal Section Registry
// One entry per section TYPE. Adding a future section = one entry here.
// The Section Library (left sidebar), the Inspector editor (right sidebar),
// and the renderer all read from this registry. No template-specific code.
// ============================================================================
import { SectionType, SectionItem } from './types';

export interface FieldDef {
  key: keyof SectionItem | string;
  label: string;
  kind: 'text' | 'textarea' | 'date' | 'number' | 'tags' | 'bullets' | 'links';
  advanced?: boolean; // only shown in advanced mode
}

export interface SectionDef {
  type: SectionType;
  label: string; // shown in Section Library
  icon: string; // short glyph / emoji-free token
  freeText?: boolean; // single description block (summary/objective)
  repeatable: boolean; // has multiple items
  defaultTitle: string;
  defaultDisplay?: string;
  displayModes?: string[]; // e.g. skills: tags|bars|dots|percent
  description?: string;        // shown in Section Library + Inspector header
  examples?: string[];         // example lines to coach the user
  recommended?: SectionType[]; // companion sections to suggest
  fields: FieldDef[]; // editable fields (simple + advanced)
}

const exp: FieldDef[] = [
  { key: 'title', label: 'Job Title', kind: 'text' },
  { key: 'subtitle', label: 'Employer', kind: 'text' },
  { key: 'location', label: 'Location', kind: 'text' },
  { key: 'startDate', label: 'Start', kind: 'date' },
  { key: 'endDate', label: 'End', kind: 'date' },
  { key: 'bullets', label: 'Responsibilities & Achievements', kind: 'bullets' },
  { key: 'department', label: 'Department', kind: 'text', advanced: true },
  { key: 'industry', label: 'Industry', kind: 'text', advanced: true },
  {
    key: 'employmentType',
    label: 'Employment Type',
    kind: 'text',
    advanced: true,
  },
  { key: 'workMode', label: 'Work Mode', kind: 'text', advanced: true },
  { key: 'teamSize', label: 'Team Size', kind: 'text', advanced: true },
  { key: 'budget', label: 'Budget Managed', kind: 'text', advanced: true },
  { key: 'clients', label: 'Clients Managed', kind: 'text', advanced: true },
  { key: 'technologies', label: 'Technologies', kind: 'tags', advanced: true },
  { key: 'links', label: 'Portfolio Links', kind: 'links', advanced: true },
];

const edu: FieldDef[] = [
  { key: 'title', label: 'Degree', kind: 'text' },
  { key: 'subtitle', label: 'Institution', kind: 'text' },
  { key: 'startDate', label: 'Start', kind: 'date' },
  { key: 'endDate', label: 'End', kind: 'date' },
  { key: 'major', label: 'Major', kind: 'text', advanced: true },
  { key: 'minor', label: 'Minor', kind: 'text', advanced: true },
  { key: 'gpa', label: 'GPA', kind: 'text', advanced: true },
  { key: 'honors', label: 'Honors', kind: 'text', advanced: true },
  { key: 'thesis', label: 'Thesis', kind: 'text', advanced: true },
  { key: 'coursework', label: 'Coursework', kind: 'tags', advanced: true },
  { key: 'activities', label: 'Activities', kind: 'tags', advanced: true },
];

const skills: FieldDef[] = [
  { key: 'title', label: 'Skill', kind: 'text' },
  { key: 'category', label: 'Category', kind: 'text', advanced: true },
  {
    key: 'level',
    label: 'Proficiency (0-100)',
    kind: 'number',
    advanced: true,
  },
];

const projects: FieldDef[] = [
  { key: 'title', label: 'Project Name', kind: 'text' },
  { key: 'subtitle', label: 'Role', kind: 'text' },
  { key: 'description', label: 'Description', kind: 'textarea' },
  { key: 'bullets', label: 'Outcomes', kind: 'bullets' },
  { key: 'technologies', label: 'Technologies', kind: 'tags', advanced: true },
  { key: 'metric', label: 'Metric', kind: 'text', advanced: true },
  { key: 'links', label: 'URLs / Repo', kind: 'links', advanced: true },
];

const achievements: FieldDef[] = [
  { key: 'title', label: 'Achievement', kind: 'text' },
  { key: 'category', label: 'Category', kind: 'text', advanced: true },
  { key: 'description', label: 'Description', kind: 'textarea' },
  { key: 'impact', label: 'Impact Statement', kind: 'text', advanced: true },
  { key: 'metric', label: 'Metric Value', kind: 'text', advanced: true },
  { key: 'links', label: 'Supporting Link', kind: 'links', advanced: true },
];

const dated: FieldDef[] = [
  { key: 'title', label: 'Title', kind: 'text' },
  { key: 'subtitle', label: 'Issuer / Org', kind: 'text' },
  { key: 'endDate', label: 'Date', kind: 'date' },
  {
    key: 'description',
    label: 'Description',
    kind: 'textarea',
    advanced: true,
  },
  { key: 'links', label: 'Link', kind: 'links', advanced: true },
];

const simpleNamed: FieldDef[] = [
  { key: 'title', label: 'Name', kind: 'text' },
  { key: 'description', label: 'Detail', kind: 'text', advanced: true },
];

export const SECTION_REGISTRY: Record<SectionType, SectionDef> = {
  basics: {
    type: 'basics',
    label: 'Personal Details',
    icon: 'ID',
    repeatable: false,
    defaultTitle: 'Personal Details',
    fields: [],
  },
  summary: {
    type: 'summary',
    label: 'Professional Summary',
    icon: 'SU',
    freeText: true,
    repeatable: false,
    defaultTitle: 'Professional Summary',
    fields: [{ key: 'description', label: 'Summary', kind: 'textarea' }],
  },
  objective: {
    type: 'objective',
    label: 'Career Objective',
    icon: 'OB',
    freeText: true,
    repeatable: false,
    defaultTitle: 'Career Objective',
    fields: [{ key: 'description', label: 'Objective', kind: 'textarea' }],
  },
  experience: {
    type: 'experience',
    label: 'Work Experience',
    icon: 'EX',
    repeatable: true,
    defaultTitle: 'Work Experience',
    fields: exp,
  },
  education: {
    type: 'education',
    label: 'Education',
    icon: 'ED',
    repeatable: true,
    defaultTitle: 'Education',
    fields: edu,
  },
  skills: {
    type: 'skills',
    label: 'Skills',
    icon: 'SK',
    repeatable: true,
    defaultTitle: 'Skills',
    defaultDisplay: 'tags',
    displayModes: ['tags', 'bars', 'dots', 'percent', 'list'],
    fields: skills,
  },
  certifications: {
    type: 'certifications',
    label: 'Certifications',
    icon: 'CE',
    repeatable: true,
    defaultTitle: 'Certifications',
    fields: dated,
  },
  languages: {
    type: 'languages',
    label: 'Languages',
    icon: 'LA',
    repeatable: true,
    defaultTitle: 'Languages',
    defaultDisplay: 'bars',
    displayModes: ['list', 'bars', 'dots', 'tags'],
    fields: skills,
  },
  projects: {
    type: 'projects',
    label: 'Projects',
    icon: 'PR',
    repeatable: true,
    defaultTitle: 'Projects',
    fields: projects,
  },
  awards: {
    type: 'awards',
    label: 'Awards',
    icon: 'AW',
    repeatable: true,
    defaultTitle: 'Awards',
    fields: dated,
  },
  achievements: {
    type: 'achievements',
    label: 'Achievements',
    icon: 'AC',
    repeatable: true,
    defaultTitle: 'Key Achievements',
    fields: achievements,
  },
  volunteer: {
    type: 'volunteer',
    label: 'Volunteer Experience',
    icon: 'VO',
    repeatable: true,
    defaultTitle: 'Volunteer Experience',
    fields: exp,
  },
  publications: {
    type: 'publications',
    label: 'Publications',
    icon: 'PU',
    repeatable: true,
    defaultTitle: 'Publications',
    fields: dated,
  },
  research: {
    type: 'research',
    label: 'Research Experience',
    icon: 'RE',
    repeatable: true,
    defaultTitle: 'Research Experience',
    fields: exp,
  },
  conferences: {
    type: 'conferences',
    label: 'Conferences',
    icon: 'CO',
    repeatable: true,
    defaultTitle: 'Conferences',
    fields: dated,
  },
  memberships: {
    type: 'memberships',
    label: 'Memberships',
    icon: 'ME',
    repeatable: true,
    defaultTitle: 'Memberships',
    fields: dated,
  },
  references: {
    type: 'references',
    label: 'References',
    icon: 'RF',
    repeatable: true,
    defaultTitle: 'References',
    fields: [
      { key: 'title', label: 'Name', kind: 'text' },
      { key: 'subtitle', label: 'Role / Company', kind: 'text' },
      { key: 'description', label: 'Contact', kind: 'text' },
    ],
  },
  interests: {
    type: 'interests',
    label: 'Interests',
    icon: 'IN',
    repeatable: true,
    defaultTitle: 'Interests',
    defaultDisplay: 'tags',
    displayModes: ['tags', 'list'],
    fields: simpleNamed,
  },
  portfolio: {
    type: 'portfolio',
    label: 'Portfolio',
    icon: 'PF',
    repeatable: true,
    defaultTitle: 'Portfolio',
    fields: [
      { key: 'title', label: 'Label', kind: 'text' },
      { key: 'links', label: 'URL', kind: 'links' },
    ],
  },
  social: {
    type: 'social',
    label: 'Social Links',
    icon: 'SO',
    repeatable: true,
    defaultTitle: 'Social Links',
    fields: [
      { key: 'title', label: 'Platform', kind: 'text' },
      { key: 'links', label: 'URL', kind: 'links' },
    ],
  },
  military: {
    type: 'military',
    label: 'Military Service',
    icon: 'MI',
    repeatable: true,
    defaultTitle: 'Military Service',
    fields: exp,
  },
  custom: {
    type: 'custom',
    label: 'Custom Section',
    icon: 'CU',
    repeatable: true,
    defaultTitle: 'Custom Section',
    fields: [
      { key: 'title', label: 'Heading', kind: 'text' },
      { key: 'description', label: 'Content', kind: 'textarea' },
      { key: 'bullets', label: 'Bullet points', kind: 'bullets' },
    ],
  },
};

export const ADDABLE_SECTIONS: SectionType[] = [
  'summary',
  'objective',
  'experience',
  'education',
  'skills',
  'certifications',
  'languages',
  'projects',
  'awards',
  'achievements',
  'volunteer',
  'publications',
  'research',
  'conferences',
  'memberships',
  'references',
  'interests',
  'portfolio',
  'social',
  'military',
  'custom',
];


// === Builder Experience metadata (descriptions / examples / starter content) ===
type StarterMap = Partial<Record<SectionType, { description?: string; examples?: string[]; recommended?: SectionType[]; starter: any[]; example: any }>>;
export const SECTION_META: StarterMap = {
  "experience": {
    "type": "experience",
    "description": "Your professional roles. Lead with impact and quantified outcomes, not duties.",
    "examples": [
      "Senior Product Manager — Acme (2021–Present)",
      "Use action verbs: Led, Shipped, Grew, Reduced"
    ],
    "recommended": [
      "skills",
      "education",
      "summary"
    ],
    "starter": [
      {
        "title": "Senior Software Engineer",
        "subtitle": "Acme Corp",
        "location": "San Francisco, CA",
        "startDate": "2021",
        "endDate": "Present",
        "bullets": [
          "Led migration to a microservices architecture, cutting deploy time by 60%",
          "Mentored 4 engineers; owned the checkout service handling $2M/day"
        ]
      }
    ],
    "example": {
      "title": "Software Engineer",
      "subtitle": "Company Name",
      "location": "City, State",
      "startDate": "2022",
      "endDate": "Present",
      "bullets": [
        "Describe an achievement with a measurable result"
      ]
    }
  },
  "education": {
    "type": "education",
    "description": "Degrees and academic credentials. Recent grads can add coursework and honors.",
    "examples": [
      "B.S. Computer Science — Stanford University",
      "Include GPA only if 3.5+"
    ],
    "recommended": [
      "skills",
      "projects",
      "achievements"
    ],
    "starter": [
      {
        "title": "B.S. Computer Science",
        "subtitle": "University Name",
        "startDate": "2018",
        "endDate": "2022",
        "honors": "Cum Laude",
        "coursework": [
          "Algorithms",
          "Databases",
          "Operating Systems"
        ]
      }
    ],
    "example": {
      "title": "Degree, Field of Study",
      "subtitle": "Institution",
      "startDate": "2019",
      "endDate": "2023"
    }
  },
  "skills": {
    "type": "skills",
    "description": "Technical and professional skills. Choose how they render: tags, bars, dots or a list.",
    "examples": [
      "Group by category: Languages, Frameworks, Tools",
      "Display as tags for ATS-friendly parsing"
    ],
    "recommended": [
      "experience",
      "projects",
      "languages"
    ],
    "starter": [
      {
        "title": "JavaScript",
        "category": "Languages",
        "level": 90
      },
      {
        "title": "React",
        "category": "Frameworks",
        "level": 85
      },
      {
        "title": "AWS",
        "category": "Tools",
        "level": 70
      }
    ],
    "example": {
      "title": "Skill name",
      "category": "Category",
      "level": 75
    }
  },
  "projects": {
    "type": "projects",
    "description": "Side projects, open source or notable work. Lead with outcomes and tech used.",
    "examples": [
      "Link a live demo or repo",
      "Quantify usage: 5k MAU, 1.2k GitHub stars"
    ],
    "recommended": [
      "skills",
      "experience"
    ],
    "starter": [
      {
        "title": "Project Name",
        "subtitle": "Lead Developer",
        "description": "A short description of what the project does and who it serves.",
        "bullets": [
          "Shipped v1 to 1,000+ users in 6 weeks"
        ],
        "technologies": [
          "React",
          "Node.js",
          "PostgreSQL"
        ]
      }
    ],
    "example": {
      "title": "Project Name",
      "subtitle": "Role",
      "description": "What it does and the impact it had"
    }
  },
  "languages": {
    "type": "languages",
    "description": "Spoken languages and proficiency. Render as a list, bars or CEFR levels.",
    "examples": [
      "English — Native",
      "Spanish — B2 (CEFR)"
    ],
    "recommended": [
      "skills"
    ],
    "starter": [
      {
        "title": "English",
        "level": 100,
        "subtitle": "Native"
      },
      {
        "title": "Spanish",
        "level": 60,
        "subtitle": "B2"
      }
    ],
    "example": {
      "title": "Language",
      "subtitle": "Proficiency",
      "level": 50
    }
  },
  "certifications": {
    "type": "certifications",
    "description": "Professional certifications with issuer, dates and credential links.",
    "examples": [
      "AWS Certified Solutions Architect — Associate",
      "Add the credential URL so it is verifiable"
    ],
    "recommended": [
      "skills",
      "experience"
    ],
    "starter": [
      {
        "title": "AWS Certified Solutions Architect – Associate",
        "subtitle": "Amazon Web Services",
        "endDate": "2024",
        "links": [
          {
            "label": "Credential",
            "url": "https://example.com/credential"
          }
        ]
      }
    ],
    "example": {
      "title": "Certification Name",
      "subtitle": "Issuing Organization",
      "endDate": "2024"
    }
  },
  "summary": {
    "type": "summary",
    "description": "A 2–4 sentence professional pitch. Lead with your role, years and core strengths.",
    "examples": [
      "Senior engineer with 8 years building scalable web platforms.",
      "Tailor it to the role you are targeting."
    ],
    "recommended": [
      "experience",
      "skills"
    ],
    "starter": [
      {
        "text": "Results-driven professional with a track record of delivering measurable impact. Skilled in collaboration, problem-solving and shipping high-quality work."
      }
    ],
    "example": {
      "text": "Write 2–4 sentences summarizing your experience and strengths."
    }
  },
  "objective": {
    "type": "objective",
    "description": "A short statement of your career goal. Best for students or career changers.",
    "examples": [
      "Seeking a junior data role to apply my analytics skills."
    ],
    "recommended": [
      "education",
      "skills"
    ],
    "starter": [
      {
        "text": "Motivated graduate seeking a role where I can contribute and grow while delivering value to the team."
      }
    ],
    "example": {
      "text": "State the role you want and what you bring to it."
    }
  },
  "achievements": {
    "type": "achievements",
    "description": "Standout accomplishments with quantified impact. Great for executives.",
    "examples": [
      "Grew ARR from $2M to $10M in 18 months"
    ],
    "recommended": [
      "experience",
      "awards"
    ],
    "starter": [
      {
        "title": "Increased revenue 4x in 18 months",
        "category": "Growth",
        "impact": "Led GTM strategy that scaled ARR from $2M to $10M",
        "metric": "+300%"
      }
    ],
    "example": {
      "title": "Notable achievement",
      "impact": "The measurable result"
    }
  },
  "awards": {
    "type": "awards",
    "description": "Honors and recognitions with the awarding body and year.",
    "examples": [
      "Employee of the Year — 2023"
    ],
    "recommended": [
      "achievements",
      "experience"
    ],
    "starter": [
      {
        "title": "Award Name",
        "subtitle": "Awarding Organization",
        "endDate": "2023"
      }
    ],
    "example": {
      "title": "Award Name",
      "subtitle": "Issuer",
      "endDate": "2023"
    }
  },
  "volunteer": {
    "type": "volunteer",
    "description": "Community and pro bono work. Shows initiative and values.",
    "examples": [
      "Mentor — Code.org (2022–Present)"
    ],
    "recommended": [
      "experience",
      "interests"
    ],
    "starter": [
      {
        "title": "Volunteer Role",
        "subtitle": "Organization",
        "startDate": "2022",
        "endDate": "Present",
        "bullets": [
          "Describe your contribution and its impact"
        ]
      }
    ],
    "example": {
      "title": "Volunteer Role",
      "subtitle": "Organization"
    }
  },
  "publications": {
    "type": "publications",
    "description": "Papers, articles or books. Use a consistent citation style.",
    "examples": [
      "Smith, J. (2023). Title. Journal."
    ],
    "recommended": [
      "research",
      "conferences"
    ],
    "starter": [
      {
        "title": "Publication Title",
        "subtitle": "Journal / Publisher",
        "endDate": "2023"
      }
    ],
    "example": {
      "title": "Publication Title",
      "subtitle": "Venue",
      "endDate": "2023"
    }
  },
  "research": {
    "type": "research",
    "description": "Research experience and projects, including methods and findings.",
    "examples": [
      "Research Assistant — ML Lab"
    ],
    "recommended": [
      "publications",
      "education"
    ],
    "starter": [
      {
        "title": "Research Project",
        "subtitle": "Lab / Institution",
        "startDate": "2022",
        "endDate": "2023",
        "bullets": [
          "Summarize the research question and your contribution"
        ]
      }
    ],
    "example": {
      "title": "Research Topic",
      "subtitle": "Lab"
    }
  },
  "conferences": {
    "type": "conferences",
    "description": "Talks and conferences attended or presented at.",
    "examples": [
      "Speaker — React Conf 2023"
    ],
    "recommended": [
      "publications"
    ],
    "starter": [
      {
        "title": "Conference / Talk Title",
        "subtitle": "Event",
        "endDate": "2023"
      }
    ],
    "example": {
      "title": "Conference",
      "subtitle": "Event",
      "endDate": "2023"
    }
  },
  "memberships": {
    "type": "memberships",
    "description": "Professional associations and memberships.",
    "examples": [
      "Member — IEEE"
    ],
    "recommended": [
      "certifications"
    ],
    "starter": [
      {
        "title": "Organization Name",
        "subtitle": "Member",
        "endDate": "Present"
      }
    ],
    "example": {
      "title": "Organization",
      "subtitle": "Role"
    }
  },
  "references": {
    "type": "references",
    "description": "Professional references. Often best as available on request.",
    "examples": [
      "Jane Doe — Manager, Acme"
    ],
    "recommended": [],
    "starter": [
      {
        "title": "Reference Name",
        "subtitle": "Title, Company",
        "description": "email@example.com"
      }
    ],
    "example": {
      "title": "Reference Name",
      "subtitle": "Title, Company"
    }
  },
  "interests": {
    "type": "interests",
    "description": "Hobbies and interests that add personality. Keep it concise.",
    "examples": [
      "Photography, Trail running, Chess"
    ],
    "recommended": [
      "volunteer"
    ],
    "starter": [
      {
        "title": "Photography"
      },
      {
        "title": "Trail running"
      },
      {
        "title": "Open source"
      }
    ],
    "example": {
      "title": "Interest"
    }
  },
  "portfolio": {
    "type": "portfolio",
    "description": "Links to your work, case studies or demos.",
    "examples": [
      "Behance, Dribbble, personal site"
    ],
    "recommended": [
      "projects",
      "social"
    ],
    "starter": [
      {
        "title": "Portfolio",
        "links": [
          {
            "label": "Website",
            "url": "https://example.com"
          }
        ]
      }
    ],
    "example": {
      "title": "Label",
      "links": [
        {
          "label": "Link",
          "url": "https://"
        }
      ]
    }
  },
  "social": {
    "type": "social",
    "description": "Social and professional profiles.",
    "examples": [
      "LinkedIn, GitHub, X"
    ],
    "recommended": [
      "portfolio"
    ],
    "starter": [
      {
        "title": "LinkedIn",
        "links": [
          {
            "label": "LinkedIn",
            "url": "https://linkedin.com/in/you"
          }
        ]
      }
    ],
    "example": {
      "title": "Platform",
      "links": [
        {
          "label": "Link",
          "url": "https://"
        }
      ]
    }
  },
  "military": {
    "type": "military",
    "description": "Military service, rank and duties.",
    "examples": [
      "Sergeant — U.S. Army"
    ],
    "recommended": [
      "experience"
    ],
    "starter": [
      {
        "title": "Rank / Role",
        "subtitle": "Branch",
        "startDate": "2018",
        "endDate": "2022",
        "bullets": [
          "Describe responsibilities and leadership"
        ]
      }
    ],
    "example": {
      "title": "Rank",
      "subtitle": "Branch"
    }
  },
  "custom": {
    "type": "custom",
    "description": "A flexible section for anything not covered above.",
    "examples": [
      "Speaking, Patents, Press"
    ],
    "recommended": [],
    "starter": [
      {
        "title": "Section Heading",
        "description": "Add your content here."
      }
    ],
    "example": {
      "title": "Heading",
      "description": "Content"
    }
  }
} as any;

// Merge presentation/coaching metadata + extra display modes into the registry
// so SECTION_REGISTRY stays the single source of truth.
const EXTRA_DISPLAY: Partial<Record<SectionType, { modes: string[]; def: string }>> = {
  languages: { modes: ["list", "bars", "dots", "cefr"], def: "list" },
};
(Object.keys(SECTION_REGISTRY) as SectionType[]).forEach((t) => {
  const def = SECTION_REGISTRY[t];
  const m = (SECTION_META as any)[t];
  if (m) {
    if (m.description) def.description = m.description;
    if (m.examples) def.examples = m.examples;
    if (m.recommended) def.recommended = m.recommended;
  }
  const ed = (EXTRA_DISPLAY as any)[t];
  if (ed) {
    if (!def.displayModes) def.displayModes = ed.modes;
    if (!def.defaultDisplay) def.defaultDisplay = ed.def;
  }
});

let _seed = 0;
const seedId = (p: string) => p + String.fromCharCode(95) + Date.now().toString(36) + String.fromCharCode(95) + ++_seed;

// Section Templates: starter content so a new section is never blank.
export function starterItems(type: SectionType): SectionItem[] {
  const m = (SECTION_META as any)[type];
  const arr = (m && Array.isArray(m.starter)) ? m.starter : [];
  return arr.map((it: any) => ({ id: seedId(String.fromCharCode(105)), ...it })) as SectionItem[];
}

// A single example/placeholder item used when the user clicks Add item.
export function exampleItem(type: SectionType): SectionItem {
  const m = (SECTION_META as any)[type];
  const base = (m && m.example) ? m.example : {};
  return { id: seedId(String.fromCharCode(105)), ...base } as SectionItem;
}

export function sectionDescription(type: SectionType): string {
  return SECTION_REGISTRY[type].description || String.fromCharCode(39, 39);
}
