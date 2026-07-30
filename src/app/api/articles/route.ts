import { articles } from "@/utils/data";
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
