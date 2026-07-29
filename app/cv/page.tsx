import type { Metadata } from "next";
import Link from "next/link";
import { portfolio } from "@/lib/portfolio-data";
import "./print.css";

export const metadata: Metadata = {
  title: `CV | ${portfolio.identity.name}`,
  description: `${portfolio.identity.name}'s public AI engineering CV.`,
};

export default function CvPage() {
  const { identity, capabilities, projects, experience, certificates } =
    portfolio;
  const workHistory = experience.filter((entry) => entry.type !== "Education");
  const education = experience.filter((entry) => entry.type === "Education");
  const publicLinks = identity.links.filter(
    (link) => link.kind === "email" || link.kind === "social",
  );

  return (
    <main id="main-content" className="cv-page">
      <header className="cv-header">
        <div>
          <p className="cv-kicker">Curriculum vitae</p>
          <h1>{identity.name}</h1>
          <p className="cv-role">{identity.headline}</p>
          <p>{identity.location}</p>
        </div>
        <address className="cv-contact">
          {publicLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </address>
      </header>

      <nav className="cv-actions" aria-label="CV actions">
        <Link href="/">Back to portfolio</Link>
        <a
          href="/docs/mahmoud-ahmed-farouk-cv.pdf"
          target="_blank"
          rel="noreferrer"
        >
          Open PDF
        </a>
        <a href="/docs/mahmoud-ahmed-farouk-cv.docx" download>
          Download DOCX
        </a>
      </nav>

      <section className="cv-section" aria-labelledby="cv-profile">
        <h2 id="cv-profile">Profile</h2>
        <p>{identity.biography}</p>
      </section>

      <section className="cv-section" aria-labelledby="cv-skills">
        <h2 id="cv-skills">Skills</h2>
        <div className="cv-skill-groups">
          {capabilities.map((capability) => (
            <div className="cv-skill-group" key={capability.title}>
              <h3>{capability.title}</h3>
              <p>{capability.skills.join(" · ")}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="cv-section" aria-labelledby="cv-projects">
        <h2 id="cv-projects">Selected projects</h2>
        <div className="cv-projects">
          {projects.map((project) => (
            <article className="cv-project" key={project.slug}>
              <div className="cv-entry-heading">
                <h3>{project.title}</h3>
                <p>{project.category}</p>
              </div>
              <p>{project.summary}</p>
              <p className="cv-compact">{project.stack.join(" · ")}</p>
              <a href={project.repository.href}>Repository</a>
            </article>
          ))}
        </div>
      </section>

      <section className="cv-section" aria-labelledby="cv-experience">
        <h2 id="cv-experience">Experience</h2>
        <div className="cv-entries">
          {workHistory.map((entry) => (
            <article
              className="cv-entry"
              key={`${entry.organization}-${entry.period}`}
            >
              <div className="cv-entry-heading">
                <h3>{entry.organization}</h3>
                <p>{entry.period}</p>
              </div>
              <p className="cv-entry-role">{entry.role}</p>
              <p>{entry.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="cv-section" aria-labelledby="cv-education">
        <h2 id="cv-education">Education</h2>
        <div className="cv-entries">
          {education.map((entry) => (
            <article
              className="cv-entry"
              key={`${entry.organization}-${entry.period}`}
            >
              <div className="cv-entry-heading">
                <h3>{entry.organization}</h3>
                <p>{entry.period}</p>
              </div>
              <p className="cv-entry-role">{entry.role}</p>
              <p>{entry.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="cv-section" aria-labelledby="cv-certificates">
        <h2 id="cv-certificates">Certificates</h2>
        <ul className="cv-certificates">
          {certificates.map((certificate) => (
            <li className="cv-certificate" key={certificate.slug}>
              <div>
                <strong>{certificate.title}</strong>
                <span>
                  {certificate.issuer} · {certificate.year}
                </span>
                <span>{certificate.detail}</span>
              </div>
              <a href={certificate.original}>Original</a>
            </li>
          ))}
        </ul>
      </section>

      <footer className="cv-footer">
        <p>{identity.education}</p>
        <p>Use your browser&apos;s print command for an A4 copy.</p>
      </footer>
    </main>
  );
}
