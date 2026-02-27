import { mockTerritories } from "@/data/mockPartnerData";
import { MapPin, Target, Users, TrendingUp } from "lucide-react";

const PartnerTerritories = () => {
  const totalLeads = mockTerritories.reduce((s, t) => s + t.leads, 0);
  const totalConversions = mockTerritories.reduce((s, t) => s + t.conversions, 0);
  const conversionRate = Math.round((totalConversions / totalLeads) * 100);

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-foreground mb-2">Gebietsübersicht</h1>
      <p className="text-muted-foreground text-sm mb-8">Performance Ihrer zugewiesenen Vertriebsgebiete.</p>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="border border-border rounded-lg p-5 bg-card">
          <MapPin size={20} className="text-accent mb-2" />
          <p className="font-display text-2xl font-bold text-foreground">{mockTerritories.length}</p>
          <p className="text-xs text-muted-foreground">Gebiete</p>
        </div>
        <div className="border border-border rounded-lg p-5 bg-card">
          <Users size={20} className="text-accent mb-2" />
          <p className="font-display text-2xl font-bold text-foreground">{totalLeads}</p>
          <p className="text-xs text-muted-foreground">Leads gesamt</p>
        </div>
        <div className="border border-border rounded-lg p-5 bg-card">
          <Target size={20} className="text-accent mb-2" />
          <p className="font-display text-2xl font-bold text-accent">{conversionRate}%</p>
          <p className="text-xs text-muted-foreground">Conversion Rate</p>
        </div>
      </div>

      {mockTerritories.map((t) => (
        <div key={t.region} className="border border-border rounded-lg p-6 bg-card mb-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <MapPin size={18} className="text-accent" />
              <h3 className="font-display text-lg font-semibold text-foreground">{t.region}</h3>
            </div>
            <span className="text-sm font-semibold text-accent">€{t.revenue.toLocaleString("de-DE")}</span>
          </div>
          <div className="grid grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-muted-foreground">Leads</p>
              <p className="text-lg font-bold text-foreground">{t.leads}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Conversions</p>
              <p className="text-lg font-bold text-foreground">{t.conversions}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Automaten platziert</p>
              <p className="text-lg font-bold text-foreground">{t.automatsPlaced}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Conversion Rate</p>
              <p className="text-lg font-bold text-accent">{Math.round((t.conversions / t.leads) * 100)}%</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PartnerTerritories;
