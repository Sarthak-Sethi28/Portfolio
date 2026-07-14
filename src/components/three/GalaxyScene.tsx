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

    // --- Gravitational inspiral (not a straight slide) ---
    // Two galaxies fall toward a shared barycentre on decaying orbits: they
    // swing AROUND each other, accelerate inward as they close (plunge), wind
    // through ~2 revolutions, flatten onto a common plane, then coalesce.
    const DUR = 11;
    const p = Math.min(t / DUR, 1);

    const R0 = 9;
    const plunge = Math.pow(p, 2.3); // slow approach, fast final plunge (gravity)
    const R = R0 * (1 - plunge) + 0.18; // separation from centre, never quite 0

    // Angular momentum: winds faster as the pair closes in.
    const orbit = 2.1 * Math.PI * 2 * Math.pow(p, 1.4);
    const drift = t * 0.045; // gentle ongoing rotation after the merge
    const theta = orbit + drift;

    // vertical offset that flattens as they settle onto one plane
    const y = (1 - p) * 1.7 * Math.sin(orbit * 0.5);

    const cx = Math.cos(theta) * R;
    const cz = Math.sin(theta) * R;

    if (a.current) {
      a.current.position.set(cx, y, cz);
      a.current.rotation.z = (1 - p) * 0.5; // straightens as it merges
    }
    if (b.current) {
      // opposite side of the barycentre, on a tilted orbit
      b.current.position.set(-cx, -y, -cz);
      b.current.rotation.z = -(1 - p) * 0.7;
      b.current.rotation.x = 0.3 + (1 - p) * 0.25;
    }

    // Cursor parallax + slow cinematic drift of the whole system.
    if (scene.current) {
      scene.current.rotation.x += (-state.pointer.y * 0.2 + 0.42 - scene.current.rotation.x) * 0.04;
      scene.current.rotation.y += (state.pointer.x * 0.35 - scene.current.rotation.y) * 0.04 + 0.0004;
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
