-- 1) Terms acceptance, stored per user (the app asks again when TERMS_VERSION changes).
-- 2) Screenshot policy: five warnings, the SIXTH screenshot/recording blocks the account.
-- Run after 004_screenshot_strikes.sql.

alter table public.account_flags add column if not exists terms_version text;
alter table public.account_flags add column if not exists terms_accepted_at timestamptz;

create or replace function public.accept_terms(version text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is null then raise exception 'not signed in'; end if;
  insert into account_flags as f (user_id, terms_version, terms_accepted_at, updated_at)
  values (auth.uid(), version, now(), now())
  on conflict (user_id) do update
    set terms_version = excluded.terms_version, terms_accepted_at = now(), updated_at = now();
end;
$$;
revoke all on function public.accept_terms(text) from public;
grant execute on function public.accept_terms(text) to authenticated;

create or replace function public.record_screenshot(source text default 'web')
returns table (screenshot_strikes int, blocked boolean)
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is null then raise exception 'not signed in'; end if;
  insert into account_flags as f (user_id, screenshot_strikes, blocked, blocked_at, updated_at)
  values (auth.uid(), 1, false, null, now())
  on conflict (user_id) do update
    set screenshot_strikes = f.screenshot_strikes + 1,
        blocked = f.blocked or f.screenshot_strikes + 1 > 5,
        blocked_at = case when not f.blocked and f.screenshot_strikes + 1 > 5 then now() else f.blocked_at end,
        updated_at = now();
  return query select a.screenshot_strikes, a.blocked from account_flags a where a.user_id = auth.uid();
end;
$$;
