const apiBase = "https://ecommerce.routemisr.com/api/v1";

type ApiResponse<T = unknown> = {
  ok: boolean;
  status: number;
  data: T;
};

async function profileRequest<T = unknown>(
  path: string,
  token: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  body?: Record<string, string>,
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${apiBase}${path}`, {
      method,
      headers: {
        token,
        ...(body ? { "content-type": "application/json" } : {}),
      },
      ...(body ? { body: JSON.stringify(body) } : {}),
      cache: "no-store",
    });

    const data = await response.json().catch(() => ({}));
    return { ok: response.ok, status: response.status, data };
  } catch {
    return {
      ok: false,
      status: 0,
      data: { message: "Could not connect to the account service. Please try again." } as T,
    };
  }
}

export function getCurrentUser(token: string) {
  return profileRequest("/users/getMe", token, "GET");
}

export function updateCurrentUser(
  token: string,
  user: { name: string; email: string; phone: string },
) {
  return profileRequest("/users/updateMe/", token, "PUT", user);
}

export function changeCurrentPassword(
  token: string,
  passwords: { currentPassword: string; password: string; rePassword: string },
) {
  return profileRequest("/users/changeMyPassword", token, "PUT", passwords);
}

export function getAddresses(token: string) {
  return profileRequest("/addresses", token, "GET");
}

export function addAddress(
  token: string,
  address: { name: string; details: string; phone: string; city: string },
) {
  return profileRequest("/addresses", token, "POST", address);
}

export function removeAddress(token: string, addressId: string) {
  return profileRequest(`/addresses/${encodeURIComponent(addressId)}`, token, "DELETE");
}
