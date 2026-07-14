import React, { useEffect, useRef } from 'react';

const prefersReduced =
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/** Seconds of the calm opening (moon on the road, before the tsunami builds). */
const CALM_END = 2.5;

/**
 * Miami-moon hero video (pre-cropped: no letterbox/watermark).
 *
 * - First view: autoplays the FULL clip once (moon descends slowly → tsunami →
 *   water splash), then auto-scrolls once into the content on the splash.
 * - After that: if the viewer scrolls back up to the hero, it only gently loops
 *   the CALM OPENING (0 → CALM_END) — no tsunami replay, just ambient motion.
 * - Pauses when off-screen. Reduced-motion → still poster.
 */
const HeroBackground: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playedThrough = useRef(false);
  const scrolledOnce = useRef(false);

  useEffect(() => {
    if (prefersReduced) return;
    const v = videoRef.current;
    if (!v) return;

    const start = () => {
      v.playbackRate = 0.75;
      v.play().catch(() => {});
    };
    v.addEventListener('loadedmetadata', start);
    if (v.readyState >= 1) start();

    // Splash moment: mark done + auto-scroll into content (once).
    const onEnded = () => {
      playedThrough.current = true;
      if (!scrolledOnce.current && window.scrollY < 8) {
        scrolledOnce.current = true;
        document
          .getElementById('content-start')
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };
    v.addEventListener('ended', onEnded);

    // Once played through, keep the loop inside the calm opening only.
    const onTime = () => {
      if (playedThrough.current && v.currentTime >= CALM_END) {
        v.currentTime = 0;
      }
    };
    v.addEventListener('timeupdate', onTime);

    // Play when in view, pause when not. On re-entry after the full play, snap
    // back to the calm opening so the tsunami never replays.
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.intersectionRatio > 0.55) {
            if (playedThrough.current && (v.ended || v.currentTime >= CALM_END)) {
              v.currentTime = 0;
            }
            v.play().catch(() => {});
          } else {
            v.pause();
          }
        });
      },
      { threshold: [0, 0.55] }
    );
    io.observe(v);

    return () => {
      v.removeEventListener('loadedmetadata', start);
      v.removeEventListener('ended', onEnded);
      v.removeEventListener('timeupdate', onTime);
      io.disconnect();
    };
  }, []);

  if (prefersReduced) {
    return (
      <div className="absolute inset-0 overflow-hidden bg-base" aria-hidden="true">
        <img src="/hero/moon-poster.jpg" alt="" className="h-full w-full scale-[1.02] object-cover" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden bg-base" aria-hidden="true">
      <video
        ref={videoRef}
        className="h-full w-full scale-[1.02] object-cover"
        autoPlay
        muted
        playsInline
        preload="auto"
        poster="/hero/moon-poster.jpg"
      >
        <source src="/hero/moon.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

export default HeroBackground;
