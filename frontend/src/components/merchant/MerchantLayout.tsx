import { Link, useLocation } from "react-router-dom";
import {
  ArrowSquareOut,
  ChartBar,
  Gear,
  Package,
  SignOut,
  Storefront,
} from "@phosphor-icons/react";

import { Logo } from "@/components/common/Logo";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type MerchantLayoutProps = {
  children: React.ReactNode;
  storeId?: number;
  storeName?: string;
  storeSlug?: string;
};

function MerchantLayout({
  children,
  storeId,
  storeName,
  storeSlug,
}: MerchantLayoutProps) {
  const { user, logoutUser } = useAuth();
  const location = useLocation();

  const storeLinks = storeId
    ? [
        { to: `/stores/${storeId}`, label: "Overview", icon: ChartBar, end: true },
        { to: `/stores/${storeId}/products`, label: "Products", icon: Package },
        { to: `/stores/${storeId}/settings`, label: "Settings", icon: Gear },
      ]
    : [];

  const isActive = (to: string, end?: boolean) => {
    if (end) return location.pathname === to;
    return location.pathname.startsWith(to);
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-slate-200 bg-white lg:flex">
        <div className="flex h-16 items-center border-b border-slate-100 px-5">
          <Logo />
        </div>

        <nav className="flex-1 space-y-1 p-4">
          <Link
            to="/dashboard"
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              location.pathname === "/dashboard"
                ? "bg-indigo-50 text-indigo-700"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
            )}
          >
            <Storefront className="size-5" />
            My stores
          </Link>

          {storeName ? (
            <div className="pt-4">
              <p className="mb-2 truncate px-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                {storeName}
              </p>
              {storeLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive(link.to, link.end)
                      ? "bg-indigo-50 text-indigo-700"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900",
                  )}
                >
                  <link.icon className="size-5" />
                  {link.label}
                </Link>
              ))}
              {storeSlug ? (
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-3 w-full justify-start border-slate-200"
                  asChild
                >
                  <Link to={`/s/${storeSlug}`} target="_blank">
                    <ArrowSquareOut />
                    View storefront
                  </Link>
                </Button>
              ) : null}
            </div>
          ) : null}
        </nav>

        <div className="border-t border-slate-100 p-4">
          <div className="mb-3 truncate px-1 text-sm">
            <p className="font-medium text-slate-900">{user?.name}</p>
            <p className="truncate text-xs text-slate-500">{user?.email}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-slate-600"
            onClick={() => void logoutUser()}
          >
            <SignOut />
            Sign out
          </Button>
        </div>
      </aside>

      <div className="flex flex-1 flex-col lg:pl-64">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur-lg sm:px-6 lg:px-8">
          <div className="lg:hidden">
            <Logo showText={false} />
          </div>
          <p className="hidden text-sm text-slate-500 lg:block">Merchant dashboard</p>
          <div className="flex items-center gap-2 lg:hidden">
            <Button variant="outline" size="sm" asChild>
              <Link to="/dashboard">Stores</Link>
            </Button>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

export { MerchantLayout };
