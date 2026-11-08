import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
    });

    // ১) Lenis scroll করলে ScrollTrigger-কে নতুন অবস্থান জানাও
    lenis.on("scroll", ScrollTrigger.update);

    // ২) GSAP-এর ঘড়ি Lenis-কে চালাবে (GSAP-এর সময় সেকেন্ডে, Lenis চায় মিলিসেকেন্ড)
    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);

    // ৩) GSAP-এর "পিছিয়ে পড়া সামলানো" বন্ধ, নইলে Lenis-এর সময় এলোমেলো হয়
    gsap.ticker.lagSmoothing(0);

    // Cleanup: component সরলে সব বন্ধ করো
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, []);
}