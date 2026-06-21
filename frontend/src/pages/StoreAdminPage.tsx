import { type FormEvent, useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";

import {
  createProduct,
  getStore,
  listProducts,
  updateStore,
} from "@/api";
import type { Product, Store } from "@/api/types";
import { PlatformHeader } from "@/components/PlatformHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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

  useEffect(() => {
    if (!Number.isFinite(numericId)) return;

    Promise.all([getStore(numericId), listProducts(numericId)])
      .then(([storeData, productData]) => {
        setStore(storeData.store);
        setProducts(productData.products);
      })
      .catch((err) =>
        setError(err instanceof Error ? err.message : "Failed to load store."),
      );
  }, [numericId]);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!Number.isFinite(numericId)) {
    return <p className="p-8">Invalid store.</p>;
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
    <div className="min-h-screen bg-background">
      <PlatformHeader />
      <main className="mx-auto max-w-6xl px-6 py-10">
        <Button variant="outline" size="sm" asChild>
          <Link to="/dashboard">Back to dashboard</Link>
        </Button>

        {error ? (
          <p className="mt-6 text-sm text-red-600">{error}</p>
        ) : store ? (
          <div className="mt-6 space-y-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl font-semibold">{store.name}</h1>
                <p className="text-sm text-muted-foreground">/{store.slug}</p>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">{store.status}</Badge>
                {store.status !== "published" ? (
                  <Button size="sm" onClick={() => void publishStore()}>
                    Publish storefront
                  </Button>
                ) : (
                  <Button size="sm" variant="outline" asChild>
                    <Link to={`/s/${store.slug}`} target="_blank">
                      View storefront
                    </Link>
                  </Button>
                )}
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Products</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <form
                  onSubmit={addProduct}
                  className="grid gap-3 md:grid-cols-[1fr_140px_auto]"
                >
                  <Input
                    placeholder="Product name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    required
                  />
                  <Input
                    placeholder="Price (USD)"
                    type="number"
                    min="0"
                    step="0.01"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                    required
                  />
                  <Button type="submit">Add product</Button>
                </form>

                {products.length === 0 ? (
                  <p className="text-sm text-muted-foreground">
                    No products yet.
                  </p>
                ) : (
                  <ul className="divide-y divide-border">
                    {products.map((product) => (
                      <li
                        key={product.id}
                        className="flex items-center justify-between py-3 text-sm"
                      >
                        <span>{product.name}</span>
                        <span>
                          ${(product.priceCents / 100).toFixed(2)}{" "}
                          <Badge variant="outline" className="ml-2">
                            {product.status}
                          </Badge>
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </CardContent>
            </Card>
          </div>
        ) : (
          <p className="mt-6 text-sm text-muted-foreground">Loading store...</p>
        )}
      </main>
    </div>
  );
}

export default StoreAdminPage;
