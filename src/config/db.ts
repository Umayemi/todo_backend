import { Db, MongoClient } from "mongodb";

let db: Db;

export const connectMongoDB = async () => {
  const uri = process.env.MONGODB_URI?.trim();

  if (!uri) {
    throw new Error("MONGODB_URI is not set.");
  }

  const client = new MongoClient(uri);

  try {
    await client.connect();
    db = client.db("todo_app");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    throw error;
  }
};

export const getDB = () => {
  if (!db) {
    throw new Error("MongoDB connection not established.");
  }

  return db;
};

