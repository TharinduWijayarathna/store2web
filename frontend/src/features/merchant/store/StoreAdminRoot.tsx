import { useEffect, useState } from "react";
import { Navigate, Outlet, useParams } from "react-router-dom";

import { LoadingScreen } from "@/components/common/LoadingScreen";
import { MerchantLayout } from "@/components/merchant/MerchantLayout";
import { getStore } from "@/api";
import type { Store } from "@/api/types";
import { useAuth } from "@/context/AuthContext";

type StoreAdminContext = {
  store: Store;
  membershipRole: string;
};

function StoreAdminRoot() {
  const { storeId } = useParams();
  const numericId = Number.parseInt(String(storeId), 10);
  const { user, loading: authLoading } = useAuth();
  const [store, setStore] = useState<Store | null>(null);
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!Number.isFinite(numericId)) return;
    setLoading(true);
    getStore(numericId)
      .then((data) => {
        setStore(data.store);
        setRole(data.membership.role);
      })
      .catch((err) =>
        setError(err instanceof Error ? err.message : "Failed to load store."),
      )
      .finally(() => setLoading(false));
  }, [numericId]);

  if (authLoading || loading) {
    return (
      <MerchantLayout>
        <LoadingScreen />
      </MerchantLayout>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  if (!Number.isFinite(numericId) || error || !store) {
    return (
      <MerchantLayout>
        <p className="text-destructive">{error ?? "Store not found."}</p>
      </MerchantLayout>
    );
  }

  return (
    <MerchantLayout
      storeId={store.id}
      storeName={store.name}
      storeSlug={store.slug}
    >
      <Outlet context={{ store, membershipRole: role } satisfies StoreAdminContext} />
    </MerchantLayout>
  );
}

export default StoreAdminRoot;
export type { StoreAdminContext };
