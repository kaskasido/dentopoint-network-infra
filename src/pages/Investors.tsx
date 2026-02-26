import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { TrendingUp, Globe, BarChart, Target, Users, DollarSign, ArrowRight, Activity } from "lucide-react";

const marketPoints = [
  { icon: Target, title: "€12B+ Addressable Market", desc: "The dental aftercare market in Europe alone represents a massive, underserved opportunity." },
  { icon: Users, title: "380M+ Potential Patients", desc: "EU and Asian markets combined — growing demand for structured therapeutic aftercare." },
  { icon: DollarSign, title: "Recurring Revenue Model", desc: "Subscription + transaction-based revenue from clinics, manufacturers, and care products." },
  { icon: Globe, title: "First-Mover Advantage", desc: "No comparable digital infrastructure for structured dental therapeutic care exists." },
];

const scalingPhases = [
  { phase: "Phase 1", title: "DACH Region", desc: "Germany, Austria, Switzerland — initial market with 120+ partner clinics.", status: "Active" },
  { phase: "Phase 2", title: "EU Expansion", desc: "Western Europe rollout with localised compliance and language support.", status: "2025" },
  { phase: "Phase 3", title: "Asia Entry", desc: "China market entry through strategic partnerships and local infrastructure.", status: "2026" },
  { phase: "Phase 4", title: "Global Scale", desc: "North America, Middle East — full international infrastructure deployment.", status: "2027+" },
];

const kpis = [
  { label: "MRR Growth", value: "+24%", sub: "Month over Month" },
  { label: "Clinic Retention", value: "94%", sub: "Annual Rate" },
  { label: "CAC Payback", value: "4.2 mo", sub: "Average" },
  { label: "LTV:CAC Ratio", value: "8.4x", sub: "Current" },
  { label: "Gross Margin", value: "78%", sub: "Platform Revenue" },
  { label: "NPS Score", value: "72", sub: "Partner Clinics" },
];

const expansionMarkets = [
  { region: "DACH", clinics: "120+", status: "Live", growth: "+18%" },
  { region: "Western EU", clinics: "Planned", status: "H2 2025", growth: "—" },
  { region: "China / Asia", clinics: "Pipeline", status: "2026", growth: "—" },
  { region: "North America", clinics: "Pipeline", status: "2027", growth: "—" },
];

const Investors = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl">
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-accent mb-4">For Investors</p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Invest in Healthcare<br />Infrastructure
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Scalable digital infrastructure for the €12B+ dental aftercare market. Transparent KPIs, proven unit economics, and global expansion roadmap.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Markt */}
      <section id="markt" className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="max-w-3xl mb-16">
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-accent mb-4">Markt</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">Market Opportunity</h2>
            <div className="w-12 h-px bg-gradient-brand" />
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            {marketPoints.map((p, i) => (
              <motion.div key={p.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }} className="border border-border rounded-lg p-8 bg-card hover:shadow-brand transition-all duration-300">
                <p.icon size={24} className="text-accent mb-4" />
                <h3 className="font-display font-semibold text-lg text-foreground mb-3">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Skalierung */}
      <section id="skalierung" className="py-24 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="max-w-3xl mb-16">
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-accent mb-4">Skalierung</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">Scaling Roadmap</h2>
            <div className="w-12 h-px bg-gradient-brand" />
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {scalingPhases.map((s, i) => (
              <motion.div key={s.phase} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }} className="border border-border rounded-lg p-6 bg-card relative overflow-hidden">
                <span className="text-xs font-medium text-accent">{s.phase}</span>
                <h3 className="font-display font-semibold text-foreground mt-2 mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{s.desc}</p>
                <span className={`inline-block px-3 py-1 rounded-md text-xs font-medium ${s.status === "Active" ? "bg-accent/10 text-accent" : "bg-secondary text-secondary-foreground"}`}>
                  {s.status}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* KPIs */}
      <section id="kpis" className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="max-w-3xl mb-16">
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-accent mb-4">KPIs</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">Key Performance Indicators</h2>
            <div className="w-12 h-px bg-gradient-brand" />
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {kpis.map((k, i) => (
              <motion.div key={k.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.08 }} className="border border-border rounded-lg p-6 bg-card">
                <Activity size={16} className="text-accent mb-2" />
                <p className="font-display text-3xl font-bold text-foreground">{k.value}</p>
                <p className="text-sm font-medium text-foreground mt-1">{k.label}</p>
                <p className="text-xs text-muted-foreground">{k.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Expansion */}
      <section id="expansion" className="py-24 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="max-w-3xl mb-16">
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-accent mb-4">Expansion</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">Global Expansion Pipeline</h2>
            <div className="w-12 h-px bg-gradient-brand" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="border border-border rounded-lg bg-card overflow-hidden shadow-brand">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-secondary/50">
                    <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">Region</th>
                    <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">Clinics</th>
                    <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">Status</th>
                    <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">Growth</th>
                  </tr>
                </thead>
                <tbody>
                  {expansionMarkets.map((m) => (
                    <tr key={m.region} className="border-b border-border/50 last:border-0">
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
              Request Investor Deck <ArrowRight size={16} />
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Investors;
