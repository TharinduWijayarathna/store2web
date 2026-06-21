import { Request, Response } from "express";
import { z } from "zod";

import {
  getDashboardStats,
  listAllStores,
  softDeleteStore,
  updateStoreAsSuperadmin,
} from "../services/superadmin.service";

const updateStoreSchema = z.object({
  status: z.enum(["draft", "published", "suspended"]),
});

const getDashboard = async (_req: Request, res: Response) => {
  const stats = await getDashboardStats();
  res.status(200).json(stats);
};

const listStores = async (req: Request, res: Response) => {
  const q = typeof req.query.q === "string" ? req.query.q : undefined;
  const stores = await listAllStores(q);
  res.status(200).json({ stores });
};

const updateStore = async (req: Request, res: Response) => {
  const storeId = Number.parseInt(String(req.params.storeId), 10);
  const body = updateStoreSchema.parse(req.body);
  const store = await updateStoreAsSuperadmin(req.user!.id, storeId, body);
  res.status(200).json({ store });
};

const deleteStore = async (req: Request, res: Response) => {
  const storeId = Number.parseInt(String(req.params.storeId), 10);
  const store = await softDeleteStore(req.user!.id, storeId);
  res.status(200).json({ store });
};

export { getDashboard, listStores, updateStore, deleteStore };
