import Navbar from "@/components/Navbar";
import { NetzFAQ, NetzHero, NetzHotels, NetzPartner, NetzPartnerProdukte, NetzSortiment, NetzStatus, NetzWie } from "@/components/netzwerk/Netzwerk";
import Footer from "@/components/Footer";
import { useScrollToHash } from "@/hooks/useScrollToHash";
import { useLanguage } from "@/i18n/LanguageContext";
import { usePageSeo } from "@/lib/seo";

const Index = () => {
  useScrollToHash();
  const { t } = useLanguage();
  // FAQ als strukturierte Daten: Suchmaschinen können Fragen und Antworten direkt anzeigen,
  // auch wenn die Antworten auf der Seite zugeklappt sind
  usePageSeo("home", "/", {
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: t.netzwerk.faq.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      {/* Seit 24.10.2026: „Das Versorgungsnetzwerk“, Aufbau über Hotels. Die frühere Startseite für Zahnarztpraxen
          liegt im Zweig archiv/network-seite-2026-10-24; Standort-Karte mit Praxisnamen und Praxis-Abschnitte sind entfernt.
          Seit 24.10.2026 wieder mit Partnern und ihren Produkten (NetzPartnerProdukte). */}
      <NetzHero />
      <NetzWie />
      <NetzHotels />
      <NetzSortiment />
      <NetzPartnerProdukte />
      <NetzStatus />
      <NetzPartner />
      <NetzFAQ />
      <Footer />
    </div>
  );
};

export default Index;
