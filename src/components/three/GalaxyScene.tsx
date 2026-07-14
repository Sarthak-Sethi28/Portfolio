import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

interface GalaxyParams {
  count: number;
  radius: number;
  branches: number;
  spin: number;
  randomness: number;
  randomnessPower: number;
  inColor: string;
  outColor: string;
}

function buildGalaxy(p: GalaxyParams) {
  const positions = new Float32Array(p.count * 3);
  const colors = new Float32Array(p.count * 3);
  const cIn = new THREE.Color(p.inColor);
  const cOut = new THREE.Color(p.outColor);

  for (let i = 0; i < p.count; i++) {
    const i3 = i * 3;
    const r = Math.random() * p.radius;
    const branchAngle = ((i % p.branches) / p.branches) * Math.PI * 2;
    const spinAngle = r * p.spin;
    const rand = () =>
      Math.pow(Math.random(), p.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1) *
      p.randomness *
      r;

    positions[i3] = Math.cos(branchAngle + spinAngle) * r + rand();
    positions[i3 + 1] = rand() * 0.5;
    positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * r + rand();

    const mixed = cIn.clone().lerp(cOut, Math.min(r / p.radius, 1));
    colors[i3] = mixed.r;
    colors[i3 + 1] = mixed.g;
    colors[i3 + 2] = mixed.b;
  }
  return { positions, colors };
}

function Galaxy({
  params,
  size = 0.035,
  spinDir = 1,
}: {
  params: GalaxyParams;
  size?: number;
  spinDir?: number;
}) {
  const ref = useRef<THREE.Points>(null);
  const { positions, colors } = useMemo(() => buildGalaxy(params), [params]);

  useFrame((_, d) => {
    if (ref.current) ref.current.rotation.y += d * 0.06 * spinDir;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        sizeAttenuation
        vertexColors
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function Starfield({ count = 1600 }: { count?: number }) {
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 14 + Math.random() * 26;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.06} sizeAttenuation color="#cbd5e1" transparent opacity={0.5} depthWrite={false} />
    </points>
  );
}

/** Two galaxies drift together over the intro, then revolve as one. */
function MergingGalaxies() {
  const a = useRef<THREE.Group>(null);
  const b = useRef<THREE.Group>(null);
  const scene = useRef<THREE.Group>(null);

  const galA = useMemo<GalaxyParams>(
    () => ({
      count: 11000,
      radius: 5,
      branches: 4,
      spin: 0.9,
      randomness: 0.28,
      randomnessPower: 3,
      inColor: '#c7d2fe',
      outColor: '#4338ca',
    }),
    []
  );
  const galB = useMemo<GalaxyParams>(
    () => ({
      count: 9000,
      radius: 4,
      branches: 3,
      spin: -1.1,
      randomness: 0.32,
      randomnessPower: 3,
      inColor: '#f5d0fe',
      outColor: '#7e22ce',
    }),
    []
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    // Ease the two galaxies from far apart to merged over ~5s.
    const p = Math.min(t / 5, 1);
    const ease = 1 - Math.pow(1 - p, 3); // easeOutCubic
    const gap = (1 - ease) * 7;

    if (a.current) {
      a.current.position.set(-gap, (1 - ease) * 2, 0);
      a.current.rotation.z = (1 - ease) * 0.6;
    }
    if (b.current) {
      b.current.position.set(gap, -(1 - ease) * 2, 0);
      b.current.rotation.z = -(1 - ease) * 0.9;
      b.current.rotation.x = 0.35;
    }
    // Cursor parallax + slow drift for the whole system.
    if (scene.current) {
      scene.current.rotation.x += ((-state.pointer.y * 0.25 + 0.35) - scene.current.rotation.x) * 0.04;
      scene.current.rotation.y += ((state.pointer.x * 0.4) - scene.current.rotation.y) * 0.04 + 0.0006;
    }
  });

  return (
    <group ref={scene}>
      <Starfield />
      <group ref={a}>
        <Galaxy params={galA} spinDir={1} />
      </group>
      <group ref={b}>
        <Galaxy params={galB} spinDir={-1} size={0.03} />
      </group>
    </group>
  );
}

export default function GalaxyScene() {
  return (
    <>
      {/* offset right so the name on the left sits over darker space */}
      <group position={[2.6, 0, 0]}>
        <MergingGalaxies />
      </group>
      <EffectComposer>
        <Bloom luminanceThreshold={0.05} luminanceSmoothing={0.9} intensity={1.25} radius={0.7} mipmapBlur />
      </EffectComposer>
    </>
  );
}
