import { getToken } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getMyToken() {
  const cookieStore = await cookies();
  const accessToken = await getToken({
    req: { headers: { cookie: cookieStore.toString() } } as never,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  });

  return typeof accessToken?.returnedToken === "string"
    ? accessToken.returnedToken
    : null;
}

