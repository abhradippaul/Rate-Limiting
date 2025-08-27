import { NextFunction, Request, Response } from "express";
import { leakyBucket } from "../utils/leakybucket";

export async function leakyBucketMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!leakyBucket.addRequest()) {
    setTimeout(() => {
      next();
    }, 5000);
  } else {
    next();
  }
}
