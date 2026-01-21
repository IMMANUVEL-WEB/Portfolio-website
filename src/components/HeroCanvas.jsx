import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';

function DeveloperRig() {
  const group = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.y = Math.sin(t / 4) * 0.25;
      group.current.position.y = Math.sin(t / 2) * 0.06;
    }
  });

  return (
    <group ref={group}>
      {/* Desk */}
      <mesh position={[0, -0.45, 0]}>
        <boxGeometry args={[2.2, 0.12, 1.4]} />
        <meshStandardMaterial color="#020617" />
      </mesh>

      {/* Laptop base */}
      <mesh position={[0, -0.25, 0.15]} rotation={[-0.12, 0, 0]}>
        <boxGeometry args={[0.96, 0.05, 0.68]} />
        <meshStandardMaterial color="#020617" />
      </mesh>

      {/* Laptop screen */}
      <mesh position={[0, 0.15, -0.06]} rotation={[0.2, 0, 0]}>
        <boxGeometry args={[0.82, 0.52, 0.03]} />
        <meshStandardMaterial color="#0f172a" />
      </mesh>

      {/* Screen glow */}
      <mesh position={[0, 0.16, -0.045]} rotation={[0.2, 0, 0]}>
        <planeGeometry args={[0.76, 0.46]} />
        <meshBasicMaterial color="#22d3ee" transparent opacity={0.16} />
      </mesh>

      {/* Developer body */}
      <mesh position={[0, 0.1, 0.35]}>
        <capsuleGeometry args={[0.16, 0.5, 16, 24]} />
        <meshStandardMaterial color="#1e293b" />
      </mesh>

      {/* Head */}
      <mesh position={[0, 0.62, 0.34]}>
        <sphereGeometry args={[0.16, 24, 24]} />
        <meshStandardMaterial color="#e5e7eb" />
      </mesh>

      {/* Ambient glow on desk */}
      <mesh position={[0, -0.38, 0]}>
        <circleGeometry args={[1.4, 40]} />
        <meshBasicMaterial color="#0f172a" />
      </mesh>
    </group>
  );
}

function Scene() {
  return (
    <>
      <color attach="background" args={['#020617']} />
      <ambientLight intensity={0.6} />
      <directionalLight
        intensity={0.7}
        position={[2, 2.5, 2.5]}
        castShadow
      />
      <spotLight
        intensity={0.8}
        position={[-2, 3, 1]}
        angle={0.5}
        penumbra={0.3}
      />
      <DeveloperRig />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={(2 * Math.PI) / 3}
      />
    </>
  );
}

export function HeroCanvas() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 0.61, 0.36, 1] }}
      className="h-full w-full rounded-2xl border border-slate-900/80 bg-slate-950/90"
    >
      <Canvas
        camera={{ position: [1.4, 1.5, 3], fov: 45 }}
        className="h-full w-full"
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </motion.div>
  );
}


