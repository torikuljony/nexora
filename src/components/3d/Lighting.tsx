import { Environment, Lightformer } from "@react-three/drei";

const ACCENT = "#7cffcb";
const ACCENT_2 = "#6ea8ff";

export default function Lighting() {
  return (
    <>
      {/* ১) Ambient: খুব কম, শুধু যেন ছায়া পুরো কালো না হয় */}
      <ambientLight intensity={0.15} />

      {/* ২) Key light: মূল আলো, সামনে-ওপর-ডান থেকে */}
      <directionalLight position={[5, 4, 5]} intensity={2.2} color="#ffffff" />

      {/* ৩) Rim lights: পেছন থেকে, কিনারা উজ্জ্বল করে */}
      <directionalLight position={[-5, 2, -4]} intensity={3} color={ACCENT} />
      <directionalLight position={[4, -2, -5]} intensity={2} color={ACCENT_2} />

      {/* ৪) Environment: ধাতুর প্রতিফলনের জন্য নিজস্ব স্টুডিও */}
      <Environment resolution={256} environmentIntensity={0.7}>
        {/* ওপরের বড় নরম আলো */}
        <Lightformer
          form="rect"
          intensity={3}
          position={[0, 6, 2]}
          scale={[10, 3, 1]}
        />
        {/* বাঁ দিকের নীলচে লম্বা ফালি */}
        <Lightformer
          form="rect"
          intensity={4}
          color={ACCENT_2}
          position={[-6, 1, 0]}
          scale={[1.5, 8, 1]}
        />
        {/* ডান দিকের সবুজাভ লম্বা ফালি */}
        <Lightformer
          form="rect"
          intensity={3}
          color={ACCENT}
          position={[6, 0, -3]}
          scale={[1.5, 8, 1]}
        />
        {/* পেছনের গোল আলো */}
        <Lightformer
          form="ring"
          intensity={2}
          position={[0, 0, -8]}
          scale={6}
        />
      </Environment>
    </>
  );
}