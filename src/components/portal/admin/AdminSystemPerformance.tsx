import { useEffect, useState } from "react";
import { Cpu, MemoryStick, Wifi, Monitor, RefreshCw } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

interface SystemInfo {
  cpuCores: number;
  deviceMemoryGB: number | null;
  jsHeapUsedMB: number | null;
  jsHeapTotalMB: number | null;
  connectionType: string | null;
  connectionDownlink: number | null;
  screenWidth: number;
  screenHeight: number;
  pixelRatio: number;
  userAgent: string;
  platform: string;
  language: string;
  onlineStatus: boolean;
}

interface NavigatorWithExtras extends Navigator {
  deviceMemory?: number;
  connection?: { effectiveType?: string; type?: string; downlink?: number };
  mozConnection?: { effectiveType?: string; type?: string; downlink?: number };
  webkitConnection?: { effectiveType?: string; type?: string; downlink?: number };
}

interface PerformanceWithMemory extends Performance {
  memory?: { usedJSHeapSize: number; totalJSHeapSize: number };
}

function getSystemInfo(): SystemInfo {
  const nav = navigator as NavigatorWithExtras;
  const perf = performance as PerformanceWithMemory;

  const jsHeapUsedMB =
    perf.memory?.usedJSHeapSize != null
      ? Math.round(perf.memory.usedJSHeapSize / 1024 / 1024)
      : null;

  const jsHeapTotalMB =
    perf.memory?.totalJSHeapSize != null
      ? Math.round(perf.memory.totalJSHeapSize / 1024 / 1024)
      : null;

  const conn = nav.connection ?? nav.mozConnection ?? nav.webkitConnection;

  return {
    cpuCores: nav.hardwareConcurrency ?? 1,
    deviceMemoryGB: nav.deviceMemory ?? null,
    jsHeapUsedMB,
    jsHeapTotalMB,
    connectionType: conn?.effectiveType ?? conn?.type ?? null,
    connectionDownlink: conn?.downlink ?? null,
    screenWidth: window.screen.width,
    screenHeight: window.screen.height,
    pixelRatio: window.devicePixelRatio,
    userAgent: nav.userAgent,
    platform: nav.platform ?? "—",
    language: nav.language,
    onlineStatus: nav.onLine,
  };
}

interface SystemPerformanceTranslations {
  title: string;
  desc: string;
  refresh: string;
  cpuCores: string;
  deviceMemory: string;
  network: string;
  screen: string;
  jsHeap: string;
  jsHeapUsed: string;
  jsHeapTotal: string;
  jsHeapUsedOf: string;
  details: string;
  platform: string;
  browserLang: string;
  pixelRatio: string;
  downlink: string;
  userAgent: string;
  online: string;
  offline: string;
  lastUpdated: string;
}

const AdminSystemPerformance = () => {
  const { t } = useLanguage();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sp = ((t as any).systemPerformance ?? {}) as SystemPerformanceTranslations;

  const [info, setInfo] = useState<SystemInfo>(getSystemInfo);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const refresh = () => {
    setInfo(getSystemInfo());
    setLastUpdated(new Date());
  };

  useEffect(() => {
    const id = setInterval(refresh, 5000);
    return () => clearInterval(id);
  }, []);

  const heapPercent =
    info.jsHeapUsedMB != null && info.jsHeapTotalMB != null && info.jsHeapTotalMB > 0
      ? Math.round((info.jsHeapUsedMB / info.jsHeapTotalMB) * 100)
      : null;

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h1 className="font-display text-2xl font-bold text-foreground">{sp.title}</h1>
        <button
          onClick={refresh}
          className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          <RefreshCw size={13} />
          {sp.refresh}
        </button>
      </div>
      <p className="text-muted-foreground text-sm mb-8">{sp.desc}</p>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* CPU Cores */}
        <div className="border border-border rounded-lg p-5 bg-card">
          <Cpu size={20} className="text-accent mb-3" />
          <p className="font-display text-2xl font-bold text-foreground">{info.cpuCores}</p>
          <p className="text-xs text-muted-foreground mt-1">{sp.cpuCores}</p>
        </div>

        {/* Device Memory */}
        <div className="border border-border rounded-lg p-5 bg-card">
          <MemoryStick size={20} className="text-accent mb-3" />
          <p className="font-display text-2xl font-bold text-foreground">
            {info.deviceMemoryGB != null ? `${info.deviceMemoryGB} GB` : "—"}
          </p>
          <p className="text-xs text-muted-foreground mt-1">{sp.deviceMemory}</p>
        </div>

        {/* Connection */}
        <div className="border border-border rounded-lg p-5 bg-card">
          <Wifi size={20} className={info.onlineStatus ? "text-accent mb-3" : "text-destructive mb-3"} />
          <p className="font-display text-2xl font-bold text-foreground">
            {info.onlineStatus ? (info.connectionType ?? sp.online) : sp.offline}
          </p>
          <p className="text-xs text-muted-foreground mt-1">{sp.network}</p>
        </div>

        {/* Screen */}
        <div className="border border-border rounded-lg p-5 bg-card">
          <Monitor size={20} className="text-accent mb-3" />
          <p className="font-display text-2xl font-bold text-foreground">
            {info.screenWidth}×{info.screenHeight}
          </p>
          <p className="text-xs text-muted-foreground mt-1">{sp.screen}</p>
        </div>
      </div>

      {/* JS Heap Memory */}
      {info.jsHeapUsedMB != null && (
        <div className="border border-border rounded-lg p-5 bg-card mb-6">
          <h2 className="font-display text-sm font-semibold text-foreground mb-3">{sp.jsHeap}</h2>
          <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
            <span>{sp.jsHeapUsed}: {info.jsHeapUsedMB} MB</span>
            <span>{sp.jsHeapTotal}: {info.jsHeapTotalMB} MB</span>
          </div>
          {heapPercent != null && (
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all ${heapPercent > 80 ? "bg-destructive" : "bg-accent"}`}
                style={{ width: `${heapPercent}%` }}
              />
            </div>
          )}
          {heapPercent != null && (
            <p className="text-xs text-muted-foreground mt-2">{heapPercent}% {sp.jsHeapUsedOf}</p>
          )}
        </div>
      )}

      {/* Details Table */}
      <h2 className="font-display text-lg font-semibold text-foreground mb-4">{sp.details}</h2>
      <div className="border border-border rounded-lg overflow-hidden mb-8">
        <table className="w-full text-sm">
          <tbody>
            {[
              { label: sp.platform, value: info.platform },
              { label: sp.browserLang, value: info.language },
              {
                label: sp.pixelRatio,
                value: `${info.pixelRatio}x`,
              },
              ...(info.connectionDownlink != null
                ? [{ label: sp.downlink, value: `${info.connectionDownlink} Mbit/s` }]
                : []),
              { label: sp.userAgent, value: info.userAgent },
            ].map(({ label, value }, i) => (
              <tr key={i} className={`${i % 2 === 0 ? "bg-muted/30" : ""} border-t border-border first:border-0`}>
                <td className="px-4 py-3 font-medium text-muted-foreground w-48 whitespace-nowrap">{label}</td>
                <td className="px-4 py-3 text-foreground break-all">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-muted-foreground">
        {sp.lastUpdated}: {lastUpdated.toLocaleTimeString()}
      </p>
    </div>
  );
};

export default AdminSystemPerformance;
