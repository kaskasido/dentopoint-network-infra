import { useState, useMemo } from "react";
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
import { Plus, Pencil, ArrowUp, ArrowDown, ArrowUpDown, Upload, X, ImageIcon, Loader2 } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type SortKey = "name" | "country" | "status" | "contact_email";

type Manufacturer = {
  id: string;
  name: string;
  contact_email: string | null;
  phone: string | null;
  country: string | null;
  website: string | null;
  notes: string | null;
  status: string;
  logo_url: string | null;
  created_at: string;
};

const schema = z.object({
  name: z.string().trim().min(1, "Name erforderlich").max(160),
  contact_email: z.string().trim().email("Ungültige E-Mail").max(160).optional().or(z.literal("")),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  country: z.string().trim().max(2).optional().or(z.literal("")),
  website: z.string().trim().url("Ungültige URL").max(255).optional().or(z.literal("")),
  notes: z.string().trim().max(1000).optional().or(z.literal("")),
  status: z.enum(["active", "inactive"]),
});

const empty = { name: "", contact_email: "", phone: "", country: "DE", website: "", notes: "", status: "active" };

const AdminManufacturers = () => {
  const { rows, loading, insert, update, remove } = useAdminTable<Manufacturer>("manufacturers", {
    orderBy: { column: "created_at", ascending: false },
  });
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Manufacturer | null>(null);
  const [form, setForm] = useState(empty);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(sortDir === "asc" ? "desc" : "asc");
    else { setSortKey(key); setSortDir("asc"); }
  };

  const sortedRows = useMemo(() => {
    return [...rows].sort((a, b) => {
      const va = String((a as any)[sortKey] ?? "").toLowerCase();
      const vb = String((b as any)[sortKey] ?? "").toLowerCase();
      if (va < vb) return sortDir === "asc" ? -1 : 1;
      if (va > vb) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
  }, [rows, sortKey, sortDir]);

  const SortIcon = ({ k }: { k: SortKey }) =>
    sortKey !== k ? <ArrowUpDown size={12} className="opacity-40" /> :
    sortDir === "asc" ? <ArrowUp size={12} /> : <ArrowDown size={12} />;

  const startCreate = () => {
    setEditing(null);
    setForm(empty);
    setErrors({});
    setOpen(true);
  };

  const startEdit = (m: Manufacturer) => {
    setEditing(m);
    setForm({
      name: m.name,
      contact_email: m.contact_email ?? "",
      phone: m.phone ?? "",
      country: m.country ?? "DE",
      website: m.website ?? "",
      notes: m.notes ?? "",
      status: m.status,
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
      contact_email: parsed.data.contact_email || null,
      phone: parsed.data.phone || null,
      country: parsed.data.country || null,
      website: parsed.data.website || null,
      notes: parsed.data.notes || null,
      status: parsed.data.status,
    };
    const ok = editing ? await update(editing.id, payload) : await insert(payload);
    if (ok) setOpen(false);
  };

  const statusBadge: Record<string, string> = {
    active: "bg-accent/10 text-accent",
    inactive: "bg-muted text-muted-foreground",
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h1 className="font-display text-2xl font-bold text-foreground">Hersteller</h1>
        <Button onClick={startCreate} size="sm">
          <Plus size={14} /> Neu
        </Button>
      </div>
      <p className="text-muted-foreground text-sm mb-6">Hersteller hinzufügen, bearbeiten oder entfernen.</p>

      {loading ? (
        <p className="text-sm text-muted-foreground">Lade…</p>
      ) : rows.length === 0 ? (
        <p className="text-sm text-muted-foreground">Noch keine Hersteller. Lege den ersten an.</p>
      ) : (
        <div className="border border-border rounded-lg overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50 text-left">
                {([
                  ["name", "Name"],
                  ["contact_email", "E-Mail"],
                  ["country", "Land"],
                  ["status", "Status"],
                ] as [SortKey, string][]).map(([k, label]) => (
                  <th key={k} className="px-4 py-3 font-medium text-muted-foreground">
                    <button
                      type="button"
                      onClick={() => toggleSort(k)}
                      className="inline-flex items-center gap-1.5 hover:text-foreground transition-colors"
                    >
                      {label}
                      <SortIcon k={k} />
                    </button>
                  </th>
                ))}
                <th className="px-4 py-3 font-medium text-muted-foreground text-right">Aktionen</th>
              </tr>
            </thead>
            <tbody>
              {sortedRows.map((m) => (
                <tr key={m.id} className="border-t border-border hover:bg-muted/30">
                  <td className="px-4 py-3 font-medium text-foreground">{m.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{m.contact_email || "—"}</td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">{m.country || "—"}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusBadge[m.status] ?? "bg-muted"}`}>
                      {m.status}
                    </span>
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
            <DialogTitle>{editing ? "Hersteller bearbeiten" : "Neuer Hersteller"}</DialogTitle>
            <DialogDescription>Pflichtfeld: Name.</DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-3">
            <div className="col-span-2 space-y-1">
              <Label>Name</Label>
              <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
            </div>
            <div className="space-y-1">
              <Label>Kontakt-E-Mail</Label>
              <Input type="email" value={form.contact_email} onChange={(e) => setForm({ ...form, contact_email: e.target.value })} />
              {errors.contact_email && <p className="text-xs text-destructive">{errors.contact_email}</p>}
            </div>
            <div className="space-y-1">
              <Label>Telefon</Label>
              <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </div>
            <div className="space-y-1">
              <Label>Land (ISO)</Label>
              <Input value={form.country} maxLength={2} onChange={(e) => setForm({ ...form, country: e.target.value.toUpperCase() })} />
            </div>
            <div className="space-y-1">
              <Label>Status</Label>
              <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">active</SelectItem>
                  <SelectItem value="inactive">inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-2 space-y-1">
              <Label>Website</Label>
              <Input placeholder="https://" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} />
              {errors.website && <p className="text-xs text-destructive">{errors.website}</p>}
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

export default AdminManufacturers;
