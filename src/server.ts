import "dotenv/config";
import app from "./app";
import { connectMongoDB } from "./config/db";



const env = {
  port: process.env.PORT || 3000,
};

connectMongoDB().then(() => {
app.listen(env.port, () => {
  console.log(`Server running on http://localhost:${env.port}`);
});
});


