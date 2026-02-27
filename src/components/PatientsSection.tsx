import { motion } from "framer-motion";
import { ShieldCheck, QrCode, ClipboardList, Heart, Sparkles, CalendarCheck } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const icons = [ClipboardList, Sparkles, ShieldCheck, QrCode, Heart, CalendarCheck];

const PatientsSection = () => {
  const { t } = useLanguage();
  const p = t.patients;

  return (
    <section id="patients" className="py-24 md:py-32 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="max-w-3xl mb-16">
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-accent mb-4">{p.label}</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">{p.title}</h2>
          <p className="text-muted-foreground leading-relaxed">{p.desc}</p>
          <div className="w-12 h-px bg-gradient-brand mt-6" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {p.items.map((item, i) => {
            const Icon = icons[i];
            return (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }} className="bg-card border border-border rounded-lg p-7 hover:shadow-brand transition-all duration-300">
                <Icon size={22} className="text-accent mb-4" />
                <h3 className="font-display font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PatientsSection;
