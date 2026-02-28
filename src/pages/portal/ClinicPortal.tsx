import { Routes, Route } from "react-router-dom";
import PortalLayout from "@/components/PortalLayout";
import { useLanguage } from "@/i18n/LanguageContext";
import { LayoutDashboard, Box, ShoppingCart, Star } from "lucide-react";
import ClinicOverview from "@/components/portal/clinic/ClinicOverview";
import ClinicAutomats from "@/components/portal/clinic/ClinicAutomats";
import ClinicOrders from "@/components/portal/clinic/ClinicOrders";
import ClinicFeedback from "@/components/portal/clinic/ClinicFeedback";

const ClinicPortal = () => {
  const { t } = useLanguage();
  const navItems = [
    { label: t.portal.clinic.dashboard, href: "/portal/clinic", icon: LayoutDashboard },
    { label: t.portal.clinic.automats, href: "/portal/clinic/automats", icon: Box },
    { label: t.portal.clinic.orders, href: "/portal/clinic/orders", icon: ShoppingCart },
    { label: t.portal.clinic.feedback, href: "/portal/clinic/feedback", icon: Star },
  ];

  return (
    <PortalLayout title={t.portal.clinic.title} navItems={navItems}>
      <Routes>
        <Route index element={<ClinicOverview />} />
        <Route path="automats" element={<ClinicAutomats />} />
        <Route path="orders" element={<ClinicOrders />} />
        <Route path="feedback" element={<ClinicFeedback />} />
      </Routes>
    </PortalLayout>
  );
};

export default ClinicPortal;
