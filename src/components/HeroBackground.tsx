import React from 'react';

const prefersReduced =
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/**
 * Cinematic Miami-moon hero video (pre-cropped: no letterbox, no watermark).
 * Reduced-motion users get the still poster frame.
 */
const HeroBackground: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden bg-base" aria-hidden="true">
    {prefersReduced ? (
      <img src="/hero/poster.jpg" alt="" className="h-full w-full scale-[1.02] object-cover" />
    ) : (
      <video
        className="h-full w-full scale-[1.02] object-cover"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/hero/poster.jpg"
      >
        <source src="/hero/moon.mp4" type="video/mp4" />
      </video>
    )}
  </div>
);

export default HeroBackground;
