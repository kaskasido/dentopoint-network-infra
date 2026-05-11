import { mockTerritories } from "@/data/mockPartnerData";
import { MapPin, Target, Users } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { getLocale } from "@/i18n/localeMap";

const PartnerTerritories = () => {
  const { t, lang } = useLanguage();
  const pp = (t as any).partnerPortal || ({} as any);
  const locale = getLocale(lang);

  const totalLeads = mockTerritories.reduce((s, ter) => s + ter.leads, 0);
  const totalConversions = mockTerritories.reduce((s, ter) => s + ter.conversions, 0);
  const conversionRate = Math.round((totalConversions / totalLeads) * 100);

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-foreground mb-2">{pp.territoriesTitle}</h1>
      <p className="text-muted-foreground text-sm mb-8">{pp.territoriesDesc}</p>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="border border-border rounded-lg p-5 bg-card">
          <MapPin size={20} className="text-accent mb-2" />
          <p className="font-display text-2xl font-bold text-foreground">{mockTerritories.length}</p>
          <p className="text-xs text-muted-foreground">{pp.territories}</p>
        </div>
        <div className="border border-border rounded-lg p-5 bg-card">
          <Users size={20} className="text-accent mb-2" />
          <p className="font-display text-2xl font-bold text-foreground">{totalLeads}</p>
          <p className="text-xs text-muted-foreground">{pp.totalLeads}</p>
        </div>
        <div className="border border-border rounded-lg p-5 bg-card">
          <Target size={20} className="text-accent mb-2" />
          <p className="font-display text-2xl font-bold text-accent">{conversionRate}%</p>
          <p className="text-xs text-muted-foreground">{pp.conversionRate}</p>
        </div>
      </div>

      {mockTerritories.map((ter) => (
        <div key={ter.region} className="border border-border rounded-lg p-6 bg-card mb-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <MapPin size={18} className="text-accent" />
              <h3 className="font-display text-lg font-semibold text-foreground">{ter.region}</h3>
            </div>
            <span className="text-sm font-semibold text-accent">€{ter.revenue.toLocaleString(locale)}</span>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-muted-foreground">{pp.leads}</p>
              <p className="text-lg font-bold text-foreground">{ter.leads}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{pp.conversions}</p>
              <p className="text-lg font-bold text-foreground">{ter.conversions}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{pp.automatsPlaced}</p>
              <p className="text-lg font-bold text-foreground">{ter.automatsPlaced}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{pp.conversionRate}</p>
              <p className="text-lg font-bold text-accent">{Math.round((ter.conversions / ter.leads) * 100)}%</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PartnerTerritories;
