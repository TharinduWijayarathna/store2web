import { Link } from "react-router-dom";
import {
  ArrowRight,
  SignIn,
  SignOut,
  Storefront,
  UserCircle,
} from "@phosphor-icons/react";

import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PlatformHeaderProps = {
  className?: string;
  tone?: "light" | "dark";
};

function PlatformHeader({ className, tone = "light" }: PlatformHeaderProps) {
  const { user, logoutUser } = useAuth();
  const isDark = tone === "dark";

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b backdrop-blur-md",
        isDark
          ? "border-white/10 bg-slate-950/80 text-white"
          : "border-border/60 bg-background/80",
        className,
      )}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-4">
        <Link to="/" className="group flex items-center gap-3">
          <div
            className={cn(
              "flex size-10 items-center justify-center rounded-xl bg-primary text-sm font-bold text-primary-foreground shadow-sm transition-transform group-hover:scale-105",
            )}
          >
            S2
          </div>
          <div>
            <p className="font-heading text-base font-bold tracking-tight">
              Store2Web
            </p>
            <p
              className={cn(
                "text-xs",
                isDark ? "text-slate-400" : "text-muted-foreground",
              )}
            >
              Commerce made simple
            </p>
          </div>
        </Link>

        <nav className="flex items-center gap-2">
          {user ? (
            <>
              <Button
                variant={isDark ? "outline" : "ghost"}
                size="sm"
                asChild
                className={isDark ? "border-white/15 bg-transparent text-white hover:bg-white/10 hover:text-white" : undefined}
              >
                <Link to="/dashboard">
                  <Storefront />
                  Dashboard
                </Link>
              </Button>
              {user.platformRole === "superadmin" ? (
                <Button
                  variant={isDark ? "outline" : "ghost"}
                  size="sm"
                  asChild
                  className={isDark ? "border-white/15 bg-transparent text-white hover:bg-white/10 hover:text-white" : undefined}
                >
                  <Link to="/superadmin">
                    <UserCircle />
                    Admin
                  </Link>
                </Button>
              ) : null}
              <Button
                size="sm"
                variant={isDark ? "secondary" : "default"}
                onClick={() => void logoutUser()}
              >
                <SignOut />
                Log out
              </Button>
            </>
          ) : (
            <>
              <Button
                variant={isDark ? "outline" : "ghost"}
                size="sm"
                asChild
                className={isDark ? "border-white/15 bg-transparent text-white hover:bg-white/10 hover:text-white" : undefined}
              >
                <Link to="/login">
                  <SignIn />
                  Log in
                </Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/register">
                  Get started
                  <ArrowRight />
                </Link>
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export { PlatformHeader };
