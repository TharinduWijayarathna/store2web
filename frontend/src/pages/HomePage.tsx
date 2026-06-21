import { Link } from "react-router-dom";
import {
  ArrowRight,
  Lightning,
  Package,
  RocketLaunch,
  Storefront,
} from "@phosphor-icons/react";

import { AppShell } from "@/components/AppShell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: RocketLaunch,
    title: "Go live fast",
    description:
      "Register, create your store, and publish a storefront in minutes — not weeks.",
  },
  {
    icon: Package,
    title: "Manage your catalog",
    description:
      "Add products, organize categories, and keep your inventory looking sharp.",
  },
  {
    icon: Storefront,
    title: "Beautiful storefronts",
    description:
      "Give customers a clean, mobile-friendly shopping experience out of the box.",
  },
  {
    icon: Lightning,
    title: "Built for local businesses",
    description:
      "Simple tools for shop owners who want to sell online without the complexity.",
  },
];

function HomePage() {
  return (
    <AppShell variant="gradient" mainClassName="py-0" showFooter>
      <section className="py-16 md:py-24 lg:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
            <RocketLaunch className="size-4" />
            Launch your store today
          </div>
          <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-6xl md:leading-[1.08]">
            Turn your local shop into a{" "}
            <span className="text-primary">modern online store</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Store2Web helps small businesses create polished storefronts, manage
            products, and reach customers online — without code or design skills.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Button size="lg" asChild>
              <Link to="/register">
                Start for free
                <ArrowRight />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/login">Sign in to your account</Link>
            </Button>
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-5xl">
          <div className="overflow-hidden rounded-2xl border border-border/70 bg-card shadow-xl shadow-primary/5 ring-1 ring-border/50">
            <div className="border-b border-border/60 bg-muted/40 px-6 py-4">
              <div className="flex items-center gap-2">
                <span className="size-3 rounded-full bg-red-400/80" />
                <span className="size-3 rounded-full bg-amber-400/80" />
                <span className="size-3 rounded-full bg-emerald-400/80" />
              </div>
            </div>
            <div className="grid gap-4 p-6 md:grid-cols-3 md:p-8">
              {[
                { step: "01", label: "Create account", detail: "Sign up in seconds" },
                { step: "02", label: "Add products", detail: "Build your catalog" },
                { step: "03", label: "Publish store", detail: "Share your link" },
              ].map((item) => (
                <div
                  key={item.step}
                  className="rounded-xl border border-border/60 bg-background p-5"
                >
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                    Step {item.step}
                  </p>
                  <p className="mt-3 font-heading text-lg font-semibold">
                    {item.label}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border/60 py-16 md:py-20">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
            Everything you need to sell online
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base text-muted-foreground">
            A focused toolkit for merchants who want professional results without
            enterprise complexity.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {features.map((feature) => (
            <Card key={feature.title} className="transition-shadow hover:shadow-md">
              <CardContent className="flex gap-4 pt-2">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <feature.icon className="size-6" weight="duotone" />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold">
                    {feature.title}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-16 rounded-2xl bg-primary px-8 py-12 text-center text-primary-foreground md:mb-20 md:px-12 md:py-16">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          Ready to bring your store online?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-primary-foreground/85">
          Join Store2Web and publish a storefront your customers will love.
        </p>
        <Button
          size="lg"
          variant="secondary"
          className="mt-8 bg-white text-primary hover:bg-white/90"
          asChild
        >
          <Link to="/register">
            Create your free account
            <ArrowRight />
          </Link>
        </Button>
      </section>
    </AppShell>
  );
}

export default HomePage;
