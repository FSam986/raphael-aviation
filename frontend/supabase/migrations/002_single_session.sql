-- One screen at a time: each user has at most one "active device". A newer
-- login overwrites active_device; older screens notice the mismatch and sign out.
create table if not exists public.user_sessions (
  user_id       uuid primary key references auth.users(id) on delete cascade,
  active_device text not null,
  updated_at    timestamptz not null default now()
);

alter table public.user_sessions enable row level security;

-- A user may only read/write their own active-device row.
drop policy if exists "own session" on public.user_sessions;
create policy "own session" on public.user_sessions
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
