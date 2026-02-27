import { mockDeals, mockCommissions, mockTerritories } from "@/data/mockPartnerData";
import { Handshake, Euro, Target, MapPin, TrendingUp, CheckCircle, Clock, XCircle } from "lucide-react";

const PartnerOverview = () => {
  const closedDeals = mockDeals.filter((d) => d.status === "abgeschlossen");
  const totalCommissions = mockCommissions.reduce((s, c) => s + c.amount, 0);
  const pipelineValue = mockDeals.filter((d) => d.status === "lead" || d.status === "verhandlung").reduce((s, d) => s + d.value, 0);

  const stats = [
    { label: "Deals abgeschlossen", value: closedDeals.length, icon: Handshake, color: "text-accent" },
    { label: "Pipeline-Wert", value: `€${(pipelineValue / 1000).toFixed(0)}K`, icon: Target, color: "text-accent" },
    { label: "Provisionen gesamt", value: `€${totalCommissions.toLocaleString("de-DE")}`, icon: Euro, color: "text-accent" },
    { label: "Gebiete", value: mockTerritories.length, icon: MapPin, color: "text-accent" },
  ];

  const statusConfig = {
    lead: { label: "Lead", icon: Clock, className: "bg-blue-500/10 text-blue-500" },
    verhandlung: { label: "Verhandlung", icon: TrendingUp, className: "bg-yellow-500/10 text-yellow-500" },
    abgeschlossen: { label: "Abgeschlossen", icon: CheckCircle, className: "bg-accent/10 text-accent" },
    verloren: { label: "Verloren", icon: XCircle, className: "bg-destructive/10 text-destructive" },
  };

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-foreground mb-2">Partner Dashboard</h1>
      <p className="text-muted-foreground text-sm mb-8">Vertrieb, Provisionen und Gebietsübersicht.</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="border border-border rounded-lg p-5 bg-card">
            <s.icon size={20} className={`${s.color} mb-3`} />
            <p className="font-display text-2xl font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Deals Pipeline */}
      <h2 className="font-display text-lg font-semibold text-foreground mb-4">Deal Pipeline</h2>
      <div className="border border-border rounded-lg overflow-hidden mb-8">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/50">
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Klinik</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Automaten</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Wert</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Datum</th>
            </tr>
          </thead>
          <tbody>
            {mockDeals.map((d) => {
              const cfg = statusConfig[d.status];
              return (
                <tr key={d.id} className="border-t border-border">
                  <td className="px-4 py-3 font-medium text-foreground">{d.clinicName}</td>
                  <td className="px-4 py-3 text-muted-foreground">{d.automats}</td>
                  <td className="px-4 py-3 text-foreground">€{d.value.toLocaleString("de-DE")}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${cfg.className}`}>
                      <cfg.icon size={12} />
                      {cfg.label}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{new Date(d.date).toLocaleDateString("de-DE")}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Commissions */}
        <div>
          <h2 className="font-display text-lg font-semibold text-foreground mb-4">Provisionen</h2>
          <div className="border border-border rounded-lg divide-y divide-border">
            {mockCommissions.map((c) => (
              <div key={c.id} className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">{c.month}</p>
                  <p className="text-xs text-muted-foreground">{c.deals} Deal{c.deals > 1 ? "s" : ""}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground">€{c.amount.toLocaleString("de-DE")}</p>
                  <span className={`text-xs ${c.paid ? "text-accent" : "text-yellow-500"}`}>
                    {c.paid ? "Ausgezahlt" : "Ausstehend"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Territories */}
        <div>
          <h2 className="font-display text-lg font-semibold text-foreground mb-4">Gebiete</h2>
          <div className="border border-border rounded-lg divide-y divide-border">
            {mockTerritories.map((t) => (
              <div key={t.region} className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-foreground">{t.region}</p>
                  <span className="text-sm text-accent font-semibold">€{t.revenue.toLocaleString("de-DE")}</span>
                </div>
                <div className="flex gap-4 text-xs text-muted-foreground">
                  <span>{t.leads} Leads</span>
                  <span>{t.conversions} Conversions</span>
                  <span>{t.automatsPlaced} Automaten platziert</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerOverview;
