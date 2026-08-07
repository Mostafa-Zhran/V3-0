import {
  Code2,
  Database,
  Globe,
  Wrench,
  GraduationCap,
  Trophy,
  Star,
  Medal,
  Server,
  Brain,
  Rocket,
  Award,
  Zap,
  Hash,
  Layers,
  Filter,
  Webhook,
  FileJson,
  HardDrive,
  Gauge,
  ShieldCheck,
  KeyRound,
  Key,
  UserCheck,
  Code,
  Palette,
  Sparkles,
  Atom,
  Wind,
  Grid,
  Monitor,
  Boxes,
  Binary,
  Workflow,
  GitBranch,
  FolderGit2,
  Laptop,
  Cloud,
  MousePointer,
  Compass,
  Network,
  Terminal,
  FileCode,
  BrainCircuit,
  Bot,
  LayoutGrid,
  Archive,
  RefreshCw,
  Plug,
  CheckCircle2,
} from "lucide-react";

export const PORTFOLIO_DATA = {
  hero: {
    name: "Mostafa Zahran",
    role: "Computer Science Student & Full Stack .NET Dev",
    badge: "Full Stack .NET Developer",
    description: "I craft exceptional digital experiences with clean, efficient code. Currently pursuing Computer Science and mastering Full Stack .NET development.",
    stack: ["C#", "ASP.NET Core", "SQL Server", "HTML", "CSS", "JS", "Clean Architecture", "SOLID Principles", "RESTful APIs", "JWT Authentication", "OAuth", "Entity Framework Core", "LINQ"],
  },
  stats: [
    { value: "240+", numericValue: 240, label: "Problems Solved", subtext: "Codeforces", icon: Brain },
    { value: "10+", numericValue: 10, label: "Technologies", subtext: "Full Stack", icon: Zap },
    { value: "4+", numericValue: 4, label: "Certifications", subtext: "Verified", icon: Award },
    { value: "5+", numericValue: 5, label: "Projects", subtext: "Built & Deployed", icon: Rocket },
  ],
  about: {
    points: [
      {
        icon: GraduationCap,
        text: "I'm a passionate   Computer Science   student at Arish University with a strong focus on Full Stack .NET development and problem-solving."
      },
      {
        icon: Code2,
        text: "As a   Full-Stack Developer   I specialize in building responsive and scalable web applications using the latest technologies and best practices."
      },
      {
        icon: Wrench,
        text: "Specialized in backend development with  C#, ASP.NET Core API , ASP.NET Core MVC ,SQL Server, Entity Framework Core, and RESTful APIs, applying Clean Architecture, SOLID principles, and modern software engineering practices."
      }
    ],
    techStack: ["C#", "ASP.NET Core API , ASP.NET Core MVC", "SQL Server", "HTML", "CSS", "JS", "Clean Architecture", "SOLID Principles", "RESTful APIs", "JWT Authentication", "OAuth", "Entity Framework Core", "LINQ"]
  },
  education: [
    {
      title: "B.Sc. in Computer Science",
      org: "Arish University",
      date: "2023 — Present",
      desc: "Specializing in Software Engineering , Web Development and AI Solution"
    },
    {
      title: "Full Stack .NET Track",
      org: "Digital Egypt Pioneers",
      date: "Jul 2025 — Jan 2026",
      desc: "Comprehensive training in full-stack development with .NET ecosystem"
    },
    {
      title: "Machine Learning Track",
      org: "NTI — National Telecommunication Institute",
      date: "Aug 2025 — Sep 2025",
      desc: "Data preprocessing, model development, evaluation, and deployment"
    }
  ],
  achievements: [
    {
      icon: Trophy,
      title: "Competitive Programmer",
      desc: "Solved 240+ problems across Codeforces and Codewars platforms."
    },
    {
      icon: Star,
      title: "ECPC Participant",
      desc: "Preparing to participate in ECPC (Egyptian Collegiate Programming Contest) regional competitions, applying advanced algorithmic skills under pressure."
    },
    {
      icon: Medal,
      title: "Full Stack Certified",
      desc: "Completed comprehensive full-stack .NET training through Digital Egypt Pioneers initiative."
    },
    {
      icon: Award,
      title: "TIEC Innovation Ambassador",
      desc: "Selected as one of the TIEC Innovation Ambassadors for TIEC–Patch 2026, representing innovation and technology leadership."
    }
  ],

  /* ─── Competitive Programming Stats ─── */
  cpStats: {
    totalSolved: 241,
    contestsParticipated: 12,
    maxRating: 1200,
    platforms: [
      {
        name: "Codeforces",
        handle: "mostafazahran724",
        link: "https://codeforces.com/profile/mostafazahran724",
        rank: "Pupil",
        rating: 1200,
        solved: 101,
        color: "from-cyan-400 to-blue-500",
        borderColor: "border-cyan-500/30",
        glowColor: "rgba(34,211,238,0.15)",
      },
      {
        name: "Codewars",
        handle: "Mostafa Zahran",
        link: "https://www.codewars.com/users/Mostafa%20Zahran",
        rank: "6 kyu",
        rating: null,
        solved: 140,
        color: "from-red-400 to-orange-500",
        borderColor: "border-red-500/30",
        glowColor: "rgba(239,68,68,0.12)",
      },
    ],
    byDifficulty: [
      { label: "Div. A", sublabel: "800–1200", count: 65, color: "#22d3ee", bgColor: "bg-cyan-400" },
      { label: "Div. B", sublabel: "1300–1600", count: 28, color: "#818cf8", bgColor: "bg-indigo-400" },
      { label: "Div. C", sublabel: "1700–2100", count: 8, color: "#a78bfa", bgColor: "bg-violet-400" },
      { label: "Div. D", sublabel: "2200+", count: 0, color: "#f472b6", bgColor: "bg-pink-400" },
    ],
  },

  /* ─── Journey Timeline ─── */
  timeline: [
    {
      category: "education" as const,
      date: "Sep 2023",
      title: "Started B.Sc. Computer Science",
      org: "Arish University",
      desc: "Began my CS journey focusing on Software Engineering, algorithms, and the foundations of problem-solving.",
      icon: GraduationCap,
    },
    {
      category: "achievement" as const,
      date: "start 2024",
      title: "Competitive Programming Begins",
      org: "Codeforces",
      desc: "Started solving algorithmic challenges daily on Codeforces and Codewars — building intuition for data structures and algorithms.",
      icon: Code2,
    },
    {
      category: "certification" as const,
      date: "Feb 2024",
      title: "Soft Skills & CV Writing",
      org: "ITIDA & Arish University",
      desc: "Professional development training covering career skills, CV crafting, and interview preparation techniques.",
      icon: Award,
    },
    {
      category: "achievement" as const,
      date: "2024–2025",
      title: "250+ Problems Solved",
      org: "Codeforces · Codewars",
      desc: "Solved 250+ algorithmic problems across platforms — mastering data structures, graph theory, and competitive techniques.",
      icon: Trophy,
    },
    {
      category: "education" as const,
      date: "Jul 2025",
      title: "Full Stack .NET Track",
      org: "Digital Egypt Pioneers",
      desc: "Intensive program mastering ASP.NET Core, SQL Server, EF Core, REST APIs, JWT auth, and modern web development.",
      icon: Server,
    },
    {
      category: "certification" as const,
      date: "Aug 2025",
      title: "Machine Learning Track",
      org: "NTI — National Telecom Institute",
      desc: "Deep dive into ML algorithms, data preprocessing, model evaluation and deployment using Python and scikit-learn.",
      icon: Brain,
    },
    {
      category: "certification" as const,
      date: "Aug 2025",
      title: "NVIDIA Deep Learning Cert",
      org: "NVIDIA",
      desc: "Hands-on neural networks, CNNs, and model deployment for computer vision and NLP tasks.",
      icon: Zap,
    },
    {
      category: "project" as const,
      date: "2025 - 2026",
      title: "Production Apps Shipped",
      org: "Mos3ef",
      desc: "Designed, built, and deployed Production web applications .",
      icon: Rocket,
    },
    {
      category: "project" as const,
      date: "2026",
      title: "2 Production Apps Shipped",
      org: "Daleel - Query Flow ",
      desc: "Designed, built, and deployed Production web applications . form public services to search engines",
      icon: Rocket,
    },
    {
      category: "achievement" as const,
      date: "Jul 2026 — Jul 2027",
      title: "TIEC Innovation Ambassador",
      org: "TIEC — Technology Innovation & Entrepreneurship Center",
      desc: "Selected as one of the TIEC Innovation Ambassadors for TIEC–Patch 2026 — representing innovation and technology leadership for one year, bridging entrepreneurs, startups, and the tech ecosystem.",
      icon: Award,
    },
  ],

  skills: [
    {
      category: "Backend Development",
      icon: Server,
      color: "from-cyber-cyan to-blue-500",
      tags: [
        // 1. Language & Frameworks
        { name: "C#", icon: Hash },
        { name: "ASP.NET Core", icon: Server },
        { name: "LINQ", icon: Filter },
        // 2. Architecture & Design Patterns
        { name: "Clean Architecture", icon: Boxes },
        { name: "N-Tier Architecture", icon: LayoutGrid },
        { name: "SOLID Principles", icon: CheckCircle2 },
        { name: "Dependency Injection", icon: Plug },
        { name: "Repository Pattern", icon: Archive },
        { name: "Unit of Work Pattern", icon: RefreshCw },
        // 3. Database & Data Access
        { name: "SQL Server", icon: Database },
        { name: "Entity Framework", icon: Layers },
        { name: "Fluent API", icon: Workflow },
        { name: "Dapper", icon: Gauge },
        { name: "ADO.NET", icon: HardDrive },
        // 4. APIs & Web Services
        { name: "RESTful API", icon: Webhook },
        { name: "Swagger OpenAPI", icon: FileJson },
        // 5. Security & Authentication
        { name: "ASP.NET Core Identity", icon: UserCheck },
        { name: "JWT Bearer Authentication", icon: Key },
        { name: "OAuth", icon: KeyRound },
        { name: "Web Security", icon: ShieldCheck },
      ]
    },
    {
      category: "Frontend Development",
      icon: Globe,
      color: "from-cyber-emerald to-green-500",
      tags: [
        { name: "HTML5", icon: Code },
        { name: "CSS3", icon: Palette },
        { name: "JavaScript", icon: Sparkles },
        { name: "React", icon: Atom },
        { name: "Tailwind CSS", icon: Wind },
        { name: "Bootstrap", icon: Grid },
        { name: "Vite", icon: Rocket },
      ]
    },
    {
      category: "Tools & Concepts",
      icon: Database,
      color: "from-cyber-orange to-red-500",
      tags: [
        { name: "Operating Systems", icon: Monitor },
        { name: "OOP", icon: Boxes },
        { name: "Data Structures", icon: Binary },
        { name: "Algorithms", icon: Workflow },
        { name: "Git", icon: GitBranch },
        { name: "GitHub", icon: FolderGit2 },
        { name: "VS Code", icon: Code2 },
        { name: "Visual Studio", icon: Laptop },
        { name: "SSMS", icon: Database },
        { name: "Vercel", icon: Cloud },
        { name: "Cursor", icon: MousePointer },
        { name: "Windsurf", icon: Compass },
        { name: "Networking", icon: Network },
        { name: "C++", icon: Terminal },
        { name: "Python", icon: FileCode },
        { name: "Machine Learning", icon: BrainCircuit },
        { name: "AI", icon: Bot },
      ]
    }
  ],
  certifications: [
    {
      title: "Full Stack .NET Development",
      issuer: "Digital Egypt Pioneers Initiative",
      date: "Issued: 2025",
      desc: "Comprehensive full-stack development covering C#, ASP.NET Core API, SQL Server, Entity Framework Core, LINQ, RESTful APIs, JWT Authentication, N-Tier Architecture, and SOLID principles.",
      skills: ["C#", "ASP.NET Core API", "SQL Server", "N-Tier Architecture", "SOLID Principles", "RESTful APIs", "JWT Authentication", "Entity Framework Core", "LINQ"],
      link: "https://drive.google.com/file/d/1qpDOkKtN22h34tzetIE40tLoX8Tq_2x_/view?usp=drive_link"
    },
    {
      title: "Machine Learning Track",
      issuer: "NTI — National Telecom Institute",
      date: "Aug 2025 — Sep 2025",
      desc: "Hands-on training in machine learning covering data preprocessing, data cleaning, KNN, Naive Bayes, Linear Regression, Logistic Regression, and model evaluation.",
      skills: ["Data Preprocessing", "Data Cleaning", "KNN", "Naive Bayes", "Linear Regression", "Logistic Regression", "SVM","Random Forest","K-Means","Decision Tree","Model Evaluation","Machine Learning"],
      link: "https://drive.google.com/file/d/13R2uSCJj4nW3tNaZpoUliNhMvrqBy8Ej/view?usp=drive_link"
    },
    {
      title: "Introduction to Deep Learning",
      issuer: "NVIDIA",
      date: "Issued: August 2025",
      desc: "Hands-on training in deep learning concepts, neural networks, CNNs, model optimization, and deployment for computer vision and NLP tasks.",
      skills: ["Deep Learning", "Neural Networks", "CNNs", "Computer Vision", "NLP", "Model Optimization"],
      link: "https://drive.google.com/file/d/1-5Vc5GA7xCU1FwcYFgpXkhk9awa7yoWv/view"
    },
    {
      title: "Soft Skills & CV Writing",
      issuer: "ITIDA & Arish University",
      date: "Issued: February 2024",
      desc: "Practical training in professional soft skills, CV writing, interview preparation, effective communication, and career development to boost employability.",
      skills: ["Soft Skills", "CV Writing", "Interview Skills", "Career Development", "Professional Communication"],
      link: "https://drive.google.com/file/d/1WoFHUjTkyhIQRaKjR7YwcfzB_cjJDrA-/view"
    }
  ],
  projects: [
    {
      title: "Mos3ef Healthcare Platform",
      desc: "A full-stack healthcare web application designed to connect patients with hospital services through a modern, scalable, and user-friendly digital platform. Built with a clean multi-layered .NET 8 backend architecture and a fast React frontend for seamless healthcare management and real-time interaction.",
      tags: [
        ".NET 8",
        "ASP.NET Core Web API",
        "Linq",
        "C#",
        "Entity Framwork",
        "SQL Server",
        "RESTFull API",
        "Swager OpenAPI"
      ],
      highlights: [
        "Clean multi-layered .NET 8 architecture (Repository + Service pattern)",
        "RESTful API with full Swagger/OpenAPI documentation",
        "JWT Bearer authentication & ASP.NET Core Identity",
        "Hospital-patient connection with appointment scheduling",
        "Entity Framework Core with optimized SQL Server queries",
      ],
      challenge: "Designing a scalable multi-tenant data model while keeping API response times under 200ms for all endpoints.",
      img: "/images/projects/mos3ef.png",
      link: "https://mos3ef-website.vercel.app/",
      github: "https://github.com/Mostafa-Zhran/Mos3ef-FullStack-Submission.git"
    },
    {
      title: "QueryFlow Search Engine",
      desc: "A production-ready full-stack search engine featuring TF-IDF ranking, hybrid search capabilities, real-time indexing, and Wikipedia integration. Designed for high performance, scalability, and intelligent information retrieval using modern backend and frontend technologies.",
      tags: [
        "FastAPI",
        "React",
        "TypeScript",
        "PostgreSQL",
        "TF-IDF",
        "Search Engine",
        "REST API",
      ],
      highlights: [
        "TF-IDF ranking algorithm implemented from scratch in Python",
        "Hybrid search combining keyword + semantic matching",
        "Real-time document indexing pipeline",
        "Wikipedia API integration for an expanded searchable corpus",
        "Sub-second query response time at scale",
      ],
      challenge: "Implementing efficient inverted index storage in PostgreSQL to support real-time indexing without query degradation.",
      img: "/images/projects/QueryFlow.png",
      link: "https://q-flow-three.vercel.app/",
      github: "https://github.com/Mostafa-Zhran/Qflow.git",
    },
    {
      title: "Daleel Platform",
      desc: "A crowdsourced platform built to simplify navigating government and private services in Egypt through verified, community-driven guidance. Daleel provides step-by-step procedures, required documents, fees, and official locations while empowering users to validate and improve information collaboratively through an interactive contribution and reward system.",
      tags: [
        ".NET 8",
        "ASP.NET Core Web API",
        "Linq",
        "C#",
        "Entity Framwork",
        "SQL Server",
        "RESTFull API",
        "Swager OpenAPI"
      ],
      highlights: [
        "Crowdsourced content with community-driven verification system",
        "Step-by-step service guides with required documents and fees",
        "Interactive reward & contribution point system",
        "Official location mapping for government services",
        "Role-based access control for contributors and moderators",
      ],
      challenge: "Building a trust-scoring system for crowdsourced content that balances openness with data accuracy.",
      img: "/images/projects/daleel.png",
      link: "https://daleel2030.vercel.app/",
      github: undefined,
    },
    {
      title: "Personal Portfolio V3.0",
      desc: "Upgraded portfolio with refined design, smoother navigation and enhanced project showcases — highlights growth and new skills.",
      tags: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "HTML5", "CSS3", "Vite"],
      highlights: [
        "React 19 + TypeScript with Vite for blazing-fast builds",
        "Framer Motion animations throughout all sections",
        "Fully responsive across mobile, tablet, and desktop",
        "Theme customizer with multiple accent color palettes",
        "Optimized performance with lazy loading and code splitting",
      ],
      challenge: "Achieving smooth 60fps animations on mobile while maintaining a rich animated background.",
      img: "/images/projects/V3.png",
      link: "#",
      github: undefined,
    },
    {
      title: "Sales Management Desktop App",
      desc: "All-in-one desktop solution to track customers, manage inventory, and generate reports with ease.",
      tags: ["C#", "WinForms", ".NET Core", "SQL Server", "Dapper"],
      highlights: [
        "Full customer lifecycle management (CRM-lite)",
        "Real-time inventory tracking with low-stock alerts",
        "Automated report generation (PDF export)",
        "Dapper ORM for optimized SQL Server queries",
        "Clean WinForms UI with custom controls",
      ],
      challenge: "Building a responsive WinForms UI that handles large dataset grids without UI thread blocking.",
      img: "/images/projects/Sales App.png",
      link: "https://github.com/Mostafa-Zhran/Sales-Management-System-Desktop-app.git",
      github: "https://github.com/Mostafa-Zhran/Sales-Management-System-Desktop-app.git",
    },
    {
      title: "Breast Cancer Prediction System",
      desc: "An intelligent machine learning-powered healthcare system designed to analyze medical data and predict breast cancer risk at early stages. The platform integrates multiple ML algorithms to enhance prediction accuracy and support timely diagnosis through a simple and user-friendly web interface.",
      tags: [
        "Python",
        "Flask",
        "Machine Learning",
        "HTML",
        "CSS",
        "Healthcare AI",
        "Data Analysis",
        "4 ML Algorithms"
      ],
      highlights: [
        "4 ML algorithms compared: SVM, Random Forest, KNN, Logistic Regression",
        "94.7% accuracy on the Wisconsin Breast Cancer dataset",
        "Feature engineering and data preprocessing pipeline",
        "Flask REST API serving model predictions",
        "User-friendly web interface for non-technical users",
      ],
      challenge: "Selecting the optimal ML algorithm while avoiding overfitting on a relatively small medical dataset.",
      img: "/images/projects/Cancer detection.png",
      link: "#",
      github: "https://github.com/Mostafa-Zhran/ML-Project-Deployment.git",
    }
  ],
  socials: [
    { name: "Email", link: "mailto:mostafazahran724@gmail.com" },
    { name: "LinkedIn", link: "https://www.linkedin.com/in/mostafa-tamer-zahran/" },
    { name: "GitHub", link: "https://github.com/Mostafa-Zhran" },
    { name: "Codeforces", link: "https://codeforces.com/profile/mostafazahran724" },
    { name: "Codewars", link: "https://www.codewars.com/users/Mostafa%20Zahran" },
    { name: "Facebook", link: "https://www.facebook.com/mostafa.zaharn" }
  ]
};

/* ─── Derived types ─── */
export type Project = typeof PORTFOLIO_DATA.projects[number];
export type TimelineEntry = typeof PORTFOLIO_DATA.timeline[number];
export type CPPlatform = typeof PORTFOLIO_DATA.cpStats.platforms[number];
