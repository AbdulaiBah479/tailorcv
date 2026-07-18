import { NextResponse } from "next/server";
import { addCredits } from "@/lib/credits";

function getProductCreditMap(): Record<string, number> {
  try {
    return JSON.parse(process.env.GUMROAD_PRODUCT_MAP ?? "{}");
  } catch {
    return {};
  }
}

export async function POST(request: Request) {
  const form = await request.formData().catch(() => null);
  if (!form) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const sellerId = form.get("seller_id")?.toString();
  const expectedSellerId = process.env.GUMROAD_SELLER_ID;
  if (expectedSellerId && sellerId !== expectedSellerId) {
    return NextResponse.json({ error: "Seller mismatch" }, { status: 403 });
  }

  const email = form.get("email")?.toString();
  const permalink = form.get("product_permalink")?.toString();

  if (!email || !permalink) {
    return NextResponse.json({ error: "Missing email or product" }, { status: 400 });
  }

  const creditMap = getProductCreditMap();
  const creditsToAdd = creditMap[permalink];

  if (!creditsToAdd) {
    console.warn(`No credit mapping for product permalink: ${permalink}`);
    return NextResponse.json({ error: "Unknown product" }, { status: 400 });
  }

  await addCredits(email, creditsToAdd);

  return NextResponse.json({ ok: true });
}
