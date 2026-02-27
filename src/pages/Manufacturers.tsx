import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Plug, Database, BarChart3, Truck, CheckCircle, ArrowRight, Box, Zap, Shield, Globe } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";

const integrationIcons = [Plug, Shield, Zap, Globe];

const Manufacturers = () => {
  const { t } = useLanguage();
  const p = t.manufacturersPage;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-20 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl">
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-accent mb-4">{p.hero.label}</p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              {p.hero.title1}<br />{p.hero.title2}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">{p.hero.desc}</p>
          </motion.div>
        </div>
      </section>

      <section id="integration" className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="max-w-3xl mb-16">
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-accent mb-4">{p.integration.label}</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">{p.integration.title}</h2>
            <div className="w-12 h-px bg-gradient-brand" />
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            {p.integration.items.map((f, i) => {
              const Icon = integrationIcons[i];
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }} className="border border-border rounded-lg p-8 bg-card hover:shadow-brand transition-all duration-300">
                  <Icon size={24} className="text-accent mb-4" />
                  <h3 className="font-display font-semibold text-lg text-foreground mb-3">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="data" className="py-24 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="max-w-3xl mb-16">
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-accent mb-4">{p.data.label}</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">{p.data.title}</h2>
            <div className="w-12 h-px bg-gradient-brand" />
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {p.data.items.map((d, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }} className="border border-border rounded-lg p-6 bg-card text-center">
                <Database size={18} className="text-accent mx-auto mb-3" />
                <p className="text-xs text-muted-foreground mb-1">{d.label}</p>
                <p className="font-display text-2xl font-bold text-foreground">{d.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="performance" className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="max-w-3xl mb-16">
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-accent mb-4">{p.performance.label}</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">{p.performance.title}</h2>
            <div className="w-12 h-px bg-gradient-brand" />
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {p.performance.items.map((m, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }} className="border border-border rounded-lg p-6 bg-card">
                <BarChart3 size={18} className="text-accent mb-3" />
                <p className="font-display text-3xl font-bold text-foreground mb-1">{m.value}</p>
                <p className="text-sm font-medium text-foreground mb-0.5">{m.label}</p>
                <p className="text-xs text-muted-foreground">{m.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="distribution" className="py-24 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <p className="text-sm font-medium tracking-[0.2em] uppercase text-accent mb-4">{p.distribution.label}</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">{p.distribution.title}</h2>
              <div className="w-12 h-px bg-gradient-brand mb-8" />
              <div className="space-y-4">
                {p.distribution.benefits.map((b, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.08 }} className="flex items-center gap-3">
                    <CheckCircle size={16} className="text-accent shrink-0" />
                    <span className="text-sm text-muted-foreground">{b}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="border border-border rounded-2xl bg-card p-10 shadow-brand">
              <Truck size={32} className="text-accent mb-6" />
              <h3 className="font-display text-xl font-bold text-foreground mb-3">{p.distribution.cardTitle}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">{p.distribution.cardDesc}</p>
              <a href="/#contact" className="inline-flex items-center gap-2 bg-gradient-brand text-primary-foreground px-6 py-3 rounded-md text-sm font-medium hover:opacity-90 transition-opacity">
                {p.distribution.cardCta} <ArrowRight size={16} />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Manufacturers;
