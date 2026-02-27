import { Routes, Route } from "react-router-dom";
import PortalLayout from "@/components/PortalLayout";
import { LayoutDashboard, Box, ShoppingCart, Star } from "lucide-react";
import ClinicOverview from "@/components/portal/clinic/ClinicOverview";

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
      <Route path="automats" element={<ClinicOverview />} />
      <Route path="orders" element={<ClinicOverview />} />
      <Route path="feedback" element={<ClinicOverview />} />
    </Routes>
  </PortalLayout>
);

export default ClinicPortal;
