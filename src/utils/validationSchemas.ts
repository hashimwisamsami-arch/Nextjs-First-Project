import z from "zod";

export const craeteArticleSchema = z.object({
  title: z.string().min(2).max(200),
  body: z.string().min(10),
});
