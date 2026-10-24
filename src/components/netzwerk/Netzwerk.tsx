import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight, BellRing, CheckCircle2, Clock, Factory, Hammer, Handshake, Hotel, Languages, MapPinned,
  MessageSquare, MonitorSmartphone, Package, Palette, Pill, Smile, Sparkles, Wind, Wrench,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import ContactDialog from "@/components/ContactDialog";
import { useLanguage } from "@/i18n/LanguageContext";
import automat from "@/assets/netz-automat-hotel.webp";
import schirmTafel from "@/assets/netz-schirm-tafel.webp";
import schirmInteresse from "@/assets/netz-schirm-interesse.webp";

/**
 * Startseite „Das Versorgungsnetzwerk“: Aufbau über Hotels. Alle Texte unter t.netzwerk (DE, EN; NL fällt auf EN zurück).
 * Zahnärzte nur als fachlicher Hintergrund, keine Praxen als Standorte, keine Hotelnamen ohne Zustimmung.
 */

export const einblenden = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export const Kopf = ({ label, title, intro, hell = false }: { label: string; title: string; intro?: string; hell?: boolean }) => (
  <motion.div {...einblenden} className="max-w-3xl mb-14">
    <p className={`text-sm font-medium tracking-[0.2em] uppercase mb-4 ${hell ? "text-primary-foreground/70" : "text-accent"}`}>{label}</p>
    <h2 className={`font-display text-3xl md:text-4xl font-bold mb-4 ${hell ? "text-primary-foreground" : "text-foreground"}`}>{title}</h2>
    {intro && <p className={`text-base leading-relaxed max-w-2xl mb-6 ${hell ? "text-primary-foreground/75" : "text-muted-foreground"}`}>{intro}</p>}
    <div className="w-12 h-px bg-gradient-brand" />
  </motion.div>
);

export const NetzHero = () => {
  const { t } = useLanguage();
  const h = t.netzwerk.hero;
  const [kontakt, setKontakt] = useState(false);
  return (
    <section className="relative overflow-hidden bg-background pt-28 pb-20 md:pt-32 md:pb-28">
      {/* Feines Raster und Lichtschein in der Markenfarbe */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: "linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
      <div className="container relative mx-auto px-6 grid lg:grid-cols-[1.15fr_0.85fr] gap-14 items-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
          <p className="text-sm font-medium tracking-[0.3em] uppercase text-accent mb-6">{h.kicker}</p>
          <p className="font-display font-bold text-4xl md:text-5xl tracking-tight text-foreground mb-5">
            Dento<span className="text-gradient-brand">Point</span>
          </p>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-foreground leading-tight mb-6">{h.title}</h1>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl mb-6">{h.subtitle}</p>
          <p className="font-display italic text-lg md:text-xl text-accent mb-10">{h.claim}</p>
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center flex-wrap">
            <a href="#hotels" className="inline-flex items-center justify-center gap-2 bg-gradient-brand text-primary-foreground px-8 py-3.5 rounded-md text-sm font-medium hover:opacity-90 transition-opacity">
              <Hotel size={18} />
              {h.ctaHotels}
              <ArrowRight size={16} />
            </a>
            <Link to="/manufacturers" className="inline-flex items-center justify-center gap-2 border border-primary/40 text-primary px-8 py-3.5 rounded-md text-sm font-medium hover:bg-primary/10 transition-colors">
              <Factory size={18} />
              {h.ctaManufacturers}
            </Link>
            <button type="button" onClick={() => setKontakt(true)} className="inline-flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors px-4 py-3.5">
              <MessageSquare size={16} />
              {h.ctaContact}
            </button>
          </div>
        </motion.div>

        <motion.figure initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2 }} className="relative mx-auto w-full max-w-[230px] sm:max-w-[290px] lg:max-w-[340px]">
          <div aria-hidden="true" className="absolute left-1/2 top-[8%] h-[70%] w-[170%] -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" />
          <img src={automat} alt={h.imageAlt} width={640} height={1473} className="relative w-full h-auto drop-shadow-2xl" />
          <div aria-hidden="true" className="mx-auto -mt-3 h-5 w-[105%] -translate-x-[2.5%] rounded-[50%] bg-foreground/25 blur-md" />
          <figcaption className="mt-5 text-xs text-muted-foreground text-center">{h.imageNote}</figcaption>
        </motion.figure>
      </div>

      <ContactDialog open={kontakt} onOpenChange={setKontakt} subject={t.contactDialog.demoTitle} title={h.ctaContact} description={t.nav.contactDesc} />
    </section>
  );
};

