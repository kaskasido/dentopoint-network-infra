import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { MapPin, Wifi, WifiOff, Wrench } from "lucide-react";
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import EmptyState from "@/components/portal/shared/EmptyState";

const FitBounds = ({ rows }: { rows: any[] }) => {
  const map = useMap();
  useEffect(() => {
    const bounds = rows.filter((a) => a.latitude && a.longitude).map((a) => [a.latitude, a.longitude] as [number, number]);
    if (bounds.length) map.fitBounds(bounds, { padding: [40, 40] });
  }, [map, rows]);
  return null;
};

const ManufacturerMap = () => {
  const [rows, setRows] = useState<any[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.from("automats").select("*").then(({ data }) => {
      setRows(data ?? []);
      setLoading(false);
    });
  }, []);

  const sel = rows.find((a) => a.id === selected);
  const geoRows = rows.filter((a) => a.latitude && a.longitude);
  const color = (s: string) => s === "active" ? "#22c55e" : s === "offline" ? "#ef4444" : "#9ca3af";

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-foreground mb-2">Karte</h1>
      <p className="text-muted-foreground text-sm mb-8">Geografische Verteilung deiner Automaten.</p>

      {loading ? <p className="text-sm text-muted-foreground">Lade…</p> : geoRows.length === 0 ? (
        <EmptyState description="Noch keine Automaten mit Koordinaten erfasst. Lege im Admin-Bereich Latitude/Longitude an." />
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 border border-border rounded-lg bg-card overflow-hidden" style={{ minHeight: 500 }}>
            <MapContainer center={[48.5, 11.5]} zoom={5} style={{ height: 500, width: "100%" }} scrollWheelZoom>
              <TileLayer attribution='&copy; OpenStreetMap' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <FitBounds rows={geoRows} />
              {geoRows.map((a) => (
                <CircleMarker key={a.id} center={[a.latitude, a.longitude]} radius={selected === a.id ? 12 : 8}
                  pathOptions={{ color: color(a.status), fillColor: color(a.status), fillOpacity: 0.8, weight: selected === a.id ? 3 : 2 }}
                  eventHandlers={{ click: () => setSelected(a.id) }}>
                  <Popup><strong>{a.name}</strong><br />{[a.city, a.country].filter(Boolean).join(", ")}</Popup>
                </CircleMarker>
              ))}
            </MapContainer>
          </div>
          <div className="border border-border rounded-lg bg-card p-6">
            {sel ? (
              <div>
                <div className="flex items-center gap-2 mb-4"><MapPin size={18} className="text-accent" /><h3 className="font-display font-semibold text-foreground">{sel.name}</h3></div>
                <p className="text-sm text-muted-foreground mb-4">{[sel.address, sel.city].filter(Boolean).join(", ")}</p>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between"><span className="text-muted-foreground">Status</span>
                    <span className={`font-medium flex items-center gap-1 ${sel.status === "active" ? "text-accent" : sel.status === "offline" ? "text-destructive" : "text-yellow-500"}`}>
                      {sel.status === "active" ? <Wifi size={14} /> : sel.status === "offline" ? <WifiOff size={14} /> : <Wrench size={14} />} {sel.status}
                    </span>
                  </div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Seriennr.</span><span className="font-mono text-xs text-foreground">{sel.serial_number}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Installiert</span><span className="text-foreground">{sel.installed_at ? new Date(sel.installed_at).toLocaleDateString() : "—"}</span></div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12"><MapPin size={32} className="text-muted-foreground mx-auto mb-3" /><p className="text-sm text-muted-foreground">Klicke einen Pin auf der Karte.</p></div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ManufacturerMap;
