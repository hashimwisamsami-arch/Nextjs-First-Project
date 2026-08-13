"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";
import { DOMAIN } from "@/utils/constants";
interface AddCommentFormProps {
  articleId: number;
}
const AddCommentForm = ({ articleId }: AddCommentFormProps) => {
  const router = useRouter();
  const [text, setText] = useState("");

  const formCommentHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    if (text === "") return toast.error("Please Write Something");
    try {
      await axios.post(`${DOMAIN}/api/comments`, { text, articleId });
      router.refresh();
      setText("");
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
      <form onSubmit={formCommentHandler} className="my-5  md:w-2/3 m-auto">
        <input
          className="w-full p-2 rounded-lg text-xl bg-white focus:shadow-md"
          type="text"
          placeholder="Add a comment"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          type="submit"
          className="bg-green-700 text-white mt-2 p-1 w-min text-xl rounded-lg hover:bg-green-900 transition"
        >
          Comment
        </button>
      </form>
    </>
  );
};

export default AddCommentForm;
