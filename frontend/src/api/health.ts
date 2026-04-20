import { apiFetch } from "./client";
import { API_ROUTES } from "./routes";

type HealthResponse = {
  status: string;
  uptime: number;
  timestamp: string;
};

const getHealth = () =>
  apiFetch<HealthResponse>(API_ROUTES.health, { skipTenant: true });

export { getHealth };
