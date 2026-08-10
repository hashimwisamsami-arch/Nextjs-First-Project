import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

/** 
 method: get
route : ~/api/users/logout
desc: logout user [(logout) (sign out)]
access: puplic
 */

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("jwtToken");
    return NextResponse.json({ message: "logout" }, { status: 200 });
  } catch {
    return NextResponse.json(
      {
        message: "internal server error",
      },
      { status: 500 },
    );
  }
}
