import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type PlatformLayoutProps = {
  children: ReactNode;
  className?: string;
  variant?: "default" | "gradient";
};

function PlatformLayout({
  children,
  className,
  variant = "default",
}: PlatformLayoutProps) {
  return (
    <div
      className={cn(
        "min-h-screen text-foreground",
        variant === "gradient" ? "surface-gradient" : "bg-background",
        className,
      )}
    >
      {children}
    </div>
  );
}

export { PlatformLayout };
