import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Icosahedron, MeshDistortMaterial, OrbitControls, Points, PointMaterial } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

/** Distorting, glowing central mesh — the "AI core". */
function Core() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, d) => {
    if (ref.current) ref.current.rotation.y += d * 0.12;
  });
  return (
    <Icosahedron ref={ref} args={[1, 12]}>
      <MeshDistortMaterial
        color="#3730a3"
        emissive="#6366f1"
        emissiveIntensity={0.7}
        roughness={0.15}
        metalness={0.65}
        distort={0.38}
        speed={1.7}
      />
    </Icosahedron>
  );
}

/** Point-cloud nucleus inside the core. */
function Nucleus({ count = 1100 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 0.9 * Math.cbrt(Math.random());
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((_, d) => {
    if (ref.current) {
      ref.current.rotation.y += d * 0.18;
      ref.current.rotation.x += d * 0.05;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#c7d2fe"
        size={0.022}
        sizeAttenuation
        depthWrite={false}
      />
    </Points>
  );
}

/** Thin orbiting rings. */
function Rings() {
  const g = useRef<THREE.Group>(null);
  useFrame((_, d) => {
    if (g.current) {
      g.current.rotation.z += d * 0.1;
      g.current.rotation.x += d * 0.04;
    }
  });
  return (
    <group ref={g}>
      {[0, 1, 2].map((i) => (
        <mesh key={i} rotation={[Math.PI * 0.42 * i, Math.PI * 0.3 * i, 0]}>
          <torusGeometry args={[1.55 + i * 0.22, 0.006, 16, 140]} />
          <meshBasicMaterial color="#6366f1" transparent opacity={0.55} />
        </mesh>
      ))}
    </group>
  );
}

/** A light that tracks the cursor so the core feels alive. */
function PointerLight() {
  const ref = useRef<THREE.PointLight>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.position.x += (state.pointer.x * 5 - ref.current.position.x) * 0.1;
      ref.current.position.y += (state.pointer.y * 5 - ref.current.position.y) * 0.1;
      ref.current.position.z = 4;
    }
  });
  return <pointLight ref={ref} color="#818cf8" intensity={80} distance={16} />;
}

export default function NeuralCore() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[-5, -3, -4]} color="#4338ca" intensity={40} />
      <PointerLight />
      <Core />
      <Nucleus />
      <Rings />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.55}
        rotateSpeed={0.5}
      />
      <EffectComposer>
        <Bloom luminanceThreshold={0.08} luminanceSmoothing={0.9} intensity={1.15} radius={0.85} />
      </EffectComposer>
    </>
  );
}
