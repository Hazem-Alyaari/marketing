import { withBasePath } from "@/lib/utils";

/**
 * Product screenshot media config for marketing.
 * Mark `available: true` only when the file exists under public/images/screenshots/.
 *
 * Mapping:
 * - students → students.png
 * - academics → schedule.png
 * - attendance → grades.png
 * - finance → accounting.png
 * - hr → employees.png
 * - supervision → supervision.png
 * - operations → behavior.png
 * - permissions → permissions.png
 * - dashboard → dashboard.png
 * - studentPortal → student-portal.png
 * - guardianPortal → guardian-portal.png
 */
const hdSlot = {
  recommendedWidth: 1920,
  recommendedHeight: 950,
} as const;

function shot(path: `/images/screenshots/${string}`) {
  return withBasePath(path);
}

export const productScreenshots = {
  dashboard: {
    src: shot("/images/screenshots/dashboard.png"),
    available: true,
    width: 1024,
    height: 506,
    aspectRatio: "1024 / 506",
    ...hdSlot,
  },
  students: {
    src: shot("/images/screenshots/students.png"),
    available: true,
    width: 1911,
    height: 948,
    aspectRatio: "1911 / 948",
    ...hdSlot,
  },
  academics: {
    src: shot("/images/screenshots/schedule.png"),
    available: true,
    width: 1911,
    height: 948,
    aspectRatio: "1911 / 948",
    ...hdSlot,
  },
  attendance: {
    src: shot("/images/screenshots/grades.png"),
    available: true,
    width: 1911,
    height: 949,
    aspectRatio: "1911 / 949",
    ...hdSlot,
  },
  finance: {
    src: shot("/images/screenshots/accounting.png"),
    available: true,
    width: 1911,
    height: 949,
    aspectRatio: "1911 / 949",
    ...hdSlot,
  },
  hr: {
    src: shot("/images/screenshots/employees.png"),
    available: true,
    width: 1911,
    height: 957,
    aspectRatio: "1911 / 957",
    ...hdSlot,
  },
  supervision: {
    src: shot("/images/screenshots/supervision.png"),
    available: true,
    width: 1911,
    height: 957,
    aspectRatio: "1911 / 957",
    ...hdSlot,
  },
  operations: {
    src: shot("/images/screenshots/behavior.png"),
    available: true,
    width: 1911,
    height: 957,
    aspectRatio: "1911 / 957",
    ...hdSlot,
  },
  permissions: {
    src: shot("/images/screenshots/permissions.png"),
    available: true,
    width: 1911,
    height: 957,
    aspectRatio: "1911 / 957",
    ...hdSlot,
  },
  studentPortal: {
    src: shot("/images/screenshots/student-portal.png"),
    available: true,
    width: 1899,
    height: 952,
    aspectRatio: "1899 / 952",
    ...hdSlot,
  },
  guardianPortal: {
    src: shot("/images/screenshots/guardian-portal.png"),
    available: true,
    width: 1899,
    height: 952,
    aspectRatio: "1899 / 952",
    ...hdSlot,
  },
} as const;

export type ProductScreenshotKey = keyof typeof productScreenshots;
