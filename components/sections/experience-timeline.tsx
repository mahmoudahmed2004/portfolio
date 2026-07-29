import { SectionHeading } from "@/components/shell/section-heading";
import type { PortfolioExperience } from "@/lib/portfolio-data";

type ExperienceTimelineProps = {
  experience: PortfolioExperience[];
};

export function ExperienceTimeline({
  experience,
}: ExperienceTimelineProps) {
  return (
    <section
      id="experience"
      className="section-shell experience-timeline"
      aria-labelledby="experience-title"
      data-observatory-phase="timeline"
    >
      <span className="section-index" aria-hidden="true">
        03
      </span>
      <SectionHeading
        id="experience-title"
        eyebrow="Experience & education"
        title="Practice, training, and education"
        description="A continuous record of delivery, focused study, and the foundations behind the systems shown above."
      />

      <ol className="experience-timeline__list">
        {experience.map((entry, index) => (
          <li key={`${entry.organization}-${entry.period}`}>
            <article aria-labelledby={`experience-${index + 1}`}>
              <div className="experience-timeline__signal" aria-hidden="true">
                <span>{String(index + 1).padStart(2, "0")}</span>
              </div>
              <div className="experience-timeline__when">
                <p>{entry.type}</p>
                <p>{entry.period}</p>
              </div>
              <div className="experience-timeline__copy">
                <h3 id={`experience-${index + 1}`}>
                  {entry.organization}
                </h3>
                <p className="experience-timeline__role">{entry.role}</p>
                {entry.type === "Education" ? null : (
                  <p className="experience-timeline__summary">
                    {entry.summary}
                  </p>
                )}
              </div>
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}