export const NetzWie = () => {
  const { t } = useLanguage();
  const w = t.netzwerk.how;
  const icons = [Hotel, Package, Wrench];
  return (
    <section id="netzwerk" className="py-24 md:py-32 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        <Kopf label={w.label} title={w.title} intro={w.intro} />
        <div className="relative grid md:grid-cols-3 gap-6">
          {/* Verbindungslinie zwischen den drei Partnern */}
          <div aria-hidden="true" className="hidden md:block absolute top-12 left-[16%] right-[16%] h-px bg-gradient-brand opacity-40" />
          {w.pillars.map((p, i) => {
            const Icon = icons[i] ?? Package;
            return (
              <motion.div key={p.title} {...einblenden} transition={{ duration: 0.5, delay: i * 0.12 }} className="relative rounded-lg border border-border bg-card p-8">
                <div className="relative z-10 mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-brand text-primary-foreground shadow-lg">
                  <Icon size={24} />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.text}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export const NetzHotels = () => {
  const { t } = useLanguage();
  const h = t.netzwerk.hotels;
  const [kontakt, setKontakt] = useState(false);
  const icons = [Clock, MonitorSmartphone, BellRing, Sparkles, Palette, Languages];
  return (
    <section id="hotels" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6 grid lg:grid-cols-[1.05fr_0.95fr] gap-14 items-start">
        <div>
          <Kopf label={h.label} title={h.title} intro={h.text} />
          <div className="grid sm:grid-cols-2 gap-5 mb-10">
            {h.benefits.map((b, i) => {
              const Icon = icons[i] ?? Sparkles;
              return (
                <motion.div key={b.title} {...einblenden} transition={{ duration: 0.4, delay: i * 0.06 }} className="flex gap-4 rounded-lg border border-border bg-card p-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-accent/10 text-accent">
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-foreground mb-1">{b.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{b.text}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <button type="button" onClick={() => setKontakt(true)} className="inline-flex items-center justify-center gap-2 bg-gradient-brand text-primary-foreground px-8 py-3.5 rounded-md text-sm font-medium hover:opacity-90 transition-opacity">
              <Hotel size={18} />
              {h.cta}
            </button>
            <Link to="/care-station" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:opacity-80">
              {h.more}
              <ArrowRight size={16} />
            </Link>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">{h.ctaNote}</p>
        </div>

        {/* Zwei Bildschirme der Hotel-Oberfläche, leicht versetzt */}
        <div className="relative mx-auto grid w-full max-w-xl grid-cols-2 gap-6 lg:mt-20">
          {[schirmTafel, schirmInteresse].map((src, i) => (
            <motion.figure key={src} {...einblenden} transition={{ duration: 0.6, delay: 0.15 + i * 0.15 }} className={i === 1 ? "mt-12" : ""}>
              <div className="overflow-hidden rounded-xl border-[6px] border-foreground bg-foreground shadow-2xl">
                <img src={src} alt={h.captions[i]} width={540} height={934} loading="lazy" className="block w-full h-auto" />
              </div>
              <figcaption className="mt-3 text-xs text-muted-foreground text-center">{h.captions[i]}</figcaption>
            </motion.figure>
          ))}
        </div>
      </div>

      <ContactDialog open={kontakt} onOpenChange={setKontakt} subject={h.contactSubject} title={h.cta} description={h.ctaNote} defaultRole="Hotel" />
    </section>
  );
};

export const NetzSortiment = () => {
  const { t } = useLanguage();
  const r = t.netzwerk.range;
  const icons = [Smile, Wind, Pill, MapPinned];
  return (
    <section id="sortiment" className="py-24 md:py-32 bg-foreground text-primary-foreground">
      <div className="container mx-auto px-6">
        <Kopf label={r.label} title={r.title} intro={r.intro} hell />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {r.items.map((item, i) => {
            const Icon = icons[i] ?? Package;
            return (
              <motion.div key={item.name} {...einblenden} transition={{ duration: 0.4, delay: i * 0.08 }} className="rounded-lg border border-primary-foreground/15 bg-primary-foreground/5 p-6">
                <Icon size={24} className="text-accent mb-5" />
                <h3 className="font-display font-semibold mb-2">{item.name}</h3>
                <p className="text-sm text-primary-foreground/70 leading-relaxed">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

type Stand = "available" | "inProgress" | "planned";

export const NetzStatus = () => {
  const { t } = useLanguage();
  const s = t.netzwerk.status;
  const badge: Record<Stand, { label: string; className: string; Icon: typeof Clock }> = {
    available: { label: s.availableLabel, className: "bg-accent/10 text-accent", Icon: CheckCircle2 },
    inProgress: { label: s.inProgressLabel, className: "bg-primary/10 text-primary", Icon: Hammer },
    planned: { label: s.plannedLabel, className: "bg-secondary text-muted-foreground", Icon: Clock },
  };
  return (
    <section id="status" className="py-24 md:py-32 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        <Kopf label={s.label} title={s.title} intro={s.intro} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {s.items.map((item, i) => {
            const b = badge[(item.state as Stand) ?? "planned"];
            return (
              <motion.div key={item.title} {...einblenden} transition={{ duration: 0.4, delay: i * 0.06 }} className="rounded-lg border border-border bg-card p-6">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium mb-4 ${b.className}`}>
                  <b.Icon size={14} />
                  {b.label}
                </span>
                <h3 className="font-display font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export const NetzPartner = () => {
  const { t } = useLanguage();
  const p = t.netzwerk.partners;
  const [kontakt, setKontakt] = useState(false);
  const icons = [Hotel, Factory, MessageSquare];
  return (
    <section id="partner" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <Kopf label={p.label} title={p.title} />
        <div className="grid md:grid-cols-3 gap-6">
          {p.items.map((item, i) => {
            const Icon = icons[i] ?? Handshake;
            const inhalt = (
              <>
                <Icon size={28} className="text-accent mb-5" />
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">{item.text}</p>
                <span className="mt-auto inline-flex items-center gap-2 text-sm font-medium text-primary">
                  {item.link}
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </span>
              </>
            );
            const karte = "group flex h-full w-full flex-col text-left rounded-lg border border-border bg-card p-8 hover:border-primary/40 transition-colors";
            return (
              <motion.div key={item.title} {...einblenden} transition={{ duration: 0.5, delay: i * 0.1 }}>
                {/* Ohne Ziel (Sonstige Anfragen): öffnet das Kontaktformular */}
                {item.href ? <Link to={item.href} className={karte}>{inhalt}</Link> : <button type="button" onClick={() => setKontakt(true)} className={karte}>{inhalt}</button>}
              </motion.div>
            );
          })}
        </div>
      </div>
      <ContactDialog open={kontakt} onOpenChange={setKontakt} subject={t.netzwerk.sonstigeSubject} title={t.netzwerk.nav.sonstige} description={t.netzwerk.sonstigeDesc} defaultRole="Sonstiges" />
    </section>
  );
};

export const NetzFAQ = () => {
  const { t } = useLanguage();
  const f = t.netzwerk.faq;
  return (
    <section id="faq" className="py-24 md:py-32 bg-gradient-subtle">
      <div className="container mx-auto px-6">
        <Kopf label={f.label} title={f.title} />
        <div className="max-w-3xl">
          <Accordion type="single" collapsible className="space-y-3">
            {f.items.map((item, i) => (
              <AccordionItem key={item.q} value={`faq-${i}`} className="rounded-lg border border-border bg-card px-6">
                <AccordionTrigger className="text-left font-display font-semibold text-foreground hover:no-underline py-5">{item.q}</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};
