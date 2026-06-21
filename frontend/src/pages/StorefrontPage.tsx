import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { getPublicProducts, getPublicStore } from "@/api";
import type { Product } from "@/api/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function StorefrontPage() {
  const { slug = "" } = useParams();
  const [storeName, setStoreName] = useState("");
  const [description, setDescription] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([getPublicStore(slug), getPublicProducts(slug)])
      .then(([storeData, productData]) => {
        setStoreName(storeData.store.name);
        setDescription(storeData.store.description);
        setProducts(productData.products);
      })
      .catch((err) =>
        setError(err instanceof Error ? err.message : "Store not available."),
      );
  }, [slug]);

  if (error) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-20 text-center">
        <h1 className="text-2xl font-semibold">Store unavailable</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error}</p>
        <Button className="mt-6" asChild>
          <Link to="/">Back to Store2Web</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-5">
          <div>
            <p className="text-lg font-semibold">{storeName || "Loading..."}</p>
            {description ? (
              <p className="text-sm text-muted-foreground">{description}</p>
            ) : null}
          </div>
          <Button variant="outline" size="sm" asChild>
            <Link to="/">Store2Web</Link>
          </Button>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10">
        <h2 className="text-xl font-semibold">Products</h2>
        {products.length === 0 ? (
          <p className="mt-4 text-sm text-muted-foreground">
            No published products yet.
          </p>
        ) : (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <Card key={product.id}>
                <CardHeader>
                  <CardTitle className="text-base">{product.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p className="font-semibold">
                    ${(product.priceCents / 100).toFixed(2)}
                  </p>
                  {product.description ? (
                    <p className="text-muted-foreground">{product.description}</p>
                  ) : null}
                  <Badge variant="outline">{product.status}</Badge>
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
