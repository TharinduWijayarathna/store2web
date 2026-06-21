import { Link, Navigate } from "react-router-dom";
import { ArrowSquareOut, Plus, Storefront } from "@phosphor-icons/react";

import { AppShell } from "@/components/AppShell";
import { LoadingState } from "@/components/LoadingState";
import { PageHeader } from "@/components/PageHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";

function DashboardPage() {
  const { user, stores, loading } = useAuth();

  if (loading) {
    return (
      <AppShell mainClassName="py-10">
        <LoadingState fullScreen label="Loading your dashboard..." />
      </AppShell>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <AppShell mainClassName="py-10">
      <PageHeader
        title={`Welcome back, ${user.name.split(" ")[0]}`}
        description="Manage your stores, publish storefronts, and keep your catalog up to date."
        actions={
          <Button asChild>
            <Link to="/stores/new">
              <Plus />
              Create store
            </Link>
          </Button>
        }
      />

      {stores.length === 0 ? (
        <Card className="mt-10 border-dashed">
          <CardContent className="flex flex-col items-center px-6 py-16 text-center">
            <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Storefront className="size-8" weight="duotone" />
            </div>
            <h2 className="mt-6 font-heading text-xl font-semibold">
              Create your first store
            </h2>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              You do not have any stores yet. Set up your shop, add products, and
              publish a storefront for your customers.
            </p>
            <Button className="mt-6" asChild>
              <Link to="/stores/new">
                <Plus />
                Create store
              </Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {stores.map((store) => (
            <Card
              key={store.id}
              className="transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <CardHeader>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Storefront className="size-5" weight="duotone" />
                    </div>
                    <div>
                      <CardTitle>{store.name}</CardTitle>
                      <p className="mt-1 text-sm text-muted-foreground">
                        /s/{store.slug}
                      </p>
                    </div>
                  </div>
                  <StatusBadge status={store.status} />
                </div>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                <Button size="sm" asChild>
                  <Link to={`/stores/${store.id}`}>Manage store</Link>
                </Button>
                <Button size="sm" variant="outline" asChild>
                  <Link to={`/s/${store.slug}`} target="_blank">
                    View storefront
                    <ArrowSquareOut />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </AppShell>
  );
}

export default DashboardPage;
