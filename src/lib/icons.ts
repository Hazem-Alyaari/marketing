import type { LucideIcon } from "lucide-react";
import {
  Bell,
  BookOpen,
  BookUser,
  Briefcase,
  Building2,
  Calculator,
  CalendarDays,
  ChartColumn,
  ClipboardCheck,
  ClipboardList,
  Eye,
  FileBadge,
  FileText,
  GraduationCap,
  Handshake,
  HeartHandshake,
  KeyRound,
  Landmark,
  Layers,
  LayoutDashboard,
  MessagesSquare,
  PenLine,
  Receipt,
  School,
  Shield,
  UserCog,
  UserPlus,
  Users,
  Wallet,
} from "lucide-react";
import type { FeatureIconId } from "@/types/feature";
import type { ModuleIconId } from "@/types/module";
import type { UserRoleIconId, ValuePillarItem } from "@/types/common";

const moduleIcons = {
  "graduation-cap": GraduationCap,
  "book-open": BookOpen,
  "clipboard-check": ClipboardCheck,
  wallet: Wallet,
  briefcase: Briefcase,
  messages: MessagesSquare,
} as const satisfies Record<ModuleIconId, LucideIcon>;

const userIcons = {
  "building-2": Building2,
  "graduation-cap": GraduationCap,
  "clipboard-list": ClipboardList,
  calculator: Calculator,
  users: Users,
  "book-user": BookUser,
  "heart-handshake": HeartHandshake,
} as const satisfies Record<UserRoleIconId, LucideIcon>;

const valueIcons = {
  layers: Layers,
  shield: Shield,
  eye: Eye,
} as const satisfies Record<ValuePillarItem["icon"], LucideIcon>;

const featureIcons = {
  "graduation-cap": GraduationCap,
  "book-open": BookOpen,
  "book-user": BookUser,
  "clipboard-check": ClipboardCheck,
  "clipboard-list": ClipboardList,
  wallet: Wallet,
  briefcase: Briefcase,
  messages: MessagesSquare,
  shield: Shield,
  "user-plus": UserPlus,
  users: Users,
  "calendar-days": CalendarDays,
  "file-text": FileText,
  receipt: Receipt,
  landmark: Landmark,
  "user-cog": UserCog,
  bell: Bell,
  "file-badge": FileBadge,
  "building-2": Building2,
  "key-round": KeyRound,
  "layout-dashboard": LayoutDashboard,
  school: School,
  "pen-line": PenLine,
  "chart-column": ChartColumn,
  handshake: Handshake,
  "heart-handshake": HeartHandshake,
  calculator: Calculator,
  eye: Eye,
} as const satisfies Record<FeatureIconId, LucideIcon>;

export function getModuleIcon(id: ModuleIconId): LucideIcon {
  return moduleIcons[id];
}

export function getUserIcon(id: UserRoleIconId): LucideIcon {
  return userIcons[id];
}

export function getValueIcon(id: ValuePillarItem["icon"]): LucideIcon {
  return valueIcons[id];
}

export function getFeatureIcon(id: FeatureIconId): LucideIcon {
  return featureIcons[id];
}

/** Resolve icons used on the About page (feature / user / value sets). */
export function getAboutIcon(id: AboutPrincipleIconLike): LucideIcon {
  if (id in featureIcons) {
    return featureIcons[id as FeatureIconId];
  }
  if (id in userIcons) {
    return userIcons[id as UserRoleIconId];
  }
  return valueIcons[id as ValuePillarItem["icon"]];
}

type AboutPrincipleIconLike =
  | FeatureIconId
  | UserRoleIconId
  | ValuePillarItem["icon"];

