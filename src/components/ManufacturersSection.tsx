import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Box } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { supabase } from "@/integrations/supabase/client";

type Manufacturer = {
  id: string;
  name: string;
  logo_url: string | null;
};

const ManufacturersSection = () => {
  const { t } = useLanguage();
  const [manufacturers, setManufacturers] = useState<Manufacturer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data, error } = await (supabase as any)
        .from("manufacturers_public")
        .select("id, name, logo_url")
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {manufacturers.map((m, i) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="border border-border rounded-lg bg-card hover:shadow-brand transition-all duration-300 aspect-[4/3] flex flex-col items-center justify-center p-6 gap-4"
              >
                <div className="flex-1 w-full flex items-center justify-center">
                  {m.logo_url ? (
                    <img
                      src={m.logo_url}
                      alt={m.name}
                      className="max-h-20 max-w-full object-contain"
                      loading="lazy"
                    />
                  ) : (
                    <Box size={32} className="text-muted-foreground/40" />
                  )}
                </div>
                <h3 className="font-display font-medium text-sm text-foreground text-center">
                  {m.name}
                </h3>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ManufacturersSection;
