import type { ReactNode } from "react";

type SectionLabelProps = {
  number: string;
  children: ReactNode;
};

export function SectionLabel({ number, children }: SectionLabelProps) {
  return (
    <p className="section-label">
      <span className="section-num">{number}</span>
      <span>{children}</span>
    </p>
  );
}
