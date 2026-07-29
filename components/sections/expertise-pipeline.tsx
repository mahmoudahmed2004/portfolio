import { Reveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/shell/section-heading";
import { portfolio } from "@/lib/portfolio-data";

export function ExpertisePipeline() {
  return (
    <section
      id="expertise"
      className="section-shell expertise"
      aria-labelledby="expertise-title"
      data-observatory-phase="expertise"
    >
      <Reveal>
        <SectionHeading
          id="expertise-title"
          eyebrow="Expertise"
          title="Signal to intelligence"
          description="A practical AI workflow: understand the signal, choose the right model, test the result, and connect it to a product people can use."
        />
      </Reveal>

      <Reveal>
        <ol className="expertise-pipeline" aria-label="AI engineering workflow">
          {portfolio.capabilities.map((capability, index) => (
            <li className="expertise-stage" key={capability.title}>
              <span className="expertise-stage__index" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{capability.title}</h3>
              <p>{capability.summary}</p>
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
}
