import { Routes, Route } from "react-router-dom";
import PortalLayout from "@/components/PortalLayout";
import {
  LayoutDashboard, Cpu, HeartPulse, GraduationCap, Building2, Globe,
} from "lucide-react";
import PortalSubPage from "@/components/portal/PortalSubPage";

const navItems = [
  { label: "Dashboard", href: "/portal/partner", icon: LayoutDashboard },
  { label: "Technology Partners", href: "/portal/partner/technology", icon: Cpu },
  { label: "Healthcare Networks", href: "/portal/partner/healthcare", icon: HeartPulse },
  { label: "Academic Partners", href: "/portal/partner/academic", icon: GraduationCap },
  { label: "Industry Alliances", href: "/portal/partner/industry", icon: Building2 },
  { label: "Global Expansion", href: "/portal/partner/global", icon: Globe },
];

const PartnerDashboard = () => (
  <PortalLayout title="Partner Portal" navItems={navItems}>
    <Routes>
      <Route index element={
        <>
          <h1 className="font-display text-2xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground text-sm mb-8">Übersicht Ihrer strategischen Partnerschaften.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { label: "Technology Partners", value: "—", icon: Cpu },
              { label: "Healthcare Networks", value: "—", icon: HeartPulse },
              { label: "Academic Partners", value: "—", icon: GraduationCap },
              { label: "Industry Alliances", value: "—", icon: Building2 },
              { label: "Global Markets", value: "—", icon: Globe },
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
      <Route path="technology" element={
        <PortalSubPage
          title="Technology Partners"
          description="Technologiepartner und Integrationen im DentoPoint-Ökosystem."
          items={[
            { title: "API-Integrationen", description: "Nahtlose Anbindung an bestehende Praxis-Management-Systeme und EHR-Plattformen." },
            { title: "IoT-Infrastruktur", description: "Smart Care Module Hardware-Integration und Geräteverwaltung." },
            { title: "Cloud-Architektur", description: "Skalierbare Cloud-Infrastruktur für Echtzeit-Datenverarbeitung." },
            { title: "Sicherheitsstandards", description: "ISO 27001, GDPR-konforme Datenverschlüsselung und Zugriffskontrolle." },
          ]}
        />
      } />
      <Route path="healthcare" element={
        <PortalSubPage
          title="Healthcare Networks"
          description="Netzwerke im Gesundheitswesen und klinische Kooperationen."
          items={[
            { title: "Klinikketten", description: "Partnerschaften mit großen Dental-Klinikketten in DACH und Europa." },
            { title: "Krankenkassen", description: "Integration von Nachsorge-Programmen in Versicherungsleistungen." },
            { title: "Fachverbände", description: "Zusammenarbeit mit zahnmedizinischen Fachgesellschaften." },
            { title: "Telemedizin", description: "Telemedizinische Nachsorge-Module für Remote-Patienten." },
          ]}
        />
      } />
      <Route path="academic" element={
        <PortalSubPage
          title="Academic Partners"
          description="Akademische Partnerschaften und Forschungskooperationen."
          items={[
            { title: "Universitätskliniken", description: "Forschungskooperationen mit führenden zahnmedizinischen Fakultäten." },
            { title: "Klinische Studien", description: "Evidenzbasierte Validierung der DentoPoint-Nachsorgeprotokolle." },
            { title: "Lehre & Ausbildung", description: "Integration in zahnmedizinische Curricula und Fortbildungsprogramme." },
            { title: "Publikationen", description: "Gemeinsame wissenschaftliche Veröffentlichungen und Konferenzbeiträge." },
          ]}
        />
      } />
      <Route path="industry" element={
        <PortalSubPage
          title="Industry Alliances"
          description="Branchenallianzen und strategische Kooperationen."
          items={[
            { title: "Dental-Hersteller", description: "Exklusive Vertriebspartnerschaften mit führenden Dental-Herstellern." },
            { title: "Pharma-Kooperationen", description: "Integration pharmazeutischer Nachsorgeprodukten." },
            { title: "Medizintechnik", description: "Partnerschaften mit Medizintechnik-Unternehmen für Geräteinnovation." },
            { title: "Branchenstandards", description: "Mitgestaltung von Branchenstandards für digitale Nachsorge." },
          ]}
        />
      } />
      <Route path="global" element={
        <PortalSubPage
          title="Global Expansion"
          description="Globale Expansionsstrategie und internationale Märkte."
          items={[
            { title: "DACH-Region", description: "Kernmarkt Deutschland, Österreich, Schweiz mit hoher Marktdurchdringung." },
            { title: "EU-Expansion", description: "Rollout in weitere EU-Märkte: Frankreich, Benelux, Skandinavien." },
            { title: "Asien-Pazifik", description: "Markteintritt China über Joint Venture, Expansion nach Südkorea, Japan." },
            { title: "Naher Osten", description: "Premium-Dental-Märkte in UAE, Saudi-Arabien und Katar." },
          ]}
        />
      } />
    </Routes>
  </PortalLayout>
);

export default PartnerDashboard;
