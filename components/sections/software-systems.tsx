import { SectionHeading } from "@/components/shell/section-heading";
import { ProjectCaseStudy } from "@/components/work/project-case-study";
import { portfolio } from "@/lib/portfolio-data";

export function SoftwareSystems() {
  const softwareProjects = portfolio.projects.filter(
    (project) => project.category === "Software System",
  );
  const featuredCount = portfolio.projects.filter(
    (project) => project.category === "Featured AI",
  ).length;

  return (
    <section
      className="section-shell software-systems"
      aria-labelledby="software-systems-title"
    >
      <SectionHeading
        id="software-systems-title"
        eyebrow="Supporting systems"
        title="Software that carries the model work"
        description="Desktop and web systems show how technical concepts become operable product workflows."
      />
      <div className="project-case-studies project-case-studies--compact">
        {softwareProjects.map((project, index) => (
          <ProjectCaseStudy
            key={project.slug}
            project={project}
            index={featuredCount + index}
            compact
          />
        ))}
      </div>
    </section>
  );
}
