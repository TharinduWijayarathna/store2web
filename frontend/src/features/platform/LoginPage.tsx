import { type FormEvent, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";

import { AuthPageLayout } from "@/layouts/AuthPageLayout";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function LoginPage() {
  const { user, loginUser } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (user) return <Navigate to="/dashboard" replace />;

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await loginUser(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign in failed.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthPageLayout
      title="Welcome back"
      subtitle="Sign in to manage your stores and products."
    >
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error ? (
          <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error}
          </p>
        ) : null}
        <Button type="submit" className="w-full" size="lg" disabled={submitting}>
          {submitting ? "Signing in..." : "Sign in"}
        </Button>
        <p className="text-center text-sm text-muted-foreground">
          No account?{" "}
          <Link to="/register" className="font-medium text-primary hover:underline">
            Create one free
          </Link>
        </p>
      </form>
    </AuthPageLayout>
  );
}

export default LoginPage;
