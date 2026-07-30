import { portfolio } from "@/lib/portfolio-data";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="site-footer__inner">
        <div>
          <a className="site-mark focus-ring" href="#intro" aria-label="Home">
            <span className="site-mark__aperture" aria-hidden="true">
              <span />
            </span>
            <span>MAF / AI</span>
          </a>
          <p>
            {portfolio.identity.name}
            <span aria-hidden="true"> · </span>
            {portfolio.identity.role}
          </p>
        </div>

        <nav aria-label="Footer links">
          <ul>
            {portfolio.identity.links.map((link) => (
              <li key={link.href}>
                <a className="focus-ring" href={link.href}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <p className="site-footer__note">
        Designed as a clear view into applied AI work.
      </p>
    </footer>
  );
}
