import { Routes, Route } from "react-router-dom";
import PortalLayout from "@/components/PortalLayout";
import { LayoutDashboard, BarChart3, LineChart, PieChart, Rocket } from "lucide-react";
import PortalSubPage from "@/components/portal/PortalSubPage";

const navItems = [
  { label: "Dashboard", href: "/portal/investor", icon: LayoutDashboard },
  { label: "Market Opportunity", href: "/portal/investor/market", icon: BarChart3 },
  { label: "Scaling Roadmap", href: "/portal/investor/scaling", icon: LineChart },
  { label: "KPIs & Metrics", href: "/portal/investor/kpis", icon: PieChart },
  { label: "Expansion Pipeline", href: "/portal/investor/expansion", icon: Rocket },
];

const InvestorDashboard = () => (
  <PortalLayout title="Investor Portal" navItems={navItems}>
    <Routes>
      <Route index element={
        <>
          <h1 className="font-display text-2xl font-bold text-foreground mb-2">Dashboard</h1>
          <p className="text-muted-foreground text-sm mb-8">Key Metrics und Wachstumsübersicht.</p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "MRR", value: "—", icon: BarChart3 },
              { label: "Aktive Kliniken", value: "—", icon: LayoutDashboard },
              { label: "LTV:CAC Ratio", value: "—", icon: PieChart },
              { label: "Märkte", value: "—", icon: Rocket },
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
      <Route path="market" element={
        <PortalSubPage
          title="Market Opportunity"
          description="Marktanalyse und Wachstumspotenzial."
          items={[
            { title: "TAM / SAM / SOM", description: "€48B globaler Dental-Aftercare-Markt, €12B adressierbarer Markt in Europa." },
            { title: "Wettbewerbslandschaft", description: "Fragmentierter Markt ohne dominanten digitalen Player – First-Mover-Vorteil." },
            { title: "Regulatorischer Rückenwind", description: "EU MDR und Digitalisierungsförderung treiben Marktakzeptanz." },
            { title: "Zielgruppe", description: "42.000+ Zahnarztpraxen in DACH als primäre Zielgruppe." },
          ]}
        />
      } />
      <Route path="scaling" element={
        <PortalSubPage
          title="Scaling Roadmap"
          description="Skalierungsstrategie und Meilensteine."
          items={[
            { title: "Phase 1: DACH", description: "Q1-Q4 2025: 200 Kliniken in Deutschland, Österreich, Schweiz." },
            { title: "Phase 2: EU", description: "2026: Expansion nach Frankreich, Benelux, Skandinavien – 1.000 Kliniken." },
            { title: "Phase 3: Global", description: "2027: Markteintritt Asien (China JV) und Naher Osten." },
            { title: "Unit Economics", description: "Break-even pro Klinik nach 4 Monaten, 80%+ Gross Margin auf Software." },
          ]}
        />
      } />
      <Route path="kpis" element={
        <PortalSubPage
          title="KPIs & Metrics"
          description="Kritische Leistungskennzahlen."
          items={[
            { title: "MRR Growth", description: "Monatlich wiederkehrender Umsatz mit Ziel 40%+ MoM-Wachstum." },
            { title: "LTV:CAC", description: "Customer Lifetime Value zu Akquisitionskosten – Ziel >5:1." },
            { title: "Net Revenue Retention", description: "Netto-Umsatzbindung >120% durch Upselling und Expansion." },
            { title: "Churn Rate", description: "Monatliche Abwanderungsrate <2% durch hohe Kundenbindung." },
          ]}
        />
      } />
      <Route path="expansion" element={
        <PortalSubPage
          title="Expansion Pipeline"
          description="Internationale Expansions-Pipeline."
          items={[
            { title: "Pipeline-Status", description: "Aktuelle Verhandlungen und Letters of Intent nach Region." },
            { title: "Partnerlandschaft", description: "Lokale Distributionspartner und Joint-Venture-Strukturen." },
            { title: "Regulatorik", description: "Regulatorische Anforderungen und Zulassungsstatus pro Markt." },
            { title: "Investitionsbedarf", description: "Kapitalallokation und ROI-Prognosen pro Expansionsmarkt." },
          ]}
        />
      } />
    </Routes>
  </PortalLayout>
);

export default InvestorDashboard;
