import * as zod from "zod";

export const registerSchema = zod
  .object({
    name: zod
      .string()
      .nonempty("name is required")
      .min(3, "min length is 3 chars")
      .max(15, "max length is 15 chars"),
    email: zod
      .email()
      .nonempty("email is required")
      .regex(
        /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/,
        "Invalid email address. Please check the format (example: name@example.com)",
      ),
    phone: zod
      .string()
      .regex(
        /^01[0125][0-9]{8}$/,
        "Phone length is exactly 11 & Phone Prefix is with in allowed ones 010, 011, 012, 015",
      ),
    password: zod
      .string()
      .nonempty("password is required")
      .regex(
        /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/,
        "password must contain 1 number (0-9) password must contain 1 uppercase letters password must contain 1 lowercase letters password must contain 1 non-alpha numeric number password is 8-16 characters with no space",
      ),
    rePassword: zod.string().nonempty("password is required"),
  })
  .refine(
    (obj) => {
      return obj.password === obj.rePassword;
    },
    { path: ["rePassword"], error: "password and rePassword not match" },
  );

export type registerSchemaType = zod.infer<typeof registerSchema>;

export const loginSchema = zod.object({
  email: zod
    .email()
    .nonempty("email is required")
    .regex(
      /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/,
      "Invalid email address. Please check the format (example: name@example.com)",
    ),
  password: zod
    .string()
    .nonempty("password is required")
    .regex(
      /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/,
      "password must contain 1 number (0-9) password must contain 1 uppercase letters password must contain 1 lowercase letters password must contain 1 non-alpha numeric number password is 8-16 characters with no space",
    ),
});

export type loginSchemaType = zod.infer<typeof loginSchema>;
export const ForgetPasswordSchema = zod.object({
  email: zod
    .email()
    .nonempty("email is required")
    .regex(
      /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/,
      "Invalid email address. Please check the format (example: name@example.com)",
    ),
});
export type ForgetPasswordSchemaType = zod.infer<typeof ForgetPasswordSchema>