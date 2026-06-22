import { useEffect, useState } from "react";
import { Link, useOutletContext, useParams } from "react-router-dom";
import { ArrowLeft } from "@phosphor-icons/react";

import { LoadingScreen } from "@/components/common/LoadingScreen";
import type { StorefrontContext } from "@/components/storefront/StorefrontLayout";
import { apiFetch } from "@/api/client";
import type { ContentPage } from "@/api/types";
import { Button } from "@/components/ui/button";

function ContentPageView() {
  const { slug = "", pageSlug = "" } = useParams();
  const store = useOutletContext<StorefrontContext>();
  const [page, setPage] = useState<ContentPage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    apiFetch<{ page: ContentPage }>(`/public/stores/${slug}/pages/${pageSlug}`)
      .then((data) => setPage(data.page))
      .catch((err) =>
        setError(err instanceof Error ? err.message : "Page not found."),
      )
      .finally(() => setLoading(false));
  }, [slug, pageSlug]);

  if (loading) return <LoadingScreen label="Loading page..." className="py-20" />;

  if (error || !page) {
    return (
      <div className="container-page py-20 text-center">
        <h1 className="text-2xl font-bold">Page not found</h1>
        <Button className="mt-6" variant="outline" asChild>
          <Link to={`/s/${slug}`}>
            <ArrowLeft />
            Back to shop
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <article className="container-page max-w-3xl py-10 md:py-14">
      <Button variant="ghost" size="sm" className="mb-6 -ml-2" asChild>
        <Link to={`/s/${slug}`}>
          <ArrowLeft />
          Back to {store?.storeName ?? "shop"}
        </Link>
      </Button>
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{page.title}</h1>
      <div className="prose prose-neutral mt-8 max-w-none dark:prose-invert">
        {page.body ? (
          <div className="whitespace-pre-wrap leading-relaxed text-muted-foreground">
            {page.body}
          </div>
        ) : (
          <p className="text-muted-foreground">This page has no content yet.</p>
        )}
      </div>
    </article>
  );
}

export default ContentPageView;
