import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Search, Building2 } from "lucide-react";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useLanguage } from "@/i18n/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import pinImg from "@/assets/dentopoint-pin.png";

type Automat = {
  id: string;
  name: string;
  city: string | null;
  country: string | null;
  address: string | null;
  status: string;
  latitude: number | null;
  longitude: number | null;
};

const makePinIcon = (zoom: number) => {
  // Scale: ~28px at zoom 4, ~72px at zoom 15
  const size = Math.round(Math.min(80, Math.max(28, zoom * 5 + 8)));
  return L.icon({
    iconUrl: pinImg,
    iconSize: [size, size],
    iconAnchor: [size / 2, size],
    popupAnchor: [0, -size],
  });
};

const FitBounds = ({ rows }: { rows: Automat[] }) => {
  const map = useMap();
  useEffect(() => {
    const pts = rows.filter((r) => r.latitude && r.longitude).map((r) => [r.latitude!, r.longitude!] as [number, number]);
    if (pts.length === 1) map.setView(pts[0], 13);
    else if (pts.length > 1) map.fitBounds(pts, { padding: [40, 40] });
  }, [map, rows]);
  return null;
};

const ZoomTracker = ({ onZoom }: { onZoom: (z: number) => void }) => {
  const map = useMapEvents({
    zoomend: () => onZoom(map.getZoom()),
  });
  useEffect(() => {
    onZoom(map.getZoom());
  }, [map, onZoom]);
  return null;
};

const LocatorSection = () => {
  const { t } = useLanguage();
  const [rows, setRows] = useState<Automat[]>([]);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [zoom, setZoom] = useState(5);

  useEffect(() => {
    supabase
      .from("automats")
      .select("id,name,city,country,address,status,latitude,longitude")
      .eq("status", "active")
      .then(({ data }) => setRows((data ?? []) as Automat[]));
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((r) =>
      [r.name, r.city, r.country, r.address].filter(Boolean).join(" ").toLowerCase().includes(q),
    );
  }, [rows, query]);

  const geoRows = filtered.filter((r) => r.latitude && r.longitude);
  const icon = useMemo(() => makePinIcon(zoom), [zoom]);

  return (
    <section id="locator" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16"
        >
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-accent mb-4">
            {t.locator.label}
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
            {t.locator.title}
          </h2>
          <div className="w-12 h-px bg-gradient-brand" />
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 space-y-4"
          >
            <div className="border border-border rounded-lg p-4 bg-card flex items-center gap-3">
              <Search size={18} className="text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.locator.searchPlaceholder}
                className="flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
              />
            </div>

            <div className="space-y-3">
              {filtered.length === 0 ? (
                <div className="border border-border rounded-lg p-5 bg-card text-sm text-muted-foreground">
                  {t.locator.mapDesc}
                </div>
              ) : (
                filtered.map((a) => (
                  <button
                    key={a.id}
                    onClick={() => setSelected(a.id)}
                    className={`w-full text-left border rounded-lg p-5 bg-card transition ${
                      selected === a.id ? "border-accent" : "border-border hover:border-accent/40"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <MapPin size={18} className="text-accent mt-0.5" />
                      <div>
                        <p className="text-sm font-semibold text-foreground">{a.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {[a.address, a.city].filter(Boolean).join(", ")}
                        </p>
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>

            <div className="flex items-center gap-2 pt-2">
              <Building2 size={14} className="text-accent" />
              <span className="text-xs text-muted-foreground">
                {filtered.length} {t.locator.locationsActive}
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3 border border-border rounded-lg bg-secondary/30 min-h-[500px] overflow-hidden"
          >
            <MapContainer
              center={[51.1657, 10.4515]}
              zoom={5}
              style={{ height: 500, width: "100%" }}
              scrollWheelZoom={false}
            >
              <TileLayer
                attribution='&copy; OpenStreetMap'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <FitBounds rows={geoRows} />
              <ZoomTracker onZoom={setZoom} />
              {geoRows.map((a) => (
                <Marker
                  key={a.id}
                  position={[a.latitude!, a.longitude!]}
                  icon={icon}
                  eventHandlers={{ click: () => setSelected(a.id) }}
                >
                  <Popup>
                    <strong>{a.name}</strong>
                    <br />
                    {[a.address, a.city].filter(Boolean).join(", ")}
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LocatorSection;
