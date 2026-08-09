import Jwt from "jsonwebtoken";
import { JWTPayload } from "./types";

export function generateJWT(jwtPayload: JWTPayload): string {
  const secret = process.env.JWT_PASSWORD as string;

  const token = Jwt.sign(jwtPayload, secret, { expiresIn: "30d" });
  return token;
}
