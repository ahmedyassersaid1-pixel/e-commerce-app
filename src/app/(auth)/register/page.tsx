"use client";
import Link from "next/link";
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
import { registerSchema, registerSchemaType } from "@/schemas/auth.schema";
import { registerSubmit } from "@/action/auth.action";
import { toast } from "@/components/ui/toast";
import { useRouter } from "next/navigation";
const benefits = [
  {
    icon: Sparkles,
    title: "Premium Quality",
    description: "Premium quality products sourced from trusted suppliers.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Same-day delivery available in most areas.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Shopping",
    description: "Your information and orders are always protected.",
  },
];

const inputClassName =
  "h-12 w-full rounded-lg border border-[#e5e7eb] bg-white px-4 text-sm text-[#21313c] outline-none transition placeholder:text-[#9ca3af] focus:border-[#16a34a] focus:ring-4 focus:ring-[#16a34a]/10";

export default function RegisterPage() {
  const navigate = useRouter()
  const form = useForm<registerSchemaType>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    resolver: zodResolver(registerSchema),
  });
  const { handleSubmit, control } = form;

  async function handleRegister(values: registerSchemaType) {
    // console.log("values", values);
    const isRegisterSucessfully = await registerSubmit(values);
    if (isRegisterSucessfully) {
      // alert
      toast.add({
        title: "Account Created",
        description: "Your account has been created successfully.",
        type:"success"
      });
      // navigate
      setTimeout(()=>{
        navigate.push("/login")
      },3000)
    } else {
        toast.add({
        title: "We can't create your account",
        description: "Please try again later.",
           type: "error",
      });
      console.log(isRegisterSucessfully)
    }
  }

  return (
    <main className="relative isolate overflow-hidden bg-[#f8faf9] px-4 py-10 sm:px-6 sm:py-14 lg:min-h-[calc(100vh-7rem)] lg:px-10 lg:py-16">
      <div className="pointer-events-none absolute -left-40 top-16 -z-10 size-96 rounded-full bg-[#16a34a]/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-48 right-0 -z-10 size-96 rounded-full bg-[#16a34a]/5 blur-3xl" />

      <div className="mx-auto grid w-full max-w-6xl  gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
        <section className="mx-auto w-full max-w-xl lg:mx-0 lg:py-0">
          <h1 className="max-w-lg text-4xl leading-[1.12] font-bold tracking-tight text-[#21313c] sm:text-5xl lg:text-[3.5rem]">
            Welcome to <span className="text-[#16a34a]">FreshCart</span>
          </h1>
          <p className="mt-5 max-w-lg text-base leading-7 text-[#6a7282] sm:text-lg sm:leading-8">
            Join thousands of happy customers who enjoy fresh groceries
            delivered right to their doorstep.
          </p>

          <ul className="mt-8 space-y-5 sm:mt-10 sm:space-y-6">
            {benefits.map(({ icon: Icon, title, description }) => (
              <li key={title} className="flex items-start gap-4">
                <span className="mt-0.5 grid size-11 shrink-0 place-items-center rounded-full bg-[#e8f8ee] text-[#16a34a]">
                  <Icon className="size-5" strokeWidth={2.2} />
                </span>
                <span>
                  <span className="block font-semibold text-[#21313c]">
                    {title}
                  </span>
                  <span className="mt-1 block text-sm leading-6 text-[#6a7282]">
                    {description}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mx-auto w-full max-w-130 rounded-2xl border border-[#e8ece9] bg-white p-5 shadow-[0_16px_50px_rgba(33,49,60,0.08)] sm:p-8 lg:p-10">
          <div className="mb-7 text-center sm:mb-8">
            <h2 className="text-2xl font-bold text-[#21313c] sm:text-[28px]">
              Create your account
            </h2>
            <p className="mt-2 text-sm leading-6 text-[#6a7282]">
              Sign up to start shopping fresh with FreshCart.
            </p>
          </div>

          <div className="grid grid-cols-2 grid-rows-1 gap-4">
            <button
              type="button"
              className="flex h-12  items-center justify-center gap-3 rounded-lg border border-[#e5e7eb] bg-white text-sm font-semibold text-[#364153] transition hover:bg-[#f8faf9]"
            >
              <span>
                <RiGoogleLine className="text-red-500 size-8" />
              </span>
              Google
            </button>
            <button
              type="button"
              className="flex h-12  items-center justify-center gap-3 rounded-lg border border-[#e5e7eb] bg-white text-sm font-semibold text-[#364153] transition hover:bg-[#f8faf9]"
            >
              <span>
                <FaFacebook className="text-blue-500 size-7" />
              </span>
              Facebook
            </button>
          </div>

          <div className="my-6 flex items-center gap-4">
            <span className="h-px flex-1 bg-[#edf0ee]" />
            <span className="text-xs text-[#9ca3af]">OR </span>
            <span className="h-px flex-1 bg-[#edf0ee]" />
          </div>
          {/* <form>

<div className="space-y-4">
            <label className="block space-y-2">
              <span className="text-sm font-medium text-[#364153]">
                Name <span className="text-[#16a34a]">*</span>
              </span>
              <span className="relative block">
                <UserRound className="pointer-events-none absolute top-1/2 left-4 size-4.5 -translate-y-1/2 text-[#9ca3af]" />
                <input
                  autoComplete="name"
                  className={`${inputClassName} pl-11`}
                  name="name"
                  placeholder="Your full name"
                  type="text"
                />
              </span>
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-medium text-[#364153]">
                Email address <span className="text-[#16a34a]">*</span>
              </span>
              <span className="relative block">
                <Mail className="pointer-events-none absolute top-1/2 left-4 size-4.5 -translate-y-1/2 text-[#9ca3af]" />
                <input
                  autoComplete="email"
                  className={`${inputClassName} pl-11`}
                  name="email"
                  placeholder="you@example.com"
                  type="email"
                />
              </span>
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-medium text-[#364153]">
                Password <span className="text-[#16a34a]">*</span>
              </span>
              <span className="relative block">
                <LockKeyhole className="pointer-events-none absolute top-1/2 left-4 size-4.5 -translate-y-1/2 text-[#9ca3af]" />
                <input
                  autoComplete="new-password"
                  className={`${inputClassName} pl-11 pr-12`}
                  name="password"
                  placeholder="Create a password"
                  type="password"
                />
                <Eye className="pointer-events-none absolute top-1/2 right-4 size-4.5 -translate-y-1/2 text-[#9ca3af]" />
              </span>
            </label>

            <label className="block space-y-2">
              <span className="text-sm font-medium text-[#364153]">
                Confirm password <span className="text-[#16a34a]">*</span>
              </span>
              <span className="relative block">
                <LockKeyhole className="pointer-events-none absolute top-1/2 left-4 size-4.5 -translate-y-1/2 text-[#9ca3af]" />
                <input
                  autoComplete="new-password"
                  className={`${inputClassName} pl-11`}
                  name="confirmPassword"
                  placeholder="Enter your password again"
                  type="password"
                />
              </span>
            </label>
          </div>

          <label className="mt-5 flex cursor-pointer items-start gap-3 text-sm leading-6 text-[#6a7282]">
            <input
              className="mt-1 size-4 shrink-0 accent-[#16a34a]"
              name="terms"
              type="checkbox"
            />
            <span>
              I agree to the{" "}
              <a className="font-medium text-[#16a34a]" href="#terms">
                Terms of Service
              </a>{" "}
              and{" "}
              <a className="font-medium text-[#16a34a]" href="#privacy">
                Privacy Policy
              </a>
              .
            </span>
          </label>

          <button
            type="button"
            className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#16a34a] px-5 font-semibold text-white shadow-[0_4px_12px_rgba(22,163,74,0.2)] transition hover:bg-[#12843d]"
          >
            <Check className="size-4.5" />
            Create Account
          </button>

</form> */}
          <form onSubmit={handleSubmit(handleRegister)}>
            <Controller
              name="name"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="nameInput">Name*</FieldLabel>
                  <Input
                    {...field}
                    type="text"
                    className="pt-2.25 px-3 pb-2.5  outline-none text-emerald-900 placeholder-emerald-400 focus-visible:ring-4 focus-visible:ring-emerald-500/30 focus-visible:border-emerald-600 transition-all duration-200"
                    id="nameInput"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter Your Name"
                    autoComplete="off"
                  />

                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="email"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="pt-4">
                  <FieldLabel htmlFor="emailInput">Email*</FieldLabel>
                  <Input
                    {...field}
                    type="email"
                    className="pt-2.25 px-3 pb-2.5  outline-none text-emerald-900 placeholder-emerald-400 focus-visible:ring-4 focus-visible:ring-emerald-500/30 focus-visible:border-emerald-600 transition-all duration-200"
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
                    className="pt-2.25 px-3 pb-2.5  outline-none text-emerald-900 placeholder-emerald-400 focus-visible:ring-4 focus-visible:ring-emerald-500/30 focus-visible:border-emerald-600 transition-all duration-200"
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
            <Controller
              name="rePassword"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="pt-4">
                  <FieldLabel htmlFor="repPasswordInput">
                    Confirm Password*
                  </FieldLabel>
                  <Input
                    {...field}
                    type="password"
                    className="pt-2.25 px-3 pb-2.5  outline-none text-emerald-900 placeholder-emerald-400 focus-visible:ring-4 focus-visible:ring-emerald-500/30 focus-visible:border-emerald-600 transition-all duration-200"
                    id="repPasswordInput"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter Confirm Password"
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="phone"
              control={control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid} className="pt-4">
                  <FieldLabel htmlFor="phoneInput">Phone Number*</FieldLabel>
                  <Input
                    {...field}
                    type="tel"
                    className="pt-2.25 px-3 pb-2.5  outline-none text-emerald-900 placeholder-emerald-400 focus-visible:ring-4 focus-visible:ring-emerald-500/30 focus-visible:border-emerald-600 transition-all duration-200"
                    id="phoneInput"
                    aria-invalid={fieldState.invalid}
                    placeholder="Enter Your phone"
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
              <Label htmlFor="terms-checkbox">
                I agree to the Terms of Service and Privacy Policy *
              </Label>
            </Field>
            <Button
              type="submit"
              className="w-full mt-7 h-10 transition-all duration-300 hover:bg-[#0f9741] flex items-center bg-[#16A34A]"
            >
              <FaUserPlus />
              Create My Account
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-[#6a7282]">
            Already have an account?{" "}
            <Link
              className="font-semibold text-[#16a34a] hover:text-[#12843d]"
              href="/login"
            >
              Sign in
            </Link>
          </p>
        </section>
      </div>
    </main>
  );
}
