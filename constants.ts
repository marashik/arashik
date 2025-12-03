
import { BlogPost, Project, Publication, Skill, TimelineItem, Award, Resource, PersonalDevItem, Testimonial, Affiliation, Profile, NewsItem } from './types';

export const PROFILE: Profile = {
  name: "Md. Ashiqur Rahman Ashik",
  initials: "ARA",
  titles: [
    "Translational Molecular Biologist"
  ],
  location: "Dinajpur, Bangladesh",
  email: "a.r.aashique07@gmail.com",
  scholar: "https://scholar.google.com", 
  github: "https://github.com",
  linkedin: "https://linkedin.com",
  twitter: "https://twitter.com",
  researchGate: "https://www.researchgate.net/profile/Md-Ashiqur-Ashik?ev=hdr_xprf",
  orcid: "https://orcid.org/",
  facebook: "https://facebook.com",
  instagram: "https://instagram.com",
  x: "https://x.com",
  youtube: "https://youtube.com",
  skype: "skype:A R Ashik?chat",
  cvLink: "#",
  calendly: "https://calendly.com/",
  audioGreeting: "", 
  privacyUrl: "#",
  termsUrl: "#",
  photo: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&h=400&auto=format&fit=crop", 
  heroBackground: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop",
  aboutPhoto: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=600&h=700&auto=format&fit=crop",
  aboutQuote: "\"Integrating in silico, in vitro, and in vivo approaches for precision medicine.\"",
  navbarSubtitle: "Research",
  yearsOfExperience: "2+",
  contactDescription: "Based in Bangladesh. Reach out for collaborations in cancer systems biology, drug repurposing, or molecular research.",
  footerText: "© 2024 Md. Ashiqur Rahman Ashik. All rights reserved. Last Update: " + new Date().toLocaleDateString(),
  lastUpdated: new Date().toISOString(),
  neuralSettings: {
    speed: 2.5,
    density: 15000 
  },
  dnaSettings: {
    speed: 50,
    curvature: 50,
    density: 50
  },
  uiSettings: {
    language: 'en'
  },
  availability: {
    status: "Open to opportunities",
    available: true
  },
  stats: {
    citations: 5,
    hIndex: 2,
    i10Index: 0
  },
  sectionVisibility: {
    about: true,
    news: true,
    education: true,
    experience: true,
    research: true,
    publications: true,
    achievements: true,
    skills: true,
    blog: true,
    links: true,
    gallery: true,
    personalDev: true,
    dna: true,
    contact: true,
    testimonials: true,
    affiliations: true
  },
  customSocials: [],
  about: `I am a Research Assistant at the Laboratory of Molecular and Cellular Research, Islamic University, Kushtia. My work sits at the intersection of wet-lab molecular biology and dry-lab computational intelligence. I specialize in decoding complex signaling networks in cancer progression (specifically Breast and Prostate cancer) and metabolic disorders like Type 2 Diabetes using systems biology approaches and drug repurposing strategies. I have experience in multi-pronged approaches combining in silico, in vitro, and in vivo studies.`,
  sectionText: {
    about: {
      title: "About Me",
      description: "Brief biography and research interests."
    },
    news: {
      title: "News & Updates",
      description: "Latest announcements, conference acceptances, and research highlights."
    },
    education: {
      title: "Education",
      description: "Academic credentials and qualifications."
    },
    experience: {
      title: "Professional Experience",
      description: "Research positions and professional roles held."
    },
    research: {
      title: "Research",
      description: "Selected research projects and thesis work."
    },
    publications: {
      title: "Publications",
      description: "Journal articles and conference proceedings."
    },
    achievements: {
      title: "Achievements & Recognitions",
      description: "Honors and scholarships celebrating scientific excellence."
    },
    skills: {
      title: "Technical Arsenal",
      description: "Comprehensive toolkit spanning Wet Lab, Dry Lab, and Software.",
      subtitle1: "Dry Lab Expertise",
      subtitle2: "Wet Lab Expertise",
      subtitle3: "Tools & Software",
      subtitle4: "Soft Skills"
    },
    blog: {
      title: "Blog & Notes",
      description: "Thoughts, tutorials, and research updates."
    },
    links: {
      title: "Important Links",
      description: "Curated resources organized by scientific workflows."
    },
    gallery: {
      title: "Gallery",
      description: "Moments from the lab and academic life."
    },
    personalDev: {
      title: "Trainings & Development",
      description: "Workshops, certifications, and leadership roles."
    },
    dna: {
      title: "Research Evolution DNA",
      description: "Visualizing the complexity of research domains."
    },
    contact: {
      title: "Collaboration Hub",
      description: "Open to discussing innovative ideas and research collaborations."
    },
    testimonials: {
      title: "References",
      description: "Mentors and supervisors."
    },
    affiliations: {
      title: "Work & Affiliations",
      description: "Professional memberships and organizational roles.",
      subtitle1: "Work History",
      subtitle2: "Memberships & Affiliations"
    }
  }
};

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: "n1",
    title: "Paper Accepted in Phytomedicine",
    date: "Sep 2025",
    category: "Publication",
    summary: "Our manuscript 'Heliotropium indicum leaf extract mitigates hyperglycemia' has been accepted for publication. This work bridges ethnopharmacology and molecular docking.",
    link: "#",
    featured: true
  },
  {
    id: "n2",
    title: "Presented at National Biotech Conference",
    date: "Aug 2025",
    category: "Conference",
    summary: "Presented a poster on 'Computational Drug Repurposing for Prostate Cancer' at the 5th National Biotechnology Conference, Dhaka.",
    link: "#",
    featured: false
  },
  {
    id: "n3",
    title: "Research Assistant Position Extension",
    date: "Jan 2025",
    category: "Position",
    summary: "Contract renewed at the Laboratory of Molecular and Cellular Research to lead the new breast cancer biomarker project.",
    featured: false
  },
  {
    id: "n4",
    title: "Completed Advanced Bioinformatics Workshop",
    date: "Dec 2024",
    category: "Award",
    summary: "Successfully completed a 30-day intensive training on NGS data analysis and variant calling pipelines.",
    featured: false
  }
];

export const TIMELINE: TimelineItem[] = [
  {
    year: "Jan 2022 - Present",
    title: "Research Assistant",
    institution: "Laboratory of Molecular and Cellular Research, Islamic University",
    description: "Conducting multi-pronged studies (in silico, in vitro, in vivo) on Type 2 Diabetes, inflammation, and cancer. Expertise in molecular docking, ADMET profiling, and MD simulations.",
    type: "experience"
  },
  {
    year: "Jan 2022 - June 2023",
    title: "Master of Science (M.Sc.) in Biotechnology and Genetic Engineering",
    institution: "Islamic University, Kushtia",
    description: "Dept. of Biotechnology and Genetic Engineering.\nCGPA: 3.86/4.0.\nThesis: Heliotropium indicum Leaf Extract Mitigates Hyperglycemia and Dyslipidemia in Type 2 Diabetes.",
    type: "education",
    passingYear: "2023",
    heldIn: "2025",
    syllabusUrl: "#",
    majorCourses: [
      "Advanced Agricultural Biotechnology",
      "Protein Engineering",
      "Medical Biotechnology",
      "Industrial Biotechnology",
      "Toxicology and Pharmacology",
      "Biophysics and Nanobiotechnology",
      "Business Perspective of Biotechnology",
      "Stem Cell Biology and Tissue Engineering"
    ]
  },
  {
    year: "Jan 2018 - Dec 2021",
    title: "Bachelor of Science (B.Sc.) in Biotechnology and Genetic Engineering",
    institution: "Islamic University, Kushtia",
    description: "Dept. of Biotechnology and Genetic Engineering.\nCGPA: 3.75/4.0.\nProject: Identification of repurposable drugs for prostate cancer using bioinformatics.",
    type: "education",
    passingYear: "2021",
    heldIn: "2023",
    syllabusUrl: "#",
    majorCourses: [
      "Biotechnology", "Genetic", "Biochemistry", "Molecular Biology", "Microbiology", 
      "Animal Science", "Animal Biotechnology", "Agricultural Biotechnology", "Plant Science",
      "Plant Breeding", "Plant Physiology", "Plant Tissue Culture", "Oncology", "Virology",
      "Organic & Inorganic Chemistry", "Immunology", "Enzymology", "Human Physiology",
      "Genetic Engineering", "Cell & Tissue Culture", "Cell Signaling", 
      "Molecular Biology of Disease", "Environmental Biotechnology", 
      "Medical & Pharmaceutical Biotechnology", "Biostatistics", "Bioinformatics"
    ]
  },
  {
    year: "2016",
    title: "Higher Secondary Certificate (HSC)",
    institution: "Dinajpur Government College",
    description: "Science Group.\nGPA: 5.00/5.00",
    type: "education"
  },
  {
    year: "2014",
    title: "Secondary School Certificate (SSC)",
    institution: "Dinajpur Zilla School",
    description: "Science Group.\nGPA: 5.00/5.00",
    type: "education"
  }
];

