import { Routes, Route } from "react-router-dom";
import PortalLayout from "@/components/PortalLayout";
import { LayoutDashboard, Handshake, Euro, MapPin } from "lucide-react";
import PartnerOverview from "@/components/portal/partner/PartnerOverview";
import PartnerDeals from "@/components/portal/partner/PartnerDeals";
import PartnerCommissions from "@/components/portal/partner/PartnerCommissions";
import PartnerTerritories from "@/components/portal/partner/PartnerTerritories";

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
      <Route path="deals" element={<PartnerDeals />} />
      <Route path="commissions" element={<PartnerCommissions />} />
      <Route path="territories" element={<PartnerTerritories />} />
    </Routes>
  </PortalLayout>
);

export default PartnerPortal;
