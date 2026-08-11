import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";

/** 
 method: GET
route : ~/api/articles/count
desc: get articles count
access: puplic
 */

export async function GET(request: NextRequest) {
  try {
    const count = await prisma.article.count();
    return NextResponse.json({ count }, { status: 200 });
  } catch {
    return NextResponse.json(
      {
        message: "internal server error",
      },
      { status: 500 },
    );
  }
}
