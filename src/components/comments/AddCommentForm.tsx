"use client";

import { useState } from "react";
import { toast } from "react-toastify";

const AddCommentForm = () => {
  const [text, setText] = useState("");

  const formCommentHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (text === "") return toast.error("Please Write Something");
    console.log({ text });
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
