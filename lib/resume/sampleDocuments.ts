// ============================================================================
// Sample Resume Documents — diverse personas for gallery previews.
// Intentionally varied section combinations so the gallery shows that
// templates are flexible SYSTEMS, not fixed Summary/Experience/Edu/Skills.
// ============================================================================
import { ResumeDocument, ResumeSection, RESUME_SCHEMA_VERSION } from './types';

let _id = 0;
const uid = (p: string) => p + '_' + (++_id);

function doc(partial: { templateId: string; basics: ResumeDocument['basics']; sections: ResumeSection[] }): ResumeDocument {
  return {
    version: RESUME_SCHEMA_VERSION,
    id: uid('doc'),
    templateId: partial.templateId,
    basics: partial.basics,
    sections: partial.sections,
    settings: { pageSize: 'A4', density: 'normal', dateFormat: 'MMM YYYY', showPhoto: false },
    updatedAt: Date.now(),
  };
}

// section builder helpers (typed) -----------------------------------------
const sum = (text: string): ResumeSection => ({ id: uid('s'), type: 'summary', title: 'Professional Summary', visible: true, mode: 'simple', items: [{ id: uid('i'), text }] });
const obj = (text: string): ResumeSection => ({ id: uid('s'), type: 'objective', title: 'Career Objective', visible: true, mode: 'simple', items: [{ id: uid('i'), text }] });
const exp = (items: any[]): ResumeSection => ({ id: uid('s'), type: 'experience', title: 'Work Experience', visible: true, mode: 'advanced', items: items.map(x => ({ id: uid('i'), ...x })) });
const edu = (items: any[]): ResumeSection => ({ id: uid('s'), type: 'education', title: 'Education', visible: true, mode: 'simple', items: items.map(x => ({ id: uid('i'), ...x })) });
const skills = (display: any, items: any[]): ResumeSection => ({ id: uid('s'), type: 'skills', title: 'Skills', visible: true, mode: 'advanced', display, items: items.map(x => ({ id: uid('i'), ...x })) });
const langs = (display: any, items: any[]): ResumeSection => ({ id: uid('s'), type: 'languages', title: 'Languages', visible: true, mode: 'simple', display, items: items.map(x => ({ id: uid('i'), ...x })) });
const projects = (items: any[]): ResumeSection => ({ id: uid('s'), type: 'projects', title: 'Projects', visible: true, mode: 'simple', items: items.map(x => ({ id: uid('i'), ...x })) });
const certs = (items: any[]): ResumeSection => ({ id: uid('s'), type: 'certifications', title: 'Certifications', visible: true, mode: 'simple', items: items.map(x => ({ id: uid('i'), ...x })) });
const awards = (items: any[]): ResumeSection => ({ id: uid('s'), type: 'awards', title: 'Awards', visible: true, mode: 'simple', items: items.map(x => ({ id: uid('i'), ...x })) });
const achv = (items: any[]): ResumeSection => ({ id: uid('s'), type: 'achievements', title: 'Key Achievements', visible: true, mode: 'simple', items: items.map(x => ({ id: uid('i'), ...x })) });
const pubs = (items: any[]): ResumeSection => ({ id: uid('s'), type: 'publications', title: 'Publications', visible: true, mode: 'simple', items: items.map(x => ({ id: uid('i'), ...x })) });
const vol = (items: any[]): ResumeSection => ({ id: uid('s'), type: 'volunteer', title: 'Volunteer Experience', visible: true, mode: 'simple', items: items.map(x => ({ id: uid('i'), ...x })) });
const interests = (items: string[]): ResumeSection => ({ id: uid('s'), type: 'interests', title: 'Interests', visible: true, mode: 'simple', display: 'tags', items: items.map(n => ({ id: uid('i'), name: n })) });

