import { type FormEvent, useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Package, Plus } from "@phosphor-icons/react";

import { EmptyState } from "@/components/common/EmptyState";
import { LoadingScreen } from "@/components/common/LoadingScreen";
import { StatusBadge } from "@/components/common/StatusBadge";
import type { StoreAdminContext } from "@/features/merchant/store/StoreAdminRoot";
import { createProduct, listProducts } from "@/api";
import type { Product } from "@/api/types";
import { formatPrice } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function StoreProductsPage() {
  const { store } = useOutletContext<StoreAdminContext>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const load = () => {
    setLoading(true);
    listProducts(store.id)
      .then((data) => setProducts(data.products))
      .finally(() => setLoading(false));
  };

  useEffect(load, [store.id]);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const data = await createProduct(store.id, {
      name,
      priceCents: Math.round(Number.parseFloat(price) * 100),
      description: description || undefined,
      status: "published",
    });
    setProducts((prev) => [...prev, data.product]);
    setName("");
    setPrice("");
    setDescription("");
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Products</h1>
        <p className="mt-1 text-muted-foreground">
          Manage your catalog — products appear on your public storefront when
          published.
        </p>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-base">Add new product</CardTitle>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={onSubmit}
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 lg:items-end"
          >
            <div className="space-y-2 lg:col-span-2">
              <Label htmlFor="p-name">Product name</Label>
              <Input
                id="p-name"
                placeholder="Organic cotton tee"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="p-price">Price (USD)</Label>
              <Input
                id="p-price"
                type="number"
                min="0"
                step="0.01"
                placeholder="29.99"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            <Button type="submit">
              <Plus />
              Add product
            </Button>
            <div className="space-y-2 md:col-span-2 lg:col-span-4">
              <Label htmlFor="p-desc">Description (optional)</Label>
              <Input
                id="p-desc"
                placeholder="Short product description for your storefront"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </form>
        </CardContent>
      </Card>

      {loading ? (
        <LoadingScreen label="Loading products..." />
      ) : products.length === 0 ? (
        <EmptyState
          icon={<Package className="size-7" weight="duotone" />}
          title="No products yet"
          description="Add your first product to start selling on your storefront."
        />
      ) : (
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Slug</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <p className="font-medium">{product.name}</p>
                      {product.description ? (
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {product.description}
                        </p>
                      ) : null}
                    </TableCell>
                    <TableCell>{formatPrice(product.priceCents)}</TableCell>
                    <TableCell>
                      <StatusBadge status={product.status} />
                    </TableCell>
                    <TableCell className="text-right text-xs text-muted-foreground">
                      {product.slug}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default StoreProductsPage;
