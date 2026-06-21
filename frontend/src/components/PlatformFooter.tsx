import { Link } from "react-router-dom";

function PlatformFooter() {
  return (
    <footer className="border-t border-border/60 bg-background/80">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 py-10 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-heading text-sm font-semibold">Store2Web</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Everything you need to sell online, beautifully.
          </p>
        </div>
        <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
          <Link to="/register" className="transition-colors hover:text-foreground">
            Get started
          </Link>
          <Link to="/login" className="transition-colors hover:text-foreground">
            Log in
          </Link>
        </div>
      </div>
    </footer>
  );
}

export { PlatformFooter };
