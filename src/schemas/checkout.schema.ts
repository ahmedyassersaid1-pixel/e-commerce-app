import * as zod from "zod";

export const checkoutSchema = zod.object({
  details: zod.string().trim().min(5, "Enter your street and building details"),
  phone: zod.string().regex(/^01[0125][0-9]{8}$/, "Enter a valid Egyptian mobile number"),
  city: zod.string().trim().min(2, "Enter your city"),
  paymentMethod: zod.enum(["cash", "visa"]),
});

export type CheckoutSchemaType = zod.infer<typeof checkoutSchema>;
