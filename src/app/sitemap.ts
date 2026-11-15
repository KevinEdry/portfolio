import type { MetadataRoute } from "next";
import { getAllPosts } from "~/utils/mdx";

const BASE_URL = "https://kevin-edry.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();

  const routes: MetadataRoute.Sitemap = [
    "",
    "/blog",
    "/books",
    "/oss",
    "/contact",
  ].map((route) => ({
    url: `${BASE_URL}${route}`,
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.7,
  }));

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: "yearly",
    priority: 0.6,
  }));

  return [...routes, ...postRoutes];
}
