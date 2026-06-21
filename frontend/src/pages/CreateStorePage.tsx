import { type FormEvent, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import { createStore } from "@/api";
import { PlatformHeader } from "@/components/PlatformHeader";
import { Button } from "@/components/ui/button";
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
    <div className="min-h-screen bg-background">
      <PlatformHeader />
      <main className="mx-auto max-w-lg px-6 py-10">
        <Button variant="outline" size="sm" asChild>
          <Link to="/dashboard">Back to dashboard</Link>
        </Button>
        <h1 className="mt-6 text-2xl font-semibold">Create a store</h1>
        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Store name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (!slug) setSlug(slugify(e.target.value));
              }}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="slug">Store URL slug</Label>
            <Input
              id="slug"
              value={slug}
              onChange={(e) => setSlug(slugify(e.target.value))}
              placeholder="my-shop"
              required
            />
            <p className="text-xs text-muted-foreground">
              Public URL: /s/{slug || "my-shop"}
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          <Button type="submit" disabled={submitting}>
            {submitting ? "Creating..." : "Create store"}
          </Button>
        </form>
      </main>
    </div>
  );
}

export default CreateStorePage;
