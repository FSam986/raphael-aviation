-- Screenshot strikes: each detected screenshot adds a strike; at 5 the account
-- is blocked. Users can READ their own row but never write it directly — the
-- only way to add a strike is record_screenshot(), which runs as the table
-- owner. Unblock (support/admin) from the SQL editor:
--   update account_flags set blocked = false, screenshot_strikes = 0 where user_id = '<uuid>';

create table if not exists public.account_flags (
  user_id uuid primary key references auth.users (id) on delete cascade,
  screenshot_strikes int not null default 0,
  blocked boolean not null default false,
  blocked_at timestamptz,
  updated_at timestamptz not null default now()
);

alter table public.account_flags enable row level security;

drop policy if exists "read own flags" on public.account_flags;
create policy "read own flags" on public.account_flags
  for select using (auth.uid() = user_id);
-- No insert/update/delete policies: clients cannot change strikes or unblock.

create or replace function public.record_screenshot(source text default 'web')
returns table (screenshot_strikes int, blocked boolean)
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is null then
    raise exception 'not signed in';
  end if;
  insert into account_flags as f (user_id, screenshot_strikes, blocked, blocked_at, updated_at)
  values (auth.uid(), 1, false, null, now())
  on conflict (user_id) do update
    set screenshot_strikes = f.screenshot_strikes + 1,
        blocked = f.blocked or f.screenshot_strikes + 1 >= 5,
        blocked_at = case when not f.blocked and f.screenshot_strikes + 1 >= 5 then now() else f.blocked_at end,
        updated_at = now();
  return query select a.screenshot_strikes, a.blocked from account_flags a where a.user_id = auth.uid();
end;
$$;

revoke all on function public.record_screenshot(text) from public;
grant execute on function public.record_screenshot(text) to authenticated;
