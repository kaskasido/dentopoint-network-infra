import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Box, Building, ShoppingCart, Coins } from "lucide-react";
import EmptyState from "@/components/portal/shared/EmptyState";

const InvestorOverview = () => {
  const [stats, setStats] = useState({ automats: 0, orgs: 0, orders: 0, commissionsValue: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [a, o, ord, c] = await Promise.all([
        supabase.from("automats").select("id", { count: "exact", head: true }),
        supabase.from("organizations").select("id", { count: "exact", head: true }),
        supabase.from("orders").select("total_amount"),
        supabase.from("commissions").select("deal_value"),
      ]);
      const orderSum = (ord.data ?? []).reduce((s: number, r: any) => s + Number(r.total_amount ?? 0), 0);
      const dealSum = (c.data ?? []).reduce((s: number, r: any) => s + Number(r.deal_value ?? 0), 0);
      setStats({
        automats: a.count ?? 0,
        orgs: o.count ?? 0,
        orders: orderSum,
        commissionsValue: dealSum,
      });
      setLoading(false);
    })();
  }, []);

  const cards = [
    { label: "Automaten im Netzwerk", value: stats.automats, icon: Box },
    { label: "Organisationen", value: stats.orgs, icon: Building },
    { label: "Bestellvolumen (€)", value: stats.orders.toLocaleString(), icon: ShoppingCart },
    { label: "Deal-Volumen (€)", value: stats.commissionsValue.toLocaleString(), icon: Coins },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-foreground mb-2">Investor Dashboard</h1>
      <p className="text-muted-foreground text-sm mb-8">Echtzeit-Kennzahlen aus dem Netzwerk.</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map((c) => (
          <div key={c.label} className="border border-border rounded-lg p-5 bg-card">
            <c.icon size={20} className="text-accent mb-3" />
            <p className="font-display text-2xl font-bold text-foreground">{loading ? "…" : c.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{c.label}</p>
          </div>
        ))}
      </div>

      <EmptyState title="Detaillierte Analytik in Vorbereitung" description="Zeitreihen für Umsatz, Wachstum und regionale Verteilung erscheinen hier, sobald entsprechende historische Daten erfasst werden." />
    </div>
  );
};

export default InvestorOverview;
