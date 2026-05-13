import { useState } from "react";
import { useAdminTable } from "@/hooks/useAdminTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ConfirmDeleteDialog from "./shared/ConfirmDeleteDialog";
import { Plus, Pencil, Search } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type Profile = {
  id: string;
  user_id: string;
  display_name: string | null;
  org_id: string | null;
  created_at: string;
};

type UserRole = {
  id: string;
  user_id: string;
  role: "admin" | "manufacturer" | "clinic" | "partner";
};

const ROLES: UserRole["role"][] = ["admin", "manufacturer", "clinic", "partner"];

const profileSchema = z.object({
  display_name: z.string().trim().min(1, "Name erforderlich").max(120),
});

const AdminUsers = () => {
  const { rows: profiles, loading, update, remove, reload } = useAdminTable<Profile>("profiles", {
    orderBy: { column: "created_at", ascending: false },
  });
  const { rows: roles, insert: insertRole, remove: removeRole, reload: reloadRoles } =
    useAdminTable<UserRole>("user_roles", { orderBy: { column: "created_at", ascending: false } });

  const [filter, setFilter] = useState("");
  const [editing, setEditing] = useState<Profile | null>(null);
  const [editName, setEditName] = useState("");
  const [adding, setAdding] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newName, setNewName] = useState("");
  const [newRole, setNewRole] = useState<UserRole["role"] | "">("");
  const [creating, setCreating] = useState(false);

  const handleCreateUser = async () => {
    if (!newEmail || !newPassword) {
      toast.error("E-Mail und Passwort erforderlich");
      return;
    }
    setCreating(true);
    const { data, error } = await supabase.functions.invoke("admin-create-user", {
      body: {
        email: newEmail.trim(),
        password: newPassword,
        display_name: newName.trim() || undefined,
        role: newRole || undefined,
      },
    });
    setCreating(false);
    if (error || (data as any)?.error) {
      toast.error((data as any)?.error ?? error?.message ?? "Erstellung fehlgeschlagen");
      return;
    }
    toast.success("Benutzer erstellt");
    setAdding(false);
    setNewEmail(""); setNewPassword(""); setNewName(""); setNewRole("");
    await reload();
    await reloadRoles();
  };

  const rolesByUser = (userId: string) => roles.filter((r) => r.user_id === userId);

  const filtered = profiles.filter((p) =>
    (p.display_name ?? "").toLowerCase().includes(filter.toLowerCase()),
  );

  const handleEditSave = async () => {
    if (!editing) return;
    const parsed = profileSchema.safeParse({ display_name: editName });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    const ok = await update(editing.id, { display_name: parsed.data.display_name });
    if (ok) setEditing(null);
  };

  const addRole = async (userId: string, role: UserRole["role"]) => {
    const exists = roles.some((r) => r.user_id === userId && r.role === role);
    if (exists) {
      toast.info("Rolle bereits zugewiesen");
      return;
    }
    await insertRole({ user_id: userId, role });
  };

  const roleColors: Record<string, string> = {
    admin: "bg-purple-500/10 text-purple-500",
    manufacturer: "bg-accent/10 text-accent",
    clinic: "bg-blue-500/10 text-blue-500",
    partner: "bg-orange-500/10 text-orange-500",
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h1 className="font-display text-2xl font-bold text-foreground">Benutzer & Rollen</h1>
        <Button onClick={() => setAdding(true)} size="sm">
          <Plus size={16} /> Benutzer hinzufügen
        </Button>
      </div>
      <p className="text-muted-foreground text-sm mb-6">
        Verwalte Profile, lege neue Benutzer an und weise Rollen zu.
      </p>

      <div className="relative mb-4">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Suche nach Name…"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="pl-10"
        />
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground">Lade…</p>
      ) : filtered.length === 0 ? (
        <p className="text-sm text-muted-foreground">Keine Benutzer gefunden.</p>
      ) : (
        <div className="border border-border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50 text-left">
                <th className="px-4 py-3 font-medium text-muted-foreground">Name</th>
                <th className="px-4 py-3 font-medium text-muted-foreground">Rollen</th>
                <th className="px-4 py-3 font-medium text-muted-foreground">Rolle hinzufügen</th>
                <th className="px-4 py-3 font-medium text-muted-foreground">Erstellt</th>
                <th className="px-4 py-3 font-medium text-muted-foreground text-right">Aktionen</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => (
                <tr key={p.id} className="border-t border-border hover:bg-muted/30">
                  <td className="px-4 py-3 font-medium text-foreground">{p.display_name ?? "—"}</td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {rolesByUser(p.user_id).length === 0 && (
                        <span className="text-xs text-muted-foreground">keine</span>
                      )}
                      {rolesByUser(p.user_id).map((r) => (
                        <span
                          key={r.id}
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${roleColors[r.role]}`}
                        >
                          {r.role}
                          <button
                            onClick={async () => {
                              if (confirm(`Rolle "${r.role}" entfernen?`)) await removeRole(r.id);
                            }}
                            className="ml-1 opacity-60 hover:opacity-100"
                            aria-label="Rolle entfernen"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Select onValueChange={(v) => addRole(p.user_id, v as UserRole["role"])}>
                      <SelectTrigger className="h-8 w-36">
                        <SelectValue placeholder="+ Rolle" />
                      </SelectTrigger>
                      <SelectContent>
                        {ROLES.map((r) => (
                          <SelectItem key={r} value={r}>
                            {r}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">
                    {new Date(p.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => {
                          setEditing(p);
                          setEditName(p.display_name ?? "");
                        }}
                      >
                        <Pencil size={14} />
                      </Button>
                      <ConfirmDeleteDialog
                        title="Profil löschen?"
                        description="Das Profil wird entfernt. Der Auth-Benutzer bleibt erhalten und muss separat gelöscht werden."
                        onConfirm={() => remove(p.id)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Dialog open={!!editing} onOpenChange={(o) => !o && setEditing(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Profil bearbeiten</DialogTitle>
            <DialogDescription>Anzeigename des Benutzers ändern.</DialogDescription>
          </DialogHeader>
          <div className="space-y-2">
            <Label htmlFor="display_name">Anzeigename</Label>
            <Input id="display_name" value={editName} onChange={(e) => setEditName(e.target.value)} />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditing(null)}>
              Abbrechen
            </Button>
            <Button onClick={handleEditSave}>Speichern</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminUsers;
