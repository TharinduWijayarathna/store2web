import { type FormEvent, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ArrowLeft } from "@phosphor-icons/react";

import { MerchantLayout } from "@/components/merchant/MerchantLayout";
import { createStore } from "@/api";
import { useAuth } from "@/context/AuthContext";
import { slugify } from "@/lib/format";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

function CreateStorePage() {
  const { user, refresh } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (!user) return <Navigate to="/login" replace />;

  const previewSlug = slug || slugify(name) || "your-store";

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
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
    <MerchantLayout>
      <Button variant="ghost" size="sm" className="mb-6 -ml-2" asChild>
        <Link to="/dashboard">
          <ArrowLeft />
          Back
        </Link>
      </Button>

      <div className="mx-auto max-w-2xl">
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Create a new store
        </h1>
        <p className="mt-2 text-muted-foreground">
          Set up your ecommerce storefront. You can add products and publish right
          after.
        </p>

        <Card className="mt-8">
          <CardContent className="pt-2">
            <form onSubmit={onSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name">Store name</Label>
                <Input
                  id="name"
                  placeholder="Bloom & Co."
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
                <div className="flex items-center rounded-lg border border-input bg-muted/30 px-3 focus-within:ring-2 focus-within:ring-ring/30">
                  <span className="shrink-0 text-sm text-muted-foreground">
                    store2web.com/s/
                  </span>
                  <Input
                    id="slug"
                    className="border-0 bg-transparent shadow-none focus-visible:ring-0"
                    value={slug}
                    onChange={(e) => setSlug(slugify(e.target.value))}
                    placeholder={previewSlug}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Store description</Label>
                <Textarea
                  id="description"
                  placeholder="Tell customers what you sell and what makes your brand special."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                />
              </div>
              {error ? (
                <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
                  {error}
                </p>
              ) : null}
              <Button type="submit" size="lg" disabled={submitting}>
                {submitting ? "Creating..." : "Create store"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </MerchantLayout>
  );
}

export default CreateStorePage;
