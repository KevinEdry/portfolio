import type { MDXComponents } from "mdx/types";
import Image from "next/image";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => <h1 className="pt-5 text-3xl">{children}</h1>,
    p: ({ children }) => (
      <p className="py-5 text-lg font-light leading-6 text-text-secondary">
        {children}
      </p>
    ),
    strong: ({ children }) => <span className="font-bold">{children}</span>,
    ol: ({ children }) => (
      <ol className="list-decimal pl-8 text-lg font-light leading-6 marker:text-text-secondary">
        {children}
      </ol>
    ),
    ul: ({ children }) => (
      <ul className="list-disc pl-8 text-lg font-light leading-6 marker:text-text-secondary">
        {children}
      </ul>
    ),
    li: ({ children }) => (
      <li className="text-lg font-light leading-6 text-text-secondary">{children}</li>
    ),
    hr: () => (
      <div className="flex h-10 w-full items-center justify-center">
        <div className="mx-2 h-1 w-1 rounded-full bg-text-secondary"></div>
        <div className="mx-2 h-1 w-1 rounded-full bg-text-secondary"></div>
        <div className="mx-2 h-1 w-1 rounded-full bg-text-secondary"></div>
      </div>
    ),
    a: ({ href, children }) => (
      <a href={href} target="_blank" className="font-medium underline text-text-secondary">
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
          <span className="text-sm font-light text-text-secondary/50">
            {alt}
          </span>
        )}
      </span>
    ),
    ...components,
  };
}
