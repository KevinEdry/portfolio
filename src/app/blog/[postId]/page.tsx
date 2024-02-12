import Image from "next/image";
import Link from "next/link";
import Social from "~/components/social/social";
import ExitIcon from "~/public/icons/exit.svg";
import { fetchContentfulGraphQL } from "~/utils/fetchContentfulGraphQL";
import type { Post } from "~/schemas/blog.schema";
import { blogResponseSchema } from "~/schemas/blog.schema";
import { format } from "date-fns";

import {
  documentToReactComponents,
  type Options,
} from "@contentful/rich-text-react-renderer";
import { BLOCKS, MARKS } from "@contentful/rich-text-types";
import type { ReactNode } from "react";
import { contentfulNodeSchema } from "~/schemas/contentful.schema";

async function getPostById(postId: string): Promise<Post> {
  const blogResponse = await fetchContentfulGraphQL(`
        query {
            blog(id: "${postId}") {
                title
                publishedAt
                readTime
                thumbnail {
                    url
                }
                content {
                  json
                  links {
                    assets {
                      block {
                        url
                        sys {
                          id
                        }
                        description
                      }
                    }
                  }
                }
                sys {
                  id
                }
            }
        }
    `);

  const blogCollection = blogResponseSchema.parse(blogResponse);
  return blogCollection.data.blog;
}

interface Asset {
  url: string;
  description: string;
}

export default async function Post({ params }: { params: { postId: string } }) {
  const { postId } = params;
  const post = await getPostById(postId);

  const { content, publishedAt, readTime, title } = post;

  const assetsMap = new Map<string, Asset>();

  if (content.links != null) {
    for (const asset of content.links.assets.block) {
      const { description, url, sys } = asset;
      assetsMap.set(sys.id, {
        url,
        description,
      });
    }
  }

  const options: Options = {
    preserveWhitespace: true,
    renderMark: {
      [MARKS.BOLD]: (text: ReactNode) => (
        <span className="font-bold">{text}</span>
      ),
    },
    renderNode: {
      [BLOCKS.OL_LIST]: (_node: unknown, children: ReactNode) => (
        <ol className="list-decimal pl-8 text-lg font-light leading-6 marker:text-text-secondary">
          {children}
        </ol>
      ),
      [BLOCKS.UL_LIST]: (_node: unknown, children: ReactNode) => (
        <ul className="list-disc pl-8 text-lg font-light leading-6 marker:text-text-secondary">
          {children}
        </ul>
      ),
      [BLOCKS.LIST_ITEM]: (_node: unknown, children: ReactNode) => (
        <li className="text-lg font-light leading-6 text-text">{children}</li>
      ),
      [BLOCKS.PARAGRAPH]: (_node: unknown, children: ReactNode) => (
        <p className="py-5 text-lg font-light leading-6 text-text-secondary">
          {children}
        </p>
      ),
      [BLOCKS.HEADING_1]: (_node: unknown, children: ReactNode) => (
        <h1 className="pt-5 text-3xl">{children}</h1>
      ),
      [BLOCKS.HR]: (_node: unknown, _children: ReactNode) => (
        <div className="flex h-10 w-full items-center justify-center">
          <div className="mx-2 h-1 w-1 rounded-full bg-text-secondary"></div>
          <div className="mx-2 h-1 w-1 rounded-full bg-text-secondary"></div>
          <div className="mx-2 h-1 w-1 rounded-full bg-text-secondary"></div>
        </div>
      ),
      [BLOCKS.EMBEDDED_ASSET]: (_node, _children: ReactNode) => {
        const node = contentfulNodeSchema.parse(_node);
        const { id } = node.data.target.sys;

        const asset = assetsMap.get(id);

        if (asset == null) return null;

        const { url, description } = asset;
        return (
          <div className="flex w-full flex-col items-center justify-center gap-3 py-5">
            <Image
              src={url}
              width={600}
              height={60}
              alt={description}
              className="rounded-sm"
            />
            <p className="text-sm font-light text-text-secondary/50">
              {description}
            </p>
          </div>
        );
      },
    },
  };

  return (
    <div className="bg-background absolute left-0 top-0 z-10 h-full w-full overflow-auto">
      <Link href={"/blog"}>
        <ExitIcon className="fixed right-14 top-10 h-fit w-fit cursor-pointer" />
      </Link>
      <div className="container mx-auto flex w-[680px] flex-col gap-8 py-32">
        <div className="flex items-center justify-between">
          <h1 className="text-5xl font-bold">{title}</h1>
        </div>
        <div className="sticky flex items-center gap-3">
          <Image
            src="/images/profile.jpeg"
            width={50}
            height={50}
            alt="Kevin's profile picture"
            className="rounded-full"
          />
          <div className="flex w-full items-center justify-between gap-1">
            <div>
              <h3 className="font-bold">Kevin Edry</h3>
              <h4 className="text-sm text-text-secondary">
                {readTime} min read · {format(publishedAt, "MMM dd, yyyy")}
              </h4>
            </div>
            <ul className="flex gap-8">
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
        <div className="text-lg leading-6 text-text-secondary">
          {documentToReactComponents(content.json, options)}
        </div>
      </div>
    </div>
  );
}
