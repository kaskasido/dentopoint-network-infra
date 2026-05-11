import { mockAutomats } from "@/data/mockAutomats";
import { TrendingUp, Target, Percent, BarChart3, Activity, Zap, Clock, Euro } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { getLocale } from "@/i18n/localeMap";

const ManufacturerKPIs = () => {
  const { t, lang } = useLanguage();
  const mp = (t as any).manufacturerPortal || ({} as any);
  const locale = getLocale(lang);

  const totalRev = mockAutomats.reduce((s, a) => s + a.revenue30d, 0);
  const avgFill = Math.round(mockAutomats.reduce((s, a) => s + a.fillLevel, 0) / mockAutomats.length);
  const uptimeRate = Math.round((mockAutomats.filter((a) => a.status === "online").length / mockAutomats.length) * 100);
  const totalProducts = mockAutomats.reduce((s, a) => s + a.products.reduce((ps, p) => ps + p.stock, 0), 0);
  const totalCapacity = mockAutomats.reduce((s, a) => s + a.products.reduce((ps, p) => ps + p.maxStock, 0), 0);

  const kpis = [
    { label: mp.totalRevenue30d, value: `€${totalRev.toLocaleString(locale)}`, trend: "+12.5%", icon: Euro, positive: true },
    { label: mp.avgRevenueAutomat, value: `€${Math.round(totalRev / mockAutomats.length).toLocaleString(locale)}`, trend: "+8.3%", icon: TrendingUp, positive: true },
    { label: mp.uptimeRate, value: `${uptimeRate}%`, trend: "-2.1%", icon: Activity, positive: false },
    { label: mp.avgFillLevel, value: `${avgFill}%`, trend: "+5.0%", icon: Percent, positive: true },
    { label: mp.productsInNetwork, value: totalProducts.toLocaleString(locale), trend: "", icon: Target, positive: true },
    { label: mp.capacityUtilization, value: `${Math.round((totalProducts / totalCapacity) * 100)}%`, trend: "+3.2%", icon: BarChart3, positive: true },
    { label: mp.avgMaintenanceInterval, value: `30 ${mp.days}`, trend: mp.stable, icon: Clock, positive: true },
    { label: mp.sellThroughRate, value: "73%", trend: "+4.1%", icon: Zap, positive: true },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-foreground mb-2">{mp.kpisTitle}</h1>
      <p className="text-muted-foreground text-sm mb-8">{mp.kpisDesc}</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {kpis.map((k) => (
          <div key={k.label} className="border border-border rounded-lg p-5 bg-card">
            <k.icon size={20} className="text-accent mb-3" />
            <p className="font-display text-2xl font-bold text-foreground">{k.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{k.label}</p>
            {k.trend && (
              <p className={`text-xs mt-2 font-medium ${k.positive ? "text-accent" : "text-destructive"}`}>{k.trend}</p>
            )}
          </div>
        ))}
      </div>

      <h2 className="font-display text-lg font-semibold text-foreground mb-4">{mp.revenuePerAutomat30d}</h2>
      <div className="border border-border rounded-lg p-6 bg-card">
        <div className="space-y-3">
          {mockAutomats.sort((a, b) => b.revenue30d - a.revenue30d).map((a) => {
            const pct = (a.revenue30d / Math.max(...mockAutomats.map((x) => x.revenue30d))) * 100;
            return (
              <div key={a.id} className="flex items-center gap-4">
                <span className="font-mono text-xs font-semibold text-foreground w-16 shrink-0">{a.nr}</span>
                <span className="text-sm text-muted-foreground w-40 shrink-0 truncate">{a.name}</span>
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-brand rounded-full transition-all" style={{ width: `${pct}%` }} />
                </div>
                <span className="text-sm font-medium text-foreground w-20 text-right">€{a.revenue30d.toLocaleString(locale)}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ManufacturerKPIs;
