import { mockFinancials, mockGrowthData, mockRegionData } from "@/data/mockInvestorData";
import { TrendingUp, TrendingDown, BarChart3, Globe, Building, DollarSign } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const InvestorOverview = () => {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-foreground mb-2">Investor Dashboard</h1>
      <p className="text-muted-foreground text-sm mb-8">Finanzkennzahlen, Wachstum und Netzwerk-Expansion.</p>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {mockFinancials.map((m) => (
          <div key={m.label} className="border border-border rounded-lg p-5 bg-card">
            <p className="text-xs text-muted-foreground mb-2">{m.label}</p>
            <p className="font-display text-2xl font-bold text-foreground">{m.value}</p>
            <div className="flex items-center gap-1 mt-2">
              {m.change > 0 ? <TrendingUp size={14} className="text-accent" /> : <TrendingDown size={14} className="text-destructive" />}
              <span className={`text-xs font-medium ${m.change > 0 ? "text-accent" : "text-destructive"}`}>
                {m.change > 0 ? "+" : ""}{m.change}%
              </span>
              <span className="text-xs text-muted-foreground">{m.period}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue Growth Chart */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <div className="border border-border rounded-lg p-6 bg-card">
          <h2 className="font-display text-lg font-semibold text-foreground mb-4">Revenue-Wachstum (MRR)</h2>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={mockGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" tickFormatter={(v) => `€${(v / 1000).toFixed(0)}K`} />
              <Tooltip formatter={(v: number) => `€${v.toLocaleString("de-DE")}`} contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
              <Area type="monotone" dataKey="revenue" stroke="hsl(var(--accent))" fill="hsl(var(--accent) / 0.15)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="border border-border rounded-lg p-6 bg-card">
          <h2 className="font-display text-lg font-semibold text-foreground mb-4">Netzwerk-Expansion</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={mockGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
              <Bar dataKey="automats" name="Automaten" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
              <Bar dataKey="clinics" name="Kliniken" fill="hsl(var(--accent) / 0.4)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Regions Table */}
      <h2 className="font-display text-lg font-semibold text-foreground mb-4">Regionale Performance</h2>
      <div className="border border-border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/50">
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Region</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Automaten</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Revenue</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">Wachstum</th>
            </tr>
          </thead>
          <tbody>
            {mockRegionData.map((r) => (
              <tr key={r.region} className="border-t border-border">
                <td className="px-4 py-3 font-medium text-foreground">{r.region}</td>
                <td className="px-4 py-3 text-muted-foreground">{r.automats}</td>
                <td className="px-4 py-3 text-foreground">€{r.revenue.toLocaleString("de-DE")}</td>
                <td className="px-4 py-3">
                  <span className="text-accent text-sm font-medium">+{r.growth}%</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default InvestorOverview;
