import { mockNicoDetectDevices } from "@/data/mockClinicData";
import { Monitor, Wifi, WifiOff, Power, CalendarCheck, ScanLine } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { getLocale } from "@/i18n/localeMap";

const ClinicDevices = () => {
  const { t, lang } = useLanguage();
  const nd = (t as any).nicoDetect || ({} as any);
  const locale = getLocale(lang);

  const online = mockNicoDetectDevices.filter((d) => d.status === "online").length;
  const totalScansToday = mockNicoDetectDevices.reduce((s, d) => s + d.scansToday, 0);

  const statusIcon = (status: string) => {
    if (status === "online") return <Wifi size={12} />;
    if (status === "offline") return <WifiOff size={12} />;
    return <Power size={12} />;
  };

  const statusClass = (status: string) => {
    if (status === "online") return "bg-accent/10 text-accent";
    if (status === "offline") return "bg-destructive/10 text-destructive";
    return "bg-muted text-muted-foreground";
  };

  const statusLabel = (status: string) => {
    if (status === "online") return nd.statusOnline || "Online";
    if (status === "offline") return nd.statusOffline || "Offline";
    return nd.statusStandby || "Standby";
  };

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-foreground mb-2">{nd.title || "NICO Detect"}</h1>
      <p className="text-muted-foreground text-sm mb-8">{nd.desc || "NICO Detect diagnostic workstations connected to your clinic."}</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="border border-border rounded-lg p-5 bg-card">
          <Monitor size={20} className="text-accent mb-3" />
          <p className="font-display text-2xl font-bold text-foreground">{mockNicoDetectDevices.length}</p>
          <p className="text-xs text-muted-foreground mt-1">{nd.totalDevices || "Devices Total"}</p>
        </div>
        <div className="border border-border rounded-lg p-5 bg-card">
          <Wifi size={20} className="text-accent mb-3" />
          <p className="font-display text-2xl font-bold text-foreground">{online}</p>
          <p className="text-xs text-muted-foreground mt-1">{nd.devicesOnline || "Online"}</p>
        </div>
        <div className="border border-border rounded-lg p-5 bg-card">
          <ScanLine size={20} className="text-accent mb-3" />
          <p className="font-display text-2xl font-bold text-foreground">{totalScansToday}</p>
          <p className="text-xs text-muted-foreground mt-1">{nd.scansToday || "Scans Today"}</p>
        </div>
        <div className="border border-border rounded-lg p-5 bg-card">
          <CalendarCheck size={20} className="text-accent mb-3" />
          <p className="font-display text-2xl font-bold text-foreground">
            {mockNicoDetectDevices.reduce((s, d) => s + d.totalScans, 0).toLocaleString(locale)}
          </p>
          <p className="text-xs text-muted-foreground mt-1">{nd.totalScans || "Total Scans"}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {mockNicoDetectDevices.map((device) => (
          <div key={device.id} className="border border-border rounded-lg bg-card p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="font-mono text-lg font-bold text-foreground">{device.deviceId}</p>
                <p className="text-sm text-muted-foreground">{device.room}</p>
              </div>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${statusClass(device.status)}`}>
                {statusIcon(device.status)}
                {statusLabel(device.status)}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
              <div>
                <p className="text-xs text-muted-foreground">{nd.softwareVersion || "Software"}</p>
                <p className="font-medium text-foreground">{device.softwareVersion}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{nd.scansToday || "Scans Today"}</p>
                <p className="font-medium text-foreground">{device.scansToday}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{nd.lastScan || "Last Scan"}</p>
                <p className="font-medium text-foreground">
                  {new Date(device.lastScan).toLocaleString(locale, { dateStyle: "short", timeStyle: "short" })}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{nd.totalScans || "Total Scans"}</p>
                <p className="font-medium text-foreground">{device.totalScans.toLocaleString(locale)}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{nd.lastCalibration || "Last Calibration"}</p>
                <p className="font-medium text-foreground">
                  {new Date(device.lastCalibration).toLocaleDateString(locale)}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{nd.nextCalibration || "Next Calibration"}</p>
                <p className="font-medium text-foreground">
                  {new Date(device.nextCalibration).toLocaleDateString(locale)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClinicDevices;
