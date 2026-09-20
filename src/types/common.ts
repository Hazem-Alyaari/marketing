export type SolutionItem = {
  id: string;
  nameKey: string;
  descriptionKey: string;
};

export type UserRoleIconId =
  | "building-2"
  | "graduation-cap"
  | "clipboard-list"
  | "calculator"
  | "users"
  | "book-user"
  | "heart-handshake";

export type UserTypeItem = {
  id: string;
  nameKey: string;
  descriptionKey: string;
  icon: UserRoleIconId;
};

export type ValuePillarItem = {
  id: string;
  titleKey: string;
  descriptionKey: string;
  icon: "layers" | "shield" | "eye";
};

export type SocialLink = {
  id: string;
  labelKey: string;
  href: string;
};

