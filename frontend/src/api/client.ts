const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000/api";
const TENANT_HEADER_NAME =
  import.meta.env.VITE_TENANT_HEADER_NAME ?? "x-tenant-slug";
const TENANT_SLUG = import.meta.env.VITE_TENANT_SLUG ?? "";

type ApiOptions = RequestInit & {
  skipTenant?: boolean;
};

const apiFetch = async <T>(path: string, options: ApiOptions = {}) => {
  const headers = new Headers(options.headers);

  if (!headers.has("Content-Type") && options.body) {
    headers.set("Content-Type", "application/json");
  }

  if (!options.skipTenant && TENANT_SLUG) {
    headers.set(TENANT_HEADER_NAME, TENANT_SLUG);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorPayload = await response.json().catch(() => null);
    const message =
      errorPayload?.error ||
      `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return (await response.json()) as T;
};

const apiConfig = {
  baseUrl: API_BASE_URL,
  tenantHeaderName: TENANT_HEADER_NAME,
  tenantSlug: TENANT_SLUG,
};

export { apiFetch, apiConfig };
