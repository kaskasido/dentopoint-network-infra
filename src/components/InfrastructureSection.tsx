import { motion } from "framer-motion";
import { Building2, CreditCard, PackageCheck, Stethoscope } from "lucide-react";
import smartCareModule from "@/assets/smart-care-module.png";
import { useLanguage } from "@/i18n/LanguageContext";

const icons = [Building2, CreditCard, PackageCheck, Stethoscope];

const InfrastructureSection = () => {
  const { t } = useLanguage();

  return (
    <section id="automat" className="py-24 md:py-32 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16"
        >
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-accent mb-4">
            {t.infrastructure.label}
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
            {t.infrastructure.title}
          </h2>
          <div className="w-12 h-px bg-gradient-brand" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
            <div className="flex justify-center">
              <div className="relative max-w-xs">
                <img
                  src={smartCareModule}
                  alt="DentoPoint Dental-Care-Automat"
                  width={640}
                  height={640}
                  className="rounded-xl shadow-brand-lg"
                  loading="lazy"
                />
                <div className="absolute -bottom-3 -right-3 bg-gradient-brand text-primary-foreground text-xs font-medium px-4 py-2 rounded-md">
                  {t.infrastructure.whiteEdition} · {t.infrastructure.blackEdition}
                </div>
              </div>
            </div>
            <div className="max-w-xl">
              <h3 className="font-display text-2xl font-bold text-foreground mb-4">
                {t.infrastructure.smartCareTitle}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                {t.infrastructure.smartCareDesc}
              </p>
              <div className="flex flex-wrap gap-3">
                {t.infrastructure.tags.map((tag) => (
                  <span key={tag} className="px-4 py-2 rounded-md bg-secondary text-secondary-foreground text-xs font-medium border border-border">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.infrastructure.features.map((feature, i) => {
            const Icon = icons[i] ?? Building2;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group bg-card border border-border rounded-lg p-8 hover:shadow-brand transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center mb-6 group-hover:bg-gradient-brand transition-all duration-300">
                  <Icon size={22} className="text-primary group-hover:text-primary-foreground transition-colors" />
                </div>
                <h3 className="font-display font-semibold text-lg text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default InfrastructureSection;
