"use server";

const apiBase = "https://ecommerce.routemisr.com/api/v1/auth";

async function requestAuthApi(path: string, method: "POST" | "PUT", body: object) {
  try {
    const response = await fetch(`${apiBase}/${path}`, {
      method,
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    });
    const data = await response.json();
    return { ok: response.ok, data };
  } catch {
    return { ok: false, data: { message: "Unable to reach the password recovery service. Please try again." } };
  }
}

export async function forgetPassword(email: { email: string }) {
  return requestAuthApi("forgotPasswords", "POST", email);
}

export async function verifyResetCode(resetCode: string) {
  return requestAuthApi("verifyResetCode", "POST", { resetCode });
}

export async function resetPassword(email: string, newPassword: string) {
  return requestAuthApi("resetPassword", "PUT", { email, newPassword });
}
