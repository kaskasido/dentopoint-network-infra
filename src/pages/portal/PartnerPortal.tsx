import { Routes, Route } from "react-router-dom";
import PortalLayout from "@/components/PortalLayout";
import { useLanguage } from "@/i18n/LanguageContext";
import { LayoutDashboard, Handshake, Euro, MapPin } from "lucide-react";
import PartnerOverview from "@/components/portal/partner/PartnerOverview";
import PartnerDeals from "@/components/portal/partner/PartnerDeals";
import PartnerCommissions from "@/components/portal/partner/PartnerCommissions";
import PartnerTerritories from "@/components/portal/partner/PartnerTerritories";

const PartnerPortal = () => {
  const { t } = useLanguage();
  const navItems = [
    { label: t.portal.partner.dashboard, href: "/portal/partner", icon: LayoutDashboard },
    { label: t.portal.partner.deals, href: "/portal/partner/deals", icon: Handshake },
    { label: t.portal.partner.commissions, href: "/portal/partner/commissions", icon: Euro },
    { label: t.portal.partner.territories, href: "/portal/partner/territories", icon: MapPin },
  ];

  return (
    <PortalLayout title={t.portal.partner.title} navItems={navItems}>
      <Routes>
        <Route index element={<PartnerOverview />} />
        <Route path="deals" element={<PartnerDeals />} />
        <Route path="commissions" element={<PartnerCommissions />} />
        <Route path="territories" element={<PartnerTerritories />} />
      </Routes>
    </PortalLayout>
  );
};

export default PartnerPortal;
