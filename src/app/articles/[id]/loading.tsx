const SingelArticleLoading = () => {
  return (
    <section className="fix_height w-full md:w-3/4 mt-8 px-5 container m-auto animate-pulse">
      <div className="bg-white p-7 rounded-lg">
        <h1 className="bg-gray-300 mb-2 h-6 rounded-lg"></h1>
        <div className="bg-gray-300 h-4 rounded-lg"></div>
        <p className="bg-gray-300 mt-5 h-6 rounded-lg"></p>
      </div>
      <div className="mt-8">
        <div className="p-2 rounded-lg bg-gray-300 h-10"></div>
      </div>
      <button className="bg-gray-300 mt-2 rounded-lg h-8 w-20"></button>
    </section>
  );
};

export default SingelArticleLoading;
