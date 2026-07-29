import { SectionHeading } from "@/components/shell/section-heading";
import { SiteFooter } from "@/components/shell/site-footer";
import { SiteHeader } from "@/components/shell/site-header";
import { portfolio } from "@/lib/portfolio-data";

const sections = [
  {
    id: "expertise",
    eyebrow: "Expertise",
    title: "Signal to intelligence",
  },
  {
    id: "work",
    eyebrow: "Selected work",
    title: "AI systems, examined in context",
  },
  {
    id: "experience",
    eyebrow: "Experience",
    title: "Practice, training, and education",
  },
  {
    id: "certificates",
    eyebrow: "Certificates",
    title: "Verified learning milestones",
  },
  {
    id: "about",
    eyebrow: "About",
    title: "AI engineering, made useful",
  },
  {
    id: "contact",
    eyebrow: "Contact",
    title: "Start a conversation",
  },
] as const;

export default function Home() {
  return (
    <div className="site-shell">
      <SiteHeader items={portfolio.navigation} />
      <main id="main-content">
        <section
          id="intro"
          className="section-shell shell-intro"
          aria-labelledby="intro-title"
        >
          <div>
            <p className="eyebrow">Neural observatory · Cairo, Egypt</p>
            <h1 id="intro-title">{portfolio.identity.name}</h1>
            <p className="shell-intro__role">{portfolio.identity.role}</p>
            <p className="shell-intro__summary">
              {portfolio.identity.introduction}
            </p>
          </div>
          <div className="shell-aperture" aria-hidden="true">
            <span className="shell-aperture__ring" />
            <span className="shell-aperture__core" />
            <span className="shell-aperture__label">Signal / 001</span>
          </div>
        </section>

        {sections.map((section, index) => (
          <section
            key={section.id}
            id={section.id}
            className="section-shell shell-placeholder"
            aria-labelledby={`${section.id}-title`}
          >
            <span className="shell-placeholder__index" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <SectionHeading
              id={`${section.id}-title`}
              eyebrow={section.eyebrow}
              title={section.title}
            />
          </section>
        ))}
      </main>
      <SiteFooter />
    </div>
  );
}
