import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import {
  getSuperadminDashboard,
  listAllStores,
  updateStoreStatus,
} from "@/api";
import { PlatformHeader } from "@/components/PlatformHeader";
import { Badge } from "@/components/ui/badge";
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

  const load = async () => {
    const [dashboard, storeList] = await Promise.all([
      getSuperadminDashboard(),
      listAllStores(),
    ]);
    setStats(dashboard);
    setStores(storeList.stores);
  };

  useEffect(() => {
    if (user?.platformRole === "superadmin") {
      void load();
    }
  }, [user]);

  if (loading) {
    return <p className="p-8 text-sm text-muted-foreground">Loading...</p>;
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

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <div className="border-b border-slate-800 bg-slate-900">
        <PlatformHeader />
      </div>
      <main className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="text-2xl font-semibold">Platform superadmin</h1>
        {stats ? (
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <Card className="border-slate-800 bg-slate-900 text-slate-50">
              <CardHeader>
                <CardTitle className="text-sm">Total stores</CardTitle>
              </CardHeader>
              <CardContent className="text-2xl font-semibold">
                {stats.stores.total}
              </CardContent>
            </Card>
            <Card className="border-slate-800 bg-slate-900 text-slate-50">
              <CardHeader>
                <CardTitle className="text-sm">Published</CardTitle>
              </CardHeader>
              <CardContent className="text-2xl font-semibold">
                {stats.stores.published}
              </CardContent>
            </Card>
            <Card className="border-slate-800 bg-slate-900 text-slate-50">
              <CardHeader>
                <CardTitle className="text-sm">Users</CardTitle>
              </CardHeader>
              <CardContent className="text-2xl font-semibold">
                {stats.users.total}
              </CardContent>
            </Card>
          </div>
        ) : null}

        <div className="mt-10 space-y-3">
          {stores.map((store) => (
            <div
              key={store.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-800 bg-slate-900 px-4 py-3"
            >
              <div>
                <p className="font-medium">{store.name}</p>
                <p className="text-xs text-slate-400">/{store.slug}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">{store.status}</Badge>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => void toggleSuspend(store.id, store.status)}
                >
                  {store.status === "suspended" ? "Unsuspend" : "Suspend"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default SuperadminPage;
