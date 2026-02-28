import { mockDeals } from "@/data/mockPartnerData";
import { CheckCircle, Clock, TrendingUp, XCircle } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const PartnerDeals = () => {
  const { t } = useLanguage();
  const pp = t.partnerPortal;

  const statusConfig: Record<string, { label: string; icon: typeof Clock; className: string }> = {
    lead: { label: pp.lead, icon: Clock, className: "bg-blue-500/10 text-blue-500" },
    verhandlung: { label: pp.negotiation, icon: TrendingUp, className: "bg-yellow-500/10 text-yellow-500" },
    abgeschlossen: { label: pp.closed, icon: CheckCircle, className: "bg-accent/10 text-accent" },
    verloren: { label: pp.lost, icon: XCircle, className: "bg-destructive/10 text-destructive" },
  };

  const stages = Object.entries(statusConfig).map(([key, cfg]) => ({
    ...cfg, key,
    count: mockDeals.filter((d) => d.status === key).length,
    value: mockDeals.filter((d) => d.status === key).reduce((s, d) => s + d.value, 0),
  }));

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-foreground mb-2">{pp.dealsTitle}</h1>
      <p className="text-muted-foreground text-sm mb-8">{pp.dealsDesc}</p>

      <div className="grid grid-cols-4 gap-4 mb-8">
        {stages.map((s) => (
          <div key={s.key} className="border border-border rounded-lg p-5 bg-card">
            <s.icon size={20} className={s.className.split(" ")[1]} />
            <p className="font-display text-2xl font-bold text-foreground mt-2">{s.count}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
            <p className="text-xs text-muted-foreground mt-1">€{s.value.toLocaleString("de-DE")}</p>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        {mockDeals.map((d) => {
          const cfg = statusConfig[d.status];
          return (
            <div key={d.id} className="border border-border rounded-lg p-5 bg-card flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">{d.clinicName}</p>
                <p className="text-xs text-muted-foreground mt-1">{d.automats} {pp.automats} • {new Date(d.date).toLocaleDateString("de-DE")}</p>
              </div>
              <div className="flex items-center gap-4">
                <p className="font-semibold text-foreground">€{d.value.toLocaleString("de-DE")}</p>
                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${cfg.className}`}>
                  <cfg.icon size={12} />
                  {cfg.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PartnerDeals;
