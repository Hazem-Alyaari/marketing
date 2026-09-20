import type { LucideIcon } from "lucide-react";
import {
  ClipboardList,
  FileBarChart,
  GraduationCap,
  School,
  Wallet,
} from "lucide-react";

export type WorkflowStepIconId =
  | "admission"
  | "academics"
  | "assessment"
  | "finance"
  | "reporting";

export type WorkflowStep = {
  id: string;
  titleKey: string;
  descriptionKey: string;
  icon: WorkflowStepIconId;
};

/**
 * Conceptual product story — verified capability domains only.
 * Does not claim an automated end-to-end pipeline.
 */
export const workflowSteps = [
  {
    id: "admission",
    titleKey: "steps.admission.title",
    descriptionKey: "steps.admission.description",
    icon: "admission",
  },
  {
    id: "academics",
    titleKey: "steps.academics.title",
    descriptionKey: "steps.academics.description",
    icon: "academics",
  },
  {
    id: "assessment",
    titleKey: "steps.assessment.title",
    descriptionKey: "steps.assessment.description",
    icon: "assessment",
  },
  {
    id: "finance",
    titleKey: "steps.finance.title",
    descriptionKey: "steps.finance.description",
    icon: "finance",
  },
  {
    id: "reporting",
    titleKey: "steps.reporting.title",
    descriptionKey: "steps.reporting.description",
    icon: "reporting",
  },
] as const satisfies readonly WorkflowStep[];

const workflowIcons = {
  admission: GraduationCap,
  academics: School,
  assessment: ClipboardList,
  finance: Wallet,
  reporting: FileBarChart,
} as const satisfies Record<WorkflowStepIconId, LucideIcon>;

export function getWorkflowIcon(id: WorkflowStepIconId): LucideIcon {
  return workflowIcons[id];
}
