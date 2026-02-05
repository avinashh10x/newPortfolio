"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  useGLTF,
  Environment,
  ContactShadows,
  OrbitControls,
} from "@react-three/drei";
import * as THREE from "three";

// Left Hand Model Component with mouse interaction
function LeftHandModel() {
  const { scene } = useGLTF("/model/l2.glb");
  const modelRef = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  // Store current rotation for smooth lerping
  const currentRotation = useRef({ x: 0.1, y: 4.9, z: 0 });

  // Base rotation values (your default)
  const baseRotation = { x: 0.1, y: 4.9, z: 0 };

  // Apply material/shader to the model
  scene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.material = new THREE.MeshStandardMaterial({
        color: new THREE.Color("#8b5cf6"), // Purple shade
        metalness: 0.3,
        roughness: 0.4,
        envMapIntensity: 1,
      });
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  // Mouse-based tilt interaction
  useFrame(() => {
    if (modelRef.current) {
      // Calculate target rotation based on mouse position
      // pointer.x and pointer.y are normalized from -1 to 1
      const tiltAmount = 0.1; // How much tilt to apply

      const targetX = baseRotation.x + pointer.y * tiltAmount;
      const targetY = baseRotation.y + pointer.x * tiltAmount;
      const targetZ = baseRotation.z + pointer.x * 0.08;

      // Smooth lerp to target rotation (momentum effect)
      currentRotation.current.x += (targetX - currentRotation.current.x) * 0.05;
      currentRotation.current.y += (targetY - currentRotation.current.y) * 0.05;
      currentRotation.current.z += (targetZ - currentRotation.current.z) * 0.05;

      // Apply rotation
      modelRef.current.rotation.x = currentRotation.current.x;
      modelRef.current.rotation.y = currentRotation.current.y;
      modelRef.current.rotation.z = currentRotation.current.z;
    }
  });

  return (
    <primitive
      ref={modelRef}
      object={scene}
      scale={1.5}
      position={[-1.2, -3.5, -5]}
    />
  );
}

// Right Hand Model Component with mouse interaction
function RightHandModel() {
  const { scene } = useGLTF("/model/r3.glb");
  const modelRef = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  // Store current rotation for smooth lerping
  const currentRotation = useRef({ x: 0, y: -1.8, z: -0.3 });

  // Base rotation values (your default)
  const baseRotation = { x: 0, y: -1.6, z: -0.3 };

  // Apply material/shader to the model
  scene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.material = new THREE.MeshStandardMaterial({
        color: new THREE.Color("#8b5cf6"), // Purple shade
        metalness: 0.3,
        roughness: 0.4,
        envMapIntensity: 1,
      });
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  // Mouse-based tilt interaction
  useFrame(() => {
    if (modelRef.current) {
      // Calculate target rotation based on mouse position
      const tiltAmount = 0.1; // How much tilt to apply

      const targetX = baseRotation.x + pointer.y * tiltAmount;
      const targetY = baseRotation.y + pointer.x * tiltAmount;
      const targetZ = baseRotation.z + pointer.x * 0.08;

      // Smooth lerp to target rotation (momentum effect)
      currentRotation.current.x += (targetX - currentRotation.current.x) * 0.05;
      currentRotation.current.y += (targetY - currentRotation.current.y) * 0.02;
      currentRotation.current.z += (targetZ - currentRotation.current.z) * 0.05;

      // Apply rotation
      modelRef.current.rotation.x = currentRotation.current.x;
      modelRef.current.rotation.y = currentRotation.current.y;
      modelRef.current.rotation.z = currentRotation.current.z;
    }
  });

  return (
    <primitive
      ref={modelRef}
      object={scene}
      scale={0.6}
      position={[4, -0.6, -5]}
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
  return (
    <div className="w-screen h-screen fixed inset-0 bg-background">
      <Canvas
        shadows
        camera={{ position: [0, 0, 5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ width: "100%", height: "100%" }}
      >
        <pointLight position={[5, -5, 5]} intensity={0.3} color="#3b82f6" />

        {/* Environment for reflections */}
        <Environment preset="city" />

        {/* 3D Models */}
        <Suspense fallback={<Loader />}>
          <LeftHandModel />
          <RightHandModel />
        </Suspense>

        {/* Ground shadow */}
        <ContactShadows
          position={[0, -1.5, 0]}
          opacity={0.4}
          scale={20}
          blur={2.5}
          far={20}
        />
        <OrbitControls />
      </Canvas>

      {/* Optional overlay gradient for depth */}
      {/* <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-zinc-950/60 via-transparent to-zinc-950/30" /> */}

      {/* Debug: Center dot */}
      <div className="absolute top-1/2 left-1/2 z-50 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center font-poppins">
        {/* Role / authority */}
        <span className="mb-3 text-xs tracking-widest text-muted-foreground uppercase">
          Full Stack Developer 
        </span>

        {/* Identity */}
        <h1 className="mb-4 text-4xl font-semibold text-foreground sm:text-5xl">
          Yo, I’m Avinash <span className="inline-block"></span>
        </h1>

        {/* Hook */}
        <p className="max-w-xl text-xl font-medium text-foreground sm:text-2xl">
          I design it. I build it. I ship it.
        </p>
      </div>
    </div>
  );
}

// Preload the models
useGLTF.preload("/model/l2.glb");
useGLTF.preload("/model/r3.glb");
