import type { ReactNode } from "react";

import { PlatformFooter } from "@/components/PlatformFooter";
import { PlatformHeader } from "@/components/PlatformHeader";
import { PlatformLayout } from "@/components/PlatformLayout";
import { cn } from "@/lib/utils";

type AppShellProps = {
  children: ReactNode;
  className?: string;
  mainClassName?: string;
  showFooter?: boolean;
  variant?: "default" | "gradient";
};

function AppShell({
  children,
  className,
  mainClassName,
  showFooter = true,
  variant = "default",
}: AppShellProps) {
  return (
    <PlatformLayout variant={variant} className={className}>
      <PlatformHeader />
      <main className={cn("mx-auto w-full max-w-6xl px-6", mainClassName)}>
        {children}
      </main>
      {showFooter ? <PlatformFooter /> : null}
    </PlatformLayout>
  );
}

export { AppShell };
