import { Routes, Route } from "react-router-dom";
import PortalLayout from "@/components/PortalLayout";
import { useLanguage } from "@/i18n/LanguageContext";
import { LayoutDashboard, Users, Shield, ScrollText } from "lucide-react";
import AdminOverview from "@/components/portal/admin/AdminOverview";
import AdminUsers from "@/components/portal/admin/AdminUsers";
import AdminRoles from "@/components/portal/admin/AdminRoles";
import AdminLogs from "@/components/portal/admin/AdminLogs";

const AdminPortal = () => {
  const { t } = useLanguage();
  const navItems = [
    { label: t.portal.admin.dashboard, href: "/portal/admin", icon: LayoutDashboard },
    { label: t.portal.admin.users, href: "/portal/admin/users", icon: Users },
    { label: t.portal.admin.roles, href: "/portal/admin/roles", icon: Shield },
    { label: t.portal.admin.logs, href: "/portal/admin/logs", icon: ScrollText },
  ];

  return (
    <PortalLayout title={t.portal.admin.title} navItems={navItems}>
      <Routes>
        <Route index element={<AdminOverview />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="roles" element={<AdminRoles />} />
        <Route path="logs" element={<AdminLogs />} />
      </Routes>
    </PortalLayout>
  );
};

export default AdminPortal;
