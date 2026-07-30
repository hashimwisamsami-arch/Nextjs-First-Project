import { articles } from "@/utils/data";
import { CreateArticleDto } from "@/utils/dtos";
import { Articale } from "@/utils/types";
import { craeteArticleSchema } from "@/utils/validationSchemas";
import { NextRequest, NextResponse } from "next/server";

/** 
 method: get
route : ~/api/articles
desc: get all articles
access: puplic
 */
export function GET(request: NextRequest) {
  return NextResponse.json(articles, { status: 200 });
}

/** 
 method: post
route : ~/api/articles
desc: create new article
access: puplic
 */
export async function POST(request: NextRequest) {
  const body = (await request.json()) as CreateArticleDto;

  const validation = craeteArticleSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(
      { message: validation.error.issues[0].message },
      { status: 400 },
    );
  }
  const newArticle: Articale = {
    title: body.title,
    body: body.body,
    id: articles.length + 1,
    userId: 200,
  };
  articles.push(newArticle);
  console.log(body);
  return NextResponse.json(
    { message: "article Created Succseefully", newArticle },
    { status: 201 },
  );
}
