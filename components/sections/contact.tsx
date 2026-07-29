import { SectionHeading } from "@/components/shell/section-heading";
import { portfolio } from "@/lib/portfolio-data";

export function Contact() {
  const contactLinks = portfolio.identity.links.filter(
    (link) => link.kind === "email" || link.kind === "social",
  );

  return (
    <section
      id="contact"
      className="section-shell contact"
      aria-labelledby="contact-title"
      data-observatory-phase="contact"
    >
      <span className="section-index" aria-hidden="true">
        06
      </span>
      <div className="contact__signal" aria-hidden="true">
        <span />
      </div>
      <div className="contact__copy">
        <SectionHeading
          id="contact-title"
          eyebrow="Contact"
          title="Start a direct conversation"
          description="For AI engineering, product work, or a thoughtful technical exchange, choose the channel that fits."
        />
      </div>
      <ul className="contact__links" aria-label="Contact methods">
        {contactLinks.map((link) => {
          const external = link.href.startsWith("http");

          return (
            <li key={link.href}>
              <a
                className="focus-ring"
                href={link.href}
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer" : undefined}
              >
                <span>
                  <small>
                    {link.kind === "email" ? "Write directly" : "Open profile"}
                  </small>
                  <strong>{link.label}</strong>
                </span>
                <span aria-hidden="true">{external ? "↗" : "→"}</span>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
