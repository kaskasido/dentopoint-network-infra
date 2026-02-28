import { mockCommissions } from "@/data/mockPartnerData";
import { Euro, CheckCircle, Clock } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { getLocale } from "@/i18n/localeMap";

const monthMap: Record<string, string> = {
  "Februar 2026": "february2026",
  "Januar 2026": "january2026",
  "Dezember 2025": "december2025",
  "November 2025": "november2025",
  "Oktober 2025": "october2025",
};

const PartnerCommissions = () => {
  const { t, lang } = useLanguage();
  const pp = (t as any).partnerPortal || ({} as any);
  const md = (t as any).mockData || ({} as any);
  const locale = getLocale(lang);

  const trMonth = (val: string) => {
    const key = monthMap[val];
    return key && md[key] ? md[key] : val;
  };

  const totalPaid = mockCommissions.filter((c) => c.paid).reduce((s, c) => s + c.amount, 0);
  const totalPending = mockCommissions.filter((c) => !c.paid).reduce((s, c) => s + c.amount, 0);

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-foreground mb-2">{pp.commissionsTitle}</h1>
      <p className="text-muted-foreground text-sm mb-8">{pp.commissionsDesc}</p>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="border border-border rounded-lg p-5 bg-card">
          <Euro size={20} className="text-accent mb-2" />
          <p className="font-display text-2xl font-bold text-foreground">€{(totalPaid + totalPending).toLocaleString(locale)}</p>
          <p className="text-xs text-muted-foreground">{pp.total}</p>
        </div>
        <div className="border border-border rounded-lg p-5 bg-card">
          <CheckCircle size={20} className="text-accent mb-2" />
          <p className="font-display text-2xl font-bold text-accent">€{totalPaid.toLocaleString(locale)}</p>
          <p className="text-xs text-muted-foreground">{pp.paidOut}</p>
        </div>
        <div className="border border-border rounded-lg p-5 bg-card">
          <Clock size={20} className="text-yellow-500 mb-2" />
          <p className="font-display text-2xl font-bold text-yellow-500">€{totalPending.toLocaleString(locale)}</p>
          <p className="text-xs text-muted-foreground">{pp.pendingLabel}</p>
        </div>
      </div>

      <div className="border border-border rounded-lg divide-y divide-border">
        {mockCommissions.map((c) => (
          <div key={c.id} className="p-5 flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">{trMonth(c.month)}</p>
              <p className="text-xs text-muted-foreground">{c.deals} {pp.dealsCompleted}</p>
            </div>
            <div className="text-right flex items-center gap-4">
              <p className="font-display text-xl font-bold text-foreground">€{c.amount.toLocaleString(locale)}</p>
              <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${c.paid ? "bg-accent/10 text-accent" : "bg-yellow-500/10 text-yellow-500"}`}>
                {c.paid ? <CheckCircle size={12} /> : <Clock size={12} />}
                {c.paid ? pp.paidOut : pp.pendingLabel}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartnerCommissions;
