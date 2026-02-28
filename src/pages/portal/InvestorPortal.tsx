import { Routes, Route } from "react-router-dom";
import PortalLayout from "@/components/PortalLayout";
import { useLanguage } from "@/i18n/LanguageContext";
import { LayoutDashboard, TrendingUp, Globe, PieChart } from "lucide-react";
import InvestorOverview from "@/components/portal/investor/InvestorOverview";
import InvestorGrowth from "@/components/portal/investor/InvestorGrowth";
import InvestorRegions from "@/components/portal/investor/InvestorRegions";
import InvestorMetrics from "@/components/portal/investor/InvestorMetrics";

const InvestorPortal = () => {
  const { t } = useLanguage();
  const navItems = [
    { label: t.portal.investor.dashboard, href: "/portal/investor", icon: LayoutDashboard },
    { label: t.portal.investor.growth, href: "/portal/investor/growth", icon: TrendingUp },
    { label: t.portal.investor.regions, href: "/portal/investor/regions", icon: Globe },
    { label: t.portal.investor.metrics, href: "/portal/investor/metrics", icon: PieChart },
  ];

  return (
    <PortalLayout title={t.portal.investor.title} navItems={navItems}>
      <Routes>
        <Route index element={<InvestorOverview />} />
        <Route path="growth" element={<InvestorGrowth />} />
        <Route path="regions" element={<InvestorRegions />} />
        <Route path="metrics" element={<InvestorMetrics />} />
      </Routes>
    </PortalLayout>
  );
};

export default InvestorPortal;
