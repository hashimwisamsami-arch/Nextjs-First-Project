import { NextRequest, NextResponse } from "next/server";
import prisma from "@/utils/db";
import Jwt from "jsonwebtoken";
import { JWTPayload } from "@/utils/types";

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
    });
    if (!user) {
      return NextResponse.json({ message: "user not found" }, { status: 404 });
    }

    const authToken = request.headers.get("authToken") as string;
    const userFromToken = Jwt.verify(
      authToken,
      process.env.JWT_PASSWORD as string,
    ) as JWTPayload;

    if (userFromToken.id === user.id) {
      await prisma.user.delete({ where: { id: parseInt(id) } });
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
