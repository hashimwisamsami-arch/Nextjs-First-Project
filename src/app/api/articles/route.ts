import { CreateArticleDto } from "@/utils/dtos";

import { craeteArticleSchema } from "@/utils/validationSchemas";
import { NextRequest, NextResponse } from "next/server";
import { Article } from "@/generated/prisma/client";
import prisma from "@/utils/db";
import { ARTICLE_PER_PAGE } from "@/utils/constants";
import { verifyToken } from "@/utils/verifyToken";
/** 
 method: get
route : ~/api/articles
desc: get articles by page number
access: puplic
 */
export async function GET(request: NextRequest) {
  try {
    const pageNumber = request.nextUrl.searchParams.get("pageNumber") || "1";

    const articles = await prisma.article.findMany({
      skip: ARTICLE_PER_PAGE * (parseInt(pageNumber) - 1),
      take: ARTICLE_PER_PAGE,
    });

    return NextResponse.json(articles, { status: 200 });
  } catch {
    return NextResponse.json(
      {
        message: "internal server error",
      },
      { status: 500 },
    );
  }
}

/** 
 method: post
route : ~/api/articles
desc: create new article
access: private (only admin can create article)
 */
export async function POST(request: NextRequest) {
  try {
    const user = verifyToken(request);
    if (!user || user.isAdmin === false) {
      return NextResponse.json(
        { message: "only admin can create articles,access denided" },
        { status: 403 },
      );
    }
    const body = (await request.json()) as CreateArticleDto;
    const validation = craeteArticleSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.issues[0].message },
        { status: 400 },
      );
    }
    const newArticle: Article = await prisma.article.create({
      data: {
        title: body.title,
        description: body.description,
      },
    });

    return NextResponse.json(
      { message: "article Created Succseefully", newArticle },
      { status: 201 },
    );
  } catch {
    return NextResponse.json(
      {
        message: "internal server error",
      },
      { status: 500 },
    );
  }
}
