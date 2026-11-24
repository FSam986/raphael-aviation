import "server-only";
import { createHash } from "node:crypto";

// PayFast (South Africa) once-off payments.
// Env: PAYFAST_MERCHANT_ID, PAYFAST_MERCHANT_KEY, PAYFAST_PASSPHRASE,
//      PAYFAST_SANDBOX ("true" while testing), NEXT_PUBLIC_SITE_URL.

export const payfastConfigured = () => !!(process.env.PAYFAST_MERCHANT_ID && process.env.PAYFAST_MERCHANT_KEY);
const sandbox = () => process.env.PAYFAST_SANDBOX === "true";
export const payfastHost = () => (sandbox() ? "https://sandbox.payfast.co.za" : "https://www.payfast.co.za");

// PayFast signs PHP-urlencoded values: spaces as "+", uppercase hex.
const enc = (v: string) =>
  encodeURIComponent(v.trim()).replace(/%20/g, "+").replace(/[!'()*~]/g, (c) => "%" + c.charCodeAt(0).toString(16).toUpperCase());

/** MD5 signature over fields in the given order (empty values skipped), plus the passphrase. */
export function signature(fields: [string, string][]): string {
  let s = fields.filter(([, v]) => v !== "").map(([k, v]) => `${k}=${enc(v)}`).join("&");
  const pass = process.env.PAYFAST_PASSPHRASE;
  if (pass) s += `&passphrase=${enc(pass)}`;
  return createHash("md5").update(s).digest("hex");
}

/** Checkout form fields, in PayFast's required order, with signature. */
export function checkoutFields(o: { paymentId: string; amount: number; itemName: string; email?: string; site: string }): [string, string][] {
  const fields: [string, string][] = [
    ["merchant_id", process.env.PAYFAST_MERCHANT_ID!],
    ["merchant_key", process.env.PAYFAST_MERCHANT_KEY!],
    ["return_url", `${o.site}/checkout/return?ref=${o.paymentId}`],
    ["cancel_url", `${o.site}/pricing?cancelled=1`],
    ["notify_url", `${o.site}/api/payfast/notify`],
    ["email_address", o.email ?? ""],
    ["m_payment_id", o.paymentId],
    ["amount", o.amount.toFixed(2)],
    ["item_name", o.itemName],
  ];
  return [...fields.filter(([, v]) => v !== ""), ["signature", signature(fields)]];
}

/** Ask PayFast to confirm a notification really came from them. */
export async function validateWithPayfast(body: string): Promise<boolean> {
  const r = await fetch(`${payfastHost()}/eng/query/validate`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });
  return (await r.text()).trim() === "VALID";
}
