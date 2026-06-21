import { Link } from "react-router-dom";

import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

function PlatformHeader() {
  const { user, logoutUser } = useAuth();

  return (
    <header className="border-b border-border">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-none border border-border bg-muted text-xs font-semibold">
            S2W
          </div>
          <div>
            <p className="text-sm font-semibold tracking-wide">Store2Web</p>
            <p className="text-xs text-muted-foreground">
              Local stores, online in minutes
            </p>
          </div>
        </Link>
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Button variant="outline" size="sm" asChild>
                <Link to="/dashboard">Dashboard</Link>
              </Button>
              {user.platformRole === "superadmin" ? (
                <Button variant="outline" size="sm" asChild>
                  <Link to="/superadmin">Superadmin</Link>
                </Button>
              ) : null}
              <Button size="sm" onClick={() => void logoutUser()}>
                Log out
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" size="sm" asChild>
                <Link to="/login">Log in</Link>
              </Button>
              <Button size="sm" asChild>
                <Link to="/register">Get started</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export { PlatformHeader };
