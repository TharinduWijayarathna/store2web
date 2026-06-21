import { Link } from "react-router-dom";

import { PlatformHeader } from "@/components/PlatformHeader";
import { Button } from "@/components/ui/button";

function HomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <PlatformHeader />
      <main>
        <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-6">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                Store2Web
              </p>
              <h1 className="text-4xl font-semibold leading-tight md:text-5xl">
                Transform your local store into ecommerce with ease.
              </h1>
              <p className="max-w-xl text-sm text-muted-foreground md:text-base">
                Register, create your store, add products and pages, and publish
                a public storefront — all from one platform.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button asChild>
                  <Link to="/register">Launch your store</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/login">Log in</Link>
                </Button>
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="space-y-4 text-sm">
                <div className="rounded-xl border border-border bg-muted/40 p-4">
                  <p className="font-semibold">1. Register</p>
                  <p className="mt-1 text-muted-foreground">
                    Create your platform account in seconds.
                  </p>
                </div>
                <div className="rounded-xl border border-border bg-muted/40 p-4">
                  <p className="font-semibold">2. Build your catalog</p>
                  <p className="mt-1 text-muted-foreground">
                    Add products, categories, and detail pages.
                  </p>
                </div>
                <div className="rounded-xl border border-border bg-muted/40 p-4">
                  <p className="font-semibold">3. Go live</p>
                  <p className="mt-1 text-muted-foreground">
                    Publish your storefront for customers to browse.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default HomePage;
