/**
 * Blog content helpers — helpers for building article bodies without `any`.
 */
import type { ContentBlock, InlineNode } from "@/types/blog";

export function t(value: string): InlineNode {
  return { type: "text", value };
}

export function internal(
  href: Extract<InlineNode, { type: "internal" }>["href"],
  value: string,
  hash?: string,
): InlineNode {
  return hash
    ? { type: "internal", href, value, hash }
    : { type: "internal", href, value };
}

export function p(...children: InlineNode[]): ContentBlock {
  return { type: "p", children };
}

export function h2(id: string, text: string): ContentBlock {
  return { type: "h2", id, text };
}

export function h3(id: string, text: string): ContentBlock {
  return { type: "h3", id, text };
}

export function ul(...items: string[]): ContentBlock {
  return { type: "ul", items };
}

export function ol(...items: string[]): ContentBlock {
  return { type: "ol", items };
}

export function callout(
  children: InlineNode[],
  title?: string,
): ContentBlock {
  return title
    ? { type: "callout", title, children }
    : { type: "callout", children };
}

export function plain(...paragraphs: string[]): ContentBlock[] {
  return paragraphs.map((value) => p(t(value)));
}
