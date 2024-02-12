// import contentful from "contentful";
import { env } from "~/env";

export async function fetchContentfulGraphQL<ReturnType>(
  query: string,
): Promise<ReturnType> {
  const result = await fetch(
    `https://graphql.contentful.com/content/v1/spaces/${env.CONTENTFUL_SPACE_ID}/environments/master`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.CONTENTFUL_ACCESS_TOKEN}`,
      },
      body: JSON.stringify({ query }),
    },
  );

  const parsedResult = result.json();

  return parsedResult as ReturnType;
}
