import { jwtVerify } from "jose";

export interface UserJwtPayload {
  jti: string;
  iat: number;
  _id: string;
  username: string;
  email: string;
  role: "admin" | "user";
}

export const getJwtSecretKey = (): string => {
  const secret = process.env.JWT_SECRET;

  if (!secret || secret.length === 0) {
    throw new Error("The environment variable JWT_SECRET is not set.");
  }

  return secret;
};

export async function verifyAuth(token: string): Promise<UserJwtPayload> {
  try {
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(getJwtSecretKey())
    );
    return payload as unknown as UserJwtPayload;
  } catch (error) {
    throw new Error("Your token has expired or is invalid.");
  }
}
