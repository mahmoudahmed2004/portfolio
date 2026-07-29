import Image from "next/image";

import type { ProjectEvidence as ProjectEvidenceData } from "@/lib/portfolio-data";

type ProjectEvidenceProps = {
  evidence: ProjectEvidenceData;
  title: string;
};

export function ProjectEvidence({
  evidence,
  title,
}: ProjectEvidenceProps) {
  return (
    <figure className="project-evidence">
      <div className="project-evidence__viewport">
        <Image
          className="project-evidence__image"
          src={evidence.src}
          alt={evidence.alt}
          width={evidence.width}
          height={evidence.height}
          sizes="(min-width: 1200px) 46vw, (min-width: 768px) 80vw, 100vw"
        />
      </div>
      <figcaption>
        <span aria-hidden="true">Observed output</span>
        <span>{title} project evidence</span>
      </figcaption>
    </figure>
  );
}
