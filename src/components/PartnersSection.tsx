import { motion } from "framer-motion";
import { Building, Factory } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";

const icons = [Building, Factory];
const links = ["/clinics", "/manufacturers"];

const PartnersSection = () => {
  const { t } = useLanguage();

  return (
    <section id="partner" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16"
        >
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-accent mb-4">
            {t.partnersSection.label}
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
            {t.partnersSection.title}
          </h2>
          <div className="w-12 h-px bg-gradient-brand" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {t.partnersSection.types.map((partner, i) => {
            const Icon = icons[i] ?? Building;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
              >
                <Link
                  to={links[i] ?? "/"}
                  className="block h-full border border-border rounded-lg p-8 bg-card hover:shadow-brand transition-all duration-300"
                >
                  <Icon size={24} className="text-accent mb-4" />
                  <h3 className="font-display font-semibold text-lg text-foreground mb-3">{partner.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{partner.desc}</p>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap gap-3"
        >
          {t.partnersSection.benefits.map((b) => (
            <span key={b} className="px-5 py-2.5 rounded-md bg-secondary text-secondary-foreground text-sm font-medium border border-border">
              {b}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PartnersSection;
