import { Link } from "react-router-dom";

type StoreFooterProps = {
  storeName: string;
  storeSlug: string;
  pages?: Array<{ title: string; slug: string }>;
};

function StoreFooter({ storeName, storeSlug, pages = [] }: StoreFooterProps) {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container-page py-12">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <p className="font-display text-lg font-bold">{storeName}</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Quality products, delivered with care.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold">Shop</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to={`/s/${storeSlug}`} className="hover:text-foreground">
                  All products
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold">Information</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {pages.map((page) => (
                <li key={page.slug}>
                  <Link
                    to={`/s/${storeSlug}/pages/${page.slug}`}
                    className="hover:text-foreground"
                  >
                    {page.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col gap-2 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {storeName}</p>
          <Link to="/" className="hover:text-foreground">
            Powered by Store2Web
          </Link>
        </div>
      </div>
    </footer>
  );
}

export { StoreFooter };
