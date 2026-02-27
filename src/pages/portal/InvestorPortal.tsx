import { Routes, Route } from "react-router-dom";
import PortalLayout from "@/components/PortalLayout";
import { LayoutDashboard, TrendingUp, Globe, PieChart } from "lucide-react";
import InvestorOverview from "@/components/portal/investor/InvestorOverview";

const navItems = [
  { label: "Dashboard", href: "/portal/investor", icon: LayoutDashboard },
  { label: "Wachstum", href: "/portal/investor/growth", icon: TrendingUp },
  { label: "Regionen", href: "/portal/investor/regions", icon: Globe },
  { label: "Kennzahlen", href: "/portal/investor/metrics", icon: PieChart },
];

const InvestorPortal = () => (
  <PortalLayout title="Investor-Portal" navItems={navItems}>
    <Routes>
      <Route index element={<InvestorOverview />} />
      <Route path="growth" element={<InvestorOverview />} />
      <Route path="regions" element={<InvestorOverview />} />
      <Route path="metrics" element={<InvestorOverview />} />
    </Routes>
  </PortalLayout>
);

export default InvestorPortal;
