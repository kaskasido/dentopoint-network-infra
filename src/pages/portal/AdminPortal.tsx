import { Routes, Route } from "react-router-dom";
import PortalLayout from "@/components/PortalLayout";
import { LayoutDashboard, Users, Shield, ScrollText } from "lucide-react";
import AdminOverview from "@/components/portal/admin/AdminOverview";

const navItems = [
  { label: "Dashboard", href: "/portal/admin", icon: LayoutDashboard },
  { label: "Nutzer", href: "/portal/admin/users", icon: Users },
  { label: "Rollen", href: "/portal/admin/roles", icon: Shield },
  { label: "System-Logs", href: "/portal/admin/logs", icon: ScrollText },
];

const AdminPortal = () => (
  <PortalLayout title="Admin-Portal" navItems={navItems}>
    <Routes>
      <Route index element={<AdminOverview />} />
      <Route path="users" element={<AdminOverview />} />
      <Route path="roles" element={<AdminOverview />} />
      <Route path="logs" element={<AdminOverview />} />
    </Routes>
  </PortalLayout>
);

export default AdminPortal;
