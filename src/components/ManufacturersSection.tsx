import { motion } from "framer-motion";
import { Box, CheckCircle, Database, Package } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const manufacturers = [
  { name: "OralTech GmbH", level: "Full Integration", categories: "Implant Care · Hygiene", data: "Real-time" },
  { name: "DentaCare AG", level: "API Connected", categories: "Whitening · Therapeutic", data: "Batch Sync" },
  { name: "SmilePro Inc.", level: "Full Integration", categories: "Preventive · Hygiene", data: "Real-time" },
  { name: "MedDent China", level: "Partner Level", categories: "Therapeutic Care", data: "Batch Sync" },
  { name: "EuroDent Solutions", level: "Full Integration", categories: "Implant Care · Whitening", data: "Real-time" },
  { name: "PrecisionDent", level: "API Connected", categories: "Preventive Programs", data: "Real-time" },
];

const ManufacturersSection = () => {
  const { t } = useLanguage();

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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {manufacturers.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="border border-border rounded-lg p-6 bg-card hover:shadow-brand transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-5">
                <Box size={20} className="text-primary" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-4">{m.name}</h3>
              <div className="space-y-2.5 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-accent" />
                  <span className="text-muted-foreground">{m.level}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Package size={14} className="text-accent" />
                  <span className="text-muted-foreground">{m.categories}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Database size={14} className="text-accent" />
                  <span className="text-muted-foreground">{t.manufacturersSection.dataLabel}: {m.data}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ManufacturersSection;
