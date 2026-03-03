import { mockFinancials } from "@/data/mockInvestorData";
import { TrendingUp, TrendingDown, BarChart3, Target, DollarSign, Percent, Users, Repeat } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const metricIcons = [DollarSign, DollarSign, BarChart3, Users, Target, Percent, DollarSign, Repeat];

const InvestorMetrics = () => {
  const { t } = useLanguage();
  const ip = t.investorPortal;

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-foreground mb-2">{ip.metricsTitle || "Key Metrics"}</h1>
      <p className="text-muted-foreground text-sm mb-8">{ip.metricsDesc || "Detailed financial and business metrics."}</p>

      <div className="grid md:grid-cols-2 gap-6">
        {mockFinancials.map((m, i) => {
          const Icon = metricIcons[i];
          return (
            <div key={m.label} className="border border-border rounded-lg p-6 bg-card">
              <div className="flex items-start justify-between mb-4">
                <div className="p-2 rounded-lg bg-accent/10">
                  <Icon size={20} className="text-accent" />
                </div>
                <div className="flex items-center gap-1">
                  {m.change > 0 ? <TrendingUp size={16} className="text-accent" /> : <TrendingDown size={16} className="text-destructive" />}
                  <span className={`text-sm font-semibold ${m.change > 0 ? "text-accent" : "text-destructive"}`}>
                    {m.change > 0 ? "+" : ""}{m.change}%
                  </span>
                </div>
              </div>
              <p className="font-display text-3xl font-bold text-foreground mb-1">{m.value}</p>
              <p className="text-sm text-muted-foreground">{m.label}</p>
              <p className="text-xs text-muted-foreground mt-1">{m.period}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InvestorMetrics;
