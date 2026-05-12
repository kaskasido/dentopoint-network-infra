CREATE TABLE public.manufacturers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  contact_email TEXT,
  phone TEXT,
  country TEXT,
  website TEXT,
  notes TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.manufacturers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage manufacturers"
ON public.manufacturers FOR ALL
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Authenticated can view manufacturers"
ON public.manufacturers FOR SELECT
TO authenticated
USING (true);

CREATE TRIGGER update_manufacturers_updated_at
BEFORE UPDATE ON public.manufacturers
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();