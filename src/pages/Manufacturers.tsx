import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowLeft, Building2, CheckCircle2, Clock, Factory, Image, Languages, Luggage, Pill, ShieldCheck, Smile, Star, Tag } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactDialog from "@/components/ContactDialog";
import { Kopf, einblenden } from "@/components/netzwerk/Netzwerk";
import { useLanguage } from "@/i18n/LanguageContext";
import { useScrollToHash } from "@/hooks/useScrollToHash";
import { usePageSeo } from "@/lib/seo";
import schirmStart from "@/assets/netz-schirm-start.webp";

/**
 * „Ihre Produkte in der Care Station“ (seit 24.10.2026, Texte unter t.netzwerk.produkte). Die frühere Herstellerseite
 * für Zahnarztpraxen liegt im Zweig archiv/network-seite-2026-10-24; ihre Texte (t.manufacturersPage) werden nicht mehr genutzt.
 */
const Manufacturers = () => {
  usePageSeo("manufacturers", "/manufacturers");
  useScrollToHash();
  const { t } = useLanguage();
  const p = t.netzwerk.produkte;
  const [kontakt, setKontakt] = useState(false);
  const passtIcons = [Luggage, Smile, Pill, ShieldCheck];
  const schirmIcons = [Image, Tag, Building2, Star, Languages];

  const Knopf = () => (
    <button type="button" onClick={() => setKontakt(true)} className="inline-flex items-center justify-center gap-2 bg-gradient-brand text-primary-foreground px-8 py-3.5 rounded-md text-sm font-medium hover:opacity-90 transition-opacity">
      <Factory size={18} />
      {p.cta}
    </button>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-32 pb-20 bg-gradient-subtle">
        <div className="container mx-auto px-6 max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <Link to="/" className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-6">
              <ArrowLeft size={16} /> {t.nav.backToHome}
            </Link>
            <p className="text-sm font-medium tracking-[0.2em] uppercase text-accent mb-4">{p.kicker}</p>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-foreground leading-tight mb-6">{p.title}</h1>
            <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-8">{p.subtitle}</p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <Knopf />
              <p className="text-sm text-muted-foreground max-w-sm">{p.ctaNote}</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="sortiment" className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <Kopf label={p.passt.label} title={p.passt.title} intro={p.passt.intro} />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {p.passt.items.map((it, i) => {
              const Icon = passtIcons[i] ?? Smile;
              return (
                <motion.div key={it.title} {...einblenden} transition={{ duration: 0.4, delay: i * 0.08 }} className="rounded-lg border border-border bg-card p-6">
                  <Icon size={24} className="text-accent mb-5" />
                  <h3 className="font-display font-semibold text-foreground mb-2">{it.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{it.text}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="bildschirm" className="py-24 bg-foreground text-primary-foreground">
        <div className="container mx-auto px-6 grid lg:grid-cols-[1.2fr_0.8fr] gap-14 items-center">
          <div>
            <Kopf label={p.bildschirm.label} title={p.bildschirm.title} hell />
            <div className="space-y-6">
              {p.bildschirm.items.map((it, i) => {
                const Icon = schirmIcons[i] ?? Image;
                return (
                  <motion.div key={it.title} {...einblenden} transition={{ duration: 0.4, delay: i * 0.06 }} className="flex gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary-foreground/10 text-accent"><Icon size={20} /></div>
                    <div>
                      <h3 className="font-display font-semibold mb-1">{it.title}</h3>
                      <p className="text-sm text-primary-foreground/70 leading-relaxed">{it.text}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
          <motion.figure {...einblenden} className="mx-auto w-full max-w-[300px]">
            <div className="overflow-hidden rounded-xl border-[6px] border-black bg-black shadow-2xl">
              <img src={schirmStart} alt={p.imageAlt} width={540} height={934} loading="lazy" className="block w-full h-auto" />
            </div>
            <figcaption className="mt-3 text-xs text-primary-foreground/60 text-center">{p.bildschirm.caption}</figcaption>
          </motion.figure>
        </div>
      </section>

      <section id="ablauf" className="py-24 bg-gradient-subtle">
        <div className="container mx-auto px-6 grid lg:grid-cols-[1.25fr_0.75fr] gap-14">
          <div>
            <Kopf label={p.weg.label} title={p.weg.title} />
            <ol className="space-y-5">
              {p.weg.items.map((s, i) => (
                <motion.li key={s.title} {...einblenden} transition={{ duration: 0.4, delay: i * 0.07 }} className="flex gap-5 rounded-lg border border-border bg-card p-6">
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
            <Kopf label={p.zahlen.label} title={p.zahlen.title} />
            <div className="space-y-4">
              {p.zahlen.items.map((z) => {
                const da = z.state === "available";
                return (
                  <div key={z.title} className="rounded-lg border border-border bg-card p-5">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium mb-3 ${da ? "bg-accent/10 text-accent" : "bg-secondary text-muted-foreground"}`}>
                      {da ? <CheckCircle2 size={14} /> : <Clock size={14} />}
                      {da ? t.netzwerk.status.availableLabel : t.netzwerk.status.plannedLabel}
                    </span>
                    <h3 className="font-display font-semibold text-foreground mb-1">{z.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{z.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <Kopf label={t.netzwerk.faq.label} title={t.netzwerk.faq.title} />
          <div className="max-w-3xl">
            <Accordion type="single" collapsible className="space-y-3">
              {p.faq.map((item, i) => (
                <AccordionItem key={item.q} value={`hf-${i}`} className="rounded-lg border border-border bg-card px-6">
                  <AccordionTrigger className="text-left font-display font-semibold text-foreground hover:no-underline py-5">{item.q}</AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground leading-relaxed pb-5">{item.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <div className="mt-12"><Knopf /></div>
          </div>
        </div>
      </section>

      <Footer />
      <ContactDialog open={kontakt} onOpenChange={setKontakt} subject={p.contactSubject} title={p.cta} description={p.ctaNote} defaultRole="Hersteller" />
    </div>
  );
};

export default Manufacturers;
