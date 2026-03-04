import { Routes, Route } from "react-router-dom";
import PortalLayout from "@/components/PortalLayout";
import { useLanguage } from "@/i18n/LanguageContext";
import { LayoutDashboard, Box, ShoppingCart, Star, Monitor } from "lucide-react";
import ClinicOverview from "@/components/portal/clinic/ClinicOverview";
import ClinicAutomats from "@/components/portal/clinic/ClinicAutomats";
import ClinicOrders from "@/components/portal/clinic/ClinicOrders";
import ClinicFeedback from "@/components/portal/clinic/ClinicFeedback";
import ClinicDevices from "@/components/portal/clinic/ClinicDevices";

const ClinicPortal = () => {
  const { t } = useLanguage();
  const nd = (t as any).nicoDetect || ({} as any);
  const navItems = [
    { label: t.portal.clinic.dashboard, href: "/portal/clinic", icon: LayoutDashboard },
    { label: t.portal.clinic.automats, href: "/portal/clinic/automats", icon: Box },
    { label: t.portal.clinic.orders, href: "/portal/clinic/orders", icon: ShoppingCart },
    { label: t.portal.clinic.feedback, href: "/portal/clinic/feedback", icon: Star },
    { label: nd.navLabel || "NICO Detect", href: "/portal/clinic/devices", icon: Monitor },
  ];

  return (
    <PortalLayout title={t.portal.clinic.title} navItems={navItems}>
      <Routes>
        <Route index element={<ClinicOverview />} />
        <Route path="automats" element={<ClinicAutomats />} />
        <Route path="orders" element={<ClinicOrders />} />
        <Route path="feedback" element={<ClinicFeedback />} />
        <Route path="devices" element={<ClinicDevices />} />
      </Routes>
    </PortalLayout>
  );
};

export default ClinicPortal;
