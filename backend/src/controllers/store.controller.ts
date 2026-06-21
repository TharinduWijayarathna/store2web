import { Request, Response } from "express";
import { z } from "zod";

import {
  createStore,
  getStoreMembership,
  listStoresForUser,
  updateStore,
} from "../services/store.service";

const createStoreSchema = z.object({
  name: z.string().trim().min(1).max(255),
  slug: z.string().trim().max(120).optional(),
  description: z.string().trim().max(5000).optional(),
});

const updateStoreSchema = z.object({
  name: z.string().trim().min(1).max(255).optional(),
  description: z.string().trim().max(5000).nullable().optional(),
  logoUrl: z.string().trim().max(512).nullable().optional(),
  status: z.enum(["draft", "published", "suspended"]).optional(),
  contactEmail: z.string().trim().email().nullable().optional(),
  phone: z.string().trim().max(40).nullable().optional(),
  website: z.string().trim().max(255).nullable().optional(),
  address: z.string().trim().max(5000).nullable().optional(),
});

const listStores = async (req: Request, res: Response) => {
  const stores = await listStoresForUser(req.user!.id);
  res.status(200).json({ stores });
};

const createStoreHandler = async (req: Request, res: Response) => {
  const body = createStoreSchema.parse(req.body);
  const store = await createStore(req.user!.id, body);
  res.status(201).json({ store });
};

const getStore = async (req: Request, res: Response) => {
  const storeId = Number.parseInt(String(req.params.storeId), 10);
  const result = await getStoreMembership(storeId, req.user!.id);

  res.status(200).json({
    store: result!.store,
    membership: { role: result!.membership.role },
  });
};

const updateStoreHandler = async (req: Request, res: Response) => {
  const body = updateStoreSchema.parse(req.body);
  const store = await updateStore(req.store!.id, body);
  res.status(200).json({ store });
};

export { listStores, createStoreHandler, getStore, updateStoreHandler };
