const articlesSkeleton = [1, 2, 3, 4, 5, 6];
const ArticleLoader = () => {
  return (
    <section className="fix_height px-5 container m-auto animate-pulse">
      <div className="my-5 w-full md:w-2/3 m-auto bg-gray-300 h-12 rounded"></div>
      <div className="flex items-center flex-wrap justify-center gap-7">
        {articlesSkeleton.map((item) => (
          <>
            <div
              key={item}
              className="
    group
    w-full sm:w-[45%] lg:w-[23%]
    p-6
    my-3
    rounded-2xl
    shadow-md
    bg-gray-200
    transition-all
    duration-300
  "
            >
              <h3
                className="
bg-gray-200
      h-6
      mb-4
      
      
      transition
    "
              ></h3>

              <p
                className="
      
      text-base
      leading-7
      mb-6
      bg-gray-300
      h-10
    "
              ></p>

              <div className="bg-gray-400 h-8"></div>
            </div>
          </>
        ))}
      </div>
      <div className="flex items-center justify-center mt-2 mb-10">
        <div className="bg-gray-300 w-67 rounded-sm h-9"></div>
      </div>
    </section>
  );
};

export default ArticleLoader;
