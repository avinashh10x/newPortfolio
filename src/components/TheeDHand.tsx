"use client";

import { useRef, Suspense, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  useGLTF,
  Environment,
  ContactShadows,
  OrbitControls,
} from "@react-three/drei";
import * as THREE from "three";

function LeftHandModel({ isMobile }: { isMobile: boolean }) {
  const { scene } = useGLTF("/model/left2.glb");
  const modelRef = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  const baseRotation = isMobile
    ? { x: 1.1, y: -1.1, z: 1.1 }
    : { x: -0.1, y: -1.5, z: 0 };

  const currentRotation = useRef(baseRotation);

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

  useFrame(() => {
    if (modelRef.current) {
      const tiltAmount = 0.1;
      const maxTilt = 0.15; // max deviation from base rotation in radians

      const targetX =
        baseRotation.x +
        THREE.MathUtils.clamp(pointer.y * tiltAmount, -maxTilt, maxTilt);
      const targetY =
        baseRotation.y +
        THREE.MathUtils.clamp(pointer.x * tiltAmount, -maxTilt, maxTilt);
      const targetZ =
        baseRotation.z +
        THREE.MathUtils.clamp(pointer.x * 0.08, -maxTilt, maxTilt);

      currentRotation.current.x += (targetX - currentRotation.current.x) * 0.05;
      currentRotation.current.y += (targetY - currentRotation.current.y) * 0.05;
      currentRotation.current.z += (targetZ - currentRotation.current.z) * 0.05;

      modelRef.current.rotation.x = currentRotation.current.x;
      modelRef.current.rotation.y = currentRotation.current.y;
      modelRef.current.rotation.z = currentRotation.current.z;
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
  const { pointer } = useThree();

  const baseRotation = isMobile
    ? { x: 1.2, y: -1.1, z: 0.9 }
    : { x: 0, y: -1.6, z: -0.3 };
  const currentRotation = useRef(baseRotation);

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

  useFrame(() => {
    if (modelRef.current) {
      const tiltAmount = 0.1;
      const maxTilt = 0.15; // max deviation from base rotation in radians

      const targetX =
        baseRotation.x +
        THREE.MathUtils.clamp(pointer.y * tiltAmount, -maxTilt, maxTilt);
      const targetY =
        baseRotation.y +
        THREE.MathUtils.clamp(pointer.x * tiltAmount, -maxTilt, maxTilt);
      const targetZ =
        baseRotation.z +
        THREE.MathUtils.clamp(pointer.x * 0.08, -maxTilt, maxTilt);

      currentRotation.current.x += (targetX - currentRotation.current.x) * 0.05;
      currentRotation.current.y += (targetY - currentRotation.current.y) * 0.02;
      currentRotation.current.z += (targetZ - currentRotation.current.z) * 0.05;

      modelRef.current.rotation.x = currentRotation.current.x;
      modelRef.current.rotation.y = currentRotation.current.y;
      modelRef.current.rotation.z = currentRotation.current.z;
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

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div
      className="fixed inset-0 w-screen h-screen"
      style={{
        background: `
    radial-gradient(
      circle at center,
      var(--background) 20%,
      rgba(139,92,246,0.3) 80%,
      rgba(139,92,246,0.6) 120%,
      transparent 250%
    )
  `,
      }}
    >
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
        {/* <OrbitControls /> */}
      </Canvas>

      <div className="absolute top-1/2 left-1/2 z-50 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center font-poppins leading-[10px] md:leading-8">
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
