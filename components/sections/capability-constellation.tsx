import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/shell/section-heading";
import { portfolio } from "@/lib/portfolio-data";

export function CapabilityConstellation() {
  return (
    <section
      className="section-shell capability-constellation"
      aria-labelledby="capability-title"
    >
      <Reveal>
        <SectionHeading
          id="capability-title"
          eyebrow="Capability map"
          title="One system, connected disciplines"
          description="The tools change with the problem. The through-line is a complete path from model work to inspectable software."
        />
      </Reveal>

      <Reveal className="capability-map">
        <div className="capability-map__connectors" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
        <ul className="capability-map__groups">
          {portfolio.capabilities.map((capability, index) => {
            const labelId = `capability-group-${index + 1}`;

            return (
              <li className="capability-group" key={capability.title}>
                <span className="capability-group__signal" aria-hidden="true" />
                <p className="capability-group__title" id={labelId}>
                  {capability.title}
                </p>
                <p className="capability-group__summary">
                  {capability.summary}
                </p>
                <ul
                  className="capability-group__skills"
                  aria-labelledby={labelId}
                >
                  {capability.skills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </Reveal>
    </section>
  );
}
