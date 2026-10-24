import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, BellRing, Check, Hand, Hotel, MonitorSmartphone, RefreshCw } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactDialog from "@/components/ContactDialog";
import { Kopf, NetzFAQ, einblenden } from "@/components/netzwerk/Netzwerk";
import { useLanguage } from "@/i18n/LanguageContext";
import { useScrollToHash } from "@/hooks/useScrollToHash";
import { usePageSeo } from "@/lib/seo";
import automat from "@/assets/netz-automat-hotel.webp";
import schirmStart from "@/assets/netz-schirm-start.webp";
import schirmTafel from "@/assets/netz-schirm-tafel.webp";
import schirmInteresse from "@/assets/netz-schirm-interesse.webp";

/** „Eine Care Station für Ihr Haus“: für Hotels und spätere Standorte (Texte unter t.netzwerk.station). */
const CareStation = () => {
  usePageSeo("careStation", "/care-station");
  useScrollToHash();
  const { t } = useLanguage();
  const st = t.netzwerk.station;
  const h = t.netzwerk.hotels;
  const [kontakt, setKontakt] = useState(false);
  const punktIcons = [MonitorSmartphone, BellRing, RefreshCw, Hand];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-20 bg-gradient-subtle">
        <div className="container mx-auto px-6 grid lg:grid-cols-[1.2fr_0.8fr] gap-14 items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-6">
              <ArrowLeft size={16} /> {t.nav.backToHome}
            </Link>
            <p className="text-xs font-semibold tracking-[0.24em] uppercase text-gold-ink mb-4">{st.kicker}</p>
            <h1 className="font-display text-4xl md:text-5xl font-normal text-foreground leading-tight mb-6">{st.title}</h1>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl mb-8">{st.subtitle}</p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <button type="button" onClick={() => setKontakt(true)} className="inline-flex items-center justify-center gap-2 bg-gradient-brand text-primary-foreground px-8 py-3.5 rounded-full text-sm font-medium hover:opacity-90 transition-opacity">
                <Hotel size={18} />
                {h.cta}
              </button>
              <p className="text-sm text-muted-foreground max-w-xs">{h.ctaNote}</p>
            </div>
          </motion.div>
          <motion.img initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.15 }}
            src={automat} alt={t.netzwerk.hero.imageAlt} width={640} height={1473} className="mx-auto w-full max-w-[220px] sm:max-w-[260px] h-auto" />
        </div>
      </section>

      {/* Vorteile für das Haus (dieselben wie auf der Startseite) */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <Kopf label={h.label} title={h.title} intro={h.text} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {h.benefits.map((b, i) => (
              <motion.div key={b.title} {...einblenden} transition={{ duration: 0.4, delay: i * 0.05 }} className="rounded-lg border border-border bg-card p-6">
                <h3 className="font-display font-semibold text-foreground mb-2">{b.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{b.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Was der Bildschirm zeigt, mit drei echten Bildschirmen der Oberfläche */}
      <section id="bildschirm" className="py-24 bg-muted text-foreground border-y border-border">
        <div className="container mx-auto px-6">
          <Kopf label={st.screen.label} title={st.screen.title} intro={st.screen.note} />
          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-14 items-start">
            <div className="space-y-6">
              {st.screen.points.map((p, i) => {
                const Icon = punktIcons[i] ?? MonitorSmartphone;
                return (
                  <motion.div key={p.title} {...einblenden} transition={{ duration: 0.4, delay: i * 0.08 }} className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-card border border-border text-accent"><Icon size={20} /></div>
                    <div>
                      <h3 className="font-display font-semibold mb-1">{p.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">{p.text}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[schirmStart, schirmTafel, schirmInteresse].map((src, i) => (
                <motion.figure key={src} {...einblenden} transition={{ duration: 0.6, delay: 0.1 + i * 0.12 }} className={i === 1 ? "mt-10" : ""}>
                  <div className="overflow-hidden rounded-xl border-[5px] border-black bg-black shadow-soft">
                    <img src={src} alt={st.screen.captions[i]} width={540} height={934} loading="lazy" className="block w-full h-auto" />
                  </div>
                  <figcaption className="mt-3 text-xs text-muted-foreground text-center">{st.screen.captions[i]}</figcaption>
                </motion.figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Ablauf in vier Schritten und was das Haus braucht */}
      <section id="ablauf" className="py-24 bg-gradient-subtle">
        <div className="container mx-auto px-6 grid lg:grid-cols-[1.3fr_0.7fr] gap-14">
          <div>
            <Kopf label={st.steps.label} title={st.steps.title} />
            <ol className="space-y-5">
              {st.steps.items.map((s, i) => (
                <motion.li key={s.title} {...einblenden} transition={{ duration: 0.4, delay: i * 0.08 }} className="flex gap-5 rounded-lg border border-border bg-card p-6">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-brand font-display font-bold text-primary-foreground">{i + 1}</span>
                  <div>
                    <h3 className="font-display font-semibold text-foreground mb-1">{s.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{s.text}</p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </div>
          <div>
            <Kopf label={st.needs.label} title={st.needs.title} />
            <ul className="space-y-4">
              {st.needs.items.map((n) => (
                <li key={n} className="flex gap-3 text-sm text-foreground leading-relaxed">
                  <Check size={18} className="mt-0.5 shrink-0 text-accent" />
                  {n}
                </li>
              ))}
            </ul>
            <button type="button" onClick={() => setKontakt(true)} className="mt-10 inline-flex items-center justify-center gap-2 bg-gradient-brand text-primary-foreground px-8 py-3.5 rounded-full text-sm font-medium hover:opacity-90 transition-opacity">
              <Hotel size={18} />
              {h.cta}
            </button>
          </div>
        </div>
      </section>

      <NetzFAQ />
      <Footer />
      <ContactDialog open={kontakt} onOpenChange={setKontakt} subject={h.contactSubject} title={h.cta} description={h.ctaNote} defaultRole="Hotel" />
    </div>
  );
};

export default CareStation;
