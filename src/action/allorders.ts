"use server";

import { getMyToken } from "@/utils";

export async function getAllOrders(userId: string) {
  const token = await getMyToken();
  if (!token) return { status: "fail", message: "Please sign in to view your orders." };

  try {
    const response = await fetch(
      `https://ecommerce.routemisr.com/api/v1/orders/user/${encodeURIComponent(userId)}`,
      { headers: { token, "content-type": "application/json" }, cache: "no-store" },
    );
    const data = await response.json();
    if (!response.ok) {
      return { status: "fail", message: data?.message ?? "Could not load your orders." };
    }
    return data;
  } catch (error) {
    console.error("Could not load orders:", error);
    return { status: "fail", message: "Could not reach the store. Please try again." };
  }
}