export const PROJECTS: Project[] = [
  {
    id: "p6",
    title: "Ongoing Research Investigation",
    category: "Ongoing",
    description: "Currently investigating novel biomarkers and therapeutic targets. This project focuses on integrating multi-pronged approaches to uncover new insights.",
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=600&auto=format&fit=crop",
    technologies: ["Work in Progress", "Multi-omics", "Analysis"],
    links: {},
    impact: "Research in progress.",
    complexity: 50
  },
  {
    id: "p1",
    title: "Prostate Cancer Therapeutics",
    category: "Cancer Systems Biology",
    description: "Identification of repurposable drugs for prostate cancer by using integrated bioinformatics and systems biology approaches.",
    image: "https://picsum.photos/600/400?random=1",
    technologies: ["Bioinformatics", "Systems Biology", "Drug Repurposing"],
    links: { paper: "https://doi.org/10.1016/j.imu.2024.101488" },
    impact: "Published in Informatics in Medicine Unlocked (IF: 6.2).",
    complexity: 85
  },
  {
    id: "p2",
    title: "T2 Diabetes Mitigation",
    category: "Metabolic Disorders",
    description: "Heliotropium indicum Leaf Extract Mitigates Hyperglycemia and Dyslipidemia in Type 2 Diabetes: A Triad of in silico, in vitro, and in vivo Studies.",
    image: "https://picsum.photos/600/400?random=2",
    technologies: ["In Vivo", "In Vitro", "In Silico"],
    links: { },
    impact: "Manuscript under review in Phytomedicine.",
    complexity: 90
  },
  {
    id: "p3",
    title: "Breast Cancer Drug Discovery",
    category: "Oncology",
    description: "Integrative approach using Molecular Docking, ADMET Profiling, and Molecular Dynamics Simulations to identify potential therapeutic compounds.",
    image: "https://picsum.photos/600/400?random=3",
    technologies: ["Molecular Docking", "MD Simulation", "ADMET"],
    links: { },
    impact: "Manuscript under review.",
    complexity: 80
  },
  {
    id: "p4",
    title: "Anti-Inflammatory Studies",
    category: "Immunology",
    description: "In-silico and in-vivo studies on the efficacy of Saccharum officinarum leaf extract against inflammation.",
    image: "https://picsum.photos/600/400?random=4",
    technologies: ["In Vivo", "In Silico", "Animal Modeling"],
    links: { },
    impact: "Manuscript under review.",
    complexity: 75
  },
  {
    id: "p5",
    title: "Lumpy Skin Disease Inhibitors",
    category: "Virology",
    description: "Potential Inhibitors of Lumpy Skin Disease’s Viral Protein (DNA Polymerase): A Combination of Bioinformatics Approaches.",
    image: "https://picsum.photos/600/400?random=5",
    technologies: ["Bioinformatics", "Virology", "Drug Design"],
    links: { paper: "https://doi.org/10.3390/ani14091283" },
    impact: "Published in Animals (IF: 2.7).",
    complexity: 70
  }
];

export const PUBLICATIONS: Publication[] = [
  {
    id: "pub1",
    title: "Bioinformatics and system biology approaches for identifying potential therapeutic targets for prostate cancer",
    authors: ["Ashik, M. A. R.", "Hossain, M. A.", "Rahman, S. A.", "et al."],
    venue: "Informatics in Medicine Unlocked",
    year: 2024,
    type: "Journal",
    citations: 0,
    url: "https://doi.org/10.1016/j.imu.2024.101488",
    doi: "10.1016/j.imu.2024.101488",
    impactFactor: "6.2",
    tags: ["Prostate Cancer", "System Biology", "Q2"]
  },
  {
    id: "pub2",
    title: "Potential Inhibitors of Lumpy Skin Disease’s Viral Protein (DNA Polymerase): A Combination of Bioinformatics Approaches",
    authors: ["Zia, S.", "Sumon, M. M.", "Ashik, M. A. R.", "et al."],
    venue: "Animals",
    year: 2024,
    type: "Journal",
    citations: 0,
    url: "https://doi.org/10.3390/ani14091283",
    doi: "10.3390/ani14091283",
    impactFactor: "2.7",
    tags: ["Virology", "Bioinformatics", "Q1"]
  },
  {
    id: "pub3",
    title: "Transcriptomic analysis revealed potential regulatory biomarkers and repurposable drugs for breast cancer treatment",
    authors: ["Shornale Akter, M.", "Uddin, M. H.", "Ashik, M. A. R.", "et al."],
    venue: "Cancer Reports",
    year: 2024,
    type: "Journal",
    citations: 0,
    url: "https://doi.org/10.1002/cnr2.2009",
    doi: "10.1002/cnr2.2009",
    impactFactor: "1.5",
    tags: ["Breast Cancer", "Transcriptomics", "Scopus"]
  },
  {
    id: "pub_sub_1",
    title: "Heliotropium indicum leaf extract mitigates hyperglycemia and dyslipidemia in type 2 diabetes",
    authors: ["Ashik, M. A. R.", "et al."],
    venue: "Phytomedicine",
    year: 2025,
    type: "Under Review",
    citations: 0,
    url: "#",
    impactFactor: "6.7",
    tags: ["Diabetes", "In Vivo"]
  },
  {
    id: "pub_sub_2",
    title: "Plasma D-dimer as a prognostic biomarker for histopathological grade and TNM stage in breast Cancer",
    authors: ["Ashik, M. A. R.", "Jahan, S.", "Parvin, A."],
    venue: "Breast Cancer Research",
    year: 2025,
    type: "Under Review",
    citations: 0,
    url: "#",
    impactFactor: "7.0",
    tags: ["Biomarker", "Breast Cancer"]
  },
  {
    id: "pub_new",
    title: "Strategic deployment of machine learning algorithms in predicting protein-drug interactions",
    authors: ["Ashik, M. A. R.", "Rahman, M. H."],
    venue: "Computational Biology and Chemistry",
    year: 2025,
    type: "Journal",
    citations: 0,
    url: "#",
    doi: "",
    impactFactor: "3.1",
    tags: ["Machine Learning", "Drug Discovery", "Computational Biology"]
  }
];

export const SKILLS: Skill[] = [
  // Wet Lab
  { name: "Animal Modeling", level: 90, category: "lab" },
  { name: "Cell Culture", level: 85, category: "lab" },
  { name: "PCR / Gel Electrophoresis", level: 95, category: "lab" },
  { name: "SDS-PAGE", level: 90, category: "lab" },
  { name: "HPLC / TLC", level: 80, category: "lab" },
  { name: "Western Blot", level: 75, category: "lab" },
  { name: "Microbial Fuel Cell", level: 85, category: "lab" },
  { name: "DNA/RNA Extraction", level: 95, category: "lab" },
  { name: "Biochemical Assays", level: 90, category: "lab" },

  // Dry Lab (Computational)
  { name: "CADD / Drug Design", level: 90, category: "computational" },
  { name: "Molecular Docking", level: 95, category: "computational" },
  { name: "MD Simulations", level: 85, category: "computational" },
  { name: "Transcriptomics (RNA-seq)", level: 80, category: "computational" },
  { name: "NGS Analysis", level: 80, category: "computational" },
  { name: "Network Analysis", level: 85, category: "computational" },
  { name: "Phylogeny Analysis", level: 90, category: "computational" },

  // Tools & Software
  { name: "Schrodinger Suite", level: 85, category: "tools" },
  { name: "PyMOL / ChimeraX", level: 90, category: "tools" },
  { name: "GROMACS / Desmond", level: 80, category: "tools" },
  { name: "Cytoscape", level: 85, category: "tools" },
  { name: "SPSS / GraphPad Prism", level: 90, category: "tools" },
  { name: "BioRender", level: 95, category: "tools" },
  { name: "R (Intermediate)", level: 75, category: "tools" },
  { name: "Python (Beginner)", level: 60, category: "tools" },

  // Soft Skills
  { name: "Scientific Writing", level: 90, category: "soft" },
  { name: "Project Management", level: 80, category: "soft" },
  { name: "Team Leadership", level: 85, category: "soft" },
  { name: "Public Speaking", level: 80, category: "soft" },
];

export const BLOGS: BlogPost[] = [
  {
    id: "b1",
    title: "Understanding Systems Biology in Cancer Research",
    date: "Oct 12, 2024",
    category: "Systems Biology",
    excerpt: "How network analysis helps identifying key regulatory genes in cancer progression.",
    readTime: "5 min",
    image: "https://picsum.photos/600/300?random=10"
  },
  {
    id: "b2",
    title: "Drug Repurposing: A Fast Track to New Therapies",
    date: "Sep 28, 2024",
    category: "Drug Discovery",
    excerpt: "Exploring how existing drugs can be repurposed for new indications using bioinformatics.",
    readTime: "8 min",
    image: "https://picsum.photos/600/300?random=11"
  }
];

export const AWARDS: Award[] = [
  {
    id: "a1",
    title: "University Merit Scholarship",
    issuer: "Islamic University",
    year: "2018-2020",
    description: "Awarded for academic excellence in first & second academic years."
  },
  {
    id: "a2",
    title: "National Education Board Scholarship",
    issuer: "Govt. of Bangladesh",
    year: "2014, 2016",
    description: "Awarded for outstanding results in SSC and JSC examinations."
  }
];

export const PERSONAL_DEV: PersonalDevItem[] = [
    {
        id: "pd1",
        title: "Bioinformatic: Basic to Advance",
        subtitle: "Training (30 days)",
        category: "Training",
        description: "BioPC-A Bioinformatics Lab of Research & Training, Chittagong.",
        year: "2023",
        icon: "Terminal"
    },
    {
        id: "pd2",
        title: "Next-Generation Genomics",
        subtitle: "Training (3 days)",
        category: "Training",
        description: "Organised by ASM YA Project Fund 2023.",
        year: "2023",
        icon: "Dna"
    },
     {
        id: "pd3",
        title: "R Programming for Bio Research",
        subtitle: "Training (2 days)",
        category: "Training",
        description: "National Institute of Biotechnology, Savar, Dhaka.",
        year: "2023",
        icon: "Code"
    },
    {
        id: "pd4",
        title: "Immunoinformatics & Vaccinomics",
        subtitle: "Comprehensive Training (3 days)",
        category: "Training",
        description: "BioSol Centre, Jessore University of Science and Technology.",
        year: "2021",
        icon: "Shield"
    }
];

