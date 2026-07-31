import { NextRequest, NextResponse } from "next/server";
import { UpdateArticleDto } from "@/utils/dtos";

import { articles } from "@/utils/data";
import prisma from "@/utils/db";

interface Props {
  params: Promise<{ id: string }>;
}

/** 
 method: get
route : ~/api/articles/:id
desc: get article by id
access: puplic
 */
export async function GET(request: NextRequest, { params }: Props) {
  try {
    const { id } = await params;
    const article = await prisma.article.findUnique({
      where: {
        id: parseInt(id),
      },
    });
    if (!article) {
      return NextResponse.json(
        { message: "article not found" },
        { status: 404 },
      );
    }
    return NextResponse.json(article, { status: 200 });
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
 method: put
route : ~/api/articles/:id
desc: update article by id
access: puplic
 */
export async function PUT(request: NextRequest, { params }: Props) {
  const { id } = await params;
  const article = articles.find((a) => a.id === Number(id));
  if (!article) {
    return NextResponse.json({ message: "article not found" }, { status: 404 });
  }
  const body = (await request.json()) as UpdateArticleDto;
  console.log(body);
  return NextResponse.json({ message: "article updated" }, { status: 200 });
}

/** 
 method: delete
route : ~/api/articles/:id
desc: delete article by id
access: puplic
 */
export async function DELETE(request: NextRequest, { params }: Props) {
  const { id } = await params;
  const article = articles.find((a) => a.id === Number(id));
  if (!article) {
    return NextResponse.json({ message: "article not found" }, { status: 404 });
  }

  return NextResponse.json({ message: "article deleted" }, { status: 200 });
}
