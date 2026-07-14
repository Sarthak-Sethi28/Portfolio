import React, { useEffect, useRef } from 'react';

const prefersReduced =
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/**
 * Miami-moon hero video (pre-cropped: no letterbox/watermark).
 * It autoplays on its own — static camera, the moon slowly descends toward the
 * surface, the tsunami rises, and water splashes over the lens. When the splash
 * hits (video ends), the page auto-scrolls once into the content below.
 * Reduced-motion → still poster, no autoplay, no auto-scroll.
 */
const HeroBackground: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const scrolledOnce = useRef(false);

  useEffect(() => {
    if (prefersReduced) return;
    const v = videoRef.current;
    if (!v) return;

    // Slow the clip so the moon descends gently, and force playback (don't rely
    // on the autoplay attribute alone).
    const start = () => {
      v.playbackRate = 0.75;
      v.play().catch(() => {});
    };
    v.addEventListener('loadedmetadata', start);
    if (v.readyState >= 1) start();

    // When the water splashes (clip ends), carry the viewer into the content —
    // but only once, and only if they haven't already scrolled away themselves.
    const onEnded = () => {
      if (!scrolledOnce.current && window.scrollY < 8) {
        scrolledOnce.current = true;
        document.getElementById('content-start')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };
    v.addEventListener('ended', onEnded);

    // Replay the intro if the hero comes fully back into view.
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.intersectionRatio > 0.9 && v.ended) {
            v.currentTime = 0;
            v.play().catch(() => {});
          }
        });
      },
      { threshold: 0.9 }
    );
    io.observe(v);

    return () => {
      v.removeEventListener('loadedmetadata', start);
      v.removeEventListener('ended', onEnded);
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
