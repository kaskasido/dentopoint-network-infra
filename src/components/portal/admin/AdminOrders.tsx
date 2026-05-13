import { useEffect, useState } from "react";
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
import { supabase } from "@/integrations/supabase/client";

type Order = {
  id: string;
  order_number: string;
  status: string;
  quantity: number;
  total_amount: number | null;
  currency: string;
  ordered_at: string;
  delivered_at: string | null;
  clinic_id: string;
  automat_id: string | null;
  notes: string | null;
};

const STATUSES = ["pending", "confirmed", "shipped", "delivered", "cancelled"];

const schema = z.object({
  order_number: z.string().trim().min(1, "Bestell-Nr. erforderlich").max(64),
  clinic_id: z.string().uuid("Klinik wählen"),
  automat_id: z.string().uuid().optional().or(z.literal("")),
  status: z.enum(["pending", "confirmed", "shipped", "delivered", "cancelled"]),
  quantity: z.coerce.number().int().min(1, "Mind. 1"),
  total_amount: z.coerce.number().min(0).optional().or(z.nan()),
  currency: z.string().trim().min(1).max(8),
  notes: z.string().trim().max(1000).optional().or(z.literal("")),
});

const empty = {
  order_number: "",
  clinic_id: "",
  automat_id: "",
  status: "pending",
  quantity: 1,
  total_amount: "" as number | "",
  currency: "EUR",
  notes: "",
};

