


export interface Profile {
  name: string;
  initials: string;
  titles: string[];
  location: string;
  email: string;
  scholar: string;
  github: string;
  linkedin: string;
  twitter: string;
  researchGate: string;
  orcid: string;
  facebook: string;
  instagram: string;
  x: string;
  youtube: string;
  skype: string;
  cvLink: string;
  photo: string;
  heroBackground: string;
  aboutPhoto: string;
  aboutQuote: string;
  navbarSubtitle: string;
  yearsOfExperience: string;
  contactDescription: string;
  footerText: string;
  lastUpdated?: string;
  calendly: string;
  audioGreeting: string;
  privacyUrl: string;
  termsUrl: string;
  neuralSettings: {
    speed: number;
    density: number;
  };
  dnaSettings: {
    speed: number;
    curvature: number;
    density: number;
  };
  uiSettings: {
    language: 'en' | 'bn'; // English or Bengali (Native)
  };
  availability: {
    status: string;
    available: boolean;
  };
  stats: {
    citations: number;
    hIndex: number;
    i10Index: number;
  };
  sectionVisibility: {
    about: boolean;
    news: boolean;
    education: boolean;
    experience: boolean;
    research: boolean;
    publications: boolean;
    achievements: boolean;
    skills: boolean;
    blog: boolean;
    links: boolean;
    gallery: boolean;
    personalDev: boolean;
    dna: boolean;
    contact: boolean;
    testimonials: boolean;
    affiliations: boolean;
  };
  about: string;
  customSocials: SocialLink[];
  sectionText: {
    about: SectionText;
    news: SectionText;
    education: SectionText;
    experience: SectionText;
    research: SectionText;
    publications: SectionText;
    achievements: SectionText;
    skills: SectionText;
    blog: SectionText;
    links: SectionText;
    gallery: SectionText;
    personalDev: SectionText;
    dna: SectionText;
    contact: SectionText;
    testimonials: SectionText;
    affiliations: SectionText;
  }
}

export interface SocialLink {
  id: string;
  platform: string;
  url: string;
  icon: string;
}

export interface SectionText {
  title: string;
  description: string;
  subtitle1?: string;
  subtitle2?: string;
  subtitle3?: string;
  subtitle4?: string;
}

export interface Publication {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  year: number;
  type: 'Journal' | 'Conference' | 'Preprint' | 'Under Review' | 'Literature Review';
  citations: number;
  url: string;
  doi?: string;
  pdfUrl?: string;
  impactFactor?: string; // New field for manual metrics (e.g. "IF: 6.2", "Q1")
  tags: string[];
}

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  technologies: string[];
  links: {
    code?: string;
    paper?: string;
    demo?: string;
  };
  impact: string;
  complexity: number;
}

export interface TimelineItem {
  id?: string;
  year: string;
  title: string;
  institution: string;
  description: string;
  type: 'education' | 'experience' | 'award';
  majorCourses?: string[];
  syllabusUrl?: string;
  passingYear?: string;
  heldIn?: string;
}

export interface Skill {
  id?: string;
  name: string;
  level: number;
  category: 'lab' | 'computational' | 'soft' | 'tools';
}

export interface BlogPost {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  readTime: string;
  image?: string;
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  category: 'Conference' | 'Award' | 'Publication' | 'Grant' | 'Position' | 'General';
  summary: string;
  link?: string;
  featured?: boolean;
}

export interface Award {
  id: string;
  title: string;
  issuer: string;
  year: string;
  description: string;
}

export interface Resource {
  id: string;
  title: string;
  url: string;
  description: string;
  category: string;
  icon?: string;
}

export interface PersonalDevItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  year: string;
  icon?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  institution: string;
  text: string;
  image: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface Affiliation {
  id: string;
  role: string;
  organization: string;
  period: string;
  type: 'Membership' | 'Editorial' | 'Committee';
}
