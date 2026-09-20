"use client";

import { JumpNav } from "@/components/ui/jump-nav";
import { solutionAudiences } from "@/data/solutions";

type SolutionsJumpNavProps = {
  labels: Record<string, string>;
  ariaLabel: string;
};

export function SolutionsJumpNav({
  labels,
  ariaLabel,
}: SolutionsJumpNavProps) {
  return (
    <JumpNav items={solutionAudiences} labels={labels} ariaLabel={ariaLabel} />
  );
}
