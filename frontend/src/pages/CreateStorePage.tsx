import { type FormEvent, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ArrowLeft, Globe, Storefront } from "@phosphor-icons/react";

import { AppShell } from "@/components/AppShell";
import { PageHeader } from "@/components/PageHeader";
import { createStore } from "@/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/AuthContext";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function CreateStorePage() {
  const { user, refresh } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const previewSlug = slug || slugify(name) || "your-store";

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const data = await createStore({
        name,
        slug: slug || slugify(name),
        description: description || undefined,
      });
      await refresh();
      navigate(`/stores/${data.store.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create store.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AppShell mainClassName="py-10">
      <Button variant="ghost" size="sm" className="mb-6 -ml-2" asChild>
        <Link to="/dashboard">
          <ArrowLeft />
          Back to dashboard
        </Link>
      </Button>

      <PageHeader
        title="Create a new store"
        description="Set up your shop details. You can add products and publish your storefront next."
      />

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardContent className="pt-2">
            <form onSubmit={onSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name">Store name</Label>
                <Input
                  id="name"
                  placeholder="Sunrise Bakery"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (!slug) setSlug(slugify(e.target.value));
                  }}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slug">Store URL</Label>
                <div className="flex items-center gap-2">
                  <span className="shrink-0 text-sm text-muted-foreground">
                    /s/
                  </span>
                  <Input
                    id="slug"
                    value={slug}
                    onChange={(e) => setSlug(slugify(e.target.value))}
                    placeholder="sunrise-bakery"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Tell customers what makes your store special."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              {error ? (
                <div className="rounded-lg border border-destructive/20 bg-destructive/5 px-3 py-2 text-sm text-destructive">
                  {error}
                </div>
              ) : null}
              <Button type="submit" disabled={submitting} size="lg">
                {submitting ? "Creating store..." : "Create store"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="overflow-hidden">
            <div className="border-b border-border/60 bg-muted/30 px-5 py-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Globe className="size-4" />
                Storefront preview
              </div>
            </div>
            <CardContent className="space-y-4 pt-2">
              <div className="flex items-center gap-3">
                <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Storefront className="size-6" weight="duotone" />
                </div>
                <div>
                  <p className="font-heading text-lg font-semibold">
                    {name || "Your store name"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    /s/{previewSlug}
                  </p>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {description ||
                  "Your store description will appear here on the public storefront."}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}

export default CreateStorePage;
