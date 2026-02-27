import { mockAutomats, mockAlerts } from "@/data/mockAutomats";
import { Box, Wifi, WifiOff, Wrench, AlertTriangle, TrendingUp, Euro, Package } from "lucide-react";

const ManufacturerOverview = () => {
  const online = mockAutomats.filter((a) => a.status === "online").length;
  const offline = mockAutomats.filter((a) => a.status === "offline").length;
  const wartung = mockAutomats.filter((a) => a.status === "wartung").length;
  const totalRevenue = mockAutomats.reduce((s, a) => s + a.revenue30d, 0);
  const avgFill = Math.round(mockAutomats.reduce((s, a) => s + a.fillLevel, 0) / mockAutomats.length);
  const unresolvedAlerts = mockAlerts.filter((a) => !a.resolved).length;

  const stats = [
    { label: "Automaten gesamt", value: mockAutomats.length, icon: Box, color: "text-accent" },
    { label: "Online", value: online, icon: Wifi, color: "text-accent" },
    { label: "Offline", value: offline, icon: WifiOff, color: "text-destructive" },
    { label: "In Wartung", value: wartung, icon: Wrench, color: "text-muted-foreground" },
    { label: "Ø Füllstand", value: `${avgFill}%`, icon: Package, color: "text-accent" },
    { label: "Offene Alerts", value: unresolvedAlerts, icon: AlertTriangle, color: unresolvedAlerts > 0 ? "text-destructive" : "text-accent" },
    { label: "Umsatz (30 Tage)", value: `€${totalRevenue.toLocaleString("de-DE")}`, icon: Euro, color: "text-accent" },
    { label: "Ø Umsatz/Automat", value: `€${Math.round(totalRevenue / mockAutomats.length).toLocaleString("de-DE")}`, icon: TrendingUp, color: "text-accent" },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-foreground mb-2">Dashboard</h1>
      <p className="text-muted-foreground text-sm mb-8">Übersicht aller DentoPoint Automaten und Kennzahlen.</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="border border-border rounded-lg p-5 bg-card">
            <s.icon size={20} className={`${s.color} mb-3`} />
            <p className="font-display text-2xl font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <h2 className="font-display text-lg font-semibold text-foreground mb-4">Alle Automaten</h2>
      <div className="border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Nr.</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Standort</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Stadt</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Status</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Füllstand</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Umsatz (30T)</th>
                <th className="text-left px-4 py-3 font-medium text-muted-foreground">Nächste Wartung</th>
              </tr>
            </thead>
            <tbody>
              {mockAutomats.map((a) => (
                <tr key={a.id} className="border-t border-border hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3 font-mono font-semibold text-foreground">{a.nr}</td>
                  <td className="px-4 py-3 text-foreground">{a.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{a.city}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${
                      a.status === "online" ? "bg-accent/10 text-accent" :
                      a.status === "offline" ? "bg-destructive/10 text-destructive" :
                      "bg-muted text-muted-foreground"
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        a.status === "online" ? "bg-accent" :
                        a.status === "offline" ? "bg-destructive" :
                        "bg-muted-foreground"
                      }`} />
                      {a.status === "online" ? "Online" : a.status === "offline" ? "Offline" : "Wartung"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            a.fillLevel > 60 ? "bg-accent" : a.fillLevel > 30 ? "bg-yellow-500" : "bg-destructive"
                          }`}
                          style={{ width: `${a.fillLevel}%` }}
                        />
                      </div>
                      <span className="text-muted-foreground text-xs">{a.fillLevel}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-foreground">€{a.revenue30d.toLocaleString("de-DE")}</td>
                  <td className="px-4 py-3 text-muted-foreground">{new Date(a.nextMaintenance).toLocaleDateString("de-DE")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManufacturerOverview;
