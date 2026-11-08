"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const trigger = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        // self.progress: ০ (একদম ওপরে) থেকে ১ (একদম নিচে)
        gsap.set(bar, { scaleX: self.progress });
      },
    });

    // Cleanup: ScrollTrigger বন্ধ না করলে জমে থাকে
    return () => trigger.kill();
  }, []);

  return (
    <div
      ref={barRef}
      className="fixed left-0 top-0 z-50 h-[2px] w-full origin-left"
      style={{
        transform: "scaleX(0)",
        background:
          "linear-gradient(90deg, var(--color-accent), var(--color-accent-2))",
      }}
    />
  );
}