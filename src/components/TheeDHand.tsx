"use client";

import { useRef, Suspense, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

// Shared mouse state tracked via window-level events (not R3F pointer)
// This avoids issues with overlay divs blocking canvas pointer events
const mouseState = { x: 0, y: 0 };

function LeftHandModel({ isMobile }: { isMobile: boolean }) {
  const { scene } = useGLTF("/model/left2.glb");
  const modelRef = useRef<THREE.Group>(null);

  const baseRotation = isMobile
    ? { x: 1.1, y: -1.1, z: 1.1 }
    : { x: -0.1, y: -1.5, z: 0 };

  const currentRotation = useRef({ ...baseRotation });

  scene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.material = new THREE.MeshStandardMaterial({
        color: new THREE.Color("#8b5cf6"),
        metalness: 0.3,
        roughness: 0.4,
        envMapIntensity: 1,
      });
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  useFrame((_, delta) => {
    if (modelRef.current) {
      const tiltAmount = 0.08;
      const maxTilt = 0.1;
      // Use delta time for frame-rate independent lerp (target ~60fps baseline)
      const lerpFactor = 1 - Math.pow(0.001, delta);

      const offsetX = THREE.MathUtils.clamp(
        mouseState.y * tiltAmount,
        -maxTilt,
        maxTilt,
      );
      const offsetY = THREE.MathUtils.clamp(
        mouseState.x * tiltAmount,
        -maxTilt,
        maxTilt,
      );
      const offsetZ = THREE.MathUtils.clamp(
        mouseState.x * 0.05,
        -maxTilt,
        maxTilt,
      );

      const targetX = baseRotation.x + offsetX;
      const targetY = baseRotation.y + offsetY;
      const targetZ = baseRotation.z + offsetZ;

      currentRotation.current.x +=
        (targetX - currentRotation.current.x) * lerpFactor;
      currentRotation.current.y +=
        (targetY - currentRotation.current.y) * lerpFactor;
      currentRotation.current.z +=
        (targetZ - currentRotation.current.z) * lerpFactor;

      modelRef.current.rotation.x = THREE.MathUtils.clamp(
        currentRotation.current.x,
        baseRotation.x - maxTilt,
        baseRotation.x + maxTilt,
      );
      modelRef.current.rotation.y = THREE.MathUtils.clamp(
        currentRotation.current.y,
        baseRotation.y - maxTilt,
        baseRotation.y + maxTilt,
      );
      modelRef.current.rotation.z = THREE.MathUtils.clamp(
        currentRotation.current.z,
        baseRotation.z - maxTilt,
        baseRotation.z + maxTilt,
      );
    }
  });

  const position: [number, number, number] = isMobile
    ? [-1, -1.4, -5]
    : [-4.5, -2, -5];

  return (
    <primitive
      ref={modelRef}
      object={scene}
      scale={isMobile ? 0.35 : 0.7}
      position={position}
    />
  );
}

function RightHandModel({ isMobile }: { isMobile: boolean }) {
  const { scene } = useGLTF("/model/right2.glb");
  const modelRef = useRef<THREE.Group>(null);

  const baseRotation = isMobile
    ? { x: 1.2, y: -1.1, z: 0.9 }
    : { x: 0, y: -1.6, z: -0.3 };
  const currentRotation = useRef({ ...baseRotation });

  scene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.material = new THREE.MeshStandardMaterial({
        color: new THREE.Color("#8b5cf6"),
        metalness: 0.3,
        roughness: 0.4,
        envMapIntensity: 1,
      });
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  useFrame((_, delta) => {
    if (modelRef.current) {
      const tiltAmount = 0.08;
      const maxTilt = 0.1;
      const lerpFactor = 1 - Math.pow(0.001, delta);

      const offsetX = THREE.MathUtils.clamp(
        mouseState.y * tiltAmount,
        -maxTilt,
        maxTilt,
      );
      const offsetY = THREE.MathUtils.clamp(
        mouseState.x * tiltAmount,
        -maxTilt,
        maxTilt,
      );
      const offsetZ = THREE.MathUtils.clamp(
        mouseState.x * 0.05,
        -maxTilt,
        maxTilt,
      );

      const targetX = baseRotation.x + offsetX;
      const targetY = baseRotation.y + offsetY;
      const targetZ = baseRotation.z + offsetZ;

      currentRotation.current.x +=
        (targetX - currentRotation.current.x) * lerpFactor;
      currentRotation.current.y +=
        (targetY - currentRotation.current.y) * lerpFactor * 0.4;
      currentRotation.current.z +=
        (targetZ - currentRotation.current.z) * lerpFactor;

      modelRef.current.rotation.x = THREE.MathUtils.clamp(
        currentRotation.current.x,
        baseRotation.x - maxTilt,
        baseRotation.x + maxTilt,
      );
      modelRef.current.rotation.y = THREE.MathUtils.clamp(
        currentRotation.current.y,
        baseRotation.y - maxTilt,
        baseRotation.y + maxTilt,
      );
      modelRef.current.rotation.z = THREE.MathUtils.clamp(
        currentRotation.current.z,
        baseRotation.z - maxTilt,
        baseRotation.z + maxTilt,
      );
    }
  });

  const position: [number, number, number] = isMobile
    ? [0.2, -0.1, -5]
    : [2, -0.6, -5];

  return (
    <primitive
      ref={modelRef}
      object={scene}
      scale={isMobile ? 0.3 : 0.55}
      position={position}
    />
  );
}

// Loading fallback
function Loader() {
  return (
    <mesh>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial color="#8b5cf6" wireframe />
    </mesh>
  );
}

export default function ThreeDHand() {
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Track mouse at the window level so the overlay div doesn't block events
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse position to -1..1 (same as R3F pointer)
      mouseState.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseState.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-screen h-screen bg-background"
    >
      {/* Halftone dot pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-100 dark:opacity-90"
        style={{
          backgroundImage: `radial-gradient(circle, var(--primary) 0.6px, transparent 0.6px)`,
          backgroundSize: "10px 10px",
        }}
      />
      {/* Radial fade — clears dots from center, keeps them at edges */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 50%, var(--background) 10%, transparent 65%)`,
        }}
      />
      <Canvas
        shadows
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ width: "100%", height: "100%" }}
      >
        <pointLight position={[5, -5, 5]} intensity={0.3} color="#3b82f6" />

        <Environment preset="city" />

        <Suspense fallback={<Loader />}>
          <LeftHandModel isMobile={isMobile} />
          <RightHandModel isMobile={isMobile} />
        </Suspense>

        <ContactShadows
          position={[0, -3.9, 0]}
          opacity={0.3}
          scale={30}
          blur={2.5}
          far={20}
        />
      </Canvas>

      <div className="pointer-events-none absolute top-1/2 left-1/2 z-50 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center font-poppins leading-[10px] md:leading-8">
        <span className="mb-3 text-[2.2vw] md:text-[1vw] tracking-widest text-foreground/50 uppercase">
          Full Stack Developer
        </span>

        <h1 className="mb-4 text-[5.5vw] md:text-[3vw] font-semibold uppercase   text-primary leading-[10px] md:leading-5">
          I&apos;m Avinash <span className="inline-block"></span>
        </h1>

        <p className="max-w-xl text-[3.5vw] md:text-[1.7vw] font-medium text-foreground leading-[10px] md:leading-5">
          I Design. Build. Ship.
        </p>
      </div>
    </div>
  );
}

// Preload the models
useGLTF.preload("/model/left2.glb");
useGLTF.preload("/model/right2.glb");
