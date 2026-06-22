import { useState } from "react";
import { Outlet, useParams } from "react-router-dom";

import { LoadingScreen } from "@/components/common/LoadingScreen";
import { CartDrawer } from "@/components/storefront/CartDrawer";
import { StoreFooter } from "@/components/storefront/StoreFooter";
import { StoreNavbar } from "@/components/storefront/StoreNavbar";
import { CartProvider } from "@/context/CartContext";

type StorefrontContext = {
  storeName: string;
  storeSlug: string;
  description: string | null;
  logoUrl: string | null;
  pages: Array<{ title: string; slug: string }>;
};

function StorefrontShell({ store }: { store: StorefrontContext }) {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <CartProvider storeSlug={store.storeSlug}>
      <div className="flex min-h-screen flex-col bg-background">
        <StoreNavbar
          storeName={store.storeName}
          storeSlug={store.storeSlug}
          logoUrl={store.logoUrl}
          pages={store.pages}
          onCartOpen={() => setCartOpen(true)}
        />
        <main className="flex-1">
          <Outlet context={store} />
        </main>
        <StoreFooter
          storeName={store.storeName}
          storeSlug={store.storeSlug}
          pages={store.pages}
        />
        <CartDrawer
          open={cartOpen}
          onOpenChange={setCartOpen}
          storeName={store.storeName}
        />
      </div>
    </CartProvider>
  );
}

function StorefrontLayout({
  store,
  loading,
  error,
}: {
  store: StorefrontContext | null;
  loading: boolean;
  error: string | null;
}) {
  if (loading) {
    return <LoadingScreen label="Loading store..." className="min-h-screen" />;
  }

  if (error || !store) {
    return (
      <div className="flex min-h-screen items-center justify-center px-6">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-bold">Store not found</h1>
          <p className="mt-2 text-muted-foreground">
            {error ?? "This store is unavailable or has been removed."}
          </p>
        </div>
      </div>
    );
  }

  return <StorefrontShell store={store} />;
}

function useStorefrontParams() {
  return useParams<{ slug: string; productSlug?: string; pageSlug?: string }>();
}

export { StorefrontLayout, StorefrontShell, useStorefrontParams };
export type { StorefrontContext };
