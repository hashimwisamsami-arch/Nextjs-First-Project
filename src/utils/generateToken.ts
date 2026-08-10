import Jwt from "jsonwebtoken";
import { JWTPayload } from "./types";
import { NextResponse } from "next/server";

//generate jwt token
export function generateJWT(jwtPayload: JWTPayload): string {
  const secret = process.env.JWT_PASSWORD as string;

  const token = Jwt.sign(jwtPayload, secret, { expiresIn: "30d" });
  return token;
}

//Set Cookie

export function setCookie(jwtPayload: JWTPayload) {
  const token = generateJWT(jwtPayload);
  const response = NextResponse.json(
    {
      message: "Authenticated",
    },
    { status: 200 },
  );
  response.cookies.set("jwtToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", //only https in production
    path: "/",
    maxAge: 60 * 60 * 24 * 30, //30 days
  });
  return response;
}
