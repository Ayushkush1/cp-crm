import { HeroDashboard } from "./HeroDashboard";
import { Btn, Hl, wrap } from "./ui";
import { cn } from "@/lib/cn";
import { delay } from "@/lib/utils";

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
          <h1 className="reveal mb-[22px] mt-10 text-[clamp(40px,5.5vw,68px)]" style={delay(0.06)}>
            Everything your <Hl tone="forest">startup</Hl> needs to{" "}
            <Hl tone="brand">scale, together.</Hl>
          </h1>
          <p className="reveal max-w-[520px] text-lg text-ink-2" style={delay(0.12)}>
            Manage leads, tasks, documents, payments and your team, all in one connected ecosystem.
          </p>
          <div className="reveal mt-[30px] flex flex-wrap gap-2.5" style={delay(0.18)}>
            <Btn href="#demo" size="lg" arrow className="max-xs:w-full">Get free demo</Btn>
            <Btn href="#how" variant="light" size="lg" icon="play" className="max-xs:w-full">How it works</Btn>
          </div>
        </div>
        <HeroDashboard />
      </div>
    </section>
  );
}
