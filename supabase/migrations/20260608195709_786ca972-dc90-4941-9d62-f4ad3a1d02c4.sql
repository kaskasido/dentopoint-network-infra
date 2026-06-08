ALTER TABLE public.manufacturers ADD COLUMN IF NOT EXISTS owner_user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS manufacturers_owner_user_id_idx ON public.manufacturers(owner_user_id);

DROP POLICY IF EXISTS "Manufacturer users can view their own record" ON public.manufacturers;
CREATE POLICY "Manufacturer users can view their own record"
ON public.manufacturers
FOR SELECT
TO authenticated
USING (owner_user_id = auth.uid() AND public.has_role(auth.uid(), 'manufacturer'));