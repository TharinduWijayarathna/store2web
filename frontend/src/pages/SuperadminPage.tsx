import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import {
  Buildings,
  ShieldCheck,
  Storefront,
  UsersThree,
} from "@phosphor-icons/react";

import {
  getSuperadminDashboard,
  listAllStores,
  updateStoreStatus,
} from "@/api";
import { LoadingState } from "@/components/LoadingState";
import { PageHeader } from "@/components/PageHeader";
import { PlatformHeader } from "@/components/PlatformHeader";
import { PlatformLayout } from "@/components/PlatformLayout";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";

function SuperadminPage() {
  const { user, loading } = useAuth();
  const [stats, setStats] = useState<{
    stores: { total: number; published: number; suspended: number };
    users: { total: number };
  } | null>(null);
  const [stores, setStores] = useState<
    Array<{
      id: number;
      name: string;
      slug: string;
      status: string;
      createdAt: string;
    }>
  >([]);
  const [dataLoading, setDataLoading] = useState(true);

  const load = async () => {
    setDataLoading(true);
    try {
      const [dashboard, storeList] = await Promise.all([
        getSuperadminDashboard(),
        listAllStores(),
      ]);
      setStats(dashboard);
      setStores(storeList.stores);
    } finally {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    if (user?.platformRole === "superadmin") {
      void load();
    }
  }, [user]);

  if (loading) {
    return (
      <PlatformLayout className="bg-slate-950 text-white">
        <LoadingState fullScreen label="Loading admin console..." />
      </PlatformLayout>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.platformRole !== "superadmin") {
    return <Navigate to="/dashboard" replace />;
  }

  const toggleSuspend = async (storeId: number, currentStatus: string) => {
    const nextStatus = currentStatus === "suspended" ? "published" : "suspended";
    await updateStoreStatus(storeId, nextStatus);
    await load();
  };

  const statCards = stats
    ? [
        {
          label: "Total stores",
          value: stats.stores.total,
          icon: Storefront,
        },
        {
          label: "Published",
          value: stats.stores.published,
          icon: ShieldCheck,
        },
        {
          label: "Platform users",
          value: stats.users.total,
          icon: UsersThree,
        },
      ]
    : [];

  return (
    <PlatformLayout className="bg-slate-950 text-white">
      <PlatformHeader tone="dark" />
      <main className="mx-auto max-w-6xl px-6 py-10">
        <PageHeader
          title="Platform administration"
          description="Monitor stores across the platform and manage moderation actions."
          className="border-white/10 pb-8 text-white [&_p]:text-slate-400"
        />

        {dataLoading ? (
          <LoadingState fullScreen label="Loading platform data..." />
        ) : (
          <>
            <div className="grid gap-4 md:grid-cols-3">
              {statCards.map((item) => (
                <Card
                  key={item.label}
                  className="border-white/10 bg-white/5 text-white shadow-none ring-0"
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm font-medium text-slate-300">
                        {item.label}
                      </CardTitle>
                      <item.icon className="size-5 text-indigo-300" />
                    </div>
                  </CardHeader>
                  <CardContent className="text-3xl font-bold">
                    {item.value}
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-10 space-y-3">
              <h2 className="font-heading text-lg font-semibold">All stores</h2>
              {stores.length === 0 ? (
                <div className="rounded-xl border border-dashed border-white/10 px-6 py-10 text-center text-slate-400">
                  No stores on the platform yet.
                </div>
              ) : (
                stores.map((store) => (
                  <div
                    key={store.id}
                    className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/5 px-5 py-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 items-center justify-center rounded-lg bg-indigo-500/15 text-indigo-300">
                        <Buildings className="size-5" />
                      </div>
                      <div>
                        <p className="font-medium">{store.name}</p>
                        <p className="text-sm text-slate-400">/s/{store.slug}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <StatusBadge status={store.status} />
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-white/15 bg-transparent text-white hover:bg-white/10 hover:text-white"
                        onClick={() => void toggleSuspend(store.id, store.status)}
                      >
                        {store.status === "suspended" ? "Unsuspend" : "Suspend"}
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </main>
    </PlatformLayout>
  );
}

export default SuperadminPage;
