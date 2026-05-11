CREATE POLICY "Public can view active automats locations"
ON public.automats
FOR SELECT
TO anon, authenticated
USING (status = 'active');