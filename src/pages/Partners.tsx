import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import {
  Cpu, HeartPulse, GraduationCap, Building2, Globe,
  ArrowRight, CheckCircle, Shield, Zap, Users, Handshake,
} from "lucide-react";

const techPartners = [
  { icon: Cpu, title: "PMS Integration", desc: "Nahtlose Anbindung an alle führenden Praxis-Management-Systeme über standardisierte APIs." },
  { icon: Shield, title: "Cloud & Security", desc: "ISO 27001-zertifizierte Cloud-Infrastruktur mit End-to-End-Verschlüsselung." },
  { icon: Zap, title: "IoT Platform", desc: "Smart Care Module Hardware-Ökosystem mit Echtzeit-Datenverarbeitung." },
  { icon: Globe, title: "Interoperabilität", desc: "HL7 FHIR und GS1-konforme Datenstandards für maximale Kompatibilität." },
];

const healthcareNetworks = [
  { title: "Klinikketten", desc: "Partnerschaften mit führenden Dental-Klinikketten in der DACH-Region und Europa." },
  { title: "Krankenkassen", desc: "Integration von Nachsorge-Programmen in Versicherungsleistungen und Bonusprogramme." },
  { title: "Fachverbände", desc: "Zusammenarbeit mit zahnmedizinischen Fachgesellschaften für Qualitätsstandards." },
  { title: "Telemedizin", desc: "Telemedizinische Nachsorge-Module für Remote-Patienten und ländliche Regionen." },
];

const academicPartners = [
  { title: "Universitätskliniken", desc: "Forschungskooperationen mit führenden zahnmedizinischen Fakultäten in Europa." },
  { title: "Klinische Studien", desc: "Evidenzbasierte Validierung der DentoPoint-Nachsorgeprotokolle." },
  { title: "Lehre & Ausbildung", desc: "Integration in zahnmedizinische Curricula und Fortbildungsprogramme." },
  { title: "Publikationen", desc: "Gemeinsame wissenschaftliche Veröffentlichungen und Konferenzbeiträge." },
];

const industryAlliances = [
  "Exklusive Vertriebspartnerschaften mit führenden Dental-Herstellern",
  "Integration pharmazeutischer Nachsorgeprodukte",
  "Partnerschaften mit Medizintechnik-Unternehmen für Geräteinnovation",
  "Mitgestaltung von Branchenstandards für digitale Nachsorge",
  "Co-Marketing und gemeinsame Markterschließung",
  "Shared R&D für nächste Produktgenerationen",
];

const globalMarkets = [
  { region: "DACH", status: "Live", desc: "Kernmarkt mit hoher Marktdurchdringung" },
  { region: "EU (Frankreich, Benelux, Skandinavien)", status: "2025", desc: "Rollout in weitere EU-Märkte" },
  { region: "Asien-Pazifik (China, Südkorea, Japan)", status: "2026", desc: "Markteintritt über Joint Ventures" },
  { region: "Naher Osten (UAE, Saudi-Arabien)", status: "2027", desc: "Premium-Dental-Märkte" },
];

const Partners = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl">
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-accent mb-4">Strategic Partners</p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Build the Future of<br />Dental Care Together
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Join the DentoPoint ecosystem as a strategic partner. Technology, healthcare, academic, and industry alliances driving innovation in therapeutic aftercare.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Technology Partners */}
      <section id="technology" className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="max-w-3xl mb-16">
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-accent mb-4">Technology</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">Technology Partners</h2>
            <div className="w-12 h-px bg-gradient-brand" />
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            {techPartners.map((p, i) => (
              <motion.div key={p.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }} className="border border-border rounded-lg p-8 bg-card hover:shadow-brand transition-all duration-300">
                <p.icon size={24} className="text-accent mb-4" />
                <h3 className="font-display font-semibold text-lg text-foreground mb-3">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Healthcare Networks */}
      <section id="healthcare" className="py-24 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="max-w-3xl mb-16">
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-accent mb-4">Healthcare</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">Healthcare Networks</h2>
            <div className="w-12 h-px bg-gradient-brand" />
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            {healthcareNetworks.map((h, i) => (
              <motion.div key={h.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }} className="border border-border rounded-lg p-8 bg-card hover:shadow-brand transition-all duration-300">
                <HeartPulse size={24} className="text-accent mb-4" />
                <h3 className="font-display font-semibold text-lg text-foreground mb-3">{h.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{h.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Academic Partners */}
      <section id="academic" className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="max-w-3xl mb-16">
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-accent mb-4">Academic</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">Academic Partners</h2>
            <div className="w-12 h-px bg-gradient-brand" />
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            {academicPartners.map((a, i) => (
              <motion.div key={a.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }} className="border border-border rounded-lg p-8 bg-card hover:shadow-brand transition-all duration-300">
                <GraduationCap size={24} className="text-accent mb-4" />
                <h3 className="font-display font-semibold text-lg text-foreground mb-3">{a.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{a.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Alliances */}
      <section id="industry" className="py-24 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <p className="text-sm font-medium tracking-[0.2em] uppercase text-accent mb-4">Industry</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">Industry Alliances</h2>
              <div className="w-12 h-px bg-gradient-brand mb-8" />
              <div className="space-y-4">
                {industryAlliances.map((b, i) => (
                  <motion.div key={b} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.08 }} className="flex items-center gap-3">
                    <CheckCircle size={16} className="text-accent shrink-0" />
                    <span className="text-sm text-muted-foreground">{b}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="border border-border rounded-2xl bg-card p-10 shadow-brand">
              <Handshake size={32} className="text-accent mb-6" />
              <h3 className="font-display text-xl font-bold text-foreground mb-3">Partner werden</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">Werden Sie Teil des DentoPoint-Ökosystems und gestalten Sie die Zukunft der zahnmedizinischen Nachsorge mit.</p>
              <a href="/#contact" className="inline-flex items-center gap-2 bg-gradient-brand text-primary-foreground px-6 py-3 rounded-md text-sm font-medium hover:opacity-90 transition-opacity">
                Kontakt aufnehmen <ArrowRight size={16} />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Global Expansion */}
      <section id="global" className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="max-w-3xl mb-16">
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-accent mb-4">Global</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">Global Expansion</h2>
            <div className="w-12 h-px bg-gradient-brand" />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="border border-border rounded-lg bg-card overflow-hidden shadow-brand">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-secondary/50">
                    <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">Region</th>
                    <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">Status</th>
                    <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider px-6 py-4">Beschreibung</th>
                  </tr>
                </thead>
                <tbody>
                  {globalMarkets.map((m) => (
                    <tr key={m.region} className="border-b border-border/50 last:border-0">
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
