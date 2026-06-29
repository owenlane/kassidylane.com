import { HomeHero } from "@/components/Hero";
import { StatBand } from "@/components/StatBand";
import { SituationRouter } from "@/components/SituationRouter";
import { DifferentiatorSpotlight } from "@/components/DifferentiatorSpotlight";
import { ResultsSection } from "@/components/ResultsSection";
import { AboutTeaser } from "@/components/AboutTeaser";
import { ReviewWallPreview } from "@/components/ReviewWallPreview";
import { CredentialsStrip } from "@/components/TrustMicroBar";
import { BilingualPanel } from "@/components/BilingualPanel";
import { CTABanner } from "@/components/CTABanner";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <StatBand />
      <SituationRouter />
      <DifferentiatorSpotlight />
      <ResultsSection />
      <AboutTeaser />
      <ReviewWallPreview />
      <CredentialsStrip />
      <BilingualPanel />
      <CTABanner />
    </>
  );
}
