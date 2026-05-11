import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Activity, Box, Wrench, AlertTriangle } from "lucide-react";
import EmptyState from "@/components/portal/shared/EmptyState";

const ManufacturerKPIs = () => {
  const [stats, setStats] = useState({ total: 0, active: 0, maint: 0, offline: 0, alerts: 0, maintLogs: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [a, al, ml] = await Promise.all([
        supabase.from("automats").select("status"),
        supabase.from("alerts").select("id", { count: "exact", head: true }).eq("acknowledged", false),
        supabase.from("maintenance_logs").select("id", { count: "exact", head: true }),
      ]);
      const r = a.data ?? [];
      setStats({
        total: r.length,
        active: r.filter((x: any) => x.status === "active").length,
        maint: r.filter((x: any) => x.status === "maintenance").length,
        offline: r.filter((x: any) => x.status === "offline").length,
        alerts: al.count ?? 0,
        maintLogs: ml.count ?? 0,
      });
      setLoading(false);
    })();
  }, []);

  const uptimeRate = stats.total ? Math.round((stats.active / stats.total) * 100) : 0;

  const kpis = [
    { label: "Uptime-Quote", value: `${uptimeRate}%`, icon: Activity },
    { label: "Automaten gesamt", value: stats.total, icon: Box },
    { label: "Wartungseinträge", value: stats.maintLogs, icon: Wrench },
    { label: "Offene Alerts", value: stats.alerts, icon: AlertTriangle },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-foreground mb-2">KPIs</h1>
      <p className="text-muted-foreground text-sm mb-8">Live-Kennzahlen auf Basis deiner Netzwerkdaten.</p>

      {loading ? <p className="text-sm text-muted-foreground">Lade…</p> : (
        <>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {kpis.map((k) => (
              <div key={k.label} className="border border-border rounded-lg p-5 bg-card">
                <k.icon size={20} className="text-accent mb-3" />
                <p className="font-display text-2xl font-bold text-foreground">{k.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{k.label}</p>
              </div>
            ))}
          </div>
          {stats.total === 0 && <EmptyState description="Noch keine Automaten erfasst – KPIs werden berechnet, sobald Daten vorhanden sind." />}
        </>
      )}
    </div>
  );
};

export default ManufacturerKPIs;
