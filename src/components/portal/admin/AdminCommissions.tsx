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

type Commission = {
  id: string;
  partner_id: string;
  deal_name: string;
  deal_value: number;
  commission_rate: number;
  commission_amount: number;
  status: string;
  territory: string | null;
  notes: string | null;
  paid_at: string | null;
};

const schema = z.object({
  partner_id: z.string().uuid("Partner-ID erforderlich"),
  deal_name: z.string().trim().min(1).max(160),
  deal_value: z.string().min(1, "Wert erforderlich"),
  commission_rate: z.string().min(1, "Satz erforderlich"),
  status: z.enum(["pending", "approved", "paid", "cancelled"]),
  territory: z.string().max(120).optional(),
  notes: z.string().max(1000).optional(),
});

const empty = { partner_id: "", deal_name: "", deal_value: "", commission_rate: "10", status: "pending", territory: "", notes: "" };

const AdminCommissions = () => {
  const { rows, loading, insert, update, remove } = useAdminTable<Commission>("commissions", {
    orderBy: { column: "created_at", ascending: false },
  });
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Commission | null>(null);
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const startCreate = () => { setEditing(null); setForm(empty); setErrors({}); setOpen(true); };
  const startEdit = (c: Commission) => {
    setEditing(c);
    setForm({
      partner_id: c.partner_id,
      deal_name: c.deal_name,
      deal_value: c.deal_value.toString(),
      commission_rate: c.commission_rate.toString(),
      status: c.status as any,
      territory: c.territory ?? "",
      notes: c.notes ?? "",
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
    const dealValue = Number(parsed.data.deal_value);
    const rate = Number(parsed.data.commission_rate);
    const payload: any = {
      partner_id: parsed.data.partner_id,
      deal_name: parsed.data.deal_name,
      deal_value: dealValue,
      commission_rate: rate,
      commission_amount: +(dealValue * rate / 100).toFixed(2),
      status: parsed.data.status,
      territory: parsed.data.territory || null,
      notes: parsed.data.notes || null,
    };
    if (parsed.data.status === "paid" && !editing?.paid_at) {
      payload.paid_at = new Date().toISOString();
    }
    const ok = editing ? await update(editing.id, payload) : await insert(payload);
    if (ok) setOpen(false);
  };

  const badge: Record<string, string> = {
    pending: "bg-yellow-500/10 text-yellow-500",
    approved: "bg-blue-500/10 text-blue-500",
    paid: "bg-accent/10 text-accent",
    cancelled: "bg-muted text-muted-foreground",
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h1 className="font-display text-2xl font-bold text-foreground">Provisionen</h1>
        <Button onClick={startCreate} size="sm"><Plus size={14} /> Neu</Button>
      </div>
      <p className="text-muted-foreground text-sm mb-6">Partner-Provisionen verwalten.</p>

      {loading ? (
        <p className="text-sm text-muted-foreground">Lade…</p>
      ) : rows.length === 0 ? (
        <p className="text-sm text-muted-foreground">Keine Einträge.</p>
      ) : (
        <div className="border border-border rounded-lg overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50 text-left">
                <th className="px-4 py-3 font-medium text-muted-foreground">Deal</th>
                <th className="px-4 py-3 font-medium text-muted-foreground">Wert</th>
                <th className="px-4 py-3 font-medium text-muted-foreground">Satz</th>
                <th className="px-4 py-3 font-medium text-muted-foreground">Provision</th>
                <th className="px-4 py-3 font-medium text-muted-foreground">Status</th>
                <th className="px-4 py-3 font-medium text-muted-foreground text-right">Aktionen</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((c) => (
                <tr key={c.id} className="border-t border-border hover:bg-muted/30">
                  <td className="px-4 py-3 text-foreground">{c.deal_name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{c.deal_value} €</td>
                  <td className="px-4 py-3 text-muted-foreground">{c.commission_rate}%</td>
                  <td className="px-4 py-3 text-muted-foreground">{c.commission_amount} €</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${badge[c.status] ?? "bg-muted"}`}>{c.status}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => startEdit(c)}>
                        <Pencil size={14} />
                      </Button>
                      <ConfirmDeleteDialog onConfirm={() => remove(c.id)} />
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
          <DialogHeader><DialogTitle>{editing ? "Provision bearbeiten" : "Neue Provision"}</DialogTitle></DialogHeader>
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2 space-y-1">
              <Label>Partner-Profile-ID (UUID)</Label>
              <Input value={form.partner_id} onChange={(e) => setForm({ ...form, partner_id: e.target.value })} placeholder="UUID aus Profile" />
              {errors.partner_id && <p className="text-xs text-destructive">{errors.partner_id}</p>}
            </div>
            <div className="col-span-2 space-y-1">
              <Label>Deal-Name</Label>
              <Input value={form.deal_name} onChange={(e) => setForm({ ...form, deal_name: e.target.value })} />
              {errors.deal_name && <p className="text-xs text-destructive">{errors.deal_name}</p>}
            </div>
            <div className="space-y-1">
              <Label>Deal-Wert (€)</Label>
              <Input value={form.deal_value} onChange={(e) => setForm({ ...form, deal_value: e.target.value })} />
              {errors.deal_value && <p className="text-xs text-destructive">{errors.deal_value}</p>}
            </div>
            <div className="space-y-1">
              <Label>Satz (%)</Label>
              <Input value={form.commission_rate} onChange={(e) => setForm({ ...form, commission_rate: e.target.value })} />
            </div>
            <div className="space-y-1">
              <Label>Status</Label>
              <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">pending</SelectItem>
                  <SelectItem value="approved">approved</SelectItem>
                  <SelectItem value="paid">paid</SelectItem>
                  <SelectItem value="cancelled">cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label>Territorium</Label>
              <Input value={form.territory} onChange={(e) => setForm({ ...form, territory: e.target.value })} />
            </div>
            <div className="col-span-2 space-y-1">
              <Label>Notizen</Label>
              <Textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
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

export default AdminCommissions;
