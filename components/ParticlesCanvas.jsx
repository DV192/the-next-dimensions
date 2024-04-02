"use client";
import { PerspectiveCamera } from "@react-three/drei";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { BufferAttribute, TextureLoader } from "three";

function TorusPoints() {
  const meshRef = useRef(null);

  useFrame(() => {
    if (!meshRef.current) return;

    meshRef.current.rotation.y += 0.01
  });

  return (
    <points ref={meshRef}>
      <torusGeometry args={[.7, .2, 16, 100]} />
      <pointsMaterial size={0.005} />
    </points>
  )
}

function BGParticles({ count = 5000 }) {
  const bgParticlesRef = useRef();

  useEffect(() => {
    const handleMouseMove = (event) => {
      bgParticlesRef.current.rotation.x = -event.clientY * 0.0005;
      // bgParticlesRef.current.rotation.y = -event.clientX * 0.0005;
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useFrame(() => {
    bgParticlesRef.current.rotation.y -= 0.002;

    // bgParticlesRef.current.rotation.x = pointer.y * 0.05;
  });

  const points = useMemo(() => {
    const p = new Float32Array(count * 3).fill(0).map((v) => (
      (Math.random() - 0.5) * (Math.random() * 5)
    ));
    return new BufferAttribute(p, 3);
  }, [count]);

  const colorMap = useLoader(TextureLoader, 'Plus.png')

  return (
    <points ref={bgParticlesRef}>
      <bufferGeometry>
        <bufferAttribute attach={"attributes-position"} {...points} />
      </bufferGeometry>
      {/* <meshBasicMaterial color={'white'} /> */}
      <pointsMaterial
        size={0.005}
        map={colorMap}
        transparent={true}
      />
    </points>
  )
}

const ParticlesCanvas = () => {
  return (
    <div className="w-full h-full fixed top-0 left-0">
      <Canvas camera={[20, 0, 20]} style={{ background: "#21282a" }}>
        <ambientLight />
        <pointLight position={[2, 3, 4]} decay={0} color={'white'} intensity={0.1} />
        <PerspectiveCamera
          fov={75}
          near={0.1}
          far={100}
          position={[0, 0, 2]}
          makeDefault
        />

        <TorusPoints />
        <BGParticles />
      </Canvas>
    </div>
  )
}

export default ParticlesCanvas