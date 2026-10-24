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
import logoAportha from "@/assets/partner/logo-aportha.png";
import logoBluem from "@/assets/partner/logo-bluem.png";
import logoSds from "@/assets/partner/logo-sds.png";

// Produktbilder aus den Freigabe-Unterlagen der Hersteller (dentopoint_app/docs/freigabe). APOrtha Vitamin D3 20.000 I.E. bewusst nicht gezeigt.
const produktBilder = import.meta.glob<string>("@/assets/partner/*.webp", { eager: true, import: "default" });
const bild = (key: string) => produktBilder[`/src/assets/partner/${key}.webp`];
const PARTNER = [
  { name: "SDS Swiss Biohealth", logo: logoSds, logoHoehe: "h-6 md:h-7", produkte: ["sds-boost", "sds-baseline", "sds-big5"], foto: false },
  { name: "APOrtha", logo: logoAportha, logoHoehe: "h-11 md:h-12", produkte: ["aportha-d3-5000", "aportha-d3-spray", "aportha-magnesium"], foto: false },
  { name: "bluem", logo: logoBluem, logoHoehe: "h-9 md:h-10", produkte: ["bluem-zahnbuerste", "bluem-mundspuelung", "bluem-mundschaum", "bluem-mundgel", "bluem-sauerstoff"], foto: true },
];

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

// Kicker in Gold, Überschrift in Caladea Regular, goldene Haarlinie (DentoPoint Design System, Variante B)
export const Kopf = ({ label, title, intro }: { label: string; title: string; intro?: string }) => (
  <motion.div {...einblenden} className="max-w-3xl mb-14">
    <p className="text-xs font-semibold tracking-[0.24em] uppercase mb-4 text-gold-ink">{label}</p>
    <h2 className="font-display text-3xl md:text-[2.75rem] md:leading-tight font-normal mb-5 text-foreground">{title}</h2>
    <div className="w-12 h-px bg-gold mb-6" />
    {intro && <p className="text-base leading-relaxed max-w-2xl text-muted-foreground">{intro}</p>}
  </motion.div>
);

export const NetzHero = () => {
  const { t } = useLanguage();
  const h = t.netzwerk.hero;
  const [kontakt, setKontakt] = useState(false);
  return (
    <section className="bg-background px-3 pt-[4.75rem] pb-3 md:px-6 md:pt-[5.5rem] md:pb-6">
      {/* Weißraum mit goldenem Haarlinien-Rahmen statt Raster und Lichtschein */}
      <div className="border border-gold py-16 md:py-24">
      <div className="container mx-auto px-6 grid lg:grid-cols-[1.15fr_0.85fr] gap-14 items-center">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
          <p className="text-xs font-semibold tracking-[0.24em] uppercase text-gold-ink mb-6">{h.kicker}</p>
          <p className="font-display font-normal text-4xl md:text-5xl tracking-tight text-foreground mb-5">
            Dento<span className="text-gradient-brand">Point</span>
          </p>
          <h1 className="font-display text-3xl md:text-5xl font-normal text-foreground leading-tight mb-6">{h.title}</h1>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl mb-6">{h.subtitle}</p>
          <div className="w-12 h-px bg-gold mb-6" />
          <p className="font-display italic text-lg md:text-xl text-gold-ink mb-10">{h.claim}</p>
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center flex-wrap">
            <a href="#hotels" className="inline-flex items-center justify-center gap-2 bg-gradient-brand text-primary-foreground px-8 py-3.5 rounded-full text-sm font-medium hover:opacity-90 transition-opacity">
              <Hotel size={18} />
              {h.ctaHotels}
              <ArrowRight size={16} />
            </a>
            <Link to="/manufacturers" className="inline-flex items-center justify-center gap-2 border border-primary/40 text-primary px-8 py-3.5 rounded-full text-sm font-medium hover:bg-primary/10 transition-colors">
              <Factory size={18} />
              {h.ctaManufacturers}
            </Link>
            <button type="button" onClick={() => setKontakt(true)} className="inline-flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors px-4 py-3.5">
              <MessageSquare size={16} />
              {h.ctaContact}
            </button>
          </div>
        </motion.div>

        <motion.figure initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.2 }} className="mx-auto w-full max-w-[420px]">
          <div className="rounded-[10px] bg-muted px-10 py-8 sm:px-16">
            <img src={automat} alt={h.imageAlt} width={640} height={1473} className="mx-auto w-full max-w-[230px] sm:max-w-[260px] h-auto" />
          </div>
          <figcaption className="mt-4 text-xs text-muted-foreground text-center">{h.imageNote}</figcaption>
        </motion.figure>
      </div>
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
          <div aria-hidden="true" className="hidden md:block absolute top-[3.75rem] left-[16%] right-[16%] h-px bg-gold" />
          {w.pillars.map((p, i) => {
            const Icon = icons[i] ?? Package;
            return (
              <motion.div key={p.title} {...einblenden} transition={{ duration: 0.5, delay: i * 0.12 }} className="relative rounded-lg border border-border bg-card p-8">
                <div className="relative z-10 mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-gold bg-card text-primary">
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
            <button type="button" onClick={() => setKontakt(true)} className="inline-flex items-center justify-center gap-2 bg-gradient-brand text-primary-foreground px-8 py-3.5 rounded-full text-sm font-medium hover:opacity-90 transition-opacity">
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
              <div className="overflow-hidden rounded-xl border-[6px] border-foreground bg-foreground shadow-soft">
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
    <section id="sortiment" className="py-24 md:py-32 bg-muted text-foreground border-y border-border">
      <div className="container mx-auto px-6">
        <Kopf label={r.label} title={r.title} intro={r.intro} />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {r.items.map((item, i) => {
            const Icon = icons[i] ?? Package;
            return (
              <motion.div key={item.name} {...einblenden} transition={{ duration: 0.4, delay: i * 0.08 }} className="rounded-lg border border-border bg-card p-6">
                <Icon size={24} className="text-accent mb-5" />
                <h3 className="font-display font-semibold mb-2">{item.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
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

/** Partner mit Logo und ihren Produkten in der Care Station (Freigabe der Hersteller liegt vor). */
export const NetzPartnerProdukte = () => {
  const { t } = useLanguage();
  const pp = t.netzwerk.partnerProdukte;
  return (
    <section id="partner-produkte" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        <Kopf label={pp.label} title={pp.title} intro={pp.intro} />
        <div className="space-y-16">
          {PARTNER.map((p) => (
            <motion.div key={p.name} {...einblenden}>
              <div className="flex items-center gap-6 border-b border-gold pb-5 mb-8">
                <img src={p.logo} alt={p.name} loading="lazy" className={`${p.logoHoehe} w-auto object-contain`} />
                <span className="text-xs font-semibold tracking-[0.24em] uppercase text-muted-foreground">{p.name}</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
                {p.produkte.map((key) => (
                  <figure key={key} className="rounded-lg border border-border bg-card overflow-hidden">
                    <div className="aspect-[4/5] bg-white">
                      <img src={bild(key)} alt={`${p.name}: ${pp.names[key]}`} loading="lazy" className={`h-full w-full ${p.foto ? "object-cover" : "object-contain p-4"}`} />
                    </div>
                    <figcaption className="border-t border-border p-4 text-sm leading-snug text-foreground">{pp.names[key]}</figcaption>
                  </figure>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        <p className="mt-8 text-xs text-muted-foreground">{pp.imageNote}</p>
      </div>
    </section>
  );
};
