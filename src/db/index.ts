import mongoose from "mongoose";

export async function connectToDB(dbUrl: string) {
  try {
    return await mongoose.connect(dbUrl, {
      dbName: process.env.DB_NAME,
    });
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
}
