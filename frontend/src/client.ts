import createFetchClient, { Middleware, MiddlewareCallbackParams } from "openapi-fetch";
import createClient from "openapi-react-query";
import type { paths } from "./lib/api.ts";
import { jwtDecode } from "jwt-decode";

export const fetchClient = createFetchClient<paths>({
  baseUrl: import.meta.env.VITE_BACKEND_URL ?? "http://localhost:3000",
});

const authMiddleware: Middleware = {
  async onRequest({request}: MiddlewareCallbackParams) {
    const access = localStorage.getItem("access");

    if(access) {
      request.headers.set("Authorization", `Bearer ${access}`);
    }

    return request;
  }
}
fetchClient.use(authMiddleware);

export const client = createClient(fetchClient);

export function loggedIn(): boolean {
  const access = localStorage.getItem("access");

  if(!access) return false;

  try {
    const payload = jwtDecode(access);

    if(!payload || typeof payload === "string") return false;

    const exp = payload.exp;

    if(!exp) return false;

    if(exp * 1000 < Date.now()) return false;

    return true;
  } catch(e) {
    console.error(e);
    return false;
  }
}