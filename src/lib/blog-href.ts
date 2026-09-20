import type { BlogCategoryId } from "@/types/blog";
import { routes } from "@/config/navigation";

export function blogHref(category?: BlogCategoryId): string {
  if (!category) {
    return routes.blog;
  }
  return `${routes.blog}?category=${category}`;
}