// ---------------------------------------------------------------------------
// 1) Executive — Strategy leader (Summary, Achievements, Experience, Edu, Skills)
const execDoc = doc({
  templateId: 'monarch',
  basics: { fullName: 'Daniel R. Mercado', headline: 'Management Consultant · Strategy & Operations', contacts: [
    { id: uid('c'), kind: 'location', value: 'Madrid, Spain' },
    { id: uid('c'), kind: 'email', value: 'daniel.mercado@email.com' },
    { id: uid('c'), kind: 'linkedin', value: 'linkedin.com/in/dmercado' } ] },
  sections: [
    sum('Strategy consultant with 8+ years driving growth, cost transformation and operational turnarounds for Fortune 500 and PE-backed clients across retail, financial services and industrials.'),
    achv([
      { title: 'Unlocked $45M revenue upside', metric: '$45M', description: 'Led growth-strategy engagements across three consumer and retail accounts.' },
      { title: 'Delivered 18% OpEx reduction', metric: '18%', description: 'Designed a cost-optimization program saving $28M annually.' },
      { title: 'Led $300M acquisition diligence', metric: '$300M', description: 'Built the value-creation model across four business units.' } ]),
    exp([
      { title: 'Engagement Manager', employer: 'Global Strategy Firm', location: 'Madrid', startDate: '2021', endDate: 'Present', bullets: ['Led 6-person teams on growth-strategy engagements, unlocking $45M in identified upside.','Owned C-suite relationships across five accounts, achieving a 90% renewal rate.'] },
      { title: 'Business Analyst', employer: 'Consulting Firm', location: 'Barcelona', startDate: '2018', endDate: '2021', bullets: ['Developed a pricing strategy raising gross margin 6 p.p. across a 1,200-SKU portfolio.','Automated reporting, cutting cycle time 40% and freeing 200+ analyst hours/quarter.'] } ]),
    edu([ { degree: 'MBA', institution: 'Top-Tier Business School', endDate: '2020' }, { degree: 'BSc Economics', institution: 'University Name', endDate: '2016' } ]),
    skills('tags', [ { name: 'Corporate Strategy' }, { name: 'M&A Diligence' }, { name: 'Cost Optimization' }, { name: 'Operating Model Design' }, { name: 'Stakeholder Management' } ]),
  ],
});

// 2) Software Engineer — (Summary, Experience, Projects, Skills, Education) skills as bars
const sweDoc = doc({
  templateId: 'circuit',
  basics: { fullName: 'Alex Moreno', headline: 'Staff Software Engineer · Platform & Distributed Systems', contacts: [
    { id: uid('c'), kind: 'location', value: 'Remote · Madrid' },
    { id: uid('c'), kind: 'email', value: 'alex.moreno@email.com' },
    { id: uid('c'), kind: 'github', value: 'github.com/alexmoreno' } ] },
  sections: [
    sum('Staff engineer specializing in high-scale distributed systems. I design platforms that stay fast and reliable under billions of daily requests.'),
    exp([
      { title: 'Staff Software Engineer', employer: 'Scale-Up · Series D', location: 'Remote', startDate: '2021', endDate: 'Present', technologies: ['Go','Kafka','Redis'], bullets: ['Re-architected the payments platform into an event-driven system scaling to 2.5B daily requests at 99.99% uptime.','Cut p99 latency 38% by redesigning the caching and data layer.','Mentored 8 engineers and established design-review and on-call standards.'] },
      { title: 'Senior Software Engineer', employer: 'Tech Company', location: 'Madrid', startDate: '2018', endDate: '2021', technologies: ['Kafka','Spark'], bullets: ['Built a real-time data pipeline processing 4 TB/day with sub-minute freshness.','Shipped a GraphQL gateway adopted by 30+ internal teams.'] } ]),
    projects([
      { name: 'ratekit', role: 'Author', description: 'Go rate-limiter library, 3.4k stars.', technologies: ['Go'] },
      { name: 'obsd', role: 'Maintainer', description: 'Lightweight observability sidecar for microservices.', technologies: ['Rust','OpenTelemetry'] } ]),
    skills('bars', [ { name: 'Go', level: 95 }, { name: 'Python', level: 85 }, { name: 'Kubernetes', level: 88 }, { name: 'Distributed Systems', level: 92 }, { name: 'PostgreSQL', level: 80 } ]),
    edu([ { degree: 'MSc Computer Science', institution: 'University Name', endDate: '2016' }, { degree: 'BSc Computer Science', institution: 'University Name', endDate: '2014' } ]),
  ],
});

