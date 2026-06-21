import { app } from "./app";
import { PORT } from "./config/env";
import { bootstrapSuperadmin } from "./db/seed";

const start = async () => {
  await bootstrapSuperadmin();
  app.listen(PORT, () => {
    console.log(`API listening on http://localhost:${PORT}`);
  });
};

void start();
