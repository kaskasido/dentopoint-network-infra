import { useState } from "react";
import { useAdminTable } from "@/hooks/useAdminTable";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ConfirmDeleteDialog from "./shared/ConfirmDeleteDialog";

type Order = {
  id: string;
  order_number: string;
  status: string;
  quantity: number;
  total_amount: number | null;
  currency: string;
  ordered_at: string;
  delivered_at: string | null;
};

const STATUSES = ["pending", "ordered", "delivered", "cancelled"];

const AdminOrders = () => {
  const { rows, loading, update, remove } = useAdminTable<Order>("orders", {
    orderBy: { column: "ordered_at", ascending: false },
  });

  const setStatus = async (id: string, status: string) => {
    const patch: Record<string, any> = { status };
    if (status === "delivered") patch.delivered_at = new Date().toISOString();
    await update(id, patch);
  };

  const badge: Record<string, string> = {
    delivered: "bg-accent/10 text-accent",
    ordered: "bg-blue-500/10 text-blue-500",
    pending: "bg-yellow-500/10 text-yellow-500",
    cancelled: "bg-destructive/10 text-destructive",
  };

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-foreground mb-2">Bestellungen</h1>
      <p className="text-muted-foreground text-sm mb-6">
        Status anpassen oder Bestellungen löschen. Neue Bestellungen werden vom Klinik-Portal erstellt.
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
                    <div className="flex items-center justify-end gap-2">
                      <Select value={o.status} onValueChange={(v) => setStatus(o.id, v)}>
                        <SelectTrigger className="h-8 w-32"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {STATUSES.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      <ConfirmDeleteDialog onConfirm={() => remove(o.id)} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminOrders;
