import { apiFetch } from "./client";
import type {
  Category,
  ContentPage,
  Product,
  Store,
  StoreSummary,
} from "./types";

const listStores = () =>
  apiFetch<{ stores: StoreSummary[] }>("/stores");

const createStore = (payload: {
  name: string;
  slug?: string;
  description?: string;
}) =>
  apiFetch<{ store: Store }>("/stores", {
    method: "POST",
    body: JSON.stringify(payload),
  });

const getStore = (storeId: number) =>
  apiFetch<{ store: Store; membership: { role: string } }>(`/stores/${storeId}`);

const updateStore = (
  storeId: number,
  payload: Partial<{
    name: string;
    description: string | null;
    status: string;
    logoUrl: string | null;
  }>,
) =>
  apiFetch<{ store: Store }>(`/stores/${storeId}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });

const listProducts = (storeId: number) =>
  apiFetch<{ products: Product[] }>(`/stores/${storeId}/products`);

const createProduct = (
  storeId: number,
  payload: {
    name: string;
    priceCents: number;
    description?: string;
    status?: string;
  },
) =>
  apiFetch<{ product: Product }>(`/stores/${storeId}/products`, {
    method: "POST",
    body: JSON.stringify(payload),
  });

const listCategories = (storeId: number) =>
  apiFetch<{ categories: Category[] }>(`/stores/${storeId}/categories`);

const listPages = (storeId: number) =>
  apiFetch<{ pages: ContentPage[] }>(`/stores/${storeId}/pages`);

const createPage = (
  storeId: number,
  payload: {
    title: string;
    body?: string;
    type?: string;
    published?: boolean;
  },
) =>
  apiFetch<{ page: ContentPage }>(`/stores/${storeId}/pages`, {
    method: "POST",
    body: JSON.stringify(payload),
  });

export {
  listStores,
  createStore,
  getStore,
  updateStore,
  listProducts,
  createProduct,
  listCategories,
  listPages,
  createPage,
};
