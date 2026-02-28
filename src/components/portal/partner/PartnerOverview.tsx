import { mockDeals, mockCommissions, mockTerritories } from "@/data/mockPartnerData";
import { Handshake, Euro, Target, MapPin, TrendingUp, CheckCircle, Clock, XCircle } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { getLocale } from "@/i18n/localeMap";

const monthMap: Record<string, string> = {
  "Februar 2026": "february2026",
  "Januar 2026": "january2026",
  "Dezember 2025": "december2025",
  "November 2025": "november2025",
  "Oktober 2025": "october2025",
};

const PartnerOverview = () => {
  const { t, lang } = useLanguage();
  const pp = (t as any).partnerPortal || ({} as any);
  const md = (t as any).mockData || ({} as any);
  const locale = getLocale(lang);

  const trMonth = (val: string) => {
    const key = monthMap[val];
    return key && md[key] ? md[key] : val;
  };

  const closedDeals = mockDeals.filter((d) => d.status === "abgeschlossen");
  const totalCommissions = mockCommissions.reduce((s, c) => s + c.amount, 0);
  const pipelineValue = mockDeals.filter((d) => d.status === "lead" || d.status === "verhandlung").reduce((s, d) => s + d.value, 0);

  const stats = [
    { label: pp.dealsClosed, value: closedDeals.length, icon: Handshake, color: "text-accent" },
    { label: pp.pipelineValue, value: `€${(pipelineValue / 1000).toFixed(0)}K`, icon: Target, color: "text-accent" },
    { label: pp.totalCommissions, value: `€${totalCommissions.toLocaleString(locale)}`, icon: Euro, color: "text-accent" },
    { label: pp.territories, value: mockTerritories.length, icon: MapPin, color: "text-accent" },
  ];

  const statusConfig: Record<string, { label: string; icon: typeof Clock; className: string }> = {
    lead: { label: pp.lead, icon: Clock, className: "bg-blue-500/10 text-blue-500" },
    verhandlung: { label: pp.negotiation, icon: TrendingUp, className: "bg-yellow-500/10 text-yellow-500" },
    abgeschlossen: { label: pp.closed, icon: CheckCircle, className: "bg-accent/10 text-accent" },
    verloren: { label: pp.lost, icon: XCircle, className: "bg-destructive/10 text-destructive" },
  };

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-foreground mb-2">{pp.dashboardTitle}</h1>
      <p className="text-muted-foreground text-sm mb-8">{pp.dashboardDesc}</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="border border-border rounded-lg p-5 bg-card">
            <s.icon size={20} className={`${s.color} mb-3`} />
            <p className="font-display text-2xl font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <h2 className="font-display text-lg font-semibold text-foreground mb-4">{pp.dealPipeline}</h2>
      <div className="border border-border rounded-lg overflow-hidden mb-8">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/50">
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">{pp.clinic}</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">{pp.automats}</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">{pp.value}</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">{pp.status}</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">{pp.date}</th>
            </tr>
          </thead>
          <tbody>
            {mockDeals.map((d) => {
              const cfg = statusConfig[d.status];
              return (
                <tr key={d.id} className="border-t border-border">
                  <td className="px-4 py-3 font-medium text-foreground">{d.clinicName}</td>
                  <td className="px-4 py-3 text-muted-foreground">{d.automats}</td>
                  <td className="px-4 py-3 text-foreground">€{d.value.toLocaleString(locale)}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${cfg.className}`}>
                      <cfg.icon size={12} />
                      {cfg.label}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{new Date(d.date).toLocaleDateString(locale)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div>
          <h2 className="font-display text-lg font-semibold text-foreground mb-4">{pp.commissions}</h2>
          <div className="border border-border rounded-lg divide-y divide-border">
            {mockCommissions.map((c) => (
              <div key={c.id} className="p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-foreground">{trMonth(c.month)}</p>
                  <p className="text-xs text-muted-foreground">{c.deals} Deal{c.deals > 1 ? "s" : ""}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-foreground">€{c.amount.toLocaleString(locale)}</p>
                  <span className={`text-xs ${c.paid ? "text-accent" : "text-yellow-500"}`}>
                    {c.paid ? pp.paidOut : pp.pendingLabel}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-display text-lg font-semibold text-foreground mb-4">{pp.territories}</h2>
          <div className="border border-border rounded-lg divide-y divide-border">
            {mockTerritories.map((ter) => (
              <div key={ter.region} className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-foreground">{ter.region}</p>
                  <span className="text-sm text-accent font-semibold">€{ter.revenue.toLocaleString(locale)}</span>
                </div>
                <div className="flex gap-4 text-xs text-muted-foreground">
                  <span>{ter.leads} {pp.leads}</span>
                  <span>{ter.conversions} {pp.conversions}</span>
                  <span>{ter.automatsPlaced} {pp.automatsPlaced}</span>
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
