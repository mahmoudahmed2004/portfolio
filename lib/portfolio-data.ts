export type PublicLink = {
  label: string;
  href: string;
  kind: "social" | "email" | "download" | "repository";
};

export type ProjectMetric = {
  label: string;
  value: string;
  context: string;
};

export type ProjectEvidence = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

export type PortfolioProject = {
  slug: string;
  title: string;
  category: "Featured AI" | "Software System";
  summary: string;
  problem: string;
  approach: string;
  contribution: string;
  outcome: string;
  stack: string[];
  metrics: ProjectMetric[];
  evidence: ProjectEvidence[];
  repository: PublicLink;
  teamContext?: string;
  responsibleUse?: string;
};

export type PortfolioCertificate = {
  slug: string;
  title: string;
  issuer: string;
  year: string;
  detail: string;
  image: string;
  original: string;
};

export type PortfolioExperience = {
  organization: string;
  role: string;
  period: string;
  type: "Experience" | "Training" | "Student activity" | "Education";
  summary: string;
};

export type PortfolioData = {
  identity: {
    name: string;
    role: string;
    headline: string;
    education: string;
    location: string;
    introduction: string;
    biography: string;
    links: PublicLink[];
  };
  navigation: { label: string; href: string }[];
  capabilities: {
    title: string;
    summary: string;
    skills: string[];
  }[];
  projects: PortfolioProject[];
  experience: PortfolioExperience[];
  certificates: PortfolioCertificate[];
};

