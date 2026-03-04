import { mockClinicAutomats } from "@/data/mockClinicData";
import { Wifi, WifiOff, Wrench, RefreshCw } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { getLocale } from "@/i18n/localeMap";

const locationMap: Record<string, string> = {
  "Eingangsbereich": "entrance",
  "Wartezimmer Station A": "waitingRoomA",
  "Cafeteria": "cafeteria",
  "Notaufnahme": "emergencyRoom",
};

const floorMap: Record<string, string> = {
  "EG": "groundFloor",
  "1. OG": "firstFloor",
};

const ClinicAutomats = () => {
  const { t, lang } = useLanguage();
  const cp = t.clinicPortal;
  const md = t.mockData;
  const locale = getLocale(lang);

  const tr = (map: Record<string, string>, val: string) => {
    const key = map[val];
    return key && md[key] ? md[key] : val;
  };

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-foreground mb-2">{cp.automatsTitle}</h1>
      <p className="text-muted-foreground text-sm mb-8">{cp.automatsDesc}</p>

      <div className="grid md:grid-cols-2 gap-6">
        {mockClinicAutomats.map((a) => (
          <div key={a.id} className="border border-border rounded-lg bg-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="font-mono text-lg font-bold text-foreground">{a.nr}</p>
                <p className="text-sm text-muted-foreground">{tr(locationMap, a.location)} • {tr(floorMap, a.floor)}</p>
              </div>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                a.status === "online" ? "bg-accent/10 text-accent" :
                a.status === "offline" ? "bg-destructive/10 text-destructive" :
                "bg-muted text-muted-foreground"
              }`}>
                {a.status === "online" ? <Wifi size={12} /> : a.status === "offline" ? <WifiOff size={12} /> : <Wrench size={12} />}
                {a.status === "online" ? cp.online : a.status === "offline" ? cp.offline || "Offline" : cp.maintenance}
              </span>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>{cp.fillLevel}</span>
                  <span>{a.fillLevel}%</span>
                </div>
                <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all ${a.fillLevel > 60 ? "bg-accent" : a.fillLevel > 30 ? "bg-yellow-500" : "bg-destructive"}`} style={{ width: `${a.fillLevel}%` }} />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <p className="text-xs text-muted-foreground">{cp.dailyUsagesLabel}</p>
                  <p className="text-lg font-bold text-foreground">{a.dailyUsage}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{cp.lastRefill}</p>
                  <p className="text-sm font-medium text-foreground flex items-center gap-1">
                    <RefreshCw size={12} className="text-muted-foreground" />
                    {new Date(a.lastRefill).toLocaleDateString(locale)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClinicAutomats;