// 3) Academic researcher — (Summary, Education, Research, Publications, Skills, Awards)
const academicDoc = doc({
  templateId: 'scholar',
  basics: { fullName: 'Dr. Priya Nandakumar', headline: 'Postdoctoral Researcher · Computational Biology', contacts: [
    { id: uid('c'), kind: 'location', value: 'Cambridge, UK' },
    { id: uid('c'), kind: 'email', value: 'p.nandakumar@univ.edu' } ] },
  sections: [
    sum('Computational biologist studying gene-regulatory networks. Author of 14 peer-reviewed papers with a focus on reproducible, open-source methods.'),
    edu([ { degree: 'PhD Computational Biology', institution: 'University of Cambridge', endDate: '2021' }, { degree: 'MSc Bioinformatics', institution: 'IIT Bombay', endDate: '2016' } ]),
    exp([ { title: 'Postdoctoral Researcher', employer: 'Sanger Institute', startDate: '2021', endDate: 'Present', bullets: ['Lead a 3-person sub-group modelling single-cell regulatory dynamics.','Secured a 2-year fellowship grant (\u00a3220k) as co-investigator.'] } ]),
    pubs([
      { title: 'Regulatory dynamics in single-cell lineages', venue: 'Nature Methods', date: '2023', authors: 'Nandakumar P. et al.' },
      { title: 'A reproducible pipeline for ATAC-seq', venue: 'Bioinformatics', date: '2022', authors: 'Nandakumar P., Lee J.' },
      { title: 'Benchmarking GRN inference', venue: 'Genome Biology', date: '2021', authors: 'Nandakumar P. et al.' } ]),
    awards([ { title: 'Best Paper Award', issuer: 'RECOMB', date: '2023' }, { title: 'Doctoral Fellowship', issuer: 'Gates Cambridge', date: '2017' } ]),
    skills('tags', [ { name: 'Python' }, { name: 'R' }, { name: 'Single-cell genomics' }, { name: 'Bayesian modelling' }, { name: 'Snakemake' } ]),
  ],
});

// 4) Designer — (Summary, Experience, Skills as dots, Portfolio, Education) photo
const designerDoc = doc({
  templateId: 'atelier',
  basics: { fullName: 'Olivia Braydon', headline: 'Senior Product & Brand Designer', contacts: [
    { id: uid('c'), kind: 'email', value: 'hello@oliviabraydon.com' },
    { id: uid('c'), kind: 'website', value: 'oliviabraydon.com' },
    { id: uid('c'), kind: 'location', value: 'Lisbon, Portugal' } ] },
  sections: [
    sum('Designer working at the intersection of brand and product. I turn ambiguous ideas into clear, beautiful, shippable experiences.'),
    exp([
      { title: 'Senior Product Designer', employer: 'Studio Maragoni', startDate: '2020', endDate: 'Present', bullets: ['Led end-to-end design for a fashion commerce app reaching 1.2M users.','Built and maintained the design system adopted across 4 product teams.'] },
      { title: 'Brand Designer', employer: 'The Nevv School', startDate: '2018', endDate: '2020', bullets: ['Rebranded the school identity, refreshing logo, type and campaign system.'] } ]),
    skills('dots', [ { name: 'Figma', level: 100 }, { name: 'Brand Identity', level: 90 }, { name: 'Prototyping', level: 85 }, { name: 'Design Systems', level: 90 }, { name: 'Illustration', level: 70 } ]),
    langs('list', [ { name: 'English', proficiency: 'Fluent' }, { name: 'Portuguese', proficiency: 'Native' }, { name: 'French', proficiency: 'B2' } ]),
    edu([ { degree: 'BA Fashion, Art & Design', institution: 'Instituto Maragoni', endDate: '2018' } ]),
  ],
});

// 5) Consultant — (Summary, Achievements, Experience, Skills, Certifications) banner
const consultantDoc = doc({
  templateId: 'ledger',
  basics: { fullName: 'Eleanor Whitfield', headline: 'Operations Consultant · Supply Chain & Transformation', contacts: [
    { id: uid('c'), kind: 'location', value: 'Chicago, IL' },
    { id: uid('c'), kind: 'email', value: 'e.whitfield@email.com' },
    { id: uid('c'), kind: 'phone', value: '+1 (312) 555 0148' } ] },
  sections: [
    sum('Operations leader turning complex supply-chain problems into measurable cost and service wins for industrial and retail clients.'),
    achv([ { title: 'Cut logistics cost 22%', metric: '22%' }, { title: 'Reduced lead time 9 days', metric: '9d' }, { title: 'Recovered $14M working capital', metric: '$14M' } ]),
    exp([
      { title: 'Director of Operations', employer: 'Meridian Industries', startDate: '2020', endDate: 'Present', bullets: ['Standardised supply-chain processes across 14 plants, cutting cost 22%.','Implemented an S&OP process that raised forecast accuracy to 94%.'] },
      { title: 'Senior Operations Manager', employer: 'Coldwell Group', startDate: '2016', endDate: '2020', bullets: ['Led a procurement transformation saving $8.2M annually.'] } ]),
    skills('tags', [ { name: 'S&OP' }, { name: 'Lean Six Sigma' }, { name: 'Procurement' }, { name: 'Vendor Management' }, { name: 'Data Analysis' } ]),
    certs([ { name: 'Lean Six Sigma Black Belt', issuer: 'ASQ', date: '2019' }, { name: 'APICS CPIM', issuer: 'ASCM', date: '2017' } ]),
  ],
});

