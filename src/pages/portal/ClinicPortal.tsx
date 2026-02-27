import { Routes, Route } from "react-router-dom";
import PortalLayout from "@/components/PortalLayout";
import { LayoutDashboard, Box, ShoppingCart, Star } from "lucide-react";
import ClinicOverview from "@/components/portal/clinic/ClinicOverview";
import ClinicAutomats from "@/components/portal/clinic/ClinicAutomats";
import ClinicOrders from "@/components/portal/clinic/ClinicOrders";
import ClinicFeedback from "@/components/portal/clinic/ClinicFeedback";

const navItems = [
  { label: "Dashboard", href: "/portal/clinic", icon: LayoutDashboard },
  { label: "Automaten", href: "/portal/clinic/automats", icon: Box },
  { label: "Bestellungen", href: "/portal/clinic/orders", icon: ShoppingCart },
  { label: "Feedback", href: "/portal/clinic/feedback", icon: Star },
];

const ClinicPortal = () => (
  <PortalLayout title="Klinik-Portal" navItems={navItems}>
    <Routes>
      <Route index element={<ClinicOverview />} />
      <Route path="automats" element={<ClinicAutomats />} />
      <Route path="orders" element={<ClinicOrders />} />
      <Route path="feedback" element={<ClinicFeedback />} />
    </Routes>
  </PortalLayout>
);

export default ClinicPortal;
