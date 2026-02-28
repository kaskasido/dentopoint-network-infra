import { mockAdminUsers, mockSystemLogs } from "@/data/mockAdminData";
import { Users, Shield, Building, AlertTriangle, UserCheck, UserX } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const AdminOverview = () => {
  const { t } = useLanguage();
  const ap = t.adminPortal;

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
                  <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[u.status]}`}>{u.status}</span></td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">{new Date(u.lastLogin).toLocaleString("de-DE")}</td>
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
                <span className="text-xs text-muted-foreground">{new Date(log.timestamp).toLocaleString("de-DE")}</span>
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
