import Scene from "@/components/3d/Scene";
import SmoothScroll from "@/components/ui/SmoothScroll";
import ScrollProgress from "@/components/ui/ScrollProgress";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <ScrollProgress />
      <Scene />

      <main className="relative z-10">
        <section className="flex min-h-screen flex-col items-center justify-end gap-4 px-6 pb-24 text-center">
          <h1 className="text-5xl font-bold tracking-tight md:text-7xl">
            Build What Comes Next.
          </h1>
          <p className="max-w-md" style={{ color: "var(--color-muted)" }}>
            Step 6: smooth scroll আর scroll progress কাজ করছে।
          </p>
        </section>

        <section className="flex min-h-screen items-center justify-center">
          <p className="text-sm uppercase tracking-[0.3em]" style={{ color: "var(--color-muted)" }}>
            Section 2
          </p>
        </section>

        <section className="flex min-h-screen items-center justify-center">
          <p className="text-sm uppercase tracking-[0.3em]" style={{ color: "var(--color-muted)" }}>
            Section 3
          </p>
        </section>

        <section className="flex min-h-screen items-center justify-center">
          <p className="text-sm uppercase tracking-[0.3em]" style={{ color: "var(--color-muted)" }}>
            Section 4
          </p>
        </section>
      </main>
    </>
  );
}