export const RESOURCES: Resource[] = [
  // ============================================
  // CANCER RESEARCH WORKFLOW (1-11)
  // ============================================
  // 01. Cancer Databases & Portals
  { id: "cb1", title: "cBioPortal", url: "https://www.cbioportal.org/", description: "Interactive exploration of multidimensional cancer genomics data sets.", category: "Cancer > 01. Cancer Databases & Portals", icon: "Database" },
  { id: "cb2", title: "GDC Data Portal", url: "https://portal.gdc.cancer.gov/", description: "The NCI's Genomic Data Commons providing access to large scale cancer genomic datasets.", category: "Cancer > 01. Cancer Databases & Portals", icon: "Server" },
  { id: "cb3", title: "ICGC Data Portal", url: "https://dcc.icgc.org/", description: "International Cancer Genome Consortium data portal for global cancer research.", category: "Cancer > 01. Cancer Databases & Portals", icon: "Globe" },
  { id: "cb4", title: "UCSC Xena", url: "https://xena.ucsc.edu/", description: "Visual integration and exploration of diverse cancer genomics datasets.", category: "Cancer > 01. Cancer Databases & Portals", icon: "Monitor" },
  { id: "cb5", title: "OncoLnc", url: "http://www.oncolnc.org/", description: "Linking TCGA survival data to mRNA, miRNA, and lncRNA expression.", category: "Cancer > 01. Cancer Databases & Portals", icon: "Link" },
  { id: "cb6", title: "CanSAR", url: "https://cansar.icr.ac.uk/", description: "Integrated knowledgebase for cancer research and drug discovery.", category: "Cancer > 01. Cancer Databases & Portals", icon: "Search" },
  
  // 02. Gene Expression Analysis
  { id: "ea1", title: "GEPIA2", url: "http://gepia2.cancer-pku.cn/", description: "Gene Expression Profiling Interactive Analysis for cancer and normal tissues.", category: "Cancer > 02. Gene Expression Analysis", icon: "BarChart" },
  { id: "ea2", title: "UALCAN", url: "http://ualcan.path.uab.edu/", description: "Comprehensive web resource for analyzing cancer OMICS data (TCGA/CPTAC).", category: "Cancer > 02. Gene Expression Analysis", icon: "PieChart" },
  { id: "ea3", title: "TNMplot", url: "https://tnmplot.com/analysis/", description: "Differential gene expression analysis in tumor, normal, and metastatic tissues.", category: "Cancer > 02. Gene Expression Analysis", icon: "GitBranch" },
  { id: "ea4", title: "GTEx Portal", url: "https://gtexportal.org/", description: "Genotype-Tissue Expression project for normal tissue gene regulation.", category: "Cancer > 02. Gene Expression Analysis", icon: "Layers" },
  { id: "ea5", title: "Human Protein Atlas", url: "https://www.proteinatlas.org/", description: "Map of human proteins in cells, tissues, and organs.", category: "Cancer > 02. Gene Expression Analysis", icon: "Map" },
  { id: "ea6", title: "ONCOMINE", url: "https://www.oncomine.org/", description: "Cancer microarray database and web-based data-mining platform.", category: "Cancer > 02. Gene Expression Analysis", icon: "Database" },

  // 03. Mutation & Genomic Alterations
  { id: "mut1", title: "COSMIC", url: "https://cancer.sanger.ac.uk/cosmic", description: "Catalogue Of Somatic Mutations In Cancer.", category: "Cancer > 03. Mutation & Genomic Alterations", icon: "Dna" },
  { id: "mut2", title: "CancerHotspots", url: "https://www.cancerhotspots.org/", description: "A resource for statistically significant mutations in cancer.", category: "Cancer > 03. Mutation & Genomic Alterations", icon: "Crosshair" },
  { id: "mut3", title: "PolyPhen-2", url: "http://genetics.bwh.harvard.edu/pph2/", description: "Prediction of functional effects of human nsSNPs.", category: "Cancer > 03. Mutation & Genomic Alterations", icon: "Zap" },
  { id: "mut4", title: "SIFT", url: "https://sift.bii.a-star.edu.sg/", description: "Sorting Intolerant From Tolerant (amino acid substitution prediction).", category: "Cancer > 03. Mutation & Genomic Alterations", icon: "Filter" },
  { id: "mut5", title: "MutationTaster", url: "http://www.mutationtaster.org/", description: "Evaluates the pathogenic potential of DNA alterations.", category: "Cancer > 03. Mutation & Genomic Alterations", icon: "AlertCircle" },
  { id: "mut6", title: "CADD", url: "https://cadd.gs.washington.edu/", description: "Combined Annotation Dependent Depletion - scoring the deleteriousness.", category: "Cancer > 03. Mutation & Genomic Alterations", icon: "Star" },

  // 04. DNA Methylation & Epigenetics
  { id: "ma1", title: "MethSurv", url: "https://biit.cs.ut.ee/methsurv/", description: "Web tool for multivariable survival analysis using DNA methylation data.", category: "Cancer > 04. DNA Methylation & Epigenetics", icon: "Activity" },
  { id: "ma2", title: "MEXPRESS", url: "https://mexpress.be/", description: "Visualizing DNA methylation, expression, and clinical data.", category: "Cancer > 04. DNA Methylation & Epigenetics", icon: "Eye" },
  { id: "ma3", title: "DiseaseMeth", url: "http://bio-bigdata.hrbmu.edu.cn/diseasemeth/", description: "Human disease methylation database.", category: "Cancer > 04. DNA Methylation & Epigenetics", icon: "Database" },
  { id: "ma4", title: "MethHC", url: "http://methhc.mbc.nctu.edu.tw/", description: "A database of DNA methylation and gene expression in human cancer.", category: "Cancer > 04. DNA Methylation & Epigenetics", icon: "BarChart2" },
  
  // 05. Immune Infiltration & Microenvironment
  { id: "ii1", title: "TIMER2.0", url: "http://timer.cistrome.org/", description: "Tumor Immune Estimation Resource for comprehensive analysis of immune infiltrates.", category: "Cancer > 05. Immune Infiltration & Microenvironment", icon: "Shield" },
  { id: "ii2", title: "CIBERSORTx", url: "https://cibersortx.stanford.edu/", description: "Digital cytometry to estimate cell type abundance from bulk tissue transcriptomes.", category: "Cancer > 05. Immune Infiltration & Microenvironment", icon: "BarChart2" },
  { id: "ii3", title: "TISIDB", url: "http://cis.hku.hk/TISIDB/", description: "Integrated repository portal for tumor-immune system interactions.", category: "Cancer > 05. Immune Infiltration & Microenvironment", icon: "GitMerge" },
  { id: "ii4", title: "ImmuCellAI", url: "http://bioinfo.life.hust.edu.cn/ImmuCellAI/", description: "Immune Cell Abundance Identifier from RNA-Seq data.", category: "Cancer > 05. Immune Infiltration & Microenvironment", icon: "Search" },
  { id: "ii5", title: "ESTIMATE", url: "https://bioinformatics.mdanderson.org/estimate/", description: "Estimate of STromal and Immune cells in MAlignant Tumor tissues.", category: "Cancer > 05. Immune Infiltration & Microenvironment", icon: "PieChart" },

  // 06. Non-coding RNA & Regulation
  { id: "ncr1", title: "ENCORI (StarBase)", url: "https://starbase.sysu.edu.cn/", description: "The Encyclopedia of RNA Interactomes (miRNA-mRNA, lncRNA, etc.).", category: "Cancer > 06. Non-coding RNA & Regulation", icon: "Star" },
  { id: "ncr2", title: "miRNet", url: "https://www.mirnet.ca/", description: "Network-based visual analysis of miRNA functions and targets.", category: "Cancer > 06. Non-coding RNA & Regulation", icon: "Share2" },
  { id: "ncr3", title: "Lnc2Cancer", url: "http://www.bio-bigdata.net/lnc2cancer/", description: "Database of experimentally supported LncRNAs associated with human cancer.", category: "Cancer > 06. Non-coding RNA & Regulation", icon: "Link" },
  { id: "ncr4", title: "TargetScan", url: "http://www.targetscan.org/", description: "Prediction of microRNA targets.", category: "Cancer > 06. Non-coding RNA & Regulation", icon: "Target" },
  { id: "ncr5", title: "miRTarBase", url: "https://mirtarbase.cuhk.edu.cn/", description: "Experimentally validated microRNA-target interactions.", category: "Cancer > 06. Non-coding RNA & Regulation", icon: "Database" },

  // 07. Functional Enrichment (GO & Pathway)
  { id: "gp1", title: "DAVID", url: "https://david.ncifcrf.gov/", description: "Database for Annotation, Visualization and Integrated Discovery.", category: "Cancer > 07. Functional Enrichment (GO & Pathway)", icon: "List" },
  { id: "gp2", title: "Enrichr", url: "https://maayanlab.cloud/Enrichr/", description: "Comprehensive gene set enrichment analysis web server.", category: "Cancer > 07. Functional Enrichment (GO & Pathway)", icon: "Filter" },
  { id: "gp3", title: "GSEA", url: "https://www.gsea-msigdb.org/gsea/", description: "Gene Set Enrichment Analysis (Broad Institute).", category: "Cancer > 07. Functional Enrichment (GO & Pathway)", icon: "TrendingUp" },
  { id: "gp4", title: "KEGG", url: "https://www.genome.jp/kegg/", description: "Kyoto Encyclopedia of Genes and Genomes.", category: "Cancer > 07. Functional Enrichment (GO & Pathway)", icon: "Globe" },
  { id: "gp5", title: "ShinyGO", url: "http://bioinformatics.sdstate.edu/go/", description: "Graphical Enrichment Analysis for Animals and Plants.", category: "Cancer > 07. Functional Enrichment (GO & Pathway)", icon: "Sun" },
  { id: "gp6", title: "Metascape", url: "https://metascape.org/", description: "A gene annotation & analysis resource.", category: "Cancer > 07. Functional Enrichment (GO & Pathway)", icon: "Grid" },

  // 08. Protein-Protein Interaction (PPI)
  { id: "ppi1", title: "STRING", url: "https://string-db.org/", description: "Search tool for retrieval of interacting genes/proteins.", category: "Cancer > 08. Protein-Protein Interaction (PPI)", icon: "Network" },
  { id: "ppi2", title: "BioGrid", url: "https://thebiogrid.org/", description: "Public repository of protein interactions.", category: "Cancer > 08. Protein-Protein Interaction (PPI)", icon: "Grid" },
  { id: "ppi3", title: "GeneMANIA", url: "https://genemania.org/", description: "Predicts gene function and identifies related genes.", category: "Cancer > 08. Protein-Protein Interaction (PPI)", icon: "Zap" },
  { id: "ppi4", title: "IntAct", url: "https://www.ebi.ac.uk/intact/", description: "Molecular interaction database.", category: "Cancer > 08. Protein-Protein Interaction (PPI)", icon: "Link" },
  { id: "ppi5", title: "Cytoscape", url: "https://cytoscape.org/", description: "Software for visualizing complex networks.", category: "Cancer > 08. Protein-Protein Interaction (PPI)", icon: "Monitor" },

  // 09. Survival & Prognosis Analysis
  { id: "sp1", title: "KM Plotter", url: "https://kmplot.com/analysis/", description: "Kaplan-Meier Plotter for survival analysis using gene expression data.", category: "Cancer > 09. Survival & Prognosis Analysis", icon: "Activity" },
  { id: "sp2", title: "PrognoScan", url: "http://dna00.bio.kyutech.ac.jp/PrognoScan/", description: "Database for meta-analysis of the prognostic value of genes.", category: "Cancer > 09. Survival & Prognosis Analysis", icon: "Search" },
  { id: "sp3", title: "SurvExpress", url: "http://bioinformatica.mty.itesm.mx:8080/Biomatec/SurvivaX.jsp", description: "Biomarker validation for cancer gene expression.", category: "Cancer > 09. Survival & Prognosis Analysis", icon: "UserCheck" },
  { id: "sp4", title: "TRGAted", url: "https://nborcherding.shinyapps.io/TRGAted/", description: "Survival analysis of protein expression data.", category: "Cancer > 09. Survival & Prognosis Analysis", icon: "Target" },

  // 10. Drug-Target & Therapeutics
  { id: "dt1", title: "DGIdb", url: "https://www.dgidb.org/", description: "The Drug Gene Interaction Database - finding drug targets.", category: "Cancer > 10. Drug-Target & Therapeutics", icon: "Database" },
  { id: "dt2", title: "Connectivity Map (CMap)", url: "https://clue.io/", description: "Connects small molecules, genes, and disease states.", category: "Cancer > 10. Drug-Target & Therapeutics", icon: "Map" },
  { id: "dt3", title: "CTD", url: "http://ctdbase.org/", description: "Comparative Toxicogenomics Database - chemical-gene/protein interactions.", category: "Cancer > 10. Drug-Target & Therapeutics", icon: "AlertTriangle" },
  { id: "dt4", title: "ClinicalTrials.gov", url: "https://clinicaltrials.gov/", description: "Registry of clinical trials conducted around the world.", category: "Cancer > 10. Drug-Target & Therapeutics", icon: "Users" },

  // 11. Helper Tools (Venn & Diagrams)
  { id: "vn1", title: "Venny 2.1", url: "https://bioinfogp.cnb.csic.es/tools/venny/", description: "An interactive tool for comparing lists with Venn-Diagrams.", category: "Cancer > 11. Helper Tools (Venn & Diagrams)", icon: "PieChart" },
  { id: "vn2", title: "BioVenn", url: "https://www.biovenn.nl/", description: "Create area-proportional Venn diagrams.", category: "Cancer > 11. Helper Tools (Venn & Diagrams)", icon: "Circle" },
  { id: "vn3", title: "InteractiVenn", url: "http://www.interactivenn.net/", description: "Interactive tool for analyzing sets through Venn diagrams.", category: "Cancer > 11. Helper Tools (Venn & Diagrams)", icon: "Layers" },

  // ============================================
  // DRUG DESIGN WORKFLOW (1-6)
  // ============================================
  // 01. Compounds (Ligands) and Structures
  { id: "dd1_1", title: "PubChem", url: "https://pubchem.ncbi.nlm.nih.gov/", description: "Open chemistry database with information on chemical structures.", category: "Drug Design > 01. Compounds (Ligands) and Structures", icon: "Database" },
  { id: "dd1_2", title: "ChEMBL", url: "https://www.ebi.ac.uk/chembl/", description: "Database of bioactive drug-like small molecules.", category: "Drug Design > 01. Compounds (Ligands) and Structures", icon: "Search" },
  { id: "dd1_3", title: "DrugBank", url: "https://go.drugbank.com/", description: "Comprehensive molecular information about drugs.", category: "Drug Design > 01. Compounds (Ligands) and Structures", icon: "Box" },
  { id: "dd1_4", title: "ZINC15", url: "https://zinc15.docking.org/", description: "Database of commercially-available compounds for virtual screening.", category: "Drug Design > 01. Compounds (Ligands) and Structures", icon: "Grid" },
  { id: "dd1_5", title: "ChemSpider", url: "http://www.chemspider.com/", description: "Chemical structure database providing access to over 100 million structures.", category: "Drug Design > 01. Compounds (Ligands) and Structures", icon: "Globe" },
  
  // 02. Proteins and its 3D structure
  { id: "dd2_1", title: "RCSB PDB", url: "https://www.rcsb.org/", description: "Protein Data Bank - 3D shapes of proteins, nucleic acids, and complex assemblies.", category: "Drug Design > 02. Proteins and its 3D structure", icon: "Box" },
  { id: "dd2_2", title: "UniProt", url: "https://www.uniprot.org/", description: "Comprehensive resource for protein sequence and functional information.", category: "Drug Design > 02. Proteins and its 3D structure", icon: "List" },
  { id: "dd2_3", title: "AlphaFold DB", url: "https://alphafold.ebi.ac.uk/", description: "Protein structure database predicted by AlphaFold.", category: "Drug Design > 02. Proteins and its 3D structure", icon: "Cpu" },
  { id: "dd2_4", title: "SWISS-MODEL", url: "https://swissmodel.expasy.org/", description: "Fully automated protein structure homology-modelling server.", category: "Drug Design > 02. Proteins and its 3D structure", icon: "Monitor" },
  
  // 03. Active Site & Pocket Prediction
  { id: "dd3_1", title: "CASTp", url: "http://sts.bioe.uic.edu/castp/", description: "Computed Atlas of Surface Topography of proteins.", category: "Drug Design > 03. Active Site & Pocket Prediction", icon: "Map" },
  { id: "dd3_2", title: "PrankWeb", url: "https://prankweb.cz/", description: "Prediction of ligand binding sites from protein structure.", category: "Drug Design > 03. Active Site & Pocket Prediction", icon: "Target" },
  { id: "dd3_3", title: "DoGSiteScorer", url: "https://proteins.plus/", description: "Active site prediction and druggability assessment.", category: "Drug Design > 03. Active Site & Pocket Prediction", icon: "Search" },
  { id: "dd3_4", title: "DeepSite", url: "https://playmolecule.com/deepsite/", description: "Protein binding pocket predictor using deep learning.", category: "Drug Design > 03. Active Site & Pocket Prediction", icon: "Brain" },
  
  // 04. Molecular Docking & Virtual Screening
  { id: "dd4_1", title: "SwissDock", url: "http://www.swissdock.ch/", description: "Docking of small molecules into protein structures.", category: "Drug Design > 04. Molecular Docking & Virtual Screening", icon: "Box" },
  { id: "dd4_2", title: "CB-Dock2", url: "https://cadd.labshare.cn/cb-dock2/", description: "Cavity-detection guided blind docking.", category: "Drug Design > 04. Molecular Docking & Virtual Screening", icon: "Crosshair" },
  { id: "dd4_3", title: "MTiOpenScreen", url: "https://bioserv.rpbs.univ-paris-diderot.fr/services/MTiOpenScreen/", description: "Virtual screening web server.", category: "Drug Design > 04. Molecular Docking & Virtual Screening", icon: "Monitor" },
  { id: "dd4_4", title: "AutoDock Vina", url: "http://vina.scripps.edu/", description: "Molecular docking and virtual screening program (Software).", category: "Drug Design > 04. Molecular Docking & Virtual Screening", icon: "Terminal" },
  { id: "dd4_5", title: "HADDOCK", url: "https://wenmr.science.uu.nl/haddock2.4/", description: "High Ambiguity Driven biomolecular DOCKing.", category: "Drug Design > 04. Molecular Docking & Virtual Screening", icon: "Link" },

  // 05. ADMET Analysis
  { id: "dd5_1", title: "SwissADME", url: "http://www.swissadme.ch/", description: "Compute physicochemical descriptors as well as predict ADME parameters.", category: "Drug Design > 05. ADMET Analysis", icon: "Activity" },
  { id: "dd5_2", title: "pkCSM", url: "https://biosig.lab.uq.edu.au/pkcsm/", description: "Predicting small-molecule pharmacokinetic and toxicity properties.", category: "Drug Design > 05. ADMET Analysis", icon: "AlertTriangle" },
  { id: "dd5_3", title: "ADMETlab 2.0", url: "https://admetmesh.scbdd.com/", description: "Integrated online platform for accurate and comprehensive ADMET prediction.", category: "Drug Design > 05. ADMET Analysis", icon: "Beaker" },
  { id: "dd5_4", title: "ProTox-II", url: "https://tox-new.charite.de/protox_II/", description: "Prediction of Toxicity of chemicals.", category: "Drug Design > 05. ADMET Analysis", icon: "Shield" },
  { id: "dd5_5", title: "vNN-ADMET", url: "http://vnnadmet.pnl.gov/", description: "Prediction of ADMET properties using deep neural networks.", category: "Drug Design > 05. ADMET Analysis", icon: "Brain" },
  
  // 06. Molecular Dynamics & Simulation
  { id: "dd6_1", title: "WebGRO", url: "https://simlab.uams.edu/", description: "Molecular dynamics simulation on the web.", category: "Drug Design > 06. Molecular Dynamics & Simulation", icon: "Activity" },
  { id: "dd6_2", title: "MDWeb", url: "http://mmb.irbbarcelona.org/MDWeb/", description: "Molecular dynamics on the web.", category: "Drug Design > 06. Molecular Dynamics & Simulation", icon: "Globe" },
  { id: "dd6_3", title: "CABS-flex", url: "http://biocomp.chem.uw.edu.pl/CABSflex2", description: "Fast simulation of protein flexibility.", category: "Drug Design > 06. Molecular Dynamics & Simulation", icon: "Zap" },
  { id: "dd6_4", title: "GROMACS", url: "http://www.gromacs.org/", description: "Versatile package to perform molecular dynamics (Software).", category: "Drug Design > 06. Molecular Dynamics & Simulation", icon: "Terminal" },

  // ============================================
  // VACCINE DESIGN WORKFLOW (1-13)
  // ============================================
  // 01. Antigen Selection
  { id: "vd1_1", title: "UniProt", url: "https://www.uniprot.org/", description: "Comprehensive protein database for sequence retrieval.", category: "Vaccine Design > 01. Antigen Selection: Retrieval & Characterization", icon: "Database" },
  { id: "vd1_2", title: "NCBI Protein", url: "https://www.ncbi.nlm.nih.gov/protein", description: "Database of protein sequences.", category: "Vaccine Design > 01. Antigen Selection: Retrieval & Characterization", icon: "Search" },
  { id: "vd1_3", title: "VaxiJen v2.0", url: "http://www.ddg-pharmfac.net/vaxijen/VaxiJen/VaxiJen.html", description: "Prediction of protective antigens and subunit vaccines.", category: "Vaccine Design > 01. Antigen Selection: Retrieval & Characterization", icon: "Shield" },
  { id: "vd1_4", title: "AllerTOP v.2.0", url: "https://www.ddg-pharmfac.net/AllerTOP/", description: "Prediction of allergenicity of proteins.", category: "Vaccine Design > 01. Antigen Selection: Retrieval & Characterization", icon: "AlertCircle" },
  { id: "vd1_5", title: "PSORTb 3.0", url: "https://www.psort.org/psortb/", description: "Bacterial subcellular localization prediction (Surface exposed check).", category: "Vaccine Design > 01. Antigen Selection: Retrieval & Characterization", icon: "MapPin" },
  { id: "vd1_6", title: "TMHMM 2.0", url: "https://services.healthtech.dtu.dk/service.php?TMHMM-2.0", description: "Prediction of transmembrane helices (Topology check).", category: "Vaccine Design > 01. Antigen Selection: Retrieval & Characterization", icon: "Activity" },
  { id: "vd1_7", title: "SignalP 6.0", url: "https://services.healthtech.dtu.dk/service.php?SignalP", description: "Prediction of signal peptides.", category: "Vaccine Design > 01. Antigen Selection: Retrieval & Characterization", icon: "ArrowRight" },
  { id: "vd1_8", title: "VirulentPred", url: "http://203.92.44.117/virulent/", description: "Prediction of virulent proteins in bacteria.", category: "Vaccine Design > 01. Antigen Selection: Retrieval & Characterization", icon: "Zap" },

  // 02. T-Cell Epitope Prediction
  { id: "vd2_1", title: "IEDB Analysis", url: "https://www.iedb.org/", description: "Immune Epitope Database and Analysis Resource.", category: "Vaccine Design > 02. T-Cell Epitope Prediction (MHC I & II)", icon: "Database" },
  { id: "vd2_2", title: "NetMHCpan 4.1", url: "https://services.healthtech.dtu.dk/service.php?NetMHCpan-4.1", description: "Prediction of peptide-MHC class I binding.", category: "Vaccine Design > 02. T-Cell Epitope Prediction (MHC I & II)", icon: "Link" },
  { id: "vd2_3", title: "NetMHCIIpan 4.0", url: "https://services.healthtech.dtu.dk/service.php?NetMHCIIpan-4.0", description: "Prediction of peptide-MHC class II binding.", category: "Vaccine Design > 02. T-Cell Epitope Prediction (MHC I & II)", icon: "Link" },
  { id: "vd2_4", title: "RankPep", url: "http://imed.med.ucm.es/Tools/rankpep.html", description: "Predicting peptide binders to MHC molecules.", category: "Vaccine Design > 02. T-Cell Epitope Prediction (MHC I & II)", icon: "List" },
  { id: "vd2_5", title: "NetCTL 1.2", url: "https://services.healthtech.dtu.dk/service.php?NetCTL-1.2", description: "Prediction of CTL epitopes.", category: "Vaccine Design > 02. T-Cell Epitope Prediction (MHC I & II)", icon: "Crosshair" },

  // 03. Antigen Processing & Cytokine Induction
  { id: "vd3_1", title: "NetChop 3.1", url: "https://services.healthtech.dtu.dk/service.php?NetChop-3.1", description: "Prediction of proteasomal cleavage sites.", category: "Vaccine Design > 03. Antigen Processing & Cytokine Induction", icon: "Scissors" },
  { id: "vd3_2", title: "TAPreg", url: "http://imed.med.ucm.es/Tools/tapreg/", description: "Prediction of TAP binding affinity.", category: "Vaccine Design > 03. Antigen Processing & Cytokine Induction", icon: "Activity" },
  { id: "vd3_3", title: "IFNepitope", url: "https://webs.iiitd.edu.in/raghava/ifnepitope/", description: "Prediction of interferon-gamma inducing epitopes.", category: "Vaccine Design > 03. Antigen Processing & Cytokine Induction", icon: "Zap" },
  { id: "vd3_4", title: "IL4pred", url: "https://webs.iiitd.edu.in/raghava/il4pred/", description: "Prediction of Interleukin-4 inducing peptides.", category: "Vaccine Design > 03. Antigen Processing & Cytokine Induction", icon: "Target" },

  // 04. B-Cell Epitope Prediction
  { id: "vd4_1", title: "BepiPred-3.0", url: "https://services.healthtech.dtu.dk/service.php?BepiPred-3.0", description: "Prediction of linear B-cell epitopes.", category: "Vaccine Design > 04. B-Cell Epitope Prediction (Linear & Conformational)", icon: "Activity" },
  { id: "vd4_2", title: "ABCpred", url: "https://webs.iiitd.edu.in/raghava/abcpred/", description: "B-cell epitope prediction using artificial neural networks.", category: "Vaccine Design > 04. B-Cell Epitope Prediction (Linear & Conformational)", icon: "Cpu" },
  { id: "vd4_3", title: "ElliPro", url: "http://tools.iedb.org/ellipro/", description: "Antibody epitope prediction from protein structure (Conformational).", category: "Vaccine Design > 04. B-Cell Epitope Prediction (Linear & Conformational)", icon: "Box" },
  { id: "vd4_4", title: "DiscoTope 2.0", url: "https://services.healthtech.dtu.dk/service.php?DiscoTope-2.0", description: "Prediction of discontinuous B-cell epitopes.", category: "Vaccine Design > 04. B-Cell Epitope Prediction (Linear & Conformational)", icon: "Layers" },

  // 05. Epitope Screening
  { id: "vd5_1", title: "IEDB Conservancy", url: "http://tools.iedb.org/conservancy/", description: "Calculate epitope conservancy across strains.", category: "Vaccine Design > 05. Epitope Screening: Conservancy, Toxicity & Population", icon: "Globe" },
  { id: "vd5_2", title: "ToxinPred2", url: "https://webs.iiitd.edu.in/raghava/toxinpred2/", description: "Prediction of toxic peptides.", category: "Vaccine Design > 05. Epitope Screening: Conservancy, Toxicity & Population", icon: "AlertTriangle" },
  { id: "vd5_3", title: "HemoPred", url: "http://codes.bio/hemopred/", description: "Prediction of hemolytic activity of peptides.", category: "Vaccine Design > 05. Epitope Screening: Conservancy, Toxicity & Population", icon: "Droplet" },
  { id: "vd5_4", title: "BioSafe", url: "https://webs.iiitd.edu.in/raghava/biosafe/", description: "Algorithm for identifying safe and effective peptide-based drugs.", category: "Vaccine Design > 05. Epitope Screening: Conservancy, Toxicity & Population", icon: "Shield" },
  { id: "vd5_5", title: "IEDB Population Coverage", url: "http://tools.iedb.org/population/", description: "Calculate population coverage of epitopes.", category: "Vaccine Design > 05. Epitope Screening: Conservancy, Toxicity & Population", icon: "Users" },
  { id: "vd5_6", title: "NCBI BLASTp (Human)", url: "https://blast.ncbi.nlm.nih.gov/Blast.cgi", description: "Check for homology with human proteome to avoid autoimmunity.", category: "Vaccine Design > 05. Epitope Screening: Conservancy, Toxicity & Population", icon: "Search" },

  // 06. Vaccine Construction
  { id: "vd6_1", title: "ProtParam", url: "https://web.expasy.org/protparam/", description: "Computation of physical and chemical parameters.", category: "Vaccine Design > 06. Vaccine Construction & Physicochemical Analysis", icon: "Settings" },
  { id: "vd6_2", title: "SOLpro", url: "http://scratch.proteomics.ics.uci.edu/", description: "Prediction of protein solubility.", category: "Vaccine Design > 06. Vaccine Construction & Physicochemical Analysis", icon: "Droplet" },
  { id: "vd6_3", title: "AntigenPro", url: "http://scratch.proteomics.ics.uci.edu/", description: "Predict antigenicity of the final vaccine construct.", category: "Vaccine Design > 06. Vaccine Construction & Physicochemical Analysis", icon: "Zap" },

  // 07. Structure Prediction
  { id: "vd7_1", title: "PSIPRED", url: "http://bioinf.cs.ucl.ac.uk/psipred/", description: "Secondary structure prediction.", category: "Vaccine Design > 07. Structure Prediction (Secondary & Tertiary)", icon: "Layers" },
  { id: "vd7_2", title: "AlphaFold Colab", url: "https://colab.research.google.com/github/sokrypton/ColabFold/blob/main/AlphaFold2.ipynb", description: "High-accuracy tertiary structure prediction.", category: "Vaccine Design > 07. Structure Prediction (Secondary & Tertiary)", icon: "Cpu" },
  { id: "vd7_3", title: "SWISS-MODEL", url: "https://swissmodel.expasy.org/", description: "Protein structure homology-modelling.", category: "Vaccine Design > 07. Structure Prediction (Secondary & Tertiary)", icon: "Box" },
  { id: "vd7_4", title: "I-TASSER", url: "https://zhanggroup.org/I-TASSER/", description: "Protein Structure & Function Prediction.", category: "Vaccine Design > 07. Structure Prediction (Secondary & Tertiary)", icon: "Codepen" },

  // 08. Structure Refinement & Validation
  { id: "vd8_1", title: "GalaxyRefine", url: "http://galaxy.seoklab.org/cgi-bin/submit.cgi?type=REFINE", description: "Refinement of protein structure models.", category: "Vaccine Design > 08. Structure Refinement & Validation", icon: "RefreshCw" },
  { id: "vd8_2", title: "ProSA-web", url: "https://prosa.services.came.sbg.ac.at/prosa.php", description: "Z-score analysis for protein structure validation.", category: "Vaccine Design > 08. Structure Refinement & Validation", icon: "CheckCircle" },
  { id: "vd8_3", title: "SAVES v6.0", url: "https://saves.mbi.ucla.edu/", description: "Metaserver for structure validation (PROCHECK, ERRAT).", category: "Vaccine Design > 08. Structure Refinement & Validation", icon: "Search" },
  { id: "vd8_4", title: "Ramachandran Plot Server", url: "https://zlab.umassmed.edu/bu/rama/", description: "Validate protein backbone geometry.", category: "Vaccine Design > 08. Structure Refinement & Validation", icon: "Grid" },

  // 09. Protein Stability Engineering
  { id: "vd9_1", title: "Disulfide by Design 2.0", url: "http://cptweb.cpt.wayne.edu/DbD2/", description: "Design disulfide bonds to increase protein stability.", category: "Vaccine Design > 09. Protein Stability Engineering (Disulfide)", icon: "Link" },

  // 10. Molecular Docking
  { id: "vd10_1", title: "ClusPro", url: "https://cluspro.bu.edu/", description: "Protein-protein docking server.", category: "Vaccine Design > 10. Molecular Docking (Vaccine-TLR/MHC)", icon: "GitMerge" },
  { id: "vd10_2", title: "HADDOCK", url: "https://wenmr.science.uu.nl/haddock2.4/", description: "Docking of vaccine with immune receptors (TLRs).", category: "Vaccine Design > 10. Molecular Docking (Vaccine-TLR/MHC)", icon: "Box" },
  { id: "vd10_3", title: "PatchDock", url: "https://bioinfo3d.cs.tau.ac.il/PatchDock/", description: "Molecular docking algorithm.", category: "Vaccine Design > 10. Molecular Docking (Vaccine-TLR/MHC)", icon: "Puzzle" },

  // 11. Molecular Dynamics
  { id: "vd11_1", title: "iMODS", url: "http://imods.chaconlab.org/", description: "Normal Mode Analysis for protein stability/flexibility.", category: "Vaccine Design > 11. Molecular Dynamics Simulation", icon: "Activity" },
  { id: "vd11_2", title: "WebGRO", url: "https://simlab.uams.edu/", description: "GROMACS based MD simulation.", category: "Vaccine Design > 11. Molecular Dynamics Simulation", icon: "Monitor" },
  { id: "vd11_3", title: "CABS-flex 2.0", url: "http://biocomp.chem.uw.edu.pl/CABSflex2", description: "Fast simulation of protein fluctuations.", category: "Vaccine Design > 11. Molecular Dynamics Simulation", icon: "Zap" },

  // 12. Immune Simulation
  { id: "vd12_1", title: "C-ImmSim", url: "https://kraken.iac.rm.cnr.it/C-IMMSIM/", description: "Simulation of the immune response to the vaccine.", category: "Vaccine Design > 12. Immune Simulation", icon: "Shield" },

  // 13. In Silico Cloning
  { id: "vd13_1", title: "JCat", url: "http://www.jcat.de/", description: "Codon adaptation tool for optimized expression.", category: "Vaccine Design > 13. In Silico Cloning & Optimization", icon: "Code" },
  { id: "vd13_2", title: "Optimizer", url: "http://genomes.urv.es/OPTIMIZER/", description: "Optimizing the codon usage of DNA sequences.", category: "Vaccine Design > 13. In Silico Cloning & Optimization", icon: "Settings" },
  { id: "vd13_3", title: "SnapGene Viewer", url: "https://www.snapgene.com/snapgene-viewer", description: "Visualize DNA sequences and simulate cloning.", category: "Vaccine Design > 13. In Silico Cloning & Optimization", icon: "Eye" },
  { id: "vd13_4", title: "EMBOSS Backtranseq", url: "https://www.ebi.ac.uk/Tools/st/emboss_backtranseq/", description: "Back-translate protein to nucleic acid.", category: "Vaccine Design > 13. In Silico Cloning & Optimization", icon: "RefreshCw" },

  // ============================================
  // GENOMICS WORKFLOW
  // ============================================
  { id: "gn1", title: "NCBI Genome", url: "https://www.ncbi.nlm.nih.gov/genome/", description: "Central repository for sequence data.", category: "Genomics > 01. Reference Databases", icon: "Database" },
  { id: "gn2", title: "Ensembl", url: "https://www.ensembl.org/", description: "Genome browser for vertebrate genomes.", category: "Genomics > 01. Reference Databases", icon: "Globe" },
  { id: "gn3", title: "FastQC", url: "https://www.bioinformatics.babraham.ac.uk/projects/fastqc/", description: "Quality control tool for high throughput sequence data.", category: "Genomics > 02. Quality Control & Trimming", icon: "CheckCircle" },
  { id: "gn4", title: "Trimmomatic", url: "http://www.usadellab.org/cms/?page=trimmomatic", description: "A flexible read trimming tool for Illumina NGS data.", category: "Genomics > 02. Quality Control & Trimming", icon: "Scissors" },
  { id: "gn5", title: "BWA", url: "http://bio-bwa.sourceforge.net/", description: "Burrows-Wheeler Aligner for mapping reads to reference.", category: "Genomics > 03. Read Alignment", icon: "GitMerge" },
  { id: "gn6", title: "Bowtie2", url: "http://bowtie-bio.sourceforge.net/bowtie2/index.shtml", description: "Fast and sensitive read alignment.", category: "Genomics > 03. Read Alignment", icon: "ArrowRight" },
  { id: "gn7", title: "GATK", url: "https://gatk.broadinstitute.org/hc/en-us", description: "Genome Analysis Toolkit for variant discovery.", category: "Genomics > 04. Variant Calling (SNPs/Indels)", icon: "Search" },
  { id: "gn8", title: "SAMtools", url: "http://www.htslib.org/", description: "Tools for manipulating alignments in the SAM format.", category: "Genomics > 04. Variant Calling (SNPs/Indels)", icon: "Tool" },
  { id: "gn9", title: "ANNOVAR", url: "https://annovar.openbioinformatics.org/", description: "Functional annotation of genetic variants.", category: "Genomics > 05. Variant Annotation", icon: "Tag" },
  { id: "gn10", title: "VEP", url: "https://www.ensembl.org/info/docs/tools/vep/index.html", description: "Variant Effect Predictor.", category: "Genomics > 05. Variant Annotation", icon: "AlertCircle" },
  { id: "gn11", title: "IGV", url: "https://software.broadinstitute.org/software/igv/", description: "Integrative Genomics Viewer.", category: "Genomics > 06. Visualization", icon: "Eye" },
  { id: "gn12", title: "Circos", url: "http://circos.ca/", description: "Visualization of data in a circular layout.", category: "Genomics > 06. Visualization", icon: "Circle" },

  // ============================================
  // TRANSCRIPTOMICS WORKFLOW
  // ============================================
  { id: "tr1", title: "GEO", url: "https://www.ncbi.nlm.nih.gov/geo/", description: "Gene Expression Omnibus repository.", category: "Transcriptomics > 01. Data Retrieval", icon: "Database" },
  { id: "tr2", title: "SRA Toolkit", url: "https://github.com/ncbi/sra-tools", description: "Tools for accessing data from the Sequence Read Archive.", category: "Transcriptomics > 01. Data Retrieval", icon: "Download" },
  { id: "tr3", title: "STAR", url: "https://github.com/alexdobin/STAR", description: "Spliced Transcripts Alignment to a Reference.", category: "Transcriptomics > 02. Alignment & Mapping", icon: "GitMerge" },
  { id: "tr4", title: "HISAT2", url: "http://daehwankimlab.github.io/hisat2/", description: "Graph-based alignment of next generation sequencing reads.", category: "Transcriptomics > 02. Alignment & Mapping", icon: "Network" },
  { id: "tr5", title: "HTSeq", url: "https://htseq.readthedocs.io/", description: "Analysing high-throughput sequencing data (Counting).", category: "Transcriptomics > 03. Quantification", icon: "Hash" },
  { id: "tr6", title: "FeatureCounts", url: "http://subread.sourceforge.net/", description: "Fast and accurate read counting.", category: "Transcriptomics > 03. Quantification", icon: "BarChart" },
  { id: "tr7", title: "DESeq2", url: "https://bioconductor.org/packages/release/bioc/html/DESeq2.html", description: "Differential gene expression analysis based on negative binomial distribution.", category: "Transcriptomics > 04. Differential Expression", icon: "Activity" },
  { id: "tr8", title: "edgeR", url: "https://bioconductor.org/packages/release/bioc/html/edgeR.html", description: "Empirical Analysis of Digital Gene Expression Data in R.", category: "Transcriptomics > 04. Differential Expression", icon: "Code" },
  { id: "tr9", title: "WGCNA", url: "https://horvath.genetics.ucla.edu/html/CoexpressionNetwork/Rpackages/WGCNA/", description: "Weighted Gene Co-Expression Network Analysis.", category: "Transcriptomics > 05. Network Analysis", icon: "Share2" },

  // ============================================
  // PROTEOMICS WORKFLOW
  // ============================================
  { id: "pr1", title: "UniProt", url: "https://www.uniprot.org/", description: "Universal Protein Resource.", category: "Proteomics > 01. Databases & Reference", icon: "Database" },
  { id: "pr2", title: "PRIDE", url: "https://www.ebi.ac.uk/pride/", description: "PRoteomics IDEntifications Database.", category: "Proteomics > 01. Databases & Reference", icon: "Archive" },
  { id: "pr3", title: "MaxQuant", url: "https://www.maxquant.org/", description: "Quantitative proteomics software package for mass spectrometry.", category: "Proteomics > 02. MS Data Analysis", icon: "Settings" },
  { id: "pr4", title: "Proteome Discoverer", url: "https://www.thermofisher.com", description: "Software for identifying and quantifying proteins.", category: "Proteomics > 02. MS Data Analysis", icon: "Search" },
  { id: "pr5", title: "PhosphoSitePlus", url: "https://www.phosphosite.org/", description: "Post-translational modification resource.", category: "Proteomics > 03. PTM Analysis", icon: "Zap" },
  { id: "pr6", title: "NetPhos", url: "https://services.healthtech.dtu.dk/service.php?NetPhos-3.1", description: "Prediction of Ser, Thr and Tyr phosphorylation sites.", category: "Proteomics > 03. PTM Analysis", icon: "Target" },

  // ============================================
  // METAGENOMICS WORKFLOW
  // ============================================
  { id: "mg1", title: "MG-RAST", url: "https://www.mg-rast.org/", description: "Metagenomics Analysis Server.", category: "Microbiology & Metagenomics > 01. Pipelines & Servers", icon: "Server" },
  { id: "mg2", title: "QIIME 2", url: "https://qiime2.org/", description: "Next-generation microbiome bioinformatics platform.", category: "Microbiology & Metagenomics > 01. Pipelines & Servers", icon: "Terminal" },
  { id: "mg3", title: "Mothur", url: "https://mothur.org/", description: "Open-source software for bioinformatics data processing.", category: "Microbiology & Metagenomics > 01. Pipelines & Servers", icon: "Code" },
  { id: "mg4", title: "SILVA", url: "https://www.arb-silva.de/", description: "Comprehensive ribosomal RNA databases.", category: "Microbiology & Metagenomics > 02. Taxonomy Databases", icon: "Book" },
  { id: "mg5", title: "Greengenes", url: "https://greengenes.secondgenome.com/", description: "16S rRNA gene database.", category: "Microbiology & Metagenomics > 02. Taxonomy Databases", icon: "Leaf" },
  { id: "mg6", title: "PICRUSt2", url: "https://github.com/picrust/picrust2", description: "Functional inference from metagenomic data.", category: "Microbiology & Metagenomics > 03. Functional Profiling", icon: "Cpu" },
  { id: "mg7", title: "CARD", url: "https://card.mcmaster.ca/", description: "Comprehensive Antibiotic Resistance Database.", category: "Microbiology & Metagenomics > 04. Antibiotic Resistance", icon: "Shield" },

  // ============================================
  // AI IN BIOLOGICAL RESEARCH
  // ============================================
  { id: "ai1", title: "AlphaFold DB", url: "https://alphafold.ebi.ac.uk/", description: "AI-predicted 3D structure database.", category: "AI in Biological Research > Structure Prediction", icon: "Box" },
  { id: "ai2", title: "RoseTTAFold", url: "https://robetta.bakerlab.org/", description: "Deep learning based protein structure prediction.", category: "AI in Biological Research > Structure Prediction", icon: "Cpu" },
  { id: "ai3", title: "BioGPT", url: "https://github.com/microsoft/BioGPT", description: "Generative pre-trained transformer for biomedical text generation.", category: "AI in Biological Research > LLMs & NLP", icon: "MessageSquare" },
  { id: "ai4", title: "DeepChem", url: "https://deepchem.io/", description: "Democratizing deep learning for science.", category: "AI in Biological Research > Drug Discovery", icon: "Beaker" },
  { id: "ai5", title: "ESMfold", url: "https://esmatlas.com/", description: "Evolutionary Scale Modeling for protein folding.", category: "AI in Biological Research > Structure Prediction", icon: "Layers" },
  { id: "ai6", title: "DiffDock", url: "https://github.com/gcorso/DiffDock", description: "Diffusion models for molecular docking.", category: "AI in Biological Research > Drug Discovery", icon: "GitMerge" },

  // ============================================
  // CRISPR & GENOME EDITING
  // ============================================
  { id: "cr1", title: "CHOPCHOP", url: "https://chopchop.cbu.uib.no/", description: "Selection of CRISPR/Cas9 target sites.", category: "CRISPR & Genome Editing > Design Tools", icon: "Scissors" },
  { id: "cr2", title: "CRISPOR", url: "http://crispor.tefor.net/", description: "CRISPR guide selection and off-target prediction.", category: "CRISPR & Genome Editing > Design Tools", icon: "Target" },
  { id: "cr3", title: "Addgene", url: "https://www.addgene.org/", description: "Non-profit plasmid repository.", category: "CRISPR & Genome Editing > Resources", icon: "Database" },
  { id: "cr4", title: "Benchling", url: "https://www.benchling.com/", description: "Life sciences R&D cloud platform (Notebook & Molecular Bio).", category: "CRISPR & Genome Editing > Lab Tools", icon: "Monitor" },

  // ============================================
  // PHYLOGENETICS
  // ============================================
  { id: "phy1", title: "MEGA 11", url: "https://www.megasoftware.net/", description: "Molecular Evolutionary Genetics Analysis across computing platforms.", category: "Phylogenetics & Evolution > Software", icon: "Monitor" },
  { id: "phy2", title: "IQ-TREE", url: "http://www.iqtree.org/", description: "Efficient software for phylogenomic inference.", category: "Phylogenetics & Evolution > Software", icon: "GitBranch" },
  { id: "phy3", title: "iTOL", url: "https://itol.embl.de/", description: "Interactive Tree Of Life for annotating trees.", category: "Phylogenetics & Evolution > Visualization", icon: "Share2" },
  { id: "phy4", title: "FigTree", url: "http://tree.bio.ed.ac.uk/software/figtree/", description: "Graphical viewer of phylogenetic trees.", category: "Phylogenetics & Evolution > Visualization", icon: "Eye" },
  { id: "phy5", title: "CIPRES Science Gateway", url: "https://www.phylo.org/", description: "Supercomputer resources for phylogenetics.", category: "Phylogenetics & Evolution > Servers", icon: "Server" },

  // ============================================
  // METABOLOMICS
  // ============================================
  { id: "met1", title: "HMDB", url: "https://hmdb.ca/", description: "Human Metabolome Database.", category: "Metabolomics > Databases", icon: "Database" },
  { id: "met2", title: "MetaboAnalyst", url: "https://www.metaboanalyst.ca/", description: "Comprehensive platform for metabolomics data analysis.", category: "Metabolomics > Analysis", icon: "BarChart2" },
  { id: "met3", title: "METLIN", url: "https://metlin.scripps.edu/", description: "Metabolite and tandem MS database.", category: "Metabolomics > Databases", icon: "Search" },
  { id: "met4", title: "SMPDB", url: "https://smpdb.ca/", description: "Small Molecule Pathway Database.", category: "Metabolomics > Pathways", icon: "Map" },

  // ============================================
  // PRIMER & CLONING (WET LAB)
  // ============================================
  { id: "pc1", title: "Primer-BLAST", url: "https://www.ncbi.nlm.nih.gov/tools/primer-blast/", description: "Primer designing tool (NCBI).", category: "Primer Design & Cloning > Tools", icon: "Target" },
  { id: "pc2", title: "Primer3", url: "https://primer3.ut.ee/", description: "Widely used primer design program.", category: "Primer Design & Cloning > Tools", icon: "Code" },
  { id: "pc3", title: "NEBcutter V3", url: "https://nc3.neb.com/NEBcutter/", description: "Restriction enzyme digestion planner.", category: "Primer Design & Cloning > Tools", icon: "Scissors" },
  { id: "pc4", title: "Reverse Complement", url: "https://www.bioinformatics.org/sms/rev_comp.html", description: "Simple tool to reverse complement DNA sequences.", category: "Primer Design & Cloning > Utilities", icon: "RefreshCw" },

  // ============================================
  // WRITING & RESEARCH PRODUCTIVITY
  // ============================================
  { id: "wr1", title: "Zotero", url: "https://www.zotero.org/", description: "Free, easy-to-use tool to help you collect and cite research.", category: "Research Productivity > Citation Managers", icon: "BookOpen" },
  { id: "wr2", title: "Mendeley", url: "https://www.mendeley.com/", description: "Reference management software.", category: "Research Productivity > Citation Managers", icon: "Book" },
  { id: "wr3", title: "Overleaf", url: "https://www.overleaf.com/", description: "Collaborative online LaTeX editor.", category: "Research Productivity > Writing", icon: "Edit" },
  { id: "wr4", title: "Connected Papers", url: "https://www.connectedpapers.com/", description: "Visualizing the academic landscape of a field.", category: "Research Productivity > Literature Search", icon: "Network" },
  { id: "wr5", title: "ResearchRabbit", url: "https://www.researchrabbit.ai/", description: "Discovery app for research literature.", category: "Research Productivity > Literature Search", icon: "Search" },
  { id: "wr6", title: "BioRender", url: "https://biorender.com/", description: "Create professional scientific figures.", category: "Research Productivity > Visualization", icon: "Image" },

  // ============================================
  // SYNTHETIC BIOLOGY & METABOLIC ENGINEERING
  // ============================================
  { id: "sb1", title: "iGEM Registry", url: "http://parts.igem.org/Main_Page", description: "Registry of Standard Biological Parts.", category: "Synthetic Biology & Metabolic Engineering > Parts & Registries", icon: "Database" },
  { id: "sb2", title: "SBOL", url: "https://sbolstandard.org/", description: "Synthetic Biology Open Language.", category: "Synthetic Biology & Metabolic Engineering > Standards", icon: "Code" },
  { id: "sb3", title: "JBEI-ICE", url: "https://public-registry.jbei.org/", description: "Inventory of Composable Elements.", category: "Synthetic Biology & Metabolic Engineering > Parts & Registries", icon: "Box" },
  { id: "sb4", title: "EcoCyc", url: "https://ecocyc.org/", description: "E. coli Database for metabolic reconstruction.", category: "Synthetic Biology & Metabolic Engineering > Databases", icon: "Search" },
  { id: "sb5", title: "MetaCyc", url: "https://metacyc.org/", description: "Metabolic pathway database.", category: "Synthetic Biology & Metabolic Engineering > Databases", icon: "Map" },

  // ============================================
  // SYSTEMS BIOLOGY & MODELING
  // ============================================
  { id: "sys1", title: "BioModels", url: "https://www.ebi.ac.uk/biomodels/", description: "Repository of mathematical models of biological and biomedical systems.", category: "Systems Biology & Modeling > Repositories", icon: "Database" },
  { id: "sys2", title: "COPASI", url: "http://copasi.org/", description: "COmplex PAthway SImulator.", category: "Systems Biology & Modeling > Software", icon: "Activity" },
  { id: "sys3", title: "CellDesigner", url: "http://www.celldesigner.org/", description: "Modeling tool for biochemical networks.", category: "Systems Biology & Modeling > Software", icon: "Edit" },
  { id: "sys4", title: "Reactome", url: "https://reactome.org/", description: "Pathway database.", category: "Systems Biology & Modeling > Databases", icon: "GitMerge" },

  // ============================================
  // PLANT BIOTECHNOLOGY
  // ============================================
  { id: "pb1", title: "Phytozome", url: "https://phytozome-next.jgi.doe.gov/", description: "Plant comparative genomics portal.", category: "Plant Biotechnology > Genomics", icon: "Leaf" },
  { id: "pb2", title: "Ensembl Plants", url: "https://plants.ensembl.org/index.html", description: "Genome browser for plant species.", category: "Plant Biotechnology > Genomics", icon: "Globe" },
  { id: "pb3", title: "TAIR", url: "https://www.arabidopsis.org/", description: "The Arabidopsis Information Resource.", category: "Plant Biotechnology > Model Organisms", icon: "Search" },
  { id: "pb4", title: "Gramene", url: "https://www.gramene.org/", description: "Comparative resource for plants.", category: "Plant Biotechnology > Genomics", icon: "Database" },

  // ============================================
  // LABORATORY PROTOCOLS
  // ============================================
  { id: "lp1", title: "Protocols.io", url: "https://www.protocols.io/", description: "Share and discover research methods.", category: "Laboratory Protocols > Methods", icon: "BookOpen" },
  { id: "lp2", title: "JoVE", url: "https://www.jove.com/", description: "Journal of Visualized Experiments.", category: "Laboratory Protocols > Video Methods", icon: "Youtube" },
  { id: "lp3", title: "OpenWetWare", url: "https://openwetware.org/wiki/Main_Page", description: "Wiki for biological protocols.", category: "Laboratory Protocols > Methods", icon: "Wiki" },
  { id: "lp4", title: "Springer Nature Protocols", url: "https://experiments.springernature.com/", description: "Protocol exchange.", category: "Laboratory Protocols > Methods", icon: "List" },

  // ============================================
  // SCIENTIFIC ILLUSTRATION
  // ============================================
  { id: "si1", title: "BioIcons", url: "https://bioicons.com/", description: "Free vector illustrations for science.", category: "Scientific Illustration > Assets", icon: "Image" },
  { id: "si2", title: "SciDraw", url: "https://scidraw.io/", description: "Repository of scientific drawings.", category: "Scientific Illustration > Assets", icon: "Edit" },
  { id: "si3", title: "Mind the Graph", url: "https://mindthegraph.com/", description: "Infographic maker for scientists.", category: "Scientific Illustration > Tools", icon: "Layout" },
  { id: "si4", title: "Inkscape", url: "https://inkscape.org/", description: "Free vector graphics editor.", category: "Scientific Illustration > Software", icon: "PenTool" },

  // ============================================
  // FUNDING & GRANTS
  // ============================================
  { id: "fg1", title: "NIH RePORTER", url: "https://reporter.nih.gov/", description: "Search repository of NIH-funded research projects.", category: "Funding & Grants > Search", icon: "Search" },
  { id: "fg2", title: "Grants.gov", url: "https://www.grants.gov/", description: "Search for US federal grants.", category: "Funding & Grants > Search", icon: "DollarSign" },
  { id: "fg3", title: "ProposalCentral", url: "https://proposalcentral.com/", description: "E-grantmaking website.", category: "Funding & Grants > Platforms", icon: "Monitor" },

  // ============================================
  // CAREER DEVELOPMENT
  // ============================================
  { id: "cd1", title: "Nature Careers", url: "https://www.nature.com/naturecareers", description: "Science jobs and career advice.", category: "Career Development > Jobs", icon: "Briefcase" },
  { id: "cd2", title: "Science Careers", url: "https://www.science.org/careers", description: "Job board and career resources.", category: "Career Development > Jobs", icon: "Search" },
  { id: "cd3", title: "ResearchGate Jobs", url: "https://www.researchgate.net/jobs", description: "Find research jobs worldwide.", category: "Career Development > Jobs", icon: "Globe" },

  // ============================================
  // OTHER DISCIPLINES
  // ============================================
  // Epigenomics
  { id: "ep1", title: "ENCODE", url: "https://www.encodeproject.org/", description: "Encyclopedia of DNA Elements.", category: "Epigenomics > 01. Databases", icon: "Database" },
  { id: "ep2", title: "Roadmap Epigenomics", url: "http://www.roadmapepigenomics.org/", description: "Human epigenomic data.", category: "Epigenomics > 01. Databases", icon: "Map" },
  { id: "ep3", title: "DeepBlue", url: "https://deepblue.mpi-inf.mpg.de/", description: "Epigenomic data server.", category: "Epigenomics > 01. Databases", icon: "Server" },
  { id: "ep4", title: "MethBank", url: "https://bigd.big.ac.cn/methbank/", description: "Integrated methylation database.", category: "Epigenomics > 02. Methylation", icon: "Droplet" },

  // Neuroscience
  { id: "ns1", title: "Allen Brain Atlas", url: "https://portal.brain-map.org/", description: "Integrated data and tools for brain research.", category: "Neuroscience > Atlases", icon: "Brain" },
  { id: "ns2", title: "Human Connectome", url: "http://www.humanconnectomeproject.org/", description: "Mapping the human brain connectivity.", category: "Neuroscience > Connectivity", icon: "Network" },
  { id: "ns3", title: "NeuroMorpho", url: "http://neuromorpho.org/", description: "Archive of digitally reconstructed neurons.", category: "Neuroscience > Morphology", icon: "Box" },

  // Single-Cell Omics
  { id: "sc1", title: "PanglaoDB", url: "https://panglaodb.se/", description: "Database of single-cell RNA sequencing experiments.", category: "Single-Cell Omics > Databases", icon: "Database" },
  { id: "sc2", title: "Cellxgene", url: "https://cellxgene.cziscience.com/", description: "Interactive explorer for single-cell transcriptomics data.", category: "Single-Cell Omics > Visualization", icon: "Eye" },
  { id: "sc3", title: "Seurat", url: "https://satijalab.org/seurat/", description: "R toolkit for single cell genomics.", category: "Single-Cell Omics > Tools", icon: "Code" },
  { id: "sc4", title: "Scanpy", url: "https://scanpy.readthedocs.io/", description: "Single-Cell Analysis in Python.", category: "Single-Cell Omics > Tools", icon: "Terminal" },

  // Structural Biology
  { id: "st1", title: "PDB (RCSB)", url: "https://www.rcsb.org/", description: "Protein Data Bank.", category: "Structural Biology > Databases", icon: "Box" },
  { id: "st2", title: "EMDB", url: "https://www.ebi.ac.uk/emdb/", description: "Electron Microscopy Data Bank.", category: "Structural Biology > Microscopy", icon: "Eye" },
  { id: "st3", title: "PyMOL", url: "https://pymol.org/", description: "Molecular visualization system.", category: "Structural Biology > Visualization", icon: "Monitor" },
  { id: "st4", title: "UCSF ChimeraX", url: "https://www.cgl.ucsf.edu/chimerax/", description: "Molecular visualization and analysis.", category: "Structural Biology > Visualization", icon: "Cpu" },

  // Biostatistics & Visualization
  { id: "bs1", title: "R Project", url: "https://www.r-project.org/", description: "Language and environment for statistical computing.", category: "Biostatistics & Visualization > Tools", icon: "Code" },
  { id: "bs2", title: "RStudio", url: "https://posit.co/download/rstudio-desktop/", description: "Integrated Development Environment for R.", category: "Biostatistics & Visualization > Tools", icon: "Terminal" },
  { id: "bs3", title: "GraphPad Prism", url: "https://www.graphpad.com/", description: "Scientific graphing and statistics software.", category: "Biostatistics & Visualization > Tools", icon: "BarChart" },
  { id: "bs4", title: "ggplot2", url: "https://ggplot2.tidyverse.org/", description: "A system for declaratively creating graphics in R.", category: "Biostatistics & Visualization > Libraries", icon: "Image" },
  { id: "bs5", title: "Bioconductor", url: "https://www.bioconductor.org/", description: "Open source software for bioinformatics.", category: "Biostatistics & Visualization > Libraries", icon: "Package" }
];

