import { mockAdminUsers } from "@/data/mockAdminData";
import { Search } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { getLocale } from "@/i18n/localeMap";

const statusTranslationMap: Record<string, string> = {
  aktiv: "statusActive",
  inaktiv: "statusInactive",
  gesperrt: "statusBlocked",
};

const AdminUsers = () => {
  const { t, lang } = useLanguage();
  const ap = (t as any).adminPortal || ({} as any);
  const md = (t as any).mockData || ({} as any);
  const locale = getLocale(lang);
  const [filter, setFilter] = useState("");

  const trStatus = (status: string) => {
    const key = statusTranslationMap[status];
    return key && md[key] ? md[key] : status;
  };

  const filtered = mockAdminUsers.filter((u) =>
    u.displayName.toLowerCase().includes(filter.toLowerCase()) ||
    u.email.toLowerCase().includes(filter.toLowerCase()) ||
    u.organization.toLowerCase().includes(filter.toLowerCase())
  );

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

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-foreground mb-2">{ap.usersTitle}</h1>
      <p className="text-muted-foreground text-sm mb-8">{ap.usersDesc}</p>

      <div className="relative mb-6">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input type="text" placeholder={ap.searchUsers} value={filter} onChange={(e) => setFilter(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-md border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
      </div>

      <div className="border border-border rounded-lg overflow-hidden">
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
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">{ap.createdAt}</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u.id} className="border-t border-border hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground">{u.displayName}</td>
                  <td className="px-4 py-3 text-muted-foreground">{u.email}</td>
                  <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${roleColors[u.role]}`}>{u.role}</span></td>
                  <td className="px-4 py-3 text-muted-foreground">{u.organization}</td>
                  <td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[u.status]}`}>{trStatus(u.status)}</span></td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">{new Date(u.lastLogin).toLocaleString(locale)}</td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">{new Date(u.createdAt).toLocaleDateString(locale)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <p className="text-xs text-muted-foreground mt-2">{filtered.length} {ap.ofUsers} {mockAdminUsers.length} {ap.users}</p>
    </div>
  );
};

export default AdminUsers;
