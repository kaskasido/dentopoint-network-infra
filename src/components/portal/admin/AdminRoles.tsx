import { mockAdminUsers } from "@/data/mockAdminData";
import { Shield } from "lucide-react";

const AdminRoles = () => {
  const roles = ["admin", "manufacturer", "clinic", "investor", "partner"] as const;
  const roleInfo: Record<string, { label: string; desc: string; color: string }> = {
    admin: { label: "Administrator", desc: "Vollzugriff auf alle Systeme und Nutzerverwaltung", color: "bg-purple-500/10 text-purple-500 border-purple-500/20" },
    manufacturer: { label: "Hersteller", desc: "Zugriff auf Automaten-Management, Wartung und KPIs", color: "bg-accent/10 text-accent border-accent/20" },
    clinic: { label: "Klinik", desc: "Zugriff auf eigene Automaten, Bestellungen und Feedback", color: "bg-blue-500/10 text-blue-500 border-blue-500/20" },
    investor: { label: "Investor", desc: "Zugriff auf Finanzkennzahlen, Wachstum und Regionen", color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" },
    partner: { label: "Partner", desc: "Zugriff auf Deals, Provisionen und Gebietsübersicht", color: "bg-orange-500/10 text-orange-500 border-orange-500/20" },
  };

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-foreground mb-2">Rollenverwaltung</h1>
      <p className="text-muted-foreground text-sm mb-8">Übersicht aller Rollen und zugewiesener Nutzer.</p>

      <div className="space-y-4">
        {roles.map((role) => {
          const info = roleInfo[role];
          const users = mockAdminUsers.filter((u) => u.role === role);
          return (
            <div key={role} className={`border rounded-lg p-6 bg-card ${info.color.split(" ")[2] || "border-border"}`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${info.color.split(" ").slice(0, 2).join(" ")}`}>
                    <Shield size={18} />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-foreground">{info.label}</h3>
                    <p className="text-xs text-muted-foreground">{info.desc}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${info.color.split(" ").slice(0, 2).join(" ")}`}>
                  {users.length} Nutzer
                </span>
              </div>
              {users.length > 0 && (
                <div className="mt-3 pt-3 border-t border-border flex flex-wrap gap-2">
                  {users.map((u) => (
                    <span key={u.id} className="text-xs bg-muted px-2 py-1 rounded text-muted-foreground">
                      {u.displayName} ({u.email})
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminRoles;
