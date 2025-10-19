import { Redis } from "@upstash/redis";

// Create a single instance for reuse
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export default redis;



// import Redis from "ioredis";

// declare global {
//   // eslint-disable-next-line no-var
//   var redis: Redis | undefined;
// }

// let redis: Redis;

// if (!globalThis.redis) {
//   redis = new Redis(process.env.REDIS_URL!);
//   globalThis.redis = redis;
// } else {
//   redis = globalThis.redis;
// }

// export default redis;
