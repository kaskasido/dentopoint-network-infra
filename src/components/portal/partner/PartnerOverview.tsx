import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Handshake, Euro, Coins, CheckCircle, Clock } from "lucide-react";
import EmptyState from "@/components/portal/shared/EmptyState";

const PartnerOverview = () => {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("commissions").select("*").order("created_at", { ascending: false }).then(({ data }) => {
      setRows(data ?? []);
      setLoading(false);
    });
  }, []);

  const closed = rows.filter((r) => r.status === "paid").length;
  const totalDealValue = rows.reduce((s, r) => s + Number(r.deal_value ?? 0), 0);
  const totalCommissions = rows.reduce((s, r) => s + Number(r.commission_amount ?? 0), 0);

  const stats = [
    { label: "Deals gesamt", value: rows.length, icon: Handshake },
    { label: "Bezahlt", value: closed, icon: CheckCircle },
    { label: "Deal-Volumen", value: `€${totalDealValue.toLocaleString()}`, icon: Euro },
    { label: "Provisionen", value: `€${totalCommissions.toLocaleString()}`, icon: Coins },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-foreground mb-2">Partner Dashboard</h1>
      <p className="text-muted-foreground text-sm mb-8">Deine Deals und Provisionen.</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="border border-border rounded-lg p-5 bg-card">
            <s.icon size={20} className="text-accent mb-3" />
            <p className="font-display text-2xl font-bold text-foreground">{loading ? "…" : s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <h2 className="font-display text-lg font-semibold text-foreground mb-4">Deal-Pipeline</h2>
      {rows.length === 0 ? (
        <EmptyState description="Noch keine Deals erfasst." />
      ) : (
        <div className="border border-border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead><tr className="bg-muted/50"><th className="text-left px-4 py-3 font-medium text-muted-foreground">Deal</th><th className="text-left px-4 py-3 font-medium text-muted-foreground">Wert</th><th className="text-left px-4 py-3 font-medium text-muted-foreground">Provision</th><th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th><th className="text-left px-4 py-3 font-medium text-muted-foreground">Datum</th></tr></thead>
            <tbody>
              {rows.map((d) => (
                <tr key={d.id} className="border-t border-border">
                  <td className="px-4 py-3 font-medium text-foreground">{d.deal_name}</td>
                  <td className="px-4 py-3 text-foreground">€{Number(d.deal_value).toLocaleString()}</td>
                  <td className="px-4 py-3 text-foreground">€{Number(d.commission_amount).toLocaleString()}</td>
                  <td className="px-4 py-3"><span className={`text-xs px-2 py-0.5 rounded-full ${d.status === "paid" ? "bg-accent/10 text-accent" : "bg-yellow-500/10 text-yellow-500"}`}>{d.status}</span></td>
                  <td className="px-4 py-3 text-muted-foreground">{new Date(d.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PartnerOverview;