export const GALLERY_IMAGES = [
  "https://picsum.photos/600/400?random=20",
  "https://picsum.photos/600/400?random=21",
  "https://picsum.photos/600/400?random=22",
  "https://picsum.photos/600/400?random=23",
  "https://picsum.photos/600/400?random=24",
  "https://picsum.photos/600/400?random=25"
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Dr. Anzana Parvin",
    role: "Associate Professor",
    institution: "Dept. of Biotechnology & Genetic Engineering, Islamic University, Bangladesh",
    text: "Ashik is a dedicated researcher with strong skills in both wet-lab and in-silico methodologies.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: "t2",
    name: "Dr. Md. Rokibul Islam",
    role: "Professor",
    institution: "Dept. of Biotechnology & Genetic Engineering, Islamic University, Bangladesh",
    text: "His work on cancer systems biology and drug repurposing shows great promise for future therapeutics.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop"
  }
];

export const AFFILIATIONS: Affiliation[] = [
  {
    id: "af1",
    role: "General Member",
    organization: "Asian Federation of Biotechnology (AFOB)",
    period: "2024 - Present",
    type: "Membership"
  },
  {
    id: "af2",
    role: "Global Outreach Student Member",
    organization: "American Society for Microbiology (ASM)",
    period: "2022 - Present",
    type: "Membership"
  },
  {
    id: "af3",
    role: "Executive Member",
    organization: "Islamic University Model United Nations Association (IUMUNA)",
    period: "2022 - Present",
    type: "Committee"
  },
  {
    id: "af4",
    role: "General Member",
    organization: "Amnesty International",
    period: "2023 - Present",
    type: "Membership"
  }
];
