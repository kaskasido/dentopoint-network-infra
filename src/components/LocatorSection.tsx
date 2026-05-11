import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Search, Filter, Building2 } from "lucide-react";
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useLanguage } from "@/i18n/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/dentopoint-icon.png";

type Automat = {
  id: string;
  name: string;
  city: string | null;
  address: string | null;
  country: string | null;
  latitude: number | null;
  longitude: number | null;
  status: string;
};

const FitBounds = ({ rows }: { rows: Automat[] }) => {
  const map = useMap();
  useEffect(() => {
    const pts = rows
      .filter((a) => a.latitude && a.longitude)
      .map((a) => [a.latitude as number, a.longitude as number] as [number, number]);
    if (pts.length === 1) map.setView(pts[0], 12);
    else if (pts.length > 1) map.fitBounds(pts, { padding: [40, 40] });
  }, [map, rows]);
  return null;
};

const LocatorSection = () => {
  const { t } = useLanguage();
  const [rows, setRows] = useState<Automat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase
      .from("automats")
      .select("id,name,city,address,country,latitude,longitude,status")
      .eq("status", "active")
      .then(({ data }) => {
        setRows((data ?? []) as Automat[]);
        setLoading(false);
      });
  }, []);

  const geoRows = rows.filter((a) => a.latitude && a.longitude);

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
            <div className="border border-border rounded-lg p-4 bg-card">
              <div className="flex items-center gap-3 text-muted-foreground">
                <Search size={18} />
                <span className="text-sm">{t.locator.searchPlaceholder}</span>
              </div>
            </div>

            {t.locator.filters.map((filter) => (
              <div key={filter} className="border border-border rounded-lg p-4 bg-card flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Filter size={16} className="text-accent" />
                  <span className="text-sm font-medium text-foreground">{filter}</span>
                </div>
                <span className="text-xs text-muted-foreground">All</span>
              </div>
            ))}

            <div className="space-y-3 mt-6">
              {loading && (
                <div className="border border-border rounded-lg p-5 bg-card text-sm text-muted-foreground">
                  …
                </div>
              )}
              {!loading && rows.length === 0 && (
                <div className="border border-border rounded-lg p-5 bg-card text-sm text-muted-foreground">
                  {t.locator.locationsActive}
                </div>
              )}
              {rows.map((a) => (
                <div key={a.id} className="border border-border rounded-lg p-5 bg-card">
                  <div className="flex items-start gap-3">
                    <MapPin size={18} className="text-accent mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">{a.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {[a.address, a.city].filter(Boolean).join(", ")}
                      </p>
                      <p className="text-xs text-accent mt-1 capitalize">{a.status}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3 border border-border rounded-lg bg-secondary/30 min-h-[500px] relative overflow-hidden"
          >
            {geoRows.length === 0 ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `radial-gradient(circle, hsl(var(--emerald-jade) / 0.08) 1px, transparent 1px)`,
                    backgroundSize: "24px 24px",
                  }}
                />
                <div className="text-center relative z-10 px-6">
                  <div className="w-16 h-16 rounded-xl overflow-hidden shadow-brand mx-auto mb-4">
                    <img src={logo} alt="DentoPoint" className="w-full h-full object-cover" />
                  </div>
                  <p className="font-display font-semibold text-foreground mb-2">{t.locator.interactiveMap}</p>
                  <p className="text-sm text-muted-foreground max-w-xs mx-auto">{t.locator.mapDesc}</p>
                  <div className="flex items-center justify-center gap-2 mt-4">
                    <Building2 size={14} className="text-accent" />
                    <span className="text-xs text-muted-foreground">{t.locator.locationsActive}</span>
                  </div>
                </div>
              </div>
            ) : (
              <MapContainer center={[51, 10]} zoom={5} style={{ height: 500, width: "100%" }} scrollWheelZoom>
                <TileLayer attribution='&copy; OpenStreetMap' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <FitBounds rows={geoRows} />
                {geoRows.map((a) => (
                  <CircleMarker
                    key={a.id}
                    center={[a.latitude as number, a.longitude as number]}
                    radius={9}
                    pathOptions={{ color: "hsl(var(--emerald-jade))", fillColor: "hsl(var(--emerald-jade))", fillOpacity: 0.85, weight: 2 }}
                  >
                    <Popup>
                      <strong>{a.name}</strong>
                      <br />
                      {[a.address, a.city].filter(Boolean).join(", ")}
                    </Popup>
                  </CircleMarker>
                ))}
              </MapContainer>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LocatorSection;
