
-- 1) Remove metadata-based self role assignment.
CREATE OR REPLACE FUNCTION public.assign_initial_role()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Roles must be granted by an admin via the AdminRoles panel.
  -- This function intentionally no longer reads user metadata.
  RETURN;
END;
$$;

-- 2) Restrict execution of SECURITY DEFINER helper functions.
REVOKE EXECUTE ON FUNCTION public.assign_initial_role()        FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.get_user_role(uuid)          FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, app_role)     FROM anon, public;
REVOKE EXECUTE ON FUNCTION public.handle_new_user()            FROM anon, authenticated, public;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column()   FROM anon, authenticated, public;
-- has_role stays callable for authenticated users (used in RLS checks indirectly; safe boolean response).
GRANT EXECUTE ON FUNCTION public.has_role(uuid, app_role) TO authenticated;

-- 3) Public locator data: minimise columns exposed to anon/authenticated.
DROP POLICY IF EXISTS "Public can view active automats locations" ON public.automats;

CREATE OR REPLACE VIEW public.public_automat_locations
WITH (security_invoker = true) AS
SELECT id, name, address, city, country, latitude, longitude, status
FROM public.automats
WHERE status = 'active';

-- The view needs a permissive policy on the base table for anon/authenticated to read these columns.
CREATE POLICY "Public locator can read active automats"
ON public.automats
FOR SELECT
TO anon, authenticated
USING (status = 'active');

GRANT SELECT ON public.public_automat_locations TO anon, authenticated;
