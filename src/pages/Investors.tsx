import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactDialog from "@/components/ContactDialog";
import { useState } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Globe, BarChart, Target, Users, DollarSign, ArrowRight, Activity } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useScrollToHash } from "@/hooks/useScrollToHash";

const marketIcons = [Target, Users, DollarSign, Globe];

const Investors = () => {
  useScrollToHash();
  const { t } = useLanguage();
  const p = t.investorsPage;
  const [contactOpen, setContactOpen] = useState(false);

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

      <section id="markt" className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="max-w-3xl mb-16">
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-accent mb-4">{p.market.label}</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">{p.market.title}</h2>
            <div className="w-12 h-px bg-gradient-brand" />
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            {p.market.items.map((item, i) => {
              const Icon = marketIcons[i];
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }} className="border border-border rounded-lg p-8 bg-card hover:shadow-brand transition-all duration-300">
                  <Icon size={24} className="text-accent mb-4" />
                  <h3 className="font-display font-semibold text-lg text-foreground mb-3">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="skalierung" className="py-24 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="max-w-3xl mb-16">
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-accent mb-4">{p.scaling.label}</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">{p.scaling.title}</h2>
            <div className="w-12 h-px bg-gradient-brand" />
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {p.scaling.items.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }} className="border border-border rounded-lg p-6 bg-card relative overflow-hidden">
                <span className="text-xs font-medium text-accent">{s.phase}</span>
                <h3 className="font-display font-semibold text-foreground mt-2 mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{s.desc}</p>
                <span className={`inline-block px-3 py-1 rounded-md text-xs font-medium ${s.status === "Active" || s.status === "Aktiv" || s.status === "Actif" || s.status === "Attivo" || s.status === "Activo" || s.status === "Aktif" || s.status === "活跃" || s.status === "활성" ? "bg-accent/10 text-accent" : "bg-secondary text-secondary-foreground"}`}>
                  {s.status}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="kpis" className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="max-w-3xl mb-16">
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-accent mb-4">{p.kpis.label}</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">{p.kpis.title}</h2>
            <div className="w-12 h-px bg-gradient-brand" />
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {p.kpis.items.map((k, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }} className="border border-border rounded-lg p-6 bg-card">
                <Activity size={16} className="text-accent mb-2" />
                <p className="font-display text-3xl font-bold text-foreground">{k.value}</p>
                <p className="text-sm font-medium text-foreground mt-1">{k.label}</p>
                <p className="text-xs text-muted-foreground">{k.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="expansion" className="py-24 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="max-w-3xl mb-16">
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-accent mb-4">{p.expansion.label}</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">{p.expansion.title}</h2>
            <div className="w-12 h-px bg-gradient-brand" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="border border-border rounded-lg bg-card overflow-hidden shadow-brand">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-secondary/50">
                    <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">{p.expansion.tableHeaders.region}</th>
                    <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">{p.expansion.tableHeaders.clinics}</th>
                    <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">{p.expansion.tableHeaders.status}</th>
                    <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">{p.expansion.tableHeaders.growth}</th>
                  </tr>
                </thead>
                <tbody>
                  {p.expansion.items.map((m, i) => (
                    <tr key={i} className="border-b border-border/50 last:border-0">
                      <td className="px-6 py-4 font-display font-semibold text-foreground">{m.region}</td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{m.clinics}</td>
                      <td className="px-6 py-4"><span className={`px-3 py-1 rounded-md text-xs font-medium ${m.status === "Live" ? "bg-accent/10 text-accent" : "bg-secondary text-secondary-foreground"}`}>{m.status}</span></td>
                      <td className="px-6 py-4 text-sm font-medium text-accent">{m.growth}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }} className="mt-10 text-center">
            <a href="/#contact" className="inline-flex items-center gap-2 bg-gradient-brand text-primary-foreground px-8 py-3.5 rounded-md text-sm font-medium hover:opacity-90 transition-opacity">
              {p.expansion.cta} <ArrowRight size={16} />
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Investors;
