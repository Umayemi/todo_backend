import { MongoClient,Db } from "mongodb";
const uri = process.env.MONGODB_URI as string
const client = new MongoClient(uri);
let db:Db;

export const connectMongoDB = async () => {
  try {
    await client.connect();
    db = client.db('todo_app');
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export const getDB = () => {
    if (!db) {
    throw new Error("MongoDB connection not established.");
  }
  return db;
};


