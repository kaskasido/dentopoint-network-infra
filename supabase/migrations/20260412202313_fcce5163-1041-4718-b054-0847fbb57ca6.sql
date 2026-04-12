
-- =============================================
-- AUTOMATS (Smart Care Modules)
-- =============================================
CREATE TABLE public.automats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  serial_number TEXT UNIQUE NOT NULL,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'maintenance', 'offline')),
  address TEXT,
  city TEXT,
  country TEXT DEFAULT 'DE',
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  clinic_id UUID REFERENCES public.profiles(id),
  manufacturer_id UUID REFERENCES public.profiles(id),
  installed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.automats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage all automats" ON public.automats FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Manufacturers can view all automats" ON public.automats FOR SELECT USING (public.has_role(auth.uid(), 'manufacturer'));
CREATE POLICY "Clinics can view own automats" ON public.automats FOR SELECT USING (clinic_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid()));
CREATE POLICY "Investors can view all automats" ON public.automats FOR SELECT USING (public.has_role(auth.uid(), 'investor'));
CREATE POLICY "Partners can view all automats" ON public.automats FOR SELECT USING (public.has_role(auth.uid(), 'partner'));

CREATE TRIGGER update_automats_updated_at BEFORE UPDATE ON public.automats FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =============================================
-- ORDERS
-- =============================================
CREATE TABLE public.orders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_number TEXT UNIQUE NOT NULL,
  clinic_id UUID REFERENCES public.profiles(id) NOT NULL,
  automat_id UUID REFERENCES public.automats(id),
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'shipped', 'delivered', 'cancelled')),
  items JSONB NOT NULL DEFAULT '[]',
  quantity INTEGER NOT NULL DEFAULT 1,
  total_amount NUMERIC(12,2),
  currency TEXT NOT NULL DEFAULT 'EUR',
  notes TEXT,
  ordered_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  delivered_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage all orders" ON public.orders FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Clinics can view own orders" ON public.orders FOR SELECT USING (clinic_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid()));
CREATE POLICY "Clinics can create orders" ON public.orders FOR INSERT WITH CHECK (clinic_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid()));
CREATE POLICY "Manufacturers can view all orders" ON public.orders FOR SELECT USING (public.has_role(auth.uid(), 'manufacturer'));
CREATE POLICY "Investors can view all orders" ON public.orders FOR SELECT USING (public.has_role(auth.uid(), 'investor'));

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON public.orders FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =============================================
-- MAINTENANCE LOGS
-- =============================================
CREATE TABLE public.maintenance_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  automat_id UUID REFERENCES public.automats(id) NOT NULL,
  maintenance_type TEXT NOT NULL CHECK (maintenance_type IN ('preventive', 'corrective', 'inspection', 'emergency')),
  description TEXT,
  technician_name TEXT,
  technician_id UUID REFERENCES public.profiles(id),
  status TEXT NOT NULL DEFAULT 'scheduled' CHECK (status IN ('scheduled', 'in_progress', 'completed', 'cancelled')),
  scheduled_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  cost NUMERIC(10,2),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.maintenance_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage all maintenance" ON public.maintenance_logs FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Manufacturers can manage maintenance" ON public.maintenance_logs FOR ALL USING (public.has_role(auth.uid(), 'manufacturer'));
CREATE POLICY "Clinics can view own maintenance" ON public.maintenance_logs FOR SELECT USING (
  automat_id IN (SELECT id FROM public.automats WHERE clinic_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid()))
);
CREATE POLICY "Investors can view all maintenance" ON public.maintenance_logs FOR SELECT USING (public.has_role(auth.uid(), 'investor'));

CREATE TRIGGER update_maintenance_updated_at BEFORE UPDATE ON public.maintenance_logs FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =============================================
-- ALERTS
-- =============================================
CREATE TABLE public.alerts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  automat_id UUID REFERENCES public.automats(id),
  severity TEXT NOT NULL DEFAULT 'info' CHECK (severity IN ('info', 'warning', 'error', 'critical')),
  title TEXT NOT NULL,
  message TEXT,
  acknowledged BOOLEAN NOT NULL DEFAULT false,
  acknowledged_by UUID REFERENCES public.profiles(id),
  acknowledged_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.alerts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage all alerts" ON public.alerts FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Manufacturers can manage alerts" ON public.alerts FOR ALL USING (public.has_role(auth.uid(), 'manufacturer'));
CREATE POLICY "Clinics can view own alerts" ON public.alerts FOR SELECT USING (
  automat_id IN (SELECT id FROM public.automats WHERE clinic_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid()))
);
CREATE POLICY "Investors can view all alerts" ON public.alerts FOR SELECT USING (public.has_role(auth.uid(), 'investor'));

-- =============================================
-- COMMISSIONS (Partner)
-- =============================================
CREATE TABLE public.commissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  partner_id UUID REFERENCES public.profiles(id) NOT NULL,
  deal_name TEXT NOT NULL,
  deal_value NUMERIC(12,2) NOT NULL,
  commission_rate NUMERIC(5,2) NOT NULL DEFAULT 10.00,
  commission_amount NUMERIC(12,2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'paid', 'cancelled')),
  territory TEXT,
  notes TEXT,
  paid_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.commissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage all commissions" ON public.commissions FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Partners can view own commissions" ON public.commissions FOR SELECT USING (partner_id IN (SELECT id FROM public.profiles WHERE user_id = auth.uid()));
CREATE POLICY "Investors can view all commissions" ON public.commissions FOR SELECT USING (public.has_role(auth.uid(), 'investor'));

CREATE TRIGGER update_commissions_updated_at BEFORE UPDATE ON public.commissions FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =============================================
-- INDEXES
-- =============================================
CREATE INDEX idx_automats_clinic ON public.automats(clinic_id);
CREATE INDEX idx_automats_status ON public.automats(status);
CREATE INDEX idx_automats_coords ON public.automats(latitude, longitude);
CREATE INDEX idx_orders_clinic ON public.orders(clinic_id);
CREATE INDEX idx_orders_status ON public.orders(status);
CREATE INDEX idx_maintenance_automat ON public.maintenance_logs(automat_id);
CREATE INDEX idx_maintenance_status ON public.maintenance_logs(status);
CREATE INDEX idx_alerts_automat ON public.alerts(automat_id);
CREATE INDEX idx_alerts_severity ON public.alerts(severity);
CREATE INDEX idx_commissions_partner ON public.commissions(partner_id);
CREATE INDEX idx_commissions_status ON public.commissions(status);
