import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactDialog from "@/components/ContactDialog";
import { useState } from "react";
import { motion } from "framer-motion";
import { DollarSign, Settings, Workflow, ShieldCheck, CheckCircle, ArrowRight, ArrowLeft, TrendingUp, Clock, Users, FileCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/i18n/LanguageContext";
import { useScrollToHash } from "@/hooks/useScrollToHash";

const revenueIcons = [DollarSign, Users, Clock];
const complianceIcons = [ShieldCheck, FileCheck, ShieldCheck, FileCheck];

const Clinics = () => {
  useScrollToHash();
  const { t } = useLanguage();
  const p = t.clinicsPage;
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-20 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl">
            <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-6">
              <ArrowLeft size={16} /> {t.nav.backToHome}
            </Link>
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-accent mb-4">{p.hero.label}</p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              {p.hero.title1}<br />{p.hero.title2}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">{p.hero.desc}</p>
          </motion.div>
        </div>
      </section>

      <section id="revenue" className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="max-w-3xl mb-16">
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-accent mb-4">{p.revenue.label}</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">{p.revenue.title}</h2>
            <div className="w-12 h-px bg-gradient-brand" />
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            {p.revenue.items.map((r, i) => {
              const Icon = revenueIcons[i];
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }} className="border border-border rounded-lg p-8 bg-card hover:shadow-brand transition-all duration-300">
                  <Icon size={24} className="text-accent mb-4" />
                  <h3 className="font-display font-semibold text-lg text-foreground mb-3">{r.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="implementation" className="py-24 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="max-w-3xl mb-16">
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-accent mb-4">{p.implementation.label}</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">{p.implementation.title}</h2>
            <div className="w-12 h-px bg-gradient-brand" />
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {p.implementation.items.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }} className="border border-border rounded-lg p-6 bg-card relative">
                <span className="font-display text-4xl font-bold text-accent/20">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="font-display font-semibold text-foreground mt-2 mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{s.desc}</p>
                <span className="text-xs font-medium text-accent">{s.duration}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="workflow" className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <p className="text-sm font-medium tracking-[0.2em] uppercase text-accent mb-4">{p.workflow.label}</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">{p.workflow.title}</h2>
              <div className="w-12 h-px bg-gradient-brand mb-8" />
              <div className="space-y-4">
                {p.workflow.benefits.map((b, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.08 }} className="flex items-center gap-3">
                    <CheckCircle size={16} className="text-accent shrink-0" />
                    <span className="text-sm text-muted-foreground">{b}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="border border-border rounded-2xl bg-card p-10 shadow-brand">
              <Workflow size={32} className="text-accent mb-6" />
              <h3 className="font-display text-xl font-bold text-foreground mb-3">{p.workflow.cardTitle}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">{p.workflow.cardDesc}</p>
              <button onClick={() => setContactOpen(true)} className="inline-flex items-center gap-2 bg-gradient-brand text-primary-foreground px-6 py-3 rounded-md text-sm font-medium hover:opacity-90 transition-opacity">
                {p.workflow.cardCta} <ArrowRight size={16} />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="compliance" className="py-24 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="max-w-3xl mb-16">
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-accent mb-4">{p.compliance.label}</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">{p.compliance.title}</h2>
            <div className="w-12 h-px bg-gradient-brand" />
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            {p.compliance.items.map((c, i) => {
              const Icon = complianceIcons[i];
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }} className="border border-border rounded-lg p-8 bg-card hover:shadow-brand transition-all duration-300">
                  <Icon size={24} className="text-accent mb-4" />
                  <h3 className="font-display font-semibold text-lg text-foreground mb-3">{c.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <ContactDialog open={contactOpen} onOpenChange={setContactOpen} subject="Demo vereinbaren" title="Demo vereinbaren" description="Kontaktieren Sie uns" defaultRole="Klinik" />
      <Footer />
    </div>
  );
};

export default Clinics;
