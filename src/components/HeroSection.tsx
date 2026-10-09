import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Factory, Handshake, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import NetworkAnimation from "./NetworkAnimation";
import ContactDialog from "./ContactDialog";
import { useLanguage } from "@/i18n/LanguageContext";

const HeroSection = () => {
  const { t } = useLanguage();
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-background pt-16">
      <NetworkAnimation />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
          opacity: 0.3,
        }}
      />

      <div className="relative z-10 text-center max-w-4xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <p className="text-sm font-medium tracking-[0.3em] uppercase text-accent mb-6">
            {t.hero.kicker}
          </p>

          <p className="font-display font-bold text-4xl md:text-6xl tracking-tight text-foreground mb-4">
            Dento<span className="text-gradient-brand">Point</span>
          </p>

          <h1 className="font-display text-2xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
            {t.hero.title}
          </h1>

          <div className="w-16 h-px bg-gradient-brand mx-auto my-8" />

          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto mb-4 leading-relaxed">
            {t.hero.subtitle}
          </p>
          <p className="text-sm text-muted-foreground mb-12">{t.hero.marketNote}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center flex-wrap"
        >
          <Link
            to="/clinics"
            className="inline-flex items-center gap-2 bg-gradient-brand text-primary-foreground px-8 py-3.5 rounded-md text-sm font-medium hover:opacity-90 transition-opacity"
          >
            <Handshake size={18} />
            {t.hero.ctaClinics}
            <ArrowRight size={16} />
          </Link>
          <button
            type="button"
            onClick={() => setContactOpen(true)}
            className="inline-flex items-center gap-2 border border-primary/40 text-primary px-8 py-3.5 rounded-md text-sm font-medium hover:bg-primary/10 transition-colors"
          >
            <MessageSquare size={18} />
            {t.hero.ctaConsult}
          </button>
          <Link
            to="/manufacturers"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors px-4 py-3.5"
          >
            <Factory size={16} />
            {t.hero.ctaManufacturers}
          </Link>
        </motion.div>
      </div>

      <ContactDialog
        open={contactOpen}
        onOpenChange={setContactOpen}
        subject={t.contactDialog.demoTitle}
        title={t.hero.ctaConsult}
        description={t.nav.contactDesc}
        defaultRole="Klinik"
      />

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
