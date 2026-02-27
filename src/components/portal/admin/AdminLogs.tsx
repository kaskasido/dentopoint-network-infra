import { mockSystemLogs } from "@/data/mockAdminData";
import { AlertTriangle, Info, AlertCircle, Filter } from "lucide-react";
import { useState } from "react";

const AdminLogs = () => {
  const [levelFilter, setLevelFilter] = useState<string>("all");

  const filtered = levelFilter === "all" ? mockSystemLogs : mockSystemLogs.filter((l) => l.level === levelFilter);

  const levelConfig = {
    info: { icon: Info, color: "text-blue-500", bg: "bg-blue-500/10" },
    warning: { icon: AlertTriangle, color: "text-yellow-500", bg: "bg-yellow-500/10" },
    error: { icon: AlertCircle, color: "text-destructive", bg: "bg-destructive/10" },
  };

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-foreground mb-2">System-Logs</h1>
      <p className="text-muted-foreground text-sm mb-8">Aktivitäten und Ereignisse im System.</p>

      <div className="flex gap-2 mb-6">
        {["all", "info", "warning", "error"].map((level) => (
          <button
            key={level}
            onClick={() => setLevelFilter(level)}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              levelFilter === level ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"
            }`}
          >
            {level === "all" ? "Alle" : level.charAt(0).toUpperCase() + level.slice(1)}
            {level !== "all" && ` (${mockSystemLogs.filter((l) => l.level === level).length})`}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {filtered.map((log) => {
          const cfg = levelConfig[log.level];
          const Icon = cfg.icon;
          return (
            <div key={log.id} className="border border-border rounded-lg p-4 bg-card flex items-start gap-3">
              <div className={`p-1.5 rounded ${cfg.bg}`}>
                <Icon size={14} className={cfg.color} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-foreground">{log.action}</p>
                  <span className="text-xs text-muted-foreground shrink-0 ml-4">
                    {new Date(log.timestamp).toLocaleString("de-DE")}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-0.5">{log.details}</p>
                <p className="text-xs text-muted-foreground mt-0.5">Nutzer: {log.user}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminLogs;
