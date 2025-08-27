import { NextFunction, Request, Response } from "express";

export async function leakyBucketMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Leaky Bucket Logic
  next();
}
