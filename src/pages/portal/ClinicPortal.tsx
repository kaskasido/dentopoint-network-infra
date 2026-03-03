import { Routes, Route } from "react-router-dom";
import PortalLayout from "@/components/PortalLayout";
import { useLanguage } from "@/i18n/LanguageContext";
import { LayoutDashboard, Box, ShoppingCart, Star, FileText, Monitor } from "lucide-react";
import ClinicOverview from "@/components/portal/clinic/ClinicOverview";
import ClinicAutomats from "@/components/portal/clinic/ClinicAutomats";
import ClinicOrders from "@/components/portal/clinic/ClinicOrders";
import ClinicFeedback from "@/components/portal/clinic/ClinicFeedback";
import ClinicLeasing from "@/components/portal/clinic/ClinicLeasing";
import ClinicDisplay from "@/components/portal/clinic/ClinicDisplay";

const ClinicPortal = () => {
  const { t } = useLanguage();
  const navItems = [
    { label: t.portal.clinic.dashboard, href: "/portal/clinic", icon: LayoutDashboard },
    { label: t.portal.clinic.automats, href: "/portal/clinic/automats", icon: Box },
    { label: t.portal.clinic.orders, href: "/portal/clinic/orders", icon: ShoppingCart },
    { label: t.portal.clinic.feedback, href: "/portal/clinic/feedback", icon: Star },
    { label: t.portal.clinic.leasing, href: "/portal/clinic/leasing", icon: FileText },
    { label: t.portal.clinic.display, href: "/portal/clinic/display", icon: Monitor },
  ];

  return (
    <PortalLayout title={t.portal.clinic.title} navItems={navItems}>
      <Routes>
        <Route index element={<ClinicOverview />} />
        <Route path="automats" element={<ClinicAutomats />} />
        <Route path="orders" element={<ClinicOrders />} />
        <Route path="feedback" element={<ClinicFeedback />} />
        <Route path="leasing" element={<ClinicLeasing />} />
        <Route path="display" element={<ClinicDisplay />} />
      </Routes>
    </PortalLayout>
  );
};

export default ClinicPortal;
