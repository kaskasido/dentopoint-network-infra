import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import InfrastructureSection from "@/components/InfrastructureSection";
import LocatorSection from "@/components/LocatorSection";
import PartnersSection from "@/components/PartnersSection";
import ManufacturersSection from "@/components/ManufacturersSection";
import CategoriesSection from "@/components/CategoriesSection";
import StatusSection from "@/components/StatusSection";
import FAQSection from "@/components/FAQSection";
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
      mainEntity: t.faq.items.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: item.a },
      })),
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <InfrastructureSection />
      <LocatorSection />
      <PartnersSection />
      <ManufacturersSection />
      <CategoriesSection />
      <StatusSection />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default Index;
