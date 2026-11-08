import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Group } from "three";

const ACCENT = "#7cffcb";
const ACCENT_2 = "#6ea8ff";

const FLOATING_COUNT = 6;
const FLOATING_RADIUS = 2.7;

// একবারই হিসাব হবে (component এর বাইরে), প্রতি render এ নয়
const floatingParts = Array.from({ length: FLOATING_COUNT }, (_, i) => {
  const angle = (i / FLOATING_COUNT) * Math.PI * 2;
  return {
    position: [
      Math.cos(angle) * FLOATING_RADIUS,
      Math.sin(i * 1.7) * 0.45,
      Math.sin(angle) * FLOATING_RADIUS,
    ] as [number, number, number],
    rotation: [i * 0.5, i * 0.8, 0] as [number, number, number],
  };
});

export default function MainObject() {
  const coreRef = useRef<Group>(null);
  const innerRingRef = useRef<Group>(null);
  const outerRingRef = useRef<Group>(null);
  const floatingRef = useRef<Group>(null);

  // Idle animation: খুব ধীর, শুধু যেন object টা "জীবন্ত" লাগে
  useFrame((_, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.x += delta * 0.1;
      coreRef.current.rotation.y += delta * 0.05;
    }
    if (innerRingRef.current) {
      innerRingRef.current.rotation.z += delta * 0.25;
    }
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z -= delta * 0.12;
    }
    if (floatingRef.current) {
      floatingRef.current.rotation.y -= delta * 0.06;
    }
  });

  return (
    // এই root group টাই পরে scroll দিয়ে নাড়াব (position, scale, rotation)
    <group>
      {/* CORE: ধাতব কেন্দ্র + ভেতরের glow + বাইরের wireframe shell */}
      <group ref={coreRef}>
        <mesh>
          <icosahedronGeometry args={[0.9, 0]} />
          <meshStandardMaterial
            color="#0b1220"
            metalness={1}
            roughness={0.2}
            flatShading
          />
        </mesh>

        <mesh>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial
            color={ACCENT}
            emissive={ACCENT}
            emissiveIntensity={2}
            toneMapped={false}
          />
        </mesh>

        <mesh>
          <icosahedronGeometry args={[1.25, 1]} />
          <meshBasicMaterial
            color={ACCENT_2}
            wireframe
            transparent
            opacity={0.3}
          />
        </mesh>
      </group>

      {/* INNER RING: বাইরের group কাত করে, ভেতরের group ঘোরে */}
      <group rotation={[1.2, 0, 0.3]}>
        <group ref={innerRingRef}>
          <mesh>
            <torusGeometry args={[1.7, 0.02, 16, 128]} />
            <meshStandardMaterial
              color={ACCENT}
              emissive={ACCENT}
              emissiveIntensity={1.5}
              toneMapped={false}
            />
          </mesh>
        </group>
      </group>

      {/* OUTER RING: মোটা ধাতব ring */}
      <group rotation={[1.9, 0.4, 0]}>
        <group ref={outerRingRef}>
          <mesh>
            <torusGeometry args={[2.2, 0.06, 16, 128]} />
            <meshStandardMaterial
              color="#9aa6c4"
              metalness={1}
              roughness={0.25}
            />
          </mesh>
        </group>
      </group>

      {/* FLOATING PARTS: চারপাশে ভাসমান ছোট অংশ */}
      <group ref={floatingRef}>
        {floatingParts.map((part, i) => (
          <mesh key={i} position={part.position} rotation={part.rotation}>
            <boxGeometry args={[0.18, 0.18, 0.18]} />
            <meshStandardMaterial
              color="#9aa6c4"
              metalness={1}
              roughness={0.3}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}