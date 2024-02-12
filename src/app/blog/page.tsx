import React from "react";

import HeroArticle from "~/components/blog/article/hero-article";
import Article from "~/components/blog/article/article";
import { fetchContentfulGraphQL } from "~/utils/fetchContentfulGraphQL";
import type { Post } from "~/schemas/blog.schema";
import { blogCollectionResponseSchema } from "~/schemas/blog.schema";

async function getBlogPosts(): Promise<Array<Post>> {
  const blogCollectionResponse = await fetchContentfulGraphQL(`
  query {
    blogCollection {
        items {
            publishedAt
            title
            thumbnail {
                url
            }
            readTime
            content {
                json
            }
            sys {
              id
            }
        }
    }
  }
  `);

  const blogCollection = blogCollectionResponseSchema.parse(
    blogCollectionResponse,
  );

  return blogCollection.data.blogCollection.items;
}

export default async function Blog() {
  const posts = await getBlogPosts();
  return (
    <React.Fragment>
      <div className="flex h-[80%] w-1/2 flex-col gap-3">
        {posts[0] != null ? (
          <HeroArticle
            id={posts[0].sys.id}
            title={posts[0].title}
            readTime={posts[0].readTime}
            image={posts[0].thumbnail.url}
            publishedAt={new Date(posts[0].publishedAt)}
            summary="At some point, every technical leader faces the challenge of deciding on the best project management framework for their development team. The options are somewhat limited if reinventing the wheel isn’t on your agenda (I’m looking at you, Google) with the usual suspects — Agile, Waterfall, Kanban, and Scrum."
          />
        ) : null}
      </div>
      <div className="flex h-[80%] w-1/2 flex-col gap-4">
        {posts.map((post, idx) => {
          const { title, content, publishedAt, sys, thumbnail } = post;
          const { id } = sys;
          if (idx > 0) {
            return (
              <Article
                key={id}
                id={id}
                title={title}
                image={thumbnail.url}
                publishedAt={new Date(publishedAt)}
                summary="At some point, every technical leader faces the challenge of deciding on the best project management framework for their development team. The options are somewhat limited if reinventing the wheel isn’t on your agenda (I’m looking at you, Google) with the usual suspects — Agile, Waterfall, Kanban, and Scrum."
              />
            );
          }
        })}
      </div>
    </React.Fragment>
  );
}
