ALTER TABLE public.manufacturers ADD COLUMN logo_url TEXT;

INSERT INTO storage.buckets (id, name, public)
VALUES ('manufacturer-logos', 'manufacturer-logos', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public can view manufacturer logos"
ON storage.objects FOR SELECT
USING (bucket_id = 'manufacturer-logos');

CREATE POLICY "Admins can upload manufacturer logos"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'manufacturer-logos' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update manufacturer logos"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'manufacturer-logos' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete manufacturer logos"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'manufacturer-logos' AND public.has_role(auth.uid(), 'admin'));