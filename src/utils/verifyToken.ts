import Jwt from "jsonwebtoken";
import { NextRequest } from "next/server";
import { JWTPayload } from "./types";

//Verify Token For API End Point
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

//Verify Token For Pages
export function verifyTokenForPage(token: string): JWTPayload | null {
  try {
    const userPayload = Jwt.verify(
      token,
      process.env.JWT_PASSWORD as string,
    ) as JWTPayload;
    if (!userPayload) {
      return null;
    }
    return userPayload;
  } catch {
    return null;
  }
}
