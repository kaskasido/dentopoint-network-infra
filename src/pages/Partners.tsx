import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactDialog from "@/components/ContactDialog";
import { useState } from "react";
import { motion } from "framer-motion";
import { Cpu, HeartPulse, GraduationCap, Building2, Globe, ArrowRight, CheckCircle, Shield, Zap, Handshake } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageContext";
import { useScrollToHash } from "@/hooks/useScrollToHash";

const techIcons = [Cpu, Shield, Zap, Globe];

const Partners = () => {
  useScrollToHash();
  const { t } = useLanguage();
  const p = t.partnersPage;
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

      <section id="technology" className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="max-w-3xl mb-16">
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-accent mb-4">{p.technology.label}</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">{p.technology.title}</h2>
            <div className="w-12 h-px bg-gradient-brand" />
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            {p.technology.items.map((item, i) => {
              const Icon = techIcons[i];
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

      <section id="healthcare" className="py-24 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="max-w-3xl mb-16">
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-accent mb-4">{p.healthcare.label}</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">{p.healthcare.title}</h2>
            <div className="w-12 h-px bg-gradient-brand" />
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            {p.healthcare.items.map((h, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }} className="border border-border rounded-lg p-8 bg-card hover:shadow-brand transition-all duration-300">
                <HeartPulse size={24} className="text-accent mb-4" />
                <h3 className="font-display font-semibold text-lg text-foreground mb-3">{h.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{h.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="academic" className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="max-w-3xl mb-16">
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-accent mb-4">{p.academic.label}</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">{p.academic.title}</h2>
            <div className="w-12 h-px bg-gradient-brand" />
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            {p.academic.items.map((a, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }} className="border border-border rounded-lg p-8 bg-card hover:shadow-brand transition-all duration-300">
                <GraduationCap size={24} className="text-accent mb-4" />
                <h3 className="font-display font-semibold text-lg text-foreground mb-3">{a.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{a.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="industry" className="py-24 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <p className="text-sm font-medium tracking-[0.2em] uppercase text-accent mb-4">{p.industry.label}</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">{p.industry.title}</h2>
              <div className="w-12 h-px bg-gradient-brand mb-8" />
              <div className="space-y-4">
                {p.industry.benefits.map((b, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.08 }} className="flex items-center gap-3">
                    <CheckCircle size={16} className="text-accent shrink-0" />
                    <span className="text-sm text-muted-foreground">{b}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="border border-border rounded-2xl bg-card p-10 shadow-brand">
              <Handshake size={32} className="text-accent mb-6" />
              <h3 className="font-display text-xl font-bold text-foreground mb-3">{p.industry.cardTitle}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">{p.industry.cardDesc}</p>
              <button onClick={() => setContactOpen(true)} className="inline-flex items-center gap-2 bg-gradient-brand text-primary-foreground px-6 py-3 rounded-md text-sm font-medium hover:opacity-90 transition-opacity">
                {p.industry.cardCta} <ArrowRight size={16} />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="global" className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="max-w-3xl mb-16">
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-accent mb-4">{p.global.label}</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">{p.global.title}</h2>
            <div className="w-12 h-px bg-gradient-brand" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="border border-border rounded-lg bg-card overflow-hidden shadow-brand">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-secondary/50">
                    <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">{p.global.tableHeaders.region}</th>
                    <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">{p.global.tableHeaders.status}</th>
                    <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">{p.global.tableHeaders.description}</th>
                  </tr>
                </thead>
                <tbody>
                  {p.global.items.map((m, i) => (
                    <tr key={i} className="border-b border-border/50 last:border-0">
                      <td className="px-6 py-4 font-display font-semibold text-foreground">{m.region}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-md text-xs font-medium ${m.status === "Live" ? "bg-accent/10 text-accent" : "bg-secondary text-secondary-foreground"}`}>
                          {m.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{m.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Partners;
