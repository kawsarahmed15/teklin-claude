"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { MeshWobbleMaterial, Sphere, Float, Stars } from "@react-three/drei";
import * as THREE from "three";

function IcosahedronMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const { mouse } = useThree();

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = clock.elapsedTime * 0.12 + mouse.y * 0.1;
    meshRef.current.rotation.y = clock.elapsedTime * 0.18 + mouse.x * 0.1;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} scale={1.8}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshWobbleMaterial
          color="#8B5CF6"
          wireframe
          factor={0.25}
          speed={1}
          opacity={0.6}
          transparent
        />
      </mesh>
      {/* Inner glow sphere */}
      <mesh scale={1.4}>
        <icosahedronGeometry args={[1, 0]} />
        <meshBasicMaterial
          color="#06B6D4"
          wireframe={false}
          opacity={0.05}
          transparent
        />
      </mesh>
    </Float>
  );
}

function ParticleField() {
  const count = 200;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    return arr;
  }, []);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = clock.elapsedTime * 0.03;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color="#8B5CF6"
        sizeAttenuation
        transparent
        opacity={0.6}
      />
    </points>
  );
}

export function HeroScene() {
  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={1.2} color="#8B5CF6" />
        <pointLight position={[-5, -5, -5]} intensity={0.8} color="#06B6D4" />
        <IcosahedronMesh />
        <ParticleField />
        <Stars
          radius={30}
          depth={50}
          count={300}
          factor={3}
          saturation={0}
          fade
          speed={0.5}
        />
      </Canvas>
    </div>
  );
}
