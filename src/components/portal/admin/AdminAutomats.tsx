import { useState } from "react";
import { useAdminTable } from "@/hooks/useAdminTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { Plus, Pencil } from "lucide-react";
import { z } from "zod";

type Automat = {
  id: string;
  name: string;
  serial_number: string;
  status: string;
  city: string | null;
  address: string | null;
  country: string | null;
  latitude: number | null;
  longitude: number | null;
  installed_at: string | null;
  created_at: string;
};

const schema = z.object({
  name: z.string().trim().min(1, "Name erforderlich").max(120),
  serial_number: z.string().trim().min(1, "Seriennummer erforderlich").max(80),
  status: z.enum(["active", "maintenance", "offline"]),
  city: z.string().trim().max(120).optional().or(z.literal("")),
  address: z.string().trim().max(255).optional().or(z.literal("")),
  country: z.string().trim().max(2).optional().or(z.literal("")),
  latitude: z.string().optional(),
  longitude: z.string().optional(),
});

const empty = { name: "", serial_number: "", status: "active", city: "", address: "", country: "DE", latitude: "", longitude: "" };

const AdminAutomats = () => {
  const { rows, loading, insert, update, remove } = useAdminTable<Automat>("automats", {
    orderBy: { column: "created_at", ascending: false },
  });
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Automat | null>(null);
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const startCreate = () => {
    setEditing(null);
    setForm(empty);
    setErrors({});
    setOpen(true);
  };

  const startEdit = (a: Automat) => {
    setEditing(a);
    setForm({
      name: a.name,
      serial_number: a.serial_number,
      status: a.status,
      city: a.city ?? "",
      address: a.address ?? "",
      country: a.country ?? "DE",
      latitude: a.latitude?.toString() ?? "",
      longitude: a.longitude?.toString() ?? "",
    });
    setErrors({});
    setOpen(true);
  };

  const submit = async () => {
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => (errs[i.path[0] as string] = i.message));
      setErrors(errs);
      return;
    }
    const payload = {
      name: parsed.data.name,
      serial_number: parsed.data.serial_number,
      status: parsed.data.status,
      city: parsed.data.city || null,
      address: parsed.data.address || null,
      country: parsed.data.country || null,
      latitude: parsed.data.latitude ? Number(parsed.data.latitude) : null,
      longitude: parsed.data.longitude ? Number(parsed.data.longitude) : null,
    };
    const ok = editing ? await update(editing.id, payload) : await insert(payload);
    if (ok) setOpen(false);
  };

  const statusBadge: Record<string, string> = {
    active: "bg-accent/10 text-accent",
    maintenance: "bg-yellow-500/10 text-yellow-500",
    offline: "bg-destructive/10 text-destructive",
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h1 className="font-display text-2xl font-bold text-foreground">Smart Care Module</h1>
        <Button onClick={startCreate} size="sm">
          <Plus size={14} /> Neu
        </Button>
      </div>
      <p className="text-muted-foreground text-sm mb-6">Module hinzufügen, bearbeiten oder entfernen.</p>

      {loading ? (
        <p className="text-sm text-muted-foreground">Lade…</p>
      ) : rows.length === 0 ? (
        <p className="text-sm text-muted-foreground">Noch keine Module. Lege das erste an.</p>
      ) : (
        <div className="border border-border rounded-lg overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50 text-left">
                <th className="px-4 py-3 font-medium text-muted-foreground">Name</th>
                <th className="px-4 py-3 font-medium text-muted-foreground">Seriennr.</th>
                <th className="px-4 py-3 font-medium text-muted-foreground">Status</th>
                <th className="px-4 py-3 font-medium text-muted-foreground">Standort</th>
                <th className="px-4 py-3 font-medium text-muted-foreground text-right">Aktionen</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((a) => (
                <tr key={a.id} className="border-t border-border hover:bg-muted/30">
                  <td className="px-4 py-3 font-medium text-foreground">{a.name}</td>
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{a.serial_number}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusBadge[a.status] ?? "bg-muted"}`}>
                      {a.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">
                    {[a.city, a.country].filter(Boolean).join(", ") || "—"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => startEdit(a)}>
                        <Pencil size={14} />
                      </Button>
                      <ConfirmDeleteDialog onConfirm={() => remove(a.id)} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{editing ? "Modul bearbeiten" : "Neues Modul"}</DialogTitle>
            <DialogDescription>Pflichtfelder: Name, Seriennummer, Status.</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2 space-y-1">
              <Label>Name</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
            </div>
            <div className="space-y-1">
              <Label>Seriennummer</Label>
              <Input value={form.serial_number} onChange={(e) => setForm({ ...form, serial_number: e.target.value })} />
              {errors.serial_number && <p className="text-xs text-destructive">{errors.serial_number}</p>}
            </div>
            <div className="space-y-1">
              <Label>Status</Label>
              <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">active</SelectItem>
                  <SelectItem value="maintenance">maintenance</SelectItem>
                  <SelectItem value="offline">offline</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label>Stadt</Label>
              <Input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
            </div>
            <div className="space-y-1">
              <Label>Land (ISO)</Label>
              <Input value={form.country} maxLength={2} onChange={(e) => setForm({ ...form, country: e.target.value.toUpperCase() })} />
            </div>
            <div className="col-span-2 space-y-1">
              <Label>Adresse</Label>
              <Input value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
            </div>
            <div className="space-y-1">
              <Label>Latitude</Label>
              <Input value={form.latitude} onChange={(e) => setForm({ ...form, latitude: e.target.value })} />
            </div>
            <div className="space-y-1">
              <Label>Longitude</Label>
              <Input value={form.longitude} onChange={(e) => setForm({ ...form, longitude: e.target.value })} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)}>Abbrechen</Button>
            <Button onClick={submit}>{editing ? "Speichern" : "Anlegen"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminAutomats;
