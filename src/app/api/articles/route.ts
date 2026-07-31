import { error } from "./../../../../node_modules/@prisma/streams-local/node_modules/ajv/lib/vocabularies/applicator/dependencies";

import { CreateArticleDto } from "@/utils/dtos";

import { craeteArticleSchema } from "@/utils/validationSchemas";
import { NextRequest, NextResponse } from "next/server";
import { Article } from "@/generated/prisma/client";
import prisma from "@/utils/db";

/** 
 method: get
route : ~/api/articles
desc: get all articles
access: puplic
 */
export async function GET(request: NextRequest) {
  try {
    const articles = await prisma.article.findMany();
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
access: puplic
 */
export async function POST(request: NextRequest) {
  try {
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
