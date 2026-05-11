import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Globe } from "lucide-react";
import EmptyState from "@/components/portal/shared/EmptyState";

const InvestorRegions = () => {
  const [rows, setRows] = useState<{ country: string; automats: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("automats").select("country");
      const grouped: Record<string, number> = {};
      (data ?? []).forEach((r: any) => {
        const k = r.country ?? "—";
        grouped[k] = (grouped[k] ?? 0) + 1;
      });
      setRows(Object.entries(grouped).map(([country, automats]) => ({ country, automats })).sort((a, b) => b.automats - a.automats));
      setLoading(false);
    })();
  }, []);

  const total = rows.reduce((s, r) => s + r.automats, 0);

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-foreground mb-2">Regionen</h1>
      <p className="text-muted-foreground text-sm mb-8">Verteilung der Automaten nach Ländern.</p>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="border border-border rounded-lg p-5 bg-card"><Globe size={20} className="text-accent mb-2" /><p className="font-display text-2xl font-bold text-foreground">{rows.length}</p><p className="text-xs text-muted-foreground">Aktive Länder</p></div>
        <div className="border border-border rounded-lg p-5 bg-card"><Globe size={20} className="text-accent mb-2" /><p className="font-display text-2xl font-bold text-foreground">{total}</p><p className="text-xs text-muted-foreground">Automaten gesamt</p></div>
      </div>

      {loading ? <p className="text-sm text-muted-foreground">Lade…</p> : rows.length === 0 ? (
        <EmptyState description="Noch keine geografischen Daten verfügbar." />
      ) : (
        <>
          <div className="border border-border rounded-lg p-6 bg-card mb-8">
            <h2 className="font-display text-lg font-semibold text-foreground mb-4">Automaten je Land</h2>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={rows} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis type="number" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
                <YAxis type="category" dataKey="country" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" width={80} />
                <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
                <Bar dataKey="automats" fill="hsl(var(--accent))" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="border border-border rounded-lg overflow-hidden">
            <table className="w-full text-sm">
              <thead><tr className="bg-muted/50"><th className="text-left px-4 py-3 font-medium text-muted-foreground">Land</th><th className="text-left px-4 py-3 font-medium text-muted-foreground">Automaten</th><th className="text-left px-4 py-3 font-medium text-muted-foreground">Anteil</th></tr></thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.country} className="border-t border-border">
                    <td className="px-4 py-3 font-medium text-foreground">{r.country}</td>
                    <td className="px-4 py-3 text-muted-foreground">{r.automats}</td>
                    <td className="px-4 py-3 text-muted-foreground">{total ? Math.round((r.automats / total) * 100) : 0}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default InvestorRegions;
