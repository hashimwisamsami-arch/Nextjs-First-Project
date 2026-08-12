import { getArticle, getArticlesCount } from "@/apiCalls/articleApiCall";
import ArticalItem from "@/components/articals/ArticalItem";
import Pagination from "@/components/articals/Pagination";
import SearchArticlesInput from "@/components/articals/SearchArticlesInput";
import { Article } from "@/generated/prisma/client";
import { ARTICLE_PER_PAGE } from "@/utils/constants";
import { Metadata } from "next";

interface ArticlesPageProps {
  searchParams: Promise<{
    pageNumber?: string;
  }>;
}

const Artical = async ({ searchParams }: ArticlesPageProps) => {
  const { pageNumber } = await searchParams;
  const count: number = await getArticlesCount();
  const pages = Math.ceil(count / ARTICLE_PER_PAGE);

  const articles: Article[] = await getArticle(pageNumber);
  return (
    <section className="container m-auto px-5">
      <SearchArticlesInput />
      <div className="flex items-center flex-wrap justify-center gap-7">
        {articles.map((item) => (
          <ArticalItem arttical={item} key={item.id} />
        ))}
      </div>
      <Pagination
        pageNumber={parseInt(pageNumber ?? "1")}
        route="/articles"
        pages={pages}
      />
    </section>
  );
};

export default Artical;

export const metadata: Metadata = {
  title: "Articles Page",
  description: "This is Articles Page",
};
