import PortalLayout from "@/components/PortalLayout";
import { LayoutDashboard, BarChart3, Globe, FolderOpen } from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/portal/investor", icon: LayoutDashboard },
  { label: "KPIs", href: "/portal/investor/kpis", icon: BarChart3 },
  { label: "Expansion", href: "/portal/investor/expansion", icon: Globe },
  { label: "Data Room", href: "/portal/investor/data-room", icon: FolderOpen },
];

const InvestorDashboard = () => (
  <PortalLayout title="Investor Portal" navItems={navItems}>
    <h1 className="font-display text-2xl font-bold text-foreground mb-2">Dashboard</h1>
    <p className="text-muted-foreground text-sm mb-8">Key metrics and expansion progress.</p>
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
      {[
        { label: "MRR", value: "—", icon: BarChart3 },
        { label: "Active Clinics", value: "—", icon: LayoutDashboard },
        { label: "Markets", value: "—", icon: Globe },
        { label: "Data Room Files", value: "—", icon: FolderOpen },
      ].map((stat) => (
        <div key={stat.label} className="border border-border rounded-lg p-6 bg-card">
          <stat.icon size={20} className="text-accent mb-3" />
          <p className="text-2xl font-bold text-foreground">{stat.value}</p>
          <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
        </div>
      ))}
    </div>
  </PortalLayout>
);

export default InvestorDashboard;
