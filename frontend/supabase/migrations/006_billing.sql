-- Billing: one-off PayFast purchases of 1/3/6/12 months of access per course.
-- Users can READ their own entitlements/payments; only the server (service role,
-- from the verified PayFast notification) can write them.

create table if not exists public.entitlements (
  user_id uuid not null references auth.users (id) on delete cascade,
  course text not null check (course in ('cpl', 'ppl', 'ir', 'gr', 'nr')),
  tier text not null check (tier in ('course', 'premium')),
  expires_at timestamptz not null,
  updated_at timestamptz not null default now(),
  primary key (user_id, course)
);
alter table public.entitlements enable row level security;
drop policy if exists "read own entitlements" on public.entitlements;
create policy "read own entitlements" on public.entitlements for select using (auth.uid() = user_id);

create table if not exists public.payments (
  id text primary key,                         -- our m_payment_id
  user_id uuid not null references auth.users (id) on delete cascade,
  plan_id text not null,
  amount numeric(10, 2) not null,
  status text not null default 'pending',      -- pending | complete | failed | cancelled
  provider_ref text,                           -- PayFast pf_payment_id
  raw jsonb,
  created_at timestamptz not null default now(),
  completed_at timestamptz
);
alter table public.payments enable row level security;
drop policy if exists "read own payments" on public.payments;
create policy "read own payments" on public.payments for select using (auth.uid() = user_id);

-- Extend (or start) access: new expiry = later of now / current expiry, plus N
-- months. Tier never drops while time remains (premium stays premium).
create or replace function public.grant_entitlement(p_user uuid, p_course text, p_tier text, p_months int)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into entitlements as e (user_id, course, tier, expires_at, updated_at)
  values (p_user, p_course, p_tier, now() + make_interval(months => p_months), now())
  on conflict (user_id, course) do update
    set expires_at = greatest(e.expires_at, now()) + make_interval(months => p_months),
        tier = case when e.expires_at > now() and e.tier = 'premium' then 'premium' else excluded.tier end,
        updated_at = now();
end;
$$;
revoke all on function public.grant_entitlement(uuid, text, text, int) from public, anon, authenticated;
grant execute on function public.grant_entitlement(uuid, text, text, int) to service_role;
