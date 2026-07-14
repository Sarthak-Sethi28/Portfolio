import React, { Suspense, lazy } from 'react';
import { Canvas } from '@react-three/fiber';

const NeuralCore = lazy(() => import('./three/NeuralCore'));

const prefersReduced =
  typeof window !== 'undefined' &&
  window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

const Hero3D: React.FC = () => {
  // Reduced-motion / no-WebGL: a calm CSS glow instead of the animated scene.
  if (prefersReduced) {
    return <div className="hero-orb-fallback" aria-hidden="true" />;
  }

  return (
    <Canvas
      className="!absolute inset-0"
      dpr={[1, 2]}
      camera={{ position: [0, 0, 5], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      aria-hidden="true"
    >
      <Suspense fallback={null}>
        <NeuralCore />
      </Suspense>
    </Canvas>
  );
};

export default Hero3D;
