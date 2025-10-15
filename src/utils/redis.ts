import { createClient } from "redis";

const client = createClient({
  socket: {
    host: "192.168.1.254",
    port: 6379,
  },
})
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
