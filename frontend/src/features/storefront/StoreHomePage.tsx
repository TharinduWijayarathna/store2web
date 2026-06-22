import { useEffect, useMemo, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { Sparkle } from "@phosphor-icons/react";

import { EmptyState } from "@/components/common/EmptyState";
import { LoadingScreen } from "@/components/common/LoadingScreen";
import { ProductCard } from "@/components/storefront/ProductCard";
import type { StorefrontContext } from "@/components/storefront/StorefrontLayout";
import { getPublicCategories, getPublicProducts } from "@/api";
import type { Category, Product } from "@/api/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function StoreHomePage() {
  const { slug = "" } = useParams();
  const store = useOutletContext<StorefrontContext>();
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([getPublicProducts(slug), getPublicCategories(slug)])
      .then(([productData, categoryData]) => {
        setProducts(productData.products);
        setCategories(categoryData.categories);
      })
      .finally(() => setLoading(false));
  }, [slug]);

  const filtered = useMemo(() => {
    if (activeCategory === null) return products;
    return products.filter((p) =>
      (p.metadata?.categoryIds as number[] | undefined)?.includes(activeCategory),
    );
  }, [products, activeCategory]);

  if (!store) return null;

  return (
    <>
      {/* Hero */}
      <section className="border-b border-border bg-muted/20">
        <div className="container-page py-12 md:py-16">
          <div className="flex items-center gap-2 text-sm font-medium text-primary">
            <Sparkle className="size-4" />
            Welcome to {store.storeName}
          </div>
          <h1 className="mt-3 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            {store.description ?? "Discover our curated collection"}
          </h1>
          <p className="mt-4 max-w-xl text-muted-foreground">
            Free shipping on orders over $50 · Secure checkout · Quality guaranteed
          </p>
        </div>
      </section>

      {/* Catalog */}
      <section className="container-page py-10 md:py-14">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">All products</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {products.length} product{products.length === 1 ? "" : "s"} available
            </p>
          </div>
        </div>

        {categories.length > 0 ? (
          <div className="mb-8 flex flex-wrap gap-2">
            <Button
              variant={activeCategory === null ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(null)}
            >
              All
            </Button>
            {categories.map((cat) => (
              <Button
                key={cat.id}
                variant={activeCategory === cat.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(cat.id)}
              >
                {cat.name}
              </Button>
            ))}
          </div>
        ) : null}

        {loading ? (
          <LoadingScreen label="Loading products..." />
        ) : filtered.length === 0 ? (
          <EmptyState
            title="No products yet"
            description="This store is still setting up its catalog. Check back soon."
          />
        ) : (
          <div
            className={cn(
              "grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
            )}
          >
            {filtered.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                storeSlug={store.storeSlug}
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
}

export default StoreHomePage;
