import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import requestIp from "request-ip";
import { connectToDB } from "./db/index";
import { tokenBucketMiddleware } from "./middlewares/token-bucket.middlware";
import { leakyBucketMiddleware } from "./middlewares/leaky-bucket.middleware";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
app.use(requestIp.mw());

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Token Bucket
app.get("/token-bucket", tokenBucketMiddleware, async (req, res) => {
  const data = await mongoose.connection.collection("users").find().toArray();

  return res.status(200).json({
    msg: "Token Bucket",
    data: data,
  });
});

// Leaky Bucket
app.get("/leaky-bucket", leakyBucketMiddleware, async (req, res) => {
  const data = await mongoose.connection.collection("users").find().toArray();

  res.status(200).json({
    msg: "Leaky Bucket",
    data: data,
  });
});

connectToDB(process.env.DB_URL!)
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server connected successfully on port no", PORT);
    });
  })
  .catch((err) => {
    console.error("Error connecting to the database:", err);
    process.exit(1);
  });
