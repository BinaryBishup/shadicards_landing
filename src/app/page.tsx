import Header from "@/components/Header";
import WorkspaceHeroSection from "@/components/WorkspaceHeroSection";
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
      <WorkspaceHeroSection />
      <AutoInvitationsSection />
      <SmartCardSection />
      <CardCatalogSection />
      <WebsiteControlSection />
      <DeliverySection />
      <EventPictureSection />
    </>
  );
}