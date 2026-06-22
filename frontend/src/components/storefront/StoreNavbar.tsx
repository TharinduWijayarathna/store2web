import { Link } from "react-router-dom";
import { MagnifyingGlass, ShoppingBag, User } from "@phosphor-icons/react";

import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type StoreNavbarProps = {
  storeName: string;
  storeSlug: string;
  logoUrl?: string | null;
  pages?: Array<{ title: string; slug: string }>;
  onCartOpen: () => void;
  className?: string;
};

function StoreNavbar({
  storeName,
  storeSlug,
  logoUrl,
  pages = [],
  onCartOpen,
  className,
}: StoreNavbarProps) {
  const { itemCount } = useCart();

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b border-border/60 bg-background/95 backdrop-blur-md",
        className,
      )}
    >
      <div className="container-page">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link
            to={`/s/${storeSlug}`}
            className="flex min-w-0 items-center gap-3"
          >
            {logoUrl ? (
              <img
                src={logoUrl}
                alt={storeName}
                className="size-9 rounded-lg object-cover"
              />
            ) : (
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
                {storeName.charAt(0).toUpperCase()}
              </span>
            )}
            <span className="truncate font-display text-lg font-bold tracking-tight">
              {storeName}
            </span>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            <Link
              to={`/s/${storeSlug}`}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Shop
            </Link>
            {pages.slice(0, 4).map((page) => (
              <Link
                key={page.slug}
                to={`/s/${storeSlug}/pages/${page.slug}`}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {page.title}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon-sm" aria-label="Search">
              <MagnifyingGlass />
            </Button>
            <Button variant="ghost" size="icon-sm" aria-label="Account">
              <User />
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              className="relative"
              aria-label="Cart"
              onClick={onCartOpen}
            >
              <ShoppingBag />
              {itemCount > 0 ? (
                <span className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              ) : null}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

export { StoreNavbar };
