import { Comment } from "@/generated/prisma/client";
import { DOMAIN } from "@/utils/constants";

//Get All Comments
export async function getAllComents(token: string): Promise<Comment[]> {
  const response = await fetch(`${DOMAIN}/api/comments`, {
    headers: {
      Cookie: `jwtToken=${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("failed to fetch comments");
  }
  return response.json();
}
