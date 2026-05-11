import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { mockAdminUsers, mockSystemLogs } from "@/data/mockAdminData";
import { Users, Shield, Building, AlertTriangle, UserCheck, UserX, Cpu, ArrowRight } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { getLocale } from "@/i18n/localeMap";

const statusTranslationMap: Record<string, string> = {
  aktiv: "statusActive",
  inaktiv: "statusInactive",
  gesperrt: "statusBlocked",
};

const AdminOverview = () => {
  const { t, lang } = useLanguage();
  const ap = (t as any).adminPortal || ({} as any);
  const md = (t as any).mockData || ({} as any);
  const locale = getLocale(lang);

  const trStatus = (status: string) => {
    const key = statusTranslationMap[status];
    return key && md[key] ? md[key] : status;
  };

  const [automatStats, setAutomatStats] = useState({ total: 0, active: 0, maintenance: 0, offline: 0 });

  useEffect(() => {
    supabase.from("automats").select("status").then(({ data }) => {
      const rows = data ?? [];
      setAutomatStats({
        total: rows.length,
        active: rows.filter((r: any) => r.status === "active").length,
        maintenance: rows.filter((r: any) => r.status === "maintenance").length,
        offline: rows.filter((r: any) => r.status === "offline").length,
      });
    });
  }, []);

  const activeUsers = mockAdminUsers.filter((u) => u.status === "aktiv").length;

  const stats = [
    { label: ap.totalUsers, value: mockAdminUsers.length, icon: Users, color: "text-accent" },
    { label: ap.active, value: activeUsers, icon: UserCheck, color: "text-accent" },
    { label: ap.blocked, value: mockAdminUsers.filter((u) => u.status === "gesperrt").length, icon: UserX, color: "text-destructive" },
    { label: ap.organizations, value: new Set(mockAdminUsers.map((u) => u.organization)).size, icon: Building, color: "text-accent" },
  ];

  const roleColors: Record<string, string> = {
    admin: "bg-purple-500/10 text-purple-500",
    manufacturer: "bg-accent/10 text-accent",
    clinic: "bg-blue-500/10 text-blue-500",
    investor: "bg-yellow-500/10 text-yellow-500",
    partner: "bg-orange-500/10 text-orange-500",
  };

  const statusColors: Record<string, string> = {
    aktiv: "bg-accent/10 text-accent",
    inaktiv: "bg-muted text-muted-foreground",
    gesperrt: "bg-destructive/10 text-destructive",
  };

  const logLevelColors: Record<string, string> = {
    info: "text-blue-500",
    warning: "text-yellow-500",
    error: "text-destructive",
  };

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-foreground mb-2">{ap.dashboardTitle}</h1>
      <p className="text-muted-foreground text-sm mb-8">{ap.dashboardDesc}</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="border border-border rounded-lg p-5 bg-card">
            <s.icon size={20} className={`${s.color} mb-3`} />
            <p className="font-display text-2xl font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="border border-border rounded-lg p-5 bg-card mb-8">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <Cpu size={20} className="text-accent" />
            <div>
              <h2 className="font-display text-lg font-semibold text-foreground">Automaten</h2>
              <p className="text-xs text-muted-foreground">Hinzufügen, bearbeiten und löschen</p>
            </div>
          </div>
          <Link
            to="/portal/admin/automats"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            Verwalten <ArrowRight size={14} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="rounded-md bg-muted/40 p-3">
            <p className="text-xs text-muted-foreground">Gesamt</p>
            <p className="font-display text-xl font-bold text-foreground">{automatStats.total}</p>
          </div>
          <div className="rounded-md bg-accent/10 p-3">
            <p className="text-xs text-muted-foreground">Aktiv</p>
            <p className="font-display text-xl font-bold text-accent">{automatStats.active}</p>
          </div>
          <div className="rounded-md bg-yellow-500/10 p-3">
            <p className="text-xs text-muted-foreground">Wartung</p>
            <p className="font-display text-xl font-bold text-yellow-500">{automatStats.maintenance}</p>
          </div>
          <div className="rounded-md bg-destructive/10 p-3">
            <p className="text-xs text-muted-foreground">Offline</p>
            <p className="font-display text-xl font-bold text-destructive">{automatStats.offline}</p>
          </div>
        </div>
      </div>

      <h2 className="font-display text-lg font-semibold text-foreground mb-4">{ap.allUsers}</h2>
      <div className="border border-border rounded-lg overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">{ap.name}</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">{ap.email}</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">{ap.role}</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">{ap.organization}</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">{ap.status}</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">{ap.lastLogin}</th>
              </tr>
            </thead>
            <tbody>
              {mockAdminUsers.map((u) => (
                <tr key={u.id} className="border-t border-border hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground">{u.displayName}</td>
                  <td className="px-4 py-3 text-muted-foreground">{u.email}</td>
                  <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${roleColors[u.role]}`}>{u.role}</span></td>
                  <td className="px-4 py-3 text-muted-foreground">{u.organization}</td>
                  <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[u.status]}`}>{trStatus(u.status)}</span></td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">{new Date(u.lastLogin).toLocaleString(locale)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <h2 className="font-display text-lg font-semibold text-foreground mb-4">{ap.systemLogs}</h2>
      <div className="border border-border rounded-lg divide-y divide-border">
        {mockSystemLogs.map((log) => (
          <div key={log.id} className="p-4 flex items-start gap-3">
            <AlertTriangle size={16} className={`mt-0.5 ${logLevelColors[log.level]}`} />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-foreground">{log.action}</p>
                <span className="text-xs text-muted-foreground">{new Date(log.timestamp).toLocaleString(locale)}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">{log.details}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{ap.by}: {log.user}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminOverview;
