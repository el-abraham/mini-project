import { IHttpResponse } from "@/interfaces/response";
import { TokenService } from "@/lib/token";
import { BASE_URL } from "@/lib/utils";

export async function login(username: string, password: string) {
  const res = await fetch(BASE_URL + "/user/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    cache: "no-cache",
    body: JSON.stringify({ username, password }),
  });

  console.log(res.status);

  if (res.status === 200) {
    const json = (await res.json()) as IHttpResponse<{ token: string }>;
    return json;
  }

  return null;
}

export function logout() {
  TokenService.removeToken();
  window.location.href = "/login";
}
