const API_URL = (
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"
).replace(/\/$/, "");

export class ApiError extends Error {
  constructor(message, status) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

export async function api(path, { token, ...options } = {}) {
  const headers = new Headers(options.headers || {});
  if (token) headers.set("Authorization", `Bearer ${token}`);
  if (
    options.body &&
    !(options.body instanceof FormData) &&
    !headers.has("Content-Type")
  ) {
    headers.set("Content-Type", "application/json");
  }
  let response;
  try {
    response = await fetch(`${API_URL}/api${path}`, { ...options, headers });
  } catch {
    throw new ApiError(
      "Não foi possível conectar à API. Confira se o backend está iniciado.",
      0,
    );
  }
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    if (response.status === 401 && token && typeof window !== "undefined") {
      window.localStorage.removeItem("tugarin.session");
      window.dispatchEvent(new Event("tugarin:session-expired"));
    }
    throw new ApiError(
      data.erro || "A solicitação não foi concluída.",
      response.status,
    );
  }
  return data;
}

export { API_URL };
