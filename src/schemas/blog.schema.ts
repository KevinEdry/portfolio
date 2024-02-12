import { z } from "zod";
import {
  contentfulJsonSchema,
  contentfulLinksSchema,
} from "./contentful.schema";

export const postSchema = z.object({
  title: z.string(),
  publishedAt: z.string(),
  readTime: z.number(),
  thumbnail: z.object({
    url: z.string(),
  }),
  content: z.object({
    json: contentfulJsonSchema,
    links: contentfulLinksSchema.optional(),
  }),
  sys: z.object({
    id: z.string(),
  }),
});

export type Post = z.infer<typeof postSchema>;

export const blogCollectionResponseSchema = z.object({
  data: z.object({
    blogCollection: z.object({
      items: z.array(postSchema),
    }),
  }),
});

export const blogResponseSchema = z.object({
  data: z.object({
    blog: postSchema,
  }),
});
