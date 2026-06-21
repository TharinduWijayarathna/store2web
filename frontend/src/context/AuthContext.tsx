import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { getMe, login, logout, register } from "@/api";
import type { StoreSummary, User } from "@/api/types";

type AuthContextValue = {
  user: User | null;
  stores: StoreSummary[];
  loading: boolean;
  loginUser: (email: string, password: string) => Promise<void>;
  registerUser: (name: string, email: string, password: string) => Promise<void>;
  logoutUser: () => Promise<void>;
  refresh: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [stores, setStores] = useState<StoreSummary[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const data = await getMe();
      setUser(data.user);
      setStores(data.stores);
    } catch {
      setUser(null);
      setStores([]);
    }
  }, []);

  useEffect(() => {
    refresh().finally(() => setLoading(false));
  }, [refresh]);

  const loginUser = async (email: string, password: string) => {
    const data = await login({ email, password });
    setUser(data.user);
    await refresh();
  };

  const registerUser = async (name: string, email: string, password: string) => {
    const data = await register({ name, email, password });
    setUser(data.user);
    await refresh();
  };

  const logoutUser = async () => {
    await logout();
    setUser(null);
    setStores([]);
  };

  const value = useMemo(
    () => ({
      user,
      stores,
      loading,
      loginUser,
      registerUser,
      logoutUser,
      refresh,
    }),
    [user, stores, loading, refresh],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

export { AuthProvider, useAuth };
