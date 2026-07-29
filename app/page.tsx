import { portfolio } from "@/lib/portfolio-data";

export default function Home() {
  return (
    <main id="main-content">
      <h1>{portfolio.identity.name}</h1>
      <p>{portfolio.identity.headline}</p>
    </main>
  );
}
