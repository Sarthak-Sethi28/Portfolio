import React, { useEffect, useRef } from 'react';

const prefersReduced =
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/**
 * Miami-moon hero video (pre-cropped: no letterbox/watermark) that is
 * SCRUBBED BY SCROLL: the camera stays static while scrolling drives the clip
 * — the moon slowly comes closer, the tsunami rises, and the same scroll
 * carries the viewer into the content below. Reduced-motion → still poster.
 */
const HeroBackground: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (prefersReduced) return;
    const video = videoRef.current;
    const stage = document.getElementById('hero-stage');
    if (!video || !stage) return;

    let duration = 0;
    const readDuration = () => {
      duration = Number.isFinite(video.duration) ? video.duration : 0;
    };
    video.addEventListener('loadedmetadata', readDuration);
    if (video.readyState >= 1) readDuration();

    const update = () => {
      rafRef.current = null;
      if (!duration) return;
      const scrollable = stage.offsetHeight - window.innerHeight;
      const progress =
        scrollable > 0
          ? Math.min(Math.max(-stage.getBoundingClientRect().top / scrollable, 0), 1)
          : 0;
      const t = progress * (duration - 0.05);
      if (Number.isFinite(t)) {
        try {
          video.currentTime = t;
        } catch {
          /* seeking not ready yet */
        }
      }
    };

    const onScroll = () => {
      if (rafRef.current == null) rafRef.current = requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      video.removeEventListener('loadedmetadata', readDuration);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
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
