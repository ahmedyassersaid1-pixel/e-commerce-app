"use server";

import { getMyToken } from "@/utils";
import type { CheckoutSchemaType } from "@/schemas/checkout.schema";

const API = "https://ecommerce.routemisr.com/api/v1";

export async function submitCheckout(cartId: string, values: CheckoutSchemaType) {
  const token = await getMyToken();
  if (!token) return { status: "fail", message: "Please sign in to place your order." };
  if (!cartId) return { status: "fail", message: "Your cart is empty. Add products before checkout." };

  try {
    const isVisa = values.paymentMethod === "visa";
    const url = isVisa
      ? `${API}/orders/checkout-session/${encodeURIComponent(cartId)}?url=${encodeURIComponent(process.env.NEXTAUTH_URL ?? "http://localhost:3000")}`
      : `${API}/orders/${encodeURIComponent(cartId)}`;
    const response = await fetch(url, {
      method: "POST",
      headers: { token, "content-type": "application/json" },
      body: JSON.stringify({ shippingAddress: { details: values.details, phone: values.phone, city: values.city } }),
      cache: "no-store",
    });
    const result = await response.json();
    if (!response.ok || result?.status === "fail") {
      return { status: "fail", message: result?.message ?? "Could not place your order. Please try again." };
    }
    return { status: "success", data: result.data, session: result.session };
  } catch (error) {
    console.error("Checkout request failed:", error);
    return { status: "fail", message: "Could not reach the store. Please try again." };
  }
}
