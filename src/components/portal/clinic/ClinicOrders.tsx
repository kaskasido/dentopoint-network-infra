import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Package, Truck, Clock, CheckCircle } from "lucide-react";
import EmptyState from "@/components/portal/shared/EmptyState";

const ClinicOrders = () => {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("orders").select("*").order("ordered_at", { ascending: false }).then(({ data }) => {
      setRows(data ?? []);
      setLoading(false);
    });
  }, []);

  const delivered = rows.filter((o) => o.status === "delivered").length;
  const ordered = rows.filter((o) => o.status === "ordered").length;
  const pending = rows.filter((o) => o.status === "pending").length;

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-foreground mb-2">Bestellungen</h1>
      <p className="text-muted-foreground text-sm mb-8">Bestellverlauf deiner Klinik.</p>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="border border-border rounded-lg p-5 bg-card"><CheckCircle size={20} className="text-accent mb-2" /><p className="font-display text-2xl font-bold text-foreground">{delivered}</p><p className="text-xs text-muted-foreground">Geliefert</p></div>
        <div className="border border-border rounded-lg p-5 bg-card"><Truck size={20} className="text-blue-500 mb-2" /><p className="font-display text-2xl font-bold text-foreground">{ordered}</p><p className="text-xs text-muted-foreground">Bestellt</p></div>
        <div className="border border-border rounded-lg p-5 bg-card"><Clock size={20} className="text-yellow-500 mb-2" /><p className="font-display text-2xl font-bold text-foreground">{pending}</p><p className="text-xs text-muted-foreground">Ausstehend</p></div>
      </div>

      {loading ? <p className="text-sm text-muted-foreground">Lade…</p> : rows.length === 0 ? (
        <EmptyState description="Noch keine Bestellungen erfasst." />
      ) : (
        <div className="border border-border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead><tr className="bg-muted/50"><th className="text-left px-4 py-3 font-medium text-muted-foreground">Bestellnr.</th><th className="text-left px-4 py-3 font-medium text-muted-foreground">Menge</th><th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th><th className="text-left px-4 py-3 font-medium text-muted-foreground">Betrag</th><th className="text-left px-4 py-3 font-medium text-muted-foreground">Datum</th></tr></thead>
            <tbody>
              {rows.map((o) => (
                <tr key={o.id} className="border-t border-border">
                  <td className="px-4 py-3 font-mono text-xs flex items-center gap-2"><Package size={14} className="text-muted-foreground" />{o.order_number}</td>
                  <td className="px-4 py-3 text-muted-foreground">{o.quantity}</td>
                  <td className="px-4 py-3"><span className="text-xs px-2 py-0.5 rounded-full bg-muted">{o.status}</span></td>
                  <td className="px-4 py-3 text-foreground">{o.total_amount ? `${Number(o.total_amount).toFixed(2)} ${o.currency}` : "—"}</td>
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

export default ClinicOrders;
