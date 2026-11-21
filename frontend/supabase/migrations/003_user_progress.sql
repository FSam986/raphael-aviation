-- Cloud copy of each student's study progress (mastery maps, progress summary,
-- coach plan), so it survives a cleared browser and follows them across devices.
-- One row per user; `data` maps a storage key to { v: <json string>, ts: <ms> }.
create table if not exists public.user_progress (
  user_id    uuid primary key references auth.users (id) on delete cascade,
  data       jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.user_progress enable row level security;

drop policy if exists "own progress read" on public.user_progress;
create policy "own progress read" on public.user_progress
  for select using (auth.uid() = user_id);

drop policy if exists "own progress insert" on public.user_progress;
create policy "own progress insert" on public.user_progress
  for insert with check (auth.uid() = user_id);

drop policy if exists "own progress update" on public.user_progress;
create policy "own progress update" on public.user_progress
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);
