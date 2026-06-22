import { Link } from "react-router-dom";
import {
  ArrowRight,
  ChartLineUp,
  CreditCard,
  Globe,
  Package,
  ShieldCheck,
  Sparkle,
  Storefront,
  Truck,
} from "@phosphor-icons/react";

import { MarketingLayout } from "@/layouts/MarketingLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Storefront,
    color: "bg-indigo-100 text-indigo-600",
    title: "Beautiful storefronts",
    description:
      "Launch a polished online shop with product pages, categories, and a cart experience your customers expect.",
  },
  {
    icon: Package,
    color: "bg-violet-100 text-violet-600",
    title: "Catalog management",
    description:
      "Add products, organize inventory, and publish updates from a clean merchant dashboard.",
  },
  {
    icon: ChartLineUp,
    color: "bg-emerald-100 text-emerald-600",
    title: "Built to grow",
    description:
      "Start small and scale — from your first product to a full catalog with content pages and branding.",
  },
  {
    icon: Globe,
    color: "bg-sky-100 text-sky-600",
    title: "Sell anywhere",
    description:
      "Share your store link instantly. Mobile-optimized shopping on every device.",
  },
  {
    icon: Truck,
    color: "bg-amber-100 text-amber-600",
    title: "Order-ready foundation",
    description:
      "Cart and checkout UI in place. Connect payments when you're ready to take orders.",
  },
  {
    icon: ShieldCheck,
    color: "bg-rose-100 text-rose-600",
    title: "Secure & reliable",
    description:
      "Enterprise-grade auth, tenant isolation, and platform moderation built in from day one.",
  },
];

function HomePage() {
  return (
    <MarketingLayout>
      {/* Hero */}
      <section className="gradient-hero border-b border-slate-200">
        <div className="container-page section-padding">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-700">
              <Sparkle className="size-4" weight="fill" />
              Ecommerce platform for growing businesses
            </div>
            <h1 className="mt-6 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Your store online.{" "}
              <span className="bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
                Professional from day one.
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-balance text-lg leading-relaxed text-slate-600">
              Store2Web gives you everything to launch a real ecommerce storefront —
              product catalog, shopping cart, merchant dashboard, and a customer
              experience that looks like you hired an agency.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Button size="lg" className="gradient-primary border-0 shadow-lg shadow-indigo-500/25" asChild>
                <Link to="/register">
                  Start free trial
                  <ArrowRight />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-slate-300 bg-white" asChild>
                <Link to="/login">Sign in</Link>
              </Button>
            </div>
          </div>

          {/* Store preview mockup */}
          <div className="mx-auto mt-16 max-w-5xl">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl shadow-indigo-500/10">
              <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-4 py-3">
                <span className="size-3 rounded-full bg-red-400" />
                <span className="size-3 rounded-full bg-amber-400" />
                <span className="size-3 rounded-full bg-emerald-400" />
                <span className="ml-4 text-xs text-slate-400">
                  yourstore.store2web.com
                </span>
              </div>
              <div className="grid gap-4 bg-slate-50 p-6 sm:grid-cols-3">
                {[
                  { name: "Classic Tee", price: "$29", color: "from-indigo-100 to-indigo-50" },
                  { name: "Leather Bag", price: "$89", color: "from-violet-100 to-violet-50" },
                  { name: "Sneakers", price: "$120", color: "from-sky-100 to-sky-50" },
                ].map((item) => (
                  <div key={item.name} className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                    <div className={`aspect-square bg-gradient-to-br ${item.color}`} />
                    <div className="p-4">
                      <p className="font-display font-semibold text-slate-900">{item.name}</p>
                      <p className="mt-1 text-sm font-bold text-indigo-600">{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="section-padding bg-white">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Everything a real store needs
            </h2>
            <p className="mt-4 text-slate-600">
              Not a landing page builder — a full ecommerce foundation for merchants
              who want to sell online properly.
            </p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="border-slate-200 bg-white shadow-sm transition-all hover:border-indigo-200 hover:shadow-md"
              >
                <CardContent className="pt-2">
                  <div className={`mb-4 flex size-11 items-center justify-center rounded-xl ${feature.color}`}>
                    <feature.icon className="size-6" weight="duotone" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-slate-900">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="border-y border-slate-200 bg-slate-50 section-padding">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Go live in three steps
            </h2>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {[
              { step: "01", title: "Create your account", desc: "Sign up and set up your merchant profile in under a minute." },
              { step: "02", title: "Build your catalog", desc: "Add products, set prices, and customize your store settings." },
              { step: "03", title: "Start selling", desc: "Share your storefront link and let customers shop with cart checkout." },
            ].map((item) => (
              <div key={item.step} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <span className="text-3xl font-extrabold text-indigo-200">{item.step}</span>
                <h3 className="mt-3 font-display text-xl font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-2 text-sm text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing placeholder */}
      <section id="pricing" className="section-padding bg-white">
        <div className="container-page">
          <div className="mx-auto max-w-lg rounded-2xl border border-indigo-100 bg-indigo-50/50 p-8 text-center shadow-sm">
            <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
              <CreditCard className="size-6" />
            </div>
            <h2 className="mt-4 font-display text-2xl font-bold text-slate-900">
              Simple pricing, coming soon
            </h2>
            <p className="mt-2 text-slate-600">
              Start building your store today. Subscription plans will be announced
              when we launch billing.
            </p>
            <Button className="mt-6 gradient-primary border-0" size="lg" asChild>
              <Link to="/register">Get started free</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="gradient-primary section-padding !py-20">
        <div className="container-page text-center text-white">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to launch your ecommerce store?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-indigo-100">
            Join merchants who chose Store2Web for a professional online presence.
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="mt-8 bg-white text-indigo-600 shadow-lg hover:bg-indigo-50"
            asChild
          >
            <Link to="/register">
              Create your store
              <ArrowRight />
            </Link>
          </Button>
        </div>
      </section>
    </MarketingLayout>
  );
}

export default HomePage;
