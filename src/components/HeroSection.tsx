import { useState } from "react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import {
  Handshake, Factory, TrendingUp, Star, ChevronDown,
  Users, ClipboardList, Stethoscope, ShieldCheck,
  Package, Globe, Wrench, Award,
  BarChart3, LineChart, PieChart, Rocket,
  Cpu, HeartPulse, GraduationCap, Building2,
} from "lucide-react";
import { Link } from "react-router-dom";
import NetworkAnimation from "./NetworkAnimation";

interface DropdownItem {
  label: string;
  href: string;
  icon: LucideIcon;
}

interface HeroButton {
  label: string;
  icon: LucideIcon;
  items: DropdownItem[];
  className: string;
}

const heroButtons: HeroButton[] = [
  {
    label: "For Clinics",
    icon: Handshake,
    className: "bg-gradient-brand text-primary-foreground hover:opacity-90",
    items: [
      { label: "Revenue Streams", href: "/portal/clinic/revenue", icon: Users },
      { label: "Implementation", href: "/portal/clinic/implementation", icon: ClipboardList },
      { label: "Clinic Workflow", href: "/portal/clinic/workflow", icon: Stethoscope },
      { label: "Compliance", href: "/portal/clinic/compliance", icon: ShieldCheck },
    ],
  },
  {
    label: "For Manufacturers",
    icon: Factory,
    className: "bg-gradient-brand text-primary-foreground hover:opacity-90",
    items: [
      { label: "System Integration", href: "/portal/manufacturer/integration", icon: Package },
      { label: "Data & Standards", href: "/portal/manufacturer/data", icon: Globe },
      { label: "Performance Metrics", href: "/portal/manufacturer/performance", icon: Wrench },
      { label: "Distribution", href: "/portal/manufacturer/distribution", icon: Award },
    ],
  },
  {
    label: "For Investors",
    icon: TrendingUp,
    className: "bg-gradient-brand text-primary-foreground hover:opacity-90",
    items: [
      { label: "Market Opportunity", href: "/portal/investor/market", icon: BarChart3 },
      { label: "Scaling Roadmap", href: "/portal/investor/scaling", icon: LineChart },
      { label: "KPIs & Metrics", href: "/portal/investor/kpis", icon: PieChart },
      { label: "Expansion Pipeline", href: "/portal/investor/expansion", icon: Rocket },
    ],
  },
  {
    label: "Strategic Partners",
    icon: Star,
    className: "bg-gradient-brand text-primary-foreground hover:opacity-90",
    items: [
      { label: "Technology Partners", href: "/portal/partner/technology", icon: Cpu },
      { label: "Healthcare Networks", href: "/portal/partner/healthcare", icon: HeartPulse },
      { label: "Academic Partners", href: "/portal/partner/academic", icon: GraduationCap },
      { label: "Industry Alliances", href: "/portal/partner/industry", icon: Building2 },
      { label: "Global Expansion", href: "/portal/partner/global", icon: Globe },
    ],
  },
];

const HeroSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const containerRef = useState<HTMLDivElement | null>(null);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-16">
      <NetworkAnimation />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
          opacity: 0.3,
        }}
      />

      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="text-sm font-medium tracking-[0.3em] uppercase text-accent mb-6">
            Digital Therapeutic Infrastructure
          </p>

          <h1 className="font-display font-bold text-5xl md:text-7xl lg:text-8xl tracking-tight text-foreground mb-4">
            Dento<span className="text-gradient-brand">Point</span>
          </h1>

          <p className="font-display text-lg md:text-xl font-medium text-muted-foreground mb-4">
            The Therapeutic Care Network
          </p>

          <div className="w-16 h-px bg-gradient-brand mx-auto my-8" />

          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
            Precision-Driven Dental Infrastructure for Clinics and Networks
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap"
        >
          {heroButtons.map((btn, idx) => (
            <div key={btn.label} className="relative">
              <button
                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                className={`inline-flex items-center gap-2 px-8 py-3.5 rounded-md font-medium text-sm transition-all ${btn.className}`}
              >
                <btn.icon size={18} />
                {btn.label}
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${openIndex === idx ? "rotate-180" : ""}`}
                />
              </button>

              {openIndex === idx && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-1/2 -translate-x-1/2 mt-2 w-56 rounded-lg border border-border bg-card shadow-lg overflow-hidden z-50"
                >
                  {btn.items.map((item) => (
                    <Link
                      key={item.label}
                      to={item.href}
                      onClick={() => setOpenIndex(null)}
                      className="flex items-center gap-3 px-4 py-3 text-sm text-muted-foreground hover:bg-accent/10 hover:text-accent transition-colors"
                    >
                      <item.icon size={16} />
                      {item.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </div>
          ))}
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
