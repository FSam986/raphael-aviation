// Start a PayFast checkout for a catalogue plan. The client sends its Supabase
// access token; we record a pending payment and return the signed form fields.
import { randomUUID } from "node:crypto";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { checkoutFields, payfastConfigured, payfastHost } from "@/lib/payfast";
import { getPlan, monthsLabel } from "@/app/lib/plans";
import { COURSES } from "@/app/lib/course";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  if (!payfastConfigured()) return Response.json({ error: "Payments are not set up yet." }, { status: 503 });

  const token = req.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  if (!token) return Response.json({ error: "Please sign in." }, { status: 401 });
  const admin = supabaseAdmin();
  const { data: { user } } = await admin.auth.getUser(token);
  if (!user) return Response.json({ error: "Please sign in again." }, { status: 401 });

  const { planId } = (await req.json().catch(() => ({}))) as { planId?: string };
  const plan = planId ? getPlan(planId) : undefined;
  if (!plan) return Response.json({ error: "Unknown plan." }, { status: 400 });

  const paymentId = randomUUID();
  const { error } = await admin.from("payments").insert({ id: paymentId, user_id: user.id, plan_id: plan.id, amount: plan.price });
  if (error) return Response.json({ error: "Couldn't start checkout. Please try again." }, { status: 500 });

  const courseName = plan.course === "all" ? "All-Access" : COURSES[plan.course].label;
  const site = process.env.NEXT_PUBLIC_SITE_URL ?? new URL(req.url).origin;
  return Response.json({
    action: `${payfastHost()}/eng/process`,
    fields: checkoutFields({
      paymentId,
      amount: plan.price,
      itemName: `Raphael Aviation ${courseName} ${plan.tier === "premium" ? "Premium" : "Course"} (${monthsLabel(plan.months)})`,
      email: user.email ?? undefined,
      site,
    }),
  });
}
