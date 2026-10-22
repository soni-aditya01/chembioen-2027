import mongoose from "mongoose";
import { app } from "./app.js";
import { config } from "./config.js";
import { User } from "./models/User.js";

try {
  await mongoose.connect(config.mongoUri);
  await User.init();
  const host = process.env.HOST || "127.0.0.1";
  const server = app.listen(config.port, host, () => {
    console.log(`ChemBioEN API listening on http://${host}:${config.port}`);
  });

  async function shutdown() {
    server.close(async () => {
      await mongoose.disconnect();
      process.exit(0);
    });
  }

  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
} catch (error) {
  console.error("Unable to start the API. Check MongoDB availability and backend configuration.");
  process.exitCode = 1;
}
