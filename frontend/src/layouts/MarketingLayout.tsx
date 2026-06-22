import type { ReactNode } from "react";

import { MarketingFooter } from "@/components/platform/MarketingFooter";
import { MarketingHeader } from "@/components/platform/MarketingHeader";

function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <MarketingHeader />
      <main className="flex-1">{children}</main>
      <MarketingFooter />
    </div>
  );
}

export { MarketingLayout };
