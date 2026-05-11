import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { MapPin, Coins } from "lucide-react";
import EmptyState from "@/components/portal/shared/EmptyState";

const PartnerTerritories = () => {
  const [rows, setRows] = useState<{ territory: string; count: number; value: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("commissions").select("territory,deal_value").then(({ data }) => {
      const grouped: Record<string, { count: number; value: number }> = {};
      (data ?? []).forEach((r: any) => {
        const k = r.territory ?? "—";
        if (!grouped[k]) grouped[k] = { count: 0, value: 0 };
        grouped[k].count += 1;
        grouped[k].value += Number(r.deal_value ?? 0);
      });
      setRows(Object.entries(grouped).map(([territory, v]) => ({ territory, ...v })).sort((a, b) => b.value - a.value));
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-foreground mb-2">Gebiete</h1>
      <p className="text-muted-foreground text-sm mb-8">Performance nach Vertriebsgebiet.</p>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="border border-border rounded-lg p-5 bg-card"><MapPin size={20} className="text-accent mb-2" /><p className="font-display text-2xl font-bold text-foreground">{rows.length}</p><p className="text-xs text-muted-foreground">Aktive Gebiete</p></div>
        <div className="border border-border rounded-lg p-5 bg-card"><Coins size={20} className="text-accent mb-2" /><p className="font-display text-2xl font-bold text-foreground">€{rows.reduce((s, r) => s + r.value, 0).toLocaleString()}</p><p className="text-xs text-muted-foreground">Gesamtvolumen</p></div>
      </div>

      {loading ? <p className="text-sm text-muted-foreground">Lade…</p> : rows.length === 0 ? (
        <EmptyState description="Noch keine Deals nach Gebieten erfasst." />
      ) : (
        rows.map((r) => (
          <div key={r.territory} className="border border-border rounded-lg p-6 bg-card mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2"><MapPin size={18} className="text-accent" /><h3 className="font-display text-lg font-semibold text-foreground">{r.territory}</h3></div>
              <div className="text-right">
                <p className="text-sm font-semibold text-accent">€{r.value.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">{r.count} Deal{r.count !== 1 ? "s" : ""}</p>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PartnerTerritories;
