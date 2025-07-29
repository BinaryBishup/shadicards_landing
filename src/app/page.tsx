import Header from "@/components/Header";
import NewHeroSection from "@/components/NewHeroSection";
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
      <NewHeroSection />
      <AutoInvitationsSection />
      <SmartCardSection />
      <CardCatalogSection />
      <WebsiteControlSection />
      <DeliverySection />
      <EventPictureSection />
    </>
  );
}