DROP POLICY IF EXISTS "Authenticated can view manufacturers" ON public.manufacturers;

CREATE POLICY "Anyone can view active manufacturers"
ON public.manufacturers FOR SELECT
TO anon, authenticated
USING (status = 'active' OR public.has_role(auth.uid(), 'admin'));