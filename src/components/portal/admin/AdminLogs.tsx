import { useAdminTable } from "@/hooks/useAdminTable";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Info, AlertCircle, Check } from "lucide-react";
import { useState } from "react";
import ConfirmDeleteDialog from "./shared/ConfirmDeleteDialog";

type Alert = {
  id: string;
  title: string;
  message: string | null;
  severity: string;
  acknowledged: boolean;
  acknowledged_at: string | null;
  created_at: string;
};

const AdminLogs = () => {
  const { rows, loading, update, remove } = useAdminTable<Alert>("alerts", {
    orderBy: { column: "created_at", ascending: false },
  });
  const [filter, setFilter] = useState<string>("all");

  const filtered = filter === "all" ? rows : rows.filter((r) => r.severity === filter);

  const cfg: Record<string, { icon: typeof Info; color: string; bg: string }> = {
    info: { icon: Info, color: "text-blue-500", bg: "bg-blue-500/10" },
    warning: { icon: AlertTriangle, color: "text-yellow-500", bg: "bg-yellow-500/10" },
    error: { icon: AlertCircle, color: "text-destructive", bg: "bg-destructive/10" },
    critical: { icon: AlertCircle, color: "text-destructive", bg: "bg-destructive/10" },
  };

  const acknowledge = (id: string) =>
    update(id, { acknowledged: true, acknowledged_at: new Date().toISOString() });

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-foreground mb-2">System-Alerts</h1>
      <p className="text-muted-foreground text-sm mb-6">Alerts bestätigen oder löschen.</p>

      <div className="flex gap-2 mb-6">
        {["all", "info", "warning", "error", "critical"].map((level) => (
          <button
            key={level}
            onClick={() => setFilter(level)}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              filter === level ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {level}
            {level !== "all" && ` (${rows.filter((r) => r.severity === level).length})`}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground">Lade…</p>
      ) : filtered.length === 0 ? (
        <p className="text-sm text-muted-foreground">Keine Alerts.</p>
      ) : (
        <div className="space-y-2">
          {filtered.map((a) => {
            const c = cfg[a.severity] ?? cfg.info;
            const Icon = c.icon;
            return (
              <div key={a.id} className="border border-border rounded-lg p-4 bg-card flex items-start gap-3">
                <div className={`p-1.5 rounded ${c.bg}`}>
                  <Icon size={14} className={c.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium text-foreground">
                      {a.title}
                      {a.acknowledged && <span className="ml-2 text-xs text-accent">✓ bestätigt</span>}
                    </p>
                    <span className="text-xs text-muted-foreground shrink-0">
                      {new Date(a.created_at).toLocaleString()}
                    </span>
                  </div>
                  {a.message && <p className="text-xs text-muted-foreground mt-0.5">{a.message}</p>}
                </div>
                <div className="flex items-center gap-1">
                  {!a.acknowledged && (
                    <Button size="sm" variant="outline" onClick={() => acknowledge(a.id)}>
                      <Check size={14} /> Bestätigen
                    </Button>
                  )}
                  <ConfirmDeleteDialog onConfirm={() => remove(a.id)} />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminLogs;
