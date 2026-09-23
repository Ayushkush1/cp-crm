import { HeroDashboard } from "./HeroDashboard";
import { Btn, Hl, wrap } from "./ui";
import { cn } from "@/lib/cn";

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-32 pt-32 max-sm:pb-[70px] max-sm:pt-[110px]" id="top">
      {/* soft background glows */}
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 -top-[120px] size-[520px] rounded-full bg-[#d5efe2] opacity-55 blur-[70px]" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-[180px] top-10 size-[620px] rounded-full bg-[#e7e0ff] opacity-45 blur-[70px]" />

      <div
        className={cn(
          wrap,
          "relative grid grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] items-start gap-12 max-lg:grid-cols-[minmax(0,1fr)] max-lg:gap-[72px]",
        )}
      >
        <div className="max-lg:max-w-[640px]">
          <h1 className="hero-h1 mb-[22px] mt-10 text-[clamp(40px,5.5vw,68px)]">
            Everything your <Hl tone="forest" className="hero-chip hero-chip-1">startup</Hl> needs to{" "}
            <Hl tone="brand" className="hero-chip hero-chip-2">scale, together.</Hl>
          </h1>
          <p className="hero-p max-w-[520px] text-lg text-ink-2">
            Manage leads, tasks, documents, payments and your team, all in one connected ecosystem.
          </p>
          <div className="mt-[30px] flex flex-wrap gap-2.5">
            <Btn href="#demo" size="lg" arrow className="hero-btn-1 max-xs:w-full">Get free demo</Btn>
            <Btn href="#how" variant="light" size="lg" icon="play" className="hero-btn-2 max-xs:w-full">How it works</Btn>
          </div>
        </div>
        <HeroDashboard />
      </div>
    </section>
  );
}
