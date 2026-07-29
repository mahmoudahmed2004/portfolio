import { CapabilityConstellation } from "@/components/sections/capability-constellation";
import { ExpertisePipeline } from "@/components/sections/expertise-pipeline";
import { FeaturedWork } from "@/components/sections/featured-work";
import { Hero } from "@/components/sections/hero";
import { SoftwareSystems } from "@/components/sections/software-systems";
import { SectionHeading } from "@/components/shell/section-heading";
import { SiteFooter } from "@/components/shell/site-footer";
import { SiteHeader } from "@/components/shell/site-header";
import { portfolio } from "@/lib/portfolio-data";

const sections = [
  {
    id: "experience",
    eyebrow: "Experience",
    title: "Practice, training, and education",
  },
  {
    id: "certificates",
    eyebrow: "Certificates",
    title: "Verified learning milestones",
  },
  {
    id: "about",
    eyebrow: "About",
    title: "AI engineering, made useful",
  },
  {
    id: "contact",
    eyebrow: "Contact",
    title: "Start a conversation",
  },
] as const;

export default function Home() {
  return (
    <div className="site-shell">
      <SiteHeader items={portfolio.navigation} />
      <main id="main-content">
        <Hero />
        <ExpertisePipeline />
        <FeaturedWork />
        <SoftwareSystems />
        <CapabilityConstellation />

        {sections.map((section, index) => (
          <section
            key={section.id}
            id={section.id}
            className="section-shell shell-placeholder"
            aria-labelledby={`${section.id}-title`}
          >
            <span className="shell-placeholder__index" aria-hidden="true">
              {String(index + 3).padStart(2, "0")}
            </span>
            <SectionHeading
              id={`${section.id}-title`}
              eyebrow={section.eyebrow}
              title={section.title}
            />
          </section>
        ))}
      </main>
      <SiteFooter />
    </div>
  );
}
