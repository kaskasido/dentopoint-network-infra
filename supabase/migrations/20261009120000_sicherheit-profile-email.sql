-- Sicherheitsprüfung 9. Oktober 2026
-- 1. Nutzer dürfen ihre Organisation (org_id) nicht selbst setzen oder ändern, sonst könnten sie die Daten
--    einer fremden Organisation lesen (Richtlinie "Members can view own org"). Nur Admins oder das System.
create or replace function public.protect_profile_org()
returns trigger language plpgsql security definer set search_path to 'public' as $$
begin
  if auth.uid() is null or public.has_role(auth.uid(), 'admin') then
    return new;
  end if;
  if tg_op = 'INSERT' and new.org_id is not null then
    raise exception 'org_id darf nur von Admins gesetzt werden';
  end if;
  if tg_op = 'UPDATE' and (new.org_id is distinct from old.org_id or new.user_id is distinct from old.user_id) then
    raise exception 'org_id und user_id dürfen nur von Admins geändert werden';
  end if;
  return new;
end;
$$;
drop trigger if exists protect_profile_org on public.profiles;
create trigger protect_profile_org before insert or update on public.profiles
  for each row execute function public.protect_profile_org();
revoke execute on function public.protect_profile_org() from public, anon, authenticated;

-- 2. Interne Funktionen der E-Mail-Warteschlange sind nicht für Besucher gedacht (laufen per Cron und Trigger)
revoke execute on function public.email_queue_dispatch() from public, anon, authenticated;
revoke execute on function public.email_queue_wake() from public, anon, authenticated;
