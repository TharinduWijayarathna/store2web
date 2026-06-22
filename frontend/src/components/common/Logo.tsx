import { Link } from "react-router-dom";

import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  showText?: boolean;
  to?: string;
  variant?: "default" | "light";
};

function Logo({
  className,
  showText = true,
  to = "/",
  variant = "default",
}: LogoProps) {
  return (
    <Link to={to} className={cn("group inline-flex items-center gap-2.5", className)}>
      <span className="flex size-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 text-sm font-bold text-white shadow-md shadow-indigo-500/30 transition-transform group-hover:scale-105">
        S2
      </span>
      {showText ? (
        <span
          className={cn(
            "font-display text-lg font-bold tracking-tight",
            variant === "light" ? "text-white" : "text-slate-900",
          )}
        >
          Store2Web
        </span>
      ) : null}
    </Link>
  );
}

export { Logo };
