import { Link, Navigate } from "react-router-dom";
import { ArrowSquareOut, Plus, Storefront } from "@phosphor-icons/react";

import { EmptyState } from "@/components/common/EmptyState";
import { LoadingScreen } from "@/components/common/LoadingScreen";
import { StatusBadge } from "@/components/common/StatusBadge";
import { MerchantLayout } from "@/components/merchant/MerchantLayout";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function DashboardPage() {
  const { user, stores, loading } = useAuth();

  if (loading) {
    return (
      <MerchantLayout>
        <LoadingScreen />
      </MerchantLayout>
    );
  }

  if (!user) return <Navigate to="/login" replace />;

  return (
    <MerchantLayout>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            My stores
          </h1>
          <p className="mt-1 text-muted-foreground">
            Manage your ecommerce storefronts and catalogs.
          </p>
        </div>
        <Button asChild>
          <Link to="/stores/new">
            <Plus />
            New store
          </Link>
        </Button>
      </div>

      {stores.length === 0 ? (
        <EmptyState
          icon={<Storefront className="size-7" weight="duotone" />}
          title="No stores yet"
          description="Create your first ecommerce store to start adding products and accepting orders."
          action={
            <Button asChild>
              <Link to="/stores/new">
                <Plus />
                Create your first store
              </Link>
            </Button>
          }
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {stores.map((store) => (
            <Card
              key={store.id}
              className="transition-all hover:border-primary/30 hover:shadow-md"
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Storefront className="size-5" weight="duotone" />
                    </div>
                    <div>
                      <CardTitle className="text-base">{store.name}</CardTitle>
                      <p className="text-xs text-muted-foreground">
                        /s/{store.slug}
                      </p>
                    </div>
                  </div>
                  <StatusBadge status={store.status} />
                </div>
              </CardHeader>
              <CardContent className="flex gap-2">
                <Button size="sm" className="flex-1" asChild>
                  <Link to={`/stores/${store.id}`}>Manage</Link>
                </Button>
                <Button size="sm" variant="outline" asChild>
                  <Link to={`/s/${store.slug}`} target="_blank">
                    <ArrowSquareOut />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </MerchantLayout>
  );
}

export default DashboardPage;
