import { jwtDecode } from "jwt-decode";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      // button name
      name: "myLogin",
      // inputs
      credentials: {
        email: {
          label: "email",
          type: "email",
          palceholder: "emaple@exaple.com",
        },
        password: {
          label: "password",
          type: "password",
          palceholder: "*********",
        },
      },
      //   fun run to call api
      async authorize(credentials, req) {
        // exqute call api
        // get form values
        // on sucess return obj
        // on error return null | false | err
        try {
          if (!credentials?.email || !credentials.password) return null;

          const res = await fetch(
            `https://ecommerce.routemisr.com/api/v1/auth/signin`,
            {
              method: "POST",
              body: JSON.stringify({
                email: credentials?.email,
                password: credentials?.password,
              }),
              headers: { "content-type": "application/json" },
            },
          );
          const data = await res.json();
          // A failed signin response has no JWT; check it before decoding.
          if (!res.ok || !data?.token || !data?.user) return null;

          const { id } = jwtDecode<{ id: string }>(data.token);
          return {
            id: id,
            name: data.user.name,
            email: data.user.email,
            acessToken: data.token,
          };
        } catch (error) {
          console.log("error reom api", error);
          return null;
        }
      },
    }),
  ],
  // run after login sucessfully | refresh | get session()
  callbacks: {
    jwt(params) {
      // console.log("jwt params", params);
      if (params.user) {
        params.token.returnedToken = params.user.acessToken;
      }
      return params.token;
    },
    // useSession | getServerSession | use route handler ==> api/auth/session
    session({ session, token }) {
      // console.log("session params", session);
      session.id = token.sub;
      // will be send to client
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};
