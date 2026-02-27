import { motion } from "framer-motion";
import { TrendingUp, Users, ShoppingBag, Activity } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const metricIcons = [TrendingUp, ShoppingBag, Users, Activity];
const metricValues = ["€12,400", "34.2%", "78%", "48"];

const AnalyticsSection = () => {
  const { t } = useLanguage();

  return (
    <section id="analytics" className="py-24 md:py-32 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16"
        >
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-accent mb-4">
            {t.analytics.label}
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
            {t.analytics.title}
          </h2>
          <div className="w-12 h-px bg-gradient-brand" />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {t.analytics.metrics.map((m, i) => {
            const Icon = metricIcons[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="border border-border rounded-lg p-6 bg-card"
              >
                <Icon size={18} className="text-accent mb-3" />
                <p className="text-xs text-muted-foreground mb-1">{m.label}</p>
                <p className="font-display text-2xl font-bold text-foreground">{metricValues[i]}</p>
                <p className="text-xs text-accent font-medium mt-1">{m.change}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="border border-border rounded-lg bg-card p-8 shadow-brand"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-display font-semibold text-foreground">{t.analytics.dashboardTitle}</h3>
            <span className="text-xs text-muted-foreground bg-secondary px-3 py-1 rounded-md">{t.analytics.liveDashboard}</span>
          </div>

          <div className="flex items-end gap-3 h-48">
            {[65, 42, 78, 55, 88, 72, 60, 85, 48, 92, 68, 75].map((h, i) => (
              <motion.div
                key={i}
                initial={{ height: 0 }}
                whileInView={{ height: `${h}%` }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.05 }}
                className="flex-1 bg-gradient-brand rounded-t-sm opacity-70 hover:opacity-100 transition-opacity"
              />
            ))}
          </div>
          <div className="flex justify-between mt-3">
            <span className="text-xs text-muted-foreground">Jan</span>
            <span className="text-xs text-muted-foreground">Dec</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AnalyticsSection;
