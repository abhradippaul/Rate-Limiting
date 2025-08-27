import { NextFunction, Request, Response } from "express";
import { createRedisKey, getRedisKey } from "utils/redis";

export async function tokenBucketMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const isUserExistOnRedis = await getRedisKey(`token-bucket:${req.clientIp}`);

  if (!isUserExistOnRedis) {
    await createRedisKey(`token-bucket:${req.clientIp}`, 1, 60);
  } else if (isUserExistOnRedis && Number(isUserExistOnRedis) < 5) {
    await createRedisKey(
      `token-bucket:${req.clientIp}`,
      Number(isUserExistOnRedis) + 1,
      60
    );
  } else {
    return res.status(429).json({ msg: "Too many requests - Token Bucket" });
  }

  next();
}
