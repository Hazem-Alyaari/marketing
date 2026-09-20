import type { BlogCategory } from "@/types/blog";
import { BLOG_CATEGORIES } from "@/types/blog";

export const blogCategories: readonly BlogCategory[] = BLOG_CATEGORIES.map(
  (id) => ({
    id,
    labelKey: `categories.${toCamel(id)}.label`,
    descriptionKey: `categories.${toCamel(id)}.description`,
  }),
);

function toCamel(id: string): string {
  return id.replace(/-([a-z])/g, (_, c: string) => c.toUpperCase());
}

export function getBlogCategory(id: string): BlogCategory | undefined {
  return blogCategories.find((category) => category.id === id);
}

export function isBlogCategoryId(
  value: string,
): value is BlogCategory["id"] {
  return (BLOG_CATEGORIES as readonly string[]).includes(value);
}
