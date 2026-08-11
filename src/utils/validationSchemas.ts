import z from "zod";

//Create Article Schema
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

//Register Schema
export const registerSchema = z.object({
  username: z
    .string({
      error: "username is required",
    })
    .min(2, { message: "username should be at least 2 characters long" })
    .max(100, { message: "username should be less than 100 characters" }),
  email: z
    .string({
      error: "email is required",
    })
    .min(3, { message: "email should be at least 3 characters long" })
    .max(200, { message: "email should be less than 200 characters" })
    .email(),
  password: z
    .string({
      error: "password is required",
    })
    .min(6, { message: "password should be at least 6 characters long" }),
});

//Login Schema
export const loginSchema = z.object({
  email: z
    .string({
      error: "email is required",
    })
    .min(3, { message: "email should be at least 3 characters long" })
    .max(200, { message: "email should be less than 200 characters" })
    .email(),
  password: z
    .string({
      error: "password is required",
    })
    .min(6, { message: "password should be at least 6 characters long" }),
});

//Create Comment Schema
export const createCommentShema = z.object({
  text: z.string().min(2).max(500),
  articleId: z.number(),
});
