type Tenant = {
  id: number;
  name: string;
  slug: string;
};

type Space = {
  id: number;
  tenantId: number;
  name: string;
  slug: string;
  createdAt: string;
};

type BusinessProfile = {
  id: number;
  tenantId: number;
  spaceId: number;
  displayName: string;
  description: string | null;
  contactEmail: string | null;
  phone: string | null;
  website: string | null;
  address: string | null;
  createdAt: string;
  updatedAt: string;
};

type Product = {
  id: number;
  tenantId: number;
  spaceId: number;
  name: string;
  description: string | null;
  priceCents: number;
  currency: string;
  status: string;
  createdAt: string;
  updatedAt: string;
};

type Subscription = {
  id: number;
  tenantId: number;
  plan: string;
  status: string;
  startedAt: string;
  currentPeriodEnd: string | null;
  updatedAt: string;
};

type TenantOverview = {
  tenant: Tenant;
  spaces: Space[];
  businessProfile: BusinessProfile | null;
  subscription: Subscription | null;
};

type RegisterResponse = {
  tenant: Tenant;
  owner: {
    id: number;
    name: string;
    email: string;
    tenantId: number;
  };
  space: Space;
  subscription: Subscription;
  businessProfile: BusinessProfile;
};

type RegisterPayload = {
  name: string;
  email: string;
  tenantName: string;
  tenantSlug: string;
  spaceName?: string;
  plan?: string;
  businessName?: string;
};

type CreateSpacePayload = {
  name: string;
  slug: string;
};

type CreateProductPayload = {
  name: string;
  priceCents: number;
  currency?: string;
  status?: string;
  description?: string;
  spaceId?: number;
};

type BusinessProfilePayload = {
  displayName?: string;
  description?: string;
  contactEmail?: string;
  phone?: string;
  website?: string;
  address?: string;
  spaceId?: number;
};

type SubscriptionPayload = {
  plan?: string;
  status?: string;
  currentPeriodEnd?: string;
};

export type {
  Tenant,
  Space,
  BusinessProfile,
  Product,
  Subscription,
  TenantOverview,
  RegisterResponse,
  RegisterPayload,
  CreateSpacePayload,
  CreateProductPayload,
  BusinessProfilePayload,
  SubscriptionPayload,
};
