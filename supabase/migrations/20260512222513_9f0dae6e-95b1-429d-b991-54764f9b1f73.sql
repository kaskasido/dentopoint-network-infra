DROP POLICY IF EXISTS "Anyone can view active manufacturers" ON public.manufacturers;

CREATE POLICY "Admins can view manufacturers"
ON public.manufacturers FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE VIEW public.manufacturers_public
WITH (security_invoker=on) AS
SELECT id, name, logo_url
FROM public.manufacturers
WHERE status = 'active';

GRANT SELECT ON public.manufacturers_public TO anon, authenticated;