import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Box, Wifi, WifiOff, Wrench, AlertTriangle } from "lucide-react";
import EmptyState from "@/components/portal/shared/EmptyState";

const ManufacturerOverview = () => {
  const [rows, setRows] = useState<any[]>([]);
  const [alerts, setAlerts] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [a, al] = await Promise.all([
        supabase.from("automats").select("*").order("created_at", { ascending: false }),
        supabase.from("alerts").select("id", { count: "exact", head: true }).eq("acknowledged", false),
      ]);
      setRows(a.data ?? []);
      setAlerts(al.count ?? 0);
      setLoading(false);
    })();
  }, []);

  const online = rows.filter((a) => a.status === "active").length;
  const offline = rows.filter((a) => a.status === "offline").length;
  const wartung = rows.filter((a) => a.status === "maintenance").length;

  const stats = [
    { label: "Automaten gesamt", value: rows.length, icon: Box, color: "text-accent" },
    { label: "Aktiv", value: online, icon: Wifi, color: "text-accent" },
    { label: "Offline", value: offline, icon: WifiOff, color: "text-destructive" },
    { label: "Wartung", value: wartung, icon: Wrench, color: "text-yellow-500" },
    { label: "Offene Alerts", value: alerts, icon: AlertTriangle, color: alerts > 0 ? "text-destructive" : "text-accent" },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-foreground mb-2">Hersteller Dashboard</h1>
      <p className="text-muted-foreground text-sm mb-8">Echtzeit-Überblick über das gesamte Automaten-Netzwerk.</p>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="border border-border rounded-lg p-5 bg-card">
            <s.icon size={20} className={`${s.color} mb-3`} />
            <p className="font-display text-2xl font-bold text-foreground">{loading ? "…" : s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <h2 className="font-display text-lg font-semibold text-foreground mb-4">Alle Automaten</h2>
      {rows.length === 0 ? (
        <EmptyState description="Noch keine Automaten im Netzwerk." />
      ) : (
        <div className="border border-border rounded-lg overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="bg-muted/50"><th className="text-left px-4 py-3 font-medium text-muted-foreground">Name</th><th className="text-left px-4 py-3 font-medium text-muted-foreground">Seriennr.</th><th className="text-left px-4 py-3 font-medium text-muted-foreground">Stadt</th><th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th><th className="text-left px-4 py-3 font-medium text-muted-foreground">Installiert</th></tr></thead>
            <tbody>
              {rows.map((a) => (
                <tr key={a.id} className="border-t border-border">
                  <td className="px-4 py-3 font-medium text-foreground">{a.name}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{a.serial_number}</td>
                  <td className="px-4 py-3 text-muted-foreground">{[a.city, a.country].filter(Boolean).join(", ") || "—"}</td>
                  <td className="px-4 py-3"><span className={`text-xs px-2 py-0.5 rounded-full ${a.status === "active" ? "bg-accent/10 text-accent" : a.status === "offline" ? "bg-destructive/10 text-destructive" : "bg-yellow-500/10 text-yellow-500"}`}>{a.status}</span></td>
                  <td className="px-4 py-3 text-muted-foreground">{a.installed_at ? new Date(a.installed_at).toLocaleDateString() : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManufacturerOverview;
