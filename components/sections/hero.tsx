import { Reveal } from "@/components/motion/reveal";
import { portfolio } from "@/lib/portfolio-data";

export function Hero() {
  const { identity } = portfolio;

  return (
    <section
      id="intro"
      className="section-shell hero"
      aria-labelledby="hero-title"
    >
      <Reveal className="hero__copy">
        <p className="eyebrow">
          Neural observatory <span aria-hidden="true">·</span>{" "}
          {identity.location}
        </p>
        <p className="hero__role">
          <span aria-hidden="true" />
          {identity.role}
        </p>
        <h1 id="hero-title">{identity.name}</h1>
        <p className="hero__headline">{identity.headline}</p>
        <p className="hero__summary">{identity.introduction}</p>

        <div className="hero__actions" aria-label="Portfolio actions">
          <a className="hero__primary-action" href="#work">
            Explore selected work
            <span aria-hidden="true">↘</span>
          </a>
          <ul className="hero__contact-actions">
            {identity.links.map((link) => {
              const external = link.href.startsWith("http");

              return (
                <li key={link.label}>
                  <a
                    href={link.href}
                    download={link.kind === "download" ? true : undefined}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noreferrer" : undefined}
                  >
                    {link.label}
                    <span aria-hidden="true">{external ? " ↗" : " →"}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </Reveal>

      <Reveal className="hero__signal-field">
        <div
          className="hero-bloom-slot"
          data-scene-slot="neural-bloom"
          aria-hidden="true"
        >
          <span className="hero-bloom-slot__coordinate hero-bloom-slot__coordinate--top">
            LAT 30.0444
          </span>
          <span className="hero-bloom-slot__coordinate hero-bloom-slot__coordinate--side">
            LON 31.2357
          </span>
          <span className="hero-bloom-slot__seed" />
        </div>
        <p className="hero__signal-legend">
          Observe <span aria-hidden="true">·</span> Learn{" "}
          <span aria-hidden="true">·</span> Evaluate{" "}
          <span aria-hidden="true">·</span> Deliver
        </p>
      </Reveal>
    </section>
  );
}
