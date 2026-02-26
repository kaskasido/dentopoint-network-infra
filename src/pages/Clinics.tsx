import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { DollarSign, Settings, Workflow, ShieldCheck, CheckCircle, ArrowRight, TrendingUp, Clock, Users, FileCheck } from "lucide-react";

const revenueStreams = [
  { icon: DollarSign, title: "Aftercare Revenue", desc: "Generate recurring income through structured therapeutic care programs for your patients." },
  { icon: TrendingUp, title: "Product Commissions", desc: "Earn commissions on recommended care products ordered through the DentoPoint platform." },
  { icon: Users, title: "Patient Retention", desc: "Increase patient lifetime value with continuous engagement through the care network." },
  { icon: Clock, title: "Time Savings", desc: "Automated aftercare scheduling and follow-ups reduce administrative overhead by 60%." },
];

const implementationSteps = [
  { step: "01", title: "Integration Setup", desc: "Connect your practice management system — we support all major PMS platforms.", duration: "1-2 days" },
  { step: "02", title: "Smart Care Module", desc: "Physical module installation in your practice with product configuration.", duration: "1 day" },
  { step: "03", title: "Team Training", desc: "Onboarding session for your team on platform usage and patient communication.", duration: "Half day" },
  { step: "04", title: "Go Live", desc: "Launch with first patients and ongoing support from DentoPoint partner management.", duration: "Ongoing" },
];

const workflowBenefits = [
  "Automated patient aftercare scheduling",
  "Digital care plan generation",
  "Smart product recommendations",
  "Patient communication automation",
  "Treatment documentation export",
  "Multi-location management dashboard",
];

const complianceFeatures = [
  { icon: ShieldCheck, title: "GDPR Compliant", desc: "Full EU data protection compliance with encrypted patient data storage and processing." },
  { icon: FileCheck, title: "MDR Certified", desc: "Medical Device Regulation compliance for all integrated care products and modules." },
  { icon: ShieldCheck, title: "ISO 27001", desc: "Information security management certification for data handling and infrastructure." },
  { icon: FileCheck, title: "Audit Trail", desc: "Complete audit logging for all patient interactions, product recommendations, and data access." },
];

const Clinics = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl">
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-accent mb-4">For Clinics</p>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Transform Your<br />Aftercare Revenue
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
              Integrate DentoPoint into your clinic workflow. New revenue streams, better patient outcomes, and full regulatory compliance — out of the box.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Revenue */}
      <section id="revenue" className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="max-w-3xl mb-16">
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-accent mb-4">Revenue</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">New Revenue Streams</h2>
            <div className="w-12 h-px bg-gradient-brand" />
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            {revenueStreams.map((r, i) => (
              <motion.div key={r.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }} className="border border-border rounded-lg p-8 bg-card hover:shadow-brand transition-all duration-300">
                <r.icon size={24} className="text-accent mb-4" />
                <h3 className="font-display font-semibold text-lg text-foreground mb-3">{r.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Implementation */}
      <section id="implementation" className="py-24 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="max-w-3xl mb-16">
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-accent mb-4">Implementation</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">Quick & Easy Setup</h2>
            <div className="w-12 h-px bg-gradient-brand" />
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {implementationSteps.map((s, i) => (
              <motion.div key={s.step} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }} className="border border-border rounded-lg p-6 bg-card relative">
                <span className="font-display text-4xl font-bold text-accent/20">{s.step}</span>
                <h3 className="font-display font-semibold text-foreground mt-2 mb-2">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{s.desc}</p>
                <span className="text-xs font-medium text-accent">{s.duration}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow */}
      <section id="workflow" className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <p className="text-sm font-medium tracking-[0.2em] uppercase text-accent mb-4">Workflow</p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">Streamlined Clinic Workflow</h2>
              <div className="w-12 h-px bg-gradient-brand mb-8" />
              <div className="space-y-4">
                {workflowBenefits.map((b, i) => (
                  <motion.div key={b} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.3, delay: i * 0.08 }} className="flex items-center gap-3">
                    <CheckCircle size={16} className="text-accent shrink-0" />
                    <span className="text-sm text-muted-foreground">{b}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="border border-border rounded-2xl bg-card p-10 shadow-brand">
              <Workflow size={32} className="text-accent mb-6" />
              <h3 className="font-display text-xl font-bold text-foreground mb-3">Integrated Practice Management</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">Connect DentoPoint with your existing PMS. All aftercare workflows, patient data, and product management in one place.</p>
              <a href="/#contact" className="inline-flex items-center gap-2 bg-gradient-brand text-primary-foreground px-6 py-3 rounded-md text-sm font-medium hover:opacity-90 transition-opacity">
                Schedule a Demo <ArrowRight size={16} />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section id="compliance" className="py-24 bg-gradient-subtle">
        <div className="container mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="max-w-3xl mb-16">
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-accent mb-4">Compliance</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">Regulatory Compliance</h2>
            <div className="w-12 h-px bg-gradient-brand" />
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            {complianceFeatures.map((c, i) => (
              <motion.div key={c.title + i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.1 }} className="border border-border rounded-lg p-8 bg-card hover:shadow-brand transition-all duration-300">
                <c.icon size={24} className="text-accent mb-4" />
                <h3 className="font-display font-semibold text-lg text-foreground mb-3">{c.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Clinics;
