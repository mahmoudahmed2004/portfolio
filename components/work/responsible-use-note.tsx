import type { ReactNode } from "react";

type ResponsibleUseNoteProps = {
  children: ReactNode;
};

export function ResponsibleUseNote({
  children,
}: ResponsibleUseNoteProps) {
  return (
    <aside
      className="responsible-use-note"
      aria-label="Responsible use note"
    >
      <p className="responsible-use-note__label">Research context</p>
      <p>{children}</p>
    </aside>
  );
}
