import cors from "cors";
import express from "express";
import swaggerUi from "swagger-ui-express";

import routes from "./routes";
import { requestLogger } from "./middleware/logger";
import { notFound } from "./middleware/notFound";
import { errorHandler } from "./middleware/errorHandler";
import { CORS_ORIGIN } from "./config/env";
import { openApiSpec } from "./docs/openapi";

const app = express();

const normalizedOrigin = CORS_ORIGIN.trim();
const allowedOrigins =
  normalizedOrigin === "*"
    ? "*"
    : normalizedOrigin
        .split(",")
        .map((origin) => origin.trim())
        .filter(Boolean);

app.use(
  cors({
    origin: allowedOrigins === "*" ? "*" : allowedOrigins,
    credentials: allowedOrigins !== "*",
  }),
);
app.use(express.json());
app.use(requestLogger);

app.get("/api/docs.json", (_req, res) => {
  res.json(openApiSpec);
});
app.use(
  "/api/docs",
  swaggerUi.serve,
  swaggerUi.setup(openApiSpec, { explorer: true }),
);

app.use("/api", routes);

app.use(notFound);
app.use(errorHandler);

export { app };
