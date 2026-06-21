import type { ReactNode } from "react";
import { Link } from "react-router-dom";

import { PlatformLayout } from "@/components/PlatformLayout";
import { cn } from "@/lib/utils";

type AuthLayoutProps = {
  children: ReactNode;
  title: string;
  description: string;
  footer?: ReactNode;
};

function AuthLayout({ children, title, description, footer }: AuthLayoutProps) {
  return (
    <PlatformLayout variant="gradient">
      <div className="grid min-h-screen lg:grid-cols-2">
        <aside className="relative hidden overflow-hidden bg-primary px-10 py-12 text-primary-foreground lg:flex lg:flex-col lg:justify-between">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,oklch(1_0_0_/_0.16),transparent_55%)]" />
          <div className="relative">
            <Link to="/" className="font-heading text-xl font-bold tracking-tight">
              Store2Web
            </Link>
            <p className="mt-8 max-w-md text-lg leading-relaxed text-primary-foreground/90">
              Launch a polished storefront for your local business without hiring
              a developer or wrestling with complicated tools.
            </p>
          </div>
          <ul className="relative space-y-4 text-sm text-primary-foreground/85">
            <li className="flex items-center gap-3">
              <span className="flex size-8 items-center justify-center rounded-full bg-white/15 text-xs font-semibold">
                1
              </span>
              Create your account in under a minute
            </li>
            <li className="flex items-center gap-3">
              <span className="flex size-8 items-center justify-center rounded-full bg-white/15 text-xs font-semibold">
                2
              </span>
              Add products and publish your catalog
            </li>
            <li className="flex items-center gap-3">
              <span className="flex size-8 items-center justify-center rounded-full bg-white/15 text-xs font-semibold">
                3
              </span>
              Share a beautiful storefront with customers
            </li>
          </ul>
        </aside>

        <div className="flex min-h-screen flex-col">
          <header className="flex items-center justify-between px-6 py-5 lg:justify-end">
            <Link
              to="/"
              className="font-heading text-lg font-bold tracking-tight lg:hidden"
            >
              Store2Web
            </Link>
            {footer}
          </header>

          <div className="flex flex-1 items-center justify-center px-6 pb-10">
            <div className="w-full max-w-md">
              <div className="mb-8 space-y-2 text-center lg:text-left">
                <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
                <p className="text-base text-muted-foreground">{description}</p>
              </div>
              <div
                className={cn(
                  "rounded-2xl border border-border/70 bg-card p-6 shadow-sm md:p-8",
                )}
              >
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PlatformLayout>
  );
}

export { AuthLayout };