// 6) Project Manager — (Objective, Experience, Skills as bars, Certifications, Edu)
const pmDoc = doc({
  templateId: 'meridian',
  basics: { fullName: 'Marcus Adeyemi', headline: 'Senior Project Manager · PMP', contacts: [
    { id: uid('c'), kind: 'location', value: 'Toronto, Canada' },
    { id: uid('c'), kind: 'email', value: 'marcus.adeyemi@email.com' } ] },
  sections: [
    obj('PMP-certified project manager seeking to lead complex cross-functional programs, delivering on time and under budget.'),
    exp([
      { title: 'Senior Project Manager', employer: 'BuildTech Inc.', startDate: '2019', endDate: 'Present', bullets: ['Delivered a $12M ERP rollout across 6 sites two weeks ahead of schedule.','Managed cross-functional teams of up to 25 across three time zones.'] },
      { title: 'Project Manager', employer: 'Halcyon Cloud', startDate: '2015', endDate: '2019', bullets: ['Ran the PMO for a 40-person engineering org, lifting on-time delivery to 92%.'] } ]),
    skills('bars', [ { name: 'Agile / Scrum', level: 95 }, { name: 'Risk Management', level: 88 }, { name: 'Stakeholder Comms', level: 90 }, { name: 'Budgeting', level: 85 } ]),
    certs([ { name: 'PMP', issuer: 'PMI', date: '2018' }, { name: 'Certified ScrumMaster', issuer: 'Scrum Alliance', date: '2016' } ]),
    edu([ { degree: 'BBA, Management', institution: 'York University', endDate: '2014' } ]),
  ],
});

// 7) Student — (Objective, Education, Projects, Skills, Volunteer, Interests)
const studentDoc = doc({
  templateId: 'aria',
  basics: { fullName: 'Samantha Azar', headline: 'Communications & Media Student', contacts: [
    { id: uid('c'), kind: 'location', value: 'Sydney, Australia' },
    { id: uid('c'), kind: 'email', value: 'samazar2019@email.com' } ] },
  sections: [
    obj('Motivated Communications & Media student passionate about fashion, beauty and lifestyle, seeking a marketing internship to apply creative and analytical skills.'),
    edu([ { degree: 'Bachelor of Communications & Media', institution: 'University of Wollongong', startDate: '2021', endDate: '2024' }, { degree: 'Diploma of Business (Fashion)', institution: 'Orana College', endDate: '2020' } ]),
    projects([ { name: 'Campus Magazine Relaunch', role: 'Editor', description: 'Led a 6-person team to relaunch the student magazine, tripling readership.' }, { name: 'Local Brand Campaign', role: 'Social Lead', description: 'Ran an Instagram campaign that grew a cafe\u2019s following by 4x.' } ]),
    skills('tags', [ { name: 'Adobe Illustrator' }, { name: 'Canva' }, { name: 'Copywriting' }, { name: 'Social Media' }, { name: 'Event Coordination' } ]),
    vol([ { title: 'Volunteer Coordinator', employer: 'City Food Bank', startDate: '2022', endDate: 'Present', bullets: ['Coordinate weekly shifts for 20+ volunteers.'] } ]),
    interests(['Fashion','Photography','Travel','Cooking']),
  ],
});

// 8) Career changer — (Summary, Skills, Experience, Education, Certifications)
const changerDoc = doc({
  templateId: 'linen',
  basics: { fullName: 'Sergey Zaharov', headline: 'Aspiring UX Designer · Former Operations Lead', contacts: [
    { id: uid('c'), kind: 'location', value: 'Berlin, Germany' },
    { id: uid('c'), kind: 'email', value: 'sergey.z@email.com' } ] },
  sections: [
    sum('Operations professional transitioning into UX design, combining 6 years of process expertise with new product-design craft and a strong portfolio.'),
    skills('tags', [ { name: 'Figma' }, { name: 'User Research' }, { name: 'Wireframing' }, { name: 'Process Mapping' }, { name: 'Stakeholder Mgmt' } ]),
    exp([
      { title: 'UX Design Intern', employer: 'Studio Pulse', startDate: '2024', endDate: 'Present', bullets: ['Redesigned an onboarding flow, lifting activation 18% in an A/B test.'] },
      { title: 'Operations Lead', employer: 'LogiCorp', startDate: '2018', endDate: '2023', bullets: ['Managed a 12-person operations team and redesigned core workflows.'] } ]),
    edu([ { degree: 'UX Design Certificate', institution: 'CareerFoundry', endDate: '2024' }, { degree: 'BA Management', institution: 'HSE University', endDate: '2017' } ]),
    certs([ { name: 'Google UX Design', issuer: 'Google', date: '2024' } ]),
  ],
});

