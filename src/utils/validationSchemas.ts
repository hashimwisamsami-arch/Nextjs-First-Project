import z from "zod";

export const craeteArticleSchema = z.object({
  title: z
    .string({
      error: "title is required",
    })
    .min(2, { message: "title should be at least 2 characters long" })
    .max(200, { message: "title should be less than 200 characters" }),
  description: z
    .string({
      error: "description is required",
    })
    .min(10, { message: "description should be at least 10 characters long" }),
});
