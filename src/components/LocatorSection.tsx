import { motion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import logo from "@/assets/map-pin.png";
import { useEffect, useMemo, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { mockAutomats } from "@/data/mockAutomats";

// Public product page of the first machine on the patient website.
const FIRST_LOCATION_PRODUCTS_URL = "https://dentopoint.com/a/1";

const LocatorSection = () => {
  const { t } = useLanguage();

  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);

  const dentopointIcon = useMemo(
    () =>
      L.icon({
        iconUrl: logo,
        iconSize: [33, 46],
        iconAnchor: [16, 46],
        popupAnchor: [0, -46],
      }),
    [],
  );

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [50.9356, 6.9236],
      zoom: 13,
      zoomControl: true,
      scrollWheelZoom: false,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    const markerLayer = L.layerGroup().addTo(map);
    mapRef.current = map;

    const markers = mockAutomats.map((a) => {
      const m = L.marker([a.lat, a.lng], { icon: dentopointIcon }).addTo(markerLayer);
      m.bindPopup(`<strong>${a.name}</strong><br/>${a.address || `${a.city}, ${a.country}`}`);
      return m;
    });

    if (markers.length > 1) {
      const bounds = L.latLngBounds(markers.map((m) => m.getLatLng()));
      map.fitBounds(bounds.pad(0.25), { maxZoom: 11 });
    }

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [dentopointIcon]);

  return (
    <section id="standort" className="py-24 md:py-32 bg-background">
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
            <div className="border border-border rounded-lg p-6 bg-card space-y-4 shadow-brand">
              <div className="flex items-start gap-3">
                <MapPin size={20} className="text-accent mt-0.5 shrink-0" />
                <div>
                  <p className="font-display font-semibold text-foreground">{t.locator.locationName}</p>
                  <p className="text-sm text-muted-foreground mt-1">{t.locator.locationAddress}</p>
                  <p className="text-xs text-accent mt-2">{t.locator.locationNote}</p>
                </div>
              </div>
              <a
                href={FIRST_LOCATION_PRODUCTS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
              >
                {t.locator.viewProducts}
                <ArrowUpRight size={16} />
              </a>
            </div>
            <p className="text-sm text-muted-foreground px-1">{t.locator.moreSoon}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3 border border-border rounded-lg bg-card overflow-hidden"
            style={{ minHeight: 420 }}
          >
            <div ref={mapContainerRef} className="h-full w-full" style={{ minHeight: 420 }} />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LocatorSection;
