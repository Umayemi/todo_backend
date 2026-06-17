import "dotenv/config";
import app from "./app";
import { connectMongoDB } from "./config/db";

const env = {
  port: process.env.PORT || 3000,
};

const startServer = async () => {
  await connectMongoDB();

  app.listen(env.port, () => {
    console.log(`Server running on http://localhost:${env.port}`);
  });
};

startServer().catch((error) => {
  console.error("Application startup failed:", error);
  process.exit(1);
});

