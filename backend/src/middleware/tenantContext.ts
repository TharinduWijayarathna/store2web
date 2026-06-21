import { NextFunction, Request, Response } from "express";

import {
  DEFAULT_TENANT_SLUG,
  TENANT_DOMAIN,
  TENANT_HEADER_NAME,
} from "../config/env";
import { asyncHandler } from "../utils/asyncHandler";
import { getTenantBySlug } from "../utils/tenant";

const resolveTenantFromHost = (hostname: string) => {
  if (!TENANT_DOMAIN) {
    return "";
  }

  const suffix = `.${TENANT_DOMAIN}`;
  if (!hostname.endsWith(suffix)) {
    return "";
  }

  const slug = hostname.slice(0, -suffix.length);
  return slug;
};

const tenantContext = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const headerName = TENANT_HEADER_NAME.toLowerCase();
    const headerValue = req.headers[headerName];
    let tenantSlug =
      typeof headerValue === "string" ? headerValue.trim() : "";

    if (!tenantSlug) {
      tenantSlug = resolveTenantFromHost(req.hostname);
    }

    if (!tenantSlug && DEFAULT_TENANT_SLUG) {
      tenantSlug = DEFAULT_TENANT_SLUG;
    }

    if (!tenantSlug) {
      res.status(400).json({
        error: "Missing tenant identifier.",
      });
      return;
    }

    const tenant = await getTenantBySlug(tenantSlug);
    if (!tenant) {
      res.status(404).json({ error: "Tenant not found." });
      return;
    }

    req.tenant = {
      id: tenant.id,
      name: tenant.name,
      slug: tenant.slug,
    };

    next();
  },
);

export { tenantContext };
