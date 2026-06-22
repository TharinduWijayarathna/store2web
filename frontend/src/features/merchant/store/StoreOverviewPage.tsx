import { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import {
  ArrowSquareOut,
  Eye,
  Package,
  RocketLaunch,
  ShoppingBag,
} from "@phosphor-icons/react";

import { StatusBadge } from "@/components/common/StatusBadge";
import type { StoreAdminContext } from "@/features/merchant/store/StoreAdminRoot";
import { updateStore } from "@/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function StoreOverviewPage() {
  const { store: initialStore } = useOutletContext<StoreAdminContext>();
  const [store, setStore] = useState(initialStore);

  const publish = async () => {
    const data = await updateStore(store.id, { status: "published" });
    setStore(data.store);
  };

  const stats = [
    { label: "Status", value: store.status, icon: Eye },
    { label: "Store URL", value: `/s/${store.slug}`, icon: ShoppingBag },
    { label: "Products", value: "Manage in Products", icon: Package },
  ];

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              {store.name}
            </h1>
            <StatusBadge status={store.status} />
          </div>
          <p className="mt-1 text-muted-foreground">
            {store.description ?? "Manage your ecommerce storefront."}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          {store.status !== "published" ? (
            <Button onClick={() => void publish()}>
              <RocketLaunch />
              Publish store
            </Button>
          ) : null}
          <Button variant="outline" asChild>
            <Link to={`/s/${store.slug}`} target="_blank">
              <ArrowSquareOut />
              View storefront
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.label}
                </CardTitle>
                <stat.icon className="size-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <p className="font-semibold capitalize">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Quick actions</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3">
          <Button asChild>
            <Link to={`/stores/${store.id}/products`}>Add products</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to={`/stores/${store.id}/settings`}>Store settings</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default StoreOverviewPage;
