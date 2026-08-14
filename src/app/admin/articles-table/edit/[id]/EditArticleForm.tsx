"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { DOMAIN } from "@/utils/constants";
import { useRouter } from "next/navigation";
import { Article } from "@/generated/prisma/client";

interface EditArticleFormProps {
  article: Article;
}
const EditArticleForm = ({ article }: EditArticleFormProps) => {
  const router = useRouter();
  const [title, setTitle] = useState(article.title);
  const [description, setDescription] = useState(article.description);

  const formSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title === "") return toast.error("Title is required");
    if (description === "") return toast.error("Description is required");
    try {
      await axios.put(`${DOMAIN}/api/articles/${article.id}`, {
        title,
        description,
      });
      toast.success("Article edited");
      router.refresh();
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message ?? "Something went wrong");
      } else if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };
  return (
    <>
      <form onSubmit={formSubmitHandler} className="flex flex-col">
        <input
          className="mb-4 border rounded p-2 text-xl bg-white"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="mb-4 p-2 lg:text-xl rounded resize-none bg-white"
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <button
          className="text-2xl text-white bg-green-700 hover:bg-green-900 p-2 rounded-lg font-bold"
          type="submit"
        >
          Edit
        </button>
      </form>
    </>
  );
};

export default EditArticleForm;
