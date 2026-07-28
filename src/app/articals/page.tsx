import ArticalItem from "@/components/articals/ArticalItem";

import { Articale } from "@/utils/types";

const Artical = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts");
  const articles: Articale[] = await response.json();
  return (
    <section className="container m-auto px-5">
      <div className="flex items-center flex-wrap justify-center gap-7">
        {articles.map((item) => (
          <ArticalItem arttical={item} key={item.id} />
        ))}
      </div>
    </section>
  );
};

export default Artical;
