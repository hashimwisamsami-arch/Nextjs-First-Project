import Link from "next/link";
import { Article } from "@/generated/prisma/client";
interface ArticalItemProps {
  arttical: Article;
}

const ArticalItem = ({ arttical }: ArticalItemProps) => {
  return (
    <div
      className="
    group
    w-full sm:w-[45%] lg:w-[23%]
    p-6
    my-3
    rounded-2xl
    bg-white
    shadow-md
    border border-gray-200
    hover:shadow-2xl
    hover:-translate-y-2
    transition-all
    duration-300
  "
    >
      <h3
        className="
      text-2xl
      font-bold
      text-gray-900
      mb-4
      group-hover:text-purple-700
      line-clamp-1
      transition
    "
      >
        {arttical.title}
      </h3>

      <p
        className="
      text-gray-600
      text-base
      leading-7
      mb-6
      line-clamp-3
    "
      >
        {arttical.description}
      </p>

      <Link
        href={`/articles/${arttical.id}`}
        className="
      flex
      items-center
      justify-center
      w-full
      bg-linear-to-r
      from-purple-600
      to-indigo-600
      hover:from-purple-700
      hover:to-indigo-700
      text-white
      font-semibold
      rounded-xl
      py-3
      shadow-md
      hover:shadow-lg
      transition-all
      duration-300
    "
      >
        Read More →
      </Link>
    </div>
  );
};

export default ArticalItem;
