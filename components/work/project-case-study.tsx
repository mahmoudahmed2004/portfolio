import type { PortfolioProject } from "@/lib/portfolio-data";

import { ProjectEvidence } from "./project-evidence";
import { ResponsibleUseNote } from "./responsible-use-note";

type ProjectCaseStudyProps = {
  project: PortfolioProject;
  index: number;
  compact?: boolean;
};

const narrativeLabels = {
  problem: "Problem",
  approach: "Approach",
  contribution: "Contribution",
  outcome: "Outcome",
} as const;

export function ProjectCaseStudy({
  project,
  index,
  compact = false,
}: ProjectCaseStudyProps) {
  const projectNumber = String(index + 1).padStart(2, "0");
  const titleId = `${project.slug}-title`;

  return (
    <article
      className="project-case-study"
      data-layout={index % 2 === 0 ? "media-right" : "media-left"}
      data-density={compact ? "compact" : "featured"}
      aria-labelledby={titleId}
    >
      <div className="project-case-study__intro">
        <div className="project-case-study__rail" aria-label="Project position">
          <span className="project-case-study__index">{projectNumber}</span>
          <span className="project-case-study__category">
            {project.category}
          </span>
        </div>
        <h3 id={titleId}>{project.title}</h3>
        <p className="project-case-study__summary">{project.summary}</p>
      </div>

      <div className="project-case-study__media">
        {project.evidence.map((evidence) => (
          <ProjectEvidence
            key={evidence.src}
            evidence={evidence}
            title={project.title}
          />
        ))}
      </div>

      <div className="project-case-study__record">
        <dl className="project-narrative">
          {Object.entries(narrativeLabels).map(([key, label]) => (
            <div key={key}>
              <dt>{label}</dt>
              <dd>{project[key as keyof typeof narrativeLabels]}</dd>
            </div>
          ))}
        </dl>

        {project.teamContext ? (
          <div className="project-team-context">
            <p className="project-team-context__label">Team context</p>
            <p>{project.teamContext}</p>
          </div>
        ) : null}

        {project.metrics.length > 0 ? (
          <dl
            className="project-metrics"
            aria-label={`${project.title} reported metrics`}
          >
            {project.metrics.map((metric) => (
              <div key={`${metric.label}-${metric.value}`}>
                <dt>{metric.label}</dt>
                <dd>
                  <strong>{metric.value}</strong>
                  <span>{metric.context}</span>
                </dd>
              </div>
            ))}
          </dl>
        ) : null}

        <div className="project-stack">
          <p className="project-stack__label">Technical stack</p>
          <ul aria-label={`${project.title} technical stack`}>
            {project.stack.map((technology) => (
              <li key={technology}>{technology}</li>
            ))}
          </ul>
        </div>

        {project.responsibleUse ? (
          <ResponsibleUseNote>{project.responsibleUse}</ResponsibleUseNote>
        ) : null}

        <a
          className="project-case-study__repository"
          href={project.repository.href}
          target="_blank"
          rel="noreferrer"
          aria-label={`${project.repository.label} for ${project.title} (opens in a new tab)`}
        >
          <span>{project.repository.label}</span>
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </article>
  );
}
