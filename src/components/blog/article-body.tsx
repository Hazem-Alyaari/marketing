import { Link } from "@/i18n/navigation";
import type { ContentBlock, InlineNode } from "@/types/blog";
import type { AppRoute } from "@/config/navigation";

function Inline({ nodes }: { nodes: readonly InlineNode[] }) {
  return (
    <>
      {nodes.map((node, index) => {
        if (node.type === "text") {
          return <span key={index}>{node.value}</span>;
        }
        if (node.type === "external") {
          return (
            <a
              key={index}
              href={node.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              {node.value}
            </a>
          );
        }
        const href = node.hash
          ? (`${node.href}#${node.hash}` as `${AppRoute}#${string}`)
          : node.href;
        return (
          <Link
            key={index}
            href={href as AppRoute}
            className="font-medium text-primary underline-offset-4 hover:underline"
          >
            {node.value}
          </Link>
        );
      })}
    </>
  );
}

type ArticleBodyProps = {
  body: readonly ContentBlock[];
};

export function ArticleBody({ body }: ArticleBodyProps) {
  return (
    <div className="article-prose">
      {body.map((block, index) => {
        switch (block.type) {
          case "p":
            return (
              <p key={index}>
                <Inline nodes={block.children} />
              </p>
            );
          case "h2":
            return (
              <h2 key={block.id} id={block.id}>
                {block.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={block.id} id={block.id}>
                {block.text}
              </h3>
            );
          case "ul":
            return (
              <ul key={index}>
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={index}>
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ol>
            );
          case "callout":
            return (
              <aside key={index} className="article-callout">
                {block.title ? (
                  <p className="article-callout-title">{block.title}</p>
                ) : null}
                <p>
                  <Inline nodes={block.children} />
                </p>
              </aside>
            );
          case "quote":
            return (
              <blockquote key={index}>
                <p>{block.text}</p>
              </blockquote>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
