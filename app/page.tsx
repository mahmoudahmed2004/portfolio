import Image from "next/image";
import {
  ArrowUpRight,
  BadgeCheck,
  BrainCircuit,
  BriefcaseBusiness,
  Code2,
  Cpu,
  Database,
  GraduationCap,
  Languages,
  Mail,
  MapPin,
  Network,
  Phone,
  Send,
  Sparkles,
  TerminalSquare,
  UsersRound,
  Download,
} from "lucide-react";
import { AnimatedSection } from "@/components/animated-section";
import { CodingBackground } from "@/components/coding-background";
import { CursorSpotlight } from "@/components/cursor-spotlight";
import { MdxContent } from "@/components/mdx-content";
import { ScrollDots } from "@/components/scroll-dots";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  getCertificates,
  getExperience,
  getProfile,
  getProjects,
} from "@/lib/content";
import { cn } from "@/lib/utils";

const navigation = [
  "About",
  "Projects",
  "Skills",
  "Certificates",
  "Experience",
  "Contact",
];

const sectionDots = [
  { id: "intro", label: "Intro" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "certificates", label: "Certificates" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

const terminalLines = [
  "mahmoud.init()",
  "stack: Laravel + Python + AI + Networks",
  "status: calm_under_pressure",
  "next: ship useful things",
];

export default function Home() {
  const profile = getProfile();
  const phoneHref = `tel:${profile.metadata.phone.replace(/[^\d+]/g, "")}`;
  const projects = getProjects();
  const certificates = getCertificates();
  const experience = getExperience();
  const featuredProjects = projects.filter((project) => project.metadata.featured);
  const cvLink = profile.metadata.links.find((link) => link.kind === "download");
  const skillGroups = [
    {
      title: "Web Development",
      icon: Code2,
      items: ["HTML", "CSS", "JavaScript", "PHP", "MySQL", "Laravel"],
    },
    {
      title: "AI & Machine Learning",
      icon: BrainCircuit,
      items: [
        "Model training",
        "Algorithm design",
        "Data preprocessing",
        "TensorFlow",
        "OpenCV",
        "YOLO exposure",
        "Basic LLM workflows",
      ],
    },
    {
      title: "Programming",
      icon: Cpu,
      items: ["Python", "C++", "Java", "SQL", "Problem solving"],
    },
    {
      title: "Networking & Ops",
      icon: Network,
      items: [
        "CCNA-level knowledge",
        "Routing",
        "Switching",
        "Cisco Packet Tracer",
        "Troubleshooting",
        "Project reports",
      ],
    },
  ];

  return (
    <div className="page-shell grain min-h-screen overflow-x-clip text-[var(--text-strong)]">
      <CursorSpotlight />
      <CodingBackground />
      <ScrollDots items={sectionDots} />

      <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[var(--background)]/78 backdrop-blur-xl">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8"
          aria-label="Primary navigation"
        >
          <a
            href="#intro"
            className="font-mono text-sm font-semibold text-[var(--text-strong)]"
          >
            Mahmoud Farouk
          </a>
          <div className="hidden items-center gap-5 text-sm font-medium text-[var(--text-soft)] lg:flex">
            {navigation.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="transition hover:text-[var(--text-strong)]"
              >
                {item}
              </a>
            ))}
          </div>
          <ThemeToggle />
        </nav>
      </header>

      <main
        id="top"
        className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-8"
      >
        <section
          id="intro"
          className="snap-section grid min-h-[calc(100vh-76px)] items-start gap-10 py-12 lg:grid-cols-[1.12fr_0.72fr] lg:py-20 xl:grid-cols-[1.15fr_0.75fr]"
        >
          <div>
            <div className="mb-6 inline-flex max-w-full items-start gap-2 rounded-lg border border-[var(--line)] bg-[var(--surface)]/88 px-3 py-2 text-sm font-medium text-[var(--text-soft)] shadow-sm backdrop-blur sm:items-center">
              <Sparkles size={16} className="shrink-0 text-[var(--accent-warm)]" />
              <span className="min-w-0">{profile.metadata.titlePrefix}</span>
            </div>
            <h1 className="max-w-4xl text-5xl font-black leading-[0.98] tracking-normal text-[var(--text-strong)] sm:text-6xl lg:text-7xl">
              {profile.metadata.name}
            </h1>
            <p className="mt-5 max-w-3xl text-xl font-semibold leading-snug text-[var(--accent-strong)] sm:text-2xl">
              {profile.metadata.headline}
            </p>
            <MdxContent
              source={profile.body}
              className="mt-7 max-w-2xl text-lg"
            />
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#projects"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[var(--text-strong)] px-5 text-sm font-semibold text-[var(--background)] shadow-md transition hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-[var(--background)]"
              >
                View projects
                <ArrowUpRight size={17} />
              </a>
              <a
                href={`mailto:${profile.metadata.email}`}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-[var(--line)] bg-[var(--surface)] px-5 text-sm font-semibold text-[var(--text-strong)] shadow-sm transition hover:-translate-y-0.5 hover:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-[var(--background)]"
              >
                <Mail size={17} />
                Contact me
              </a>
              {cvLink ? (
                <a
                  href={cvLink.href}
                  download
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-[var(--line)] bg-[var(--surface)] px-5 text-sm font-semibold text-[var(--text-strong)] shadow-sm transition hover:-translate-y-0.5 hover:border-[var(--accent)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 focus:ring-offset-[var(--background)]"
                >
                  <Download size={17} />
                  Download CV
                </a>
              ) : null}
            </div>
            <div className="mt-8 flex flex-wrap gap-4 text-sm text-[var(--text-soft)]">
              <span className="inline-flex items-center gap-2">
                <MapPin size={16} className="text-[var(--accent)]" />
                {profile.metadata.location}
              </span>
              <a
                className="inline-flex items-center gap-2 transition hover:text-[var(--text-strong)]"
                href={phoneHref}
              >
                <Phone size={16} className="text-[var(--accent-warm)]" />
                {profile.metadata.phone}
              </a>
            </div>
          </div>

          <div className="hero-media-column grid gap-4">
            <div className="hero-photo-shell">
              <div className="hero-photo-code">
                <span>{"{ web: 'Laravel' }"}</span>
                <span>{"model.train(cv_data)"}</span>
              </div>
              <Image
                src={profile.metadata.profileImage}
                alt={`${profile.metadata.name} portrait`}
                width={900}
                height={1200}
                priority
                className="hero-portrait aspect-[4/5] w-full rounded-lg object-cover object-[50%_18%]"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              {profile.metadata.stats.map((stat) => (
                <div key={stat.label} className="metric-card">
                  <div className="text-2xl font-black text-[var(--text-strong)]">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs font-medium uppercase text-[var(--muted)]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
            <div className="terminal-card">
              <div className="mb-4 flex items-center gap-2 text-[var(--accent-fresh)]">
                <TerminalSquare size={18} />
                <span className="font-mono text-sm">live profile</span>
              </div>
              {terminalLines.map((line) => (
                <p key={line}>
                  <span>$</span> {line}
                </p>
              ))}
            </div>
          </div>
        </section>

        <AnimatedSection id="about" className="snap-section section-block py-16">
          <SectionHeading
            eyebrow="CV translated into a web story"
            title="Web builder, AI learner, and organized technical teammate."
            description="The portfolio now uses the CV as the source of truth: technical skills, operations experience, language level, soft skills, education, and training."
          />
          <div className="mt-8 grid gap-5 lg:grid-cols-[1.08fr_0.92fr]">
            <div className="grid gap-5 sm:grid-cols-2">
              {profile.metadata.specialties.map((item, index) => (
                <article
                  key={item.label}
                  className={cn(
                    "feature-card",
                    index === 0 && "sm:col-span-2",
                  )}
                >
                  <Database size={22} className="text-[var(--accent)]" />
                  <h3>{item.label}</h3>
                  <p>{item.detail}</p>
                </article>
              ))}
            </div>
            <div className="grid gap-5">
              <article className="feature-card">
                <Languages size={22} className="text-[var(--accent-violet)]" />
                <h3>Languages</h3>
                <div className="mt-4 grid gap-3">
                  {profile.metadata.languages.map((language) => (
                    <div
                      key={language.name}
                      className="flex items-center justify-between rounded-lg border border-[var(--line)] bg-[var(--surface-raised)] px-4 py-3"
                    >
                      <span className="font-semibold">{language.name}</span>
                      <span className="text-sm text-[var(--text-soft)]">
                        {language.level}
                      </span>
                    </div>
                  ))}
                </div>
              </article>
              <article className="feature-card">
                <UsersRound size={22} className="text-[var(--accent-warm)]" />
                <h3>Soft Skills</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {profile.metadata.softSkills.map((skill) => (
                    <Tag key={skill}>{skill}</Tag>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection id="projects" className="snap-section section-block py-16">
          <SectionHeading
            eyebrow="Selected work"
            title="Projects and labs framed like case studies."
            description="The first entries come from the CV. Add real screenshots, GitHub links, and results whenever you want to make them stronger."
          />
          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {(featuredProjects.length ? featuredProjects : projects).map(
              (project, index) => (
                <article
                  key={project.slug}
                  className={cn(
                    "project-card group",
                    index === 0 && "lg:col-span-2",
                  )}
                >
                  <div className="project-visual">
                    {project.metadata.image ? (
                      <Image
                        src={project.metadata.image}
                        alt={`${project.metadata.title} preview`}
                        width={1000}
                        height={620}
                        className="project-image h-full w-full object-cover"
                      />
                    ) : (
                      <div className="project-visual-placeholder">
                        <span>{project.slug}</span>
                        <strong>{project.metadata.stack.slice(0, 3).join(" / ")}</strong>
                      </div>
                    )}
                  </div>
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <span className="rounded-lg bg-[var(--text-strong)] px-3 py-1 text-xs font-semibold uppercase text-[var(--background)]">
                      {project.metadata.year}
                    </span>
                    <Code2
                      size={22}
                      className="text-[var(--accent)] transition group-hover:rotate-6"
                    />
                  </div>
                  <h3 className="text-2xl font-bold tracking-normal">
                    {project.metadata.title}
                  </h3>
                  <p className="mt-3 leading-7 text-[var(--text-soft)]">
                    {project.metadata.summary}
                  </p>
                  <p className="mt-5 text-sm font-semibold text-[var(--accent-strong)]">
                    {project.metadata.role}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.metadata.stack.map((item) => (
                      <Tag key={item}>{item}</Tag>
                    ))}
                  </div>
                  {project.metadata.links?.length ? (
                    <div className="mt-6 flex flex-wrap gap-3">
                      {project.metadata.links.map((link) => (
                        <a
                          key={link.href}
                          href={link.href}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent-strong)]"
                        >
                          {link.label}
                          <ArrowUpRight size={15} />
                        </a>
                      ))}
                    </div>
                  ) : null}
                </article>
              ),
            )}
          </div>
        </AnimatedSection>

        <AnimatedSection id="skills" className="snap-section section-block py-16">
          <SectionHeading
            eyebrow="Capability map"
            title="A practical stack across web, AI, networks, and execution."
            description="Everything here comes from the CV, grouped so recruiters can scan it quickly."
          />
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {skillGroups.map((group) => {
              const Icon = group.icon;

              return (
                <article key={group.title} className="skill-panel">
                  <div className="flex items-center gap-3">
                    <span className="grid size-11 place-items-center rounded-lg bg-[var(--text-strong)] text-[var(--background)]">
                      <Icon size={20} />
                    </span>
                    <h3 className="text-xl font-bold">{group.title}</h3>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <Tag key={item}>{item}</Tag>
                    ))}
                  </div>
                </article>
              );
            })}
          </div>
        </AnimatedSection>

        <AnimatedSection id="certificates" className="snap-section section-block py-16">
          <SectionHeading
            eyebrow="Verified learning"
            title="Certificates and technical achievements."
            description="Real certificates from AI training, technical events, and competitions, with full-size credential files available where provided."
          />
          {certificates.length ? (
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {certificates.map((certificate) => (
                <article key={certificate.slug} className="certificate-card">
                  <a
                    href={
                      certificate.metadata.credentialUrl ||
                      certificate.metadata.image ||
                      "/images/certificate-placeholder.svg"
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="certificate-preview block"
                    aria-label={`Open ${certificate.metadata.title} certificate`}
                  >
                    <Image
                      src={
                        certificate.metadata.image ||
                        "/images/certificate-placeholder.svg"
                      }
                      alt={`${certificate.metadata.title} certificate`}
                      width={1200}
                      height={760}
                      className="certificate-image h-full w-full object-contain"
                    />
                  </a>
                  <div className="p-5">
                    <BadgeCheck
                      size={24}
                      className="text-[var(--accent-fresh)]"
                    />
                    <h3 className="mt-4 text-xl font-bold">
                      {certificate.metadata.title}
                    </h3>
                    <p className="mt-2 text-[var(--text-soft)]">
                      {certificate.metadata.issuer} · {certificate.metadata.date}
                    </p>
                  </div>
                  {certificate.metadata.credentialUrl ? (
                    <a
                      href={certificate.metadata.credentialUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mx-5 mb-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent-strong)]"
                    >
                      View credential
                      <ArrowUpRight size={15} />
                    </a>
                  ) : null}
                </article>
              ))}
            </div>
          ) : (
            <div className="certificate-empty mt-8">
              <div className="certificate-preview">
                <Image
                  src="/images/certificate-placeholder.svg"
                  alt="Certificate preview slot"
                  width={1200}
                  height={760}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-6 lg:p-8">
                <BadgeCheck size={28} className="text-[var(--accent-fresh)]" />
                <h3 className="mt-4 text-2xl font-black">
                  Certificate images are ready.
                </h3>
                <p className="mt-3 max-w-2xl text-lg leading-8 text-[var(--text-soft)]">
                  Put the image in
                  <code className="mx-2 rounded bg-[var(--surface-raised)] px-2 py-1 font-mono text-sm text-[var(--text-strong)]">
                    public/images/certificates/
                  </code>
                  then add its path in the certificate MDX file.
                </p>
              </div>
            </div>
          )}
        </AnimatedSection>

        <AnimatedSection id="experience" className="snap-section section-block py-16">
          <SectionHeading
            eyebrow="Timeline"
            title="Work, training, networking, and student activity."
            description="The timeline is now filled from the CV and keeps training separate from certificates."
          />
          <div className="mt-8 grid gap-4">
            {experience.map((item) => (
              <article key={item.slug} className="timeline-card">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-lg bg-[var(--surface-raised)] px-3 py-1 text-xs font-semibold uppercase text-[var(--accent-strong)]">
                    <BriefcaseBusiness size={14} />
                    {item.metadata.type}
                  </span>
                  <p className="mt-4 font-mono text-sm text-[var(--muted)]">
                    {item.metadata.start} - {item.metadata.end}
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-bold">{item.metadata.role}</h3>
                  <p className="mt-1 font-semibold text-[var(--accent-strong)]">
                    {item.metadata.company}
                  </p>
                  <ul className="mt-4 grid gap-2 text-[var(--text-soft)]">
                    {item.metadata.highlights.map((highlight) => (
                      <li key={highlight} className="leading-7">
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection id="education" className="snap-section section-block py-16">
          <SectionHeading
            eyebrow="Education"
            title={profile.metadata.education.school}
            description={`${profile.metadata.education.degree} · ${profile.metadata.education.location} · ${profile.metadata.education.start} - ${profile.metadata.education.end}`}
          />
          <div className="mt-8 rounded-lg border border-[var(--line)] bg-[var(--surface)]/88 p-6 shadow-sm backdrop-blur">
            <GraduationCap size={28} className="text-[var(--accent-violet)]" />
            <div className="mt-4 flex flex-wrap gap-2">
              {profile.metadata.focus.map((item) => (
                <Tag key={item}>{item}</Tag>
              ))}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection id="contact" className="snap-section py-16">
          <div className="contact-panel">
            <div>
              <p className="font-mono text-sm uppercase text-[var(--accent-fresh)]">
                Contact
              </p>
              <h2 className="mt-4 max-w-3xl text-4xl font-black leading-tight tracking-normal md:text-5xl">
                Ready for a role, internship, freelance build, or AI training project.
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--contact-soft)]">
                I am based in Cairo and open to practical technical work where I can build, learn, coordinate, and deliver with a calm team mindset.
              </p>
            </div>
            <div className="contact-actions">
              <ContactLink
                href={`mailto:${profile.metadata.email}`}
                icon={<Mail size={19} />}
                label="Email"
                value={profile.metadata.email}
              />
              <ContactLink
                href={phoneHref}
                icon={<Phone size={19} />}
                label="Phone"
                value={profile.metadata.phone}
              />
              {cvLink ? (
                <ContactLink
                  href={cvLink.href}
                  icon={<Download size={19} />}
                  label="Resume"
                  value="Download CV"
                  download
                />
              ) : null}
              <a
                href={`mailto:${profile.metadata.email}`}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[var(--accent-fresh)] px-5 text-sm font-black text-[#102014] transition hover:-translate-y-0.5"
              >
                <Send size={17} />
                Start a conversation
              </a>
            </div>
          </div>
        </AnimatedSection>
      </main>

      <footer className="relative z-10 border-t border-[var(--line)] px-5 py-8 text-center text-sm text-[var(--muted)] sm:px-8">
        Built with Next.js, TypeScript, Tailwind CSS, Motion, and MDX content.
      </footer>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="font-mono text-sm font-semibold uppercase text-[var(--accent-warm)]">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-4xl font-black leading-tight tracking-normal text-[var(--text-strong)] md:text-5xl">
        {title}
      </h2>
      <p className="mt-4 text-lg leading-8 text-[var(--text-soft)]">
        {description}
      </p>
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-lg border border-[var(--line)] bg-[var(--surface-raised)] px-3 py-1 text-sm font-medium text-[var(--text-soft)]">
      {children}
    </span>
  );
}

function ContactLink({
  href,
  icon,
  label,
  value,
  download,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  value: string;
  download?: boolean;
}) {
  return (
    <a href={href} download={download} className="contact-link">
      <span className="contact-link__icon">{icon}</span>
      <span>
        <span className="block text-xs font-semibold uppercase text-[var(--contact-muted)]">
          {label}
        </span>
        <span className="mt-1 block font-semibold">{value}</span>
      </span>
    </a>
  );
}
