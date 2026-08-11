import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";

import { verifyToken } from "@/utils/verifyToken";
import { UpdateUserDto } from "@/utils/dtos";
import bcrypt from "bcryptjs";
import { UpdateUserSchema } from "@/utils/validationSchemas";

interface Props {
  params: Promise<{ id: string }>;
}

/** 
 method: delete
route : ~/api/users/profile/:id
desc: Delete Profile
access: private (only user himself can delete his account)
 */

export async function DELETE(request: NextRequest, { params }: Props) {
  try {
    const { id } = await params;
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      include: {
        comments: true,
      },
    });
    if (!user) {
      return NextResponse.json({ message: "user not found" }, { status: 404 });
    }

    const userFromToken = verifyToken(request);

    if (userFromToken !== null && userFromToken.id === user.id) {
      //delete profile
      await prisma.user.delete({ where: { id: parseInt(id) } });
      //deleating the comments that belog to this profile
      const commentIds: number[] = user?.comments.map((comment) => comment.id);
      await prisma.comment.deleteMany({ where: { id: { in: commentIds } } });
      return NextResponse.json(
        { message: "your profile has been deleted" },
        { status: 200 },
      );
    }
    return NextResponse.json(
      {
        message: "only user himself can delete his profile",
      },
      { status: 403 }, //Forbidden,
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

/** 
 method: get
route : ~/api/users/profile/:id
desc: Get Profile By ID
access: private (only user himself can get his account/profile)
 */

export async function GET(request: NextRequest, { params }: Props) {
  try {
    const { id } = await params;
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      select: {
        id: true,
        email: true,
        username: true,
        createdAt: true,
        isAdmin: true,
      },
    });
    if (!user) {
      return NextResponse.json({ message: "user not found" }, { status: 404 });
    }
    const userFromToken = verifyToken(request);
    if (userFromToken === null || userFromToken.id !== user.id) {
      return NextResponse.json(
        { message: "you are not allow,access denied" },
        { status: 403 },
      );
    }
    return NextResponse.json({ user }, { status: 200 });
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
route : ~/api/users/profile/:id
desc: update Profile By ID
access: private (only user himself can update his account/profile)
 */

export async function POST(request: NextRequest, { params }: Props) {
  try {
    const { id } = await params;
    const user = await prisma.user.findUnique({
      where: { id: parseInt(id) },
    });
    if (!user) {
      return NextResponse.json({ message: "user not found" }, { status: 404 });
    }
    const userFromToken = verifyToken(request);
    if (userFromToken === null || userFromToken.id !== user.id) {
      return NextResponse.json(
        { message: "you are not allow,access denied" },
        { status: 403 },
      );
    }
    const body = (await request.json()) as UpdateUserDto;
    const validation = UpdateUserSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.issues[0].message },
        { status: 400 },
      );
    }
    if (body.password) {
      const salt = await bcrypt.genSalt(10);
      body.password = await bcrypt.hash(body.password, salt);
    }

    const updateUser = await prisma.user.update({
      where: {
        id: parseInt(id),
      },
      data: {
        username: body.username,
        email: body.email,
        password: body.password,
      },
    });
    const { password, ...other } = updateUser;
    return NextResponse.json({ ...other }, { status: 200 });
  } catch {
    return NextResponse.json(
      {
        message: "internal server error",
      },
      { status: 500 },
    );
  }
}
