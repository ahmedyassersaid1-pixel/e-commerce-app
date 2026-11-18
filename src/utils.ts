import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getMyToken() {
  const cookieStore = await cookies();
  const sessionCookie =
    cookieStore.get("next-auth.session-token")?.value ??
    cookieStore.get("__Secure-next-auth.session-token")?.value;

  if (!sessionCookie || !process.env.NEXTAUTH_SECRET) return null;

  const decodedToken = await decode({
    token: sessionCookie,
    secret: process.env.NEXTAUTH_SECRET,
  });

  return typeof decodedToken?.returnedToken === "string"
    ? decodedToken.returnedToken
    : null;
}

