import { apiFetch } from "./client";
import { API_ROUTES } from "./routes";
import type {
  BusinessProfile,
  BusinessProfilePayload,
  CreateProductPayload,
  CreateSpacePayload,
  Product,
  RegisterPayload,
  RegisterResponse,
  Space,
  Subscription,
  SubscriptionPayload,
  TenantOverview,
} from "./types";

const registerTenant = (payload: RegisterPayload) =>
  apiFetch<RegisterResponse>(API_ROUTES.register, {
    method: "POST",
    body: JSON.stringify(payload),
    skipTenant: true,
  });

const getTenantOverview = () => apiFetch<TenantOverview>(API_ROUTES.tenant);

const listSpaces = () =>
  apiFetch<{ spaces: Space[] }>(API_ROUTES.spaces);

const createSpace = (payload: CreateSpacePayload) =>
  apiFetch(API_ROUTES.spaces, {
    method: "POST",
    body: JSON.stringify(payload),
  });

const listProducts = () =>
  apiFetch<{ products: Product[] }>(API_ROUTES.products);

const createProduct = (payload: CreateProductPayload) =>
  apiFetch<Product>(API_ROUTES.products, {
    method: "POST",
    body: JSON.stringify(payload),
  });

const getBusinessProfile = () =>
  apiFetch<BusinessProfile>(API_ROUTES.business);

const updateBusinessProfile = (payload: BusinessProfilePayload) =>
  apiFetch<BusinessProfile>(API_ROUTES.business, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });

const getSubscription = () =>
  apiFetch<Subscription>(API_ROUTES.subscription);

const updateSubscription = (payload: SubscriptionPayload) =>
  apiFetch<Subscription>(API_ROUTES.subscription, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });

export {
  registerTenant,
  getTenantOverview,
  listSpaces,
  createSpace,
  listProducts,
  createProduct,
  getBusinessProfile,
  updateBusinessProfile,
  getSubscription,
  updateSubscription,
};
