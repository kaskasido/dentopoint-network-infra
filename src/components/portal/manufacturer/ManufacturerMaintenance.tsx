import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Wrench, Clock, User } from "lucide-react";
import EmptyState from "@/components/portal/shared/EmptyState";

const ManufacturerMaintenance = () => {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("maintenance_logs").select("*").order("scheduled_at", { ascending: false }).then(({ data }) => {
      setRows(data ?? []);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-foreground mb-2">Wartung</h1>
      <p className="text-muted-foreground text-sm mb-8">Wartungsverlauf aller Automaten.</p>

      {loading ? <p className="text-sm text-muted-foreground">Lade…</p> : rows.length === 0 ? (
        <EmptyState description="Noch keine Wartungseinträge – Wartungen können im Admin-Portal erfasst werden." />
      ) : (
        <div className="border border-border rounded-lg overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="bg-muted/50"><th className="text-left px-4 py-3 font-medium text-muted-foreground">Geplant</th><th className="text-left px-4 py-3 font-medium text-muted-foreground">Typ</th><th className="text-left px-4 py-3 font-medium text-muted-foreground">Techniker</th><th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th><th className="text-left px-4 py-3 font-medium text-muted-foreground">Beschreibung</th></tr></thead>
            <tbody>
              {rows.map((m) => (
                <tr key={m.id} className="border-t border-border">
                  <td className="px-4 py-3 text-foreground">{m.scheduled_at ? new Date(m.scheduled_at).toLocaleDateString() : "—"}</td>
                  <td className="px-4 py-3"><span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium bg-accent/10 text-accent"><Wrench size={12} />{m.maintenance_type}</span></td>
                  <td className="px-4 py-3 text-muted-foreground"><span className="inline-flex items-center gap-1"><User size={12} />{m.technician_name ?? "—"}</span></td>
                  <td className="px-4 py-3"><span className="text-xs px-2 py-0.5 rounded-full bg-muted">{m.status}</span></td>
                  <td className="px-4 py-3 text-muted-foreground max-w-xs truncate">{m.description ?? "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManufacturerMaintenance;
