"use client";
import Link from "next/link";
import { Eye, LockKeyhole, Mail, Leaf } from "lucide-react";
import Herosection from "@/app/_component/HeroSection/Herosection";
import Image from "next/image";
import img from "../../../assetes/2e5810ff3e-e750761ebcd4ae5907db.png";
import { FaUserPlus } from "react-icons/fa";

import { ShieldCheck, Sparkles, Truck } from "lucide-react";
import { RiGoogleLine } from "react-icons/ri";
import { FaFacebook } from "react-icons/fa";
import { useForm, Controller } from "react-hook-form";
import { FieldLabel, Field, FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchemaType, registerSchema } from "@/schemas/auth.schema";
import {  registerSubmit } from "@/action/auth.action";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
import { loginSchema } from "./../../../schemas/auth.schema";
import { signIn } from "next-auth/react";
export default function LoginPage() {
  const navigate = useRouter();
  const form = useForm<loginSchemaType>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });
  const { handleSubmit, control } = form;

  async function handleLogin(values: loginSchemaType) {
    // console.log("values", values);
   const response = await signIn("credentials",{...values,redirect:false})
   console.log(response);
   
    // const isLoginSucessfully = await loginSubmit(values);

    if (response?.ok) {
      // alert
      toast.add({
        title: "Account Login sucessfully",
        description: "Your account has been logined successfully.",
        type: "success",
        
      });
      // navigate
      setTimeout(() => {
        navigate.push("/");
      }, 3000);
    } else {
      toast.add({
        title: response?.error,
        description: "Please try again later.",
        type: "error",
      });
      // console.log(isLoginSucessfully);
    }
  }

  return (
    <>
      <main className="bg-white px-4 py-8 sm:px-6 sm:py-12 lg:px-6 lg:py-16">
        <div className="mx-auto grid w-full max-w-7xl items-center gap-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-16">
          <section className="mx-auto w-full max-w-xl lg:mx-0">
            <div className="mx-auto flex aspect-[1.35/1] w-full max-w-150 items-center justify-center overflow-hidden rounded-2xl  bg-white p-4 shadow-[0_8px_30px_rgba(33,49,60,0.08)] sm:p-7">
              <Image
                src={img}
                alt="shopping-image"
                className="h-full w-full"
                width={200}
                height={200}
              />
            </div>

            <div className="mt-7 text-center lg:mt-8">
              <h1 className="text-2xl leading-tight font-bold text-[#21313c] sm:text-3xl">
                FreshCart - Your One-Stop Shop for Fresh Products
              </h1>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[#6a7282] sm:text-base sm:leading-7">
                Join thousands of happy customers who enjoy FreshCart for their
                daily grocery needs.
              </p>
              <div className="mt-5 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs font-medium text-[#6a7282] sm:text-sm">
                <span className="inline-flex items-center gap-1.5">
                  <Leaf className="size-4 text-[#16a34a]" /> Fresh Quality
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="text-[#16a34a]">✓</span> Fast Delivery
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="text-[#16a34a]">✓</span> Best Prices
                </span>
              </div>
            </div>
          </section>

          <section className="mx-auto w-full max-w-150 rounded-2xl border border-[#e8ece9] bg-white p-5 shadow-[0_12px_40px_rgba(33,49,60,0.08)] sm:p-8 lg:p-9">
            <div className="mb-6 text-center">
              <p className="text-xl font-bold text-[#16a34a]">FreshCart</p>
              <h2 className="mt-2 text-2xl font-bold text-[#21313c] sm:text-[28px]">
                Welcome Back!
              </h2>
              <p className="mt-2 text-sm leading-6 text-[#6a7282]">
                Sign in to continue your shopping
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3">
              <Button
                type="button"
                variant="outline"
                className="h-11 gap-2 border-[#e5e7eb] bg-white text-sm font-medium text-[#364153] hover:bg-[#f8faf9]"
              >
                <RiGoogleLine className="size-5 text-[#e53935]" />
                Continue with Google
              </Button>
              <Button
                type="button"
                variant="outline"
                className="h-11 gap-2 border-[#e5e7eb] bg-white text-sm font-medium text-[#364153] hover:bg-[#f8faf9]"
              >
                <FaFacebook className="size-4.5 text-[#1877f2]" />
                Continue with Facebook
              </Button>
            </div>

            <div className="my-6 flex items-center gap-3">
              <span className="h-px flex-1 bg-[#edf0ee]" />
              <span className="text-[10px] font-medium tracking-wide text-[#9ca3af] sm:text-xs">
                OR CONTINUE WITH EMAIL
              </span>
              <span className="h-px flex-1 bg-[#edf0ee]" />
            </div>

            <div className="space-y-4">
              <form onSubmit={handleSubmit(handleLogin)}>
                <Controller
                  name="email"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="pt-4 ">
                      <div className="flex justify-between ">
                        <FieldLabel htmlFor="emailInput">
                          Email Address*
                        </FieldLabel>
                        <Link
                          className="text-[#16a34a] text-[14px] trasition-all duration-300 hover:text-[#0d7b35]"
                          href={"/forget-password"}
                        >
                          Forget Password?
                        </Link>
                      </div>

                      <Input
                        {...field}
                        type="email"
                        className="py-5 px-6   outline-none text-emerald-900 placeholder-emerald-400 focus-visible:ring-4 focus-visible:ring-emerald-500/30 focus-visible:border-emerald-600 transition-all duration-200"
                        id="emailInput"
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter Your Email"
                        autoComplete="off"
                      />

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                <Controller
                  name="password"
                  control={control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="pt-4">
                      <FieldLabel htmlFor="passwordInput">Password*</FieldLabel>
                      <Input
                        {...field}
                        type="password"
                        className="py-5 px-6   outline-none text-emerald-900 placeholder-emerald-400 focus-visible:ring-4 focus-visible:ring-emerald-500/30 focus-visible:border-emerald-600 transition-all duration-200"
                        id="passwordInput"
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter Your Password"
                        autoComplete="off"
                      />

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Field orientation="horizontal" className="mt-6">
                  <Checkbox id="terms-checkbox" name="terms-checkbox" />
                  <Label htmlFor="terms-checkbox">Keep me signed in</Label>
                </Field>
                <Button
                  type="submit"
                  className="w-full mt-7 h-10 transition-all duration-300 hover:bg-[#0f9741] flex items-center bg-[#16A34A]"
                >
                  Sign In
                </Button>
              </form>
            </div>
            <p className="mt-5 text-center text-sm text-[#6a7282]">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-semibold text-[#16a34a] hover:text-[#12843d]"
              >
                Create one
              </Link>
            </p>

            <div className="mt-6 flex items-center justify-center gap-2 border-t border-[#edf0ee] pt-5 text-xs text-[#8a9499]">
              <LockKeyhole className="size-3.5 text-[#16a34a]" />
              Your account is protected with secure encryption
            </div>
          </section>
        </div>
      </main>

      <Herosection />
    </>
  );
}
