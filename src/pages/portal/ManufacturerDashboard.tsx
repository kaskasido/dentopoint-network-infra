import PortalLayout from "@/components/PortalLayout";
import { LayoutDashboard, Package, TrendingUp, FileText } from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/portal/manufacturer", icon: LayoutDashboard },
  { label: "Products", href: "/portal/manufacturer/products", icon: Package },
  { label: "Performance", href: "/portal/manufacturer/performance", icon: TrendingUp },
  { label: "Assets / Guidelines", href: "/portal/manufacturer/assets", icon: FileText },
];

const ManufacturerDashboard = () => (
  <PortalLayout title="Manufacturer Portal" navItems={navItems}>
    <h1 className="font-display text-2xl font-bold text-foreground mb-2">Dashboard</h1>
    <p className="text-muted-foreground text-sm mb-8">Your product placement and performance overview.</p>
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
      {[
        { label: "Active Products", value: "—", icon: Package },
        { label: "Total Placements", value: "—", icon: LayoutDashboard },
        { label: "Performance Score", value: "—", icon: TrendingUp },
        { label: "Assets Uploaded", value: "—", icon: FileText },
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

export default ManufacturerDashboard;
