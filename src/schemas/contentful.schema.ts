import { z } from "zod";

export const contentfulJsonSchema = z.object({
  nodeType: z.literal("document"),
  data: z.object({}),
  content: z.unknown(),
});

export const contentfulLinksSchema = z.object({
  assets: z.object({
    block: z.array(
      z.object({
        sys: z.object({
          id: z.string(),
        }),
        url: z.string(),
        description: z.string(),
      }),
    ),
  }),
});

export const contentfulNodeSchema = z.object({
  data: z.object({
    target: z.object({
      sys: z.object({
        id: z.string(),
        type: z.string(),
        linkType: z.string(),
      }),
    }),
  }),
});
