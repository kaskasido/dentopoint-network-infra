import { useState } from "react";
import { useAdminTable } from "@/hooks/useAdminTable";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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

type Maintenance = {
  id: string;
  automat_id: string;
  maintenance_type: string;
  description: string | null;
  technician_name: string | null;
  status: string;
  cost: number | null;
  scheduled_at: string | null;
  completed_at: string | null;
};

type Automat = { id: string; name: string };

const schema = z.object({
  automat_id: z.string().uuid("Modul wählen"),
  maintenance_type: z.string().trim().min(1).max(80),
  status: z.enum(["scheduled", "in_progress", "completed", "cancelled"]),
  description: z.string().max(1000).optional(),
  technician_name: z.string().max(120).optional(),
  cost: z.string().optional(),
  scheduled_at: z.string().optional(),
});

const empty = {
  automat_id: "",
  maintenance_type: "",
  status: "scheduled",
  description: "",
  technician_name: "",
  cost: "",
  scheduled_at: "",
};

const AdminMaintenance = () => {
  const { rows, loading, insert, update, remove } = useAdminTable<Maintenance>("maintenance_logs", {
    orderBy: { column: "created_at", ascending: false },
  });
  const { rows: automats } = useAdminTable<Automat>("automats", { orderBy: { column: "name", ascending: true } });
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Maintenance | null>(null);
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const startCreate = () => {
    setEditing(null);
    setForm(empty);
    setErrors({});
    setOpen(true);
  };

  const startEdit = (m: Maintenance) => {
    setEditing(m);
    setForm({
      automat_id: m.automat_id,
      maintenance_type: m.maintenance_type,
      status: m.status,
      description: m.description ?? "",
      technician_name: m.technician_name ?? "",
      cost: m.cost?.toString() ?? "",
      scheduled_at: m.scheduled_at ? m.scheduled_at.slice(0, 16) : "",
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
    const payload: any = {
      automat_id: parsed.data.automat_id,
      maintenance_type: parsed.data.maintenance_type,
      status: parsed.data.status,
      description: parsed.data.description || null,
      technician_name: parsed.data.technician_name || null,
      cost: parsed.data.cost ? Number(parsed.data.cost) : null,
      scheduled_at: parsed.data.scheduled_at ? new Date(parsed.data.scheduled_at).toISOString() : null,
    };
    if (parsed.data.status === "completed" && !editing?.completed_at) {
      payload.completed_at = new Date().toISOString();
    }
    const ok = editing ? await update(editing.id, payload) : await insert(payload);
    if (ok) setOpen(false);
  };

  const automatName = (id: string) => automats.find((a) => a.id === id)?.name ?? "—";

  const badge: Record<string, string> = {
    scheduled: "bg-blue-500/10 text-blue-500",
    in_progress: "bg-yellow-500/10 text-yellow-500",
    completed: "bg-accent/10 text-accent",
    cancelled: "bg-muted text-muted-foreground",
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h1 className="font-display text-2xl font-bold text-foreground">Wartungen</h1>
        <Button onClick={startCreate} size="sm" disabled={automats.length === 0}>
          <Plus size={14} /> Neu
        </Button>
      </div>
      <p className="text-muted-foreground text-sm mb-6">Wartungs-Einträge planen und protokollieren.</p>

      {loading ? (
        <p className="text-sm text-muted-foreground">Lade…</p>
      ) : rows.length === 0 ? (
        <p className="text-sm text-muted-foreground">Keine Einträge.</p>
      ) : (
        <div className="border border-border rounded-lg overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50 text-left">
                <th className="px-4 py-3 font-medium text-muted-foreground">Modul</th>
                <th className="px-4 py-3 font-medium text-muted-foreground">Typ</th>
                <th className="px-4 py-3 font-medium text-muted-foreground">Techniker</th>
                <th className="px-4 py-3 font-medium text-muted-foreground">Status</th>
                <th className="px-4 py-3 font-medium text-muted-foreground">Geplant</th>
                <th className="px-4 py-3 font-medium text-muted-foreground text-right">Aktionen</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((m) => (
                <tr key={m.id} className="border-t border-border hover:bg-muted/30">
                  <td className="px-4 py-3 text-foreground">{automatName(m.automat_id)}</td>
                  <td className="px-4 py-3 text-muted-foreground">{m.maintenance_type}</td>
                  <td className="px-4 py-3 text-muted-foreground">{m.technician_name ?? "—"}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${badge[m.status] ?? "bg-muted"}`}>
                      {m.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">
                    {m.scheduled_at ? new Date(m.scheduled_at).toLocaleString() : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => startEdit(m)}>
                        <Pencil size={14} />
                      </Button>
                      <ConfirmDeleteDialog onConfirm={() => remove(m.id)} />
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
            <DialogTitle>{editing ? "Wartung bearbeiten" : "Neue Wartung"}</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2 space-y-1">
              <Label>Modul</Label>
              <Select value={form.automat_id} onValueChange={(v) => setForm({ ...form, automat_id: v })}>
                <SelectTrigger><SelectValue placeholder="Modul wählen" /></SelectTrigger>
                <SelectContent>
                  {automats.map((a) => <SelectItem key={a.id} value={a.id}>{a.name}</SelectItem>)}
                </SelectContent>
              </Select>
              {errors.automat_id && <p className="text-xs text-destructive">{errors.automat_id}</p>}
            </div>
            <div className="space-y-1">
              <Label>Typ</Label>
              <Input value={form.maintenance_type} onChange={(e) => setForm({ ...form, maintenance_type: e.target.value })} placeholder="z.B. Routine" />
              {errors.maintenance_type && <p className="text-xs text-destructive">{errors.maintenance_type}</p>}
            </div>
            <div className="space-y-1">
              <Label>Status</Label>
              <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="scheduled">scheduled</SelectItem>
                  <SelectItem value="in_progress">in_progress</SelectItem>
                  <SelectItem value="completed">completed</SelectItem>
                  <SelectItem value="cancelled">cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label>Techniker</Label>
              <Input value={form.technician_name} onChange={(e) => setForm({ ...form, technician_name: e.target.value })} />
            </div>
            <div className="space-y-1">
              <Label>Kosten (€)</Label>
              <Input value={form.cost} onChange={(e) => setForm({ ...form, cost: e.target.value })} />
            </div>
            <div className="col-span-2 space-y-1">
              <Label>Geplant am</Label>
              <Input type="datetime-local" value={form.scheduled_at} onChange={(e) => setForm({ ...form, scheduled_at: e.target.value })} />
            </div>
            <div className="col-span-2 space-y-1">
              <Label>Beschreibung</Label>
              <Textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
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

export default AdminMaintenance;
