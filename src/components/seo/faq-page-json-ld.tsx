import { JsonLd } from "@/components/seo/json-ld";

export type FaqJsonLdItem = {
  question: string;
  answer: string;
};

type FaqPageJsonLdProps = {
  items: FaqJsonLdItem[];
};

/**
 * FAQPage structured data.
 * Only pass questions/answers that are visibly rendered on the page.
 */
export function FaqPageJsonLd({ items }: FaqPageJsonLdProps) {
  if (items.length === 0) {
    return null;
  }

  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return <JsonLd data={data} />;
}
