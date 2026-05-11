import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import EmptyState from "@/components/portal/shared/EmptyState";

const InvestorGrowth = () => {
  const [series, setSeries] = useState<{ month: string; automats: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("automats").select("created_at");
      const grouped: Record<string, number> = {};
      (data ?? []).forEach((r: any) => {
        const d = new Date(r.created_at);
        const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
        grouped[key] = (grouped[key] ?? 0) + 1;
      });
      const months = Object.keys(grouped).sort();
      let cumul = 0;
      setSeries(months.map((m) => { cumul += grouped[m]; return { month: m, automats: cumul }; }));
      setLoading(false);
    })();
  }, []);

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-foreground mb-2">Wachstum</h1>
      <p className="text-muted-foreground text-sm mb-8">Kumulierter Aufbau des Automaten-Netzwerks.</p>

      {loading ? <p className="text-sm text-muted-foreground">Lade…</p> : series.length < 2 ? (
        <EmptyState description="Wachstumstrends werden sichtbar, sobald Daten aus mehreren Monaten vorliegen." />
      ) : (
        <div className="border border-border rounded-lg p-6 bg-card">
          <h2 className="font-display text-lg font-semibold text-foreground mb-4">Automaten kumuliert</h2>
          <ResponsiveContainer width="100%" height={320}>
            <AreaChart data={series}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
              <Area type="monotone" dataKey="automats" stroke="hsl(var(--accent))" fill="hsl(var(--accent) / 0.15)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default InvestorGrowth;
