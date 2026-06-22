import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Buildings, ShieldCheck, Storefront, UsersThree } from "@phosphor-icons/react";

import { LoadingScreen } from "@/components/common/LoadingScreen";
import { StatusBadge } from "@/components/common/StatusBadge";
import { Logo } from "@/components/common/Logo";
import {
  getSuperadminDashboard,
  listAllStores,
  updateStoreStatus,
} from "@/api";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function SuperadminPage() {
  const { user, loading: authLoading } = useAuth();
  const [stats, setStats] = useState<{
    stores: { total: number; published: number; suspended: number };
    users: { total: number };
  } | null>(null);
  const [stores, setStores] = useState<
    Array<{ id: number; name: string; slug: string; status: string }>
  >([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    try {
      const [dashboard, storeList] = await Promise.all([
        getSuperadminDashboard(),
        listAllStores(),
      ]);
      setStats(dashboard);
      setStores(storeList.stores);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.platformRole === "superadmin") void load();
  }, [user]);

  if (authLoading) return <LoadingScreen className="min-h-screen" />;
  if (!user) return <Navigate to="/login" replace />;
  if (user.platformRole !== "superadmin") return <Navigate to="/dashboard" replace />;

  const toggleSuspend = async (id: number, status: string) => {
    await updateStoreStatus(id, status === "suspended" ? "published" : "suspended");
    await load();
  };

  const statCards = stats
    ? [
        { label: "Total stores", value: stats.stores.total, icon: Storefront },
        { label: "Published", value: stats.stores.published, icon: ShieldCheck },
        { label: "Users", value: stats.users.total, icon: UsersThree },
      ]
    : [];

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <header className="border-b border-white/10">
        <div className="container-page flex h-16 items-center justify-between">
          <Logo variant="light" />
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium">
            Platform Admin
          </span>
        </div>
      </header>

      <main className="container-page py-10">
        <h1 className="text-2xl font-bold">Platform administration</h1>
        <p className="mt-1 text-zinc-400">Monitor and moderate stores across Store2Web.</p>

        {loading ? (
          <LoadingScreen label="Loading platform data..." className="py-20" />
        ) : (
          <>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {statCards.map((s) => (
                <Card key={s.label} className="border-white/10 bg-white/5 text-white">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm text-zinc-400">{s.label}</CardTitle>
                      <s.icon className="size-5 text-emerald-400" />
                    </div>
                  </CardHeader>
                  <CardContent className="text-3xl font-bold">{s.value}</CardContent>
                </Card>
              ))}
            </div>

            <h2 className="mb-4 mt-10 text-lg font-semibold">All stores</h2>
            <div className="space-y-2">
              {stores.map((store) => (
                <div
                  key={store.id}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-5 py-4"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-emerald-500/15">
                      <Buildings className="size-5 text-emerald-400" />
                    </div>
                    <div>
                      <p className="font-medium">{store.name}</p>
                      <p className="text-sm text-zinc-400">/s/{store.slug}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={store.status} />
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-white/15 text-white hover:bg-white/10"
                      onClick={() => void toggleSuspend(store.id, store.status)}
                    >
                      {store.status === "suspended" ? "Unsuspend" : "Suspend"}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}

export default SuperadminPage;
