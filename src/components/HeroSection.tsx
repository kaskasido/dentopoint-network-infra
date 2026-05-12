import { useState, useRef, useEffect } from "react";
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
import { useLanguage } from "@/i18n/LanguageContext";

const HeroSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpenIndex(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const heroButtons = [
    {
      label: t.hero.forClinics,
      href: "/clinics",
      icon: Handshake,
      className: "bg-gradient-brand text-primary-foreground hover:opacity-90",
      items: [
        { label: t.hero.items.revenueStreams, href: "/clinics#revenue", icon: Users },
        { label: t.hero.items.implementation, href: "/clinics#implementation", icon: ClipboardList },
        { label: t.hero.items.clinicWorkflow, href: "/clinics#workflow", icon: Stethoscope },
        { label: t.hero.items.compliance, href: "/clinics#compliance", icon: ShieldCheck },
      ],
    },
    {
      label: t.hero.forManufacturers,
      href: "/manufacturers",
      icon: Factory,
      className: "bg-gradient-brand text-primary-foreground hover:opacity-90",
      items: [
        { label: t.hero.items.systemIntegration, href: "/manufacturers#integration", icon: Package },
        { label: t.hero.items.dataStandards, href: "/manufacturers#data", icon: Globe },
        { label: t.hero.items.performanceMetrics, href: "/manufacturers#performance", icon: Wrench },
        { label: t.hero.items.distribution, href: "/manufacturers#distribution", icon: Award },
      ],
    },
    {
      label: t.hero.forInvestors,
      icon: TrendingUp,
      className: "bg-gradient-brand text-primary-foreground hover:opacity-90",
      items: [
        { label: t.hero.items.marketOpportunity, href: "/investors#markt", icon: BarChart3 },
        { label: t.hero.items.scalingRoadmap, href: "/investors#skalierung", icon: LineChart },
        { label: t.hero.items.kpisMetrics, href: "/investors#kpis", icon: PieChart },
        { label: t.hero.items.expansionPipeline, href: "/investors#expansion", icon: Rocket },
      ],
    },
    {
      label: t.hero.strategicPartners,
      icon: Star,
      className: "bg-gradient-brand text-primary-foreground hover:opacity-90",
      items: [
        { label: t.hero.items.technologyPartners, href: "/partners#technology", icon: Cpu },
        { label: t.hero.items.healthcareNetworks, href: "/partners#healthcare", icon: HeartPulse },
        { label: t.hero.items.academicPartners, href: "/partners#academic", icon: GraduationCap },
        { label: t.hero.items.industryAlliances, href: "/partners#industry", icon: Building2 },
        { label: t.hero.items.globalExpansion, href: "/partners#global", icon: Globe },
      ],
    },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-background pt-16">
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
            {t.hero.tagline}
          </p>

          <h1 className="font-display font-bold text-5xl md:text-7xl lg:text-8xl tracking-tight text-foreground mb-4">
            Dento<span className="text-gradient-brand">Point</span>
          </h1>

          <p className="font-display text-lg md:text-xl font-medium text-muted-foreground mb-4">
            {t.hero.subtitle}
          </p>

          <div className="w-16 h-px bg-gradient-brand mx-auto my-8" />

          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
            {t.hero.description}
          </p>
        </motion.div>

        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center flex-wrap"
        >
          {heroButtons.map((btn, idx) => (
            <div key={idx} className="relative">
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
                      key={item.href}
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
