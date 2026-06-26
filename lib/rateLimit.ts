/**
 * lib/rateLimit.ts
 *
 * Dual-mode rate limiter:
 *   - Production (Vercel): uses Upstash Redis — durable across cold starts,
 *     instances, and deployments. Requires UPSTASH_REDIS_KV_REST_API_URL and
 *     UPSTASH_REDIS_KV_REST_API_TOKEN env vars (set once in Vercel dashboard).
 *   - Development / CI (no env vars): falls back to an in-memory Map —
 *     identical behaviour to the old code, zero config needed locally.
 *
 * Usage:
 *   const limited = await isRateLimited(ip, "submit-review", 5, 10 * 60);
 */

type RateLimitResult = { limited: boolean; remaining: number };

// ── In-memory fallback (dev / CI) ──────────────────────────────────────────
const memStore = new Map<string, number[]>();

function memRateLimit(
  key: string,
  max: number,
  windowSec: number
): RateLimitResult {
  const now = Date.now();
  const windowMs = windowSec * 1000;
  const timestamps = (memStore.get(key) || []).filter(
    (t) => now - t < windowMs
  );
  timestamps.push(now);
  memStore.set(key, timestamps);
  const limited = timestamps.length > max;
  return { limited, remaining: Math.max(0, max - timestamps.length) };
}

// ── Upstash Redis (production) ─────────────────────────────────────────────
async function redisRateLimit(
  key: string,
  max: number,
  windowSec: number
): Promise<RateLimitResult> {
  const { Redis } = await import("@upstash/redis");
  const redis = new Redis({
    url: process.env.UPSTASH_REDIS_KV_REST_API_URL!,
    token: process.env.UPSTASH_REDIS_KV_REST_API_TOKEN!,
  });

  const redisKey = `rl:${key}`;
  const count = await redis.incr(redisKey);
  // Set TTL only on the first increment so the window resets cleanly
  if (count === 1) await redis.expire(redisKey, windowSec);

  const limited = count > max;
  return { limited, remaining: Math.max(0, max - count) };
}

// ── Public API ─────────────────────────────────────────────────────────────
/**
 * @param ip        - The client IP (from x-forwarded-for / x-real-ip)
 * @param action    - A short label to namespace the key, e.g. "submit-review"
 * @param max       - Max allowed requests per window
 * @param windowSec - Window length in seconds
 */
export async function isRateLimited(
  ip: string,
  action: string,
  max: number,
  windowSec: number
): Promise<boolean> {
  const key = `${action}:${ip}`;
  const useRedis =
    !!process.env.UPSTASH_REDIS_KV_REST_API_URL &&
    !!process.env.UPSTASH_REDIS_KV_REST_API_TOKEN;

  try {
    const result = useRedis
      ? await redisRateLimit(key, max, windowSec)
      : memRateLimit(key, max, windowSec);
    return result.limited;
  } catch (err) {
    // Redis unavailable — fail open (don't block legitimate users)
    console.error("Rate limiter error, failing open:", err);
    return false;
  }
}