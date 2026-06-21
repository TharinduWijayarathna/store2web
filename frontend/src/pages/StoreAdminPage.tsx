import { type FormEvent, useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowSquareOut,
  Package,
  Plus,
  RocketLaunch,
} from "@phosphor-icons/react";

import {
  createProduct,
  getStore,
  listProducts,
  updateStore,
} from "@/api";
import type { Product, Store } from "@/api/types";
import { AppShell } from "@/components/AppShell";
import { LoadingState } from "@/components/LoadingState";
import { PageHeader } from "@/components/PageHeader";
import { StatusBadge } from "@/components/StatusBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";

function StoreAdminPage() {
  const { storeId } = useParams();
  const numericId = Number.parseInt(String(storeId), 10);
  const { user } = useAuth();
  const [store, setStore] = useState<Store | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!Number.isFinite(numericId)) return;

    setLoading(true);
    Promise.all([getStore(numericId), listProducts(numericId)])
      .then(([storeData, productData]) => {
        setStore(storeData.store);
        setProducts(productData.products);
      })
      .catch((err) =>
        setError(err instanceof Error ? err.message : "Failed to load store."),
      )
      .finally(() => setLoading(false));
  }, [numericId]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!Number.isFinite(numericId)) {
    return (
      <AppShell mainClassName="py-10">
        <p className="text-sm text-muted-foreground">Invalid store.</p>
      </AppShell>
    );
  }

  const publishStore = async () => {
    const data = await updateStore(numericId, { status: "published" });
    setStore(data.store);
  };

  const addProduct = async (event: FormEvent) => {
    event.preventDefault();
    const priceCents = Math.round(Number.parseFloat(productPrice) * 100);
    const data = await createProduct(numericId, {
      name: productName,
      priceCents,
      status: "published",
    });
    setProducts((current) => [...current, data.product]);
    setProductName("");
    setProductPrice("");
  };

  return (
    <AppShell mainClassName="py-10">
      <Button variant="ghost" size="sm" className="mb-6 -ml-2" asChild>
        <Link to="/dashboard">
          <ArrowLeft />
          Back to dashboard
        </Link>
      </Button>

      {loading ? (
        <LoadingState fullScreen label="Loading store..." />
      ) : error ? (
        <div className="rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      ) : store ? (
        <>
          <PageHeader
            title={store.name}
            description={`Manage products and publish your storefront at /s/${store.slug}`}
            actions={
              <div className="flex flex-wrap items-center gap-2">
                <StatusBadge status={store.status} />
                {store.status !== "published" ? (
                  <Button onClick={() => void publishStore()}>
                    <RocketLaunch />
                    Publish storefront
                  </Button>
                ) : (
                  <Button variant="outline" asChild>
                    <Link to={`/s/${store.slug}`} target="_blank">
                      View storefront
                      <ArrowSquareOut />
                    </Link>
                  </Button>
                )}
              </div>
            }
          />

          <Card className="mt-10">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Package className="size-5" weight="duotone" />
                </div>
                <div>
                  <CardTitle>Products</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Add items to your catalog and publish them to your storefront.
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <form
                onSubmit={addProduct}
                className="grid gap-4 rounded-xl border border-border/60 bg-muted/20 p-4 md:grid-cols-[1fr_160px_auto] md:items-end"
              >
                <div className="space-y-2">
                  <Label htmlFor="product-name">Product name</Label>
                  <Input
                    id="product-name"
                    placeholder="Artisan sourdough loaf"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="product-price">Price (USD)</Label>
                  <Input
                    id="product-price"
                    placeholder="12.99"
                    type="number"
                    min="0"
                    step="0.01"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="md:mb-0.5">
                  <Plus />
                  Add product
                </Button>
              </form>

              {products.length === 0 ? (
                <div className="rounded-xl border border-dashed border-border/70 px-6 py-10 text-center">
                  <p className="font-medium">No products yet</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Add your first product to start building your catalog.
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-border/60 overflow-hidden rounded-xl border border-border/60">
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className="flex flex-wrap items-center justify-between gap-3 bg-background px-4 py-4"
                    >
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">
                          ${(product.priceCents / 100).toFixed(2)}
                        </p>
                      </div>
                      <StatusBadge status={product.status} />
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </>
      ) : null}
    </AppShell>
  );
}

export default StoreAdminPage;
