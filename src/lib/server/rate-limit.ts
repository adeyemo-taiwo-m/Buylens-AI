type Bucket = { count: number; resetAt: number };

type RateLimitStore = {
  visitors: Map<string, Bucket>;
  overall: Bucket;
};

const globalStore = globalThis as typeof globalThis & { __buylensRateLimit?: RateLimitStore };
const store = globalStore.__buylensRateLimit ?? {
  visitors: new Map<string, Bucket>(),
  overall: { count: 0, resetAt: 0 },
};
globalStore.__buylensRateLimit = store;

const WINDOW_MS = 60 * 60 * 1000;
const VISITOR_LIMIT = 10;
const OVERALL_LIMIT = 60;

function nextBucket(bucket: Bucket, now: number): Bucket {
  return bucket.resetAt <= now ? { count: 0, resetAt: now + WINDOW_MS } : bucket;
}

export function checkAnalyzeRateLimit(visitorId: string) {
  const now = Date.now();
  const visitorBucket = nextBucket(store.visitors.get(visitorId) ?? { count: 0, resetAt: 0 }, now);
  const overallBucket = nextBucket(store.overall, now);

  if (visitorBucket.count >= VISITOR_LIMIT || overallBucket.count >= OVERALL_LIMIT) {
    store.visitors.set(visitorId, visitorBucket);
    store.overall = overallBucket;
    return { allowed: false, retryAfterSeconds: Math.max(1, Math.ceil((visitorBucket.resetAt - now) / 1000)) };
  }

  visitorBucket.count += 1;
  overallBucket.count += 1;
  store.visitors.set(visitorId, visitorBucket);
  store.overall = overallBucket;
  return { allowed: true, retryAfterSeconds: 0 };
}
