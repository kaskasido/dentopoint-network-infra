import { Routes, Route } from "react-router-dom";
import PortalLayout from "@/components/PortalLayout";
import { useLanguage } from "@/i18n/LanguageContext";
import { LayoutDashboard, Users, Shield, ScrollText, Cpu, ShoppingCart, Wrench, Coins } from "lucide-react";
import AdminOverview from "@/components/portal/admin/AdminOverview";
import AdminUsers from "@/components/portal/admin/AdminUsers";
import AdminRoles from "@/components/portal/admin/AdminRoles";
import AdminLogs from "@/components/portal/admin/AdminLogs";
import AdminAutomats from "@/components/portal/admin/AdminAutomats";
import AdminOrders from "@/components/portal/admin/AdminOrders";
import AdminMaintenance from "@/components/portal/admin/AdminMaintenance";
import AdminCommissions from "@/components/portal/admin/AdminCommissions";

const AdminPortal = () => {
  const { t } = useLanguage();
  const navItems = [
    { label: t.portal.admin.dashboard, href: "/portal/admin", icon: LayoutDashboard },
    { label: t.portal.admin.users, href: "/portal/admin/users", icon: Users },
    { label: t.portal.admin.roles, href: "/portal/admin/roles", icon: Shield },
    { label: "Module", href: "/portal/admin/automats", icon: Cpu },
    { label: "Bestellungen", href: "/portal/admin/orders", icon: ShoppingCart },
    { label: "Wartungen", href: "/portal/admin/maintenance", icon: Wrench },
    { label: "Provisionen", href: "/portal/admin/commissions", icon: Coins },
    { label: t.portal.admin.logs, href: "/portal/admin/logs", icon: ScrollText },
  ];

  return (
    <PortalLayout title={t.portal.admin.title} navItems={navItems}>
      <Routes>
        <Route index element={<AdminOverview />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="roles" element={<AdminRoles />} />
        <Route path="automats" element={<AdminAutomats />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="maintenance" element={<AdminMaintenance />} />
        <Route path="commissions" element={<AdminCommissions />} />
        <Route path="logs" element={<AdminLogs />} />
      </Routes>
    </PortalLayout>
  );
};

export default AdminPortal;
