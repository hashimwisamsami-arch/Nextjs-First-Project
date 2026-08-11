import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/utils/verifyToken";
import prisma from "@/utils/db";
import { UpdateCommentDto } from "@/utils/dtos";

interface Props {
  params: Promise<{ id: string }>;
}

/** 
 method: PUT
route : ~/api/comments/:id
desc: Update Comment
access: private (only owner of the comment)
 */

export async function PUT(request: NextRequest, { params }: Props) {
  try {
    const { id } = await params;
    const comment = await prisma.comment.findUnique({
      where: { id: parseInt(id) },
    });
    if (!comment) {
      return NextResponse.json(
        { message: "comment not found" },
        { status: 404 },
      );
    }
    const user = verifyToken(request);
    if (user === null || user.id !== comment.userId) {
      return NextResponse.json(
        { message: "you are not allowed,access denied" },
        { status: 403 },
      );
    }
    const body = (await request.json()) as UpdateCommentDto;
    const updateComment = await prisma.comment.update({
      where: { id: parseInt(id) },
      data: { text: body.text },
    });
    return NextResponse.json(updateComment, { status: 200 });
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
 method: DELETE
route : ~/api/comments/:id
desc: Delete Comment
access: private (only admin or owner of the comment)
 */

export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    const { id } = await params;
    const comment = await prisma.comment.findUnique({
      where: { id: parseInt(id) },
    });
    if (!comment) {
      return NextResponse.json(
        { message: "comment not found" },
        { status: 404 },
      );
    }
    const user = verifyToken(request);
    if (user === null) {
      return NextResponse.json(
        { message: "No Token Provieded,access denied" },
        { status: 401 },
      );
    }

    if (user.isAdmin || user.id === comment.userId) {
      await prisma.comment.delete({ where: { id: parseInt(id) } });
      return NextResponse.json(
        {
          message: "Comment deleted.",
        },
        { status: 200 },
      );
    }
    return NextResponse.json(
      {
        message: "you are not allow,access denided",
      },
      { status: 403 },
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
