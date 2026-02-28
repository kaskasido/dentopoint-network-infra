import { mockAutomats } from "@/data/mockAutomats";
import { MapPin, Wifi, WifiOff, Wrench } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

const ManufacturerMap = () => {
  const { t } = useLanguage();
  const mp = t.manufacturerPortal;
  const [selected, setSelected] = useState<string | null>(null);
  const selectedAutomat = mockAutomats.find((a) => a.id === selected);

  const mapBounds = { minLat: 30, maxLat: 56, minLng: 4, maxLng: 125 };
  const mapW = 800;
  const mapH = 500;
  const toXY = (lat: number, lng: number) => ({
    x: ((lng - mapBounds.minLng) / (mapBounds.maxLng - mapBounds.minLng)) * mapW,
    y: ((mapBounds.maxLat - lat) / (mapBounds.maxLat - mapBounds.minLat)) * mapH,
  });

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-foreground mb-2">{mp.mapTitle}</h1>
      <p className="text-muted-foreground text-sm mb-8">{mp.mapDesc}</p>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 border border-border rounded-lg bg-card p-4 overflow-hidden">
          <svg viewBox={`0 0 ${mapW} ${mapH}`} className="w-full h-auto" style={{ minHeight: 350 }}>
            <rect width={mapW} height={mapH} rx="8" fill="hsl(var(--muted))" />
            {Array.from({ length: 10 }).map((_, i) => (
              <g key={i}>
                <line x1={i * (mapW / 10)} y1={0} x2={i * (mapW / 10)} y2={mapH} stroke="hsl(var(--border))" strokeWidth="0.5" />
                <line x1={0} y1={i * (mapH / 8)} x2={mapW} y2={i * (mapH / 8)} stroke="hsl(var(--border))" strokeWidth="0.5" />
              </g>
            ))}
            {mockAutomats.map((a) => {
              const { x, y } = toXY(a.lat, a.lng);
              const isSelected = selected === a.id;
              const pinColor = a.status === "online" ? "hsl(var(--accent))" : a.status === "offline" ? "hsl(var(--destructive))" : "hsl(var(--muted-foreground))";
              return (
                <g key={a.id} onClick={() => setSelected(a.id)} className="cursor-pointer">
                  {isSelected && (
                    <circle cx={x} cy={y} r="18" fill="none" stroke={pinColor} strokeWidth="2" opacity="0.3">
                      <animate attributeName="r" values="12;22;12" dur="2s" repeatCount="indefinite" />
                      <animate attributeName="opacity" values="0.4;0;0.4" dur="2s" repeatCount="indefinite" />
                    </circle>
                  )}
                  <circle cx={x} cy={y} r={isSelected ? 10 : 7} fill={pinColor} stroke="hsl(var(--card))" strokeWidth="2" />
                  <circle cx={x} cy={y} r="3" fill="hsl(var(--card))" />
                  <text x={x} y={y - 14} textAnchor="middle" fontSize="9" fontWeight="600" fill="hsl(var(--foreground))">{a.nr}</text>
                </g>
              );
            })}
          </svg>
          <div className="flex items-center gap-6 mt-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-accent" /> {mp.online}</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-destructive" /> {mp.offline}</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-muted-foreground" /> {mp.maintenance}</span>
          </div>
        </div>

        <div className="border border-border rounded-lg bg-card p-6">
          {selectedAutomat ? (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <MapPin size={18} className="text-accent" />
                <h3 className="font-display font-semibold text-foreground">{selectedAutomat.nr}</h3>
              </div>
              <h4 className="font-display font-bold text-lg text-foreground mb-1">{selectedAutomat.name}</h4>
              <p className="text-sm text-muted-foreground mb-4">{selectedAutomat.address}, {selectedAutomat.city}</p>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{mp.status}</span>
                  <span className={`font-medium flex items-center gap-1 ${selectedAutomat.status === "online" ? "text-accent" : selectedAutomat.status === "offline" ? "text-destructive" : "text-muted-foreground"}`}>
                    {selectedAutomat.status === "online" ? <Wifi size={14} /> : selectedAutomat.status === "offline" ? <WifiOff size={14} /> : <Wrench size={14} />}
                    {selectedAutomat.status === "online" ? mp.online : selectedAutomat.status === "offline" ? mp.offline : mp.maintenance}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{mp.fillLevel}</span>
                  <span className="font-medium text-foreground">{selectedAutomat.fillLevel}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{mp.revenue30dLabel}</span>
                  <span className="font-medium text-foreground">€{selectedAutomat.revenue30d.toLocaleString("de-DE")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{mp.lastMaintenance}</span>
                  <span className="text-foreground">{new Date(selectedAutomat.lastMaintenance).toLocaleDateString("de-DE")}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{mp.installed}</span>
                  <span className="text-foreground">{new Date(selectedAutomat.installDate).toLocaleDateString("de-DE")}</span>
                </div>
              </div>
              <h5 className="font-display font-semibold text-foreground mt-6 mb-3">{mp.productStock}</h5>
              <div className="space-y-2">
                {selectedAutomat.products.map((p) => (
                  <div key={p.name}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-muted-foreground">{p.name}</span>
                      <span className="text-foreground">{p.stock}/{p.maxStock}</span>
                    </div>
                    <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${p.stock / p.maxStock > 0.5 ? "bg-accent" : p.stock / p.maxStock > 0.25 ? "bg-yellow-500" : "bg-destructive"}`} style={{ width: `${(p.stock / p.maxStock) * 100}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <MapPin size={32} className="text-muted-foreground mx-auto mb-3" />
              <p className="text-sm text-muted-foreground">{mp.clickPin}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManufacturerMap;
