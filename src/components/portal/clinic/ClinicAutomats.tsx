import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Wifi, WifiOff, Wrench } from "lucide-react";
import EmptyState from "@/components/portal/shared/EmptyState";

const ClinicAutomats = () => {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("automats").select("*").order("name").then(({ data }) => {
      setRows(data ?? []);
      setLoading(false);
    });
  }, []);

  const statusIcon = (s: string) => s === "active" ? <Wifi size={12} /> : s === "offline" ? <WifiOff size={12} /> : <Wrench size={12} />;
  const statusClass = (s: string) => s === "active" ? "bg-accent/10 text-accent" : s === "offline" ? "bg-destructive/10 text-destructive" : "bg-yellow-500/10 text-yellow-500";

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-foreground mb-2">Automaten</h1>
      <p className="text-muted-foreground text-sm mb-8">Module deiner Klinik im Überblick.</p>

      {loading ? (
        <p className="text-sm text-muted-foreground">Lade…</p>
      ) : rows.length === 0 ? (
        <EmptyState description="Sobald deiner Klinik Module zugewiesen werden, erscheinen sie hier." />
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {rows.map((a) => (
            <div key={a.id} className="border border-border rounded-lg bg-card p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="font-mono text-lg font-bold text-foreground">{a.name}</p>
                  <p className="text-sm text-muted-foreground">{[a.address, a.city, a.country].filter(Boolean).join(" • ") || "—"}</p>
                </div>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${statusClass(a.status)}`}>
                  {statusIcon(a.status)} {a.status}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground">Seriennummer</p>
                  <p className="font-mono text-foreground">{a.serial_number}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Installiert</p>
                  <p className="text-foreground">{a.installed_at ? new Date(a.installed_at).toLocaleDateString() : "—"}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClinicAutomats;
