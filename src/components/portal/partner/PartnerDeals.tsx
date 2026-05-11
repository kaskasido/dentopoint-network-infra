import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle, Clock, Handshake } from "lucide-react";
import EmptyState from "@/components/portal/shared/EmptyState";

const PartnerDeals = () => {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("commissions").select("*").order("created_at", { ascending: false }).then(({ data }) => {
      setRows(data ?? []);
      setLoading(false);
    });
  }, []);

  const paid = rows.filter((r) => r.status === "paid").length;
  const pending = rows.filter((r) => r.status !== "paid").length;

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-foreground mb-2">Deals</h1>
      <p className="text-muted-foreground text-sm mb-8">Deine vermittelten Geschäfte.</p>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="border border-border rounded-lg p-5 bg-card"><Handshake size={20} className="text-accent mb-2" /><p className="font-display text-2xl font-bold text-foreground">{rows.length}</p><p className="text-xs text-muted-foreground">Deals gesamt</p></div>
        <div className="border border-border rounded-lg p-5 bg-card"><CheckCircle size={20} className="text-accent mb-2" /><p className="font-display text-2xl font-bold text-foreground">{paid}</p><p className="text-xs text-muted-foreground">Bezahlt</p></div>
        <div className="border border-border rounded-lg p-5 bg-card"><Clock size={20} className="text-yellow-500 mb-2" /><p className="font-display text-2xl font-bold text-foreground">{pending}</p><p className="text-xs text-muted-foreground">Ausstehend</p></div>
      </div>

      {loading ? <p className="text-sm text-muted-foreground">Lade…</p> : rows.length === 0 ? (
        <EmptyState description="Noch keine Deals erfasst." />
      ) : (
        <div className="space-y-3">
          {rows.map((d) => (
            <div key={d.id} className="border border-border rounded-lg p-5 bg-card flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">{d.deal_name}</p>
                <p className="text-xs text-muted-foreground mt-1">{d.territory ?? "—"} • {new Date(d.created_at).toLocaleDateString()}</p>
              </div>
              <div className="flex items-center gap-4">
                <p className="font-semibold text-foreground">€{Number(d.deal_value).toLocaleString()}</p>
                <span className={`text-xs px-2.5 py-1 rounded-full ${d.status === "paid" ? "bg-accent/10 text-accent" : "bg-yellow-500/10 text-yellow-500"}`}>{d.status}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PartnerDeals;
