import { getStore } from "@netlify/blobs";

export const FREE_TRIAL_COOKIE = "tcv_free_used";

interface CreditRecord {
  credits: number;
}

function creditsStore() {
  return getStore("credits");
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export async function getCredits(email: string): Promise<number> {
  const store = creditsStore();
  const record = await store.get(normalizeEmail(email), { type: "json" });
  return (record as CreditRecord | null)?.credits ?? 0;
}

export async function addCredits(email: string, amount: number): Promise<void> {
  const store = creditsStore();
  const key = normalizeEmail(email);
  const current = await getCredits(key);
  await store.setJSON(key, { credits: current + amount } satisfies CreditRecord);
}

/** Returns true and decrements if the email had a credit available. */
export async function tryDecrementCredit(email: string): Promise<boolean> {
  const store = creditsStore();
  const key = normalizeEmail(email);
  const current = await getCredits(key);
  if (current <= 0) return false;
  await store.setJSON(key, { credits: current - 1 } satisfies CreditRecord);
  return true;
}
