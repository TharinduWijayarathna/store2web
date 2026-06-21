import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Package, ShoppingBag, Storefront } from "@phosphor-icons/react";

import { getPublicProducts, getPublicStore } from "@/api";
import type { Product } from "@/api/types";
import { LoadingState } from "@/components/LoadingState";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

function StorefrontPage() {
  const { slug = "" } = useParams();
  const [storeName, setStoreName] = useState("");
  const [description, setDescription] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([getPublicStore(slug), getPublicProducts(slug)])
      .then(([storeData, productData]) => {
        setStoreName(storeData.store.name);
        setDescription(storeData.store.description);
        setProducts(productData.products);
      })
      .catch((err) =>
        setError(err instanceof Error ? err.message : "Store not available."),
      )
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <LoadingState fullScreen label="Loading storefront..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-6">
        <div className="max-w-md text-center">
          <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
            <Storefront className="size-8" />
          </div>
          <h1 className="mt-6 text-3xl font-semibold tracking-tight">
            Store unavailable
          </h1>
          <p className="mt-3 text-base text-muted-foreground">{error}</p>
          <Button className="mt-8" asChild>
            <Link to="/">Back to Store2Web</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/60 bg-card/50 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <Storefront className="size-7" weight="duotone" />
            </div>
            <div>
              <p className="text-sm font-medium text-primary">Online store</p>
              <h1 className="text-3xl font-bold tracking-tight">{storeName}</h1>
              {description ? (
                <p className="mt-2 max-w-2xl text-base text-muted-foreground">
                  {description}
                </p>
              ) : null}
            </div>
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link to="/">Powered by Store2Web</Link>
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-primary">
              <ShoppingBag className="size-5" />
              <span className="text-sm font-semibold uppercase tracking-wide">
                Shop
              </span>
            </div>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">
              Featured products
            </h2>
          </div>
          <p className="text-sm text-muted-foreground">
            {products.length} item{products.length === 1 ? "" : "s"}
          </p>
        </div>

        {products.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border/70 bg-muted/20 px-6 py-16 text-center">
            <Package className="mx-auto size-10 text-muted-foreground" />
            <p className="mt-4 font-medium">No products available yet</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Check back soon — this store is still setting up its catalog.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <Card
                key={product.id}
                className="overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                <div className="flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-primary/10 via-muted/30 to-accent/40">
                  <Package className="size-12 text-primary/70" weight="duotone" />
                </div>
                <CardContent className="space-y-3">
                  <div>
                    <h3 className="font-heading text-lg font-semibold">
                      {product.name}
                    </h3>
                    {product.description ? (
                      <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                        {product.description}
                      </p>
                    ) : null}
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xl font-bold text-primary">
                      ${(product.priceCents / 100).toFixed(2)}
                    </p>
                    <Button size="sm" variant="outline">
                      View details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default StorefrontPage;
