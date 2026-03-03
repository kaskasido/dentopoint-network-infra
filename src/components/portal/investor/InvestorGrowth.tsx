import { mockGrowthData } from "@/data/mockInvestorData";
import { AreaChart, Area, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const InvestorGrowth = () => {
  const { t } = useLanguage();
  const ip = t.investorPortal;

  const latestMonth = mockGrowthData[mockGrowthData.length - 1];
  const prevMonth = mockGrowthData[mockGrowthData.length - 2];
  const revenueGrowth = Math.round(((latestMonth.revenue - prevMonth.revenue) / prevMonth.revenue) * 100);
  const automatGrowth = Math.round(((latestMonth.automats - prevMonth.automats) / prevMonth.automats) * 100);
  const clinicGrowth = Math.round(((latestMonth.clinics - prevMonth.clinics) / prevMonth.clinics) * 100);

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-foreground mb-2">{ip.growthTitle || "Growth Analysis"}</h1>
      <p className="text-muted-foreground text-sm mb-8">{ip.growthDesc || "Monthly growth trends and forecasts."}</p>

      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: ip.revenueGrowth || "Revenue Growth", value: `+${revenueGrowth}%`, sub: "MoM" },
          { label: ip.automatGrowth || "Automat Growth", value: `+${automatGrowth}%`, sub: "MoM" },
          { label: ip.clinicGrowth || "Clinic Growth", value: `+${clinicGrowth}%`, sub: "MoM" },
        ].map((s) => (
          <div key={s.label} className="border border-border rounded-lg p-5 bg-card">
            <TrendingUp size={20} className="text-accent mb-2" />
            <p className="font-display text-2xl font-bold text-accent">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label} ({s.sub})</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="border border-border rounded-lg p-6 bg-card">
          <h2 className="font-display text-lg font-semibold text-foreground mb-4">{ip.revenueTrend || "Revenue Trend"}</h2>
          <ResponsiveContainer width="100%" height={280}>
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
          <h2 className="font-display text-lg font-semibold text-foreground mb-4">{ip.networkGrowth || "Network Growth"}</h2>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={mockGrowthData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <YAxis tick={{ fontSize: 12 }} stroke="hsl(var(--muted-foreground))" />
              <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8 }} />
              <Line type="monotone" dataKey="automats" name={ip.automats || "Automats"} stroke="hsl(var(--accent))" strokeWidth={2} dot={{ r: 4 }} />
              <Line type="monotone" dataKey="clinics" name={ip.clinics || "Clinics"} stroke="hsl(var(--accent) / 0.5)" strokeWidth={2} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default InvestorGrowth;
