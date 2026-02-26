import PortalLayout from "@/components/PortalLayout";
import { LayoutDashboard, Users, Building2, BarChart3 } from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/portal/admin", icon: LayoutDashboard },
  { label: "Users", href: "/portal/admin/users", icon: Users },
  { label: "Organizations", href: "/portal/admin/orgs", icon: Building2 },
  { label: "Metrics", href: "/portal/admin/metrics", icon: BarChart3 },
];

const AdminDashboard = () => (
  <PortalLayout title="Admin Portal" navItems={navItems}>
    <h1 className="font-display text-2xl font-bold text-foreground mb-2">Dashboard</h1>
    <p className="text-muted-foreground text-sm mb-8">Platform-wide administration overview.</p>
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
      {[
        { label: "Total Users", value: "—", icon: Users },
        { label: "Organizations", value: "—", icon: Building2 },
        { label: "Active Devices", value: "—", icon: LayoutDashboard },
        { label: "Platform Revenue", value: "—", icon: BarChart3 },
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

export default AdminDashboard;
