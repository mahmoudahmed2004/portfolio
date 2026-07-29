import { AboutCV } from "@/components/sections/about-cv";
import { ObservatoryProvider } from "@/components/motion/observatory-provider";
import { CapabilityConstellation } from "@/components/sections/capability-constellation";
import { CertificateGallery } from "@/components/sections/certificate-gallery";
import { Contact } from "@/components/sections/contact";
import { ExpertisePipeline } from "@/components/sections/expertise-pipeline";
import { ExperienceTimeline } from "@/components/sections/experience-timeline";
import { FeaturedWork } from "@/components/sections/featured-work";
import { Hero } from "@/components/sections/hero";
import { SoftwareSystems } from "@/components/sections/software-systems";
import { SiteFooter } from "@/components/shell/site-footer";
import { SiteHeader } from "@/components/shell/site-header";
import { portfolio } from "@/lib/portfolio-data";

export default function Home() {
  return (
    <ObservatoryProvider>
      <div className="site-shell">
        <SiteHeader items={portfolio.navigation} />
        <main id="main-content">
          <Hero />
          <ExpertisePipeline />
          <FeaturedWork />
          <SoftwareSystems />
          <CapabilityConstellation />
          <ExperienceTimeline experience={portfolio.experience} />
          <CertificateGallery certificates={portfolio.certificates} />
          <AboutCV />
          <Contact />
        </main>
        <SiteFooter />
      </div>
    </ObservatoryProvider>
  );
}
