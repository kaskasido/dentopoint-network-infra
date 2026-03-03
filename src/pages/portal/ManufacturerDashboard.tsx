import { Routes, Route } from "react-router-dom";
import PortalLayout from "@/components/PortalLayout";
import { useLanguage } from "@/i18n/LanguageContext";
import { LayoutDashboard, MapPin, AlertTriangle, Wrench, BarChart3, Download, Grid3X3 } from "lucide-react";
import ManufacturerOverview from "@/components/portal/manufacturer/ManufacturerOverview";
import ManufacturerMap from "@/components/portal/manufacturer/ManufacturerMap";
import ManufacturerAlerts from "@/components/portal/manufacturer/ManufacturerAlerts";
import ManufacturerMaintenance from "@/components/portal/manufacturer/ManufacturerMaintenance";
import ManufacturerKPIs from "@/components/portal/manufacturer/ManufacturerKPIs";
import ManufacturerExport from "@/components/portal/manufacturer/ManufacturerExport";
import ManufacturerSlots from "@/components/portal/manufacturer/ManufacturerSlots";

const ManufacturerDashboard = () => {
  const { t } = useLanguage();
  const navItems = [
    { label: t.portal.manufacturer.dashboard, href: "/portal/manufacturer", icon: LayoutDashboard },
    { label: t.portal.manufacturer.map, href: "/portal/manufacturer/map", icon: MapPin },
    { label: t.portal.manufacturer.alerts, href: "/portal/manufacturer/alerts", icon: AlertTriangle },
    { label: t.portal.manufacturer.maintenance, href: "/portal/manufacturer/maintenance", icon: Wrench },
    { label: t.portal.manufacturer.kpis, href: "/portal/manufacturer/kpis", icon: BarChart3 },
    { label: t.portal.manufacturer.slots, href: "/portal/manufacturer/slots", icon: Grid3X3 },
    { label: t.portal.manufacturer.export, href: "/portal/manufacturer/export", icon: Download },
  ];

  return (
    <PortalLayout title={t.portal.manufacturer.title} navItems={navItems}>
      <Routes>
        <Route index element={<ManufacturerOverview />} />
        <Route path="map" element={<ManufacturerMap />} />
        <Route path="alerts" element={<ManufacturerAlerts />} />
        <Route path="maintenance" element={<ManufacturerMaintenance />} />
        <Route path="kpis" element={<ManufacturerKPIs />} />
        <Route path="slots" element={<ManufacturerSlots />} />
        <Route path="export" element={<ManufacturerExport />} />
      </Routes>
    </PortalLayout>
  );
};

export default ManufacturerDashboard;
