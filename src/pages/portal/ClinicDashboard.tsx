import { Routes, Route } from "react-router-dom";
import PortalLayout from "@/components/PortalLayout";
import { LayoutDashboard, Users, ClipboardList, Stethoscope, ShieldCheck } from "lucide-react";
import PortalSubPage from "@/components/portal/PortalSubPage";

const navItems = [
  { label: "Dashboard", href: "/portal/clinic", icon: LayoutDashboard },
  { label: "Revenue Streams", href: "/portal/clinic/revenue", icon: Users },
  { label: "Implementation", href: "/portal/clinic/implementation", icon: ClipboardList },
  { label: "Clinic Workflow", href: "/portal/clinic/workflow", icon: Stethoscope },
  { label: "Compliance", href: "/portal/clinic/compliance", icon: ShieldCheck },
];

const ClinicDashboard = () => (
  <PortalLayout title="Clinic Portal" navItems={navItems}>
    <Routes>
      <Route index element={
        <>
          <h1 className="font-display text-2xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground text-sm mb-8">Übersicht Ihrer Klinik-Nachsorge-Performance.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Aktive Geräte", value: "—", icon: Stethoscope },
              { label: "Umsatz (MTD)", value: "—", icon: Users },
              { label: "Compliance Score", value: "—", icon: ShieldCheck },
              { label: "Offene Aufgaben", value: "—", icon: ClipboardList },
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
      <Route path="revenue" element={
        <PortalSubPage
          title="Revenue Streams"
          description="Umsatzquellen und Einnahmenpotenziale Ihrer Klinik."
          items={[
            { title: "Nachsorge-Pakete", description: "Wiederkehrende Einnahmen durch Premium-Nachsorgepakete für Patienten." },
            { title: "Geräte-Leasing", description: "Monatliche Leasingeinnahmen durch Smart Care Module in der Praxis." },
            { title: "Produktmargen", description: "Margen auf Dental-Nachsorgeprodukte, die über die Plattform vertrieben werden." },
            { title: "Daten-Insights", description: "Anonymisierte Nutzungsdaten als Basis für Forschungskooperationen." },
          ]}
        />
      } />
      <Route path="implementation" element={
        <PortalSubPage
          title="Implementation"
          description="Schrittweise Implementierung in Ihrer Klinik."
          items={[
            { title: "Onboarding", description: "Strukturierter 4-Wochen-Onboarding-Prozess mit persönlichem Ansprechpartner." },
            { title: "Hardware-Setup", description: "Installation und Konfiguration der Smart Care Module vor Ort." },
            { title: "Team-Schulung", description: "Schulung des Praxisteams für die optimale Nutzung der Plattform." },
            { title: "Go-Live Support", description: "Begleitung während der ersten Betriebswochen mit 24/7-Support." },
          ]}
        />
      } />
      <Route path="workflow" element={
        <PortalSubPage
          title="Clinic Workflow"
          description="Optimierte Arbeitsabläufe für die tägliche Praxis."
          items={[
            { title: "Patienten-Aufnahme", description: "Digitaler Check-in und automatische Nachsorgeplan-Erstellung." },
            { title: "Behandlungsdokumentation", description: "Automatisierte Dokumentation via Smart Care Module Daten." },
            { title: "Nachsorge-Tracking", description: "Echtzeit-Monitoring der Patienten-Compliance und Heilungsverläufe." },
            { title: "Terminmanagement", description: "Automatische Erinnerungen und Nachsorge-Terminplanung." },
          ]}
        />
      } />
      <Route path="compliance" element={
        <PortalSubPage
          title="Compliance"
          description="GDPR, MDR und regulatorische Compliance."
          items={[
            { title: "DSGVO / GDPR", description: "Vollständige Datenschutzkonformität mit verschlüsselter Datenverarbeitung." },
            { title: "MDR (EU 2017/745)", description: "Medical Device Regulation Compliance für alle Smart Care Module." },
            { title: "Audit-Trail", description: "Lückenlose Dokumentation aller Datenzugriffe und Änderungen." },
            { title: "Zertifizierungen", description: "ISO 13485 und CE-Kennzeichnung für alle medizinischen Geräte." },
          ]}
        />
      } />
    </Routes>
  </PortalLayout>
);

export default ClinicDashboard;
