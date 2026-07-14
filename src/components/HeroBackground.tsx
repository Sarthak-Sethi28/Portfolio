import React from 'react';

const prefersReduced =
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/**
 * Cinematic galaxy-merge hero background (Veo clip).
 * object-cover crops the baked-in letterbox; a corner vignette hides the
 * generator watermark. Reduced-motion users get the still poster frame.
 */
const HeroBackground: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden bg-base" aria-hidden="true">
    {prefersReduced ? (
      <img src="/hero/poster.jpg" alt="" className="h-full w-full scale-[1.18] object-cover" />
    ) : (
      <video
        className="h-full w-full scale-[1.18] object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/hero/poster.jpg"
      >
        <source src="/hero/galaxy.mp4" type="video/mp4" />
      </video>
    )}
    {/* mask the generator watermark in the bottom-right corner */}
    <div className="pointer-events-none absolute bottom-0 right-0 h-56 w-56 bg-[radial-gradient(circle_at_bottom_right,rgba(10,10,11,0.98)_0%,rgba(10,10,11,0.9)_45%,transparent_80%)]" />
  </div>
);

export default HeroBackground;
