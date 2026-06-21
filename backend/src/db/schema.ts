import {
  integer,
  jsonb,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
  varchar,
} from "drizzle-orm/pg-core";

const users = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    passwordHash: varchar("password_hash", { length: 255 }).notNull(),
    platformRole: varchar("platform_role", { length: 32 })
      .notNull()
      .default("user"),
    disabledAt: timestamp("disabled_at", { withTimezone: false }),
    createdAt: timestamp("created_at", { withTimezone: false })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    emailIdx: uniqueIndex("users_email_idx").on(table.email),
  }),
);

const stores = pgTable(
  "stores",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 120 }).notNull(),
    description: text("description"),
    logoUrl: varchar("logo_url", { length: 512 }),
    status: varchar("status", { length: 32 }).notNull().default("draft"),
    contactEmail: varchar("contact_email", { length: 255 }),
    phone: varchar("phone", { length: 40 }),
    website: varchar("website", { length: 255 }),
    address: text("address"),
    deletedAt: timestamp("deleted_at", { withTimezone: false }),
    createdAt: timestamp("created_at", { withTimezone: false })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: false })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    slugIdx: uniqueIndex("stores_slug_idx").on(table.slug),
  }),
);

const storeMemberships = pgTable(
  "store_memberships",
  {
    id: serial("id").primaryKey(),
    storeId: integer("store_id")
      .notNull()
      .references(() => stores.id, { onDelete: "cascade" }),
    userId: integer("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    role: varchar("role", { length: 32 }).notNull().default("owner"),
    createdAt: timestamp("created_at", { withTimezone: false })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    storeUserIdx: uniqueIndex("store_memberships_store_user_idx").on(
      table.storeId,
      table.userId,
    ),
  }),
);

const categories = pgTable(
  "categories",
  {
    id: serial("id").primaryKey(),
    storeId: integer("store_id")
      .notNull()
      .references(() => stores.id, { onDelete: "cascade" }),
    name: varchar("name", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 120 }).notNull(),
    parentId: integer("parent_id"),
    sortOrder: integer("sort_order").notNull().default(0),
    createdAt: timestamp("created_at", { withTimezone: false })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    storeSlugIdx: uniqueIndex("categories_store_slug_idx").on(
      table.storeId,
      table.slug,
    ),
  }),
);

const products = pgTable(
  "products",
  {
    id: serial("id").primaryKey(),
    storeId: integer("store_id")
      .notNull()
      .references(() => stores.id, { onDelete: "cascade" }),
    name: varchar("name", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 120 }).notNull(),
    description: text("description"),
    priceCents: integer("price_cents").notNull(),
    currency: varchar("currency", { length: 8 }).notNull().default("USD"),
    status: varchar("status", { length: 32 }).notNull().default("draft"),
    metadata: jsonb("metadata").$type<Record<string, unknown>>().default({}),
    createdAt: timestamp("created_at", { withTimezone: false })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: false })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    storeSlugIdx: uniqueIndex("products_store_slug_idx").on(
      table.storeId,
      table.slug,
    ),
  }),
);

const productCategories = pgTable(
  "product_categories",
  {
    id: serial("id").primaryKey(),
    productId: integer("product_id")
      .notNull()
      .references(() => products.id, { onDelete: "cascade" }),
    categoryId: integer("category_id")
      .notNull()
      .references(() => categories.id, { onDelete: "cascade" }),
  },
  (table) => ({
    productCategoryIdx: uniqueIndex("product_categories_product_category_idx").on(
      table.productId,
      table.categoryId,
    ),
  }),
);

const pages = pgTable(
  "pages",
  {
    id: serial("id").primaryKey(),
    storeId: integer("store_id")
      .notNull()
      .references(() => stores.id, { onDelete: "cascade" }),
    title: varchar("title", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 120 }).notNull(),
    body: text("body"),
    type: varchar("type", { length: 32 }).notNull().default("custom"),
    published: varchar("published", { length: 8 }).notNull().default("false"),
    sortOrder: integer("sort_order").notNull().default(0),
    createdAt: timestamp("created_at", { withTimezone: false })
      .notNull()
      .defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: false })
      .notNull()
      .defaultNow(),
  },
  (table) => ({
    storeSlugIdx: uniqueIndex("pages_store_slug_idx").on(
      table.storeId,
      table.slug,
    ),
  }),
);

const adminAuditLogs = pgTable("admin_audit_logs", {
  id: serial("id").primaryKey(),
  actorUserId: integer("actor_user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  action: varchar("action", { length: 80 }).notNull(),
  resourceType: varchar("resource_type", { length: 80 }).notNull(),
  resourceId: integer("resource_id").notNull(),
  metadata: jsonb("metadata").$type<Record<string, unknown>>().default({}),
  createdAt: timestamp("created_at", { withTimezone: false })
    .notNull()
    .defaultNow(),
});

export {
  users,
  stores,
  storeMemberships,
  categories,
  products,
  productCategories,
  pages,
  adminAuditLogs,
};
