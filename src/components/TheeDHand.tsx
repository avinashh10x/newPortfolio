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
  const { scene } = useGLTF("/model/L.glb");
  const modelRef = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  // Store current rotation for smooth lerping
  const currentRotation = useRef({ x: 0, y: 1.8, z: 0 });

  // Base rotation values (your default)
  const baseRotation = { x: 0, y: 1.8, z: 0 };

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
      const tiltAmount = 0.2; // How much tilt to apply

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
      scale={1.1}
      position={[-4.5, -1, 0]}
    />
  );
}

// Right Hand Model Component with mouse interaction
function RightHandModel() {
  const { scene } = useGLTF("/model/R.glb");
  const modelRef = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  // Store current rotation for smooth lerping
  const currentRotation = useRef({ x: 0.78, y: 1.8, z: 0 });

  // Base rotation values (your default)
  const baseRotation = { x: 0.78, y: 1.8, z: 0 };

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
      const tiltAmount = 0.2; // How much tilt to apply

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
      scale={1}
      position={[-1.4, -0.6, 0]}
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
        {/* Lighting */}
        <ambientLight intensity={0.4} />
        {/* <directionalLight
          position={[5, 5, 5]}
          intensity={1.5}
          castShadow
          shadow-mapSize={[1024, 1024]}
        /> */}
        {/* <pointLight position={[-5, 5, -5]} intensity={0.5} color="#a855f7" /> */}
        {/* <pointLight position={[5, -5, 5]} intensity={0.3} color="#3b82f6" /> */}

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
          scale={10}
          blur={2.5}
          far={4}
        />
        {/* <OrbitControls /> */}
      </Canvas>

      {/* Optional overlay gradient for depth */}
      {/* <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-zinc-950/60 via-transparent to-zinc-950/30" /> */}

      {/* Debug: Center dot */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center font-poppins font-bold justify-center z-50">
        <p className="text-white text-5xl text-center">Where Ideas Turn <br /> Into Products</p>
      </div>
    </div>
  );
}

// Preload the models
useGLTF.preload("/model/L.glb");
useGLTF.preload("/model/R.glb");
