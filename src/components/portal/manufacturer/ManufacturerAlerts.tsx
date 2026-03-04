import { mockAlerts } from "@/data/mockAutomats";
import { AlertTriangle, AlertCircle, Info, CheckCircle } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { getLocale } from "@/i18n/localeMap";

const iconMap = { critical: AlertTriangle, warning: AlertCircle, info: Info };
const colorMap = {
  critical: "text-destructive bg-destructive/10 border-destructive/20",
  warning: "text-yellow-600 bg-yellow-50 border-yellow-200",
  info: "text-accent bg-accent/10 border-accent/20",
};

const alertMessageMap: Record<string, string> = {
  "Automat offline – keine Verbindung seit 48h": "alertOffline48h",
  "Füllstand unter 50% – Nachfüllung empfohlen": "alertFillBelow50",
  "Planmäßige Wartung läuft": "alertScheduledMaint",
  "Niedriger Produktbestand: Implant Care Kit (3/40)": "alertLowStock",
  "Wartung erfolgreich abgeschlossen": "alertMaintComplete",
  "Nächste Wartung überfällig (05.03.2026)": "alertMaintOverdue",
};

const ManufacturerAlerts = () => {
  const { t, lang } = useLanguage();
  const mp = t.manufacturerPortal;
  const md = t.mockData;
  const locale = getLocale(lang);
  const unresolved = mockAlerts.filter((a) => !a.resolved);
  const resolved = mockAlerts.filter((a) => a.resolved);

  const translateAlert = (msg: string) => {
    const key = alertMessageMap[msg] || alertMessageMap[msg.replace(/ \(.*\)$/, "")];
    return key && md[key] ? md[key] : msg;
  };

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-foreground mb-2">{mp.alertsTitle}</h1>
      <p className="text-muted-foreground text-sm mb-8">{mp.alertsDesc}</p>

      <h2 className="font-display text-lg font-semibold text-foreground mb-4">{mp.openAlertsCount} ({unresolved.length})</h2>
      <div className="space-y-3 mb-10">
        {unresolved.map((alert) => {
          const Icon = iconMap[alert.type];
          return (
            <div key={alert.id} className={`border rounded-lg p-4 flex items-start gap-4 ${colorMap[alert.type]}`}>
              <Icon size={20} className="shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-xs font-semibold">{alert.automatNr}</span>
                  <span className="text-xs opacity-70">{alert.automatName}</span>
                </div>
                <p className="text-sm font-medium">{translateAlert(alert.message)}</p>
                <p className="text-xs opacity-60 mt-1">{new Date(alert.timestamp).toLocaleString(locale)}</p>
              </div>
              <span className={`px-2 py-0.5 rounded text-xs font-medium uppercase ${
                alert.type === "critical" ? "bg-destructive text-destructive-foreground" :
                alert.type === "warning" ? "bg-yellow-500 text-white" : "bg-accent text-accent-foreground"
              }`}>{alert.type}</span>
            </div>
          );
        })}
      </div>

      {resolved.length > 0 && (
        <>
          <h2 className="font-display text-lg font-semibold text-foreground mb-4">{mp.resolvedAlerts} ({resolved.length})</h2>
          <div className="space-y-3">
            {resolved.map((alert) => (
              <div key={alert.id} className="border border-border rounded-lg p-4 flex items-start gap-4 bg-muted/30 opacity-60">
                <CheckCircle size={20} className="text-accent shrink-0 mt-0.5" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs font-semibold">{alert.automatNr}</span>
                    <span className="text-xs text-muted-foreground">{alert.automatName}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{translateAlert(alert.message)}</p>
                  <p className="text-xs text-muted-foreground mt-1">{new Date(alert.timestamp).toLocaleString(locale)}</p>
                </div>
                <span className="px-2 py-0.5 rounded text-xs font-medium bg-accent/10 text-accent">{mp.resolved}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ManufacturerAlerts;
