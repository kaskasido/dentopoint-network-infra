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

const Index = () => {
  useScrollToHash();

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
