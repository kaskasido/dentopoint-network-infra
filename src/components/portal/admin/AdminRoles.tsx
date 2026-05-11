import { useAdminTable } from "@/hooks/useAdminTable";
import { Shield } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

type UserRole = { id: string; user_id: string; role: string };
type Profile = { id: string; user_id: string; display_name: string | null };

const AdminRoles = () => {
  const { t } = useLanguage();
  const ap = t.adminPortal;
  const { rows: roles, loading } = useAdminTable<UserRole>("user_roles");
  const { rows: profiles } = useAdminTable<Profile>("profiles");

  const allRoles = ["admin", "manufacturer", "clinic", "investor", "partner"] as const;
  const roleInfo: Record<string, { label: string; desc: string; color: string }> = {
    admin: { label: ap.administrator, desc: ap.adminRoleDesc, color: "bg-purple-500/10 text-purple-500 border-purple-500/20" },
    manufacturer: { label: ap.manufacturerRole, desc: ap.manufacturerRoleDesc, color: "bg-accent/10 text-accent border-accent/20" },
    clinic: { label: ap.clinicRole, desc: ap.clinicRoleDesc, color: "bg-blue-500/10 text-blue-500 border-blue-500/20" },
    investor: { label: ap.investorRole, desc: ap.investorRoleDesc, color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" },
    partner: { label: ap.partnerRole, desc: ap.partnerRoleDesc, color: "bg-orange-500/10 text-orange-500 border-orange-500/20" },
  };

  const nameOf = (uid: string) => profiles.find((p) => p.user_id === uid)?.display_name ?? uid.slice(0, 8);

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-foreground mb-2">{ap.rolesTitle}</h1>
      <p className="text-muted-foreground text-sm mb-8">
        {ap.rolesDesc} Rollen werden im Bereich „Benutzer & Rollen" zugewiesen.
      </p>

      {loading ? (
        <p className="text-sm text-muted-foreground">Lade…</p>
      ) : (
        <div className="space-y-4">
          {allRoles.map((role) => {
            const info = roleInfo[role];
            const users = roles.filter((r) => r.role === role);
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
                    {users.length} {ap.usersCount}
                  </span>
                </div>
                {users.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-border flex flex-wrap gap-2">
                    {users.map((u) => (
                      <span key={u.id} className="text-xs bg-muted px-2 py-1 rounded text-muted-foreground">
                        {nameOf(u.user_id)}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminRoles;