const AdminOrders = () => {
  const { rows, loading, insert, update, remove } = useAdminTable<Order>("orders", {
    orderBy: { column: "ordered_at", ascending: false },
  });

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Order | null>(null);
  const [form, setForm] = useState<typeof empty>(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [clinics, setClinics] = useState<{ id: string; display_name: string | null }[]>([]);
  const [automats, setAutomats] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    (async () => {
      const [{ data: c }, { data: a }] = await Promise.all([
        supabase.from("profiles").select("id, display_name").order("display_name"),
        supabase.from("automats").select("id, name").order("name"),
      ]);
      setClinics(c ?? []);
      setAutomats(a ?? []);
    })();
  }, []);

  const startCreate = () => {
    setEditing(null);
    setForm(empty);
    setErrors({});
    setOpen(true);
  };

  const startEdit = (o: Order) => {
    setEditing(o);
    setForm({
      order_number: o.order_number,
      clinic_id: o.clinic_id,
      automat_id: o.automat_id ?? "",
      status: o.status,
      quantity: o.quantity,
      total_amount: o.total_amount ?? "",
      currency: o.currency,
      notes: o.notes ?? "",
    });
    setErrors({});
    setOpen(true);
  };

  const submit = async () => {
    const parsed = schema.safeParse({
      ...form,
      total_amount: form.total_amount === "" ? NaN : form.total_amount,
    });
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => (errs[i.path[0] as string] = i.message));
      setErrors(errs);
      return;
    }
    const payload: Record<string, any> = {
      order_number: parsed.data.order_number,
      clinic_id: parsed.data.clinic_id,
      automat_id: parsed.data.automat_id || null,
      status: parsed.data.status,
      quantity: parsed.data.quantity,
      total_amount: Number.isNaN(parsed.data.total_amount as number) ? null : parsed.data.total_amount,
      currency: parsed.data.currency,
      notes: parsed.data.notes || null,
    };
    if (parsed.data.status === "delivered") {
      payload.delivered_at = editing?.delivered_at ?? new Date().toISOString();
    }
    const ok = editing ? await update(editing.id, payload) : await insert(payload);
    if (ok) setOpen(false);
  };

  const setStatus = async (id: string, status: string) => {
    const patch: Record<string, any> = { status };
    if (status === "delivered") patch.delivered_at = new Date().toISOString();
    await update(id, patch);
  };

  const badge: Record<string, string> = {
    delivered: "bg-accent/10 text-accent",
    shipped: "bg-blue-500/10 text-blue-500",
    confirmed: "bg-blue-500/10 text-blue-500",
    pending: "bg-yellow-500/10 text-yellow-500",
    cancelled: "bg-destructive/10 text-destructive",
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h1 className="font-display text-2xl font-bold text-foreground">Bestellungen</h1>
        <Button onClick={startCreate} size="sm">
          <Plus size={14} /> Neu
        </Button>
      </div>
      <p className="text-muted-foreground text-sm mb-6">
        Bestellungen anlegen, bearbeiten, Status anpassen oder löschen.
      </p>

      {loading ? (
        <p className="text-sm text-muted-foreground">Lade…</p>
      ) : rows.length === 0 ? (
        <p className="text-sm text-muted-foreground">Keine Bestellungen.</p>
      ) : (
        <div className="border border-border rounded-lg overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50 text-left">
                <th className="px-4 py-3 font-medium text-muted-foreground">Bestell-Nr.</th>
                <th className="px-4 py-3 font-medium text-muted-foreground">Menge</th>
                <th className="px-4 py-3 font-medium text-muted-foreground">Summe</th>
                <th className="px-4 py-3 font-medium text-muted-foreground">Status</th>
                <th className="px-4 py-3 font-medium text-muted-foreground">Bestellt</th>
                <th className="px-4 py-3 font-medium text-muted-foreground text-right">Aktionen</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((o) => (
                <tr key={o.id} className="border-t border-border hover:bg-muted/30">
                  <td className="px-4 py-3 font-mono text-xs text-foreground">{o.order_number}</td>
                  <td className="px-4 py-3 text-muted-foreground">{o.quantity}</td>
                  <td className="px-4 py-3 text-muted-foreground">
                    {o.total_amount != null ? `${o.total_amount} ${o.currency}` : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${badge[o.status] ?? "bg-muted"}`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">
                    {new Date(o.ordered_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Select value={o.status} onValueChange={(v) => setStatus(o.id, v)}>
                        <SelectTrigger className="h-8 w-32"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {STATUSES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => startEdit(o)}>
                        <Pencil size={14} />
                      </Button>
                      <ConfirmDeleteDialog onConfirm={() => remove(o.id)} />
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
            <DialogTitle>{editing ? "Bestellung bearbeiten" : "Neue Bestellung"}</DialogTitle>
            <DialogDescription>Pflichtfelder: Bestell-Nr., Klinik, Menge.</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2 space-y-1">
              <Label>Bestell-Nr.</Label>
              <Input value={form.order_number} onChange={(e) => setForm({ ...form, order_number: e.target.value })} />
              {errors.order_number && <p className="text-xs text-destructive">{errors.order_number}</p>}
            </div>
            <div className="col-span-2 space-y-1">
              <Label>Klinik</Label>
              <Select value={form.clinic_id} onValueChange={(v) => setForm({ ...form, clinic_id: v })}>
                <SelectTrigger><SelectValue placeholder="Klinik wählen" /></SelectTrigger>
                <SelectContent>
                  {clinics.map((c) => (
                    <SelectItem key={c.id} value={c.id}>{c.display_name || c.id.slice(0, 8)}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.clinic_id && <p className="text-xs text-destructive">{errors.clinic_id}</p>}
            </div>
            <div className="col-span-2 space-y-1">
              <Label>Automat (optional)</Label>
              <Select
                value={form.automat_id || "__none"}
                onValueChange={(v) => setForm({ ...form, automat_id: v === "__none" ? "" : v })}
              >
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="__none">— Keiner —</SelectItem>
                  {automats.map((a) => (
                    <SelectItem key={a.id} value={a.id}>{a.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label>Menge</Label>
              <Input
                type="number"
                min={1}
                value={form.quantity}
                onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) })}
              />
              {errors.quantity && <p className="text-xs text-destructive">{errors.quantity}</p>}
            </div>
            <div className="space-y-1">
              <Label>Status</Label>
              <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {STATUSES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label>Summe</Label>
              <Input
                type="number"
                step="0.01"
                value={form.total_amount}
                onChange={(e) => setForm({ ...form, total_amount: e.target.value === "" ? "" : Number(e.target.value) })}
              />
            </div>
            <div className="space-y-1">
              <Label>Währung</Label>
              <Input
                value={form.currency}
                maxLength={8}
                onChange={(e) => setForm({ ...form, currency: e.target.value.toUpperCase() })}
              />
            </div>
            <div className="col-span-2 space-y-1">
              <Label>Notizen</Label>
              <Textarea rows={3} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
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

export default AdminOrders;
