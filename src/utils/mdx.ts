import fs from "fs";
import path from "path";

const contentDirectory = path.join(process.cwd(), "src/content/blog");

export interface PostMeta {
  slug: string;
  title: string;
  publishedAt: string;
  readTime: number;
  thumbnail: string;
  summary: string;
}

interface MDXModule {
  meta: Omit<PostMeta, "slug">;
  default: React.ComponentType;
}

export async function getAllPosts(): Promise<PostMeta[]> {
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }

  const files = fs.readdirSync(contentDirectory);

  const posts = await Promise.all(
    files
      .filter((file) => file.endsWith(".mdx"))
      .map(async (file) => {
        const slug = file.replace(/\.mdx$/, "");
        const mdxModule = await import(`~/content/blog/${slug}.mdx`) as MDXModule;
        const { meta } = mdxModule;

        return {
          slug,
          title: meta.title,
          publishedAt: meta.publishedAt,
          readTime: meta.readTime,
          thumbnail: meta.thumbnail,
          summary: meta.summary,
        };
      })
  );

  return posts.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );
}

export async function getPostMeta(slug: string): Promise<PostMeta | null> {
  const filePath = path.join(contentDirectory, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const mdxModule = await import(`~/content/blog/${slug}.mdx`) as MDXModule;
  const { meta } = mdxModule;

  return {
    slug,
    title: meta.title,
    publishedAt: meta.publishedAt,
    readTime: meta.readTime,
    thumbnail: meta.thumbnail,
    summary: meta.summary,
  };
}
