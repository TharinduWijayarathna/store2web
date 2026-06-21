import { apiFetch } from "./client";
import type { Category, ContentPage, Product, Store } from "./types";

const getPublicStore = (slug: string) =>
  apiFetch<{ store: Pick<Store, "name" | "slug" | "description" | "logoUrl"> }>(
    `/public/stores/${slug}`,
  );

const getPublicProducts = (slug: string) =>
  apiFetch<{ products: Product[] }>(`/public/stores/${slug}/products`);

const getPublicProduct = (slug: string, productSlug: string) =>
  apiFetch<{ product: Product }>(
    `/public/stores/${slug}/products/${productSlug}`,
  );

const getPublicCategories = (slug: string) =>
  apiFetch<{ categories: Category[] }>(`/public/stores/${slug}/categories`);

const getPublicPages = (slug: string) =>
  apiFetch<{ pages: ContentPage[] }>(`/public/stores/${slug}/pages`);

export {
  getPublicStore,
  getPublicProducts,
  getPublicProduct,
  getPublicCategories,
  getPublicPages,
};
