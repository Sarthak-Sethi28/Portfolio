import React, { useEffect, useRef } from 'react';

const prefersReduced =
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

/** Seconds before the end to begin the crossfade back to the start. */
const FADE = 0.8;

/**
 * Miami-moon hero video (pre-cropped: no letterbox/watermark).
 * Plays the FULL clip on a continuous loop — moon descends slowly (0.75x),
 * tsunami, splash — and never stops. The loop point crossfades through black so
 * the splash→calm-moon wrap isn't abrupt. Reduced-motion → still poster.
 */
const HeroBackground: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const scrolledOnce = useRef(false);

  useEffect(() => {
    if (prefersReduced) return;
    const v = videoRef.current;
    if (!v) return;

    let fading = false;

    const start = () => {
      v.playbackRate = 0.75;
      v.play()?.catch(() => {});
    };
    v.addEventListener('loadedmetadata', start);
    if (v.readyState >= 1) start();

    // Fade out over the final moment of the clip.
    const onTime = () => {
      if (!v.duration) return;
      if (!fading && v.currentTime >= v.duration - FADE) {
        fading = true;
        v.style.opacity = '0';
      }
    };
    v.addEventListener('timeupdate', onTime);

    // On the FIRST splash, carry the viewer into the content once (if they
    // haven't scrolled away themselves). Then keep looping seamlessly.
    const onEnded = () => {
      if (!scrolledOnce.current && window.scrollY < 8) {
        scrolledOnce.current = true;
        document
          .getElementById('content-start')
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      v.currentTime = 0;
      v.play()?.catch(() => {});
      requestAnimationFrame(() => {
        v.style.opacity = '1';
        fading = false;
      });
    };
    v.addEventListener('ended', onEnded);

    return () => {
      v.removeEventListener('loadedmetadata', start);
      v.removeEventListener('timeupdate', onTime);
      v.removeEventListener('ended', onEnded);
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
        style={{ transition: 'opacity 0.8s ease-in-out' }}
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
