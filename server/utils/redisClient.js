import { createClient } from "redis";

let redisClient = null;

export async function initRedis() {
  try {
    const client = createClient({
      url: process.env.REDIS_URL ,
      socket: { reconnectStrategy: false } // disables automatic retry to avoid AggregateError
    });

    client.on("error", (err) => {
      console.warn("Redis runtime error:", err.message);
    });

    await client.connect();
    console.log("✅ Redis connected successfully");

    redisClient = client;
  } catch (err) {
    console.warn(
      "Redis connection failed. App will continue without caching.",
      err.message
    );
    redisClient = null;
  }
}

// Returns latest Redis client (or null if not connected)
export function getRedisClient() {
  return redisClient;
}

// Initialize immediately
await initRedis();
