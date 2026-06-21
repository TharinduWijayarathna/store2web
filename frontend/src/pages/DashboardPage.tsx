import { Link, Navigate } from "react-router-dom";

import { PlatformHeader } from "@/components/PlatformHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";

function DashboardPage() {
  const { user, stores, loading } = useAuth();

  if (loading) {
    return <p className="p-8 text-sm text-muted-foreground">Loading...</p>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-background">
      <PlatformHeader />
      <main className="mx-auto max-w-6xl px-6 py-10">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Your stores</h1>
            <p className="text-sm text-muted-foreground">
              Welcome back, {user.name}
            </p>
          </div>
          <Button asChild>
            <Link to="/stores/new">Create store</Link>
          </Button>
        </div>

        {stores.length === 0 ? (
          <Card className="mt-8">
            <CardContent className="py-10 text-center text-sm text-muted-foreground">
              No stores yet. Create your first store to get started.
            </CardContent>
          </Card>
        ) : (
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {stores.map((store) => (
              <Card key={store.id}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-lg">{store.name}</CardTitle>
                    <Badge variant="outline">{store.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <p className="text-muted-foreground">/{store.slug}</p>
                  <div className="flex flex-wrap gap-2">
                    <Button size="sm" asChild>
                      <Link to={`/stores/${store.id}`}>Manage</Link>
                    </Button>
                    <Button size="sm" variant="outline" asChild>
                      <Link to={`/s/${store.slug}`} target="_blank">
                        View storefront
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default DashboardPage;
