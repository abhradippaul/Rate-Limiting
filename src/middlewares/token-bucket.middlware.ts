import { TOKEN_BUCKET_INTERVAL, TOKEN_BUCKET_LIMIT } from "../constants";
import { NextFunction, Request, Response } from "express";
import { createRedisKey, getRedisKey } from "../utils/redis";

export async function tokenBucketMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const isUserExistOnRedis = await getRedisKey(`token-bucket:${req.clientIp}`);

  if (!isUserExistOnRedis) {
    await createRedisKey(
      `token-bucket:${req.clientIp}`,
      1,
      TOKEN_BUCKET_INTERVAL
    );
  } else if (
    isUserExistOnRedis &&
    Number(isUserExistOnRedis) < TOKEN_BUCKET_LIMIT
  ) {
    await createRedisKey(
      `token-bucket:${req.clientIp}`,
      Number(isUserExistOnRedis) + 1,
      TOKEN_BUCKET_INTERVAL
    );
  } else {
    return res.status(429).json({ msg: "Too many requests - Token Bucket" });
  }

  next();
}
