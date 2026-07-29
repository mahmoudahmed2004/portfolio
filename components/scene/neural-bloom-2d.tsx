export function NeuralBloom2D() {
  return (
    <div className="neural-bloom-fallback" aria-hidden="true">
      {/* A decorative SVG remains an image so it can load before scene code. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/neural-bloom-fallback.svg" alt="" />
    </div>
  );
}
