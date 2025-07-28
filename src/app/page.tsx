import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import CardCatalogSection from "@/components/CardCatalogSection";
import AutoInvitationsSection from "@/components/AutoInvitationsSection";
import SmartCardSection from "@/components/SmartCardSection";
import WebsiteControlSection from "@/components/WebsiteControlSection";
import DeliverySection from "@/components/DeliverySection";
import EventPictureSection from "@/components/EventPictureSection";

export default function Home() {
  return (
    <>
      <Header />
      <HeroSection />
      <AutoInvitationsSection />
      <SmartCardSection />
      <CardCatalogSection />
      <WebsiteControlSection />
      <DeliverySection />
      <EventPictureSection />
    </>
  );
}