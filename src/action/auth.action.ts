"use server";
import { loginSchemaType, registerSchemaType } from "@/schemas/auth.schema";
import { cookies } from "next/headers";

export async function registerSubmit(values: registerSchemaType) {
  try {
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/auth/signup`,
      {
        method: "POST",
        body: JSON.stringify(values),
        headers: { "content-type": "application/json" },
      },
    );
    const data = await res.json();
    console.log("data", data);
    return res.ok;
  } catch (error) {
    console.log("error", error);
  }
}

// export async function loginSubmit(values: loginSchemaType) {
  // try {
  //   const res = await fetch(
  //     `https://ecommerce.routemisr.com/api/v1/auth/signin`,
  //     {
  //       method: "POST",
  //       body: JSON.stringify(values),
  //       headers: { "content-type": "application/json" },
  //     },
  //   );
  //   const data = await res.json();
  //   console.log("loginnnn", data);
  //   if (res.ok) {
  //     const cookie = await cookies();
  //     cookie.set("userToken", data.token,{
  //       httpOnly:true,
       
  //     });
  //   }
  //   return res.ok;
  // } catch (error) {
  //   console.log("error", error);
  // }
// }
