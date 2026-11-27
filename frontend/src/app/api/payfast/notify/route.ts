// PayFast Instant Transaction Notification. Grants access only when ALL hold:
// signature valid, PayFast confirms the data, amount matches our pending payment,
// and the payment is COMPLETE. Idempotent: a repeat notification does nothing.
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { signature, validateWithPayfast } from "@/lib/payfast";
import { getPlan } from "@/app/lib/plans";
import type { CourseId } from "@/app/lib/course";

export const dynamic = "force-dynamic";
const ALL: CourseId[] = ["cpl", "ppl", "ir", "nr", "gr"];

export async function POST(req: Request) {
  const raw = await req.text();
  const pairs = [...new URLSearchParams(raw).entries()];
  const data = Object.fromEntries(pairs);
  const unsigned = pairs.filter(([k]) => k !== "signature");

  if (signature(unsigned) !== data.signature) return new Response("bad signature", { status: 400 });
  const paramString = raw.split("&signature=")[0];
  if (!(await validateWithPayfast(paramString))) return new Response("not valid", { status: 400 });

  const admin = supabaseAdmin();
  const { data: payment } = await admin.from("payments").select("*").eq("id", data.m_payment_id).maybeSingle();
  if (!payment) return new Response("unknown payment", { status: 404 });
  if (payment.status !== "pending") return new Response("ok"); // already handled

  const plan = getPlan(payment.plan_id);
  const paid = Number(data.amount_gross);
  if (!plan || Math.abs(paid - Number(payment.amount)) > 0.01) {
    await admin.from("payments").update({ status: "failed", raw: data }).eq("id", payment.id);
    return new Response("amount mismatch", { status: 400 });
  }

  if (data.payment_status !== "COMPLETE") {
    await admin.from("payments").update({ status: data.payment_status === "CANCELLED" ? "cancelled" : "failed", raw: data }).eq("id", payment.id);
    return new Response("ok");
  }

  // Claim it atomically so two simultaneous notifications can't both grant.
  const { data: claimed } = await admin.from("payments").update({ status: "processing" }).eq("id", payment.id).eq("status", "pending").select("id");
  if (!claimed?.length) return new Response("ok");

  for (const course of plan.course === "all" ? ALL : [plan.course]) {
    const { error } = await admin.rpc("grant_entitlement", { p_user: payment.user_id, p_course: course, p_tier: plan.tier, p_months: plan.months });
    if (error) {
      await admin.from("payments").update({ status: "pending" }).eq("id", payment.id); // let PayFast's retry try again
      return new Response("grant failed", { status: 500 });
    }
  }
  await admin.from("payments").update({ status: "complete", provider_ref: data.pf_payment_id ?? null, raw: data, completed_at: new Date().toISOString() }).eq("id", payment.id);
  return new Response("ok");
}
