import { Link } from "react-router-dom";
import { ArrowRight, SignIn } from "@phosphor-icons/react";

import { Logo } from "@/components/common/Logo";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

function MarketingHeader() {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-lg">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Logo />
        <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
          <a href="#features" className="transition-colors hover:text-indigo-600">
            Features
          </a>
          <a href="#how-it-works" className="transition-colors hover:text-indigo-600">
            How it works
          </a>
          <a href="#pricing" className="transition-colors hover:text-indigo-600">
            Pricing
          </a>
        </nav>
        <div className="flex items-center gap-2">
          {user ? (
            <Button className="gradient-primary border-0" asChild>
              <Link to="/dashboard">Go to dashboard</Link>
            </Button>
          ) : (
            <>
              <Button variant="ghost" size="sm" asChild className="hidden text-slate-600 sm:inline-flex">
                <Link to="/login">
                  <SignIn />
                  Sign in
                </Link>
              </Button>
              <Button size="sm" className="gradient-primary border-0 shadow-md shadow-indigo-500/20" asChild>
                <Link to="/register">
                  Start selling
                  <ArrowRight />
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export { MarketingHeader };
