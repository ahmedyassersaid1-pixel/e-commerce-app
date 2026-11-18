"use server";

import {
  addAddress as addAddressRequest,
  changeCurrentPassword as changePasswordRequest,
  getAddresses as getAddressesRequest,
  getCurrentUser as getCurrentUserRequest,
  removeAddress as removeAddressRequest,
  updateCurrentUser as updateCurrentUserRequest,
} from "@/sevices/profile.sevice";
import { getToken } from "next-auth/jwt";
import { headers } from "next/headers";
import { NextRequest } from "next/server";

async function getApiToken() {
  const requestHeaders = await headers();
  const request = new NextRequest("http://localhost", { headers: requestHeaders });
  const sessionToken = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  });
  return sessionToken?.returnedToken || null;
}

function unauthorized() {
  return { ok: false, data: null, message: "Please sign in to manage your account." };
}

function apiMessage(data: unknown, fallback: string) {
  if (data && typeof data === "object" && "message" in data) {
    const message = (data as { message?: unknown }).message;
    if (typeof message === "string" && message.trim()) return message;
  }
  return fallback;
}

export async function loadAddresses() {
  const token = await getApiToken();
  if (!token) return unauthorized();
  const result = await getAddressesRequest(token);
  return { ok: result.ok, data: result.data, message: result.ok ? "" : "Could not load your addresses." };
}

export async function createAddress(address: {
  name: string;
  details: string;
  phone: string;
  city: string;
}) {
  const token = await getApiToken();
  if (!token) return unauthorized();
  const result = await addAddressRequest(token, address);
  return { ok: result.ok, data: result.data, message: result.ok ? "Address added successfully." : "Could not add this address." };
}

export async function deleteAddress(addressId: string) {
  const token = await getApiToken();
  if (!token) return unauthorized();
  const result = await removeAddressRequest(token, addressId);
  return { ok: result.ok, data: result.data, message: result.ok ? "Address removed." : "Could not remove this address." };
}

export async function loadCurrentUser() {
  const token = await getApiToken();
  if (!token) return unauthorized();
  const result = await getCurrentUserRequest(token);
  return { ok: result.ok, data: result.data, message: result.ok ? "" : "Could not load your profile." };
}

export async function saveCurrentUser(user: { name: string; email: string; phone: string }) {
  const token = await getApiToken();
  if (!token) return unauthorized();
  const result = await updateCurrentUserRequest(token, user);
  return { ok: result.ok, data: result.data, message: result.ok ? apiMessage(result.data, "Profile information updated.") : apiMessage(result.data, "Could not update your profile.") };
}

export async function saveNewPassword(passwords: {
  currentPassword: string;
  password: string;
  rePassword: string;
}) {
  const token = await getApiToken();
  if (!token) return unauthorized();
  const result = await changePasswordRequest(token, passwords);
  return { ok: result.ok, data: result.data, message: result.ok ? apiMessage(result.data, "Password changed successfully.") : apiMessage(result.data, "Could not change your password.") };
}
