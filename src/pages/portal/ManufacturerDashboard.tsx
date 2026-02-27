import { Routes, Route } from "react-router-dom";
import PortalLayout from "@/components/PortalLayout";
import { LayoutDashboard, Package, Globe, Wrench, Award } from "lucide-react";
import PortalSubPage from "@/components/portal/PortalSubPage";

const navItems = [
  { label: "Dashboard", href: "/portal/manufacturer", icon: LayoutDashboard },
  { label: "System Integration", href: "/portal/manufacturer/integration", icon: Package },
  { label: "Data & Standards", href: "/portal/manufacturer/data", icon: Globe },
  { label: "Performance Metrics", href: "/portal/manufacturer/performance", icon: Wrench },
  { label: "Distribution", href: "/portal/manufacturer/distribution", icon: Award },
];

const ManufacturerDashboard = () => (
  <PortalLayout title="Manufacturer Portal" navItems={navItems}>
    <Routes>
      <Route index element={
        <>
          <h1 className="font-display text-2xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground text-sm mb-8">Übersicht Ihrer Produktplatzierung und Performance.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Aktive Produkte", value: "—", icon: Package },
              { label: "Integrationen", value: "—", icon: Globe },
              { label: "Performance Score", value: "—", icon: Wrench },
              { label: "Vertriebskanäle", value: "—", icon: Award },
            ].map((stat) => (
              <div key={stat.label} className="border border-border rounded-lg p-6 bg-card">
                <stat.icon size={20} className="text-accent mb-3" />
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </>
      } />
      <Route path="integration" element={
        <PortalSubPage
          title="System Integration"
          description="API-first Integration in das DentoPoint-Ökosystem."
          items={[
            { title: "REST API", description: "Vollständige REST API für Produktkatalog, Bestellungen und Bestandsmanagement." },
            { title: "Webhook Events", description: "Echtzeit-Benachrichtigungen bei Bestellungen, Retouren und Bestandsänderungen." },
            { title: "SDK & Libraries", description: "Client-SDKs für schnelle Integration in bestehende ERP-Systeme." },
            { title: "Sandbox-Umgebung", description: "Vollständige Testumgebung für Entwicklung und QA." },
          ]}
        />
      } />
      <Route path="data" element={
        <PortalSubPage
          title="Data & Standards"
          description="Datenstandards und Interoperabilität."
          items={[
            { title: "GS1 Standards", description: "Vollständige GS1-Barcode-Integration für Produkt-Tracking und Rückverfolgbarkeit." },
            { title: "HL7 FHIR", description: "Health Level 7 FHIR-kompatible Datenformate für klinische Interoperabilität." },
            { title: "UDI Compliance", description: "Unique Device Identification gemäß EU MDR für alle Medizinprodukte." },
            { title: "Datenqualität", description: "Automatisierte Datenvalidierung und Qualitätssicherung." },
          ]}
        />
      } />
      <Route path="performance" element={
        <PortalSubPage
          title="Performance Metrics"
          description="Kennzahlen und Leistungsindikatoren Ihrer Produkte."
          items={[
            { title: "Sell-Through Rate", description: "Echtzeit-Tracking der Verkaufsrate pro Produkt und Region." },
            { title: "Klinik-Feedback", description: "Aggregierte Bewertungen und Feedback von Praxisteams." },
            { title: "Compliance Rate", description: "Patienten-Compliance-Rate mit Ihren Nachsorgeprodukten." },
            { title: "Marktanteile", description: "Vergleichende Marktanteilsanalyse im DentoPoint-Netzwerk." },
          ]}
        />
      } />
      <Route path="distribution" element={
        <PortalSubPage
          title="Distribution"
          description="Vertriebskanäle und Logistik."
          items={[
            { title: "Klinik-Netzwerk", description: "Direktvertrieb über das DentoPoint-Kliniknetzwerk mit garantierter Platzierung." },
            { title: "Smart Care Module", description: "Produktplatzierung direkt am Point-of-Care über Smart Care Module." },
            { title: "Logistik-Hub", description: "Zentralisierte Lagerhaltung und Just-in-Time-Lieferung an Kliniken." },
            { title: "Internationale Märkte", description: "Zugang zu internationalen Märkten über DentoPoint-Partnerstrukturen." },
          ]}
        />
      } />
    </Routes>
  </PortalLayout>
);

export default ManufacturerDashboard;
