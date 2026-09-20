import type { FeatureIconId, FeatureScreenshotKey } from "@/types/feature";

export type SolutionHighlight = {
  id: string;
  titleKey: string;
  descriptionKey: string;
  icon: FeatureIconId;
};

export type SolutionAudience = {
  id: string;
  /** Page anchor without # */
  anchor: string;
  shortKey: string;
  titleKey: string;
  problemKey: string;
  approachKey: string;
  icon: FeatureIconId;
  screenshotKey: FeatureScreenshotKey;
  screenshotAltKey: string;
  /** Feature group anchors for internal linking to /features#… */
  relatedFeatureAnchors: readonly string[];
  highlights: readonly SolutionHighlight[];
};
