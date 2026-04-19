import express from "express";

import routes from "./routes";
import { requestLogger } from "./middleware/logger";
import { notFound } from "./middleware/notFound";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

app.use(express.json());
app.use(requestLogger);

app.use("/api", routes);

app.use(notFound);
app.use(errorHandler);

export { app };
