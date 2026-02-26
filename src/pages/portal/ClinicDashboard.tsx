import PortalLayout from "@/components/PortalLayout";
import { LayoutDashboard, MapPin, Monitor, Package } from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/portal/clinic", icon: LayoutDashboard },
  { label: "Locations", href: "/portal/clinic/locations", icon: MapPin },
  { label: "Devices", href: "/portal/clinic/devices", icon: Monitor },
  { label: "Inventory", href: "/portal/clinic/inventory", icon: Package },
];

const ClinicDashboard = () => (
  <PortalLayout title="Clinic Portal" navItems={navItems}>
    <h1 className="font-display text-2xl font-bold text-foreground mb-2">Dashboard</h1>
    <p className="text-muted-foreground text-sm mb-8">Overview of your clinic's aftercare performance.</p>
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
      {[
        { label: "Active Devices", value: "—", icon: Monitor },
        { label: "Locations", value: "—", icon: MapPin },
        { label: "Inventory Items", value: "—", icon: Package },
        { label: "Revenue (MTD)", value: "—", icon: LayoutDashboard },
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

export default ClinicDashboard;
