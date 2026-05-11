import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Euro, CheckCircle, Clock } from "lucide-react";
import EmptyState from "@/components/portal/shared/EmptyState";

const PartnerCommissions = () => {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("commissions").select("*").order("created_at", { ascending: false }).then(({ data }) => {
      setRows(data ?? []);
      setLoading(false);
    });
  }, []);

  const totalPaid = rows.filter((r) => r.status === "paid").reduce((s, r) => s + Number(r.commission_amount ?? 0), 0);
  const totalPending = rows.filter((r) => r.status !== "paid").reduce((s, r) => s + Number(r.commission_amount ?? 0), 0);

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-foreground mb-2">Provisionen</h1>
      <p className="text-muted-foreground text-sm mb-8">Auszahlungen und offene Beträge.</p>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="border border-border rounded-lg p-5 bg-card"><Euro size={20} className="text-accent mb-2" /><p className="font-display text-2xl font-bold text-foreground">€{(totalPaid + totalPending).toLocaleString()}</p><p className="text-xs text-muted-foreground">Gesamt</p></div>
        <div className="border border-border rounded-lg p-5 bg-card"><CheckCircle size={20} className="text-accent mb-2" /><p className="font-display text-2xl font-bold text-accent">€{totalPaid.toLocaleString()}</p><p className="text-xs text-muted-foreground">Bezahlt</p></div>
        <div className="border border-border rounded-lg p-5 bg-card"><Clock size={20} className="text-yellow-500 mb-2" /><p className="font-display text-2xl font-bold text-yellow-500">€{totalPending.toLocaleString()}</p><p className="text-xs text-muted-foreground">Ausstehend</p></div>
      </div>

      {loading ? <p className="text-sm text-muted-foreground">Lade…</p> : rows.length === 0 ? (
        <EmptyState description="Noch keine Provisionen erfasst." />
      ) : (
        <div className="border border-border rounded-lg divide-y divide-border">
          {rows.map((c) => (
            <div key={c.id} className="p-5 flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">{c.deal_name}</p>
                <p className="text-xs text-muted-foreground">{new Date(c.created_at).toLocaleDateString()} • {Number(c.commission_rate)}%</p>
              </div>
              <div className="flex items-center gap-4">
                <p className="font-display text-xl font-bold text-foreground">€{Number(c.commission_amount).toLocaleString()}</p>
                <span className={`text-xs px-2.5 py-1 rounded-full inline-flex items-center gap-1 ${c.status === "paid" ? "bg-accent/10 text-accent" : "bg-yellow-500/10 text-yellow-500"}`}>
                  {c.status === "paid" ? <CheckCircle size={12} /> : <Clock size={12} />}{c.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PartnerCommissions;
