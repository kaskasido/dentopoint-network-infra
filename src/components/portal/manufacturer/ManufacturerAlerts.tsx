import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AlertTriangle, AlertCircle, Info, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import EmptyState from "@/components/portal/shared/EmptyState";

const iconMap: Record<string, any> = { critical: AlertTriangle, error: AlertTriangle, warning: AlertCircle, info: Info };
const colorMap: Record<string, string> = {
  critical: "text-destructive bg-destructive/10 border-destructive/20",
  error: "text-destructive bg-destructive/10 border-destructive/20",
  warning: "text-yellow-600 bg-yellow-500/10 border-yellow-500/20",
  info: "text-accent bg-accent/10 border-accent/20",
};

const ManufacturerAlerts = () => {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    const { data } = await supabase.from("alerts").select("*").order("created_at", { ascending: false });
    setRows(data ?? []);
    setLoading(false);
  };
  useEffect(() => { load(); }, []);

  const ack = async (id: string) => {
    const { error } = await supabase.from("alerts").update({ acknowledged: true, acknowledged_at: new Date().toISOString() }).eq("id", id);
    if (error) toast.error(error.message); else { toast.success("Bestätigt"); load(); }
  };

  const open = rows.filter((a) => !a.acknowledged);
  const closed = rows.filter((a) => a.acknowledged);

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-foreground mb-2">Alerts</h1>
      <p className="text-muted-foreground text-sm mb-8">Systembenachrichtigungen aus dem Netzwerk.</p>

      {loading ? <p className="text-sm text-muted-foreground">Lade…</p> : rows.length === 0 ? (
        <EmptyState description="Keine Alerts vorhanden." />
      ) : (
        <>
          <h2 className="font-display text-lg font-semibold text-foreground mb-4">Offen ({open.length})</h2>
          <div className="space-y-3 mb-10">
            {open.map((a) => {
              const Icon = iconMap[a.severity] ?? Info;
              return (
                <div key={a.id} className={`border rounded-lg p-4 flex items-start gap-4 ${colorMap[a.severity] ?? colorMap.info}`}>
                  <Icon size={20} className="shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{a.title}</p>
                    {a.message && <p className="text-xs opacity-80 mt-1">{a.message}</p>}
                    <p className="text-xs opacity-60 mt-1">{new Date(a.created_at).toLocaleString()}</p>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => ack(a.id)}>Bestätigen</Button>
                </div>
              );
            })}
            {open.length === 0 && <p className="text-sm text-muted-foreground">Keine offenen Alerts.</p>}
          </div>

          {closed.length > 0 && (
            <>
              <h2 className="font-display text-lg font-semibold text-foreground mb-4">Bestätigt ({closed.length})</h2>
              <div className="space-y-3">
                {closed.map((a) => (
                  <div key={a.id} className="border border-border rounded-lg p-4 flex items-start gap-4 bg-muted/30 opacity-70">
                    <CheckCircle size={20} className="text-accent shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm text-foreground">{a.title}</p>
                      <p className="text-xs text-muted-foreground mt-1">{new Date(a.created_at).toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ManufacturerAlerts;
