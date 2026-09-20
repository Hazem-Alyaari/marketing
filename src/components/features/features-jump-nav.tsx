"use client";

import { JumpNav } from "@/components/ui/jump-nav";
import { featureGroups } from "@/data/features";

type FeaturesJumpNavProps = {
  labels: Record<string, string>;
  ariaLabel: string;
};

/** Features-page wrapper around the shared JumpNav. */
export function FeaturesJumpNav({ labels, ariaLabel }: FeaturesJumpNavProps) {
  return (
    <JumpNav
      items={featureGroups}
      labels={labels}
      ariaLabel={ariaLabel}
    />
  );
}
