export type FeatureIconId =
  | "graduation-cap"
  | "book-open"
  | "book-user"
  | "clipboard-check"
  | "clipboard-list"
  | "wallet"
  | "briefcase"
  | "messages"
  | "shield"
  | "user-plus"
  | "users"
  | "calendar-days"
  | "file-text"
  | "receipt"
  | "landmark"
  | "user-cog"
  | "bell"
  | "file-badge"
  | "building-2"
  | "key-round"
  | "layout-dashboard"
  | "school"
  | "pen-line"
  | "chart-column"
  | "handshake"
  | "heart-handshake"
  | "calculator"
  | "eye";

export type FeatureScreenshotKey =
  | "dashboard"
  | "students"
  | "academics"
  | "attendance"
  | "finance"
  | "hr"
  | "supervision"
  | "operations"
  | "permissions"
  | "studentPortal"
  | "guardianPortal";

export type FeatureCapability = {
  id: string;
  titleKey: string;
  descriptionKey: string;
  icon: FeatureIconId;
};

export type FeatureGroup = {
  id: string;
  /** Page anchor without # */
  anchor: string;
  titleKey: string;
  shortKey: string;
  descriptionKey: string;
  icon: FeatureIconId;
  screenshotKey: FeatureScreenshotKey;
  screenshotAltKey: string;
  capabilities: readonly FeatureCapability[];
};

export type FeatureConnectionStep = {
  id: string;
  titleKey: string;
  descriptionKey: string;
  icon: FeatureIconId;
};
