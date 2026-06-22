import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  StorefrontLayout,
  type StorefrontContext,
} from "@/components/storefront/StorefrontLayout";
import { getPublicPages, getPublicStore } from "@/api";

function StorefrontRoot() {
  const { slug = "" } = useParams();
  const [store, setStore] = useState<StorefrontContext | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    Promise.all([getPublicStore(slug), getPublicPages(slug)])
      .then(([storeData, pagesData]) => {
        setStore({
          storeName: storeData.store.name,
          storeSlug: storeData.store.slug,
          description: storeData.store.description,
          logoUrl: storeData.store.logoUrl,
          pages: pagesData.pages.map((p) => ({
            title: p.title,
            slug: p.slug,
          })),
        });
      })
      .catch((err) =>
        setError(err instanceof Error ? err.message : "Store unavailable."),
      )
      .finally(() => setLoading(false));
  }, [slug]);

  return <StorefrontLayout store={store} loading={loading} error={error} />;
}

export { StorefrontRoot };
