import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Box, Wifi, ShoppingCart, AlertTriangle } from "lucide-react";
import EmptyState from "@/components/portal/shared/EmptyState";

const ClinicOverview = () => {
  const [stats, setStats] = useState({ total: 0, active: 0, orders: 0, alerts: 0 });
  const [automats, setAutomats] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [a, o, al] = await Promise.all([
        supabase.from("automats").select("*").order("created_at", { ascending: false }),
        supabase.from("orders").select("*").order("ordered_at", { ascending: false }).limit(10),
        supabase.from("alerts").select("id", { count: "exact", head: true }).eq("acknowledged", false),
      ]);
      const aRows = a.data ?? [];
      setAutomats(aRows);
      setOrders(o.data ?? []);
      setStats({
        total: aRows.length,
        active: aRows.filter((r: any) => r.status === "active").length,
        orders: (o.data ?? []).length,
        alerts: al.count ?? 0,
      });
      setLoading(false);
    })();
  }, []);

  const cards = [
    { label: "Automaten", value: stats.total, icon: Box },
    { label: "Aktiv", value: stats.active, icon: Wifi },
    { label: "Bestellungen", value: stats.orders, icon: ShoppingCart },
    { label: "Offene Alerts", value: stats.alerts, icon: AlertTriangle },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-foreground mb-2">Klinik Dashboard</h1>
      <p className="text-muted-foreground text-sm mb-8">Übersicht zu deinen Smart Care Modulen.</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map((s) => (
          <div key={s.label} className="border border-border rounded-lg p-5 bg-card">
            <s.icon size={20} className="text-accent mb-3" />
            <p className="font-display text-2xl font-bold text-foreground">{loading ? "…" : s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <h2 className="font-display text-lg font-semibold text-foreground mb-4">Deine Automaten</h2>
      {automats.length === 0 ? (
        <EmptyState description="Sobald deiner Klinik Automaten zugewiesen werden, erscheinen sie hier." />
      ) : (
        <div className="border border-border rounded-lg divide-y divide-border mb-8">
          {automats.map((a) => (
            <div key={a.id} className="p-4 flex items-center justify-between">
              <div>
                <p className="font-mono text-sm font-semibold text-foreground">{a.name}</p>
                <p className="text-xs text-muted-foreground">{[a.address, a.city].filter(Boolean).join(" • ") || "—"}</p>
              </div>
              <span className={`text-xs px-2 py-0.5 rounded-full ${a.status === "active" ? "bg-accent/10 text-accent" : a.status === "maintenance" ? "bg-yellow-500/10 text-yellow-500" : "bg-destructive/10 text-destructive"}`}>{a.status}</span>
            </div>
          ))}
        </div>
      )}

      <h2 className="font-display text-lg font-semibold text-foreground mb-4">Bestellungen</h2>
      {orders.length === 0 ? (
        <EmptyState description="Noch keine Bestellungen erfasst." />
      ) : (
        <div className="border border-border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead><tr className="bg-muted/50"><th className="text-left px-4 py-3 font-medium text-muted-foreground">Bestellnr.</th><th className="text-left px-4 py-3 font-medium text-muted-foreground">Menge</th><th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th><th className="text-left px-4 py-3 font-medium text-muted-foreground">Datum</th></tr></thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id} className="border-t border-border">
                  <td className="px-4 py-3 font-mono text-xs">{o.order_number}</td>
                  <td className="px-4 py-3 text-muted-foreground">{o.quantity}</td>
                  <td className="px-4 py-3"><span className="text-xs px-2 py-0.5 rounded-full bg-muted">{o.status}</span></td>
                  <td className="px-4 py-3 text-muted-foreground">{new Date(o.ordered_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ClinicOverview;
