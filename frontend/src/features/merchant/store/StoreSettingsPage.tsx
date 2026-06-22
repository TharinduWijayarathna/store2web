import { type FormEvent, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { RocketLaunch } from "@phosphor-icons/react";

import { StatusBadge } from "@/components/common/StatusBadge";
import type { StoreAdminContext } from "@/features/merchant/store/StoreAdminRoot";
import { updateStore } from "@/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

function StoreSettingsPage() {
  const { store: initial } = useOutletContext<StoreAdminContext>();
  const [store, setStore] = useState(initial);
  const [name, setName] = useState(store.name);
  const [description, setDescription] = useState(store.description ?? "");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const onSave = async (e: FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);
    try {
      const data = await updateStore(store.id, {
        name,
        description: description || null,
      });
      setStore(data.store);
      setMessage("Settings saved.");
    } finally {
      setSaving(false);
    }
  };

  const publish = async () => {
    const data = await updateStore(store.id, { status: "published" });
    setStore(data.store);
    setMessage("Store published!");
  };

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight">Store settings</h1>
        <p className="mt-1 text-muted-foreground">
          Update your store profile and publishing status.
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>General</CardTitle>
            <StatusBadge status={store.status} />
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSave} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="s-name">Store name</Label>
              <Input
                id="s-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="s-desc">Description</Label>
              <Textarea
                id="s-desc"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label>Store URL</Label>
              <Input value={`/s/${store.slug}`} disabled />
            </div>
            {message ? (
              <p className="text-sm text-primary">{message}</p>
            ) : null}
            <div className="flex flex-wrap gap-3">
              <Button type="submit" disabled={saving}>
                {saving ? "Saving..." : "Save changes"}
              </Button>
              {store.status !== "published" ? (
                <Button type="button" variant="outline" onClick={() => void publish()}>
                  <RocketLaunch />
                  Publish store
                </Button>
              ) : null}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default StoreSettingsPage;
