"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Stage } from "@react-three/drei";

function SofaModel() {
  // Load the GLTF model from the public directory
  const { scene } = useGLTF("/models/sofa.glb");
  
  return <primitive object={scene} castShadow receiveShadow />;
}

// Preload the model so it's ready faster
useGLTF.preload("/models/sofa.glb");

export default function FurnitureCanvas() {
  return (
    <div className="w-full h-full min-h-[400px] cursor-pointer bg-slate-50/50 rounded-2xl overflow-hidden shadow-inner relative">
      <Canvas shadows dpr={[1, 2]} camera={{ fov: 45 }}>
        <Suspense fallback={null}>
          {/* Stage automatically centers, scales, and lights the model to fit perfectly */}
          <Stage 
            environment="city" 
            intensity={0.6} 
            adjustCamera={1.2} // 1.2 adds a slight margin around the model
            shadows={{ type: 'contact', opacity: 0.6, blur: 2 }}
          >
            <SofaModel />
          </Stage>
        </Suspense>

        {/* Controls */}
        <OrbitControls
          makeDefault
          enablePan={false}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2 - 0.05} // Prevent camera from going below ground
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}
