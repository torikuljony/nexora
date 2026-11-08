import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Color, Object3D } from "three";
import type { Group, InstancedMesh } from "three";

const COLORS = ["#7cffcb", "#6ea8ff", "#f5f7ff"];
const DESKTOP_COUNT = 600;
const MOBILE_COUNT = 250;

// Seeded random: একই seed দিলে সবসময় একই সংখ্যার ক্রম পাওয়া যায়
function createRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default function Particles() {
  const groupRef = useRef<Group>(null);
  const meshRef = useRef<InstancedMesh>(null);

  // সংখ্যাটা (true/false) বদলালেই শুধু re-render হবে, প্রতি pixel resize-এ নয়
  const isMobile = useThree((state) => state.size.width < 768);
  const count = isMobile ? MOBILE_COUNT : DESKTOP_COUNT;

  // প্রতিটা কণার অবস্থান, আকার ও রঙ একবারই ঠিক করি
  useEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;

    const random = createRandom(42);
    const dummy = new Object3D();
    const color = new Color();

    for (let i = 0; i < count; i++) {
      // গোলকের খোলসের ভেতরে এলোমেলো বিন্দু (object থেকে ৩.২ থেকে ৭ দূরে)
      const radius = 3.2 + random() * 3.8;
      const theta = random() * Math.PI * 2;
      const phi = Math.acos(2 * random() - 1);

      dummy.position.set(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi)
      );
      dummy.scale.setScalar(0.01 + random() * 0.03);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);

      color.set(COLORS[Math.floor(random() * COLORS.length)]);
      mesh.setColorAt(i, color);
    }

    // GPU-কে বলি: নতুন তথ্য আবার নাও
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  }, [count]);

  // অতি ধীর idle ঘূর্ণন
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y -= delta * 0.03;
    }
  });

  return (
    <group ref={groupRef}>
      <instancedMesh
        key={count}
        ref={meshRef}
        args={[undefined, undefined, count]}
        frustumCulled={false}
      >
        <icosahedronGeometry args={[1, 0]} />
        <meshBasicMaterial transparent opacity={0.8} toneMapped={false} />
      </instancedMesh>
    </group>
  );
}