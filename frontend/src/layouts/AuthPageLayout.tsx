import type { ReactNode } from "react";
import { Link } from "react-router-dom";

import { Logo } from "@/components/common/Logo";

function AuthPageLayout({
  children,
  title,
  subtitle,
}: {
  children: ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative hidden flex-col justify-between overflow-hidden bg-zinc-950 p-10 text-white lg:flex">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,oklch(0.42_0.12_165_/_0.35),transparent_60%)]" />
        <div className="relative">
          <Logo variant="light" />
        </div>
        <div className="relative space-y-6">
          <blockquote className="text-2xl font-medium leading-snug tracking-tight">
            &ldquo;We launched our online store in an afternoon. Sales started the same
            week.&rdquo;
          </blockquote>
          <p className="text-sm text-zinc-400">— Local retailer on Store2Web</p>
        </div>
        <p className="relative text-sm text-zinc-500">
          Trusted by independent shops, boutiques, and growing brands.
        </p>
      </div>

      <div className="flex flex-col">
        <header className="flex items-center justify-between p-6 lg:justify-end">
          <Logo className="lg:hidden" />
          <p className="text-sm text-muted-foreground">
            Need help?{" "}
            <Link to="/" className="font-medium text-primary hover:underline">
              Visit homepage
            </Link>
          </p>
        </header>
        <div className="flex flex-1 items-center justify-center px-6 pb-12">
          <div className="w-full max-w-[420px]">
            <div className="mb-8">
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h1>
              <p className="mt-2 text-muted-foreground">{subtitle}</p>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export { AuthPageLayout };
