# 🧾 Store2Web – Product & Technical Specification

## Version
1.0 (MVP Scope)

## Product Type
Multi-tenant SaaS eCommerce Platform

---

# 📌 1. Overview

**Store2Web** is a SaaS platform that enables businesses to instantly create and manage their own eCommerce store with minimal setup.

Each merchant gets:
- A dedicated storefront (tenant)
- A merchant dashboard
- Customer management capabilities

Customers can:
- Register/login per store
- Purchase products within a specific tenant

---

# 🧱 2. System Architecture

## 2.1 Stack

| Layer        | Technology                |
|-------------|--------------------------|
| Frontend    | React|
| Backend     | Node.js (Express) |
| ORM         | Drizzle ORM              |
| Database    | PostgreSQL               |
| Auth        | JWT + Refresh Tokens     |
| Storage     | AWS S3 (or equivalent)   |
| Cache       | Redis (optional)         |

---

## 2.2 High-Level Components

- Storefront (Customer UI)
- Merchant Dashboard
- Admin Panel
- API Server
- Authentication Service
- Payment Integration Layer

---

# 🧬 3. Multi-Tenancy Design

## Strategy: Shared Database with Tenant Isolation

Each table includes:
- `tenant_id` (UUID)

## Tenant Resolution

- Subdomain-based routing:
```

storename.store2web.com

````

- Middleware extracts tenant:
```ts
const tenant = getTenantFromHost(req.hostname);
````

---

# 👥 4. User Roles

## 4.1 Platform Admin

* Manage all tenants
* Approve/reject store creation
* Handle subscriptions and billing

## 4.2 Merchant

* Manage store (products, orders, customers)
* Customize storefront

## 4.3 Customer

* Register/login per store
* Browse and purchase products

---

# 🚀 5. Core Features

---

## 5.1 Store Creation (Core Feature)

### Flow

1. User submits enquiry
2. Admin approves (or auto-approval)
3. System provisions:

   * Tenant record
   * Subdomain
   * Default configurations
4. Merchant account created

---

## 5.2 Authentication

### Merchant/Admin

* Email + Password
* JWT-based auth
* Refresh tokens

### Customer (Per Tenant)

* Separate auth per store
* Email/password or OTP

---

## 5.3 Merchant Dashboard

### Dashboard Overview

* Revenue summary
* Orders count
* Recent activity

---

### Product Management

* Create / Update / Delete products
* Attributes:

  * Name
  * Description
  * Price
  * SKU
  * Images
* Categories
* Inventory tracking

---

### Order Management

* View all orders
* Status updates:

  * Pending
  * Paid
  * Shipped
  * Delivered
  * Cancelled

---

### Customer Management

* Customer list
* Order history per customer

---

### Store Customization

* Logo upload
* Theme settings
* Homepage banners

---

### Settings

* Store info
* Currency
* Tax configuration

---

## 5.4 Storefront (Customer Side)

### Pages

* Home
* Product listing
* Product details
* Cart
* Checkout
* Authentication
* Order confirmation

### Features

* Search & filtering
* Responsive design
* Product reviews (optional)

---

## 5.5 Checkout System

### Flow

1. Add to cart
2. Enter details
3. Select shipping
4. Payment
5. Order confirmation

### Features

* Coupon support
* Tax calculation
* Guest checkout (optional)

---

## 5.6 Admin Panel

### Tenant Management

* View all stores
* Activate / suspend tenants

### Merchant Management

* View merchants
* Verification (optional)

### Billing

* Subscription plans
* Usage tracking

### Analytics

* Total revenue
* Active tenants
* Orders count

---

# 🗄️ 6. Database Schema (Drizzle ORM)

---

## 6.1 Tenants

```ts
tenants {
  id: uuid (pk)
  name: text
  slug: text (unique)
  domain: text (nullable)
  status: enum ('active', 'suspended')
  createdAt: timestamp
}
```

---

## 6.2 Users (Admins & Merchants)

```ts
users {
  id: uuid (pk)
  tenantId: uuid (nullable)
  email: text
  password: text
  role: enum ('admin', 'merchant')
  createdAt: timestamp
}
```

---

## 6.3 Customers

```ts
customers {
  id: uuid (pk)
  tenantId: uuid
  email: text
  name: text
  password: text
  createdAt: timestamp
}
```

---

## 6.4 Products

```ts
products {
  id: uuid (pk)
  tenantId: uuid
  name: text
  description: text
  price: numeric
  sku: text
  createdAt: timestamp
}
```

---

## 6.5 Product Variants

```ts
product_variants {
  id: uuid (pk)
  productId: uuid
  name: text
  value: text
}
```

---

## 6.6 Orders

```ts
orders {
  id: uuid (pk)
  tenantId: uuid
  customerId: uuid
  totalAmount: numeric
  status: enum ('pending', 'paid', 'shipped', 'delivered', 'cancelled')
  createdAt: timestamp
}
```

---

## 6.7 Order Items

```ts
order_items {
  id: uuid (pk)
  orderId: uuid
  productId: uuid
  quantity: int
  price: numeric
}
```

---

## 6.8 Payments

```ts
payments {
  id: uuid (pk)
  tenantId: uuid
  orderId: uuid
  provider: text
  status: enum ('pending', 'success', 'failed')
  transactionId: text
}
```

---

# 🔌 7. API Design (Sample)

## Auth

```
POST /auth/login
POST /auth/register
POST /auth/refresh
```

## Products

```
GET /products
POST /products
PUT /products/:id
DELETE /products/:id
```

## Orders

```
GET /orders
POST /orders
PUT /orders/:id/status
```

---

# 🔔 8. Notifications

* Email notifications:

  * Order confirmation
  * Payment success
* Merchant alerts

---

# 🛡️ 9. Security

* HTTPS enforced
* JWT authentication
* Role-based access control (RBAC)
* Tenant isolation via `tenant_id`
* Rate limiting

---

# ⚡ 10. Performance & Scalability

* CDN for assets
* Image optimization
* Redis caching
* Horizontal scaling (stateless API)

---

# 💡 11. SaaS Features

* Subscription plans:

  * Free / Pro / Enterprise
* Feature gating per plan
* Trial period support

---

# 🎯 12. MVP Scope

## Included

* Tenant creation
* Product management
* Checkout & orders
* Basic dashboard

## Excluded (Phase 2)

* Advanced analytics
* AI tools
* Multi-language

---

# 📈 13. Future Enhancements

* Mobile apps
* Marketing tools
* Multi-currency
* Custom domain automation

---

# 🧠 14. Key Technical Challenges

* Tenant isolation
* Payment routing per tenant
* Scaling PostgreSQL
* Custom domain + SSL handling

---
