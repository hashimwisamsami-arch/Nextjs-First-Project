import Jwt from "jsonwebtoken";
import { NextRequest } from "next/server";
import { JWTPayload } from "./types";

export function verifyToken(request: NextRequest): JWTPayload | null {
  try {
    const jwtToken = request.cookies.get("jwtToken");
    const token = jwtToken?.value as string;
    if (!token) return null;
    const userPayload = Jwt.verify(
      token,
      process.env.JWT_PASSWORD as string,
    ) as JWTPayload;
    return userPayload;
  } catch {
    return null;
  }
}
