import { useEffect, useState } from "react"
import { apiConfig, getHealth, getTenantOverview } from "./api"
import { Button } from "./components/ui/button"

function App() {
  const [apiStatus, setApiStatus] = useState<"checking" | "online" | "offline">(
    "checking",
  )
  const [tenantLabel, setTenantLabel] = useState<string | null>(null)

  useEffect(() => {
    let isActive = true

    getHealth()
      .then(() => {
        if (isActive) {
          setApiStatus("online")
        }
      })
      .catch(() => {
        if (isActive) {
          setApiStatus("offline")
        }
      })

    return () => {
      isActive = false
    }
  }, [])

  useEffect(() => {
    if (!apiConfig.tenantSlug) {
      return
    }

    let isActive = true

    getTenantOverview()
      .then((data) => {
        if (isActive) {
          setTenantLabel(data.tenant.name)
        }
      })
      .catch(() => {
        if (isActive) {
          setTenantLabel(null)
        }
      })

    return () => {
      isActive = false
    }
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-none border border-border bg-muted text-xs font-semibold">
              S2W
            </div>
            <div>
              <p className="text-sm font-semibold tracking-wide">Store2Web</p>
              <p className="text-xs text-muted-foreground">
                Local stores, online in minutes
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden flex-col items-end gap-1 text-[11px] text-muted-foreground sm:flex">
              <span className="rounded-full border border-border px-2 py-1">
                API: {apiStatus}
              </span>
              {tenantLabel ? (
                <span className="rounded-full border border-border px-2 py-1">
                  Tenant: {tenantLabel}
                </span>
              ) : null}
            </div>
            <Button variant="outline" size="sm">
              Partner with us
            </Button>
            <Button size="sm">Get early access</Button>
          </div>
        </div>
      </header>

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
                Store2Web helps neighborhood shops go online fast. Sync your
                inventory, accept online payments, and deliver locally while
                keeping your in-store operations running smoothly.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button>Launch your store</Button>
                <Button variant="outline">See how it works</Button>
              </div>
              <div className="flex flex-wrap gap-6 text-xs text-muted-foreground">
                <div>
                  <p className="text-sm font-semibold text-foreground">48 hrs</p>
                  <p>Average go-live time</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">1 click</p>
                  <p>Inventory sync</p>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">0 hassle</p>
                  <p>Managed onboarding</p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
              <div className="space-y-4">
                <div className="rounded-xl border border-border bg-muted/40 p-4">
                  <p className="text-xs font-semibold text-muted-foreground">
                    In-store inventory
                  </p>
                  <p className="mt-2 text-sm font-semibold">
                    1,284 items synced automatically
                  </p>
                </div>
                <div className="rounded-xl border border-border bg-muted/40 p-4">
                  <p className="text-xs font-semibold text-muted-foreground">
                    Online storefront
                  </p>
                  <p className="mt-2 text-sm font-semibold">
                    Branded site, mobile-first checkout
                  </p>
                </div>
                <div className="rounded-xl border border-border bg-muted/40 p-4">
                  <p className="text-xs font-semibold text-muted-foreground">
                    Delivery & pickup
                  </p>
                  <p className="mt-2 text-sm font-semibold">
                    Local delivery routes planned in minutes
                  </p>
                </div>
              </div>
              <div className="mt-6 rounded-xl border border-dashed border-border p-4 text-xs text-muted-foreground">
                Replace spreadsheets and phone orders with one smart dashboard.
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-muted/40">
          <div className="mx-auto grid max-w-6xl gap-8 px-6 py-16 md:grid-cols-3">
            <div className="rounded-xl border border-border bg-background p-6">
              <p className="text-sm font-semibold">Guided onboarding</p>
              <p className="mt-2 text-sm text-muted-foreground">
                We migrate your catalog, images, and pricing so you can sell
                online immediately.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-background p-6">
              <p className="text-sm font-semibold">Omnichannel orders</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Track walk-in, pickup, and delivery orders in a single workflow.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-background p-6">
              <p className="text-sm font-semibold">Local growth tools</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Run promotions, collect reviews, and bring nearby customers back.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-16">
          <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:items-center">
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                How it works
              </p>
              <h2 className="text-2xl font-semibold md:text-3xl">
                Your store online in three simple steps.
              </h2>
              <p className="text-sm text-muted-foreground">
                Store2Web is built for busy owners. We keep the setup simple and
                handle the technical details so you can keep serving customers.
              </p>
              <Button variant="outline">Talk to our team</Button>
            </div>
            <div className="grid gap-4">
              <div className="rounded-xl border border-border p-5">
                <p className="text-xs font-semibold text-muted-foreground">
                  Step 1
                </p>
                <p className="mt-2 text-sm font-semibold">
                  Connect your POS or upload a spreadsheet.
                </p>
              </div>
              <div className="rounded-xl border border-border p-5">
                <p className="text-xs font-semibold text-muted-foreground">
                  Step 2
                </p>
                <p className="mt-2 text-sm font-semibold">
                  Customize your storefront and delivery zones.
                </p>
              </div>
              <div className="rounded-xl border border-border p-5">
                <p className="text-xs font-semibold text-muted-foreground">
                  Step 3
                </p>
                <p className="mt-2 text-sm font-semibold">
                  Start selling online and track every order.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-20">
          <div className="rounded-2xl border border-border bg-card p-10">
            <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr] md:items-center">
              <div className="space-y-3">
                <h3 className="text-2xl font-semibold">
                  Ready to bring Store2Web to your neighborhood?
                </h3>
                <p className="text-sm text-muted-foreground">
                  We are onboarding local stores across groceries, pharmacies,
                  and specialty retail. Tell us about your shop and we will set
                  up the rest.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 md:justify-end">
                <Button>Join the waitlist</Button>
                <Button variant="outline">Request a demo</Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>Store2Web - Transforming local stores into ecommerce.</p>
          <p>Contact: hello@store2web.app</p>
        </div>
      </footer>
    </div>
  )
}

export default App
