import { mockClinicAutomats, mockClinicOrders, mockPatientFeedback } from "@/data/mockClinicData";
import { Box, Wifi, WifiOff, Wrench, Star, ShoppingCart, TrendingUp, Users } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const ClinicOverview = () => {
  const { t } = useLanguage();
  const cp = t.clinicPortal;

  const online = mockClinicAutomats.filter((a) => a.status === "online").length;
  const totalUsage = mockClinicAutomats.reduce((s, a) => s + a.dailyUsage, 0);
  const avgRating = (mockPatientFeedback.reduce((s, f) => s + f.rating, 0) / mockPatientFeedback.length).toFixed(1);
  const pendingOrders = mockClinicOrders.filter((o) => o.status !== "geliefert").length;

  const stats = [
    { label: cp.automats, value: mockClinicAutomats.length, icon: Box, color: "text-accent" },
    { label: cp.online, value: online, icon: Wifi, color: "text-accent" },
    { label: cp.dailyUsages, value: totalUsage, icon: Users, color: "text-accent" },
    { label: cp.avgRating, value: `${avgRating} ★`, icon: Star, color: "text-yellow-500" },
    { label: cp.openOrders, value: pendingOrders, icon: ShoppingCart, color: "text-accent" },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-foreground mb-2">{cp.dashboardTitle}</h1>
      <p className="text-muted-foreground text-sm mb-8">{cp.dashboardDesc}</p>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="border border-border rounded-lg p-5 bg-card">
            <s.icon size={20} className={`${s.color} mb-3`} />
            <p className="font-display text-2xl font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div>
          <h2 className="font-display text-lg font-semibold text-foreground mb-4">{cp.yourAutomats}</h2>
          <div className="border border-border rounded-lg divide-y divide-border">
            {mockClinicAutomats.map((a) => (
              <div key={a.id} className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-mono text-sm font-semibold text-foreground">{a.nr}</p>
                  <p className="text-xs text-muted-foreground">{a.location} • {a.floor}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">{a.dailyUsage} {cp.usagesPerDay}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-12 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${a.fillLevel > 60 ? "bg-accent" : a.fillLevel > 30 ? "bg-yellow-500" : "bg-destructive"}`} style={{ width: `${a.fillLevel}%` }} />
                      </div>
                      <span className="text-xs text-muted-foreground">{a.fillLevel}%</span>
                    </div>
                  </div>
                  <span className={`w-2 h-2 rounded-full ${a.status === "online" ? "bg-accent" : a.status === "offline" ? "bg-destructive" : "bg-muted-foreground"}`} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-display text-lg font-semibold text-foreground mb-4">{cp.patientFeedback}</h2>
          <div className="border border-border rounded-lg divide-y divide-border">
            {mockPatientFeedback.slice(0, 5).map((f) => (
              <div key={f.id} className="p-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-muted-foreground">{f.automatNr}</span>
                  <span className="text-xs text-yellow-500">{"★".repeat(f.rating)}{"☆".repeat(5 - f.rating)}</span>
                </div>
                <p className="text-sm text-foreground">{f.comment}</p>
                <p className="text-xs text-muted-foreground mt-1">{new Date(f.date).toLocaleDateString("de-DE")}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <h2 className="font-display text-lg font-semibold text-foreground mt-8 mb-4">{cp.orders}</h2>
      <div className="border border-border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/50">
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">{cp.product}</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">{cp.quantity}</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">{cp.status}</th>
              <th className="text-left px-4 py-3 font-medium text-muted-foreground">{cp.date}</th>
            </tr>
          </thead>
          <tbody>
            {mockClinicOrders.map((o) => (
              <tr key={o.id} className="border-t border-border">
                <td className="px-4 py-3 text-foreground">{o.product}</td>
                <td className="px-4 py-3 text-muted-foreground">{o.quantity}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    o.status === "geliefert" ? "bg-accent/10 text-accent" :
                    o.status === "bestellt" ? "bg-blue-500/10 text-blue-500" :
                    "bg-yellow-500/10 text-yellow-500"
                  }`}>{o.status === "geliefert" ? cp.delivered : o.status === "bestellt" ? cp.ordered : cp.pending}</span>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{new Date(o.date).toLocaleDateString("de-DE")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClinicOverview;
