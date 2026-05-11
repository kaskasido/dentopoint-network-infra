import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { BarChart3, Box, Coins, ShoppingCart } from "lucide-react";
import EmptyState from "@/components/portal/shared/EmptyState";

const InvestorMetrics = () => {
  const [stats, setStats] = useState({ automats: 0, orders: 0, ordersValue: 0, commissionsValue: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [a, ord, c] = await Promise.all([
        supabase.from("automats").select("id", { count: "exact", head: true }),
        supabase.from("orders").select("total_amount"),
        supabase.from("commissions").select("deal_value"),
      ]);
      setStats({
        automats: a.count ?? 0,
        orders: (ord.data ?? []).length,
        ordersValue: (ord.data ?? []).reduce((s: number, r: any) => s + Number(r.total_amount ?? 0), 0),
        commissionsValue: (c.data ?? []).reduce((s: number, r: any) => s + Number(r.deal_value ?? 0), 0),
      });
      setLoading(false);
    })();
  }, []);

  const metrics = [
    { label: "Automaten gesamt", value: stats.automats, icon: Box },
    { label: "Bestellungen gesamt", value: stats.orders, icon: ShoppingCart },
    { label: "Bestellvolumen", value: `€${stats.ordersValue.toLocaleString()}`, icon: BarChart3 },
    { label: "Deal-Volumen", value: `€${stats.commissionsValue.toLocaleString()}`, icon: Coins },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-foreground mb-2">Kennzahlen</h1>
      <p className="text-muted-foreground text-sm mb-8">Live-Werte aus den Backenddaten.</p>

      {loading ? <p className="text-sm text-muted-foreground">Lade…</p> : (
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {metrics.map((m) => (
            <div key={m.label} className="border border-border rounded-lg p-6 bg-card">
              <div className="p-2 inline-flex rounded-lg bg-accent/10 mb-4"><m.icon size={20} className="text-accent" /></div>
              <p className="font-display text-3xl font-bold text-foreground">{m.value}</p>
              <p className="text-sm text-muted-foreground">{m.label}</p>
            </div>
          ))}
        </div>
      )}
      {!loading && stats.automats === 0 && <EmptyState description="Noch keine Daten – Kennzahlen aktualisieren sich automatisch." />}
    </div>
  );
};

export default InvestorMetrics;
