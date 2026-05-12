import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Box, CheckCircle, Globe, MapPin } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { supabase } from "@/integrations/supabase/client";

type Manufacturer = {
  id: string;
  name: string;
  country: string | null;
  website: string | null;
  notes: string | null;
  logo_url: string | null;
};

const ManufacturersSection = () => {
  const { t } = useLanguage();
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("manufacturers")
        .select("id, name, country, website, notes, logo_url")
        .eq("status", "active")
        .order("name", { ascending: true });
      if (!error) setManufacturers((data ?? []) as Manufacturer[]);
      setLoading(false);
    })();
  }, []);

  return (
    <section id="manufacturers" className="py-24 md:py-32 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16"
        >
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-accent mb-4">
            {t.manufacturersSection.label}
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
            {t.manufacturersSection.title}
          </h2>
          <div className="w-12 h-px bg-gradient-brand" />
        </motion.div>

        {loading ? (
          <p className="text-sm text-muted-foreground">…</p>
        ) : manufacturers.length === 0 ? (
          <p className="text-sm text-muted-foreground">—</p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {manufacturers.map((m, i) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="border border-border rounded-lg p-6 bg-card hover:shadow-brand transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-lg bg-secondary flex items-center justify-center mb-5 overflow-hidden">
                  {m.logo_url ? (
                    <img src={m.logo_url} alt={m.name} className="w-full h-full object-contain p-1.5" />
                  ) : (
                    <Box size={20} className="text-primary" />
                  )}
                </div>
                <h3 className="font-display font-semibold text-foreground mb-4">{m.name}</h3>
                <div className="space-y-2.5 text-sm">
                  {m.notes && (
                    <div className="flex items-start gap-2">
                      <CheckCircle size={14} className="text-accent mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">{m.notes}</span>
                    </div>
                  )}
                  {m.country && (
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-accent shrink-0" />
                      <span className="text-muted-foreground">{m.country}</span>
                    </div>
                  )}
                  {m.website && (
                    <div className="flex items-center gap-2">
                      <Globe size={14} className="text-accent shrink-0" />
                      <a
                        href={m.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-accent transition-colors truncate"
                      >
                        {m.website.replace(/^https?:\/\//, "").replace(/\/$/, "")}
                      </a>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ManufacturersSection;
