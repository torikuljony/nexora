"use client";

import { Canvas } from "@react-three/fiber";
import MainObject from "./MainObject";
import Lighting from "./Lighting";
import Particles from "./Particles";

export default function Scene() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <Canvas
        camera={{ position: [0, 0, 9], fov: 40 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true }}
      >
        <color attach="background" args={["#03040a"]} />
        <fog attach="fog" args={["#03040a", 10, 22]} />

        <Lighting />
        <MainObject />
        <Particles />
      </Canvas>
    </div>
  );
}