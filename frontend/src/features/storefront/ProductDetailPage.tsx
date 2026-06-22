import { useEffect, useState } from "react";
import { Link, useOutletContext, useParams } from "react-router-dom";
import { ArrowLeft, Minus, Plus, ShoppingBag, Truck } from "@phosphor-icons/react";
import { toast } from "sonner";

import { LoadingScreen } from "@/components/common/LoadingScreen";
import type { StorefrontContext } from "@/components/storefront/StorefrontLayout";
import { getPublicProduct } from "@/api";
import type { Product } from "@/api/types";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

function ProductDetailPage() {
  const { slug = "", productSlug = "" } = useParams();
  const store = useOutletContext<StorefrontContext>();
  const { addItem } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setLoading(true);
    getPublicProduct(slug, productSlug)
      .then((data) => setProduct(data.product))
      .catch((err) =>
        setError(err instanceof Error ? err.message : "Product not found."),
      )
      .finally(() => setLoading(false));
  }, [slug, productSlug]);

  if (loading) return <LoadingScreen label="Loading product..." className="py-20" />;

  if (error || !product || !store) {
    return (
      <div className="container-page py-20 text-center">
        <h1 className="text-2xl font-bold">Product not found</h1>
        <Button className="mt-6" variant="outline" asChild>
          <Link to={`/s/${slug}`}>
            <ArrowLeft />
            Back to shop
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container-page py-8 md:py-12">
      <Button variant="ghost" size="sm" className="mb-6 -ml-2" asChild>
        <Link to={`/s/${slug}`}>
          <ArrowLeft />
          Back to shop
        </Link>
      </Button>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Gallery */}
        <div className="product-image-bg flex aspect-square items-center justify-center rounded-2xl border border-border/60">
          <ShoppingBag className="size-32 text-primary/20" weight="duotone" />
        </div>

        {/* Details */}
        <div className="flex flex-col">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            {store.storeName}
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-4 text-3xl font-bold">
            {formatPrice(product.priceCents, product.currency)}
          </p>

          {product.description ? (
            <p className="mt-6 leading-relaxed text-muted-foreground">
              {product.description}
            </p>
          ) : null}

          <Separator className="my-8" />

          <div className="flex items-center gap-4">
            <div className="flex items-center rounded-lg border border-border">
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                <Minus />
              </Button>
              <span className="w-10 text-center font-medium">{quantity}</span>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => setQuantity((q) => q + 1)}
              >
                <Plus />
              </Button>
            </div>
            <Button
              size="lg"
              className="flex-1"
              onClick={() => {
                addItem(product, quantity);
                toast.success("Added to cart", {
                  description: `${quantity}× ${product.name}`,
                });
              }}
            >
              Add to cart — {formatPrice(product.priceCents * quantity, product.currency)}
            </Button>
          </div>

          <div className="mt-8 space-y-3 rounded-xl border border-border/60 bg-muted/20 p-5 text-sm">
            <div className="flex items-center gap-3 text-muted-foreground">
              <Truck className="size-5 shrink-0 text-primary" />
              Free shipping on orders over $50
            </div>
            <div className="flex items-center gap-3 text-muted-foreground">
              <ShoppingBag className="size-5 shrink-0 text-primary" />
              Secure checkout — payments coming soon
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
