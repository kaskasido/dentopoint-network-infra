import { mockAutomats } from "@/data/mockAutomats";
import { TrendingUp, Target, Percent, BarChart3, Activity, Zap, Clock, Euro } from "lucide-react";

const ManufacturerKPIs = () => {
  const totalRev = mockAutomats.reduce((s, a) => s + a.revenue30d, 0);
  const avgFill = Math.round(mockAutomats.reduce((s, a) => s + a.fillLevel, 0) / mockAutomats.length);
  const uptimeRate = Math.round((mockAutomats.filter((a) => a.status === "online").length / mockAutomats.length) * 100);
  const totalProducts = mockAutomats.reduce((s, a) => s + a.products.reduce((ps, p) => ps + p.stock, 0), 0);
  const totalCapacity = mockAutomats.reduce((s, a) => s + a.products.reduce((ps, p) => ps + p.maxStock, 0), 0);

  const kpis = [
    { label: "Gesamtumsatz (30T)", value: `€${totalRev.toLocaleString("de-DE")}`, trend: "+12.5%", icon: Euro, positive: true },
    { label: "Ø Umsatz pro Automat", value: `€${Math.round(totalRev / mockAutomats.length).toLocaleString("de-DE")}`, trend: "+8.3%", icon: TrendingUp, positive: true },
    { label: "Uptime-Rate", value: `${uptimeRate}%`, trend: "-2.1%", icon: Activity, positive: false },
    { label: "Ø Füllstand", value: `${avgFill}%`, trend: "+5.0%", icon: Percent, positive: true },
    { label: "Produkte im Netz", value: totalProducts.toLocaleString("de-DE"), trend: "", icon: Target, positive: true },
    { label: "Kapazitätsauslastung", value: `${Math.round((totalProducts / totalCapacity) * 100)}%`, trend: "+3.2%", icon: BarChart3, positive: true },
    { label: "Ø Wartungsintervall", value: "30 Tage", trend: "stabil", icon: Clock, positive: true },
    { label: "Sell-Through Rate", value: "73%", trend: "+4.1%", icon: Zap, positive: true },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-foreground mb-2">Performance KPIs</h1>
      <p className="text-muted-foreground text-sm mb-8">Leistungskennzahlen Ihres Automaten-Netzwerks.</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {kpis.map((k) => (
          <div key={k.label} className="border border-border rounded-lg p-5 bg-card">
            <k.icon size={20} className="text-accent mb-3" />
            <p className="font-display text-2xl font-bold text-foreground">{k.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{k.label}</p>
            {k.trend && (
              <p className={`text-xs mt-2 font-medium ${k.positive ? "text-accent" : "text-destructive"}`}>
                {k.trend}
              </p>
            )}
          </div>
        ))}
      </div>

      <h2 className="font-display text-lg font-semibold text-foreground mb-4">Umsatz pro Automat (30 Tage)</h2>
      <div className="border border-border rounded-lg p-6 bg-card">
        <div className="space-y-3">
          {mockAutomats
            .sort((a, b) => b.revenue30d - a.revenue30d)
            .map((a) => {
              const pct = (a.revenue30d / Math.max(...mockAutomats.map((x) => x.revenue30d))) * 100;
              return (
                <div key={a.id} className="flex items-center gap-4">
                  <span className="font-mono text-xs font-semibold text-foreground w-16 shrink-0">{a.nr}</span>
                  <span className="text-sm text-muted-foreground w-40 shrink-0 truncate">{a.name}</span>
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-brand rounded-full transition-all" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="text-sm font-medium text-foreground w-20 text-right">€{a.revenue30d.toLocaleString("de-DE")}</span>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default ManufacturerKPIs;
