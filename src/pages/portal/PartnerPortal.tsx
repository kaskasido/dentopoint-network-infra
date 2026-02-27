import { Routes, Route } from "react-router-dom";
import PortalLayout from "@/components/PortalLayout";
import { LayoutDashboard, Handshake, Euro, MapPin } from "lucide-react";
import PartnerOverview from "@/components/portal/partner/PartnerOverview";

const navItems = [
  { label: "Dashboard", href: "/portal/partner", icon: LayoutDashboard },
  { label: "Deals", href: "/portal/partner/deals", icon: Handshake },
  { label: "Provisionen", href: "/portal/partner/commissions", icon: Euro },
  { label: "Gebiete", href: "/portal/partner/territories", icon: MapPin },
];

const PartnerPortal = () => (
  <PortalLayout title="Partner-Portal" navItems={navItems}>
    <Routes>
      <Route index element={<PartnerOverview />} />
      <Route path="deals" element={<PartnerOverview />} />
      <Route path="commissions" element={<PartnerOverview />} />
      <Route path="territories" element={<PartnerOverview />} />
    </Routes>
  </PortalLayout>
);

export default PartnerPortal;
