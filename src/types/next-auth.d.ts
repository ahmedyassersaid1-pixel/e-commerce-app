import NextAuth from "next-auth";
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface User{
            id: string,
            name: string,
            email: string,
            acessToken: string,
          };
  interface Session {
    user: {
      name: string;
      email: string;
      image?: string;
      role?: string;
    };
    id: string;
    expires: string;
  }
}
declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
   name: string,
    email: string,
    sub: string,
    returnedToken: string,
    iat: string,
    exp: string,
    jti:string
  }
  }
