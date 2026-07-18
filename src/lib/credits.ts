import { Redis } from "@upstash/redis";

export const FREE_TRIAL_COOKIE = "tcv_free_used";

const redis = Redis.fromEnv();

function creditKey(email: string): string {
  return `credits:${email.trim().toLowerCase()}`;
}

export async function getCredits(email: string): Promise<number> {
  const value = await redis.get<number>(creditKey(email));
  return value ?? 0;
}

export async function addCredits(email: string, amount: number): Promise<void> {
  await redis.incrby(creditKey(email), amount);
}

/** Returns true and decrements if the email had a credit available. Atomic — safe under concurrent requests. */
export async function tryDecrementCredit(email: string): Promise<boolean> {
  const key = creditKey(email);
  const remaining = await redis.decr(key);
  if (remaining < 0) {
    await redis.incr(key); // revert the decrement, no credit was available
    return false;
  }
  return true;
}
