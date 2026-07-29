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
import { StructuredData } from "@/components/seo/structured-data";
import { SiteFooter } from "@/components/shell/site-footer";
import { SiteHeader } from "@/components/shell/site-header";
import { portfolio } from "@/lib/portfolio-data";
import { getSiteUrl } from "@/lib/site-url";

export default function Home() {
  const siteUrl = getSiteUrl();
  const personId = new URL("/#person", siteUrl).href;
  const publicRepositoryProjects = portfolio.projects.filter(
    ({ repository }) =>
      repository.kind === "repository" &&
      /^https?:\/\//.test(repository.href),
  );
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: portfolio.identity.name,
        jobTitle: portfolio.identity.role,
        description: portfolio.identity.biography,
        url: new URL("/", siteUrl).href,
        sameAs: portfolio.identity.links
          .filter(({ kind }) => kind === "social")
          .map(({ href }) => href),
      },
      ...publicRepositoryProjects.map((project) => ({
        "@type": "SoftwareSourceCode",
        "@id": new URL(`/#project-${project.slug}`, siteUrl).href,
        name: project.title,
        description: project.summary,
        url: new URL("/", siteUrl).href,
        codeRepository: project.repository.href,
        programmingLanguage: project.stack,
        author: {
          "@id": personId,
        },
      })),
    ],
  };

  return (
    <ObservatoryProvider>
      <StructuredData data={structuredData} />
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
