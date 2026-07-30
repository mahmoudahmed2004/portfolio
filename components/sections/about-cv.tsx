import { SectionHeading } from "@/components/shell/section-heading";
import { portfolio } from "@/lib/portfolio-data";

export function AboutCV() {
  const { identity } = portfolio;

  return (
    <section
      id="about"
      className="section-shell about-cv"
      aria-labelledby="about-title"
    >
      <span className="section-index" aria-hidden="true">
        05
      </span>
      <SectionHeading
        id="about-title"
        eyebrow="About & CV"
        title="AI engineering, made useful"
      />

      <div className="about-cv__body">
        <div className="about-cv__statement">
          <p>{identity.biography}</p>
          <p className="about-cv__education">{identity.education}</p>
        </div>

        <aside className="about-cv__record" aria-label="CV formats">
          <p className="eyebrow">Public record</p>
          <p>
            Read the web version, open the accessible PDF, or keep an editable
            DOCX copy.
          </p>
          <ul>
            <li>
              <a className="focus-ring" href="/cv">
                Open printable CV
                <span aria-hidden="true">↗</span>
              </a>
            </li>
            <li>
              <a
                className="focus-ring"
                href="/docs/mahmoud-ahmed-farouk-cv.pdf"
                target="_blank"
                rel="noreferrer"
              >
                View PDF CV
                <span aria-hidden="true">↗</span>
              </a>
            </li>
            <li>
              <a
                className="focus-ring"
                href="/docs/mahmoud-ahmed-farouk-cv.docx"
                download
              >
                Download DOCX CV
                <span aria-hidden="true">↓</span>
              </a>
            </li>
          </ul>
        </aside>
      </div>
    </section>
  );
}
