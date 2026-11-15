import type { MDXComponents } from "mdx/types";
import Image from "next/image";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => (
      <h1 className="pt-5 text-3xl font-bold">{children}</h1>
    ),
    p: ({ children }) => (
      <p className="py-5 text-lg leading-8 text-text/85">{children}</p>
    ),
    strong: ({ children }) => <span className="font-bold">{children}</span>,
    ol: ({ children }) => (
      <ol className="list-decimal pl-8 text-lg leading-8 marker:text-text-muted">
        {children}
      </ol>
    ),
    ul: ({ children }) => (
      <ul className="list-disc pl-8 text-lg leading-8 marker:text-text-muted">
        {children}
      </ul>
    ),
    li: ({ children }) => (
      <li className="text-lg leading-8 text-text/85">{children}</li>
    ),
    hr: () => (
      <div className="flex h-10 w-full items-center justify-center">
        <div className="mx-2 h-1 w-1 rounded-full bg-text-muted"></div>
        <div className="mx-2 h-1 w-1 rounded-full bg-text-muted"></div>
        <div className="mx-2 h-1 w-1 rounded-full bg-text-muted"></div>
      </div>
    ),
    a: ({ href, children }) => (
      <a
        href={href}
        target="_blank"
        className="font-medium text-text underline decoration-primary underline-offset-4 hover:text-primary"
      >
        {children}
      </a>
    ),
    img: ({ src, alt }) => (
      <span className="flex w-full flex-col items-center justify-center gap-3 py-5">
        <Image
          src={src ?? ""}
          width={600}
          height={400}
          alt={alt ?? ""}
          className="rounded-sm"
        />
        {alt && (
          <span className="text-sm font-light text-text-muted">{alt}</span>
        )}
      </span>
    ),
    ...components,
  };
}
