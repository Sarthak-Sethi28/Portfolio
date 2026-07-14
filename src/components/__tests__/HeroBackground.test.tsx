import { render, act } from '@testing-library/react';
import HeroBackground from '../HeroBackground';

beforeAll(() => {
  // jsdom has no real rAF timing; run the callback synchronously for determinism.
  jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
    cb(0);
    return 0;
  });
});

function controllable(v: HTMLVideoElement, duration: number) {
  let ct = 0;
  Object.defineProperty(v, 'currentTime', {
    configurable: true,
    get: () => ct,
    set: (x) => {
      ct = x;
    },
  });
  Object.defineProperty(v, 'duration', { configurable: true, value: duration });
}

test('slows playback and starts playing on loadedmetadata', () => {
  const { container } = render(<HeroBackground />);
  const v = container.querySelector('video') as HTMLVideoElement;
  controllable(v, 10);
  act(() => {
    v.dispatchEvent(new Event('loadedmetadata'));
  });
  expect(v.playbackRate).toBe(0.75);
});

test('crossfades out near the end, then restarts and fades back in on loop', () => {
  const { container } = render(<HeroBackground />);
  const v = container.querySelector('video') as HTMLVideoElement;
  controllable(v, 10);
  act(() => {
    v.dispatchEvent(new Event('loadedmetadata'));
  });

  // Approaching the end (>= duration - FADE(0.8)) - fade out.
  v.currentTime = 9.5;
  act(() => {
    v.dispatchEvent(new Event('timeupdate'));
  });
  expect(v.style.opacity).toBe('0');

  // Clip ends - restart from 0 (never stops / seamless loop).
  act(() => {
    v.dispatchEvent(new Event('ended'));
  });
  expect(v.currentTime).toBe(0);
});
