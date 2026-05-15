import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import InfrastructureSection from "@/components/InfrastructureSection";
import LocatorSection from "@/components/LocatorSection";
import PartnersSection from "@/components/PartnersSection";
import ManufacturersSection from "@/components/ManufacturersSection";
import CategoriesSection from "@/components/CategoriesSection";
import PatientsSection from "@/components/PatientsSection";
import AnalyticsSection from "@/components/AnalyticsSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <InfrastructureSection />
      <LocatorSection />
      <PartnersSection />
      <ManufacturersSection />
      <CategoriesSection />
      <PatientsSection />
      <AnalyticsSection />
      <Footer />
    </div>
  );
};

export default Index;
