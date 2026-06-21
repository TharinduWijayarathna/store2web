import { desc, eq } from "drizzle-orm";
import { Request, Response } from "express";

import { db } from "../db";
import { subscriptions } from "../db/schema";

const getSubscription = async (req: Request, res: Response) => {
  const tenant = req.tenant;

  if (!tenant) {
    res.status(400).json({ error: "Tenant context is missing." });
    return;
  }

  const [subscription] = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.tenantId, tenant.id))
    .orderBy(desc(subscriptions.id))
    .limit(1);

  if (!subscription) {
    res.status(404).json({ error: "Subscription not found." });
    return;
  }

  res.status(200).json(subscription);
};

const updateSubscription = async (req: Request, res: Response) => {
  const tenant = req.tenant;

  if (!tenant) {
    res.status(400).json({ error: "Tenant context is missing." });
    return;
  }

  const body = req.body as {
    plan?: string;
    status?: string;
    currentPeriodEnd?: string;
  };

  const plan = typeof body.plan === "string" ? body.plan.trim() : undefined;
  const status =
    typeof body.status === "string" ? body.status.trim() : undefined;
  const currentPeriodEnd =
    typeof body.currentPeriodEnd === "string"
      ? new Date(body.currentPeriodEnd)
      : undefined;

  const hasUpdates =
    plan !== undefined ||
    status !== undefined ||
    (currentPeriodEnd instanceof Date &&
      !Number.isNaN(currentPeriodEnd.getTime()));

  if (!hasUpdates) {
    res
      .status(400)
      .json({ error: "Provide at least one field to update." });
    return;
  }

  const [current] = await db
    .select()
    .from(subscriptions)
    .where(eq(subscriptions.tenantId, tenant.id))
    .orderBy(desc(subscriptions.id))
    .limit(1);

  if (!current) {
    res.status(404).json({ error: "Subscription not found." });
    return;
  }

  const [updated] = await db
    .update(subscriptions)
    .set({
      plan: plan ?? current.plan,
      status: status ?? current.status,
      currentPeriodEnd:
        currentPeriodEnd instanceof Date &&
        !Number.isNaN(currentPeriodEnd.getTime())
          ? currentPeriodEnd
          : current.currentPeriodEnd,
      updatedAt: new Date(),
    })
    .where(eq(subscriptions.id, current.id))
    .returning();

  res.status(200).json(updated);
};

export { getSubscription, updateSubscription };
