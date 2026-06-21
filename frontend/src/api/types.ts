type User = {
  id: number;
  name: string;
  email: string;
  platformRole: string;
};

type StoreSummary = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  logoUrl: string | null;
  status: string;
  role: string;
  createdAt: string;
};

type Store = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  logoUrl: string | null;
  status: string;
  contactEmail: string | null;
  phone: string | null;
  website: string | null;
  address: string | null;
  createdAt: string;
  updatedAt: string;
};

type Product = {
  id: number;
  storeId: number;
  name: string;
  slug: string;
  description: string | null;
  priceCents: number;
  currency: string;
  status: string;
  metadata: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
};

type Category = {
  id: number;
  storeId: number;
  name: string;
  slug: string;
  parentId: number | null;
  sortOrder: number;
  createdAt: string;
};

type ContentPage = {
  id: number;
  storeId: number;
  title: string;
  slug: string;
  body: string | null;
  type: string;
  published: string;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
};

type MeResponse = {
  user: User;
  stores: StoreSummary[];
};

export type {
  User,
  StoreSummary,
  Store,
  Product,
  Category,
  ContentPage,
  MeResponse,
};
