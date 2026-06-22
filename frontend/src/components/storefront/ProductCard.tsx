import { Link } from "react-router-dom";
import { ShoppingBag } from "@phosphor-icons/react";
import { toast } from "sonner";

import type { Product } from "@/api/types";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";
import { Button } from "@/components/ui/button";

type ProductCardProps = {
  product: Product;
  storeSlug: string;
};

function ProductCard({ product, storeSlug }: ProductCardProps) {
  const { addItem } = useCart();

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-border/60 bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
      <Link
        to={`/s/${storeSlug}/products/${product.slug}`}
        className="product-image-bg relative aspect-square overflow-hidden"
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <ShoppingBag
            className="size-16 text-primary/25 transition-transform group-hover:scale-110"
            weight="duotone"
          />
        </div>
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <Link to={`/s/${storeSlug}/products/${product.slug}`}>
          <h3 className="font-display font-semibold leading-snug transition-colors group-hover:text-primary">
            {product.name}
          </h3>
        </Link>
        {product.description ? (
          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
            {product.description}
          </p>
        ) : null}
        <div className="mt-auto flex items-center justify-between gap-3 pt-4">
          <p className="text-lg font-bold text-foreground">
            {formatPrice(product.priceCents, product.currency)}
          </p>
          <Button
            size="sm"
            onClick={(e) => {
              e.preventDefault();
              addItem(product);
              toast.success("Added to cart", {
                description: product.name,
              });
            }}
          >
            Add to cart
          </Button>
        </div>
      </div>
    </article>
  );
}

export { ProductCard };
