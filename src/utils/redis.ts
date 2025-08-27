import { createClient } from "redis";

const client = createClient()
  .on("error", (err) => console.log("Redis Client Error", err))
  .connect();

export async function createRedisKey(
  key: string,
  value: number,
  expirationInSeconds: number
) {
  return (await client).set(key, value, { EX: expirationInSeconds });
}

export async function getRedisKey(key: string) {
  return (await client).get(key);
}
