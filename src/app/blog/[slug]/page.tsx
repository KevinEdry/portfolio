import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Social from "~/components/social/social";
import ExitLink from "~/components/exit-link/exit-link";
import { format } from "date-fns";
import { getAllPosts, getPostMeta } from "~/utils/mdx";

export const revalidate = 3600;
export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const meta = await getPostMeta(slug);

  if (!meta) {
    return {};
  }

  return {
    title: meta.title,
    description: meta.summary,
    openGraph: {
      type: "article",
      title: meta.title,
      description: meta.summary,
      publishedTime: meta.publishedAt,
      images: [{ url: meta.thumbnail }],
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.summary,
      images: [meta.thumbnail],
    },
  };
}

export default async function Post({ params }: Props) {
  const { slug } = await params;
  const meta = await getPostMeta(slug);

  if (!meta) {
    notFound();
  }

  const { default: Content } = await import(`~/content/blog/${slug}.mdx`);

  const { publishedAt, readTime, title } = meta;

  const posts = await getAllPosts();
  const currentIndex = posts.findIndex((post) => post.slug === slug);
  const nextPost = posts[currentIndex + 1] ?? posts[0];

  return (
    <div className="article-content absolute left-0 top-0 z-50 h-full w-full overflow-auto bg-background/85 backdrop-blur-2xl">
      <ExitLink href="/blog" />
      <div className="container mx-auto flex w-full flex-col gap-6 px-4 py-16 lg:w-[680px] lg:gap-8 lg:px-0 lg:py-32">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold lg:text-5xl">{title}</h1>
        </div>
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <Image
            src="/images/profile.jpeg"
            width={50}
            height={50}
            alt="Kevin's profile picture"
            className="h-10 w-10 rounded-full lg:h-[50px] lg:w-[50px]"
          />
          <div className="flex w-full flex-col gap-3 lg:flex-row lg:items-center lg:justify-between lg:gap-1">
            <div>
              <h3 className="font-bold">Kevin Edry</h3>
              <h4 className="text-sm text-text-muted">
                {readTime} min read · {format(publishedAt, "MMM dd, yyyy")}
              </h4>
            </div>
            <ul className="flex gap-4 lg:gap-8">
              <Social
                platform="linkedin"
                link="https://www.linkedin.com/in/kevinedry/"
              />
              <Social platform="github" link="https://github.com/KevinEdry" />
              <Social platform="medium" link="https://medium.com/@techg9" />
              <Social platform="twitter" link="https://twitter.com/KevinEdry" />
            </ul>
          </div>
        </div>
        <hr className="w-full text-primary" />
        <div className="text-base leading-7 lg:text-lg">
          <Content />
        </div>
        <hr className="w-full text-primary" />
        <div className="flex flex-col gap-6">
          <div className="flex items-start gap-4">
            <Image
              src="/images/profile.jpeg"
              width={50}
              height={50}
              alt="Kevin's profile picture"
              className="h-12 w-12 rounded-full"
            />
            <div className="flex flex-col gap-1">
              <h3 className="font-bold">Kevin Edry</h3>
              <p className="text-sm leading-6 text-text-secondary">
                Entrepreneur, manager, and engineer in Seattle, writing about
                how engineering teams actually work.{" "}
                <Link
                  href="/contact"
                  className="font-medium text-text underline decoration-primary underline-offset-4 hover:text-primary"
                >
                  Get in touch
                </Link>
              </p>
            </div>
          </div>
          {nextPost != null && nextPost.slug !== slug && (
            <Link
              href={`/blog/${nextPost.slug}`}
              className="glass group flex flex-col gap-1 rounded-2xl px-5 py-4 transition-colors duration-200 hover:bg-white/10"
            >
              <span className="text-xs uppercase tracking-[0.18em] text-text-muted">
                Read next
              </span>
              <span className="font-bold group-hover:text-primary">
                {nextPost.title}
              </span>
              <span className="text-sm text-text-secondary">
                {nextPost.readTime} min read
              </span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