// 9) Sales leader — (Summary, Achievements/KPIs, Experience, Skills, Education) banner
const salesDoc = doc({
  templateId: 'vertex',
  basics: { fullName: 'Valentina Solis', headline: 'Brand & Growth Marketing Lead', contacts: [
    { id: uid('c'), kind: 'location', value: 'Madrid, Spain' },
    { id: uid('c'), kind: 'email', value: 'valentina.solis@email.com' } ] },
  sections: [
    sum('Marketing leader who builds brands and the growth engine behind them, connecting sharp positioning with full-funnel performance.'),
    achv([ { title: '+180% YoY revenue growth', metric: '+180%' }, { title: '4.2x return on ad spend', metric: '4.2x' }, { title: '-34% customer acquisition cost', metric: '-34%' }, { title: '250K community built', metric: '250K' } ]),
    exp([
      { title: 'Head of Marketing', employer: 'Consumer Brand', startDate: '2021', endDate: 'Present', bullets: ['Led full-funnel strategy that grew revenue +180% YoY.','Scaled paid media to 4.2x ROAS while cutting CAC 34%.'] },
      { title: 'Senior Marketing Manager', employer: 'Tech Scale-Up', startDate: '2018', endDate: '2021', bullets: ['Launched a lifecycle program lifting retention 22% and LTV 1.6x.'] } ]),
    skills('tags', [ { name: 'Brand Strategy' }, { name: 'Growth' }, { name: 'Lifecycle / CRM' }, { name: 'Analytics' }, { name: 'Go-to-Market' } ]),
    edu([ { degree: 'BA Marketing & Communications', institution: 'University Name', endDate: '2016' } ]),
  ],
});

// 10) HR / Admin professional — sidebar w/ photo (Summary, Skills, Experience, Edu, Langs)
const hrDoc = doc({
  templateId: 'sage',
  basics: { fullName: 'Elena Fuentes', headline: 'Human Resources Specialist · Talent & People Ops', contacts: [
    { id: uid('c'), kind: 'location', value: 'Buenos Aires, Argentina' },
    { id: uid('c'), kind: 'email', value: 'elena.fuentes@email.com' },
    { id: uid('c'), kind: 'phone', value: '+54 11 1234 5678' } ] },
  sections: [
    sum('HR specialist with 12+ years in talent management, organizational development and compensation & benefits administration.'),
    skills('list', [ { name: 'Talent Management' }, { name: 'Recruitment & Selection' }, { name: 'Conflict Resolution' }, { name: 'Performance Reviews' }, { name: 'HRIS Tools' } ]),
    exp([
      { title: 'HR Specialist', employer: 'Ariova Industries', startDate: '2016', endDate: 'Present', bullets: ['Built a training program that cut turnover 20%.','Designed a compensation strategy keeping pay competitive market-wide.'] },
      { title: 'HR Assistant', employer: 'Soto y Ochoa', startDate: '2012', endDate: '2016', bullets: ['Supported recruitment, filling 100+ vacancies per year.'] } ]),
    edu([ { degree: 'Degree in Human Resources', institution: 'Borcelle University', endDate: '2010' } ]),
    langs('list', [ { name: 'Spanish', proficiency: 'Native' }, { name: 'English', proficiency: 'Advanced' } ]),
  ],
});

export const SAMPLE_DOCUMENTS: ResumeDocument[] = [
  execDoc, sweDoc, academicDoc, designerDoc, consultantDoc,
  pmDoc, studentDoc, changerDoc, salesDoc, hrDoc,
];

// Map templateId -> a sample document showcasing that template.
export const SAMPLE_BY_TEMPLATE: Record<string, ResumeDocument> = SAMPLE_DOCUMENTS.reduce(
  (acc, d) => { acc[d.templateId] = d; return acc; }, {} as Record<string, ResumeDocument>,
);

export function sampleForTemplate(templateId: string): ResumeDocument {
  return SAMPLE_BY_TEMPLATE[templateId] || SAMPLE_DOCUMENTS[0];
}
