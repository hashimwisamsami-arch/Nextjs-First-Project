interface ArticleSearchPageProps {
  searchParams: Promise<{
    searchText?: string;
  }>;
}

const ArticleSearchPage = async ({ searchParams }: ArticleSearchPageProps) => {
  const { searchText } = await searchParams;
  return (
    <section className="fix_height container m-auto px-5">
      <h1 className="text-2xl font-bold">Search Text is: {searchText}</h1>
    </section>
  );
};

export default ArticleSearchPage;
