import { motion } from "framer-motion";
import { Handshake, Factory, TrendingUp } from "lucide-react";
import NetworkAnimation from "./NetworkAnimation";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background pt-16">
      <NetworkAnimation />

      {/* Subtle grid overlay */}
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
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#partners"
            className="inline-flex items-center gap-2 bg-gradient-brand text-primary-foreground px-8 py-3.5 rounded-md font-medium text-sm hover:opacity-90 transition-opacity"
          >
            <Handshake size={18} />
            For Partners
          </a>
          <a
            href="#manufacturers"
            className="inline-flex items-center gap-2 border border-primary text-primary px-8 py-3.5 rounded-md font-medium text-sm hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            <Factory size={18} />
            For Manufacturers
          </a>
          <a
            href="/investors"
            className="inline-flex items-center gap-2 border border-border text-foreground px-8 py-3.5 rounded-md font-medium text-sm hover:border-primary hover:text-primary transition-colors"
          >
            <TrendingUp size={18} />
            For Investors
          </a>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
