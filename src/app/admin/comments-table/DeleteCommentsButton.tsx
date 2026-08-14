"use client";
import { DOMAIN } from "@/utils/constants";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
interface DeleteCommentsButtonProps {
  commentId: number;
}
const DeleteCommentsButton = ({ commentId }: DeleteCommentsButtonProps) => {
  const router = useRouter();

  const deleteCommentHandler = async () => {
    try {
      if (confirm("you want to delete this comment,Are you sure?")) {
        await axios.delete(`${DOMAIN}/api/comments/${commentId}`);
        router.refresh();
        toast.success("comment deleted.");
      }
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
    <button
      onClick={deleteCommentHandler}
      className="bg-red-600 text-white rounded-lg inline-block py-1 px-2 cursor-pointer hover:bg-red-800 transition"
    >
      Delete
    </button>
  );
};

export default DeleteCommentsButton;
