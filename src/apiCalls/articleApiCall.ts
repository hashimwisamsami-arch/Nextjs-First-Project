import { Article } from "@/generated/prisma/client";
import { DOMAIN } from "@/utils/constants";
import { SingleArticle } from "@/utils/types";

//get article base on bage number
export async function getArticle(
  pageNumber: string | undefined,
): Promise<Article[]> {
  const response = await fetch(
    `${DOMAIN}/api/articles?pageNumber=${pageNumber ?? "1"}`,
    { cache: "no-store" },
  );
  if (!response.ok) {
    throw new Error("Failed to fetch articles");
  }
  return response.json();
}

//get article count
export async function getArticlesCount(): Promise<number> {
  const response = await fetch(`${DOMAIN}/api/articles/count`, {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error("Failed to get articles count");
  }
  const { count } = (await response.json()) as { count: number };
  return count;
}

//get article base on search text
export async function getArticleBasedOnSearch(
  searchText: string,
): Promise<Article[]> {
  const response = await fetch(
    `${DOMAIN}/api/articles/search?searchText=${searchText}`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch articles");
  }
  return response.json();
}

//get single article by id
export async function getSingleArticle(id: string): Promise<SingleArticle> {
  const response = await fetch(`${DOMAIN}/api/articles/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch articles");
  }
  return response.json();
}
