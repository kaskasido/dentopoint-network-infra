import { mockRegionData } from "@/data/mockInvestorData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Globe, TrendingUp } from "lucide-react";

const InvestorRegions = () => {
  const totalAutomats = mockRegionData.reduce((s, r) => s + r.automats, 0);
  const totalRevenue = mockRegionData.reduce((s, r) => s + r.revenue, 0);

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-foreground mb-2">Regionale Expansion</h1>
      <p className="text-muted-foreground text-sm mb-8">Performance und Wachstum nach Regionen.</p>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="border border-border rounded-lg p-5 bg-card">
          <Globe size={20} className="text-accent mb-2" />
          <p className="font-display text-2xl font-bold text-foreground">{mockRegionData.length}</p>
          <p className="text-xs text-muted-foreground">Aktive Regionen</p>
        </div>
        <div className="border border-border rounded-lg p-5 bg-card">
          <TrendingUp size={20} className="text-accent mb-2" />
          <p className="font-display text-2xl font-bold text-foreground">€{(totalRevenue / 1000000).toFixed(1)}M</p>
          <p className="text-xs text-muted-foreground">Gesamt-Revenue</p>
        </div>
      </div>

      <div className="border border-border rounded-lg p-6 bg-card mb-8">
        <h2 className="font-display text-lg font-semibold text-foreground mb-4">Revenue nach Region</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={mockRegionData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis type="number" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => `€${(v / 1000).toFixed(0)}K`} />
            <YAxis type="category" dataKey="region" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" width={120} />
            <Tooltip formatter={(v: number) => `€${v.toLocaleString("de-DE")}`} contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
            <Bar dataKey="revenue" fill="hsl(var(--accent))" radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="border border-border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/50">
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Region</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Automaten</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Marktanteil</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Revenue</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Wachstum</th>
            </tr>
          </thead>
          <tbody>
            {mockRegionData.map((r) => (
              <tr key={r.region} className="border-t border-border">
                <td className="px-4 py-3 font-medium text-foreground">{r.region}</td>
                <td className="px-4 py-3 text-muted-foreground">{r.automats}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-accent rounded-full" style={{ width: `${Math.round((r.automats / totalAutomats) * 100)}%` }} />
                    </div>
                    <span className="text-xs text-muted-foreground">{Math.round((r.automats / totalAutomats) * 100)}%</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-foreground">€{r.revenue.toLocaleString("de-DE")}</td>
                <td className="px-4 py-3"><span className="text-accent font-medium">+{r.growth}%</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvestorRegions;
