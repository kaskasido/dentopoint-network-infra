import { motion } from "framer-motion";
import { MapPin, Search, Filter, Building2 } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import logo from "@/assets/map-pin.png";
import { useEffect, useMemo, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { mockAutomats } from "@/data/mockAutomats";

const LocatorSection = () => {
  const { t } = useLanguage();

  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  const dentopointIcon = useMemo(
    () =>
      L.icon({
        iconUrl: logo,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [0, -40],
      }),
    [],
  );

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [49, 11],
      zoom: 5,
      zoomControl: true,
      scrollWheelZoom: true,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    const markerLayer = L.layerGroup().addTo(map);
    mapRef.current = map;
    markersLayerRef.current = markerLayer;

    const markers = mockAutomats.map((a) => {
      const m = L.marker([a.lat, a.lng], { icon: dentopointIcon }).addTo(markerLayer);
      m.bindPopup(`<strong>${a.name}</strong><br/>${a.city}, ${a.country}`);
      return m;
    });

    if (markers.length > 0) {
      const bounds = L.latLngBounds(markers.map((m) => m.getLatLng()));
      map.fitBounds(bounds.pad(0.4), { maxZoom: 11 });
    }

    return () => {
      map.remove();
      mapRef.current = null;
      markersLayerRef.current = null;
    };
  }, [dentopointIcon]);


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

            <div className="border border-border rounded-lg p-5 bg-card space-y-3 mt-6">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-accent mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.locator.clinicMunich}</p>
                  <p className="text-xs text-muted-foreground mt-1">{t.locator.clinicMunichServices}</p>
                  <p className="text-xs text-accent mt-1">{t.locator.clinicMunichModules}</p>
                </div>
              </div>
            </div>

            <div className="border border-border rounded-lg p-5 bg-card space-y-3">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-accent mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.locator.clinicShanghai}</p>
                  <p className="text-xs text-muted-foreground mt-1">{t.locator.clinicShanghaiServices}</p>
                  <p className="text-xs text-accent mt-1">{t.locator.clinicShanghaiModules}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3 border border-border rounded-lg bg-card overflow-hidden"
            style={{ minHeight: 500 }}
          >
            <div ref={mapContainerRef} className="h-full w-full" style={{ minHeight: 500 }} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LocatorSection;
