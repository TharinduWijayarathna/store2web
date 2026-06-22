import { apiFetch } from "./client";

const getSuperadminDashboard = () =>
  apiFetch<{
    stores: { total: number; published: number; suspended: number };
    users: { total: number };
  }>("/superadmin/dashboard");

const listAllStores = (q?: string) => {
  const query = q ? `?q=${encodeURIComponent(q)}` : "";
  return apiFetch<{
    stores: Array<{
      id: number;
      name: string;
      slug: string;
      status: string;
      createdAt: string;
    }>;
  }>(`/superadmin/stores${query}`);
};

const updateStoreStatus = (storeId: number, status: string) =>
  apiFetch<{ store: { id: number; status: string } }>(
    `/superadmin/stores/${storeId}`,
    {
      method: "PATCH",
      body: JSON.stringify({ status }),
    },
  );

export { getSuperadminDashboard, listAllStores, updateStoreStatus };
