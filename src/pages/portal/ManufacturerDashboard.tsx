import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import PortalLayout from "@/components/PortalLayout";
import { LayoutDashboard, MapPin, AlertTriangle, Wrench, BarChart3, Download } from "lucide-react";
import ManufacturerOverview from "@/components/portal/manufacturer/ManufacturerOverview";
import ManufacturerMap from "@/components/portal/manufacturer/ManufacturerMap";
import ManufacturerAlerts from "@/components/portal/manufacturer/ManufacturerAlerts";
import ManufacturerMaintenance from "@/components/portal/manufacturer/ManufacturerMaintenance";
import ManufacturerKPIs from "@/components/portal/manufacturer/ManufacturerKPIs";
import ManufacturerExport from "@/components/portal/manufacturer/ManufacturerExport";

const navItems = [
  { label: "Dashboard", href: "/portal/manufacturer", icon: LayoutDashboard },
  { label: "Standorte & Karte", href: "/portal/manufacturer/map", icon: MapPin },
  { label: "Echtzeit-Alerts", href: "/portal/manufacturer/alerts", icon: AlertTriangle },
  { label: "Wartung & Historie", href: "/portal/manufacturer/maintenance", icon: Wrench },
  { label: "Performance KPIs", href: "/portal/manufacturer/kpis", icon: BarChart3 },
  { label: "Daten-Export", href: "/portal/manufacturer/export", icon: Download },
];

const ManufacturerDashboard = () => (
  <PortalLayout title="Hersteller-Portal" navItems={navItems}>
    <Routes>
      <Route index element={<ManufacturerOverview />} />
      <Route path="map" element={<ManufacturerMap />} />
      <Route path="alerts" element={<ManufacturerAlerts />} />
      <Route path="maintenance" element={<ManufacturerMaintenance />} />
      <Route path="kpis" element={<ManufacturerKPIs />} />
      <Route path="export" element={<ManufacturerExport />} />
    </Routes>
  </PortalLayout>
);

export default ManufacturerDashboard;
