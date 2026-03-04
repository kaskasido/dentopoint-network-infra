import { mockAutomats } from "@/data/mockAutomats";
import { MapPin, Wifi, WifiOff, Wrench } from "lucide-react";
import { useState, useEffect } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import { getLocale } from "@/i18n/localeMap";
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const FitBounds = () => {
  const map = useMap();
  useEffect(() => {
    const bounds = mockAutomats.map((a) => [a.lat, a.lng] as [number, number]);
    if (bounds.length) map.fitBounds(bounds, { padding: [40, 40] });
  }, [map]);
  return null;
};

const ManufacturerMap = () => {
  const { t, lang } = useLanguage();
  const mp = t.manufacturerPortal;
  const locale = getLocale(lang);
  const [selected, setSelected] = useState<string | null>(null);
  const selectedAutomat = mockAutomats.find((a) => a.id === selected);

  const getColor = (status: string) =>
    status === "online" ? "#22c55e" : status === "offline" ? "#ef4444" : "#9ca3af";

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-foreground mb-2">{mp.mapTitle}</h1>
      <p className="text-muted-foreground text-sm mb-8">{mp.mapDesc}</p>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 border border-border rounded-lg bg-card overflow-hidden" style={{ minHeight: 500 }}>
          <MapContainer
            center={[48.5, 11.5]}
            zoom={5}
            style={{ height: "100%", width: "100%", minHeight: 500 }}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <FitBounds />
            {mockAutomats.map((a) => (
              <CircleMarker
                key={a.id}
                center={[a.lat, a.lng]}
                radius={selected === a.id ? 12 : 8}
                pathOptions={{
                  color: getColor(a.status),
                  fillColor: getColor(a.status),
                  fillOpacity: 0.8,
                  weight: selected === a.id ? 3 : 2,
                }}
                eventHandlers={{ click: () => setSelected(a.id) }}
              >
                <Popup>
                  <strong>{a.nr}</strong> – {a.name}<br />
                  {a.city}, {a.country}
                </Popup>
              </CircleMarker>
            ))}
          </MapContainer>
          <div className="flex items-center gap-6 p-3 text-xs text-muted-foreground border-t border-border">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-green-500" /> {mp.online}</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-red-500" /> {mp.offline}</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-full bg-gray-400" /> {mp.maintenance}</span>
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
                  <span className="font-medium text-foreground">€{selectedAutomat.revenue30d.toLocaleString(locale)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{mp.lastMaintenance}</span>
                  <span className="text-foreground">{new Date(selectedAutomat.lastMaintenance).toLocaleDateString(locale)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">{mp.installed}</span>
                  <span className="text-foreground">{new Date(selectedAutomat.installDate).toLocaleDateString(locale)}</span>
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
