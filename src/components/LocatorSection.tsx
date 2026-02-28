import { motion } from "framer-motion";
import { MapPin, Search, Filter, Building2 } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import logo from "@/assets/dentopoint-logo.png";

const LocatorSection = () => {
  const { t } = useLanguage();

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
            className="lg:col-span-3 border border-border rounded-lg bg-secondary/30 min-h-[500px] flex items-center justify-center relative overflow-hidden"
          >
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle, hsl(var(--emerald-jade) / 0.08) 1px, transparent 1px)`,
                backgroundSize: "24px 24px",
              }}
            />
            <div className="text-center relative z-10 px-6">
              <div className="w-20 h-20 rounded-2xl bg-card border border-border shadow-brand mx-auto mb-4 flex items-center justify-center p-3">
                <img src={logo} alt="DentoPoint" className="w-14 h-14 object-contain" />
              </div>
              <p className="font-display font-semibold text-foreground mb-2">{t.locator.interactiveMap}</p>
              <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                {t.locator.mapDesc}
              </p>
              <div className="flex items-center justify-center gap-2 mt-4">
                <Building2 size={14} className="text-accent" />
                <span className="text-xs text-muted-foreground">{t.locator.locationsActive}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LocatorSection;
