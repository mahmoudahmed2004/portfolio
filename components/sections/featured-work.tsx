import { SectionHeading } from "@/components/shell/section-heading";
import { ProjectCaseStudy } from "@/components/work/project-case-study";
import { portfolio } from "@/lib/portfolio-data";

export function FeaturedWork() {
  const featuredProjects = portfolio.projects.filter(
    (project) => project.category === "Featured AI",
  );

  return (
    <section
      id="work"
      className="section-shell featured-work"
      aria-labelledby="work-title"
      data-observatory-phase="work"
    >
      <span className="section-index" aria-hidden="true">
        02
      </span>
      <SectionHeading
        id="work-title"
        eyebrow="Featured AI work"
        title="AI systems, examined in context"
        description="Six verified repositories presented through the decisions, evidence, and limits that make their results meaningful."
      />
      <div className="project-case-studies">
        {featuredProjects.map((project, index) => (
          <ProjectCaseStudy
            key={project.slug}
            project={project}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}