export const portfolio = {
  identity: {
    name: "Mahmoud Ahmed Farouk",
    role: "AI Engineer",
    headline:
      "AI Engineer | Machine Learning & Deep Learning | Computer Vision | Automation | Python",
    education:
      "Computer Science Graduate — Modern Academy, Class of 2026",
    location: "Cairo, Egypt",
    introduction:
      "I build AI systems that move from data and evaluation to useful, human-facing software.",
    biography:
      "I am an AI Engineer focused on machine learning, deep learning, computer vision, retrieval systems, and automation. My software development experience helps me turn model work into interfaces, APIs, and complete products.",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/mahmoudahmed2004",
        kind: "social",
      },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/mahmoud-farouk-72737924a",
        kind: "social",
      },
      {
        label: "Email",
        href: "mailto:maf.bns@gmail.com",
        kind: "email",
      },
      {
        label: "Download CV",
        href: "/docs/mahmoud-ahmed-farouk-cv.pdf",
        kind: "download",
      },
    ],
  },
  navigation: [
    { label: "Work", href: "#work" },
    { label: "Expertise", href: "#expertise" },
    { label: "About", href: "#about" },
    { label: "Certificates", href: "#certificates" },
    { label: "Contact", href: "#contact" },
  ],
  capabilities: [
    {
      title: "Machine learning",
      summary:
        "Structured experiments, preprocessing, model comparison, and evaluation.",
      skills: ["scikit-learn", "XGBoost", "LightGBM", "Pandas", "NumPy"],
    },
    {
      title: "Deep learning & vision",
      summary:
        "CNN architectures, transfer learning, generative models, and visual inference.",
      skills: ["TensorFlow", "Keras", "OpenCV", "CNN", "DCGAN"],
    },
    {
      title: "Retrieval & automation",
      summary:
        "Grounded retrieval, relevance correction, source attribution, and workflow automation.",
      skills: ["ChromaDB", "Gemini", "Embeddings", "RAG", "Python"],
    },
    {
      title: "Product engineering",
      summary:
        "APIs and interfaces that make model behavior visible and usable.",
      skills: ["FastAPI", "Django REST", "Flutter", "PySide6", "SQL"],
    },
  ],
  projects: [
    {
      slug: "genoscene-app",
      title: "GenoScene",
      category: "Featured AI",
      summary:
        "A graduation project exploring forensic DNA phenotyping through probabilistic trait prediction and a mobile product experience.",
      problem:
        "Translate genotype inputs into understandable distributions for visible traits while coordinating mobile, backend, and ML services.",
      approach:
        "A Flutter client communicates with a Django REST and PostgreSQL application layer plus a FastAPI inference service using tabular ML models.",
      contribution:
        "Contributed to the team graduation-project workflow represented by the repository; public copy does not claim sole authorship.",
      outcome:
        "The application reports eye, hair, and skin trait probabilities and can create an explicitly illustrative portrait and PDF summary.",
      stack: [
        "Flutter",
        "Django REST",
        "FastAPI",
        "PostgreSQL",
        "scikit-learn",
        "XGBoost",
        "LightGBM",
      ],
      metrics: [],
      evidence: [
        {
          src: "/images/projects/genoscene-app-1600.avif",
          alt:
            "GenoScene Learn interface showing DNA phenotyping guides and media tabs",
          width: 1600,
          height: 1000,
        },
      ],
      repository: {
        label: "View repository",
        href: "https://github.com/mahmoudahmed2004/GenoScene_app",
        kind: "repository",
      },
      teamContext:
        "Team graduation project. Contributions are described without claiming sole authorship.",
      responsibleUse:
        "Research-oriented probabilities are not definitive identity claims. Any portrait is illustrative.",
    },
    {
      slug: "oralvision",
      title: "OralVision",
      category: "Featured AI",
      summary:
        "A six-class oral disease image-classification study comparing a custom CNN with transfer-learning architectures.",
      problem:
        "Compare model families for a multi-class image task and expose the result through a clear web interface.",
      approach:
        "Trained and evaluated Custom CNN, ResNet50, and EfficientNet-B3 models, then bundled the selected workflow with FastAPI.",
      contribution:
        "Built the documented training comparison, evaluation artifacts, and inference interface.",
      outcome:
        "EfficientNet-B3 produced the strongest repository-reported evaluation and powers the included interface.",
      stack: ["Python", "TensorFlow", "EfficientNet-B3", "FastAPI"],
      metrics: [
        {
          label: "Accuracy",
          value: "98.41%",
          context: "Repository-reported EfficientNet-B3 evaluation",
        },
        {
          label: "Macro F1",
          value: "98.14%",
          context: "Repository-reported EfficientNet-B3 evaluation",
        },
      ],
      evidence: [
        {
          src: "/images/projects/oralvision-1600.avif",
          alt: "OralVision FastAPI classification interface",
          width: 1600,
          height: 1000,
        },
      ],
      repository: {
        label: "View repository",
        href:
          "https://github.com/mahmoudahmed2004/oral-diseases-image-classification",
        kind: "repository",
      },
      responsibleUse:
        "This is a research classifier and is not a clinical diagnosis service.",
    },
    {
      slug: "corrective-rag",
      title: "Corrective RAG System",
      category: "Featured AI",
      summary:
        "A document question-answering system that evaluates retrieval quality, performs one bounded correction, and cites its sources.",
      problem:
        "Keep answers grounded when the first retrieval pass is weak across several document formats.",
      approach:
        "Uses local all-MiniLM-L6-v2 embeddings, ChromaDB retrieval, Gemini relevance evaluation, and at most one query rewrite.",
      contribution:
        "Implemented the documented ingestion, retrieval, correction, attribution, Streamlit interface, and deterministic tests.",
      outcome:
        "The workflow supports PDF, DOCX, TXT, and CSV documents with visible source attribution.",
      stack: [
        "Python",
        "ChromaDB",
        "Hugging Face",
        "Gemini",
        "Streamlit",
      ],
      metrics: [],
      evidence: [
        {
          src: "/images/projects/corrective-rag-1600.avif",
          alt: "Corrective RAG Streamlit document workspace",
          width: 1600,
          height: 1000,
        },
      ],
      repository: {
        label: "View repository",
        href: "https://github.com/mahmoudahmed2004/Corrective-RAG-System",
        kind: "repository",
      },
    },
    {
      slug: "realistic-face-dcgan",
      title: "Realistic Face DCGAN",
      category: "Featured AI",
      summary:
        "A TensorFlow and Keras DCGAN experiment trained on 30,000 CelebA images to synthesize 64×64 face samples.",
      problem:
        "Train a stable adversarial image generator and document its progression in a constrained notebook environment.",
      approach:
        "Used convolutional generator and discriminator networks over 30 epochs in the documented Colab T4 environment.",
      contribution:
        "Implemented and trained the documented DCGAN workflow and exported the sample progression.",
      outcome:
        "The repository contains synthetic face grids and final generator and discriminator losses.",
      stack: ["Python", "TensorFlow", "Keras", "DCGAN", "CelebA"],
      metrics: [
        {
          label: "Generator loss",
          value: "2.2427",
          context: "Repository-reported final training loss",
        },
        {
          label: "Discriminator loss",
          value: "0.7276",
          context: "Repository-reported final training loss",
        },
      ],
      evidence: [
        {
          src: "/images/projects/realistic-face-dcgan-1600.avif",
          alt: "Grid of synthetic 64 by 64 face samples generated by the DCGAN",
          width: 1600,
          height: 1000,
        },
      ],
      repository: {
        label: "View repository",
        href: "https://github.com/mahmoudahmed2004/Realistic-Face-DCGAN",
        kind: "repository",
      },
      responsibleUse:
        "Every face shown is a synthetic model artifact, not a real person supplied as project evidence.",
    },
    {
      slug: "pos-system",
      title: "Point of Sale System",
      category: "Software System",
      summary:
        "A desktop point-of-sale system covering role-based workflows, inventory, payments, refunds, loyalty, reporting, and kitchen operations.",
      problem:
        "Coordinate everyday retail and restaurant operations in one local desktop application.",
      approach:
        "Built the documented application with PySide6, SQLAlchemy, and SQLite.",
      contribution:
        "Implemented the repository’s desktop workflows and persisted business data through SQLAlchemy.",
      outcome:
        "The repository demonstrates admin and cashier flows, reporting, inventory, and kitchen display screens.",
      stack: ["Python", "PySide6", "SQLAlchemy", "SQLite"],
      metrics: [],
      evidence: [
        {
          src: "/images/projects/pos-system-1600.avif",
          alt: "Point of Sale desktop dashboard",
          width: 1600,
          height: 1000,
        },
      ],
      repository: {
        label: "View repository",
        href: "https://github.com/mahmoudahmed2004/pos-system",
        kind: "repository",
      },
    },
    {
      slug: "genoscene-website",
      title: "GenoScene Web Prototype",
      category: "Software System",
      summary:
        "An earlier bilingual product prototype for the GenoScene phenotype-prediction workflow.",
      problem:
        "Explore the interaction and information design of the GenoScene concept before the mobile product matured.",
      approach:
        "Combined a browser interface with the repository’s phenotype-processing and API experiments.",
      contribution:
        "Developed the documented prototype and used it to explore product presentation and interaction.",
      outcome:
        "The prototype records an earlier product iteration and the evolution toward the graduation application.",
      stack: ["JavaScript", "Python", "HTML", "CSS"],
      metrics: [],
      evidence: [
        {
          src: "/images/projects/genoscene-website-1600.avif",
          alt: "GenoScene bilingual web prototype interface",
          width: 1600,
          height: 1000,
        },
      ],
      repository: {
        label: "View repository",
        href: "https://github.com/mahmoudahmed2004/GenoScene-website",
        kind: "repository",
      },
      responsibleUse:
        "The prototype explores probabilistic phenotype presentation and is not a definitive identification tool.",
    },
  ],
  experience: [
    {
      organization: "Eram Group",
      role: "Project Management & Admin Support",
      period: "January 2025 — Present",
      type: "Experience",
      summary:
        "Coordinated project tasks, monitored progress, prepared reports, supported team communication, and assisted daily operations.",
    },
    {
      organization: "INSTANT Software Solutions",
      role: "AI & Machine Learning Trainee",
      period: "July 2025 — December 2025",
      type: "Training",
      summary:
        "Regression, classification, clustering, TensorFlow, CNNs, RNNs, computer vision, NLP, YOLO, OpenCV, and introductory LLM workflows.",
    },
    {
      organization: "Div Academy",
      role: "AI & Machine Learning Trainee",
      period: "August 2024 — October 2024",
      type: "Training",
      summary: "Practical machine-learning training recorded in the supplied CV.",
    },
    {
      organization: "IT Gate Academy",
      role: "CCNA Trainee",
      period: "August 2023 — October 2023",
      type: "Training",
      summary: "Networking fundamentals, routing, switching, and troubleshooting.",
    },
    {
      organization: "Enactus",
      role: "IT Team Member",
      period: "January 2023 — May 2023",
      type: "Student activity",
      summary: "Technical student-team participation recorded in the supplied CV.",
    },
    {
      organization: "Modern Academy",
      role: "Computer Science Graduate",
      period: "2022 — 2026",
      type: "Education",
      summary: "Computer Science Graduate — Modern Academy, Class of 2026.",
    },
  ],
  certificates: [
    {
      slug: "instant-ai-diploma",
      title: "AI Diploma",
      issuer: "INSTANT Software Solutions",
      year: "2025",
      detail: "170 training hours · issued 1 December 2025",
      image: "/images/certificates/instant-ai-diploma.webp",
      original: "/images/certificates/instant-ai-diploma.webp",
    },
    {
      slug: "digitopia-2025",
      title: "Digitopia 2025",
      issuer: "Egypt Ministry of Communications and Information Technology",
      year: "2025",
      detail: "Software Solutions and AI track · university students",
      image: "/images/certificates/digitopia-2025.webp",
      original: "/docs/certificates/digitopia-2025.pdf",
    },
    {
      slug: "build-with-ai-masr",
      title: "Build with AI — Masr Edition",
      issuer: "Google for Developers & ITI",
      year: "2025",
      detail: "Build with AI participation certificate",
      image: "/images/certificates/build-with-ai-masr.webp",
      original: "/docs/certificates/build-with-ai-masr.pdf",
    },
  ],
} satisfies PortfolioData;
